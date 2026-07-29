import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONFIG_PATH = path.join(__dirname, 'config.json');

/**
 * Every problem belongs to exactly one registered repo. Problem IDs are only
 * unique *within* a repo — 0006, 0013 and 0070 currently exist in both the
 * neetcode and leetcode directories — so anything that crosses repos must use
 * the repo-qualified uid ("neetcode#0006") rather than the bare id.
 */

/** Short aliases accepted anywhere a repo key is expected. */
const BUILTIN_ALIASES = { n: 'neetcode', nc: 'neetcode', l: 'leetcode', lc: 'leetcode' };

const DEFAULT_LABELS = { neetcode: 'NeetCode', leetcode: 'LeetCode' };

/** A problem counts toward progress only once it is marked finished. */
export const FINISHED_STATUS = 'solved';

function emptyConfig() {
    return { repos: {} };
}

function normalizeEntry(key, entry) {
    return {
        label: entry?.label || DEFAULT_LABELS[key] || key,
        directory: entry?.directory || '',
        total: Number.isFinite(entry?.total) && entry.total > 0 ? entry.total : null,
    };
}

/**
 * Migrate the legacy `{ neetcode: { directory } }` shape into `{ repos: {...} }`.
 * Returns the config plus whether anything changed, so the caller can persist it.
 */
function migrate(raw) {
    if (raw && typeof raw.repos === 'object' && raw.repos !== null) {
        const config = emptyConfig();
        for (const [key, entry] of Object.entries(raw.repos)) {
            config.repos[key] = normalizeEntry(key, entry);
        }
        return { config, changed: false };
    }

    const config = emptyConfig();
    for (const [key, entry] of Object.entries(raw || {})) {
        if (!entry || typeof entry !== 'object') continue;
        config.repos[key] = normalizeEntry(key, entry);
    }
    return { config, changed: true };
}

export async function loadConfig() {
    let raw;
    try {
        raw = JSON.parse(await fs.readFile(CONFIG_PATH, 'utf-8'));
    } catch {
        return emptyConfig();
    }

    const { config, changed } = migrate(raw);
    if (changed) {
        // Rewrite once so the file stops carrying the legacy shape.
        try {
            await saveConfig(config);
        } catch {
            // Not fatal — carry on with the in-memory migration.
        }
    }
    return config;
}

export async function saveConfig(config) {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
}

/** All registered repos, as `{ key, label, directory, total }`. */
export function listRepos(config) {
    return Object.entries(config.repos || {}).map(([key, entry]) => ({ key, ...normalizeEntry(key, entry) }));
}

/** Resolve a user-supplied name ("n", "neet", "neetcode") to a registered key. */
export function resolveRepoKey(config, alias) {
    if (!alias) return null;
    const a = String(alias).trim().toLowerCase();
    const keys = Object.keys(config.repos || {});

    if (keys.includes(a)) return a;
    if (BUILTIN_ALIASES[a] && keys.includes(BUILTIN_ALIASES[a])) return BUILTIN_ALIASES[a];

    const prefixed = keys.filter(k => k.startsWith(a));
    return prefixed.length === 1 ? prefixed[0] : null;
}

export function getRepo(config, alias) {
    const key = resolveRepoKey(config, alias);
    if (!key) return null;
    return { key, ...normalizeEntry(key, config.repos[key]) };
}

export function padId(id) {
    return String(id ?? '?').padStart(4, '0');
}

/** The globally unique handle for a problem, e.g. "neetcode#0006". */
export function makeUid(repoKey, id) {
    return `${repoKey}#${padId(id)}`;
}

/**
 * Parse a repo-qualified reference ("neetcode#6", "n#0006", "leetcode:13").
 * Returns null when the string isn't a reference or names an unknown repo.
 */
