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
