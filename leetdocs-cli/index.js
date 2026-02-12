#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeLeetCode, scrapeNeetCode, lookupNeetCodeSlug } from './scraper.js';
import { generateDirectory, getNextId, directoryExists } from './generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, 'config.json');

const program = new Command();

// Load config
async function loadConfig() {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { neetcode: { directory: '' }, leetcode: { directory: '' } };
  }
}

// Save config
async function saveConfig(config) {
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
}

program
  .name('leetdocs')
  .description('CLI tool to parse and generate LeetCode/NeetCode problem directories')
  .version('1.0.0');

// New command
program
  .command('new')
  .description('Create a new problem directory')
  .option('-n, --neetcode', 'Create for NeetCode')
  .option('-l, --leetcode', 'Create for LeetCode')
  .action(async (options) => {
    const config = await loadConfig();
    const isNeetCode = options.neetcode;
    const isLeetCode = options.leetcode;

    if (!isNeetCode && !isLeetCode) {
      console.log(chalk.red('Please specify either -n (NeetCode) or -l (LeetCode)'));
      return;
    }

    const platform = isNeetCode ? 'neetcode' : 'leetcode';
    const parentDir = config[platform].directory;

    if (!parentDir) {
      console.log(chalk.red(`No parent directory set for ${platform}. Use 'leetdocs set ${isNeetCode ? 'n' : 'l'} dir <path>' first.`));
      return;
    }

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

    // Get next available ID
    const nextId = await getNextId(parentDir);

    // Prompt for ID
    const { customId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customId',
        message: `Do you have a specific ID? Leave empty and press enter to use the next ID (${nextId}):`,
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
    } catch (error) {
      console.log(chalk.red(`Error creating directory: ${error.message}`));
    }
  });

// Done command
program
  .command('done')
  .description('Mark a problem as solved with today\'s date and auto-analyze complexity')
  .argument('<id>', 'Problem ID number')
  .option('-n, --neetcode', 'NeetCode problem')
  .option('-l, --leetcode', 'LeetCode problem')
  .action(async (id, options) => {
    const { analyzeComplexity } = await import('./analyzer.js');
    const config = await loadConfig();
    const isNeetCode = options.neetcode;
    const isLeetCode = options.leetcode;

    if (!isNeetCode && !isLeetCode) {
      console.log(chalk.red('Please specify either -n (NeetCode) or -l (LeetCode)'));
      return;
    }

    const platform = isNeetCode ? 'neetcode' : 'leetcode';
    const parentDir = config[platform].directory;

    if (!parentDir) {
      console.log(chalk.red(`No parent directory set for ${platform}.`));
      return;
    }

    // Find directory matching the ID
    const paddedId = id.toString().padStart(4, '0');
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
      console.log(chalk.red(`No directory found for ID ${id}`));
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

    console.log(chalk.green(`✓ Marked problem ${id} as solved (${today})`));
    console.log(chalk.green(`✓ Complexity: Time ${complexity.time} | Space ${complexity.space}`));
    if (solutionCode) {
      console.log(chalk.green(`✓ Inserted ${solutionFilename} into README`));
    }
  });

// Helper: Load all metadata.json files from configured directories
async function loadAllMetadata() {
  const config = await loadConfig();
  const problems = [];
  const dirs = [config.neetcode?.directory, config.leetcode?.directory].filter(Boolean);

  for (const parentDir of dirs) {
    try {
      const entries = await fs.readdir(parentDir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (entry.name.includes('template')) continue; // skip template dirs
        const metaPath = path.join(parentDir, entry.name, 'metadata.json');
        try {
          const raw = await fs.readFile(metaPath, 'utf-8');
          const meta = JSON.parse(raw);
          meta._dir = entry.name;
          problems.push(meta);
        } catch {
          // skip dirs without metadata
        }
      }
    } catch {
      // dir doesn't exist
    }
  }

  return problems.sort((a, b) => (a.id || 0) - (b.id || 0));
}

// Search command
program
  .command('search')
  .description('Search and filter problems')
  .argument('[keyword]', 'Search by title keyword')
  .option('-t, --topic <topic>', 'Filter by topic')
  .option('-d, --difficulty <difficulty>', 'Filter by difficulty (Easy/Medium/Hard)')
  .option('-s, --status <status>', 'Filter by status (solved/unsolved)')
  .action(async (keyword, options) => {
    let problems = await loadAllMetadata();

    if (problems.length === 0) {
      console.log(chalk.yellow('No problems found. Make sure your directories are configured with "leetdocs set".'));
      return;
    }

    // Apply filters
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

    // Display header
    const header = `${'ID'.padEnd(5)} ${'Title'.padEnd(35)} ${'Diff'.padEnd(8)} ${'Status'.padEnd(10)} ${'Topics'.padEnd(30)} ${'Complexity'}`;
    console.log(chalk.bold.white(header));
    console.log(chalk.gray('─'.repeat(110)));

    // Display rows
    for (const p of problems) {
      const id = String(p.id || '?').padStart(3, '0').padEnd(5);
      const title = (p.title || '').padEnd(35).substring(0, 35);
      const diff = (p.difficulty || '').padEnd(8);
      const statusIcon = p.status === 'solved' ? '✅' : p.status === 'revisit' ? '🔁' : '❌';
      const status = statusIcon.padEnd(10);
      const topics = (p.topics || []).join(', ').padEnd(30).substring(0, 30);
      const comp = p.complexity ? `${p.complexity.time} / ${p.complexity.space}` : '';

      const diffColor = p.difficulty === 'Easy' ? chalk.green : p.difficulty === 'Medium' ? chalk.yellow : chalk.red;

      console.log(`${chalk.cyan(id)} ${chalk.white(title)} ${diffColor(diff)} ${status} ${chalk.gray(topics)} ${chalk.blue(comp)}`);
    }

    console.log(chalk.gray(`\n${problems.length} problem(s) found`));
  });

// Viz command
program
  .command('viz')
  .description('Generate a visual roadmap of your progress')
  .action(async () => {
    const { generateVisualization } = await import('./visualizer.js');
    const problems = await loadAllMetadata();

    if (problems.length === 0) {
      console.log(chalk.yellow('No problems found.'));
      return;
    }

    const config = await loadConfig();
    const outputDir = config.neetcode?.directory || config.leetcode?.directory || __dirname;
    const outputPath = path.join(path.dirname(outputDir), 'roadmap.html');

    await generateVisualization(problems, outputPath);
    console.log(chalk.green(`✓ Generated roadmap at ${outputPath}`));

    // Open in browser
    const { exec } = await import('child_process');
    exec(`open "${outputPath}"`);
  });

// Set command
program
  .command('set')
  .description('Set configuration')
  .argument('<platform>', 'Platform: n (neetcode) or l (leetcode)')
  .argument('<key>', 'Configuration key (e.g., dir)')
  .argument('<value>', 'Configuration value')
  .action(async (platform, key, value) => {
    const config = await loadConfig();
    const platformKey = platform === 'n' ? 'neetcode' : platform === 'l' ? 'leetcode' : null;

    if (!platformKey) {
      console.log(chalk.red('Invalid platform. Use "n" for neetcode or "l" for leetcode'));
      return;
    }

    if (key === 'dir') {
      config[platformKey].directory = path.resolve(value);
      await saveConfig(config);
      console.log(chalk.green(`✓ Set ${platformKey} directory to: ${config[platformKey].directory}`));
    } else {
      console.log(chalk.red('Invalid key. Currently only "dir" is supported'));
    }
  });

program.parse();
