import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecoveryTeamStatus = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Alpha Team",
      role: "Primary Recovery",
      status: "deployed",
      location: "Landing Zone A",
      members: 4,
      equipment: ["Recovery Vehicle", "Communication Kit", "First Aid"],
      eta: "8 minutes",
      distance: "2.3 km",
      lastUpdate: new Date(Date.now() - 120000),
      coordinates: { lat: 34.0580, lng: -118.2420 }
    },
    {
      id: 2,
      name: "Bravo Team",
      role: "Search & Rescue",
      status: "standby",
      location: "Command Post",
      members: 3,
      equipment: ["Drone Unit", "GPS Tracker", "Emergency Kit"],
      eta: "15 minutes",
      distance: "5.1 km",
      lastUpdate: new Date(Date.now() - 300000),
      coordinates: { lat: 34.0510, lng: -118.2480 }
    },
    {
      id: 3,
      name: "Charlie Team",
      role: "Technical Support",
      status: "en-route",
      location: "Mobile Lab",
      members: 2,
      equipment: ["Data Recovery Kit", "Diagnostic Tools", "Backup Storage"],
      eta: "12 minutes",
      distance: "3.7 km",
      lastUpdate: new Date(Date.now() - 180000),
      coordinates: { lat: 34.0495, lng: -118.2501 }
    }
  ]);

  const [selectedTeam, setSelectedTeam] = useState(1);
  const [communicationLog, setCommunicationLog] = useState([
    {
      id: 1,
      teamId: 1,
      timestamp: new Date(Date.now() - 300000),
      message: "Alpha Team deployed to primary landing zone. Visual contact established.",
      type: "status"
    },
    {
      id: 2,
      teamId: 3,
      timestamp: new Date(Date.now() - 240000),
      message: "Charlie Team en route with data recovery equipment. ETA 12 minutes.",
      type: "movement"
    },
    {
      id: 3,
      teamId: 1,
      timestamp: new Date(Date.now() - 120000),
      message: "Satellite debris spotted. Securing perimeter for safe recovery.",
      type: "alert"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTeams(prev => prev?.map(team => ({
        ...team,
        distance: Math.max(0.1, team?.distance - 0.1)?.toFixed(1) + " km",
        eta: Math.max(1, parseInt(team?.eta) - 1) + " minutes",
        lastUpdate: team?.status === 'deployed' ? new Date() : team?.lastUpdate
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'deployed': return 'text-success';
      case 'en-route': return 'text-primary';
      case 'standby': return 'text-warning';
      case 'offline': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'deployed': return 'bg-success/20 border-success/30';
      case 'en-route': return 'bg-primary/20 border-primary/30';
      case 'standby': return 'bg-warning/20 border-warning/30';
      case 'offline': return 'bg-error/20 border-error/30';
      default: return 'bg-muted/20 border-border';
    }
  };

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'status': return 'Info';
      case 'movement': return 'Navigation';
      case 'alert': return 'AlertTriangle';
      default: return 'MessageCircle';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Recovery Teams</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-success">
              {teams?.filter(t => t?.status === 'deployed')?.length} ACTIVE
            </span>
          </div>
        </div>

        {/* Team Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {teams?.map((team) => (
            <div
              key={team?.id}
              onClick={() => setSelectedTeam(team?.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedTeam === team?.id
                  ? 'border-primary/50 bg-primary/10' :'border-border hover:border-border/80 bg-muted/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    team?.status === 'deployed' ? 'bg-success' :
                    team?.status === 'en-route' ? 'bg-primary' :
                    team?.status === 'standby' ? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <span className="font-semibold text-foreground">{team?.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusBg(team?.status)} ${getStatusColor(team?.status)}`}>
                  {team?.status}
                </span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="text-foreground">{team?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Members:</span>
                  <span className="text-foreground">{team?.members}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETA:</span>
                  <span className="text-foreground font-mono">{team?.eta}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance:</span>
                  <span className="text-foreground font-mono">{team?.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Selected Team Details */}
      <div className="p-4 border-b border-border">
        {(() => {
          const team = teams?.find(t => t?.id === selectedTeam);
          return (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-foreground">{team?.name} Details</h4>
                <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
                  Contact Team
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-2">Current Status</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`capitalize font-medium ${getStatusColor(team?.status)}`}>
                          {team?.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="text-foreground">{team?.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Update:</span>
                        <span className="text-foreground font-mono">
                          {formatTimeAgo(team?.lastUpdate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-2">Coordinates</h5>
                    <div className="bg-muted/20 rounded-lg p-3 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Latitude:</span>
                        <span className="font-mono text-foreground">
                          {team?.coordinates?.lat?.toFixed(6)}°
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Longitude:</span>
                        <span className="font-mono text-foreground">
                          {team?.coordinates?.lng?.toFixed(6)}°
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-2">Equipment</h5>
                  <div className="space-y-2">
                    {team?.equipment?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Icon name="Package" size={14} className="text-primary" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
      {/* Communication Log */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">Recent Communications</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {communicationLog?.map((log) => {
            const team = teams?.find(t => t?.id === log?.teamId);
            return (
              <div key={log?.id} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                <Icon 
                  name={getMessageTypeIcon(log?.type)} 
                  size={16} 
                  className="text-primary mt-0.5" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {team?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(log?.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log?.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecoveryTeamStatus;