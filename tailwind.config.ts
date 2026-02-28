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
        // Custom token: score colors
        score: {
          high: '#22c55e',   // green-500
          mid: '#f59e0b',    // amber-500
          low: '#ef4444',    // red-500
        },
        // Interface badge colors
        iface: {
          api:     '#3b82f6', // blue-500
          sdk:     '#a855f7', // purple-500
          cli:     '#f97316', // orange-500
          mcp:     '#10b981', // emerald-500
          webhook: '#eab308', // yellow-500
          graphql: '#ec4899', // pink-500
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
} satisfies Config;
