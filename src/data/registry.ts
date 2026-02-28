import { ToolSchema, type ToolEntry, type Category, CATEGORIES } from './schema';

// Astro's import.meta.glob loads all JSON at build time — no manual index needed
const raw = import.meta.glob('./tools/*.json', { eager: true });

export const TOOLS: ToolEntry[] = Object.entries(raw)
  .map(([path, mod]) => {
    const parsed = ToolSchema.safeParse((mod as { default: unknown }).default);
    if (!parsed.success) {
      throw new Error(`Invalid tool data at ${path}:\n${parsed.error.message}`);
    }
    return parsed.data;
  })
  .sort((a, b) => b.agentFirstScore - a.agentFirstScore);

export function getToolBySlug(slug: string): ToolEntry | undefined {
  return TOOLS.find(t => t.slug === slug);
}

export function getToolsByCategory(category: Category): ToolEntry[] {
  return TOOLS.filter(t => t.category === category);
}

export function getToolsByInterface(iface: keyof ToolEntry['interfaces']): ToolEntry[] {
  return TOOLS.filter(t => t.interfaces[iface] === true);
}

export function getRegistryMeta() {
  const total = TOOLS.length;
  const verified = TOOLS.filter(t => t.verified).length;
  const avgScore = total > 0
    ? +(TOOLS.reduce((s, t) => s + t.agentFirstScore, 0) / total).toFixed(1)
    : 0;

  const categories = CATEGORIES.map(cat => ({
    ...cat,
    count: TOOLS.filter(t => t.category === cat.id).length,
  })).filter(c => c.count > 0);

  const interfaceCounts = {
    api:     TOOLS.filter(t => t.interfaces.api).length,
    sdk:     TOOLS.filter(t => t.interfaces.sdk).length,
    cli:     TOOLS.filter(t => t.interfaces.cli).length,
    mcp:     TOOLS.filter(t => t.interfaces.mcp).length,
    webhook: TOOLS.filter(t => t.interfaces.webhook).length,
    graphql: TOOLS.filter(t => t.interfaces.graphql).length,
  };

  return { total, verified, avgScore, categories, interfaceCounts };
}
