/** Returns Tailwind color classes based on agent-first score */
export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  hex: string;
  ring: string;
} {
  if (score >= 9) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      hex: '#34d399',
      ring: 'ring-emerald-500/40',
    };
  }
  if (score >= 7) {
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      hex: '#fbbf24',
      ring: 'ring-amber-500/40',
    };
  }
  return {
    text: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    hex: '#f87171',
    ring: 'ring-red-500/40',
  };
}

export function getScoreLabel(score: number): string {
  if (score === 10) return 'Native';
  if (score >= 9) return 'Excellent';
  if (score >= 7) return 'Good';
  if (score >= 5) return 'Partial';
  return 'Limited';
}
