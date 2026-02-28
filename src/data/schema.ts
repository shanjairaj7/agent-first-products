import { z } from 'zod';

export const CategoryEnum = z.enum([
  'search',
  'automation',
  'data',
  'infrastructure',
  'observability',
  'compute',
  'payments',
  'auth',
  'orchestration',
  'browser',
  'mcp-server',
]);

export type Category = z.infer<typeof CategoryEnum>;

export const ToolSchema = z.object({
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(10).max(300),
  website: z.string().url(),
  logoUrl: z.string().url().optional(),

  category: CategoryEnum,

  /** Overall agent-first rating 1–10 */
  agentFirstScore: z.number().int().min(1).max(10),

  /** Available programmatic interfaces */
  interfaces: z.object({
    api:     z.boolean(),
    sdk:     z.boolean(),
    cli:     z.boolean(),
    mcp:     z.boolean(),
    webhook: z.boolean(),
    graphql: z.boolean(),
  }),

  /** How agents can sign up and authenticate */
  signup: z.object({
    /** api = fully programmatic, website-bot-friendly = no CAPTCHA/verification, human-only = requires human */
    method: z.enum(['api', 'website-bot-friendly', 'human-only']),
    hasAgentAuth: z.boolean(),
    allowsBots:   z.boolean(),
  }),

  /** Can agents access 100% of features without ever touching the dashboard? */
  allFeaturesViaAPI: z.boolean(),

  sdkLanguages: z.array(z.string()),

  mcpServerUrl: z.string().url().nullable().optional(),

  pricing: z.object({
    hasFree: z.boolean(),
    model:   z.enum(['usage-based', 'subscription', 'free', 'enterprise']),
  }),

  tags:    z.array(z.string()),
  addedAt: z.string().datetime(),
  verified: z.boolean(),
});

export type ToolEntry = z.infer<typeof ToolSchema>;

export const CATEGORIES: { id: Category; label: string; emoji: string; description: string }[] = [
  { id: 'search',         label: 'Search',         emoji: '🔍', description: 'Web search and research APIs' },
  { id: 'automation',     label: 'Automation',     emoji: '⚙️', description: 'Workflow and task automation' },
  { id: 'data',           label: 'Data',           emoji: '📊', description: 'Data extraction and processing' },
  { id: 'infrastructure', label: 'Infrastructure', emoji: '🏗️', description: 'Databases, storage, and compute infrastructure' },
  { id: 'observability',  label: 'Observability',  emoji: '📈', description: 'Monitoring, logging, and tracing' },
  { id: 'compute',        label: 'Compute',        emoji: '💻', description: 'Code execution and sandboxing' },
  { id: 'payments',       label: 'Payments',       emoji: '💳', description: 'Payment processing and commerce' },
  { id: 'auth',           label: 'Auth',           emoji: '🔐', description: 'Authentication and authorization' },
  { id: 'orchestration',  label: 'Orchestration',  emoji: '🎯', description: 'Agent orchestration frameworks' },
  { id: 'browser',        label: 'Browser',        emoji: '🌐', description: 'Browser automation and scraping' },
  { id: 'mcp-server',     label: 'MCP Server',     emoji: '🔌', description: 'Model Context Protocol servers' },
];
