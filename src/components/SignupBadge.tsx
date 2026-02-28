type SignupMethod = 'api' | 'website-bot-friendly' | 'human-only';

const CONFIG: Record<SignupMethod, { label: string; icon: string; className: string; title: string }> = {
  'api': {
    icon: '⚡',
    label: 'API Signup',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
    title: 'Agents can sign up programmatically via API — no browser required',
  },
  'website-bot-friendly': {
    icon: '🤖',
    label: 'Bot Friendly',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
    title: 'Website signup works for bots — no CAPTCHA or human verification required',
  },
  'human-only': {
    icon: '👤',
    label: 'Human Required',
    className: 'bg-red-500/10 text-red-400 border-red-500/25',
    title: 'Signup requires human verification — agents need pre-provisioned credentials',
  },
};

interface Props {
  method: SignupMethod;
}

export function SignupBadge({ method }: Props) {
  const cfg = CONFIG[method];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                  text-[10px] font-medium border ${cfg.className}`}
      title={cfg.title}
    >
      <span>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
