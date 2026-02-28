import type { ToolEntry } from '../data/schema';
import { getScoreColor } from '../lib/scores';

interface Props {
  tool: ToolEntry;
  base?: string;
  index?: number;
}

const IFACES: { key: keyof ToolEntry['interfaces']; label: string; color: string }[] = [
  { key: 'api',     label: 'API',  color: '#3b82f6' },
  { key: 'sdk',     label: 'SDK',  color: '#a855f7' },
  { key: 'cli',     label: 'CLI',  color: '#f97316' },
  { key: 'mcp',     label: 'MCP',  color: '#10b981' },
  { key: 'webhook', label: 'Hook', color: '#eab308' },
  { key: 'graphql', label: 'GQL',  color: '#ec4899' },
];

const SIGNUP_CONFIG = {
  'api':                  { label: '⚡',  color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
  'website-bot-friendly': { label: '🤖',  color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
  'human-only':           { label: '👤',  color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
} as const;

const CATEGORY_EMOJI: Record<string, string> = {
  search: '🔍', automation: '⚙️', data: '📊', infrastructure: '🏗️',
  observability: '📈', compute: '💻', payments: '💳', auth: '🔐',
  orchestration: '🎯', browser: '🌐', 'mcp-server': '🔌',
};

export function ToolCard({ tool, base = '', index = 0 }: Props) {
  const { hex } = getScoreColor(tool.agentFirstScore);
  const signup = SIGNUP_CONFIG[tool.signup.method];
  const delay = Math.min(index * 20, 300);

  return (
    <a
      href={`${base}/tools/${tool.slug}`}
      className="tool-row group no-underline animate-row-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Left accent bar */}
      <div
        className="flex-shrink-0 self-stretch transition-all duration-200 group-hover:w-[5px]"
        style={{ width: '3px', backgroundColor: hex }}
      />

      {/* Score — compact */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center"
        style={{ width: '40px', borderRight: '1px solid #1d1d2e', padding: '6px 0' }}
      >
        <span className="score-num leading-none" style={{ color: hex, fontSize: '15px' }}>
          {tool.agentFirstScore}
        </span>
      </div>

      {/* Logo — compact */}
      <div className="flex-shrink-0 flex items-center justify-center" style={{ padding: '6px 8px' }}>
        <div className="w-5 h-5 rounded overflow-hidden flex items-center justify-center flex-shrink-0" style={{ background: '#1d1d2e' }}>
          {tool.logoUrl ? (
            <img
              src={tool.logoUrl} alt="" width={20} height={20}
              className="w-full h-full object-contain"
              onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
            />
          ) : (
            <span style={{ fontSize: '10px' }}>{CATEGORY_EMOJI[tool.category] ?? '🛠️'}</span>
          )}
        </div>
      </div>

      {/* Name + category */}
      <div
        className="flex items-center gap-2 min-w-0 flex-1 pr-2"
        style={{ borderRight: '1px solid #1d1d2e', padding: '6px 8px 6px 0' }}
      >
        <span className="text-[12px] font-semibold text-white truncate leading-none block transition-transform duration-150 group-hover:translate-x-0.5">
          {tool.name}
        </span>
        <span className="text-[8px] font-mono uppercase tracking-widest flex-shrink-0 hidden sm:inline" style={{ color: '#3a3a5c' }}>
          {tool.category.replace('-', ' ')}
        </span>
      </div>

      {/* Interfaces — desktop only */}
      <div
        className="hidden lg:flex items-center gap-0.5 flex-shrink-0"
        style={{ borderRight: '1px solid #1d1d2e', padding: '6px 8px' }}
      >
        {IFACES.map(iface => {
          const active = tool.interfaces[iface.key];
          return (
            <span
              key={iface.key}
              className="px-1 py-px rounded text-[8px] font-mono font-semibold"
              style={active
                ? { color: iface.color, backgroundColor: `${iface.color}15`, border: `1px solid ${iface.color}20` }
                : { color: '#1d1d2e', backgroundColor: 'transparent', border: '1px solid #161622' }
              }
            >
              {iface.label}
            </span>
          );
        })}
      </div>

      {/* Signup + free — tight */}
      <div className="flex-shrink-0 flex items-center gap-1.5" style={{ padding: '6px 8px', minWidth: '52px' }}>
        <span
          className="text-[10px]"
          style={{ color: signup.color }}
          title={tool.signup.method}
        >
          {signup.label}
        </span>
        {tool.pricing.hasFree && (
          <span className="text-[8px] font-mono font-medium hidden sm:inline" style={{ color: '#0d9488' }}>Free</span>
        )}
      </div>
    </a>
  );
}
