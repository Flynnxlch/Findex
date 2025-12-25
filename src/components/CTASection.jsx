import React from 'react';

const CTASection = () => {
  return (
    <section
      id="cta"
      className="py-20 bg-gradient-to-r from-primary/10 via-surface-dark to-cyan/10 border-t border-border-dark"
    >
      <div className="max-w-[960px] mx-auto px-4 md:px-8 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-text mb-3">
          No deposits · No leverage · No liquidations
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Train like a pro.
          <span className="block text-gradient">Keep your real money off the line.</span>
        </h2>
        <p className="text-muted-text max-w-2xl mx-auto mb-8">
          Findex is a simulated trading environment. All balances, P/L, and executions are virtual—designed purely for
          education, backtesting, and fun.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#hero"
            className="inline-flex items-center justify-center h-14 px-10 rounded-full bg-primary hover:bg-primary-hover text-background-dark font-bold text-base shadow-neon transition-transform hover:-translate-y-0.5"
          >
            Start a Free Simulation
          </a>
          <button className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-border-dark/70 bg-surface-dark/60 text-white text-sm font-semibold hover:bg-surface-dark transition-colors">
            View Sample Day Replay
          </button>
        </div>
        <p className="mt-5 text-[11px] text-muted-text/80">
          Findex is not a broker, exchange, or advisory service. It&apos;s a sandbox to help you master market
          behavior—before you ever risk a single dollar.
        </p>
      </div>
    </section>
  );
};

export default CTASection;


