import type { ToolEntry } from '../data/schema';
import { getScoreColor } from '../lib/scores';

interface Props {
  tool: ToolEntry;
  base?: string;
}

// All interface keys in display order
const IFACES: { key: keyof ToolEntry['interfaces']; label: string; color: string }[] = [
  { key: 'api',     label: 'API',  color: '#3b82f6' },
  { key: 'sdk',     label: 'SDK',  color: '#a855f7' },
  { key: 'cli',     label: 'CLI',  color: '#f97316' },
  { key: 'mcp',     label: 'MCP',  color: '#10b981' },
  { key: 'webhook', label: 'Hook', color: '#eab308' },
  { key: 'graphql', label: 'GQL',  color: '#ec4899' },
];

const SIGNUP_CONFIG = {
  'api':                  { label: 'API Signup',   color: '#34d399', bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)'  },
  'website-bot-friendly': { label: 'Bot Friendly', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.2)'  },
  'human-only':           { label: 'Human Only',   color: '#f87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
} as const;

const CATEGORY_EMOJI: Record<string, string> = {
  search: '🔍', automation: '⚙️', data: '📊', infrastructure: '🏗️',
  observability: '📈', compute: '💻', payments: '💳', auth: '🔐',
  orchestration: '🎯', browser: '🌐', 'mcp-server': '🔌',
};

export function ToolCard({ tool, base = '' }: Props) {
  const { hex } = getScoreColor(tool.agentFirstScore);
  const signup = SIGNUP_CONFIG[tool.signup.method];
  const activeIfaces = IFACES.filter(i => tool.interfaces[i.key]);
  const inactiveIfaces = IFACES.filter(i => !tool.interfaces[i.key]);

  return (
    <a
      href={`${base}/tools/${tool.slug}`}
      className="group flex flex-col rounded-xl bg-zinc-900 border border-zinc-800/80
                 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/30
                 transition-all duration-150 no-underline overflow-hidden"
    >
      {/* ── Header ─────────────────────────── */}
      <div className="flex items-start gap-3 px-4 pt-4 pb-3.5">
        {/* Logo */}
        <div className="flex-shrink-0 w-9 h-9 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center">
          {tool.logoUrl ? (
            <img
              src={tool.logoUrl}
              alt=""
              width={36}
              height={36}
              className="w-full h-full object-contain p-0.5"
              onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
            />
          ) : (
            <span className="text-base">{CATEGORY_EMOJI[tool.category] ?? '🛠️'}</span>
          )}
        </div>

        {/* Name + category */}
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="text-[13px] font-semibold text-white leading-snug truncate group-hover:text-zinc-100">
            {tool.name}
          </h3>
          <span className="text-[11px] text-zinc-500 capitalize">
            {tool.category.replace('-', ' ')}
          </span>
        </div>

        {/* Score */}
        <div className="flex-shrink-0 flex flex-col items-end pt-0.5">
          <span
            className="text-xl font-bold font-mono leading-none tabular-nums"
            style={{ color: hex }}
          >
            {tool.agentFirstScore}
          </span>
          <span className="text-[9px] text-zinc-600 font-mono leading-none mt-0.5">/10</span>
        </div>
      </div>

      {/* ── Separator ──────────────────────── */}
      <div className="h-px bg-zinc-800/60 mx-4" />

      {/* ── Interfaces ─────────────────────── */}
      <div className="px-4 py-3 flex items-center gap-1 flex-wrap">
        {activeIfaces.map(iface => (
          <span
            key={iface.key}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border"
            style={{
              color: iface.color,
              backgroundColor: `${iface.color}18`,
              borderColor: `${iface.color}30`,
            }}
          >
            {iface.label}
          </span>
        ))}
        {inactiveIfaces.map(iface => (
          <span
            key={iface.key}
            className="px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-700 border border-zinc-800"
          >
            {iface.label}
          </span>
        ))}
      </div>

      {/* ── Separator ──────────────────────── */}
      <div className="h-px bg-zinc-800/60 mx-4" />

      {/* ── Footer ─────────────────────────── */}
      <div className="px-4 py-2.5 flex items-center gap-2 flex-wrap">
        <span
          className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border"
          style={{ color: signup.color, backgroundColor: signup.bg, borderColor: signup.border }}
        >
          {signup.label}
        </span>

        {tool.pricing.hasFree && (
          <span className="text-[10px] text-teal-400 font-mono">Free</span>
        )}

        {tool.sdkLanguages.length > 0 && (
          <>
            <span className="text-zinc-800 text-[10px]">·</span>
            {tool.sdkLanguages.slice(0, 2).map(lang => (
              <span key={lang} className="text-[10px] font-mono text-zinc-600 capitalize">
                {lang}
              </span>
            ))}
            {tool.sdkLanguages.length > 2 && (
              <span className="text-[10px] font-mono text-zinc-700">
                +{tool.sdkLanguages.length - 2}
              </span>
            )}
          </>
        )}
      </div>
    </a>
  );
}
