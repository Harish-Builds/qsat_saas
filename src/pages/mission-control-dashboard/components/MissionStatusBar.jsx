import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MissionStatusBar = () => {
  const [missionTime, setMissionTime] = useState(new Date());
  const [missionStatus, setMissionStatus] = useState({
    status: 'ACTIVE',
    phase: 'ORBITAL_OPERATIONS',
    nextEvent: 'Data Downlink',
    timeToNext: 847
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(new Date());
      setMissionStatus(prev => ({
        ...prev,
        timeToNext: prev?.timeToNext > 0 ? prev?.timeToNext - 1 : 3600
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="bg-card/95 backdrop-blur-md border-b border-border px-6 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-success font-medium">
              {missionStatus?.status}
            </span>
          </div>
          
          <div className="hidden sm:flex items-center space-x-2">
            <Icon name="Satellite" size={16} className="text-primary orbital-rotate" />
            <span className="text-sm text-muted-foreground">
              Phase: <span className="text-foreground font-mono">{missionStatus?.phase}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="text-sm text-muted-foreground">
              Next: <span className="text-accent font-mono">{missionStatus?.nextEvent}</span>
            </span>
            <span className="text-sm font-mono text-accent countdown-pulse">
              {formatTime(missionStatus?.timeToNext)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={16} className="text-muted-foreground" />
            <span className="text-sm font-mono text-muted-foreground">
              UTC {missionTime?.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatusBar;