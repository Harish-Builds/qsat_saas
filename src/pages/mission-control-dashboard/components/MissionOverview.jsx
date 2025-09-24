import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissionOverview = () => {
  const [missionStats, setMissionStats] = useState({
    totalMissions: 47,
    activeSatellites: 12,
    dataCollected: 2847.5,
    studentsInvolved: 1250,
    successRate: 94.7,
    orbitalTime: 15847
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'telemetry',
      title: 'Telemetry Data Received',
      description: 'QSAT-07 transmitted health status and orbital parameters',
      timestamp: new Date(Date.now() - 300000),
      status: 'success',
      icon: 'Radio'
    },
    {
      id: 2,
      type: 'mission',
      title: 'Orbit Adjustment Complete',
      description: 'QSAT-12 successfully adjusted altitude to 412.3 km',
      timestamp: new Date(Date.now() - 900000),
      status: 'success',
      icon: 'Navigation'
    },
    {
      id: 3,
      type: 'data',
      title: 'Scientific Data Downlink',
      description: 'Atmospheric measurement data package received',
      timestamp: new Date(Date.now() - 1800000),
      status: 'info',
      icon: 'Download'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Battery Temperature Alert',
      description: 'QSAT-05 battery temperature elevated, monitoring initiated',
      timestamp: new Date(Date.now() - 2700000),
      status: 'warning',
      icon: 'AlertTriangle'
    },
    {
      id: 5,
      type: 'communication',
      title: 'Ground Station Contact',
      description: 'Established communication with Tokyo Ground Station',
      timestamp: new Date(Date.now() - 3600000),
      status: 'success',
      icon: 'Satellite'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionStats(prev => ({
        ...prev,
        dataCollected: prev?.dataCollected + Math.random() * 0.5,
        orbitalTime: prev?.orbitalTime + 1
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const missionCards = [
    {
      title: 'Total Missions',
      value: missionStats?.totalMissions,
      unit: '',
      icon: 'Rocket',
      color: 'primary',
      trend: '+3 this month'
    },
    {
      title: 'Active Satellites',
      value: missionStats?.activeSatellites,
      unit: '',
      icon: 'Satellite',
      color: 'success',
      trend: 'All operational'
    },
    {
      title: 'Data Collected',
      value: missionStats?.dataCollected?.toFixed(1),
      unit: 'GB',
      icon: 'Database',
      color: 'accent',
      trend: '+12.3% today'
    },
    {
      title: 'Students Involved',
      value: missionStats?.studentsInvolved?.toLocaleString(),
      unit: '',
      icon: 'Users',
      color: 'secondary',
      trend: '+45 this week'
    },
    {
      title: 'Success Rate',
      value: missionStats?.successRate,
      unit: '%',
      icon: 'TrendingUp',
      color: 'success',
      trend: 'Industry leading'
    },
    {
      title: 'Orbital Time',
      value: missionStats?.orbitalTime?.toLocaleString(),
      unit: 'hrs',
      icon: 'Clock',
      color: 'primary',
      trend: 'Continuous'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-primary';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'success': return 'bg-success/20 border-success/30';
      case 'warning': return 'bg-warning/20 border-warning/30';
      case 'error': return 'bg-error/20 border-error/30';
      default: return 'bg-primary/20 border-primary/30';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-card/50 to-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Command" size={24} className="text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">
              Mission Overview
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            QSAT Mission Control Center
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive overview of all active missions, satellite operations, and real-time mission statistics.
          </p>
        </div>

        {/* Mission Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {missionCards?.map((card, index) => (
            <div 
              key={index}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${card?.color}/20 border border-${card?.color}/30 group-hover:mission-glow transition-all duration-300`}>
                  <Icon name={card?.icon} size={24} className={`text-${card?.color}`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl md:text-3xl font-bold text-foreground font-mono">
                    {card?.value}
                    <span className="text-lg text-muted-foreground ml-1">
                      {card?.unit}
                    </span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {card?.title}
              </h3>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full bg-${card?.color} animate-pulse`}></div>
                <span className="text-sm text-muted-foreground">
                  {card?.trend}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={20} className="text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Recent Activities</h3>
                </div>
                <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
                  Refresh
                </Button>
              </div>

              <div className="space-y-4">
                {recentActivities?.map((activity) => (
                  <div 
                    key={activity?.id}
                    className={`flex items-start space-x-4 p-4 rounded-xl border ${getStatusBg(activity?.status)} hover:scale-[1.02] transition-all duration-200`}
                  >
                    <div className={`p-2 rounded-lg bg-background/50 ${getStatusColor(activity?.status)}`}>
                      <Icon name={activity?.icon} size={18} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-foreground mb-1">
                        {activity?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity?.description}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">
                          {formatTimeAgo(activity?.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border text-center">
                <Button variant="outline" iconName="ArrowRight" iconPosition="right">
                  View All Activities
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Zap" size={20} className="text-accent" />
                <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="default" 
                  fullWidth 
                  iconName="Play" 
                  iconPosition="left"
                  className="justify-start"
                >
                  Start Mission Sequence
                </Button>
                
                <Button 
                  variant="outline" 
                  fullWidth 
                  iconName="Download" 
                  iconPosition="left"
                  className="justify-start"
                >
                  Download Reports
                </Button>
                
                <Button 
                  variant="outline" 
                  fullWidth 
                  iconName="Settings" 
                  iconPosition="left"
                  className="justify-start"
                >
                  System Configuration
                </Button>
                
                <Button 
                  variant="outline" 
                  fullWidth 
                  iconName="AlertCircle" 
                  iconPosition="left"
                  className="justify-start"
                >
                  Emergency Protocols
                </Button>
              </div>
            </div>

            {/* Mission Navigation */}
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Navigation" size={20} className="text-secondary" />
                <h3 className="text-xl font-semibold text-foreground">Mission Centers</h3>
              </div>

              <div className="space-y-3">
                <a 
                  href="/launch-event-hub"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <Icon name="Rocket" size={18} className="text-primary group-hover:text-accent transition-colors" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Launch Hub</div>
                    <div className="text-xs text-muted-foreground">Event coordination</div>
                  </div>
                </a>
                
                <a 
                  href="/flight-data-center"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <Icon name="BarChart3" size={18} className="text-primary group-hover:text-accent transition-colors" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Flight Data</div>
                    <div className="text-xs text-muted-foreground">Analytics center</div>
                  </div>
                </a>
                
                <a 
                  href="/recovery-operations"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <Icon name="MapPin" size={18} className="text-primary group-hover:text-accent transition-colors" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Recovery Ops</div>
                    <div className="text-xs text-muted-foreground">Landing zones</div>
                  </div>
                </a>
                
                <a 
                  href="/student-innovation-showcase"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <Icon name="Trophy" size={18} className="text-primary group-hover:text-accent transition-colors" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Innovation</div>
                    <div className="text-xs text-muted-foreground">Student showcase</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionOverview;