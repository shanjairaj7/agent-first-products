import type { ToolEntry } from '../../data/schema';
import { ToolCard } from '../ToolCard';

interface Props {
  tools: ToolEntry[];
  base?: string;
}

export function ToolGrid({ tools, base = '' }: Props) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-white mb-2">No tools found</h3>
        <p className="text-sm text-zinc-500 max-w-sm">
          Try adjusting your filters or search query. New tools are added regularly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 animate-fade-in">
      {tools.map(tool => (
        <ToolCard key={tool.slug} tool={tool} base={base} />
      ))}
    </div>
  );
}
