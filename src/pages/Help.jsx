import { HelpCircle, Sparkles } from 'lucide-react';
import React from 'react';
import FAQ from '../components/FAQ.jsx';
import Features from '../components/Features.jsx';
import QuestionTicket from '../components/QuestionTicket.jsx';
import HelpResources from '../components/HelpResources.jsx';

const Help = () => {
  return (
    <div className="pt-20">
      <section className="py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1280px] w-full px-4 md:px-8 mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Help Center
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              How Can We Help You?
            </h1>
            <p className="text-lg text-muted-text max-w-2xl mx-auto">
              Find answers to common questions, explore our features, or submit a support ticket.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <FAQ />
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-dark to-transparent" />
              <h2 className="text-3xl font-bold text-white">Our Features</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-dark to-transparent" />
            </div>
            <Features />
          </div>

          {/* Question Ticket Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-dark to-transparent" />
              <h2 className="text-3xl font-bold text-white">Still Have Questions?</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-dark to-transparent" />
            </div>
            <QuestionTicket />
          </div>

          {/* Help Resources */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-dark to-transparent" />
              <h2 className="text-3xl font-bold text-white">Additional Resources</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-dark to-transparent" />
            </div>
            <HelpResources />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;

