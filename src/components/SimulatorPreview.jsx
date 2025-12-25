import { CandlestickChart, History, LayoutDashboard, Settings, Wallet } from 'lucide-react';
import React from 'react';
import LiteCandles from './LiteCandles.jsx';

const SimulatorPreview = () => {
  return (
    <div className="w-full max-w-5xl relative group perspective-1000">
      {/* floating metric cards */}
      <div
        className="absolute -left-4 top-10 md:-left-12 md:top-20 z-20 hidden lg:block"
        style={{ animation: 'bounce 4s infinite' }}
      >
      </div>

      <div
        className="absolute -right-4 bottom-20 md:-right-12 md:bottom-32 z-20 hidden lg:block"
        style={{ animation: 'bounce 5s infinite' }}
      >
        
      </div>

      {/* simulator frame */}
      <div className="relative rounded-xl overflow-hidden border border-border-dark shadow-2xl bg-surface-dark aspect-video mx-auto transform transition-transform duration-500 hover:scale-[1.01]">
        {/* window chrome */}
        <div className="h-10 bg-[#101418] border-b border-border-dark flex items-center px-4 justify-between">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-red-500/20 border border-red-500" />
            <div className="size-3 rounded-full bg-yellow-500/20 border border-yellow-500" />
            <div className="size-3 rounded-full bg-green-500/20 border border-green-500" />
          </div>
          <div className="text-[10px] text-muted-text font-mono uppercase tracking-widest">
            Findex Simulation Terminal
          </div>
        </div>

        <div className="flex h-full">
          {/* sidebar */}
          <div className="w-16 border-r border-border-dark flex flex-col items-center py-4 gap-6 text-muted-text">
            <div className="cursor-default opacity-70">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div className="text-primary cursor-default">
              <CandlestickChart className="w-5 h-5" />
            </div>
            <div className="cursor-default opacity-70">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="cursor-default opacity-70">
              <History className="w-5 h-5" />
            </div>
            <div className="mt-auto cursor-default opacity-70">
              <Settings className="w-5 h-5" />
            </div>
          </div>

          {/* main chart area */}
          <div className="flex-1 flex flex-col grid-bg bg-gradient-to-b from-surface-dark to-background-dark relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-10 top-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute right-0 bottom-0 w-48 h-48 rounded-full bg-cyan/10 blur-3xl" />
            </div>

            {/* header + price */}
            <div className="p-4 flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  <CandlestickChart className="w-4 h-4 text-primary" />
                  SOB/TOK
                  <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full">SIM PERP</span>
                </h3>
                <p className="text-3xl font-mono text-primary mt-1 font-bold neon-text">$65,300.00</p>
                <p className="mt-1 text-xs text-muted-text font-mono">+2.4% · 15s candles · Synthetic feed</p>
              </div>
             
            </div>

            {/* candlestick chart (lightweight-charts) */}
            <div className="relative flex-1 px-4 pt-3 pb-5 z-10 flex items-stretch">
              <div className="w-full h-full rounded-lg overflow-hidden pointer-events-none">
                <LiteCandles />
              </div>
            </div>
          </div>

          {/* order book */}
          <div className="w-64 border-l border-border-dark hidden sm:flex flex-col bg-[#05070b]">
            <div className="p-3 border-b border-border-dark text-xs font-bold text-muted-text">Order Book</div>
            <div className="flex-1 p-2 space-y-1 font-mono text-[10px]">
              <div className="flex justify-between text-danger/90">
                <span>64,235.00</span>
                <span>0.4521</span>
              </div>
              <div className="flex justify-between text-danger/90">
                <span>64,234.50</span>
                <span>1.2003</span>
              </div>
              <div className="flex justify-between text-danger/90">
                <span>64,234.00</span>
                <span>0.1102</span>
              </div>
              <div className="flex justify-between text-danger/60">
                <span>64,233.50</span>
                <span>0.0500</span>
              </div>
              <div className="py-2 flex justify-center text-lg font-bold text-white my-1 border-y border-border-dark/60">
                64,231.50
              </div>
              <div className="flex justify-between text-primary/60">
                <span>64,230.50</span>
                <span>0.8500</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>64,230.00</span>
                <span>2.1102</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>64,229.50</span>
                <span>0.3003</span>
              </div>
              <div className="flex justify-between text-primary">
                <span>64,229.00</span>
                <span>1.4521</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorPreview;


