import type { FilterState, SortKey } from '../../lib/filters';

const IFACE_OPTIONS = [
  { key: 'api',     label: 'API',  dot: '#3b82f6' },
  { key: 'sdk',     label: 'SDK',  dot: '#a855f7' },
  { key: 'cli',     label: 'CLI',  dot: '#f97316' },
  { key: 'mcp',     label: 'MCP',  dot: '#10b981' },
  { key: 'webhook', label: 'Hook', dot: '#eab308' },
  { key: 'graphql', label: 'GQL',  dot: '#ec4899' },
] as const;

const SIGNUP_OPTIONS = [
  { key: 'api',                  label: '⚡ API',   title: 'Programmatic signup' },
  { key: 'website-bot-friendly', label: '🤖 Bot',   title: 'Bot-friendly signup' },
  { key: 'human-only',           label: '👤 Human', title: 'Human-only signup' },
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

function FilterPill({
  label,
  active,
  dot,
  onClick,
  title,
}: {
  label: string;
  active: boolean;
  dot?: string;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-medium transition-all duration-100 whitespace-nowrap"
      style={active
        ? {
            background: dot ? `${dot}15` : 'rgba(124,58,237,0.12)',
            color: dot ?? '#a78bfa',
            border: `1px solid ${dot ? `${dot}30` : 'rgba(124,58,237,0.3)'}`,
          }
        : {
            background: 'transparent',
            color: '#52526a',
            border: '1px solid #1d1d2e',
          }
      }
    >
      {active && dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-dot-pulse"
          style={{ backgroundColor: dot }}
        />
      )}
      {label}
    </button>
  );
}

export function FilterRow({
  filters, sort, onFiltersChange, onSortChange, resultCount, totalCount, onReset,
}: Props) {
  const toggleIface = (key: string) => {
    const arr = filters.interfaces;
    onFiltersChange({ ...filters, interfaces: arr.includes(key) ? arr.filter(v => v !== key) : [...arr, key] });
  };

  const toggleSignup = (key: string) => {
    const arr = filters.signupMethod;
    onFiltersChange({ ...filters, signupMethod: arr.includes(key) ? arr.filter(v => v !== key) : [...arr, key] });
  };

  const hasActiveFilters = filters.interfaces.length > 0
    || filters.signupMethod.length > 0
    || filters.hasFree !== null
    || filters.minScore > 1;

  return (
    <div
      className="frosted sticky z-30 rounded-xl px-3 py-2.5"
      style={{ top: '54px' }}
    >
      <div className="flex items-center gap-2 flex-wrap">

        {/* Interface toggles */}
        <div className="flex items-center gap-1">
          {IFACE_OPTIONS.map(opt => (
            <FilterPill
              key={opt.key}
              label={opt.label}
              dot={opt.dot}
              active={filters.interfaces.includes(opt.key)}
              onClick={() => toggleIface(opt.key)}
            />
          ))}
        </div>

        <div className="h-4 w-px" style={{ background: '#1d1d2e' }} />

        {/* Signup */}
        <div className="flex items-center gap-1">
          {SIGNUP_OPTIONS.map(opt => (
            <FilterPill
              key={opt.key}
              label={opt.label}
              active={filters.signupMethod.includes(opt.key)}
              onClick={() => toggleSignup(opt.key)}
              title={opt.title}
            />
          ))}
        </div>

        <div className="h-4 w-px" style={{ background: '#1d1d2e' }} />

        {/* Free + score shortcuts */}
        <div className="flex items-center gap-1">
          <FilterPill
            label="Free"
            active={filters.hasFree === true}
            dot="#0d9488"
            onClick={() => onFiltersChange({ ...filters, hasFree: filters.hasFree === true ? null : true })}
          />
          {[7, 8, 9].map(n => (
            <FilterPill
              key={n}
              label={`${n}+`}
              active={filters.minScore === n}
              onClick={() => onFiltersChange({ ...filters, minScore: filters.minScore === n ? 1 : n })}
              title={`Score ${n} or higher`}
            />
          ))}
        </div>

        <div className="flex-1" />

        {/* Result count + clear + sort */}
        <div className="flex items-center gap-2.5">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-[10px] font-mono transition-colors"
              style={{ color: '#52526a' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#a78bfa')}
              onMouseLeave={e => (e.currentTarget.style.color = '#52526a')}
            >
              ✕ clear
            </button>
          )}
          <span className="text-[10px] font-mono" style={{ color: '#3a3a5c' }}>
            <span style={{ color: '#e4e4f0' }}>{resultCount}</span>/{totalCount}
          </span>
          <div className="flex items-center rounded overflow-hidden" style={{ border: '1px solid #1d1d2e' }}>
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.key}
                onClick={() => onSortChange(opt.key)}
                className="px-2 py-1 text-[10px] font-mono font-medium transition-colors"
                style={sort === opt.key
                  ? { background: '#1d1d2e', color: '#e4e4f0' }
                  : { color: '#52526a' }
                }
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
