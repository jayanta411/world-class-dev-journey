# 📊 World-Class Dev — Progress Tracker

A Next.js 14 app that reads your `notes/*.md` files from GitHub and displays a live progress dashboard.

## Features
- 📊 **Dashboard** — Overall % done, current week, DSA count
- 🗺️ **Roadmap** — All 24 weeks with checked/unchecked tasks
- 🧮 **DSA Tracker** — Problem log, pattern breakdown bars
- 📓 **Weekly Log** — Week-by-week entries

## How It Works
Reads `notes/roadmap.md` and `notes/dsa.md` via GitHub API.
Parses `[x]` = done, `[ ]` = pending.
Revalidates every 60 seconds — push a checkbox update, see it live in ~1 min.

## Deploy to Vercel (Free, 5 min)
1. [vercel.com/new](https://vercel.com/new) → Import this repo
2. Set **Root Directory** → `tracker`
3. Add env var: `GITHUB_TOKEN` = your GitHub PAT (optional)
4. Click **Deploy** ✅

## Local Dev
```bash
cd tracker
npm install
cp .env.example .env.local
npm run dev
```

## MCP Setup (Stitch)
This workspace includes MCP configuration at `.vscode/mcp.json` with a `stitch` server.

1. Open Command Palette (`Ctrl+Shift+P`) and run `MCP: Open Workspace Folder MCP Configuration`.
2. Confirm the `stitch` server entry is present.
3. Start the server via `MCP: List Servers` -> `stitch` -> `Start`.
4. On first start, VS Code prompts for `stitchApiKey`.
5. In Chat, open tool picker and verify `stitch` tools appear.

The server URL is fixed to `https://stitch.googleapis.com/mcp`, and the request uses the `X-Goog-Api-Key` header.

If you need to force VS Code to prompt for the API key again, rename the input id in `.vscode/mcp.json` and restart the `stitch` server.