const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');
const dashboardDir = path.join(appDir, 'dashboard');
const groupDir = path.join(appDir, '(dashboard)');

// Move everything from app/dashboard to app/(dashboard)
if (fs.existsSync(dashboardDir)) {
    const files = fs.readdirSync(dashboardDir);
    for (const file of files) {
        fs.cpSync(path.join(dashboardDir, file), path.join(groupDir, file), { recursive: true });
    }
}

// Create dashboard route inside (dashboard)
const dashboardRouteDir = path.join(groupDir, 'dashboard');
if (!fs.existsSync(dashboardRouteDir)) {
    fs.mkdirSync(dashboardRouteDir);
}
// move page.tsx to dashboard/page.tsx
if (fs.existsSync(path.join(groupDir, 'page.tsx'))) {
    fs.cpSync(path.join(groupDir, 'page.tsx'), path.join(dashboardRouteDir, 'page.tsx'));
}

// Rename routes inside the copy
const renames = {
    'intelligence': 'intelligence-center',
    'scraper': 'scraper-command',
    'sources': 'sources-config',
    'proxy': 'proxy-manager'
};

for (const [oldName, newName] of Object.entries(renames)) {
    const oldPath = path.join(groupDir, oldName);
    const newPath = path.join(groupDir, newName);
    if (fs.existsSync(oldPath)) {
        fs.cpSync(oldPath, newPath, { recursive: true });
    }
}

// Clean up original/stale
for (const [oldName,] of Object.entries(renames)) {
    const oldPath = path.join(groupDir, oldName);
    if (fs.existsSync(oldPath)) {
        try { fs.rmSync(oldPath, { recursive: true, force: true }); } catch (e) { }
    }
}
if (fs.existsSync(path.join(groupDir, 'page.tsx'))) {
    try { fs.rmSync(path.join(groupDir, 'page.tsx'), { force: true }); } catch (e) { }
}
if (fs.existsSync(dashboardDir)) {
    try { fs.rmSync(dashboardDir, { recursive: true, force: true }); } catch (e) {
        console.log("Could not fully delete original dashboard dir due to locks");
    }
}

console.log('Refactoring complete');
