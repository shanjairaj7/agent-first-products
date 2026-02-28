import type { ToolEntry } from '../data/schema';

export interface FilterState {
  search: string;
  categories: string[];
  interfaces: string[];      // 'api' | 'sdk' | 'cli' | 'mcp' | 'webhook' | 'graphql'
  signupMethod: string[];    // 'api' | 'website-bot-friendly' | 'human-only'
  minScore: number;
  hasFree: boolean | null;
  mcpOnly: boolean;
}

export type SortKey = 'score' | 'alphabetical' | 'newest';

export const DEFAULT_FILTERS: FilterState = {
  search: '',
  categories: [],
  interfaces: [],
  signupMethod: [],
  minScore: 1,
  hasFree: null,
  mcpOnly: false,
};

export function applyFilters(
  tools: ToolEntry[],
  filters: FilterState,
  sort: SortKey,
): ToolEntry[] {
  let result = tools.filter(t => {
    // Text search across name, description, tags
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const haystack = [t.name, t.description, ...t.tags, t.category].join(' ').toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    // Category filter (OR logic: any selected)
    if (filters.categories.length > 0 && !filters.categories.includes(t.category)) return false;

    // Interface filter (AND logic: must have ALL selected interfaces)
    if (filters.interfaces.length > 0) {
      const hasAll = filters.interfaces.every(
        iface => t.interfaces[iface as keyof typeof t.interfaces] === true,
      );
      if (!hasAll) return false;
    }

    // Signup method filter (OR logic)
    if (filters.signupMethod.length > 0 && !filters.signupMethod.includes(t.signup.method)) return false;

    // Minimum score
    if (t.agentFirstScore < filters.minScore) return false;

    // Free tier
    if (filters.hasFree !== null && t.pricing.hasFree !== filters.hasFree) return false;

    // MCP-only shortcut
    if (filters.mcpOnly && !t.interfaces.mcp) return false;

    return true;
  });

  // Sort
  switch (sort) {
    case 'score':
      result = result.sort((a, b) => b.agentFirstScore - a.agentFirstScore);
      break;
    case 'alphabetical':
      result = result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
      result = result.sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      );
      break;
  }

  return result;
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.search.trim()) count++;
  count += filters.categories.length;
  count += filters.interfaces.length;
  count += filters.signupMethod.length;
  if (filters.minScore > 1) count++;
  if (filters.hasFree !== null) count++;
  if (filters.mcpOnly) count++;
  return count;
}
