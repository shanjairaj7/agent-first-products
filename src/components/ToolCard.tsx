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
  'api':                  { label: '⚡ API',   color: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)'  },
  'website-bot-friendly': { label: '🤖 Bot',   color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
  'human-only':           { label: '👤 Human', color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
} as const;

const CATEGORY_EMOJI: Record<string, string> = {
  search: '🔍', automation: '⚙️', data: '📊', infrastructure: '🏗️',
  observability: '📈', compute: '💻', payments: '💳', auth: '🔐',
  orchestration: '🎯', browser: '🌐', 'mcp-server': '🔌',
};

export function ToolCard({ tool, base = '', index = 0 }: Props) {
  const { hex } = getScoreColor(tool.agentFirstScore);
  const signup = SIGNUP_CONFIG[tool.signup.method];
  const delay = Math.min(index * 25, 400);

  return (
    <a
      href={`${base}/tools/${tool.slug}`}
      className="tool-row group no-underline animate-row-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Left accent bar — expands on hover via group */}
      <div
        className="flex-shrink-0 self-stretch transition-all duration-200 group-hover:w-[5px]"
        style={{ width: '3px', backgroundColor: hex }}
      />

      {/* Score */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center py-3.5"
        style={{ width: '52px', borderRight: '1px solid #1d1d2e' }}
      >
        <span className="score-num leading-none" style={{ color: hex, fontSize: '18px' }}>
          {tool.agentFirstScore}
        </span>
        <span className="text-[9px] font-mono" style={{ color: '#3a3a5c' }}>/10</span>
      </div>

      {/* Logo */}
      <div className="flex-shrink-0 flex items-center justify-center py-3 px-2.5">
        <div className="w-7 h-7 rounded-md overflow-hidden flex items-center justify-center" style={{ background: '#1d1d2e' }}>
          {tool.logoUrl ? (
            <img
              src={tool.logoUrl} alt="" width={28} height={28}
              className="w-full h-full object-contain p-0.5"
              onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
            />
          ) : (
            <span className="text-sm">{CATEGORY_EMOJI[tool.category] ?? '🛠️'}</span>
          )}
        </div>
      </div>

      {/* Name + category */}
      <div
        className="flex flex-col justify-center py-3 min-w-0 flex-1 pr-3"
        style={{ borderRight: '1px solid #1d1d2e' }}
      >
        <span className="text-[13px] font-semibold text-white truncate leading-snug block transition-transform duration-150 group-hover:translate-x-0.5">
          {tool.name}
        </span>
        <span className="text-[9px] font-mono uppercase tracking-widest mt-0.5" style={{ color: '#4a4a6a' }}>
          {tool.category.replace('-', ' ')}
        </span>
      </div>

      {/* Interfaces — desktop only */}
      <div
        className="hidden sm:flex items-center gap-1 flex-shrink-0 py-3 px-3"
        style={{ borderRight: '1px solid #1d1d2e' }}
      >
        {IFACES.map(iface => {
          const active = tool.interfaces[iface.key];
          return (
            <span
              key={iface.key}
              className="px-1.5 py-0.5 rounded text-[9px] font-mono font-semibold"
              style={active
                ? { color: iface.color, backgroundColor: `${iface.color}15`, border: `1px solid ${iface.color}25` }
                : { color: '#2a2a3d', backgroundColor: 'transparent', border: '1px solid #1d1d2e' }
              }
            >
              {iface.label}
            </span>
          );
        })}
      </div>

      {/* Signup + free */}
      <div className="flex-shrink-0 flex flex-col items-end justify-center py-3 px-3 gap-1" style={{ minWidth: '88px' }}>
        <span
          className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium whitespace-nowrap"
          style={{ color: signup.color, backgroundColor: signup.bg, border: `1px solid ${signup.border}` }}
        >
          {signup.label}
        </span>
        {tool.pricing.hasFree && (
          <span className="text-[9px] font-mono font-medium" style={{ color: '#0d9488' }}>Free</span>
        )}
      </div>
    </a>
  );
}
