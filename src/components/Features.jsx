import { CandlestickChart, Shield, Zap, BarChart3, Users, Settings, BookOpen } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: CandlestickChart,
    title: 'Real-Time Simulation',
    description: 'Experience live market dynamics with synthetic price movements updated every second.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Shield,
    title: 'Zero Financial Risk',
    description: 'Practice trading strategies without risking real money. All trades use virtual tokens.',
    color: 'text-cyan',
    bgColor: 'bg-cyan/10',
  },
  {
    icon: Zap,
    title: '15-Second Candles',
    description: 'Fast-paced trading practice with rolling 15-second candlesticks for intraday timing.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track your performance with detailed charts, indicators, and market analysis tools.',
    color: 'text-cyan',
    bgColor: 'bg-cyan/10',
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Join a community of traders learning and sharing strategies in a risk-free environment.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Settings,
    title: 'Customizable Volatility',
    description: 'Adjust market conditions to match your training needs with admin controls (Whale tier).',
    color: 'text-cyan',
    bgColor: 'bg-cyan/10',
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description: 'Access curated playbooks, tutorials, and trading strategies to accelerate your learning.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: CandlestickChart,
    title: 'Multiple Markets',
    description: 'Trade across various simulated pairs including BTC, ETH, SOL, and many more.',
    color: 'text-cyan',
    bgColor: 'bg-cyan/10',
  },
];

const Features = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className={`${feature.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-muted-text text-sm leading-relaxed">{feature.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Features;

