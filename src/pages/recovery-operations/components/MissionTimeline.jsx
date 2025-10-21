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
    <div className="bg-card rounded-lg border border-border h-full flex flex-col shadow-sm">
      {/* Header - Fixed at Top */}
      <div className="p-3 sm:p-4 border-b border-border flex-shrink-0 bg-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Icon name="Clock" size={18} className="text-primary flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-semibold text-card-foreground">Mission Timeline</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-primary">
              {currentTime?.toLocaleTimeString('en-US', { hour12: false })} UTC
            </span>
          </div>
        </div>

        {/* Mission Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm text-muted-foreground">Mission Progress</span>
            <span className="text-xs sm:text-sm font-mono text-foreground">
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

      {/* Timeline Events - Scrollable Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 sm:p-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent hover:scrollbar-thumb-muted">
        <div className="relative">
          {/* Timeline Vertical Line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-border via-primary/30 to-border"></div>
          
          <div className="space-y-4 sm:space-y-6">
            {timelineEvents?.map((event, index) => (
              <div key={event?.id} className="relative flex items-start space-x-3 sm:space-x-4">
                {/* Timeline Node */}
                <div className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${getStatusBg(event?.status)}`}>
                  <Icon 
                    name={event?.icon} 
                    size={18} 
                    className={`${getStatusColor(event?.status)} transition-colors duration-300`}
                  />
                  {event?.status === 'active' && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-pulse"></div>
                    </>
                  )}
                </div>

                {/* Event Content Card */}
                <div className="flex-1 min-w-0 pb-2">
                  <div className="bg-muted/20 rounded-lg p-3 border border-border/50 hover:border-border transition-all duration-200">
                    {/* Title Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-semibold text-foreground leading-tight">
                          {event?.title}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-mono whitespace-nowrap ${
                          event?.status === 'completed' ? 'bg-success/20 text-success border border-success/30' :
                          event?.status === 'active'? 'bg-primary/20 text-primary border border-primary/30' : 
                          'bg-muted/30 text-muted-foreground border border-border'
                        }`}>
                          {event?.phase}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                        {event?.time}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                      {event?.description}
                    </p>
                    
                    {/* Footer Info */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} className="text-muted-foreground flex-shrink-0" />
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
                      {event?.status === 'completed' && (
                        <div className="flex items-center space-x-1">
                          <Icon name="CheckCircle" size={12} className="text-success" />
                          <span className="text-success font-medium">Complete</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Milestone Footer - Fixed at Bottom */}
      <div className="p-3 sm:p-4 border-t border-border bg-gradient-to-br from-muted/20 to-muted/5 flex-shrink-0">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <Icon name="Target" size={16} className="text-warning flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
                Next Milestone
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {timelineEvents?.find(e => e?.status === 'pending')?.title || 'Mission Complete'}
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xs sm:text-sm font-mono text-foreground">
              {timelineEvents?.find(e => e?.status === 'pending')?.time || 'Complete'}
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              {timelineEvents?.find(e => e?.status === 'pending') ? 
                formatTimeElapsed(timelineEvents?.find(e => e?.status === 'pending')?.timestamp) : 
                'All phases'
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionTimeline;