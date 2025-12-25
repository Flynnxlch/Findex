import { createChart, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const data = [
  { time: '2024-04-01', open: 64000, high: 64500, low: 63800, close: 64420 },
  { time: '2024-04-02', open: 64420, high: 64600, low: 64250, close: 64510 },
  { time: '2024-04-03', open: 64510, high: 64750, low: 64400, close: 64720 },
  { time: '2024-04-04', open: 64720, high: 64850, low: 64610, close: 64640 },
  { time: '2024-04-05', open: 64640, high: 64900, low: 64580, close: 64880 },
  { time: '2024-04-06', open: 64880, high: 65020, low: 64750, close: 64940 },
  { time: '2024-04-07', open: 64940, high: 65100, low: 64890, close: 65010 },
  { time: '2024-04-08', open: 65010, high: 65250, low: 64980, close: 65200 },
  { time: '2024-04-09', open: 64640, high: 64900, low: 64580, close: 64880 },
  { time: '2024-04-10', open: 64880, high: 65020, low: 64750, close: 64940 },
  { time: '2024-04-11', open: 64940, high: 65100, low: 64890, close: 65010 },
  { time: '2024-04-12', open: 65010, high: 65250, low: 64980, close: 65200 },
  { time: '2024-04-13', open: 65200, high: 65350, low: 65120, close: 65280 },
  { time: '2024-04-14', open: 65280, high: 65420, low: 65190, close: 65310 },
  { time: '2024-04-15', open: 65010, high: 65250, low: 64980, close: 65200 },
  { time: '2024-04-16', open: 65200, high: 65350, low: 65120, close: 65280 },
  { time: '2024-04-17', open: 65280, high: 65420, low: 65190, close: 65310 },
];

const LiteCandles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: 'transparent' },
        textColor: '#64748b',
      },
      grid: {
        vertLines: { color: 'rgba(148, 163, 184, 0.1)' },
        horzLines: { color: 'rgba(148, 163, 184, 0.1)' },
      },
      rightPriceScale: {
        borderColor: 'rgba(148, 163, 184, 0.25)',
      },
      timeScale: {
        borderColor: 'rgba(148, 163, 184, 0.25)',
        timeVisible: true,
        secondsVisible: false,
        barSpacing: 14,
      },
      crosshair: {
        // Disable interactive crosshair lines – this chart is a static mock
        mode: CrosshairMode.Normal,
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      autoSize: true,
    });

    const series = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#f97373',
      wickUpColor: '#64748b',
      wickDownColor: '#64748b',
      borderVisible: false,
      // Hide current price line + label so chart looks like a static embed
      lastValueVisible: false,
      priceLineVisible: false,
    });

    series.setData(data);

    // Float candles away from absolute top/bottom so they "sit" nicely in the middle
    series.priceScale().applyOptions({
      scaleMargins: {
        top: 0.2,
        bottom: 0.15,
      },
    });

    // Show only the most recent candles so the view is "zoomed in" instead of full fit-content
    const visibleCount = 10;
    const fromIndex = Math.max(data.length - visibleCount, 0);
    const fromTime = data[fromIndex].time;
    const toTime = data[data.length - 1].time;
    chart.timeScale().setVisibleRange({ from: fromTime, to: toTime });


    const resize = () => {
      if (!containerRef.current) return;
      chart.applyOptions({ width: containerRef.current.clientWidth, height: containerRef.current.clientHeight });
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      chart.remove();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default LiteCandles;


