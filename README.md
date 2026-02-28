<div align="center">

<br />

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   🤖  Agent First Products Registry                     │
│                                                         │
│   A curated, scored registry of tools built             │
│   natively for AI agents — not ported to them.          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

[![Tools](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fshanjairaj7.github.io%2Fagent-first-products%2Fapi%2Fmeta.json&query=%24.total&label=tools&color=6366f1&labelColor=18181b&style=flat-square)](https://shanjairaj7.github.io/agent-first-products)
[![MCP](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fshanjairaj7.github.io%2Fagent-first-products%2Fapi%2Fmeta.json&query=%24.interfaceCounts.mcp&label=with%20MCP&color=10b981&labelColor=18181b&style=flat-square)](https://shanjairaj7.github.io/agent-first-products/api/by-interface/mcp.json)
[![Avg Score](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fshanjairaj7.github.io%2Fagent-first-products%2Fapi%2Fmeta.json&query=%24.avgScore&label=avg%20score&suffix=%2F10&color=f59e0b&labelColor=18181b&style=flat-square)](https://shanjairaj7.github.io/agent-first-products)
[![OpenAPI](https://img.shields.io/badge/OpenAPI-3.1-6366f1?style=flat-square&labelColor=18181b)](https://shanjairaj7.github.io/agent-first-products/api/openapi.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-zinc?style=flat-square&labelColor=18181b)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-emerald?style=flat-square&labelColor=18181b)](CONTRIBUTING.md)

**[Registry →](https://shanjairaj7.github.io/agent-first-products)** · **[API →](https://shanjairaj7.github.io/agent-first-products/api/tools.json)** · **[OpenAPI Spec →](https://shanjairaj7.github.io/agent-first-products/api/openapi.json)** · **[Submit a Tool →](CONTRIBUTING.md)**

</div>

---

## What is this?

Most software registries are built for humans browsing a marketplace. This one is built for **AI agents evaluating tools**.

Every tool is scored `1–10` on how agent-native it actually is:

| Factor | What we measure |
|--------|----------------|
| **Signup** | Can an agent sign up via API — no browser, no human? |
| **Interfaces** | API · SDK · CLI · MCP · Webhook · GraphQL |
| **Coverage** | Are 100% of features accessible without the dashboard? |
| **Auth** | Machine-to-machine tokens, not just human OAuth? |

The registry itself is an API. No scraping. No UI required.

---

## Quickstart

```bash
# All tools, sorted by agent-first score
curl https://shanjairaj7.github.io/agent-first-products/api/tools.json | jq '.[0]'

# Only tools with an MCP server
curl https://shanjairaj7.github.io/agent-first-products/api/by-interface/mcp.json \
  | jq '.[].name'

# Only tools agents can sign up to without a human
curl https://shanjairaj7.github.io/agent-first-products/api/tools.json \
  | jq '[.[] | select(.signup.method == "api")] | .[].name'

# Filter client-side with jq: score 9+, has SDK, free tier
curl https://shanjairaj7.github.io/agent-first-products/api/tools.json \
  | jq '[.[] | select(.agentFirstScore >= 9 and .interfaces.sdk == true and .pricing.hasFree == true)]'

# Registry stats
curl https://shanjairaj7.github.io/agent-first-products/api/meta.json
```

---

## API Reference

All endpoints are static JSON files served from GitHub Pages CDN. No auth. No rate limits. CORS open.

| Endpoint | Description |
|----------|-------------|
| `GET /api/tools.json` | All tools, sorted by score |
| `GET /api/meta.json` | Stats: totals, avg score, interface counts |
| `GET /api/by-category/{category}.json` | Filter by category |
| `GET /api/by-interface/{interface}.json` | Filter by interface type |
| `GET /api/openapi.json` | OpenAPI 3.1 spec |

**Categories:** `search` · `automation` · `data` · `infrastructure` · `observability` · `compute` · `payments` · `auth` · `orchestration` · `browser` · `mcp-server`

**Interfaces:** `api` · `sdk` · `cli` · `mcp` · `webhook` · `graphql`

```bash
# All MCP tools
curl .../api/by-interface/mcp.json

# All search tools
curl .../api/by-category/search.json

# Full OpenAPI spec (import to Postman, Scalar, etc.)
curl .../api/openapi.json
```

---

## Scoring System

```
Score   Label       What it means
──────────────────────────────────────────────────────
9–10    Native      Built exclusively for agents.
                    API-only, no dashboard required,
                    programmatic signup.

7–8     Strong      Core features via API. Dashboard
                    optional. Agent auth supported.

5–6     Partial     Some features need the dashboard.
                    No agent-specific auth.

1–4     Limited     API available but most value
                    requires human interaction.
```

Score is set per tool by maintainers and can be challenged via [GitHub Issues](https://github.com/shanjairaj7/agent-first-products/issues/new?template=challenge-score.yml).

---

## Data Schema

Each tool is a validated JSON file. The full schema is in [`src/data/schema.ts`](src/data/schema.ts).

```jsonc
{
  "name": "Browserbase",
  "slug": "browserbase",
  "description": "Headless browser infrastructure built for AI agents.",
  "website": "https://browserbase.com",
  "category": "browser",
  "agentFirstScore": 9,

  "interfaces": {
    "api": true,  "sdk": true,  "cli": false,
    "mcp": true,  "webhook": false, "graphql": false
  },

  "signup": {
    "method": "website-bot-friendly",  // "api" | "website-bot-friendly" | "human-only"
    "hasAgentAuth": true,
    "allowsBots": true
  },

  "allFeaturesViaAPI": true,
  "sdkLanguages": ["python", "typescript"],
  "mcpServerUrl": "https://github.com/browserbase/mcp-server-browserbase",

  "pricing": {
    "hasFree": true,
    "model": "usage-based"              // "usage-based" | "subscription" | "free" | "enterprise"
  },

  "tags": ["browser-automation", "stealth", "playwright"],
  "addedAt": "2026-02-28T00:00:00.000Z",
  "verified": true
}
```

---

## Add a Tool

Three paths — including one built for agents:

### 1. Pull Request (humans)

```bash
# Fork → add a file → open PR
cp src/data/tools/browserbase.json src/data/tools/mytool.json
# Edit mytool.json with your tool's data
npm run validate  # must pass before PR
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full PR checklist.

### 2. GitHub Issue (humans + bots)

Use the structured [Add Tool issue form](https://github.com/shanjairaj7/agent-first-products/issues/new?template=add-tool.yml&labels=tool-submission).

A maintainer reviews → applies the `tool-submission` label → an Actions workflow auto-parses the issue and opens a PR with the new `src/data/tools/{slug}.json`.

### 3. GitHub API (agents)

An agent can submit a tool entirely via API — no browser required:

```bash
# Submit via GitHub REST API
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/shanjairaj7/agent-first-products/issues \
  -d '{
    "title": "[Tool] My Tool Name",
    "labels": ["tool-submission"],
    "body": "### Tool Name\nMyTool\n\n### Website URL\nhttps://mytool.com\n\n### Description\nOne sentence about what it does for agents.\n\n### Category\ninfrastructure\n\n### Agent-First Score (1–10)\n8\n\n### Available Interfaces\n- [x] Has API\n- [x] Has SDK\n- [ ] Has CLI\n- [x] Has MCP\n- [ ] Has Webhook\n- [ ] Has GraphQL\n\n### Signup Method\nwebsite-bot-friendly\n\n### Pricing Model\nusage-based\n\n### Free Tier\n- [x] Free tier available\n\n### SDK Languages\npython, typescript\n\n### Tags\nmy-tag, another-tag"
  }'
```

```bash
# Or via gh CLI (works in any shell an agent controls)
gh issue create \
  --repo shanjairaj7/agent-first-products \
  --title "[Tool] My Tool Name" \
  --label tool-submission \
  --body "..."
```

```
Submission flow:
─────────────────────────────────────────────────────
Agent/human opens issue  →  Maintainer reviews
                         →  Applies 'tool-submission' label
                         →  Actions workflow parses issue
                         →  Creates PR with {slug}.json
                         →  Maintainer merges
                         →  Site auto-redeploys
                         →  Tool live in /api/tools.json
─────────────────────────────────────────────────────
```

---

## Project Structure

```
agent-first-products/
├── src/
│   ├── data/
│   │   ├── tools/          # One JSON file per tool
│   │   ├── schema.ts       # Zod schema — single source of truth
│   │   └── registry.ts     # Build-time loader
│   ├── pages/
│   │   ├── api/            # Static JSON endpoints
│   │   ├── tools/[slug]    # Tool detail pages
│   │   ├── index.astro     # Registry dashboard
│   │   └── submit.astro    # Submit form
│   └── components/
│       ├── islands/        # React interactive components
│       └── *.tsx           # Static UI components
├── scripts/
│   └── validate-registry.ts
└── .github/
    ├── workflows/
    │   ├── deploy.yml          # Build + deploy to Pages on push
    │   └── parse-issue.yml     # Issue → PR automation
    └── ISSUE_TEMPLATE/
        └── add-tool.yml        # Structured submission form
```

---

## Local Development

```bash
git clone https://github.com/shanjairaj7/agent-first-products
cd agent-first-products
npm install
npm run dev        # http://localhost:4321
npm run validate   # validate all tool JSON files
npm run build      # production build → dist/
```

**Adding a tool locally:**

```bash
# Copy the template
cp src/data/tools/browserbase.json src/data/tools/your-tool.json
# Edit the file
# Run validation
npm run validate
# If it passes, open a PR
```

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | [Astro](https://astro.build) — static output, React islands |
| Styling | Tailwind CSS v3 |
| Schema | Zod — validates all tool JSON at build time |
| Interactive UI | React (category tabs, filters, search) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |
| API | Pre-rendered static JSON |

---

## Contributing

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for:
- Full PR checklist for adding tools
- Score calibration guidelines
- How to challenge an existing score
- Agent submission instructions

All contributions welcome — tools, fixes, score corrections, and tooling improvements.

---

<div align="center">

Built by **[shanjairaj7](https://github.com/shanjairaj7)** · Part of the [Commune](https://commune.email) ecosystem

*The registry itself is agent-first: full API, no login, curl from anywhere.*

</div>
