import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Design system surface colors
        surface: '#0f0f1a',
        raised: '#14141f',
        subtle: '#1d1d2e',
        // Primary accent: Violet
        brand: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
          dim: 'rgba(124,58,237,0.12)',
          border: 'rgba(124,58,237,0.3)',
          glow: 'rgba(124,58,237,0.15)',
        },
        // Secondary accent: Electric Teal
        teal: {
          DEFAULT: '#0d9488',
          dim: 'rgba(13,148,136,0.12)',
          border: 'rgba(13,148,136,0.3)',
        },
        // Score colors (design spec)
        score: {
          high: '#10b981',   // emerald-500
          mid: '#f59e0b',    // amber-500
          low: '#f43f5e',    // rose-500
        },
        // Interface badge colors
        iface: {
          api:     '#3b82f6',
          sdk:     '#a855f7',
          cli:     '#f97316',
          mcp:     '#10b981',
          webhook: '#eab308',
          graphql: '#ec4899',
        },
      },
      backgroundColor: {
        'base': '#08080e',
        'surface': '#0f0f1a',
        'raised': '#14141f',
      },
      borderColor: {
        subtle: '#1d1d2e',
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'row-in': 'rowIn 0.25s ease-out both',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        rowIn: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(124,58,237,0)' },
          '50%': { boxShadow: '0 0 0 3px rgba(124,58,237,0.15)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
