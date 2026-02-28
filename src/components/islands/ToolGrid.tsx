import type { ToolEntry } from '../../data/schema';
import { ToolCard } from '../ToolCard';

interface Props {
  tools: ToolEntry[];
  base?: string;
  listKey?: string;
}

export function ToolGrid({ tools, base = '', listKey = '' }: Props) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 text-lg"
          style={{ background: '#0f0f1a', border: '1px solid #1d1d2e' }}
        >
          ⌕
        </div>
        <p className="text-sm font-semibold text-white mb-1">No tools match</p>
        <p className="text-xs" style={{ color: '#4a4a6a' }}>
          Adjust filters or{' '}
          <a href="#" className="underline" style={{ color: '#7c3aed' }}>submit a tool</a>
        </p>
      </div>
    );
  }

  // Split into two columns for xl+ screens
  const mid = Math.ceil(tools.length / 2);
  const col1 = tools.slice(0, mid);
  const col2 = tools.slice(mid);

  return (
    <>
      {/* Single column on mobile/tablet */}
      <div key={listKey} className="flex flex-col gap-px xl:hidden">
        {tools.map((tool, i) => (
          <ToolCard key={tool.slug} tool={tool} base={base} index={i} />
        ))}
      </div>
      {/* Two columns on xl+ */}
      <div key={listKey + '_2col'} className="hidden xl:grid xl:grid-cols-2 xl:gap-x-2 xl:gap-y-px">
        <div className="flex flex-col gap-px">
          {col1.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} base={base} index={i} />
          ))}
        </div>
        <div className="flex flex-col gap-px">
          {col2.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} base={base} index={mid + i} />
          ))}
        </div>
      </div>
    </>
  );
}
