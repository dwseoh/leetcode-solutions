#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeLeetCode, scrapeNeetCode, lookupNeetCodeSlug } from './scraper.js';
import { generateDirectory, getNextId, directoryExists } from './generator.js';
import {
  loadConfig,
  saveConfig,
  listRepos,
  getRepo,
  resolveRepoKey,
  loadProblems,
  parseRef,
  padId,
  makeUid,
  isFinished,
  computeAllProgress,
  renderProgressBar,
} from './repos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

/**
 * Work out which registered repo a command should act on.
 * Precedence: an explicit --repo/-n/-l flag, then a repo-qualified ref like
 * "neetcode#6", then the only registered repo if there is exactly one.
 * Never guesses between repos — ids collide across them.
 */
function resolveTargetRepo(config, options = {}, ref = null) {
  const repos = listRepos(config).filter(r => r.directory);

  if (repos.length === 0) {
    console.log(chalk.red('No repos registered. Use "leetdocs set <repo> dir <path>" first.'));
    return null;
  }

  const alias = options.repo || (options.neetcode ? 'neetcode' : options.leetcode ? 'leetcode' : null);
  if (alias) {
    const repo = getRepo(config, alias);
    if (!repo) {
      console.log(chalk.red(`Unknown repo "${alias}". Registered: ${repos.map(r => r.key).join(', ')}`));
      return null;
    }
    if (!repo.directory) {
      console.log(chalk.red(`No directory set for ${repo.key}. Use "leetdocs set ${repo.key} dir <path>".`));
      return null;
    }
    return repo;
  }

  if (ref) return getRepo(config, ref.repoKey);

  if (repos.length === 1) return repos[0];

  console.log(chalk.red('Which repo? Pass -r <repo> (or -n / -l).'));
  console.log(chalk.gray(`Registered: ${repos.map(r => r.key).join(', ')}`));
  return null;
}

program
  .name('leetdocs')
  .description('CLI tool to parse and generate LeetCode/NeetCode problem directories')
  .version('1.1.0');

// New command
program
  .command('new')
  .description('Create a new problem directory')
  .option('-n, --neetcode', 'Create for NeetCode')
  .option('-l, --leetcode', 'Create for LeetCode')
  .option('-r, --repo <repo>', 'Create for a registered repo')
  .action(async (options) => {
    const config = await loadConfig();
    const repo = resolveTargetRepo(config, options);
    if (!repo) return;

    const parentDir = repo.directory;
    const isNeetCode = repo.key === 'neetcode';

    // Prompt for link
    const { link } = await inquirer.prompt([
      {
        type: 'input',
        name: 'link',
        message: 'Paste the link:',
        validate: (input) => input.trim() !== '' || 'Link cannot be empty'
      }
    ]);

    console.log(chalk.blue('Scraping and parsing...'));

    let problemData;
    try {
      if (isNeetCode) {
        // Try to map NeetCode slug to LeetCode first
        const slugMatch = link.match(/problems\/([^\/?#]+)/);
        const neetcodeSlug = slugMatch ? slugMatch[1] : null;
        let leetcodeUrl = null;

        if (neetcodeSlug) {
          const lookup = await lookupNeetCodeSlug(neetcodeSlug);
          if (!lookup) {
            console.log(chalk.yellow(`Could not auto-map NeetCode slug "${neetcodeSlug}" to LeetCode.`));
            const { lcUrl } = await inquirer.prompt([
              {
                type: 'input',
                name: 'lcUrl',
                message: 'Paste the LeetCode URL for this problem:',
                validate: (input) => input.includes('leetcode.com/problems/') || 'Must be a valid LeetCode URL'
              }
            ]);
            leetcodeUrl = lcUrl;
          }
        }

        problemData = await scrapeNeetCode(link, leetcodeUrl);
      } else {
        problemData = await scrapeLeetCode(link);
      }
    } catch (error) {
      console.log(chalk.red(`Error: ${error.message}`));
      return;
    }

    // Get next available ID — scoped to this repo, ids restart per repo
    const nextId = await getNextId(parentDir);

    // Prompt for ID
    const { customId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customId',
        message: `Do you have a specific ID? Leave empty and press enter to use the next ID for ${repo.key} (${nextId}):`,
        default: nextId.toString()
      }
    ]);

    const problemId = parseInt(customId) || nextId;

    // Prompt for title
    const { title } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the problem title?',
        default: problemData.title || '',
        validate: (input) => input.trim() !== '' || 'Title cannot be empty'
      }
    ]);

    problemData.title = title;
    problemData.id = problemId;

    // Check if directory already exists
    const { exists, dirPath: existingPath } = await directoryExists(parentDir, problemData.id, problemData.title);

    if (exists) {
      const { confirmOverwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmOverwrite',
          message: chalk.yellow(`Directory already exists at ${existingPath}. Overwrite README.md and metadata.json? (other files will be kept)`),
          default: false
        }
      ]);

      if (!confirmOverwrite) {
        console.log(chalk.blue('Aborted. No files were changed.'));
        return;
      }
    }

    // Generate directory and files
    try {
      const { dirPath, alreadyExisted } = await generateDirectory(parentDir, problemData);
      if (alreadyExisted) {
        console.log(chalk.green(`✓ Overwrote README.md and metadata.json in ${dirPath}`));
        console.log(chalk.gray('  (other files in the directory were not touched)'));
      } else {
        console.log(chalk.green(`✓ Successfully created ${dirPath}`));
        console.log(chalk.green('✓ Created README.md and metadata.json'));
      }
      console.log(chalk.gray(`  Reference it as ${makeUid(repo.key, problemData.id)}`));
    } catch (error) {
      console.log(chalk.red(`Error creating directory: ${error.message}`));
    }
  });

