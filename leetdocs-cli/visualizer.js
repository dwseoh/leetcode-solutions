import fs from 'fs/promises';
import chalk from 'chalk';

/**
 * NeetCode 150 category structure with ordered topics.
 */
const NEETCODE_CATEGORIES = [
    { name: 'Arrays & Hashing', topics: ['array', 'hash-map', 'counting', 'prefix-sum'], icon: '📦' },
    { name: 'Two Pointers', topics: ['two-pointers'], icon: '👆' },
    { name: 'Sliding Window', topics: ['sliding-window'], icon: '🪟' },
    { name: 'Stack', topics: ['stack', 'monotonic-stack'], icon: '📚' },
    { name: 'Binary Search', topics: ['binary-search'], icon: '🔍' },
    { name: 'Linked List', topics: ['linked-list'], icon: '🔗' },
    { name: 'Trees', topics: ['tree', 'binary-tree'], icon: '🌳' },
    { name: 'Tries', topics: ['trie'], icon: '🔤' },
    { name: 'Heap / Priority Queue', topics: ['heap'], icon: '⛰️' },
    { name: 'Backtracking', topics: ['backtracking'], icon: '↩️' },
    { name: 'Graphs', topics: ['graph', 'bfs', 'dfs', 'union-find'], icon: '🕸️' },
    { name: 'Dynamic Programming', topics: ['dynamic-programming'], icon: '📊' },
    { name: 'Greedy', topics: ['greedy'], icon: '💰' },
    { name: 'Intervals', topics: ['intervals'], icon: '📏' },
    { name: 'Math & Geometry', topics: ['math', 'matrix', 'simulation'], icon: '🧮' },
    { name: 'Bit Manipulation', topics: ['bit-manipulation'], icon: '🔢' },
    { name: 'Sorting', topics: ['sorting'], icon: '📶' },
    { name: 'String', topics: ['string'], icon: '🔡' },
    { name: 'Design', topics: ['design'], icon: '🏗️' },
];

// ─── Utility functions ────────────────────────────────────────────────────────

function toDateKey(dateVal) {
    if (!dateVal) return null;
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Build a map of { 'YYYY-MM-DD': count } from problems that have date_solved.
 */
function buildActivityMap(problems) {
    const map = {};
    for (const p of problems) {
        if (!p.date_solved) continue;
        const key = toDateKey(p.date_solved);
        if (!key) continue;
        map[key] = (map[key] || 0) + 1;
    }
    return map;
}

/**
 * Calculate streak info from activityMap.
 * Returns { current, longest, longestStart, longestEnd, totalActiveDays }
 */
function calculateStreaks(activityMap) {
    const days = Object.keys(activityMap).sort();
    if (days.length === 0) return { current: 0, longest: 0, longestStart: null, longestEnd: null, totalActiveDays: 0 };

    // Current streak — count backwards from today
    const todayKey = toDateKey(new Date());
    let current = 0;
    let cursor = new Date(todayKey);
    while (true) {
        const key = cursor.toISOString().split('T')[0];
        if (activityMap[key]) {
            current++;
            cursor.setDate(cursor.getDate() - 1);
        } else {
            // Allow missing today (if not yet solved today, start from yesterday)
            if (key === todayKey && current === 0) {
                cursor.setDate(cursor.getDate() - 1);
                // Check yesterday
                const yKey = cursor.toISOString().split('T')[0];
                if (activityMap[yKey]) continue;
            }
            break;
        }
    }

    // Longest streak
    let longest = 0;
    let longestStart = null;
    let longestEnd = null;
    let runLen = 1;
    let runStart = days[0];

    for (let i = 1; i < days.length; i++) {
        const prev = new Date(days[i - 1]);
        const curr = new Date(days[i]);
        const diffDays = (curr - prev) / 86400000;
        if (diffDays === 1) {
            runLen++;
        } else {
            if (runLen > longest) {
                longest = runLen;
                longestStart = runStart;
                longestEnd = days[i - 1];
            }
            runLen = 1;
            runStart = days[i];
        }
    }
    if (runLen > longest) {
        longest = runLen;
        longestStart = runStart;
        longestEnd = days[days.length - 1];
    }

    return {
        current,
        longest,
        longestStart,
        longestEnd,
        totalActiveDays: days.length,
    };
}

/**
 * Get the n most recently solved problems, sorted by date desc.
 */
function getRecentSolves(problems, n = 10) {
    return problems
        .filter(p => p.date_solved)
        .sort((a, b) => {
            const da = new Date(a.date_solved);
            const db = new Date(b.date_solved);
            return db - da;
        })
        .slice(0, n);
}

/**
 * Build a 2D grid [row 0..6][col 0..numWeeks-1] for the terminal heatmap.
 * Row 0 = Sunday, Row 6 = Saturday.
 * Returns { grid, weekCount, startDate }
 */
function buildTerminalGrid(activityMap, numWeeks = 20) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find start: go back numWeeks weeks, align to Sunday
    const start = new Date(today);
    start.setDate(start.getDate() - (numWeeks * 7) + 1);
    // Move back to the Sunday of that week
    start.setDate(start.getDate() - start.getDay());

    const grid = Array.from({ length: 7 }, () => []);
    const monthChanges = []; // { weekIndex, month }

    let col = 0;
    let lastMonth = -1;
    const cursor = new Date(start);

    while (cursor <= today) {
        const dayOfWeek = cursor.getDay(); // 0=Sun
        const key = cursor.toISOString().split('T')[0];
        const count = activityMap[key] || 0;

        if (dayOfWeek === 0) {
            // New week column
            if (cursor.getMonth() !== lastMonth) {
                monthChanges.push({ weekIndex: col, month: cursor.getMonth() });
                lastMonth = cursor.getMonth();
            }
            col++;
        }

        grid[dayOfWeek].push(count);
        cursor.setDate(cursor.getDate() + 1);
    }

    // Pad incomplete last column
    for (let row = 0; row < 7; row++) {
        while (grid[row].length < col) grid[row].push(null);
    }

    return { grid, weekCount: col, monthChanges, startDate: start };
}

