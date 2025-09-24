import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataVisualizationPanel = ({ data }) => {
  const [activeView, setActiveView] = useState('overview');

  const missionStatusData = [
    { name: 'Completed', value: 12, color: '#10B981' },
    { name: 'Active', value: 3, color: '#1E40AF' },
    { name: 'Scheduled', value: 5, color: '#F59E0B' },
    { name: 'Cancelled', value: 2, color: '#EF4444' }
  ];

  const monthlyReportsData = [
    { month: 'Jan', reports: 45, downloads: 1250 },
    { month: 'Feb', reports: 52, downloads: 1480 },
    { month: 'Mar', reports: 38, downloads: 1120 },
    { month: 'Apr', reports: 61, downloads: 1680 },
    { month: 'May', reports: 49, downloads: 1390 },
    { month: 'Jun', reports: 67, downloads: 1850 }
  ];

  const reportTypeData = [
    { type: 'Technical', count: 89, percentage: 35 },
    { type: 'Performance', count: 67, percentage: 26 },
    { type: 'Telemetry', count: 54, percentage: 21 },
    { type: 'Analysis', count: 45, percentage: 18 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-mono text-popover-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm font-mono" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const views = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'missions', name: 'Missions', icon: 'PieChart' },
    { id: 'reports', name: 'Reports', icon: 'TrendingUp' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">Data Analytics</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-success">REAL-TIME</span>
          </div>
        </div>

        <div className="flex space-x-1">
          {views?.map((view) => (
            <Button
              key={view?.id}
              variant={activeView === view?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView(view?.id)}
              iconName={view?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {view?.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-4">Monthly Report Generation</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReportsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="month" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                      fontFamily="JetBrains Mono"
                    />
                    <YAxis 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                      fontFamily="JetBrains Mono"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="reports" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-card-foreground mb-4">Report Type Distribution</h4>
              <div className="space-y-3">
                {reportTypeData?.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm text-card-foreground">{item?.type}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${item?.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground w-12 text-right">
                        {item?.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'missions' && (
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={missionStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {missionStatusData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-card-foreground">Mission Status Breakdown</h4>
              <div className="space-y-3">
                {missionStatusData?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item?.color }}
                    ></div>
                    <span className="text-sm text-card-foreground flex-1">{item?.name}</span>
                    <span className="text-sm font-mono text-muted-foreground">
                      {item?.value} missions
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'reports' && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-4">Download Trends</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReportsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    fontFamily="JetBrains Mono"
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    fontFamily="JetBrains Mono"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="downloads" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataVisualizationPanel;