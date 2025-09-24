import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const LiveDataVisualization = () => {
  const [activeChart, setActiveChart] = useState('telemetry');
  const [liveData, setLiveData] = useState({
    telemetry: [],
    power: [],
    temperature: [],
    communication: []
  });

  const [systemStatus, setSystemStatus] = useState({
    power: 98.5,
    communication: 95.2,
    thermal: 87.3,
    attitude: 99.1,
    payload: 92.8
  });

  // Generate mock live data
  useEffect(() => {
    const generateTelemetryData = () => {
      const now = new Date();
      return Array.from({ length: 20 }, (_, i) => ({
        time: new Date(now.getTime() - (19 - i) * 30000)?.toLocaleTimeString('en-US', { hour12: false }),
        altitude: 408 + Math.sin(i * 0.3) * 5 + Math.random() * 2,
        velocity: 7.66 + Math.sin(i * 0.2) * 0.1 + Math.random() * 0.05,
        signal: 85 + Math.sin(i * 0.4) * 10 + Math.random() * 5
      }));
    };

    const generatePowerData = () => {
      const now = new Date();
      return Array.from({ length: 15 }, (_, i) => ({
        time: new Date(now.getTime() - (14 - i) * 60000)?.toLocaleTimeString('en-US', { hour12: false }),
        solar: 45 + Math.sin(i * 0.5) * 15 + Math.random() * 5,
        battery: 85 - Math.sin(i * 0.3) * 10 + Math.random() * 3,
        consumption: 35 + Math.sin(i * 0.4) * 8 + Math.random() * 4
      }));
    };

    const generateTemperatureData = () => {
      const now = new Date();
      return Array.from({ length: 12 }, (_, i) => ({
        time: new Date(now.getTime() - (11 - i) * 120000)?.toLocaleTimeString('en-US', { hour12: false }),
        internal: -15 + Math.sin(i * 0.2) * 5 + Math.random() * 2,
        external: -45 + Math.sin(i * 0.3) * 20 + Math.random() * 5,
        battery: 25 + Math.sin(i * 0.4) * 10 + Math.random() * 3
      }));
    };

    const generateCommunicationData = () => {
      return Array.from({ length: 8 }, (_, i) => ({
        station: `GS-${i + 1}`,
        uplink: 85 + Math.random() * 15,
        downlink: 90 + Math.random() * 10,
        latency: 250 + Math.random() * 100
      }));
    };

    setLiveData({
      telemetry: generateTelemetryData(),
      power: generatePowerData(),
      temperature: generateTemperatureData(),
      communication: generateCommunicationData()
    });

    const interval = setInterval(() => {
      setLiveData({
        telemetry: generateTelemetryData(),
        power: generatePowerData(),
        temperature: generateTemperatureData(),
        communication: generateCommunicationData()
      });

      // Update system status
      setSystemStatus(prev => ({
        power: Math.max(85, Math.min(100, prev?.power + (Math.random() - 0.5) * 2)),
        communication: Math.max(80, Math.min(100, prev?.communication + (Math.random() - 0.5) * 3)),
        thermal: Math.max(70, Math.min(95, prev?.thermal + (Math.random() - 0.5) * 4)),
        attitude: Math.max(90, Math.min(100, prev?.attitude + (Math.random() - 0.5) * 1)),
        payload: Math.max(85, Math.min(98, prev?.payload + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartTabs = [
    { id: 'telemetry', name: 'Telemetry', icon: 'Activity' },
    { id: 'power', name: 'Power Systems', icon: 'Battery' },
    { id: 'temperature', name: 'Thermal', icon: 'Thermometer' },
    { id: 'communication', name: 'Comms', icon: 'Radio' }
  ];

  const statusColors = ['#10B981', '#F59E0B', '#EF4444'];
  const systemStatusData = Object.entries(systemStatus)?.map(([key, value]) => ({
    name: key?.charAt(0)?.toUpperCase() + key?.slice(1),
    value: value,
    fill: value > 90 ? statusColors?.[0] : value > 80 ? statusColors?.[1] : statusColors?.[2]
  }));

  const renderChart = () => {
    switch (activeChart) {
      case 'telemetry':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={liveData?.telemetry}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="altitude" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Altitude (km)"
              />
              <Line 
                type="monotone" 
                dataKey="velocity" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                name="Velocity (km/s)"
              />
              <Line 
                type="monotone" 
                dataKey="signal" 
                stroke="var(--color-success)" 
                strokeWidth={2}
                name="Signal Strength (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'power':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={liveData?.power}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="solar" 
                stackId="1"
                stroke="var(--color-accent)" 
                fill="var(--color-accent)"
                fillOpacity={0.3}
                name="Solar Power (W)"
              />
              <Area 
                type="monotone" 
                dataKey="battery" 
                stackId="2"
                stroke="var(--color-success)" 
                fill="var(--color-success)"
                fillOpacity={0.3}
                name="Battery Level (%)"
              />
              <Area 
                type="monotone" 
                dataKey="consumption" 
                stackId="3"
                stroke="var(--color-error)" 
                fill="var(--color-error)"
                fillOpacity={0.3}
                name="Power Consumption (W)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'temperature':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={liveData?.temperature}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="internal" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                name="Internal Temp (°C)"
              />
              <Line 
                type="monotone" 
                dataKey="external" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                name="External Temp (°C)"
              />
              <Line 
                type="monotone" 
                dataKey="battery" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                name="Battery Temp (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'communication':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={liveData?.communication}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="station" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="uplink" 
                fill="var(--color-primary)"
                name="Uplink Quality (%)"
              />
              <Bar 
                dataKey="downlink" 
                fill="var(--color-success)"
                name="Downlink Quality (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="BarChart3" size={24} className="text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wider">
              Live Data Stream
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real-Time Mission Analytics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor live satellite telemetry, system performance, and mission-critical data streams in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* System Status Overview */}
          <div className="lg:col-span-1">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border h-fit">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Shield" size={20} className="text-success" />
                <h3 className="text-lg font-semibold text-foreground">System Status</h3>
              </div>

              <div className="space-y-4">
                {Object.entries(systemStatus)?.map(([system, value]) => (
                  <div key={system} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground capitalize">
                        {system}
                      </span>
                      <span className={`text-sm font-mono font-medium ${
                        value > 90 ? 'text-success' : value > 80 ? 'text-warning' : 'text-error'
                      }`}>
                        {value?.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          value > 90 ? 'bg-success' : value > 80 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="w-full h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={systemStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {systemStatusData?.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry?.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
              {/* Chart Tabs */}
              <div className="border-b border-border p-6">
                <div className="flex flex-wrap gap-2">
                  {chartTabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveChart(tab?.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeChart === tab?.id
                          ? 'bg-primary/20 text-primary border border-primary/30 mission-glow' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    {chartTabs?.find(tab => tab?.id === activeChart)?.name} Data
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-success">LIVE</span>
                  </div>
                </div>

                <div className="data-stream">
                  {renderChart()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDataVisualization;