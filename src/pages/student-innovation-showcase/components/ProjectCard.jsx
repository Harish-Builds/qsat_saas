import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/20 border-success/30';
      case 'Intermediate': return 'text-warning bg-warning/20 border-warning/30';
      case 'Advanced': return 'text-error bg-error/20 border-error/30';
      default: return 'text-muted-foreground bg-muted/20 border-border';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Antenna Systems': return 'Radio';
      case 'Power Systems': return 'Battery';
      case 'Communication': return 'Wifi';
      case 'Sensors': return 'Gauge';
      case 'Structure': return 'Box';
      case 'Software': return 'Code';
      default: return 'Satellite';
    }
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 ${
        isHovered ? 'border-primary/50 mission-glow' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-mono border ${getDifficultyColor(project?.difficulty)}`}>
            {project?.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-2">
            <Icon name={getCategoryIcon(project?.category)} size={16} className="text-primary" />
          </div>
        </div>
        {project?.isNew && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold animate-pulse">
              NEW
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2">
            {project?.title}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            <Icon name="Star" size={14} className="text-warning fill-current" />
            <span className="text-sm font-mono text-muted-foreground">
              {project?.rating}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {project?.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Image
              src={project?.student?.avatar}
              alt={project?.student?.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-card-foreground">{project?.student?.name}</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            {project?.buildTime}
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{project?.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{project?.downloads}</span>
            </div>
          </div>
          <span className="text-xs px-2 py-1 bg-muted/30 rounded-full text-muted-foreground">
            {project?.category}
          </span>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            iconName="Play"
            iconPosition="left"
          >
            Watch Build
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(project)}
            iconName="ExternalLink"
            iconPosition="right"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;