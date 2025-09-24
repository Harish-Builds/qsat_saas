import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GPSTracker = () => {
  const [trackingData, setTrackingData] = useState({
    satellite: {
      lat: 34.0522,
      lng: -118.2437,
      altitude: 0,
      speed: 0,
      heading: 245,
      lastUpdate: new Date()
    },
    recoveryTeam: {
      lat: 34.0580,
      lng: -118.2420,
      speed: 45,
      heading: 180,
      eta: "12 minutes"
    },
    landingZone: {
      lat: 34.0495,
      lng: -118.2501,
      radius: 500,
      status: "secured"
    }
  });

  const [mapView, setMapView] = useState('hybrid');
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setTrackingData(prev => ({
        ...prev,
        satellite: {
          ...prev?.satellite,
          lat: prev?.satellite?.lat + (Math.random() - 0.5) * 0.001,
          lng: prev?.satellite?.lng + (Math.random() - 0.5) * 0.001,
          speed: Math.max(0, prev?.satellite?.speed + (Math.random() - 0.5) * 5),
          lastUpdate: new Date()
        },
        recoveryTeam: {
          ...prev?.recoveryTeam,
          lat: prev?.recoveryTeam?.lat + (Math.random() - 0.5) * 0.0005,
          lng: prev?.recoveryTeam?.lng + (Math.random() - 0.5) * 0.0005,
          speed: Math.max(0, prev?.recoveryTeam?.speed + (Math.random() - 0.5) * 10)
        }
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const distanceToTarget = calculateDistance(
    trackingData?.satellite?.lat,
    trackingData?.satellite?.lng,
    trackingData?.recoveryTeam?.lat,
    trackingData?.recoveryTeam?.lng
  );

  const mapViewOptions = [
    { value: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { value: 'hybrid', label: 'Hybrid', icon: 'Layers' },
    { value: 'terrain', label: 'Terrain', icon: 'Mountain' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="MapPin" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">GPS Tracking</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={autoRefresh ? "default" : "outline"}
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              iconName={autoRefresh ? "Pause" : "Play"}
              iconPosition="left"
            >
              {autoRefresh ? "Live" : "Paused"}
            </Button>
          </div>
        </div>

        {/* Map View Controls */}
        <div className="flex items-center space-x-2 mb-4">
          {mapViewOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setMapView(option?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                mapView === option?.value
                  ? 'bg-primary/20 text-primary border border-primary/30' :'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Distance to Target</div>
            <div className="text-lg font-mono text-foreground">
              {distanceToTarget?.toFixed(2)} km
            </div>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Recovery ETA</div>
            <div className="text-lg font-mono text-foreground">
              {trackingData?.recoveryTeam?.eta}
            </div>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Team Speed</div>
            <div className="text-lg font-mono text-foreground">
              {trackingData?.recoveryTeam?.speed?.toFixed(0)} km/h
            </div>
          </div>
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="text-xs text-muted-foreground mb-1">Zone Status</div>
            <div className="text-lg font-mono text-success capitalize">
              {trackingData?.landingZone?.status}
            </div>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative aspect-video bg-muted/20">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Recovery Operations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${trackingData?.satellite?.lat},${trackingData?.satellite?.lng}&z=14&output=embed`}
          className="border-0"
        ></iframe>

        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-2 space-y-2">
          <Button variant="ghost" size="sm">
            <Icon name="ZoomIn" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="ZoomOut" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="RotateCcw" size={16} />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
          <div className="text-xs font-semibold text-foreground mb-2">Legend</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-xs text-foreground">Satellite</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-foreground">Recovery Team</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-foreground">Landing Zone</span>
          </div>
        </div>
      </div>
      {/* Coordinate Details */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Satellite Position */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-sm font-semibold text-foreground">Satellite Position</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Latitude:</span>
                <span className="font-mono text-foreground">{trackingData?.satellite?.lat?.toFixed(6)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Longitude:</span>
                <span className="font-mono text-foreground">{trackingData?.satellite?.lng?.toFixed(6)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Altitude:</span>
                <span className="font-mono text-foreground">{trackingData?.satellite?.altitude} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed:</span>
                <span className="font-mono text-foreground">{trackingData?.satellite?.speed?.toFixed(1)} m/s</span>
              </div>
            </div>
          </div>

          {/* Recovery Team */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm font-semibold text-foreground">Recovery Team</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Latitude:</span>
                <span className="font-mono text-foreground">{trackingData?.recoveryTeam?.lat?.toFixed(6)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Longitude:</span>
                <span className="font-mono text-foreground">{trackingData?.recoveryTeam?.lng?.toFixed(6)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed:</span>
                <span className="font-mono text-foreground">{trackingData?.recoveryTeam?.speed} km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heading:</span>
                <span className="font-mono text-foreground">{trackingData?.recoveryTeam?.heading}°</span>
              </div>
            </div>
          </div>

          {/* Landing Zone */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-sm font-semibold text-foreground">Landing Zone</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Latitude:</span>
                <span className="font-mono text-foreground">{trackingData?.landingZone?.lat?.toFixed(6)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Longitude:</span>
                <span className="font-mono text-foreground">{trackingData?.landingZone?.lng?.toFixed(6)}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Radius:</span>
                <span className="font-mono text-foreground">{trackingData?.landingZone?.radius} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-mono text-success capitalize">{trackingData?.landingZone?.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPSTracker;