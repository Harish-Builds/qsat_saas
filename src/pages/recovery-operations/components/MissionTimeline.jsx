import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MissionTimeline = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activePhase, setActivePhase] = useState(3);

  const timelineEvents = [
    {
      id: 1,
      phase: "Pre-Launch",
      time: "T-02:00:00",
      status: "completed",
      title: "Final Systems Check",
      description: "All satellite systems verified and launch sequence initiated",
      icon: "CheckCircle",
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 2,
      phase: "Launch",
      time: "T+00:00:00",
      status: "completed",
      title: "Liftoff Successful",
      description: "Satellite launched successfully from Launch Pad Alpha",
      icon: "Rocket",
      timestamp: new Date(Date.now() - 5400000)
    },
    {
      id: 3,
      phase: "Flight",
      time: "T+01:30:00",
      status: "completed",
      title: "Peak Altitude Reached",
      description: "Maximum altitude of 100km achieved, data collection initiated",
      icon: "TrendingUp",
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 4,
      phase: "Recovery",
      time: "T+02:15:00",
      status: "active",
      title: "Recovery Phase Active",
      description: "Satellite descending, recovery team deployed to landing zone",
      icon: "MapPin",
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 5,
      phase: "Landing",
      time: "T+02:45:00",
      status: "pending",
      title: "Expected Landing",
      description: "Estimated touchdown in designated recovery area",
      icon: "Target",
      timestamp: new Date(Date.now() + 900000)
    },
    {
      id: 6,
      phase: "Retrieval",
      time: "T+03:00:00",
      status: "pending",
      title: "Satellite Retrieval",
      description: "Recovery team secures satellite and begins data extraction",
      icon: "Package",
      timestamp: new Date(Date.now() + 1800000)
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'active': return 'text-primary';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'completed': return 'bg-success/20 border-success/30';
      case 'active': return 'bg-primary/20 border-primary/30 mission-glow';
      case 'pending': return 'bg-muted/20 border-border';
      default: return 'bg-muted/20 border-border';
    }
  };

  const formatTimeElapsed = (timestamp) => {
    const diff = Math.abs(currentTime - timestamp);
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (timestamp > currentTime) {
      return `in ${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${seconds?.toString()?.padStart(2, '0')}`;
    } else {
      return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${seconds?.toString()?.padStart(2, '0')} ago`;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Mission Timeline</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-primary">
              {currentTime?.toLocaleTimeString('en-US', { hour12: false })} UTC
            </span>
          </div>
        </div>

        {/* Mission Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Mission Progress</span>
            <span className="text-sm font-mono text-foreground">
              {Math.round((activePhase / timelineEvents?.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(activePhase / timelineEvents?.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Timeline Events */}
      <div className="p-4">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-6">
            {timelineEvents?.map((event, index) => (
              <div key={event?.id} className="relative flex items-start space-x-4">
                {/* Timeline Node */}
                <div className={`relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center ${getStatusBg(event?.status)}`}>
                  <Icon 
                    name={event?.icon} 
                    size={20} 
                    className={getStatusColor(event?.status)}
                  />
                  {event?.status === 'active' && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
                  )}
                </div>

                {/* Event Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <h4 className="text-sm font-semibold text-foreground">
                        {event?.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-mono ${
                        event?.status === 'completed' ? 'bg-success/20 text-success' :
                        event?.status === 'active'? 'bg-primary/20 text-primary' : 'bg-muted/20 text-muted-foreground'
                      }`}>
                        {event?.phase}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event?.time}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {event?.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {formatTimeElapsed(event?.timestamp)}
                      </span>
                    </div>
                    {event?.status === 'active' && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-primary font-medium">In Progress</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Next Milestone */}
      <div className="p-4 border-t border-border bg-muted/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Target" size={16} className="text-warning" />
            <div>
              <div className="text-sm font-semibold text-foreground">Next Milestone</div>
              <div className="text-xs text-muted-foreground">
                {timelineEvents?.find(e => e?.status === 'pending')?.title || 'Mission Complete'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono text-foreground">
              {timelineEvents?.find(e => e?.status === 'pending')?.time || 'Complete'}
            </div>
            <div className="text-xs text-muted-foreground">
              {timelineEvents?.find(e => e?.status === 'pending') ? 
                formatTimeElapsed(timelineEvents?.find(e => e?.status === 'pending')?.timestamp) : 
                'All phases complete'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionTimeline;