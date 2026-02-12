import fs from 'fs/promises';

/**
 * NeetCode 150 category structure with ordered topics.
 * Each problem's topics get mapped into these categories.
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

/**
 * Map problems into NeetCode categories.
 * A problem belongs to a category if any of its topics match.
 */
function categorizeProblems(problems) {
    const categories = NEETCODE_CATEGORIES.map(cat => ({
        ...cat,
        problems: [],
    }));

    const uncategorized = [];

    for (const p of problems) {
        let placed = false;
        for (const cat of categories) {
            if ((p.topics || []).some(t => cat.topics.includes(t))) {
                cat.problems.push(p);
                placed = true;
                break; // place in first matching category only
            }
        }
        if (!placed) uncategorized.push(p);
    }

    // Only include categories that have problems
    const active = categories.filter(c => c.problems.length > 0);

    if (uncategorized.length > 0) {
        active.push({ name: 'Other', topics: [], icon: '📋', problems: uncategorized });
    }

    return active;
}

/**
 * Generate the full HTML visualization.
 */
export async function generateVisualization(problems, outputPath) {
    const categories = categorizeProblems(problems);

    const totalSolved = problems.filter(p => p.status === 'solved').length;
    const totalProblems = problems.length;
    const topicsCovered = new Set(problems.flatMap(p => p.topics || [])).size;

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

  /* Animated gradient background */
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

  /* Header */
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

  .header p {
    color: #888;
    font-size: 1rem;
  }

  /* Stats Dashboard */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 48px;
  }

  .stat-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    transition: transform 0.2s, border-color 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    border-color: rgba(99, 102, 241, 0.3);
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 0.85rem;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Difficulty bars */
  .difficulty-section {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 48px;
  }

  .difficulty-section h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 20px;
    color: #ccc;
  }

  .diff-bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .diff-label {
    width: 80px;
    font-size: 0.9rem;
    font-weight: 500;
  }

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

  .diff-count {
    width: 60px;
    text-align: right;
    font-size: 0.85rem;
    color: #888;
  }

  /* Category Section */
  .section-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 24px;
    color: #ccc;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
    margin-bottom: 48px;
  }

  .category-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 24px;
    transition: transform 0.2s, border-color 0.3s, box-shadow 0.3s;
    cursor: pointer;
  }

  .category-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.1);
  }

  .category-card.mastered { border-color: rgba(34, 197, 94, 0.4); }
  .category-card.mastered:hover { border-color: rgba(34, 197, 94, 0.6); box-shadow: 0 8px 32px rgba(34, 197, 94, 0.1); }
  .category-card.in-progress { border-color: rgba(234, 179, 8, 0.4); }
  .category-card.in-progress:hover { border-color: rgba(234, 179, 8, 0.6); box-shadow: 0 8px 32px rgba(234, 179, 8, 0.1); }
  .category-card.needs-work { border-color: rgba(239, 68, 68, 0.4); }
  .category-card.needs-work:hover { border-color: rgba(239, 68, 68, 0.6); box-shadow: 0 8px 32px rgba(239, 68, 68, 0.1); }
  .category-card.not-started { border-color: rgba(255,255,255,0.08); }

  .cat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .cat-name {
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cat-icon { font-size: 1.3rem; }

  .cat-fraction {
    font-size: 0.85rem;
    color: #888;
    font-weight: 500;
  }

  .progress-bar-bg {
    width: 100%;
    height: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 1s ease;
  }

  .progress-bar-fill.mastered { background: linear-gradient(90deg, #22c55e, #4ade80); }
  .progress-bar-fill.in-progress { background: linear-gradient(90deg, #eab308, #facc15); }
  .progress-bar-fill.needs-work { background: linear-gradient(90deg, #ef4444, #f87171); }

  /* Problem list inside category */
  .problem-list {
    display: none;
    flex-direction: column;
    gap: 6px;
    margin-top: 4px;
  }

  .problem-list.open { display: flex; }

  .problem-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: 8px;
    font-size: 0.85rem;
    background: rgba(255,255,255,0.02);
    transition: background 0.15s;
  }

  .problem-item:hover { background: rgba(255,255,255,0.06); }

  .problem-item a {
    color: #a5b4fc;
    text-decoration: none;
    flex: 1;
  }

  .problem-item a:hover { color: #c7d2fe; text-decoration: underline; }

  .problem-status { font-size: 0.75rem; }

  .problem-diff {
    font-size: 0.75rem;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
  }

  .problem-diff.easy { background: rgba(34,197,94,0.15); color: #4ade80; }
  .problem-diff.medium { background: rgba(234,179,8,0.15); color: #facc15; }
  .problem-diff.hard { background: rgba(239,68,68,0.15); color: #f87171; }

  /* Legend */
  .legend {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    color: #888;
  }

  .legend-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .legend-dot.mastered { background: #22c55e; }
  .legend-dot.in-progress { background: #eab308; }
  .legend-dot.needs-work { background: #ef4444; }
  .legend-dot.not-started { background: #333; }

  /* Footer */
  .footer {
    text-align: center;
    padding: 32px 0;
    color: #555;
    font-size: 0.8rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  @media (max-width: 600px) {
    .header h1 { font-size: 1.8rem; }
    .categories-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <h1>🗺️ LeetCode Roadmap</h1>
    <p>Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <!-- Stats Dashboard -->
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value" style="color:#6366f1">${totalSolved}/${totalProblems}</div>
      <div class="stat-label">Problems Solved</div>
    </div>
    <div class="stat-card">
      <div class="stat-value" style="color:#a855f7">${topicsCovered}</div>
      <div class="stat-label">Topics Covered</div>
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
    <div class="stat-card">
      <div class="stat-value" style="color:#3b82f6">${Math.round((totalSolved / Math.max(totalProblems, 1)) * 100)}%</div>
      <div class="stat-label">Completion</div>
    </div>
  </div>

  <!-- Difficulty Breakdown -->
  <div class="difficulty-section">
    <h2>Difficulty Breakdown</h2>
    ${['Easy', 'Medium', 'Hard'].map(d => {
        const total = diffCounts[d];
        const solved = diffSolved[d];
        const pct = total > 0 ? (solved / total) * 100 : 0;
        const color = d === 'Easy' ? '#22c55e' : d === 'Medium' ? '#eab308' : '#ef4444';
        return `
    <div class="diff-bar-row">
      <span class="diff-label" style="color:${color}">${d}</span>
      <div class="diff-bar-bg">
        <div class="diff-bar-fill" style="width:${pct}%; background:${color}"></div>
      </div>
      <span class="diff-count">${solved} / ${total}</span>
    </div>`;
    }).join('')}
  </div>

  <!-- Legend -->
  <div class="legend">
    <div class="legend-item"><div class="legend-dot mastered"></div> Mastered (80%+)</div>
    <div class="legend-item"><div class="legend-dot in-progress"></div> In Progress (30-80%)</div>
    <div class="legend-item"><div class="legend-dot needs-work"></div> Needs Work (1-30%)</div>
    <div class="legend-item"><div class="legend-dot not-started"></div> Not Started</div>
  </div>

  <!-- Topic Roadmap -->
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
            return `<div class="problem-item">
          <span class="problem-status">${icon}</span>
          <a href="${p.url || '#'}" target="_blank">${p.title || 'Untitled'}</a>
          <span class="problem-diff ${diffClass}">${p.difficulty || ''}</span>
        </div>`;
        }).join('');

        return `
    <div class="category-card ${level}" onclick="this.querySelector('.problem-list').classList.toggle('open')">
      <div class="cat-header">
        <span class="cat-name"><span class="cat-icon">${cat.icon}</span> ${cat.name}</span>
        <span class="cat-fraction">${solved} / ${total}</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill ${level}" style="width:${pct}%"></div>
      </div>
      <div class="problem-list">
        ${problemsHtml}
      </div>
    </div>`;
    }).join('')}
  </div>

  <div class="footer">
    Generated by LeetDocs CLI • ${new Date().toISOString().split('T')[0]}
  </div>

</div>
</body>
</html>`;

    await fs.writeFile(outputPath, html);
}
