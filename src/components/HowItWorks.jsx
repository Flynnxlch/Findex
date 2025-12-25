import { CandlestickChart, GraduationCap, Rocket, SlidersHorizontal } from 'lucide-react';
import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Engine Generates Ticks',
    body: 'Synthetic price ticks are produced every second, mirroring real-world volatility patterns without touching any live order book.',
  },
  {
    number: '02',
    title: '15-Second Moving Candles',
    body: 'Ticks are aggregated into rolling 15s candlesticks so you can practice reading momentum, reversals, and fake-outs in real time.',
  },
  {
    number: '03',
    title: 'Trade with Virtual Tokens',
    body: 'Deploy infinite fake coins into simulated markets, manage risk, and refine your playbook before you ever fund a real account.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="how-it-works">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] w-full px-4 md:px-8 mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            How Findex Simulates
            <br />
            <span className="text-muted-text">Real markets. Zero downside.</span>
          </h2>
          <p className="text-lg text-muted-text leading-relaxed">
            Under the hood, Findex uses a configurable simulation engine that mimics spikes, chop, and trend conditions
            you&apos;d see on a live exchange—minus the financial stress.
          </p>

          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-4 items-start">
                <div className="mt-1 size-9 rounded-full bg-surface-dark border border-border-dark flex items-center justify-center text-primary font-mono text-xs shrink-0">
                  {step.number}
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{step.title}</h4>
                  <p className="text-muted-text text-sm mt-1">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full" id="demo">
          <div className="space-y-4 mt-8">
            <div className="bg-surface-dark p-6 rounded-2xl border border-border-dark h-64 flex flex-col justify-end bg-no-repeat bg-right-top bg-[length:120px]">
              <CandlestickChart className="w-8 h-8 text-white mb-auto" />
              <p className="text-white font-bold text-xl">15s Candles</p>
              <p className="text-muted-text text-xs">Practice intraday timing.</p>
            </div>
            <div className="bg-primary p-6 rounded-2xl border border-primary h-48 flex flex-col justify-center items-center text-center relative overflow-hidden">
              <Rocket className="w-8 h-8 text-background-dark mb-2" />
              <p className="text-background-dark font-extrabold text-2xl">Start Session</p>
              <p className="text-background-dark/80 text-[11px] mt-1 uppercase tracking-[0.2em]">
                Fake coins · real lessons
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-border-dark h-48 flex flex-col justify-end">
              <GraduationCap className="w-8 h-8 text-white mb-auto" />
              <p className="text-white font-bold text-xl">Playbook Library</p>
              <p className="text-muted-text text-xs">Curated setups & tutorials.</p>
            </div>
            <div className="bg-surface-dark p-6 rounded-2xl border border-border-dark h-64 flex flex-col justify-end">
              <SlidersHorizontal className="w-8 h-8 text-white mb-auto" />
              <p className="text-white font-bold text-xl">Admin Controls</p>
              <p className="text-muted-text text-xs">Tune volatility for live classes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


