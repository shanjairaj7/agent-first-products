import type { FilterState, SortKey } from '../../lib/filters';

const IFACE_OPTIONS = [
  { key: 'api',     label: 'API',     activeClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { key: 'sdk',     label: 'SDK',     activeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { key: 'cli',     label: 'CLI',     activeClass: 'bg-orange-500/20 text-orange-300 border-orange-500/40' },
  { key: 'mcp',     label: 'MCP',     activeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { key: 'webhook', label: 'Hook',    activeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40' },
  { key: 'graphql', label: 'GQL',     activeClass: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
] as const;

const SIGNUP_OPTIONS = [
  { key: 'api',                  label: '⚡ API',   title: 'Fully programmatic signup' },
  { key: 'website-bot-friendly', label: '🤖 Bot',   title: 'Website allows bots' },
  { key: 'human-only',           label: '👤 Human', title: 'Requires human verification' },
] as const;

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'score',        label: 'Score' },
  { key: 'alphabetical', label: 'A–Z' },
  { key: 'newest',       label: 'New' },
];

interface Props {
  filters: FilterState;
  sort: SortKey;
  onFiltersChange: (f: FilterState) => void;
  onSortChange: (s: SortKey) => void;
  resultCount: number;
  totalCount: number;
  onReset: () => void;
}

function Pill({
  label,
  active,
  onClick,
  activeClass,
  title,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  activeClass?: string;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        px-2.5 py-1 rounded text-[11px] font-mono font-medium border transition-all duration-100 whitespace-nowrap
        ${active
          ? (activeClass ?? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40')
          : 'text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
        }
      `}
    >
      {label}
    </button>
  );
}

export function FilterRow({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  resultCount,
  totalCount,
  onReset,
}: Props) {
  const toggleIface = (key: string) => {
    const arr = filters.interfaces;
    const next = arr.includes(key) ? arr.filter(v => v !== key) : [...arr, key];
    onFiltersChange({ ...filters, interfaces: next });
  };

  const toggleSignup = (key: string) => {
    const arr = filters.signupMethod;
    const next = arr.includes(key) ? arr.filter(v => v !== key) : [...arr, key];
    onFiltersChange({ ...filters, signupMethod: next });
  };

  const hasActiveFilters = filters.interfaces.length > 0 || filters.signupMethod.length > 0
    || filters.hasFree !== null || filters.minScore > 1;

  return (
    <div className="flex flex-col gap-2">
      {/* Main filter row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Interface toggles */}
        <div className="flex items-center gap-1">
          {IFACE_OPTIONS.map(opt => (
            <Pill
              key={opt.key}
              label={opt.label}
              active={filters.interfaces.includes(opt.key)}
              onClick={() => toggleIface(opt.key)}
              activeClass={opt.activeClass}
              title={`Filter: has ${opt.label}`}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-zinc-800 mx-1" />

        {/* Signup method */}
        <div className="flex items-center gap-1">
          {SIGNUP_OPTIONS.map(opt => (
            <Pill
              key={opt.key}
              label={opt.label}
              active={filters.signupMethod.includes(opt.key)}
              onClick={() => toggleSignup(opt.key)}
              title={opt.title}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-zinc-800 mx-1" />

        {/* Free toggle */}
        <Pill
          label="✦ Free"
          active={filters.hasFree === true}
          onClick={() => onFiltersChange({ ...filters, hasFree: filters.hasFree === true ? null : true })}
          activeClass="bg-teal-500/20 text-teal-300 border-teal-500/40"
        />

        {/* Score min */}
        <div className="flex items-center gap-1">
          {[7, 8, 9].map(n => (
            <Pill
              key={n}
              label={`${n}+`}
              active={filters.minScore === n}
              onClick={() => onFiltersChange({ ...filters, minScore: filters.minScore === n ? 1 : n })}
              title={`Score ${n} or higher`}
            />
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Result count + reset */}
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Clear
            </button>
          )}
          <span className="text-[11px] font-mono text-zinc-600">
            <span className="text-zinc-300">{resultCount}</span>/{totalCount}
          </span>

          {/* Sort */}
          <div className="flex items-center rounded border border-zinc-800 overflow-hidden">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.key}
                onClick={() => onSortChange(opt.key)}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  sort === opt.key
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
