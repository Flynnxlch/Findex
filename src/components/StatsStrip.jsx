import React from 'react';
import { BarChart3, CircleDollarSign, PiggyBank, Users } from 'lucide-react';

const cards = [
  {
    key: 'markets',
    icon: CircleDollarSign,
    label: 'Simulated Markets',
    value: '2,400+',
    badge: '+12%',
  },
  {
    key: 'traders',
    icon: Users,
    label: 'Traders Trained',
    value: '150k+',
    badge: '+5%',
  },
  {
    key: 'ticks',
    icon: BarChart3,
    label: 'Ticks / Second',
    value: '850',
    badge: 'Live',
  },
  {
    key: 'capital',
    icon: PiggyBank,
    label: 'Real Capital at Risk',
    value: '$0',
    badge: 'Virtual',
    muted: true,
  },
];

const StatsStrip = () => {
  return (
    <section className="py-20 border-y border-border-dark bg-surface-dark/40" id="stats">
      <div className="max-w-[1280px] w-full px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
            <div
              key={card.key}
              className="p-6 rounded-2xl border border-border-dark bg-surface-dark hover:border-primary/60 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-full bg-background-dark text-muted-text group-hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    card.muted
                      ? 'text-muted-text bg-white/5'
                      : 'text-primary bg-primary/10'
                  }`}
                >
                  {card.badge}
                </span>
              </div>
              <h3 className="text-muted-text text-sm font-medium">{card.label}</h3>
              <p className="text-3xl font-bold text-white mt-1 font-mono">{card.value}</p>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;


