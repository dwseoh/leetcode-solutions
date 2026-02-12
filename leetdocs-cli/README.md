# LeetDocs CLI

A CLI tool to parse and generate LeetCode/NeetCode problem directories with structured metadata and README templates.

## Installation

```bash
cd leetdocs-cli
npm install
npm link
```

## Usage

### Set Parent Directory

First, set the parent directory where problem folders will be created:

```bash
# For NeetCode
leetdocs set n dir /path/to/neetcode-150

# For LeetCode
leetdocs set l dir /path/to/leetcode
```

### Create New Problem

```bash
# For NeetCode
leetdocs new -n

# For LeetCode
leetdocs new -l
```

The CLI will interactively prompt you for:
1. Problem URL
2. Custom ID (or use auto-generated next ID)
3. Problem title (with auto-filled suggestion from scraping)

### Example Workflow

```bash
% leetdocs new -n
? Paste the link: https://neetcode.io/problems/duplicate-integer
Scraping and parsing...
? Do you have a specific ID? Leave empty and press enter to use the next ID (2): 
? What is the problem title? Contains Duplicate
✓ Successfully parsed and created /path/to/neetcode-150/0002-contains-duplicate
✓ Created README.md and metadata.json
```

## Generated Structure

Each problem directory contains:

```
0001-problem-name/
├── README.md          # Structured problem documentation template
└── metadata.json      # Searchable metadata
```

## Features

- Web scraping from LeetCode and NeetCode
- Auto-generated README with comprehensive template
- Structured metadata for search functionality
- Auto-incrementing ID system
- Configurable parent directories
- Interactive CLI with colored output
