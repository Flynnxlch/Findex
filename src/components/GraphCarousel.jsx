import React, { useState, useEffect } from 'react';

// Import WebP images from standalone folder
import image1 from '../public/standalone/20250619150411551.webp';
import image2 from '../public/standalone/A-Basic-Guide-To-Stock-Trading-1024x682.webp';
import image3 from '../public/standalone/How-to-trade-stocks.webp';
import image4 from '../public/standalone/nikk_638708732944515700.webp';

// WebP images from standalone folder
const graphImages = [
  {
    id: 1,
    image: image1,
    title: 'Real-Time Market Data',
    description: 'Live synthetic price movements',
  },
  {
    id: 2,
    image: image2,
    title: 'Advanced Charting',
    description: 'Professional trading tools',
  },
  {
    id: 3,
    image: image3,
    title: 'Market Analysis',
    description: 'Comprehensive market insights',
  },
  {
    id: 4,
    image: image4,
    title: 'Trading Dashboard',
    description: 'All your data in one place',
  },
];

const GraphCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % graphImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {graphImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-full h-full relative">
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
            
            {/* Optional title and description overlay */}
            <div className="absolute bottom-16 left-0 right-0 text-center px-8">
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{image.title}</h3>
              <p className="text-muted-text drop-shadow-md">{image.description}</p>
            </div>
          </div>
        </div>
      ))}
      
      {/* Indicator dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {graphImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary w-8' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GraphCarousel;
