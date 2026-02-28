import { useState, useMemo, useCallback } from 'react';
import type { ToolEntry } from '../../data/schema';
import { CATEGORIES } from '../../data/schema';
import { FilterSidebar } from './FilterSidebar';
import { SearchBar } from './SearchBar';
import { SortControls } from './SortControls';
import { ToolGrid } from './ToolGrid';
import { applyFilters, countActiveFilters, DEFAULT_FILTERS } from '../../lib/filters';
import type { FilterState, SortKey } from '../../lib/filters';

interface Props {
  tools: ToolEntry[];
  base?: string;
}

export function RegistryDashboard({ tools, base = '' }: Props) {
  const [sort, setSort] = useState<SortKey>('score');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const results = useMemo(
    () => applyFilters(tools, filters, sort),
    [tools, filters, sort],
  );

  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSort('score');
  }, []);

  return (
    <div className="flex gap-6 items-start">
      {/* Sidebar — desktop always visible, mobile slide-in */}
      <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-6">
        <FilterSidebar
          tools={tools}
          filters={filters}
          onChange={setFilters}
          onReset={handleReset}
          activeCount={activeCount}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Controls bar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1">
            <SearchBar
              value={filters.search}
              onChange={s => setFilters(f => ({ ...f, search: s }))}
            />
          </div>

          {/* Mobile filter button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900
                       border border-zinc-700 text-sm text-zinc-300 hover:border-zinc-500 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="18" x2="12" y2="18" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="bg-indigo-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>

          <SortControls value={sort} onChange={setSort} />
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-zinc-500">
            <span className="text-white font-medium">{results.length}</span>
            {' '}of{' '}
            <span className="text-zinc-300">{tools.length}</span>
            {' '}tools
            {activeCount > 0 && (
              <button
                onClick={handleReset}
                className="ml-3 text-xs text-indigo-400 hover:text-indigo-300 underline"
              >
                Clear filters
              </button>
            )}
          </p>
        </div>

        <ToolGrid tools={results} base={base} />
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative ml-auto w-72 max-w-full bg-zinc-950 border-l border-zinc-800 h-full overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-white">Filters</span>
              <button onClick={() => setSidebarOpen(false)} className="text-zinc-400 hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <FilterSidebar
              tools={tools}
              filters={filters}
              onChange={setFilters}
              onReset={handleReset}
              activeCount={activeCount}
            />
          </div>
        </div>
      )}
    </div>
  );
}
