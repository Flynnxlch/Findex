import React, { useMemo } from 'react';

const PortfolioAllocation = () => {
  // Sample user holdings data - in real app, this would come from API/localStorage
  const userHoldings = [
    { symbol: 'BTC', amount: 2.5, price: 45230.50, iconColor: 'bg-yellow-400', iconLetter: 'B' },
    { symbol: 'ETH', amount: 15.0, price: 3105.20, iconColor: 'bg-purple-500', iconLetter: 'E' },
    { symbol: 'SOL', amount: 120.0, price: 104.20, iconColor: 'bg-primary', iconLetter: 'S' },
    { symbol: 'ADA', amount: 5000.0, price: 0.52, iconColor: 'bg-blue-500', iconLetter: 'A' },
  ];

  // Calculate total portfolio value and percentages
  const portfolioData = useMemo(() => {
    const holdingsWithValue = userHoldings.map(holding => ({
      ...holding,
      value: holding.amount * holding.price,
    }));

    const totalValue = holdingsWithValue.reduce((sum, holding) => sum + holding.value, 0);

    const allocations = holdingsWithValue.map(holding => ({
      ...holding,
      percentage: totalValue > 0 ? (holding.value / totalValue) * 100 : 0,
    })).sort((a, b) => b.percentage - a.percentage);

    return {
      totalValue,
      allocations,
      totalAssets: allocations.length,
    };
  }, []);

  // Calculate donut chart segments with proper filling
  const donutSegments = useMemo(() => {
    const colors = ['#00FF8A', '#00D9FF', '#FFD700', '#A855F7', '#3B82F6', '#EF4444'];
    let currentAngle = -90; // Start from top
    
    return portfolioData.allocations.map((allocation, index) => {
      const percentage = allocation.percentage;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      currentAngle += angle;
      
      // Calculate SVG path for arc
      const radius = 42;
      const centerX = 50;
      const centerY = 50;
      
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (currentAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startAngleRad);
      const y1 = centerY + radius * Math.sin(startAngleRad);
      const x2 = centerX + radius * Math.cos(endAngleRad);
      const y2 = centerY + radius * Math.sin(endAngleRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      return {
        ...allocation,
        color: colors[index % colors.length],
        pathData,
        startAngle,
        angle,
      };
    });
  }, [portfolioData]);

  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl p-6 scrollbar-hide">
      <h3 className="text-lg font-bold text-white mb-4">Portfolio Allocation</h3>
      <div className="flex items-center gap-8">
        {/* Donut Chart */}
        <div className="w-32 h-32 rounded-full flex items-center justify-center relative flex-shrink-0">
          <svg className="w-32 h-32 absolute inset-0" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(0, 255, 138, 0.1)"
              strokeWidth="8"
            />
            {/* Segments */}
            {donutSegments.map((segment, index) => (
              <path
                key={index}
                d={segment.pathData}
                fill={segment.color}
                stroke="none"
              />
            ))}
            {/* Inner circle to create donut effect */}
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="#0F1419"
            />
          </svg>
          <div className="text-center relative z-10">
            <div className="text-2xl font-bold text-white">{portfolioData.totalAssets}</div>
            <div className="text-xs text-muted-text">ASSETS</div>
          </div>
        </div>
        
        {/* Allocation List */}
        <div className="flex-1 space-y-3">
          {portfolioData.allocations.slice(0, 5).map((allocation, index) => (
            <div key={allocation.symbol} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: donutSegments[index]?.color || '#00FF8A' }}
                ></div>
                <span className="text-white">{allocation.symbol}</span>
              </div>
              <span className="text-white font-semibold">{allocation.percentage.toFixed(1)}%</span>
            </div>
          ))}
          {portfolioData.allocations.length === 0 && (
            <p className="text-muted-text text-sm">No assets in portfolio</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocation;
