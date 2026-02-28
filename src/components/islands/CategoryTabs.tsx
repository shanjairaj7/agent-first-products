import type { ToolEntry, Category } from '../../data/schema';
import { CATEGORIES } from '../../data/schema';

interface Props {
  tools: ToolEntry[];
  active: Category | null;
  onChange: (c: Category | null) => void;
}

export function CategoryTabs({ tools, active, onChange }: Props) {
  const tabs = [
    { id: null as Category | null, label: 'All', emoji: '◈', count: tools.length },
    ...CATEGORIES
      .map(c => ({
        id: c.id as Category | null,
        label: c.label,
        emoji: c.emoji,
        count: tools.filter(t => t.category === c.id).length,
      }))
      .filter(c => c.count > 0),
  ];

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-0.5 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id ?? '__all__'}
            onClick={() => onChange(tab.id)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium whitespace-nowrap flex-shrink-0 transition-all duration-150"
            style={isActive
              ? {
                  background: 'rgba(124,58,237,0.12)',
                  color: '#a78bfa',
                  border: '1px solid rgba(124,58,237,0.3)',
                }
              : {
                  background: 'transparent',
                  color: '#52526a',
                  border: '1px solid #1d1d2e',
                }
            }
          >
            <span className="text-[12px] leading-none">{tab.emoji}</span>
            <span>{tab.label}</span>
            <span
              className="text-[9px] font-mono tabular-nums px-1 py-0.5 rounded"
              style={isActive
                ? { background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }
                : { color: '#3a3a5c' }
              }
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