/**
 * Render a single terminal progress bar.
 * pct: 0-100, width: character width of bar
 */
function terminalBar(pct, width = 24, color = 'green') {
    const filled = Math.round((pct / 100) * width);
    const empty = width - filled;
    const fill = chalk[color]('█'.repeat(filled));
    const rest = chalk.dim('░'.repeat(empty));
    return fill + rest;
}

/**
 * Map problem to category name.
 */
function getCategoryForProblem(p) {
    for (const cat of NEETCODE_CATEGORIES) {
        if ((p.topics || []).some(t => cat.topics.includes(t))) return cat.name;
    }
    return 'Other';
}

// ─── Terminal dashboard ───────────────────────────────────────────────────────

export function printTerminalDashboard(problems) {
    const activityMap = buildActivityMap(problems);
    const streaks = calculateStreaks(activityMap);

    const totalSolved = problems.filter(p => p.status === 'solved').length;
    const total = problems.length;
    const pct = total > 0 ? Math.round((totalSolved / total) * 100) : 0;

    const diffSolved = {
        Easy: problems.filter(p => p.difficulty === 'Easy' && p.status === 'solved').length,
        Medium: problems.filter(p => p.difficulty === 'Medium' && p.status === 'solved').length,
        Hard: problems.filter(p => p.difficulty === 'Hard' && p.status === 'solved').length,
    };
    const diffTotal = {
        Easy: problems.filter(p => p.difficulty === 'Easy').length,
        Medium: problems.filter(p => p.difficulty === 'Medium').length,
        Hard: problems.filter(p => p.difficulty === 'Hard').length,
    };

    const width = 60;
    const divider = chalk.dim('─'.repeat(width));

    console.log();
    console.log(chalk.bold.hex('#6366f1')('  ⚡ LeetCode Progress Dashboard'));
    console.log(divider);

    // ── Overview ──
    console.log(chalk.bold('  Overview'));
    console.log();

    const overallBar = terminalBar(pct, 28);
    console.log(`  All      ${overallBar} ${chalk.bold(totalSolved)}/${total} (${pct}%)`);

    const easyPct = diffTotal.Easy > 0 ? (diffSolved.Easy / diffTotal.Easy) * 100 : 0;
    const medPct = diffTotal.Medium > 0 ? (diffSolved.Medium / diffTotal.Medium) * 100 : 0;
    const hardPct = diffTotal.Hard > 0 ? (diffSolved.Hard / diffTotal.Hard) * 100 : 0;

    console.log(`  ${chalk.green('Easy')}     ${terminalBar(easyPct, 28, 'green')} ${chalk.green(diffSolved.Easy)}/${diffTotal.Easy}`);
    console.log(`  ${chalk.yellow('Medium')}   ${terminalBar(medPct, 28, 'yellow')} ${chalk.yellow(diffSolved.Medium)}/${diffTotal.Medium}`);
    console.log(`  ${chalk.red('Hard')}     ${terminalBar(hardPct, 28, 'red')} ${chalk.red(diffSolved.Hard)}/${diffTotal.Hard}`);

    // ── Streaks ──
    console.log();
    console.log(divider);
    console.log(chalk.bold('  Consistency'));
    console.log();

    const flame = streaks.current > 0 ? '🔥' : '  ';
    console.log(`  ${flame} Current streak:  ${chalk.bold.hex('#4ade80')(streaks.current)} day${streaks.current !== 1 ? 's' : ''}`);
    console.log(`  🏆 Longest streak: ${chalk.bold.hex('#facc15')(streaks.longest)} day${streaks.longest !== 1 ? 's' : ''}${streaks.longestStart ? chalk.dim(` (${streaks.longestStart} – ${streaks.longestEnd})`) : ''}`);
    console.log(`  📅 Active days:    ${chalk.bold(streaks.totalActiveDays)}`);

    // ── Activity heatmap ──
    console.log();
    console.log(divider);
    console.log(chalk.bold('  Activity (last 20 weeks)'));
    console.log();

    const { grid, weekCount, monthChanges } = buildTerminalGrid(activityMap, 20);
    const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Month labels row
    let monthLine = '     ';
    let lastLabelEnd = -1;
    for (const { weekIndex, month } of monthChanges) {
        const spaces = weekIndex * 2 - lastLabelEnd - 1;
        if (spaces >= 0) {
            monthLine += ' '.repeat(spaces) + chalk.dim(MONTH_NAMES[month]);
            lastLabelEnd = weekIndex * 2 + 3;
        }
    }
    console.log(monthLine);

    // Day rows
    const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    for (let row = 0; row < 7; row++) {
        let line = `  ${chalk.dim(DAY_LABELS[row])} `;
        for (let col = 0; col < weekCount; col++) {
            const count = grid[row][col];
            if (count === null || count === undefined) {
                line += '  ';
            } else if (count === 0) {
                line += chalk.dim('░ ');
            } else if (count === 1) {
                line += chalk.hex('#16a34a')('▓ ');
            } else if (count === 2) {
                line += chalk.hex('#4ade80')('█ ');
            } else {
                line += chalk.bold.hex('#86efac')('█ ');
            }
        }
        console.log(line);
    }

    console.log();
    console.log(`        ${chalk.dim('░')} None  ${chalk.hex('#16a34a')('▓')} 1  ${chalk.hex('#4ade80')('█')} 2  ${chalk.bold.hex('#86efac')('█')} 3+`);

    // ── Recent activity ──
    const recent = getRecentSolves(problems, 8);
    if (recent.length > 0) {
        console.log();
        console.log(divider);
        console.log(chalk.bold('  Recent Solves'));
        console.log();

        for (const p of recent) {
            const date = toDateKey(p.date_solved) || '';
            const id = chalk.dim(`#${String(p.id || '').padStart(4, '0')}`);
            const title = (p.title || 'Untitled').slice(0, 32).padEnd(32);
            const diffColor = p.difficulty === 'Easy' ? chalk.green : p.difficulty === 'Medium' ? chalk.yellow : chalk.red;
            const diff = diffColor((p.difficulty || '').slice(0, 1));
            const time = p.complexity?.time ? chalk.cyan(p.complexity.time) : '';
            const space = p.complexity?.space ? chalk.blue(p.complexity.space) : '';
            const comp = (time && space) ? `${time} ${space}` : (time || space || '');
            console.log(`  ${chalk.dim(date)}  ${id}  ${title}  ${diff}  ${comp}`);
        }
    }

    // ── Topic progress ──
    console.log();
    console.log(divider);
    console.log(chalk.bold('  Topics'));
    console.log();

    const catMap = {};
    for (const cat of NEETCODE_CATEGORIES) {
        catMap[cat.name] = { solved: 0, total: 0 };
    }
    catMap['Other'] = { solved: 0, total: 0 };

    for (const p of problems) {
        const catName = getCategoryForProblem(p);
        if (!catMap[catName]) catMap[catName] = { solved: 0, total: 0 };
        catMap[catName].total++;
        if (p.status === 'solved') catMap[catName].solved++;
    }

    const activeCats = Object.entries(catMap).filter(([, v]) => v.total > 0);
    // Sort by solved desc
    activeCats.sort((a, b) => b[1].solved - a[1].solved);

    const maxNameLen = Math.max(...activeCats.map(([name]) => name.length));

    for (const [name, { solved, total }] of activeCats) {
        const p = total > 0 ? (solved / total) * 100 : 0;
        const color = p >= 80 ? 'green' : p >= 30 ? 'yellow' : p > 0 ? 'red' : 'gray';
        const label = name.padEnd(maxNameLen);
        const bar = terminalBar(p, 16, color === 'gray' ? 'dim' : color);
        console.log(`  ${chalk.dim(label)}  ${bar}  ${chalk[color === 'gray' ? 'dim' : color](`${solved}/${total}`)}`);
    }

    console.log();
    console.log(divider);
    console.log(chalk.dim(`  Generated ${new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}`));
    console.log();
}