export function parseRef(config, ref) {
    const match = String(ref || '').match(/^([A-Za-z][\w-]*)\s*[#:]\s*0*(\d+)$/);
    if (!match) return null;
    const repoKey = resolveRepoKey(config, match[1]);
    if (!repoKey) return null;
    return { repoKey, id: parseInt(match[2], 10) };
}

function idFromDirName(name) {
    const match = name.match(/^(\d+)-/);
    return match ? parseInt(match[1], 10) : null;
}

/**
 * Load every problem in one repo. The directory a problem lives in is the
 * source of truth for ownership, so the repo tag can never drift from reality.
 */
export async function loadRepoProblems(repo) {
    const problems = [];
    if (!repo?.directory) return problems;

    let entries;
    try {
        entries = await fs.readdir(repo.directory, { withFileTypes: true });
    } catch {
        return problems;
    }

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (entry.name.includes('template')) continue;

        const dirPath = path.join(repo.directory, entry.name);
        let meta;
        try {
            meta = JSON.parse(await fs.readFile(path.join(dirPath, 'metadata.json'), 'utf-8'));
        } catch {
            continue;
        }

        if (meta.id === undefined || meta.id === null) meta.id = idFromDirName(entry.name);
        meta._repo = repo.key;
        meta._repoLabel = repo.label;
        meta._dir = entry.name;
        meta._path = dirPath;
        meta._uid = makeUid(repo.key, meta.id);
        problems.push(meta);
    }

    return problems.sort((a, b) => (a.id || 0) - (b.id || 0));
}

/** Load problems across repos, tagged with their owning repo. */
export async function loadProblems(config, repoKeys = null) {
    const repos = listRepos(config).filter(r => !repoKeys || repoKeys.includes(r.key));
    const all = [];
    for (const repo of repos) {
        all.push(...await loadRepoProblems(repo));
    }
    return all.sort((a, b) => a._repo.localeCompare(b._repo) || (a.id || 0) - (b.id || 0));
}

export function isFinished(problem) {
    return problem?.status === FINISHED_STATUS;
}

/**
 * Progress for one repo. When a repo has a registered `total` (e.g. 150 for
 * NeetCode 150) that is the denominator; otherwise we fall back to how many
 * problems are actually tracked on disk.
 */
export function computeRepoProgress(repo, problems) {
    const tracked = problems.length;
    const finished = problems.filter(isFinished).length;
    const revisit = problems.filter(p => p.status === 'revisit').length;
    const goal = repo.total;
    const denom = goal ?? tracked;
    const pct = denom > 0 ? (finished / denom) * 100 : 0;

    return {
        key: repo.key,
        label: repo.label,
        directory: repo.directory,
        goal,
        hasGoal: goal !== null,
        tracked,
        finished,
        revisit,
        denom,
        remaining: Math.max(denom - finished, 0),
        pct,
    };
}

/** Per-repo progress plus a combined roll-up. */
export function computeAllProgress(config, problems, repoKeys = null) {
    const repos = listRepos(config).filter(r => !repoKeys || repoKeys.includes(r.key));
    const byRepo = repos.map(repo =>
        computeRepoProgress(repo, problems.filter(p => p._repo === repo.key))
    );

    const finished = byRepo.reduce((sum, r) => sum + r.finished, 0);
    const denom = byRepo.reduce((sum, r) => sum + r.denom, 0);
    const tracked = byRepo.reduce((sum, r) => sum + r.tracked, 0);

    return {
        repos: byRepo,
        overall: {
            finished,
            denom,
            tracked,
            remaining: Math.max(denom - finished, 0),
            pct: denom > 0 ? (finished / denom) * 100 : 0,
            hasGoal: byRepo.some(r => r.hasGoal),
        },
    };
}

/** Colored progress bar for terminal output. */
export function renderProgressBar(pct, width = 24) {
    const filled = Math.min(width, Math.round((pct / 100) * width));
    const color = pct >= 80 ? 'green' : pct >= 40 ? 'yellow' : pct > 0 ? 'red' : 'gray';
    const fill = color === 'gray' ? chalk.dim('█'.repeat(filled)) : chalk[color]('█'.repeat(filled));
    return fill + chalk.dim('░'.repeat(width - filled));
}
