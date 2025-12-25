import { Book, Video, FileText, Github, MessageCircle, ExternalLink } from 'lucide-react';
import React from 'react';

const resources = [
  {
    icon: Book,
    title: 'Documentation',
    description: 'Comprehensive guides and API documentation',
    link: '#',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Step-by-step video guides for getting started',
    link: '#',
    color: 'text-cyan',
    bgColor: 'bg-cyan/10',
  },
  {
    icon: FileText,
    title: 'Trading Guides',
    description: 'Learn trading strategies and market analysis',
    link: '#',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Open source code and community contributions',
    link: '#',
    color: 'text-cyan',
    bgColor: 'bg-cyan/10',
  },
  {
    icon: MessageCircle,
    title: 'Community Forum',
    description: 'Connect with other traders and share experiences',
    link: '#',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: ExternalLink,
    title: 'Status Page',
    description: 'Check system status and uptime information',
    link: '#',
    color: 'text-cyan',
    bgColor: 'bg-cyan/10',
  },
];

const HelpResources = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resources.map((resource, index) => {
        const Icon = resource.icon;
        return (
          <a
            key={index}
            href={resource.link}
            className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] group"
          >
            <div className={`${resource.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <Icon className={`w-6 h-6 ${resource.color}`} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">
              {resource.title}
            </h3>
            <p className="text-muted-text text-sm">{resource.description}</p>
          </a>
        );
      })}
    </div>
  );
};

export default HelpResources;

