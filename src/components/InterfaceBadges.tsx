import type { ToolEntry } from '../data/schema';

type Interfaces = ToolEntry['interfaces'];

const BADGES: {
  key: keyof Interfaces;
  label: string;
  activeClass: string;
  inactiveClass: string;
}[] = [
  {
    key: 'api',
    label: 'API',
    activeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    inactiveClass: 'text-zinc-700 border-zinc-800',
  },
  {
    key: 'sdk',
    label: 'SDK',
    activeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    inactiveClass: 'text-zinc-700 border-zinc-800',
  },
  {
    key: 'cli',
    label: 'CLI',
    activeClass: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    inactiveClass: 'text-zinc-700 border-zinc-800',
  },
  {
    key: 'mcp',
    label: 'MCP',
    activeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    inactiveClass: 'text-zinc-700 border-zinc-800',
  },
  {
    key: 'webhook',
    label: 'Webhook',
    activeClass: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    inactiveClass: 'text-zinc-700 border-zinc-800',
  },
  {
    key: 'graphql',
    label: 'GraphQL',
    activeClass: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
    inactiveClass: 'text-zinc-700 border-zinc-800',
  },
];

interface Props {
  interfaces: Interfaces;
  compact?: boolean;
}

export function InterfaceBadges({ interfaces, compact = false }: Props) {
  const active = BADGES.filter(b => interfaces[b.key]);
  const inactive = BADGES.filter(b => !interfaces[b.key]);

  const all = compact ? active : [...active, ...inactive];

  return (
    <div className="flex flex-wrap gap-1">
      {all.map(b => {
        const isActive = interfaces[b.key];
        return (
          <span
            key={b.key}
            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px]
                        font-mono font-medium border ${isActive ? b.activeClass : b.inactiveClass}`}
            title={isActive ? `Has ${b.label}` : `No ${b.label}`}
          >
            {b.label}
          </span>
        );
      })}
    </div>
  );
}
