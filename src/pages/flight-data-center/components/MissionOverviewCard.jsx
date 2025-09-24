import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionOverviewCard = ({ mission }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-success bg-success/20 border-success/30';
      case 'active': return 'text-primary bg-primary/20 border-primary/30';
      case 'scheduled': return 'text-warning bg-warning/20 border-warning/30';
      default: return 'text-muted-foreground bg-muted/20 border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mission-glow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Satellite" size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">{mission?.name}</h3>
            <p className="text-sm text-muted-foreground">Mission ID: {mission?.id}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-mono border ${getStatusColor(mission?.status)}`}>
          {mission?.status?.toUpperCase()}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Launch Date</p>
          <p className="font-mono text-sm text-card-foreground">{mission?.launchDate}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Duration</p>
          <p className="font-mono text-sm text-card-foreground">{mission?.duration}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Altitude</p>
          <p className="font-mono text-sm text-card-foreground">{mission?.altitude}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Orbits</p>
          <p className="font-mono text-sm text-card-foreground">{mission?.orbits}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{mission?.description}</p>
      <div className="flex flex-wrap gap-2">
        {mission?.tags?.map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-muted/30 text-xs font-mono text-muted-foreground rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MissionOverviewCard;