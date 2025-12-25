import React from 'react';
import { Check, CheckCircle2 } from 'lucide-react';

const tiers = [
  {
    name: 'Novice',
    price: '$0',
    subtitle: 'Perfect for learning the basics.',
    features: ['Basic charts (15m delay)', '5 active simulated markets', 'Community access'],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro Trader',
    price: '$19',
    subtitle: 'For serious backtesting & drills.',
    features: ['Real-time simulation', '50 active markets', 'Advanced indicators', 'Priority support'],
    cta: 'Get Pro',
    highlighted: true,
  },
  {
    name: 'Whale',
    price: '$49',
    subtitle: 'For training groups and academies.',
    features: ['Everything in Pro', 'Unlimited markets', 'Admin volatility controls', 'Replay per day'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 bg-surface-dark border-t border-border-dark" id="docs">
      <div className="max-w-[1280px] w-full px-4 md:px-8 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Transparent, Simulation-Only Pricing</h2>
          <p className="text-muted-text">
            Start free, then scale your training environment as you and your team grow more advanced.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col p-8 rounded-2xl border bg-background-dark relative ${
                tier.highlighted ? 'border-primary shadow-neon-sm md:-translate-y-4' : 'border-border-dark'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute top-0 right-0 -mt-3 mr-4 bg-primary text-background-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                <span className="text-muted-text">/mo</span>
              </div>
              <p className="text-sm text-muted-text mt-2">{tier.subtitle}</p>

              <ul className="mt-8 space-y-4 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-slate-200">
                    {tier.highlighted ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full h-12 rounded-full font-bold transition-all ${
                  tier.highlighted
                    ? 'bg-primary hover:bg-primary-hover text-background-dark shadow-lg'
                    : 'border border-border-dark hover:bg-white hover:text-black hover:border-white text-white'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;