// Done command
program
  .command('done')
  .description('Mark a problem as solved with today\'s date and auto-analyze complexity')
  .argument('<id>', 'Problem ID, or repo-qualified ref like neetcode#116')
  .option('-n, --neetcode', 'NeetCode problem')
  .option('-l, --leetcode', 'LeetCode problem')
  .option('-r, --repo <repo>', 'Registered repo the problem belongs to')
  .action(async (idArg, options) => {
    const { analyzeComplexity } = await import('./analyzer.js');
    const config = await loadConfig();

    const ref = parseRef(config, idArg);
    const repo = resolveTargetRepo(config, options, ref);
    if (!repo) return;

    // A ref carries its own repo — don't silently let a flag override it.
    if (ref && ref.repoKey !== repo.key) {
      console.log(chalk.red(`Conflict: "${idArg}" refers to ${ref.repoKey} but the flag says ${repo.key}. Pick one.`));
      return;
    }

    const id = ref ? ref.id : parseInt(idArg, 10);
    if (!Number.isFinite(id)) {
      console.log(chalk.red(`Invalid problem id "${idArg}".`));
      return;
    }

    const parentDir = repo.directory;

    // Find directory matching the ID within this repo
    const paddedId = padId(id);
    let targetDir = null;

    try {
      const entries = await fs.readdir(parentDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory() && entry.name.startsWith(`${paddedId}-`)) {
          targetDir = path.join(parentDir, entry.name);
          break;
        }
      }
    } catch (error) {
      console.log(chalk.red(`Error reading directory: ${error.message}`));
      return;
    }

    if (!targetDir) {
      console.log(chalk.red(`No directory found for ${makeUid(repo.key, id)}`));
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    // Find solution file (try multiple extensions)
    const SOLUTION_FILES = [
      { name: 'main.py', lang: 'python' },
      { name: 'main.cpp', lang: 'cpp' },
      { name: 'main.cc', lang: 'cpp' },
      { name: 'main.c', lang: 'c' },
    ];

    let solutionCode = null;
    let solutionLang = null;
    let solutionFilename = null;
    let complexity = { time: 'O()', space: 'O()' };

    for (const sf of SOLUTION_FILES) {
      const filePath = path.join(targetDir, sf.name);
      try {
        solutionCode = await fs.readFile(filePath, 'utf-8');
        solutionLang = sf.lang;
        solutionFilename = sf.name;
        break;
      } catch {
        // file doesn't exist, try next
      }
    }

    if (solutionCode) {
      complexity = analyzeComplexity(solutionCode, solutionFilename);
      console.log(chalk.blue(`Found ${solutionFilename}`));
      console.log(chalk.blue(`Analyzed complexity: Time ${complexity.time}, Space ${complexity.space}`));
    } else {
      console.log(chalk.yellow('No solution file found (main.py/main.cpp/main.c), skipping complexity analysis'));
    }

    // Update metadata.json
    const metadataPath = path.join(targetDir, 'metadata.json');
    try {
      const raw = await fs.readFile(metadataPath, 'utf-8');
      const metadata = JSON.parse(raw);
      metadata.status = 'solved';
      metadata.date_solved = today;
      metadata.attempts = (metadata.attempts || 0) + 1;
      metadata.complexity = complexity;
      await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
    } catch (error) {
      console.log(chalk.red(`Error updating metadata.json: ${error.message}`));
      return;
    }

    // Update README.md
    const readmePath = path.join(targetDir, 'README.md');
    try {
      let readme = await fs.readFile(readmePath, 'utf-8');

      // Update status line
      readme = readme.replace(
        /\*\*Status:\*\*.*/,
        `**Status:** ✅ Solved  `
      );
      // Update date solved line
      readme = readme.replace(
        /\*\*Date Solved:\*\*.*/,
        `**Date Solved:** ${today}  `
      );
      // Update time complexity
      readme = readme.replace(
        /\*\*Time Complexity:\*\*.*/,
        `**Time Complexity:** \`${complexity.time}\`  `
      );
      // Update space complexity
      readme = readme.replace(
        /\*\*Space Complexity:\*\*.*/,
        `**Space Complexity:** \`${complexity.space}\``
      );

      // Insert solution code into the Solution section
      if (solutionCode) {
        const solutionBlock = `## Solution\n\n\`\`\`${solutionLang}\n${solutionCode.trimEnd()}\n\`\`\``;
        // Replace existing solution section (from ## Solution to the next ---)
        readme = readme.replace(
          /## Solution\n[\s\S]*?(?=\n---)/,
          solutionBlock
        );
      }

      await fs.writeFile(readmePath, readme);
    } catch (error) {
      console.log(chalk.red(`Error updating README.md: ${error.message}`));
      return;
    }

    console.log(chalk.green(`✓ Marked ${makeUid(repo.key, id)} as solved (${today})`));
    console.log(chalk.green(`✓ Complexity: Time ${complexity.time} | Space ${complexity.space}`));
    if (solutionCode) {
      console.log(chalk.green(`✓ Inserted ${solutionFilename} into README`));
    }

    // Show where this leaves the repo
    const problems = await loadProblems(config, [repo.key]);
    const { repos: [progress] } = computeAllProgress(config, problems, [repo.key]);
    console.log(chalk.gray(`  ${progress.label}: ${progress.finished}/${progress.denom} (${Math.round(progress.pct)}%)`));
  });

