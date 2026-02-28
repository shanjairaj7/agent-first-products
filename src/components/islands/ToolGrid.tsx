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
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl"
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

  return (
    <div key={listKey} className="flex flex-col gap-1.5">
      {tools.map((tool, i) => (
        <ToolCard key={tool.slug} tool={tool} base={base} index={i} />
      ))}
    </div>
  );
}
