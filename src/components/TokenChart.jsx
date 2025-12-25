import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

const TokenChart = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Generate sample data for 24 hours
    const data = [];
    const baseValue = 121000;
    const now = Date.now();
    
    for (let i = 23; i >= 0; i--) {
      const time = Math.floor((now - i * 3600000) / 1000);
      const randomChange = (Math.random() - 0.5) * 2000;
      const value = baseValue + randomChange + (23 - i) * 150;
      data.push({
        time: time,
        value: value,
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
        secondsVisible: false,
        rightOffset: 0,
        rightBarStaysOnScroll: true,
        lockVisibleTimeRangeOnResize: true,
      },
      crosshair: {
        mode: 0,
      },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    const lineSeries = chart.addLineSeries({
      color: '#00FF8A',
      lineWidth: 2,
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
      },
    });

    lineSeries.setData(data);

    // Get the latest timestamp (current time)
    const latestTime = data[data.length - 1].time;

    // Set initial visible range to show recent data, locked to current time
    const visibleRange = {
      from: data[Math.max(0, data.length - 12)].time, // Show last 12 data points
      to: latestTime,
    };
    chart.timeScale().setVisibleRange(visibleRange);

    // Lock right edge to current timestamp - prevent scrolling right past it
    // Allow scrolling left to see past data
    let isAdjusting = false;
    const handleVisibleRangeChange = () => {
      if (isAdjusting) return; // Prevent infinite loop
      
      const currentRange = chart.timeScale().getVisibleRange();
      if (!currentRange) return;

      // Always lock the right edge to latest time (current timestamp)
      // Allow left scrolling (from can change freely to see past data)
      if (currentRange.to > latestTime) {
        isAdjusting = true;
        chart.timeScale().setVisibleRange({
          from: currentRange.from,
          to: latestTime,
        });
        setTimeout(() => {
          isAdjusting = false;
        }, 0);
      }
    };

    chart.timeScale().subscribeVisibleTimeRangeChange(handleVisibleRangeChange);

    // Intercept wheel events to prevent scrolling right past current timestamp
    const handleWheel = (e) => {
      const currentRange = chart.timeScale().getVisibleRange();
      if (!currentRange) return;
      
      // If scrolling right (deltaX > 0) and already at or past latest time, prevent it
      const isScrollingRight = e.deltaX > 0;
      if (isScrollingRight && currentRange.to >= latestTime) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Intercept mouse drag to prevent dragging right past current timestamp
    let isDragging = false;
    let dragStartRange = null;

    const handleMouseDown = (e) => {
      const currentRange = chart.timeScale().getVisibleRange();
      if (currentRange) {
        isDragging = true;
        dragStartRange = { ...currentRange };
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging || !dragStartRange) return;
      
      const currentRange = chart.timeScale().getVisibleRange();
      if (!currentRange) return;
      
      // If dragging right and already at latest time, prevent it
      if (currentRange.to > latestTime) {
        e.preventDefault();
        e.stopPropagation();
        // Force it back to latest time
        chart.timeScale().setVisibleRange({
          from: currentRange.from,
          to: latestTime,
        });
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      dragStartRange = null;
    };

    if (containerRef.current) {
      const container = containerRef.current;
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);
    }

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
      chart.timeScale().unsubscribeVisibleTimeRangeChange(handleVisibleRangeChange);
      if (containerRef.current) {
        const container = containerRef.current;
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
      }
      chart.remove();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default TokenChart;

