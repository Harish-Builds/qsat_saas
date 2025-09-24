import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: 22,
      humidity: 65,
      windSpeed: 12,
      windDirection: 'NW',
      pressure: 1013.2,
      visibility: 10,
      conditions: 'Clear',
      icon: 'Sun'
    },
    forecast: [
      { time: '14:00', temp: 24, conditions: 'Sunny', icon: 'Sun', windSpeed: 15 },
      { time: '15:00', temp: 25, conditions: 'Partly Cloudy', icon: 'CloudSun', windSpeed: 18 },
      { time: '16:00', temp: 23, conditions: 'Cloudy', icon: 'Cloud', windSpeed: 20 },
      { time: '17:00', temp: 21, conditions: 'Light Rain', icon: 'CloudRain', windSpeed: 22 }
    ],
    alerts: [
      {
        type: 'wind',
        severity: 'moderate',
        message: 'Wind speeds may affect recovery operations',
        icon: 'Wind'
      }
    ]
  });

  const [selectedMetric, setSelectedMetric] = useState('temperature');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        current: {
          ...prev?.current,
          temperature: prev?.current?.temperature + (Math.random() - 0.5) * 2,
          humidity: Math.max(0, Math.min(100, prev?.current?.humidity + (Math.random() - 0.5) * 5)),
          windSpeed: Math.max(0, prev?.current?.windSpeed + (Math.random() - 0.5) * 3),
          pressure: prev?.current?.pressure + (Math.random() - 0.5) * 2
        }
      }));
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getWindDirection = (direction) => {
    const directions = {
      'N': 0, 'NE': 45, 'E': 90, 'SE': 135,
      'S': 180, 'SW': 225, 'W': 270, 'NW': 315
    };
    return directions?.[direction] || 0;
  };

  const metrics = [
    { key: 'temperature', label: 'Temperature', unit: '°C', icon: 'Thermometer' },
    { key: 'humidity', label: 'Humidity', unit: '%', icon: 'Droplets' },
    { key: 'windSpeed', label: 'Wind Speed', unit: 'km/h', icon: 'Wind' },
    { key: 'pressure', label: 'Pressure', unit: 'hPa', icon: 'Gauge' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="CloudSun" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Weather Conditions</h3>
          </div>
          <div className="text-xs text-muted-foreground">
            Updated: {lastUpdate?.toLocaleTimeString('en-US', { hour12: false })}
          </div>
        </div>

        {/* Current Weather */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name={weatherData?.current?.icon} size={32} className="text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">
                  {weatherData?.current?.temperature?.toFixed(1)}°C
                </div>
                <div className="text-sm text-muted-foreground">
                  {weatherData?.current?.conditions}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Droplets" size={14} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Humidity</span>
                </div>
                <div className="text-lg font-mono text-foreground">
                  {weatherData?.current?.humidity?.toFixed(0)}%
                </div>
              </div>
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Eye" size={14} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Visibility</span>
                </div>
                <div className="text-lg font-mono text-foreground">
                  {weatherData?.current?.visibility} km
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Wind Information */}
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Wind" size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">Wind</span>
                </div>
                <div className="text-lg font-mono text-foreground">
                  {weatherData?.current?.windSpeed?.toFixed(0)} km/h
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative w-12 h-12">
                  <div className="w-full h-full border-2 border-border rounded-full flex items-center justify-center">
                    <Icon 
                      name="Navigation" 
                      size={20} 
                      className="text-primary transition-transform duration-500"
                      style={{ 
                        transform: `rotate(${getWindDirection(weatherData?.current?.windDirection)}deg)` 
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-foreground font-medium">
                    {weatherData?.current?.windDirection}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Direction
                  </div>
                </div>
              </div>
            </div>

            {/* Pressure */}
            <div className="bg-muted/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Gauge" size={16} className="text-primary" />
                  <span className="text-sm font-semibold text-foreground">Pressure</span>
                </div>
                <div className="text-lg font-mono text-foreground">
                  {weatherData?.current?.pressure?.toFixed(1)} hPa
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Alerts */}
        {weatherData?.alerts?.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Weather Alerts</h4>
            <div className="space-y-2">
              {weatherData?.alerts?.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
                  <Icon name={alert?.icon} size={16} className={getSeverityColor(alert?.severity)} />
                  <div className="flex-1">
                    <div className="text-sm text-foreground">{alert?.message}</div>
                    <div className={`text-xs capitalize ${getSeverityColor(alert?.severity)}`}>
                      {alert?.severity} severity
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Hourly Forecast */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">4-Hour Forecast</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {weatherData?.forecast?.map((hour, index) => (
            <div key={index} className="bg-muted/20 rounded-lg p-3 text-center">
              <div className="text-xs text-muted-foreground mb-2">{hour?.time}</div>
              <Icon name={hour?.icon} size={24} className="text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold text-foreground mb-1">
                {hour?.temp}°C
              </div>
              <div className="text-xs text-muted-foreground mb-1">
                {hour?.conditions}
              </div>
              <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                <Icon name="Wind" size={10} />
                <span>{hour?.windSpeed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recovery Impact Assessment */}
      <div className="p-4 border-t border-border bg-muted/10">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <span className="text-sm font-semibold text-foreground">Recovery Impact</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Visibility:</span>
            <span className="text-success font-medium">Excellent</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Wind Conditions:</span>
            <span className="text-warning font-medium">Moderate</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Overall Safety:</span>
            <span className="text-success font-medium">Good</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;