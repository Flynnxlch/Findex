import { CandlestickChart, MonitorPlay } from 'lucide-react';
import React from 'react';
import SimulatorPreview from './SimulatorPreview.jsx';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-120px)] flex flex-col items-center pt-16 pb-24 overflow-hidden"
    >
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] left-[10%] w-[320px] h-[320px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] w-full px-4 md:px-8 flex flex-col items-center text-center relative z-10">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-dark bg-surface-dark px-4 py-1.5 shadow-lg animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-xs font-medium text-muted-text">V2.0 Public Beta · Pure Simulation</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-4xl text-white">
          Simulate the Market.
          <br />
          Trade Without Risk.
        </h1>

        <p className="text-lg md:text-xl text-muted-text max-w-2xl mb-10 leading-relaxed font-light">
          Experience institutional-grade market dynamics with infinite fake coins. Learn to read volatility, test
          strategies, and build confidence before real capital ever touches the market.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="#cta"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary-hover text-background-dark font-bold text-base shadow-neon hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <CandlestickChart className="w-5 h-5" />
            Start Simulating
          </a>
          <a
            href="#demo"
            className="h-14 px-8 rounded-full border border-border-dark bg-surface-dark/70 hover:bg-surface-dark text-white font-bold text-base backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
          >
            <MonitorPlay className="w-5 h-5" />
            View Demo
          </a>
        </div>

        <SimulatorPreview />

        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-text/80 uppercase tracking-[0.2em] font-semibold">
            Just an image so you know we are not a scam
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="h-8 flex items-center text-xs font-mono text-muted-text tracking-wide">
              Powered by synthetic volatility engines
            </span>
            <span className="h-8 flex items-center text-xs font-mono text-muted-text tracking-wide">
              Inspired by top exchanges & charting tools
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


