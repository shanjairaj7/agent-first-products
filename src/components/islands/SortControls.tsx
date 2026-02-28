import type { SortKey } from '../../lib/filters';

interface Props {
  value: SortKey;
  onChange: (v: SortKey) => void;
}

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'score',       label: 'Score' },
  { key: 'alphabetical', label: 'A–Z' },
  { key: 'newest',      label: 'Newest' },
];

export function SortControls({ value, onChange }: Props) {
  return (
    <div className="flex items-center rounded-lg border border-zinc-700 overflow-hidden">
      {OPTIONS.map(opt => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-3 h-10 text-xs font-medium transition-colors
            ${value === opt.key
              ? 'bg-zinc-700 text-white'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
