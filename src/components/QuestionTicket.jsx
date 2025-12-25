import { Send, MessageSquare, Mail } from 'lucide-react';
import React, { useState } from 'react';

const QuestionTicket = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-primary/10">
          <MessageSquare className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">Submit a Question</h3>
          <p className="text-muted-text text-sm">Have a question? We're here to help!</p>
        </div>
      </div>

      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-primary" />
          </div>
          <h4 className="text-white font-bold text-lg mb-2">Question Submitted!</h4>
          <p className="text-muted-text">We'll get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-muted-text mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-muted-text mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-muted-text mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="What's your question about?"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-muted-text mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-background-dark border border-border-dark rounded-lg text-white placeholder:text-muted-text focus:outline-none focus:border-primary/50 transition-colors resize-none"
              placeholder="Tell us more about your question..."
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary-hover text-background-dark font-bold rounded-lg transition-all shadow-neon-sm flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Submit Question
          </button>
        </form>
      )}

      <div className="mt-8 pt-8 border-t border-border-dark">
        <div className="flex items-center gap-3 text-muted-text">
          <Mail className="w-5 h-5" />
          <div>
            <p className="text-sm font-semibold">Or email us directly</p>
            <a href="mailto:support@findex.com" className="text-primary hover:text-primary-hover transition-colors">
              support@findex.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionTicket;

