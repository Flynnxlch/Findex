import React from 'react';
import Ticker from '../components/Ticker.jsx';
import Hero from '../components/Hero.jsx';
import StatsStrip from '../components/StatsStrip.jsx';
import Markets from '../components/Markets.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Pricing from '../components/Pricing.jsx';
import CTASection from '../components/CTASection.jsx';

const Home = () => {
  return (
    <>
      <Ticker />
      <main>
        <Hero />
        <StatsStrip />
        <Markets />
        <HowItWorks />
        <Pricing />
        <CTASection />
      </main>
    </>
  );
};

export default Home;

