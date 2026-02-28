# Contributing to Agent First Products Registry

All contributions welcome — tools, score corrections, data fixes, and tooling improvements.

---

## Ways to contribute

| Path | Best for |
|------|----------|
| [Pull Request](#pull-request) | Adding/editing tools, fixing data |
| [GitHub Issue](#github-issue) | Submissions you can't PR yourself |
| [GitHub API](#github-api-for-agents) | Agents submitting programmatically |
| [Score Challenge](#challenge-a-score) | Disputing an existing score |

---

## Pull Request

The fastest path to getting a tool added.

**1. Fork and clone**

```bash
git clone https://github.com/YOUR_USERNAME/agent-first-products
cd agent-first-products
npm install
```

**2. Add a tool JSON file**

```bash
# Use an existing tool as reference
cp src/data/tools/browserbase.json src/data/tools/your-tool.json
```

Each tool is a single JSON file in `src/data/tools/`. The filename must match the `slug` field.

**3. Fill in the data**

```jsonc
{
  "name": "Your Tool",           // Display name
  "slug": "your-tool",           // Matches filename, URL-safe
  "description": "...",          // 10–300 chars, one sentence, what it does for agents
  "website": "https://...",
  "logoUrl": "https://...",      // Optional, 64×64 px preferred, GitHub avatar works great

  "category": "infrastructure",  // See categories below

  "agentFirstScore": 8,          // See scoring guide below

  "interfaces": {
    "api":     true,   // REST API available
    "sdk":     true,   // SDK available
    "cli":     false,  // CLI available
    "mcp":     true,   // Model Context Protocol server
    "webhook": false,  // Webhook event delivery
    "graphql": false   // GraphQL API
  },

  "signup": {
    "method": "website-bot-friendly",  // See signup methods below
    "hasAgentAuth": true,              // M2M tokens / service accounts
    "allowsBots": true                 // Explicitly allows non-human signups
  },

  "allFeaturesViaAPI": true,     // Can agents do everything without the dashboard?

  "sdkLanguages": ["python", "typescript"],  // lowercase
  "mcpServerUrl": "https://github.com/...", // null if none

  "pricing": {
    "hasFree": true,
    "model": "usage-based"   // "usage-based" | "subscription" | "free" | "enterprise"
  },

  "tags": ["web-scraping", "playwright"],   // lowercase, hyphenated
  "addedAt": "2026-02-28T00:00:00.000Z",    // today's date
  "verified": false                          // maintainer sets to true after review
}
```

**4. Validate**

```bash
npm run validate
# Must output: 1 valid   0 errors
```

**5. Open a PR**

```
feat(registry): add [Tool Name]
```

---

## GitHub Issue

Use the [Add Tool form](https://github.com/shanjairaj7/agent-first-products/issues/new?template=add-tool.yml&labels=tool-submission).

Once you submit:
1. A maintainer reviews the issue
2. Applies the `tool-submission` label
3. An Actions workflow auto-parses the form and opens a PR
4. You can track it from there

---

## GitHub API (for agents)

Agents can submit tools without a browser. The registry is self-consistent — it catalogs agent-first tools and accepts contributions from agents.

**Via GitHub REST API:**

```bash
curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  https://api.github.com/repos/shanjairaj7/agent-first-products/issues \
  -d @- <<'EOF'
{
  "title": "[Tool] Tavily",
  "labels": ["tool-submission"],
  "body": "### Tool Name\nTavily\n\n### Website URL\nhttps://tavily.com\n\n### Description\nReal-time web search API purpose-built for AI agents and RAG pipelines.\n\n### Category\nsearch\n\n### Agent-First Score (1–10)\n9\n\n### Available Interfaces\n- [x] Has API\n- [x] Has SDK\n- [ ] Has CLI\n- [x] Has MCP\n- [ ] Has Webhook\n- [ ] Has GraphQL\n\n### Signup Method\nwebsite-bot-friendly\n\n### Pricing Model\nusage-based\n\n### Free Tier\n- [x] Free tier available\n\n### SDK Languages\npython, typescript\n\n### MCP Server URL\nhttps://github.com/tavily-ai/tavily-mcp\n\n### Tags\nweb-search, rag, citations"
}
EOF
```

**Via `gh` CLI:**

```bash
gh issue create \
  --repo shanjairaj7/agent-first-products \
  --title "[Tool] Tool Name" \
  --label tool-submission \
  --body "$(cat tool-submission.md)"
```

**Via the GitHub MCP server** (if your agent uses MCP):

```
Use the create_issue tool with:
  repo: shanjairaj7/agent-first-products
  title: "[Tool] Tool Name"
  labels: ["tool-submission"]
  body: <structured issue body>
```

---

## Categories

| ID | Label | What belongs here |
|----|-------|-------------------|
| `search` | Search | Web search and research APIs |
| `automation` | Automation | Workflow and task automation |
| `data` | Data | Data extraction, scraping, processing |
| `infrastructure` | Infrastructure | Databases, storage, compute |
| `observability` | Observability | Monitoring, logging, tracing |
| `compute` | Compute | Code execution, sandboxing |
| `payments` | Payments | Payment processing, agentic commerce |
| `auth` | Auth | Authentication, authorization, M2M |
| `orchestration` | Orchestration | Agent frameworks and orchestrators |
| `browser` | Browser | Browser automation, headless browsing |
| `mcp-server` | MCP Server | Standalone MCP servers |

---

## Scoring Guide

```
10  Native      Built exclusively for agents.
                API-only product. Programmatic signup.
                Zero dashboard required. M2M auth native.

 9  Excellent   Core product is API-first.
                All features via API. Bot-friendly signup.
                Agent auth supported.

7–8 Strong      Most features via API.
                Dashboard exists but is optional.
                API key / service token auth.

5–6 Partial     Key features need the dashboard.
                API is secondary to the UI.
                Standard OAuth only.

1–4 Limited     API is thin (read-only, rate-limited, etc).
                Most value requires human interaction.
```

**Signup methods:**

| Method | Meaning |
|--------|---------|
| `api` | Agent can register programmatically — no browser, no human |
| `website-bot-friendly` | Web form allows bots — no CAPTCHA, no email verification |
| `human-only` | Requires human to sign up — agent needs pre-provisioned credentials |

---

## Challenge a Score

If you think a tool's score is wrong, open an issue:

```
Title: [Score] Tavily should be 10, not 9
```

Include:
- Why you believe the score should change
- Evidence (docs links, API examples, etc.)

Maintainers will review and update if warranted.

---

## PR Checklist

Before submitting:

- [ ] `slug` matches the filename (`your-tool.json` → `"slug": "your-tool"`)
- [ ] `description` is under 300 characters
- [ ] `website` is a valid URL
- [ ] `logoUrl` resolves to an actual image (GitHub org avatar preferred)
- [ ] All `interfaces` booleans are accurate (check the docs)
- [ ] `signup.method` is correctly set
- [ ] `addedAt` is today's date in ISO format
- [ ] `verified` is `false` (maintainer will set to `true`)
- [ ] `npm run validate` passes with 0 errors

---

## Local Dev

```bash
npm install
npm run dev      # dev server on :4321
npm run validate # validate all tools
npm run build    # production build
```

---

Thank you for contributing.
