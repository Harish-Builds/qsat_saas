import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveCameraFeed = () => {
  const [selectedCamera, setSelectedCamera] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  const cameraFeeds = [
    {
      id: 0,
      name: "Primary Recovery Cam",
      location: "Landing Zone Alpha",
      status: "active",
      quality: "HD",
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: 1,
      name: "Aerial Drone Feed",
      location: "Search Pattern Grid",
      status: "active",
      quality: "4K",
      coordinates: { lat: 34.0580, lng: -118.2420 }
    },
    {
      id: 2,
      name: "Ground Team Mobile",
      location: "Recovery Vehicle",
      status: "active",
      quality: "HD",
      coordinates: { lat: 34.0495, lng: -118.2501 }
    },
    {
      id: 3,
      name: "Backup Static Cam",
      location: "Command Post",
      status: "standby",
      quality: "SD",
      coordinates: { lat: 34.0510, lng: -118.2480 }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStatus(prev => {
        const statuses = ['connected', 'buffering', 'reconnecting'];
        const currentIndex = statuses?.indexOf(prev);
        return statuses?.[(currentIndex + 1) % statuses?.length];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'standby': return 'text-warning';
      case 'offline': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getConnectionStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'buffering': return 'text-warning';
      case 'reconnecting': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Camera" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Live Camera Feeds</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              connectionStatus === 'connected' ? 'bg-success' : 
              connectionStatus === 'buffering' ? 'bg-warning' : 'bg-error'
            }`}></div>
            <span className={`text-xs font-mono ${getConnectionStatusColor(connectionStatus)}`}>
              {connectionStatus?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Camera Selection Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {cameraFeeds?.map((camera) => (
            <button
              key={camera?.id}
              onClick={() => setSelectedCamera(camera?.id)}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCamera === camera?.id
                  ? 'bg-primary/20 text-primary border border-primary/30' :'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  camera?.status === 'active' ? 'bg-success' : 
                  camera?.status === 'standby' ? 'bg-warning' : 'bg-error'
                }`}></div>
                <span>{camera?.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Main Video Feed */}
      <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'aspect-video'}`}>
        <div className="w-full h-full bg-muted/20 flex items-center justify-center relative overflow-hidden">
          {/* Simulated Video Feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop')] bg-cover bg-center"></div>
            </div>
            
            {/* Overlay Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Icon name="Play" size={48} className="text-primary mx-auto opacity-80" />
                <div className="text-card-foreground">
                  <div className="text-lg font-semibold">
                    {cameraFeeds?.[selectedCamera]?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {cameraFeeds?.[selectedCamera]?.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-error/90 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-mono">LIVE</span>
            </div>

            {/* Quality Indicator */}
            <div className="absolute top-4 right-4 bg-background/80 px-2 py-1 rounded text-xs font-mono text-foreground">
              {cameraFeeds?.[selectedCamera]?.quality}
            </div>

            {/* Timestamp */}
            <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded text-xs font-mono text-foreground">
              {new Date()?.toLocaleTimeString('en-US', { hour12: false })} UTC
            </div>

            {/* Coordinates */}
            <div className="absolute bottom-4 right-4 bg-background/80 px-3 py-1 rounded text-xs font-mono text-foreground">
              {cameraFeeds?.[selectedCamera]?.coordinates?.lat?.toFixed(4)}°, {cameraFeeds?.[selectedCamera]?.coordinates?.lng?.toFixed(4)}°
            </div>
          </div>

          {/* Control Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 hover:bg-background"
              >
                <Icon name="Play" size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 hover:bg-background"
              >
                <Icon name="Volume2" size={24} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 hover:bg-background"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={24} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Camera Grid Preview */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cameraFeeds?.map((camera) => (
            <div
              key={camera?.id}
              onClick={() => setSelectedCamera(camera?.id)}
              className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                selectedCamera === camera?.id
                  ? 'ring-2 ring-primary' :'hover:ring-1 hover:ring-border'
              }`}
            >
              <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="Camera" size={16} className="text-muted-foreground mx-auto mb-1" />
                  <div className="text-xs text-muted-foreground truncate px-1">
                    {camera?.name}
                  </div>
                </div>
              </div>
              
              <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                camera?.status === 'active' ? 'bg-success' : 
                camera?.status === 'standby' ? 'bg-warning' : 'bg-error'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveCameraFeed;