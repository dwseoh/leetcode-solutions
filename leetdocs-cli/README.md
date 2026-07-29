# LeetDocs CLI

A CLI tool to parse and generate LeetCode/NeetCode problem directories with structured metadata and README templates.

## Installation

```bash
cd leetdocs-cli
npm install
npm link
```

## Usage

### Register a Repo

Each problem set is a **registered repo** with its own directory, label and goal.
Problem IDs are only unique *within* a repo, so every repo is tracked separately.

```bash
# Register / point a repo at its directory
leetdocs set n dir /path/to/neetcode-150
leetdocs set l dir /path/to/leetcode

# How many problems the set contains (used for progress)
leetdocs set n total 150

# Optional display name
leetdocs set n label "NeetCode 150"

# Register any other set the same way
leetdocs set blind75 dir /path/to/blind-75
leetdocs set blind75 total 75

# Inspect / remove registrations
leetdocs repos
leetdocs unregister blind75   # config only — files are left alone
```

`n`/`nc` and `l`/`lc` are aliases for `neetcode` and `leetcode`. Any unambiguous
prefix of a registered key also works (`leetdocs progress blind` → `blind75`).

### Repo-Qualified IDs

The same ID can exist in more than one repo — `0006` is Palindrome Number in
`leetcode` and Encode and Decode Strings in `neetcode`. Anything that crosses
repos uses a **repo-qualified ref** instead of a bare ID:

```
neetcode#0006      # or neetcode#6, n#6, neetcode:6
```

Commands that act on a single problem take either a bare ID plus a repo flag,
or a ref that carries the repo with it:

```bash
leetdocs done 116 -n
leetdocs done neetcode#116     # same thing, no flag needed
```

A repo is never guessed: if a command is ambiguous and more than one repo is
registered, it stops and asks which one.

### Create New Problem

```bash
# For NeetCode
leetdocs new -n

# For LeetCode
leetdocs new -l

# For any registered repo
leetdocs new -r blind75
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

### Track Progress

Shows how many problems you have actually **finished** (status `solved`) out of
each repo's registered total:

```bash
leetdocs progress          # every repo, plus a combined total
leetdocs progress n        # one repo
```

```
  📈 Progress
  ────────────────────────────────────────────────────────────────
  NeetCode 150  ██████████████████░░░░░░  113/150    75% done
                goal 150 · 114 tracked · 37 to go
  LeetCode      ██████████████████████░░  10/11      91% done
                11 tracked (no goal set) · 1 to go
  ────────────────────────────────────────────────────────────────
  Total         ██████████████████░░░░░░  123/161    76% done
```

When a repo has no `total` set, the number of problems tracked on disk is used
as the denominator instead. The same per-repo bars appear in `leetdocs viz`.

### Search

```bash
leetdocs search two-sum              # by title / slug
leetdocs search -r n                 # filter by repo
leetdocs search -r n -s unsolved     # repo + status
leetdocs search -t graph -d Medium   # topic + difficulty
leetdocs search neetcode#6           # look up one problem by ref
```

Results always carry a `Repo` column, and the footer breaks the count down per
repo so a mixed result set is never ambiguous.

| Flag | Filter |
|------|--------|
| `-r, --repo` | Registered repo |
| `-t, --topic` | Topic |
| `-d, --difficulty` | Easy / Medium / Hard |
| `-s, --status` | solved / unsolved / revisit |

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
- Per-repo IDs with repo-qualified refs (`neetcode#0006`) so IDs never collide
- Per-repo progress tracking against a configurable total
- Auto-incrementing ID system, scoped per repo
- Any number of registered repos, not just NeetCode and LeetCode
- Interactive CLI with colored output

## Config

`config.json` holds the registry. Legacy configs (`{ "neetcode": { "directory": ... } }`)
are migrated automatically on first run.

```json
{
  "repos": {
    "neetcode": {
      "label": "NeetCode 150",
      "directory": "/path/to/neetcode-150",
      "total": 150
    },
    "leetcode": {
      "label": "LeetCode",
      "directory": "/path/to/leetcode",
      "total": null
    }
  }
}
```

A problem's owning repo is derived from **which registered directory it lives
in**, never stored in `metadata.json` — so the tag can't drift out of sync.
