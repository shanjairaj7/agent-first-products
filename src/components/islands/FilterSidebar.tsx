import type { ToolEntry } from '../../data/schema';
import { CATEGORIES } from '../../data/schema';
import type { FilterState } from '../../lib/filters';

const INTERFACE_OPTIONS = [
  { key: 'api',     label: 'API',     color: 'text-blue-400' },
  { key: 'sdk',     label: 'SDK',     color: 'text-purple-400' },
  { key: 'cli',     label: 'CLI',     color: 'text-orange-400' },
  { key: 'mcp',     label: 'MCP',     color: 'text-emerald-400' },
  { key: 'webhook', label: 'Webhook', color: 'text-yellow-400' },
  { key: 'graphql', label: 'GraphQL', color: 'text-pink-400' },
] as const;

const SIGNUP_OPTIONS = [
  { key: 'api',                   label: '⚡ API Signup',      desc: 'Fully programmatic' },
  { key: 'website-bot-friendly', label: '🤖 Bot Friendly',   desc: 'No CAPTCHA' },
  { key: 'human-only',           label: '👤 Human Required', desc: 'Manual approval' },
] as const;

interface Props {
  tools: ToolEntry[];
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onReset: () => void;
  activeCount: number;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 mb-2">{title}</p>
      {children}
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  count,
  labelClass = '',
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  count?: number;
  labelClass?: string;
}) {
  return (
    <label className="flex items-center gap-2 py-0.5 cursor-pointer group">
      <div
        className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors
          ${checked ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-600 group-hover:border-zinc-400'}`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        className={`text-xs flex-1 transition-colors ${checked ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'} ${labelClass}`}
      >
        {label}
      </span>
      {count !== undefined && (
        <span className="text-[10px] text-zinc-600 tabular-nums">{count}</span>
      )}
    </label>
  );
}

export function FilterSidebar({ tools, filters, onChange, onReset, activeCount }: Props) {
  // Count tools per category
  const catCounts = Object.fromEntries(
    CATEGORIES.map(c => [c.id, tools.filter(t => t.category === c.id).length])
  );

  // Count tools per interface
  const ifaceCounts = Object.fromEntries(
    INTERFACE_OPTIONS.map(o => [o.key, tools.filter(t => t.interfaces[o.key as keyof typeof t.interfaces]).length])
  );

  const toggle = <K extends keyof FilterState>(key: K, value: string) => {
    const arr = filters[key] as string[];
    const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
    onChange({ ...filters, [key]: next });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">Filters</span>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Reset ({activeCount})
          </button>
        )}
      </div>

      {/* Quick toggles */}
      <Section title="Quick">
        <Checkbox
          checked={filters.mcpOnly}
          onChange={v => onChange({ ...filters, mcpOnly: v })}
          label="MCP only"
          labelClass="text-emerald-400"
        />
        <Checkbox
          checked={filters.hasFree === true}
          onChange={v => onChange({ ...filters, hasFree: v ? true : null })}
          label="Free tier"
          labelClass="text-teal-400"
        />
      </Section>

      {/* Interfaces */}
      <Section title="Interfaces">
        {INTERFACE_OPTIONS.map(opt => (
          <Checkbox
            key={opt.key}
            checked={filters.interfaces.includes(opt.key)}
            onChange={() => toggle('interfaces', opt.key)}
            label={opt.label}
            count={ifaceCounts[opt.key]}
            labelClass={filters.interfaces.includes(opt.key) ? opt.color : ''}
          />
        ))}
      </Section>

      {/* Signup */}
      <Section title="Signup Method">
        {SIGNUP_OPTIONS.map(opt => (
          <label key={opt.key} className="flex items-start gap-2 py-0.5 cursor-pointer group">
            <div
              className={`w-3.5 h-3.5 mt-0.5 rounded border flex items-center justify-center flex-shrink-0 transition-colors
                ${filters.signupMethod.includes(opt.key) ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-600 group-hover:border-zinc-400'}`}
              onClick={() => toggle('signupMethod', opt.key)}
            >
              {filters.signupMethod.includes(opt.key) && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="min-w-0">
              <p className={`text-xs ${filters.signupMethod.includes(opt.key) ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                {opt.label}
              </p>
              <p className="text-[10px] text-zinc-600">{opt.desc}</p>
            </div>
          </label>
        ))}
      </Section>

      {/* Min score */}
      <Section title="Min Score">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={1}
            max={10}
            value={filters.minScore}
            onChange={e => onChange({ ...filters, minScore: Number(e.target.value) })}
            className="flex-1 accent-indigo-500 h-1.5"
          />
          <span className="text-xs text-white font-mono w-5 text-right">{filters.minScore}+</span>
        </div>
      </Section>

      {/* Category */}
      <Section title="Category">
        {CATEGORIES.filter(c => (catCounts[c.id] ?? 0) > 0).map(cat => (
          <Checkbox
            key={cat.id}
            checked={filters.categories.includes(cat.id)}
            onChange={() => toggle('categories', cat.id)}
            label={`${cat.emoji} ${cat.label}`}
            count={catCounts[cat.id]}
          />
        ))}
      </Section>
    </div>
  );
}
