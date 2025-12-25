import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

const TradingChart = ({ coin }) => {
  const containerRef = useRef(null);
  const [timeframe, setTimeframe] = useState('5m'); // '15s', '30s', '1m', '5m'

  useEffect(() => {
    if (!containerRef.current || !coin) return;

    // Generate sample candlestick data based on timeframe
    const data = [];
    const basePrice = coin.price;
    const now = Date.now();
    
    // Calculate timeframe in milliseconds
    const timeframeMs = {
      '15s': 15000,
      '30s': 30000,
      '1m': 60000,
      '5m': 300000,
    };
    
    const interval = timeframeMs[timeframe];
    const periods = {
      '15s': 96,   // Last 24 minutes (96 * 15s = 1440s = 24 min)
      '30s': 48,   // Last 24 minutes (48 * 30s = 1440s = 24 min)
      '1m': 144,   // Last 144 minutes (144 * 1m = 144 min = 2.4 hours)
      '5m': 288,   // Last 24 hours (288 * 5m = 1440 min = 24 hours)
    };
    
    const numPeriods = periods[timeframe];
    
    for (let i = numPeriods - 1; i >= 0; i--) {
      const time = Math.floor((now - i * interval) / 1000);
      const randomChange = (Math.random() - 0.5) * (basePrice * 0.05); // ±5% variation
      const open = basePrice + randomChange;
      const close = open + (Math.random() - 0.5) * (basePrice * 0.03);
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.02);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.02);
      
      data.push({
        time: time,
        open: open,
        high: high,
        low: low,
        close: close,
      });
    }

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#AAB0B6',
      },
      grid: {
        vertLines: { color: 'rgba(31, 36, 43, 0.3)' },
        horzLines: { color: 'rgba(31, 36, 43, 0.3)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(31, 36, 43, 0.5)',
      },
      timeScale: {
        borderColor: 'rgba(31, 36, 43, 0.5)',
        timeVisible: true,
        secondsVisible: timeframe === '15s' || timeframe === '30s',
      },
      crosshair: {
        mode: 0,
      },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight || 500,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#00FF8A',
      downColor: '#FF4444',
      borderVisible: false,
      wickUpColor: '#00FF8A',
      wickDownColor: '#FF4444',
    });

    candlestickSeries.setData(data);

    const resize = () => {
      if (!containerRef.current) return;
      chart.applyOptions({ 
        width: containerRef.current.clientWidth, 
        height: containerRef.current.clientHeight
      });
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      chart.remove();
    };
  }, [coin, timeframe]);

  const timeframes = [
    { value: '15s', label: '15s' },
    { value: '30s', label: '30s' },
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
  ].sort((a, b) => {
    const order = { '15s': 1, '30s': 2, '1m': 3, '5m': 4 };
    return order[a.value] - order[b.value];
  });

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Price Chart</h3>
        <div className="flex gap-1 bg-surface-dark border border-border-dark rounded-lg p-1">
          {timeframes.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setTimeframe(tf.value)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                timeframe === tf.value
                  ? 'bg-primary text-background-dark'
                  : 'text-muted-text hover:text-white'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="flex-1 min-h-0" />
    </div>
  );
};

export default TradingChart;

