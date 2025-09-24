import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LiveCameraFeed from './components/LiveCameraFeed';
import GPSTracker from './components/GPSTracker';
import WeatherWidget from './components/WeatherWidget';
import MissionTimeline from './components/MissionTimeline';
import RecoveryTeamStatus from './components/RecoveryTeamStatus';

const RecoveryOperations = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [missionStatus, setMissionStatus] = useState({
    phase: 'Recovery Active',
    timeElapsed: '02:15:34',
    nextMilestone: 'Landing Expected',
    confidence: 94
  });

  const [systemHealth, setSystemHealth] = useState({
    communications: 'optimal',
    tracking: 'optimal',
    weather: 'good',
    teams: 'deployed'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionStatus(prev => {
        const [hours, minutes, seconds] = prev?.timeElapsed?.split(':')?.map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
        
        return {
          ...prev,
          timeElapsed: `${newHours?.toString()?.padStart(2, '0')}:${newMinutes?.toString()?.padStart(2, '0')}:${newSeconds?.toString()?.padStart(2, '0')}`,
          confidence: Math.max(85, Math.min(99, prev?.confidence + (Math.random() - 0.5) * 2))
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-success';
      case 'good': return 'text-primary';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getHealthBg = (status) => {
    switch (status) {
      case 'optimal': return 'bg-success/20';
      case 'good': return 'bg-primary/20';
      case 'warning': return 'bg-warning/20';
      case 'critical': return 'bg-error/20';
      default: return 'bg-muted/20';
    }
  };

  return (
    <>
      <Helmet>
        <title>Recovery Operations - QSAT Event Hub</title>
        <meta name="description" content="Live tracking of satellite recovery with GPS coordinates, weather data, and camera feeds. Real-time mission updates and recovery team status." />
        <meta name="keywords" content="satellite recovery, GPS tracking, weather data, live camera feeds, mission timeline, recovery operations" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        }`}>
          {/* Mission Status Bar */}
          <div className="sticky top-16 z-30 bg-card/95 backdrop-blur-md border-b border-border">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {missionStatus?.phase}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Mission Time: T+{missionStatus?.timeElapsed}
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Next: </span>
                      <span className="text-foreground font-medium">{missionStatus?.nextMilestone}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Confidence: </span>
                      <span className="text-success font-mono">{missionStatus?.confidence?.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* System Health Indicators */}
                  <div className="hidden lg:flex items-center space-x-3">
                    {Object.entries(systemHealth)?.map(([system, status]) => (
                      <div key={system} className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getHealthBg(status)}`}>
                        <div className={`w-2 h-2 rounded-full ${
                          status === 'optimal' ? 'bg-success' :
                          status === 'good' ? 'bg-primary' :
                          status === 'warning' ? 'bg-warning' : 'bg-error'
                        }`}></div>
                        <span className={`text-xs capitalize ${getHealthColor(status)}`}>
                          {system}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
                    Refresh
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Icon name="MapPin" size={32} className="text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Recovery Operations
                </h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Live tracking of satellite recovery with real-time GPS coordinates, weather monitoring, 
                and multi-angle camera feeds. Monitor recovery team deployment and mission progress.
              </p>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-success/20 border border-success/30 rounded-full">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-success">RECOVERY ACTIVE</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full">
                  <Icon name="Users" size={14} className="text-primary" />
                  <span className="text-sm font-mono text-primary">3 TEAMS DEPLOYED</span>
                </div>
              </div>
            </div>

            {/* Primary Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Camera and GPS */}
              <div className="xl:col-span-2 space-y-6">
                <LiveCameraFeed />
                <GPSTracker />
              </div>

              {/* Right Column - Weather and Timeline */}
              <div className="space-y-6">
                <WeatherWidget />
                <MissionTimeline />
              </div>
            </div>

            {/* Recovery Team Status - Full Width */}
            <div className="mt-8">
              <RecoveryTeamStatus />
            </div>

            {/* Emergency Protocols */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
                <h3 className="text-lg font-semibold text-card-foreground">Emergency Protocols</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-error/10 border border-error/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Phone" size={16} className="text-error" />
                    <span className="text-sm font-semibold text-foreground">Emergency Contact</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mission Control: +1 (555) 123-4567
                  </div>
                </div>
                
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="MapPin" size={16} className="text-warning" />
                    <span className="text-sm font-semibold text-foreground">Safe Zone</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Coordinates: 34.0522°, -118.2437°
                  </div>
                </div>
                
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Radio" size={16} className="text-primary" />
                    <span className="text-sm font-semibold text-foreground">Radio Channel</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Frequency: 146.520 MHz
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Button variant="default" iconName="Download" iconPosition="left">
                Download Recovery Report
              </Button>
              <Button variant="outline" iconName="Share" iconPosition="left">
                Share Mission Data
              </Button>
              <Button variant="outline" iconName="Camera" iconPosition="left">
                Capture Screenshot
              </Button>
              <Button variant="outline" iconName="MessageSquare" iconPosition="left">
                Contact Mission Control
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RecoveryOperations;