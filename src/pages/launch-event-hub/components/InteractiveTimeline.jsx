import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveTimeline = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef(null);

  const missionPhases = [
    {
      id: 1,
      phase: "Pre-Launch",
      time: "T-4 hours",
      title: "Final Preparations",
      description: "System checks, weather monitoring, and final go/no-go decisions. Mission control teams verify all systems are ready for launch.",
      status: "completed",
      icon: "CheckCircle",
      details: [
        "Satellite health verification",
        "Weather assessment",
        "Ground station readiness",
        "Team briefings"
      ],
      duration: "4 hours",
      keyPersonnel: ["Mission Director", "Weather Officer", "Systems Engineer"]
    },
    {
      id: 2,
      phase: "Launch Window",
      time: "T-0",
      title: "Deployment Sequence",
      description: "QSAT-1 is deployed from the launch vehicle at the optimal orbital position. Critical moment where years of preparation come together.",
      status: "active",
      icon: "Rocket",
      details: [
        "Launch vehicle separation",
        "Satellite deployment",
        "Initial tumbling phase",
        "Solar panel deployment"
      ],
      duration: "15 minutes",
      keyPersonnel: ["Flight Director", "Deployment Engineer", "Communications Lead"]
    },
    {
      id: 3,
      phase: "Early Operations",
      time: "T+30 min",
      title: "First Contact",
      description: "Establishing initial communication with QSAT-1 and beginning basic system checkouts. The most critical phase for mission success.",
      status: "upcoming",
      icon: "Radio",
      details: [
        "Signal acquisition",
        "Beacon reception",
        "Basic telemetry",
        "Attitude stabilization"
      ],
      duration: "2 hours",
      keyPersonnel: ["Ground Station Operator", "RF Engineer", "Flight Operations"]
    },
    {
      id: 4,
      phase: "Commissioning",
      time: "T+2 hours",
      title: "System Activation",
      description: "Systematic activation and testing of all satellite subsystems. Verification that all components survived launch and are functioning.",
      status: "upcoming",
      icon: "Settings",
      details: [
        "Subsystem activation",
        "Sensor calibration",
        "Communication tests",
        "Payload checkout"
      ],
      duration: "4 hours",
      keyPersonnel: ["Payload Specialist", "Systems Engineer", "Test Conductor"]
    },
    {
      id: 5,
      phase: "Mission Operations",
      time: "T+24 hours",
      title: "Science Phase Begin",
      description: "Transition to normal operations and beginning of the primary mission objectives. Start of regular data collection and experiments.",
      status: "upcoming",
      icon: "BarChart3",
      details: [
        "Science data collection",
        "Regular communications",
        "Orbit maintenance",
        "Mission objectives"
      ],
      duration: "12+ months",
      keyPersonnel: ["Mission Scientist", "Operations Manager", "Data Analyst"]
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (timelineRef?.current) {
      observer?.observe(timelineRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  // Auto-advance timeline for demo purposes
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActivePhase((prev) => (prev + 1) % missionPhases?.length);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isVisible, missionPhases?.length]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success border-success bg-success/20';
      case 'active':
        return 'text-accent border-accent bg-accent/20 animate-pulse';
      case 'upcoming':
        return 'text-muted-foreground border-border bg-muted/20';
      default:
        return 'text-muted-foreground border-border bg-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'active':
        return 'Play';
      case 'upcoming':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  return (
    <section ref={timelineRef} className="py-20 bg-gradient-to-b from-slate-900 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Timeline" size={20} className="text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wide">Mission Timeline</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Launch Sequence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow the complete mission timeline from pre-launch preparations to operational phase. Each step is critical for mission success.
          </p>
        </div>

        {/* Timeline Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {missionPhases?.map((phase, index) => (
            <button
              key={phase?.id}
              onClick={() => setActivePhase(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activePhase === index
                  ? 'bg-primary text-primary-foreground mission-glow'
                  : `${getStatusColor(phase?.status)} hover:bg-opacity-30`
              }`}
            >
              <Icon name={getStatusIcon(phase?.status)} size={16} />
              <span>{phase?.phase}</span>
            </button>
          ))}
        </div>

        {/* Main Timeline Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Timeline Visualization */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-8">
              {missionPhases?.map((phase, index) => (
                <div
                  key={phase?.id}
                  className={`relative flex items-start space-x-6 transition-all duration-500 ${
                    activePhase === index ? 'scale-105' : 'scale-100'
                  }`}
                  onClick={() => setActivePhase(index)}
                >
                  {/* Timeline Node */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    activePhase === index
                      ? 'bg-primary border-primary text-primary-foreground mission-glow scale-110'
                      : getStatusColor(phase?.status)
                  }`}>
                    <Icon 
                      name={activePhase === index ? phase?.icon : getStatusIcon(phase?.status)} 
                      size={24} 
                    />
                  </div>

                  {/* Phase Content */}
                  <div className={`flex-1 pb-8 cursor-pointer transition-all duration-300 ${
                    activePhase === index ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                  }`}>
                    <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-mono text-primary">{phase?.time}</span>
                          <div className={`px-2 py-1 rounded-full text-xs font-mono ${getStatusColor(phase?.status)}`}>
                            {phase?.status?.toUpperCase()}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{phase?.duration}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">{phase?.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{phase?.description}</p>
                      
                      {activePhase === index && (
                        <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                          <div className="grid grid-cols-2 gap-2">
                            {phase?.details?.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center space-x-2 text-xs">
                                <Icon name="CheckCircle" size={12} className="text-success" />
                                <span className="text-muted-foreground">{detail}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="pt-3 border-t border-border/30">
                            <div className="text-xs text-muted-foreground mb-1">Key Personnel:</div>
                            <div className="flex flex-wrap gap-1">
                              {phase?.keyPersonnel?.map((person, personIndex) => (
                                <span key={personIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                  {person}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Phase Details */}
          <div className="sticky top-24">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(missionPhases?.[activePhase]?.status)}`}>
                  <Icon name={missionPhases?.[activePhase]?.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{missionPhases?.[activePhase]?.title}</h3>
                  <p className="text-primary font-mono">{missionPhases?.[activePhase]?.time} • {missionPhases?.[activePhase]?.duration}</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {missionPhases?.[activePhase]?.description}
              </p>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-foreground">Phase Activities</h4>
                <div className="grid gap-3">
                  {missionPhases?.[activePhase]?.details?.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                      <Icon name="ArrowRight" size={16} className="text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Mission Control Team</h4>
                <div className="flex flex-wrap gap-2">
                  {missionPhases?.[activePhase]?.keyPersonnel?.map((person, index) => (
                    <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg">
                      <Icon name="User" size={14} className="text-primary" />
                      <span className="text-sm text-primary">{person}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                  >
                    Watch Live
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Phase Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-16 bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-mono text-primary">MISSION PROGRESS</span>
            <span className="text-sm text-muted-foreground">
              Phase {activePhase + 1} of {missionPhases?.length}
            </span>
          </div>
          
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((activePhase + 1) / missionPhases?.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;