// Search command
program
  .command('search')
  .description('Search and filter problems')
  .argument('[keyword]', 'Search by title keyword, or a ref like neetcode#6')
  .option('-t, --topic <topic>', 'Filter by topic')
  .option('-d, --difficulty <difficulty>', 'Filter by difficulty (Easy/Medium/Hard)')
  .option('-s, --status <status>', 'Filter by status (solved/unsolved/revisit)')
  .option('-r, --repo <repo>', 'Filter by registered repo')
  .action(async (keyword, options) => {
    const config = await loadConfig();

    let repoKeys = null;
    if (options.repo) {
      const key = resolveRepoKey(config, options.repo);
      if (!key) {
        console.log(chalk.red(`Unknown repo "${options.repo}". Registered: ${listRepos(config).map(r => r.key).join(', ') || 'none'}`));
        return;
      }
      repoKeys = [key];
    }

    // A repo-qualified ref narrows to exactly one problem
    const ref = keyword ? parseRef(config, keyword) : null;
    if (ref) {
      repoKeys = [ref.repoKey];
      keyword = null;
    }

    let problems = await loadProblems(config, repoKeys);

    if (problems.length === 0) {
      console.log(chalk.yellow('No problems found. Make sure your directories are configured with "leetdocs set".'));
      return;
    }

    // Apply filters
    if (ref) {
      problems = problems.filter(p => p.id === ref.id);
    }
    if (keyword) {
      const kw = keyword.toLowerCase();
      problems = problems.filter(p => p.title?.toLowerCase().includes(kw) || p.slug?.includes(kw));
    }
    if (options.topic) {
      const t = options.topic.toLowerCase();
      problems = problems.filter(p => (p.topics || []).some(topic => topic.toLowerCase().includes(t)));
    }
    if (options.difficulty) {
      const d = options.difficulty.toLowerCase();
      problems = problems.filter(p => p.difficulty?.toLowerCase() === d);
    }
    if (options.status) {
      const s = options.status.toLowerCase();
      problems = problems.filter(p => p.status?.toLowerCase() === s);
    }

    if (problems.length === 0) {
      console.log(chalk.yellow('No problems match your filters.'));
      return;
    }

    // Repo column widens to fit whichever repos are in the results
    const repoW = Math.max(4, ...problems.map(p => (p._repo || '').length));

    const header = `${'Repo'.padEnd(repoW)} ${'ID'.padEnd(6)} ${'Title'.padEnd(35)} ${'Diff'.padEnd(8)} ${'Status'.padEnd(8)} ${'Topics'.padEnd(30)} ${'Complexity'}`;
    console.log(chalk.bold.white(header));
    console.log(chalk.gray('─'.repeat(header.length)));

    for (const p of problems) {
      const repoName = (p._repo || '').padEnd(repoW);
      const id = `#${padId(p.id)}`.padEnd(6);
      const title = (p.title || '').padEnd(35).substring(0, 35);
      const diff = (p.difficulty || '').padEnd(8);
      const statusIcon = isFinished(p) ? '✅' : p.status === 'revisit' ? '🔁' : '❌';
      const status = statusIcon.padEnd(7); // emoji renders 2 columns wide
      const topics = (p.topics || []).join(', ').padEnd(30).substring(0, 30);
      const comp = p.complexity ? `${p.complexity.time} / ${p.complexity.space}` : '';

      const diffColor = p.difficulty === 'Easy' ? chalk.green : p.difficulty === 'Medium' ? chalk.yellow : chalk.red;

      console.log(`${chalk.magenta(repoName)} ${chalk.cyan(id)} ${chalk.white(title)} ${diffColor(diff)} ${status} ${chalk.gray(topics)} ${chalk.blue(comp)}`);
    }

    // Per-repo counts, so a mixed result set is never ambiguous
    const counts = {};
    for (const p of problems) counts[p._repo] = (counts[p._repo] || 0) + 1;
    const breakdown = Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(', ');
    console.log(chalk.gray(`\n${problems.length} problem(s) found (${breakdown})`));
  });

// Progress command
program
  .command('progress')
  .description('Show how many problems you have finished out of each repo\'s total')
  .argument('[repo]', 'Limit to one registered repo')
  .action(async (repoArg) => {
    const config = await loadConfig();
    const repos = listRepos(config);

    if (repos.length === 0) {
      console.log(chalk.yellow('No repos registered. Use "leetdocs set <repo> dir <path>" first.'));
      return;
    }

    let repoKeys = null;
    if (repoArg) {
      const key = resolveRepoKey(config, repoArg);
      if (!key) {
        console.log(chalk.red(`Unknown repo "${repoArg}". Registered: ${repos.map(r => r.key).join(', ')}`));
        return;
      }
      repoKeys = [key];
    }

    const problems = await loadProblems(config, repoKeys);
    const { repos: byRepo, overall } = computeAllProgress(config, problems, repoKeys);

    const labelW = Math.max(...byRepo.map(r => r.label.length));

    console.log();
    console.log(chalk.bold.hex('#6366f1')('  📈 Progress'));
    console.log(chalk.dim('  ' + '─'.repeat(64)));

    for (const r of byRepo) {
      const bar = renderProgressBar(r.pct, 24);
      const fraction = `${r.finished}/${r.denom}`.padEnd(9);
      const pct = `${Math.round(r.pct)}%`.padStart(4);
      console.log(`  ${chalk.bold(r.label.padEnd(labelW))}  ${bar}  ${chalk.bold(fraction)} ${chalk.dim(pct)} done`);

      const notes = [];
      if (r.hasGoal) {
        notes.push(`goal ${r.goal}`);
        notes.push(`${r.tracked} tracked`);
      } else {
        notes.push(`${r.tracked} tracked (no goal set — run "leetdocs set ${r.key} total <n>")`);
      }
      if (r.revisit > 0) notes.push(`${r.revisit} to revisit`);
      notes.push(`${r.remaining} to go`);
      console.log(chalk.dim(`  ${' '.repeat(labelW)}  ${notes.join(' · ')}`));
    }

    if (byRepo.length > 1) {
      console.log(chalk.dim('  ' + '─'.repeat(64)));
      const bar = renderProgressBar(overall.pct, 24);
      const fraction = `${overall.finished}/${overall.denom}`.padEnd(9);
      const pct = `${Math.round(overall.pct)}%`.padStart(4);
      console.log(`  ${chalk.bold('Total'.padEnd(labelW))}  ${bar}  ${chalk.bold(fraction)} ${chalk.dim(pct)} done`);
    }

    console.log();
  });

// Repos command
program
  .command('repos')
  .description('List registered repos and their configuration')
  .action(async () => {
    const config = await loadConfig();
    const repos = listRepos(config);

    if (repos.length === 0) {
      console.log(chalk.yellow('No repos registered. Use "leetdocs set <repo> dir <path>" to register one.'));
      return;
    }

    console.log();
    for (const repo of repos) {
      console.log(`  ${chalk.bold.magenta(repo.key)} ${chalk.dim(`(${repo.label})`)}`);
      console.log(`    ${chalk.dim('dir  ')} ${repo.directory || chalk.red('not set')}`);
      console.log(`    ${chalk.dim('total')} ${repo.total ?? chalk.dim('not set')}`);
      console.log(`    ${chalk.dim('ref  ')} ${chalk.gray(makeUid(repo.key, 1))}`);
    }
    console.log();
  });

// Unregister command
program
  .command('unregister')
  .description('Remove a repo from the registry (does not touch any files on disk)')
  .argument('<repo>', 'Repo key or alias')
  .action(async (repoArg) => {
    const config = await loadConfig();
    const key = resolveRepoKey(config, repoArg);

    if (!key) {
      console.log(chalk.red(`Unknown repo "${repoArg}". Registered: ${listRepos(config).map(r => r.key).join(', ') || 'none'}`));
      return;
    }

    delete config.repos[key];
    await saveConfig(config);
    console.log(chalk.green(`✓ Unregistered "${key}" (its files were left untouched)`));
  });

// Viz command
program
  .command('viz')
  .description('Generate a visual roadmap of your progress')
  .option('-r, --repo <repo>', 'Limit to one registered repo')
  .action(async (options) => {
    const { generateVisualization, printTerminalDashboard } = await import('./visualizer.js');
    const config = await loadConfig();

    let repoKeys = null;
    if (options.repo) {
      const key = resolveRepoKey(config, options.repo);
      if (!key) {
        console.log(chalk.red(`Unknown repo "${options.repo}". Registered: ${listRepos(config).map(r => r.key).join(', ') || 'none'}`));
        return;
      }
      repoKeys = [key];
    }

    const problems = await loadProblems(config, repoKeys);

    if (problems.length === 0) {
      console.log(chalk.yellow('No problems found.'));
      return;
    }

    const progress = computeAllProgress(config, problems, repoKeys);
    printTerminalDashboard(problems, progress);

    const repos = listRepos(config).filter(r => r.directory);
    const outputDir = repos[0]?.directory || __dirname;
    const outputPath = path.join(path.dirname(outputDir), 'roadmap.html');

    await generateVisualization(problems, outputPath, progress);
    console.log(chalk.green(`✓ Generated roadmap at ${outputPath}`));

    // Open in browser
    const { exec } = await import('child_process');
    exec(`open "${outputPath}"`);
  });

// Set command
program
  .command('set')
  .description('Set repo configuration (dir, total, label)')
  .argument('<repo>', 'Repo key or alias: n (neetcode), l (leetcode), or any registered key')
  .argument('<key>', 'Configuration key: dir, total, or label')
  .argument('<value>', 'Configuration value')
  .action(async (repoArg, key, value) => {
    const config = await loadConfig();
    if (!config.repos) config.repos = {};

    const existingKey = resolveRepoKey(config, repoArg);

    if (!existingKey && key !== 'dir') {
      console.log(chalk.red(`Unknown repo "${repoArg}". Register it first with "leetdocs set ${repoArg} dir <path>".`));
      return;
    }

    // `set <new-key> dir <path>` registers a brand new repo
    const repoKey = existingKey || repoArg.trim().toLowerCase();
    if (!config.repos[repoKey]) {
      config.repos[repoKey] = { label: repoKey, directory: '', total: null };
    }

    switch (key) {
      case 'dir': {
        config.repos[repoKey].directory = path.resolve(value);
        await saveConfig(config);
        console.log(chalk.green(`✓ Set ${repoKey} directory to: ${config.repos[repoKey].directory}`));
        if (!existingKey) console.log(chalk.gray(`  Registered new repo "${repoKey}". Set a goal with "leetdocs set ${repoKey} total <n>".`));
        break;
      }
      case 'total': {
        const cleared = ['none', 'null', 'clear', '0'].includes(String(value).toLowerCase());
        const total = cleared ? null : parseInt(value, 10);
        if (!cleared && (!Number.isFinite(total) || total <= 0)) {
          console.log(chalk.red(`Invalid total "${value}". Pass a positive number, or "none" to clear it.`));
          return;
        }
        config.repos[repoKey].total = total;
        await saveConfig(config);
        console.log(total === null
          ? chalk.green(`✓ Cleared ${repoKey} total`)
          : chalk.green(`✓ Set ${repoKey} total to ${total} problems`));
        break;
      }
      case 'label': {
        config.repos[repoKey].label = value;
        await saveConfig(config);
        console.log(chalk.green(`✓ Set ${repoKey} label to "${value}"`));
        break;
      }
      default:
        console.log(chalk.red('Invalid key. Supported: dir, total, label'));
    }
  });

program.parse();
