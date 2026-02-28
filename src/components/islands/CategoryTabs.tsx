import type { ToolEntry, Category } from '../../data/schema';
import { CATEGORIES } from '../../data/schema';

interface Props {
  tools: ToolEntry[];
  active: Category | null;
  onChange: (c: Category | null) => void;
}

export function CategoryTabs({ tools, active, onChange }: Props) {
  const total = tools.length;

  const tabs = [
    { id: null, label: 'All', emoji: '◈', count: total },
    ...CATEGORIES
      .map(c => ({ id: c.id as Category | null, label: c.label, emoji: c.emoji, count: tools.filter(t => t.category === c.id).length }))
      .filter(c => c.count > 0),
  ];

  return (
    <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5 -mx-1 px-1">
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id ?? '__all__'}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap
              transition-all duration-100 flex-shrink-0 border
              ${isActive
                ? 'bg-white text-zinc-900 border-white shadow-sm'
                : 'bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
              }
            `}
          >
            <span className="text-[13px] leading-none">{tab.emoji}</span>
            <span>{tab.label}</span>
            <span
              className={`
                text-[10px] font-mono tabular-nums px-1 py-0.5 rounded
                ${isActive ? 'bg-zinc-200 text-zinc-700' : 'text-zinc-600'}
              `}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
