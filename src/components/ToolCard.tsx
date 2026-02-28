import type { ToolEntry } from '../data/schema';
import { ScoreRing } from './ScoreRing';
import { InterfaceBadges } from './InterfaceBadges';
import { SignupBadge } from './SignupBadge';
import { getScoreColor } from '../lib/scores';

interface Props {
  tool: ToolEntry;
  base?: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  search: '🔍',
  automation: '⚙️',
  data: '📊',
  infrastructure: '🏗️',
  observability: '📈',
  compute: '💻',
  payments: '💳',
  auth: '🔐',
  orchestration: '🎯',
  browser: '🌐',
  'mcp-server': '🔌',
};

export function ToolCard({ tool, base = '' }: Props) {
  const { border } = getScoreColor(tool.agentFirstScore);

  return (
    <a
      href={`${base}/tools/${tool.slug}`}
      className="group relative flex flex-col gap-3 p-5 rounded-xl bg-zinc-900 border border-zinc-800
                 hover:border-zinc-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40
                 transition-all duration-150 cursor-pointer no-underline"
    >
      {/* Top row: Logo + name + score */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Logo / emoji fallback */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center">
            {tool.logoUrl ? (
              <img
                src={tool.logoUrl}
                alt={tool.name}
                width={40}
                height={40}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span className="text-xl">{CATEGORY_EMOJI[tool.category] ?? '🛠️'}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-sm leading-snug truncate group-hover:text-zinc-100">
              {tool.name}
            </h3>
            <span className="text-[11px] text-zinc-500 capitalize flex items-center gap-1">
              <span>{CATEGORY_EMOJI[tool.category]}</span>
              <span>{tool.category.replace('-', ' ')}</span>
            </span>
          </div>
        </div>

        {/* Score ring */}
        <div className="flex-shrink-0">
          <ScoreRing score={tool.agentFirstScore} size={48} />
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2 min-h-[2.5rem]">
        {tool.description}
      </p>

      {/* Interface badges */}
      <InterfaceBadges interfaces={tool.interfaces} />

      {/* Footer: signup + meta */}
      <div className="flex items-center justify-between pt-0.5 flex-wrap gap-2">
        <SignupBadge method={tool.signup.method} />
        <div className="flex items-center gap-2">
          {tool.pricing.hasFree && (
            <span className="text-[10px] font-medium text-teal-400 flex items-center gap-0.5">
              <span>✦</span> Free
            </span>
          )}
          {tool.interfaces.mcp && (
            <span className="text-[10px] font-mono font-medium text-emerald-400">MCP</span>
          )}
          {tool.verified && (
            <span className="text-[10px] font-medium text-indigo-400 flex items-center gap-0.5">
              <span>✓</span> Verified
            </span>
          )}
        </div>
      </div>

      {/* SDK languages strip — only show if any */}
      {tool.sdkLanguages.length > 0 && (
        <div className="flex items-center gap-1.5 pt-0.5 border-t border-zinc-800">
          <span className="text-[10px] text-zinc-600">SDKs:</span>
          <div className="flex flex-wrap gap-1">
            {tool.sdkLanguages.slice(0, 4).map(lang => (
              <span key={lang} className="text-[9px] text-zinc-500 font-mono bg-zinc-800 px-1 py-0.5 rounded">
                {lang}
              </span>
            ))}
            {tool.sdkLanguages.length > 4 && (
              <span className="text-[9px] text-zinc-600 font-mono">+{tool.sdkLanguages.length - 4}</span>
            )}
          </div>
        </div>
      )}
    </a>
  );
}