// ─── Categorize ───────────────────────────────────────────────────────────────

function categorizeProblems(problems) {
    const categories = NEETCODE_CATEGORIES.map(cat => ({ ...cat, problems: [] }));
    const uncategorized = [];

    for (const p of problems) {
        let placed = false;
        for (const cat of categories) {
            if ((p.topics || []).some(t => cat.topics.includes(t))) {
                cat.problems.push(p);
                placed = true;
                break;
            }
        }
        if (!placed) uncategorized.push(p);
    }

    const active = categories.filter(c => c.problems.length > 0);
    if (uncategorized.length > 0) {
        active.push({ name: 'Other', topics: [], icon: '📋', problems: uncategorized });
    }
    return active;
}

// ─── HTML generation ──────────────────────────────────────────────────────────

export async function generateVisualization(problems, outputPath) {
    const categories = categorizeProblems(problems);
    const activityMap = buildActivityMap(problems);
    const streaks = calculateStreaks(activityMap);
    const recentSolves = getRecentSolves(problems, 10);

    const totalSolved = problems.filter(p => p.status === 'solved').length;
    const totalProblems = problems.length;
    const topicsCovered = new Set(problems.flatMap(p => p.topics || [])).size;
    const completionPct = Math.round((totalSolved / Math.max(totalProblems, 1)) * 100);

    const diffCounts = {
        Easy: problems.filter(p => p.difficulty === 'Easy').length,
        Medium: problems.filter(p => p.difficulty === 'Medium').length,
        Hard: problems.filter(p => p.difficulty === 'Hard').length,
    };
    const diffSolved = {
        Easy: problems.filter(p => p.difficulty === 'Easy' && p.status === 'solved').length,
        Medium: problems.filter(p => p.difficulty === 'Medium' && p.status === 'solved').length,
        Hard: problems.filter(p => p.difficulty === 'Hard' && p.status === 'solved').length,
    };

    // Build 52-week heatmap data (full year)
    const heatmapCells = buildHeatmapCells(activityMap, 52);
    const heatmapHtml = renderHeatmapHtml(heatmapCells);

    const recentHtml = recentSolves.map(p => {
        const date = toDateKey(p.date_solved) || '';
        const diffClass = (p.difficulty || '').toLowerCase();
        const time = p.complexity?.time || '';
        const space = p.complexity?.space || '';
        const icon = p.status === 'solved' ? '✅' : '🔁';
        return `
        <div class="recent-item">
          <span class="recent-date">${date}</span>
          <span class="recent-status">${icon}</span>
          <a class="recent-title" href="${p.url || '#'}" target="_blank">${p.title || 'Untitled'}</a>
          <span class="problem-diff ${diffClass}">${p.difficulty || ''}</span>
          ${time ? `<span class="complexity-badge time">${time}</span>` : ''}
          ${space ? `<span class="complexity-badge space">${space}</span>` : ''}
        </div>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LeetCode Roadmap</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #0a0a0f;
    color: #e0e0e0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.04) 0%, transparent 50%);
    z-index: 0;
    pointer-events: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 24px;
    position: relative;
    z-index: 1;
  }

  /* ── Header ── */
  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  .header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #6366f1, #a855f7, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
  }

  .header p { color: #888; font-size: 1rem; }

  /* ── Stats grid ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 20px 16px;
    text-align: center;
    transition: transform 0.2s, border-color 0.2s;
  }

  .stat-card:hover { transform: translateY(-2px); border-color: rgba(99,102,241,0.3); }

  .stat-value { font-size: 1.8rem; font-weight: 700; margin-bottom: 4px; }
  .stat-label { font-size: 0.78rem; color: #888; text-transform: uppercase; letter-spacing: 0.05em; }
  .stat-sub { font-size: 0.75rem; color: #555; margin-top: 4px; }

  /* ── Activity heatmap ── */
  .heatmap-section {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 32px;
    overflow-x: auto;
  }

  .section-heading {
    font-size: 1rem;
    font-weight: 600;
    color: #bbb;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .heatmap-wrapper {
    position: relative;
  }

  .heatmap-month-labels {
    display: flex;
    position: relative;
    height: 18px;
    margin-bottom: 4px;
    margin-left: 28px;
  }

  .heatmap-month-label {
    position: absolute;
    font-size: 0.72rem;
    color: #666;
  }

  .heatmap-body {
    display: flex;
    gap: 4px;
    align-items: flex-start;
  }

  .heatmap-day-labels {
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin-right: 4px;
  }

  .heatmap-day-label {
    font-size: 0.65rem;
    color: #555;
    height: 13px;
    line-height: 13px;
    width: 20px;
    text-align: right;
  }

  .heatmap-grid {
    display: grid;
    grid-template-rows: repeat(7, 13px);
    grid-auto-flow: column;
    gap: 3px;
  }

  .hm-cell {
    width: 13px;
    height: 13px;
    border-radius: 2px;
    cursor: default;
    position: relative;
    transition: transform 0.1s;
  }

  .hm-cell:hover { transform: scale(1.4); z-index: 10; }

  .hm-cell[title]:hover::after {
    content: attr(title);
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: #1e1e2e;
    border: 1px solid rgba(255,255,255,0.15);
    color: #e0e0e0;
    font-size: 0.7rem;
    padding: 3px 6px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 20;
  }

  .hm-level-0 { background: #161622; }
  .hm-level-1 { background: #166534; }
  .hm-level-2 { background: #16a34a; }
  .hm-level-3 { background: #4ade80; }
  .hm-level-future { background: transparent; }

  .heatmap-legend {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    font-size: 0.72rem;
    color: #555;
    justify-content: flex-end;
  }

  .heatmap-legend .hm-cell { cursor: default; }
  .heatmap-legend .hm-cell:hover { transform: none; }

  /* ── Difficulty bars ── */
  .difficulty-section {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 32px;
  }

  .diff-bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .diff-label { width: 80px; font-size: 0.9rem; font-weight: 500; }

  .diff-bar-bg {
    flex: 1;
    height: 10px;
    background: rgba(255,255,255,0.06);
    border-radius: 5px;
    overflow: hidden;
  }

  .diff-bar-fill {
    height: 100%;
    border-radius: 5px;
    transition: width 1s ease;
  }

  .diff-count { width: 60px; text-align: right; font-size: 0.85rem; color: #888; }

  /* ── Recent activity ── */
  .recent-section {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 32px;
  }

  .recent-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 0.85rem;
  }

  .recent-item:last-child { border-bottom: none; }

  .recent-date { color: #555; font-size: 0.75rem; width: 90px; flex-shrink: 0; font-variant-numeric: tabular-nums; }
  .recent-status { flex-shrink: 0; }

  .recent-title {
    color: #a5b4fc;
    text-decoration: none;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recent-title:hover { color: #c7d2fe; text-decoration: underline; }

  .problem-diff {
    font-size: 0.72rem;
    padding: 2px 7px;
    border-radius: 4px;
    font-weight: 500;
    flex-shrink: 0;
  }

  .problem-diff.easy { background: rgba(34,197,94,0.15); color: #4ade80; }
  .problem-diff.medium { background: rgba(234,179,8,0.15); color: #facc15; }
  .problem-diff.hard { background: rgba(239,68,68,0.15); color: #f87171; }

  .complexity-badge {
    font-size: 0.7rem;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    flex-shrink: 0;
  }

  .complexity-badge.time { background: rgba(99,102,241,0.15); color: #818cf8; }
  .complexity-badge.space { background: rgba(59,130,246,0.15); color: #60a5fa; }

  /* ── Category grid ── */
  .categories-section { margin-bottom: 32px; }

  .section-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #ccc;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 16px;
  }

  .category-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 20px;
    transition: transform 0.2s, border-color 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }

  .category-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(99,102,241,0.1); }
  .category-card.mastered { border-color: rgba(34,197,94,0.35); }
  .category-card.mastered:hover { border-color: rgba(34,197,94,0.6); box-shadow: 0 6px 24px rgba(34,197,94,0.1); }
  .category-card.in-progress { border-color: rgba(234,179,8,0.35); }
  .category-card.in-progress:hover { border-color: rgba(234,179,8,0.6); box-shadow: 0 6px 24px rgba(234,179,8,0.1); }
  .category-card.needs-work { border-color: rgba(239,68,68,0.35); }
  .category-card.needs-work:hover { border-color: rgba(239,68,68,0.6); box-shadow: 0 6px 24px rgba(239,68,68,0.1); }

  .cat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .cat-name { font-size: 1rem; font-weight: 600; display: flex; align-items: center; gap: 8px; }
  .cat-icon { font-size: 1.2rem; }
  .cat-fraction { font-size: 0.82rem; color: #888; font-weight: 500; }

  .progress-bar-bg {
    width: 100%;
    height: 5px;
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 14px;
  }

  .progress-bar-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
  .progress-bar-fill.mastered { background: linear-gradient(90deg, #22c55e, #4ade80); }
  .progress-bar-fill.in-progress { background: linear-gradient(90deg, #eab308, #facc15); }
  .progress-bar-fill.needs-work { background: linear-gradient(90deg, #ef4444, #f87171); }

  .problem-list {
    display: none;
    flex-direction: column;
    gap: 4px;
    margin-top: 2px;
  }

  .problem-list.open { display: flex; }

  .problem-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 7px;
    border-radius: 7px;
    font-size: 0.82rem;
    background: rgba(255,255,255,0.02);
    transition: background 0.15s;
  }

  .problem-item:hover { background: rgba(255,255,255,0.05); }

  .problem-item a {
    color: #a5b4fc;
    text-decoration: none;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .problem-item a:hover { color: #c7d2fe; text-decoration: underline; }
  .problem-status { font-size: 0.7rem; flex-shrink: 0; }

  .problem-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .problem-date { font-size: 0.68rem; color: #444; }

  /* ── Legend ── */
  .legend {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: #888; }
  .legend-dot { width: 10px; height: 10px; border-radius: 50%; }
  .legend-dot.mastered { background: #22c55e; }
  .legend-dot.in-progress { background: #eab308; }
  .legend-dot.needs-work { background: #ef4444; }
  .legend-dot.not-started { background: #333; }

  /* ── Footer ── */
  .footer {
    text-align: center;
    padding: 28px 0;
    color: #444;
    font-size: 0.78rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  @media (max-width: 600px) {
    .header h1 { font-size: 1.8rem; }
    .categories-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .recent-date { display: none; }
  }
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1>⚡ LeetCode Progress</h1>
    <p>Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <!-- Stats Dashboard -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value" style="color:#6366f1">${totalSolved}/${totalProblems}</div>
      <div class="stat-label">Problems Solved</div>
      <div class="stat-sub">${completionPct}% complete</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#a855f7">${topicsCovered}</div>
      <div class="stat-label">Topics Covered</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#f59e0b">${streaks.current > 0 ? streaks.current + ' 🔥' : '—'}</div>
      <div class="stat-label">Current Streak</div>
      <div class="stat-sub">days</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#facc15">${streaks.longest}</div>
      <div class="stat-label">Longest Streak</div>
      <div class="stat-sub">days</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#34d399">${streaks.totalActiveDays}</div>
      <div class="stat-label">Active Days</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#22c55e">${diffSolved.Easy}/${diffCounts.Easy}</div>
      <div class="stat-label">Easy</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#eab308">${diffSolved.Medium}/${diffCounts.Medium}</div>
      <div class="stat-label">Medium</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#ef4444">${diffSolved.Hard}/${diffCounts.Hard}</div>
      <div class="stat-label">Hard</div>
    </div>
  </div>

  <!-- Activity Heatmap -->
  <div class="heatmap-section">
    <div class="section-heading">📅 Activity — Last 52 Weeks</div>
    <div class="heatmap-wrapper">
      ${heatmapHtml}
    </div>
    <div class="heatmap-legend">
      Less
      <div class="hm-cell hm-level-0"></div>
      <div class="hm-cell hm-level-1"></div>
      <div class="hm-cell hm-level-2"></div>
      <div class="hm-cell hm-level-3"></div>
      More
    </div>
  </div>

  <!-- Difficulty Breakdown -->
  <div class="difficulty-section">
    <div class="section-heading">📊 Difficulty Breakdown</div>
    ${['Easy', 'Medium', 'Hard'].map(d => {
        const t = diffCounts[d];
        const s = diffSolved[d];
        const p = t > 0 ? (s / t) * 100 : 0;
        const color = d === 'Easy' ? '#22c55e' : d === 'Medium' ? '#eab308' : '#ef4444';
        return `
    <div class="diff-bar-row">
      <span class="diff-label" style="color:${color}">${d}</span>
      <div class="diff-bar-bg">
        <div class="diff-bar-fill" style="width:${p.toFixed(1)}%; background:${color}"></div>
      </div>
      <span class="diff-count">${s} / ${t}</span>
    </div>`;
    }).join('')}
  </div>

  <!-- Recent Activity -->
  ${recentHtml ? `
  <div class="recent-section">
    <div class="section-heading">🕐 Recent Activity</div>
    ${recentHtml}
  </div>` : ''}

  <!-- Legend -->
  <div class="legend">
    <div class="legend-item"><div class="legend-dot mastered"></div> Mastered (80%+)</div>
    <div class="legend-item"><div class="legend-dot in-progress"></div> In Progress (30-80%)</div>
    <div class="legend-item"><div class="legend-dot needs-work"></div> Needs Work (1-30%)</div>
    <div class="legend-item"><div class="legend-dot not-started"></div> Not Started</div>
  </div>

  <!-- Topic Roadmap -->
  <div class="categories-section">
    <h2 class="section-title">Topic Roadmap</h2>
    <div class="categories-grid">
      ${categories.map(cat => {
        const solved = cat.problems.filter(p => p.status === 'solved').length;
        const total = cat.problems.length;
        const pct = total > 0 ? (solved / total) * 100 : 0;
        let level = 'not-started';
        if (pct >= 80) level = 'mastered';
        else if (pct >= 30) level = 'in-progress';
        else if (pct > 0) level = 'needs-work';

        const problemsHtml = cat.problems.map(p => {
            const icon = p.status === 'solved' ? '✅' : p.status === 'revisit' ? '🔁' : '⬜';
            const diffClass = (p.difficulty || '').toLowerCase();
            const date = toDateKey(p.date_solved) || '';
            const time = p.complexity?.time || '';
            const space = p.complexity?.space || '';
            return `<div class="problem-item">
            <span class="problem-status">${icon}</span>
            <a href="${p.url || '#'}" target="_blank">${p.title || 'Untitled'}</a>
            <div class="problem-meta">
              <span class="problem-diff ${diffClass}">${p.difficulty || ''}</span>
              ${date ? `<span class="problem-date">${date}</span>` : ''}
              ${time ? `<span class="complexity-badge time">${time}</span>` : ''}
              ${space ? `<span class="complexity-badge space">${space}</span>` : ''}
            </div>
          </div>`;
        }).join('');

        return `
      <div class="category-card ${level}" onclick="this.querySelector('.problem-list').classList.toggle('open')">
        <div class="cat-header">
          <span class="cat-name"><span class="cat-icon">${cat.icon}</span> ${cat.name}</span>
          <span class="cat-fraction">${solved} / ${total}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill ${level}" style="width:${pct.toFixed(1)}%"></div>
        </div>
        <div class="problem-list">
          ${problemsHtml}
        </div>
      </div>`;
    }).join('')}
    </div>
  </div>

  <div class="footer">
    Generated by LeetDocs CLI &bull; ${new Date().toISOString().split('T')[0]}
  </div>

</div>
</body>
</html>`;

    await fs.writeFile(outputPath, html);
}

// ─── Heatmap HTML builder ─────────────────────────────────────────────────────

function buildHeatmapCells(activityMap, numWeeks) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayKey = today.toISOString().split('T')[0];

    const start = new Date(today);
    start.setDate(start.getDate() - (numWeeks * 7) + 1);
    start.setDate(start.getDate() - start.getDay()); // back to Sunday

    const weeks = []; // weeks[col][row] = { key, count, isFuture }
    const monthLabels = []; // { col, month }
    let lastMonth = -1;

    const cursor = new Date(start);
    let col = -1;

    while (cursor <= today) {
        const dow = cursor.getDay();
        if (dow === 0) {
            col++;
            weeks.push(Array(7).fill(null));
            const m = cursor.getMonth();
            if (m !== lastMonth) {
                monthLabels.push({ col, month: m });
                lastMonth = m;
            }
        }
        const key = cursor.toISOString().split('T')[0];
        const count = activityMap[key] || 0;
        weeks[col][dow] = { key, count, isFuture: key > todayKey };
        cursor.setDate(cursor.getDate() + 1);
    }

    return { weeks, monthLabels };
}

const MONTH_NAMES_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function renderHeatmapHtml({ weeks, monthLabels }) {
    const cellW = 16; // cell + gap

    // Month label row
    const labelsHtml = monthLabels.map(({ col, month }) =>
        `<div class="heatmap-month-label" style="left:${col * cellW}px">${MONTH_NAMES_SHORT[month]}</div>`
    ).join('');

    // Day labels
    const dayLabels = ['', 'Mo', '', 'We', '', 'Fr', ''].map(d =>
        `<div class="heatmap-day-label">${d}</div>`
    ).join('');

    // Grid cells — grid-auto-flow:column means we output row by row within each column
    // For CSS grid with grid-auto-flow:column + grid-template-rows:repeat(7,...),
    // we need to output cells in column-major order: col0row0, col0row1...col0row6, col1row0...
    let cellsHtml = '';
    for (let col = 0; col < weeks.length; col++) {
        for (let row = 0; row < 7; row++) {
            const cell = weeks[col][row];
            if (!cell) {
                cellsHtml += `<div class="hm-cell hm-level-future"></div>`;
            } else {
                const level = cell.count === 0 ? 0 : cell.count === 1 ? 1 : cell.count === 2 ? 2 : 3;
                const title = cell.count > 0 ? `${cell.key}: ${cell.count} solve${cell.count !== 1 ? 's' : ''}` : cell.key;
                cellsHtml += `<div class="hm-cell hm-level-${level}" title="${title}"></div>`;
            }
        }
    }

    return `
      <div class="heatmap-month-labels" style="margin-left:32px; position:relative; height:18px; margin-bottom:4px;">
        ${labelsHtml}
      </div>
      <div class="heatmap-body">
        <div class="heatmap-day-labels">${dayLabels}</div>
        <div class="heatmap-grid">
          ${cellsHtml}
        </div>
      </div>`;
}
