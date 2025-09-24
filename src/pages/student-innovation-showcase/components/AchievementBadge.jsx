import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ achievement, size = 'default' }) => {
  const getAchievementConfig = (type) => {
    switch (type) {
      case 'First Launch':
        return {
          icon: 'Rocket',
          color: 'text-primary bg-primary/20 border-primary/30',
          glow: 'mission-glow'
        };
      case 'Innovation Award':
        return {
          icon: 'Award',
          color: 'text-warning bg-warning/20 border-warning/30',
          glow: 'countdown-pulse'
        };
      case 'Team Leader':
        return {
          icon: 'Crown',
          color: 'text-accent bg-accent/20 border-accent/30',
          glow: ''
        };
      case 'Perfect Score':
        return {
          icon: 'Star',
          color: 'text-success bg-success/20 border-success/30',
          glow: ''
        };
      case 'Quick Builder':
        return {
          icon: 'Zap',
          color: 'text-secondary bg-secondary/20 border-secondary/30',
          glow: ''
        };
      case 'Mentor':
        return {
          icon: 'GraduationCap',
          color: 'text-primary bg-primary/20 border-primary/30',
          glow: ''
        };
      default:
        return {
          icon: 'Badge',
          color: 'text-muted-foreground bg-muted/20 border-border',
          glow: ''
        };
    }
  };

  const config = getAchievementConfig(achievement?.type);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    default: 14,
    lg: 16
  };

  return (
    <div className={`inline-flex items-center space-x-1.5 rounded-full border font-medium ${config?.color} ${config?.glow} ${sizeClasses?.[size]}`}>
      <Icon name={config?.icon} size={iconSizes?.[size]} />
      <span>{achievement?.name}</span>
      {achievement?.date && size !== 'sm' && (
        <span className="opacity-75 font-mono">
          • {achievement?.date}
        </span>
      )}
    </div>
  );
};

export default AchievementBadge;