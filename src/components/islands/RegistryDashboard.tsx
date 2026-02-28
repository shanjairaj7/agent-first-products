import { useState, useMemo, useCallback } from 'react';
import type { ToolEntry, Category } from '../../data/schema';
import { CategoryTabs } from './CategoryTabs';
import { FilterRow } from './FilterRow';
import { SearchBar } from './SearchBar';
import { ToolGrid } from './ToolGrid';
import { applyFilters, DEFAULT_FILTERS } from '../../lib/filters';
import type { FilterState, SortKey } from '../../lib/filters';

interface Props {
  tools: ToolEntry[];
  base?: string;
}

export function RegistryDashboard({ tools, base = '' }: Props) {
  const [sort, setSort] = useState<SortKey>('score');
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const handleCategoryChange = useCallback((cat: Category | null) => {
    setActiveCategory(cat);
    setFilters(f => ({ ...f, categories: cat ? [cat] : [] }));
  }, []);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSort('score');
    setActiveCategory(null);
  }, []);

  const results = useMemo(
    () => applyFilters(tools, filters, sort),
    [tools, filters, sort],
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Category tabs */}
      <CategoryTabs tools={tools} active={activeCategory} onChange={handleCategoryChange} />

      {/* Search */}
      <SearchBar
        value={filters.search}
        onChange={s => setFilters(f => ({ ...f, search: s }))}
      />

      {/* Inline filter row */}
      <FilterRow
        filters={filters}
        sort={sort}
        onFiltersChange={setFilters}
        onSortChange={setSort}
        resultCount={results.length}
        totalCount={tools.length}
        onReset={handleReset}
      />

      {/* Grid */}
      <div className="pt-2">
        <ToolGrid tools={results} base={base} />
      </div>
    </div>
  );
}
