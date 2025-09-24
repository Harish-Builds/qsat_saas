import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MissionOverviewCard from './components/MissionOverviewCard';
import PerformanceChart from './components/PerformanceChart';
import ReportCard from './components/ReportCard';
import TelemetryTable from './components/TelemetryTable';
import FilterPanel from './components/FilterPanel';
import DataVisualizationPanel from './components/DataVisualizationPanel';

const FlightDataCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMission, setSelectedMission] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for missions
  const missions = [
    {
      id: "QSAT-001",
      name: "QSAT Pioneer Mission",
      status: "Completed",
      launchDate: "2024-03-15",
      duration: "45 days",
      altitude: "408 km",
      orbits: "720",
      description: `First successful deployment of student-built CubeSat with advanced imaging capabilities.\nMission achieved all primary objectives including Earth observation and communication relay.`,
      tags: ["CubeSat", "Earth Observation", "Communication", "Student Project"]
    },
    {
      id: "QSAT-002",
      name: "QSAT Explorer Mission",
      status: "Active",
      launchDate: "2024-08-22",
      duration: "90 days",
      altitude: "412 km",
      orbits: "156",
      description: `Advanced atmospheric research mission with enhanced sensor payload.\nCurrently collecting valuable data on atmospheric composition and weather patterns.`,
      tags: ["Atmospheric Research", "Weather Monitoring", "Advanced Sensors"]
    },
    {
      id: "QSAT-003",
      name: "QSAT Innovation Mission",
      status: "Scheduled",
      launchDate: "2024-12-10",
      duration: "60 days",
      altitude: "415 km",
      orbits: "0",
      description: `Next-generation satellite featuring AI-powered autonomous systems.\nWill demonstrate advanced machine learning capabilities in space environment.`,
      tags: ["AI/ML", "Autonomous Systems", "Innovation", "Future Tech"]
    }
  ];

  // Mock data for reports
  const reports = [
    {
      id: "RPT-001",
      title: "QSAT Pioneer Mission - Complete Flight Analysis",
      type: "technical",
      date: "2024-09-20",
      pages: 45,
      downloads: 1247,
      size: "12.3 MB",
      format: "PDF",
      description: `Comprehensive technical analysis of QSAT Pioneer Mission including orbital mechanics,\nsystem performance, and mission outcome evaluation with detailed telemetry data.`,
      tags: ["Flight Analysis", "Orbital Mechanics", "System Performance"],
      missionId: "QSAT-001"
    },
    {
      id: "RPT-002",
      title: "Atmospheric Data Collection Report - Q2 2024",
      type: "performance",
      date: "2024-09-18",
      pages: 32,
      downloads: 892,
      size: "8.7 MB",
      format: "PDF",
      description: `Detailed performance metrics and atmospheric data collected during Q2 2024.\nIncludes sensor calibration data and environmental measurement analysis.`,
      tags: ["Atmospheric Data", "Performance Metrics", "Q2 2024"],
      missionId: "QSAT-002"
    },
    {
      id: "RPT-003",
      title: "Real-time Telemetry Analysis - September 2024",
      type: "telemetry",
      date: "2024-09-15",
      pages: 28,
      downloads: 654,
      size: "6.2 MB",
      format: "PDF",
      description: `Live telemetry data analysis covering satellite health monitoring,\ncommunication performance, and system status reports for September 2024.`,
      tags: ["Telemetry", "Health Monitoring", "September 2024"],
      missionId: "QSAT-002"
    },
    {
      id: "RPT-004",
      title: "Mission Success Metrics and KPI Analysis",
      type: "analysis",
      date: "2024-09-12",
      pages: 38,
      downloads: 1156,
      size: "10.1 MB",
      format: "PDF",
      description: `Statistical analysis of mission success rates, key performance indicators,\nand comparative study of QSAT missions with industry benchmarks.`,
      tags: ["Success Metrics", "KPI Analysis", "Statistical Analysis"],
      missionId: "QSAT-001"
    },
    {
      id: "RPT-005",
      title: "Satellite Communication Protocol Documentation",
      type: "technical",
      date: "2024-09-10",
      pages: 52,
      downloads: 789,
      size: "15.4 MB",
      format: "PDF",
      description: `Technical documentation of communication protocols used in QSAT missions.\nIncludes frequency allocation, data transmission formats, and error correction methods.`,
      tags: ["Communication", "Protocols", "Technical Documentation"],
      missionId: "QSAT-002"
    },
    {
      id: "RPT-006",
      title: "Power System Performance Analysis",
      type: "performance",
      date: "2024-09-08",
      pages: 29,
      downloads: 567,
      size: "7.8 MB",
      format: "PDF",
      description: `Comprehensive analysis of satellite power systems including solar panel efficiency,\nbattery performance, and power consumption optimization strategies.`,
      tags: ["Power Systems", "Solar Panels", "Battery Performance"],
      missionId: "QSAT-001"
    }
  ];

  // Mock data for performance charts
  const altitudeData = [
    { time: '00:00', altitude: 408.2 },
    { time: '04:00', altitude: 408.5 },
    { time: '08:00', altitude: 408.1 },
    { time: '12:00', altitude: 408.7 },
    { time: '16:00', altitude: 408.3 },
    { time: '20:00', altitude: 408.9 },
    { time: '24:00', altitude: 408.4 }
  ];

  const velocityData = [
    { time: '00:00', velocity: 7.66 },
    { time: '04:00', velocity: 7.68 },
    { time: '08:00', velocity: 7.65 },
    { time: '12:00', velocity: 7.69 },
    { time: '16:00', velocity: 7.67 },
    { time: '20:00', velocity: 7.71 },
    { time: '24:00', velocity: 7.66 }
  ];

  const temperatureData = [
    { time: '00:00', temperature: -15.2 },
    { time: '04:00', temperature: -18.7 },
    { time: '08:00', temperature: -12.3 },
    { time: '12:00', temperature: -8.9 },
    { time: '16:00', temperature: -14.1 },
    { time: '20:00', temperature: -19.5 },
    { time: '24:00', temperature: -16.8 }
  ];

  // Mock telemetry data
  const telemetryData = [
    { timestamp: '2024-09-24 11:52:45', parameter: 'Battery Voltage', value: '7.4', unit: 'V', status: 'Nominal' },
    { timestamp: '2024-09-24 11:52:40', parameter: 'Solar Panel Current', value: '2.1', unit: 'A', status: 'Nominal' },
    { timestamp: '2024-09-24 11:52:35', parameter: 'Internal Temperature', value: '-12.3', unit: '°C', status: 'Nominal' },
    { timestamp: '2024-09-24 11:52:30', parameter: 'Signal Strength', value: '-85', unit: 'dBm', status: 'Warning' },
    { timestamp: '2024-09-24 11:52:25', parameter: 'Attitude X', value: '0.02', unit: 'deg', status: 'Nominal' },
    { timestamp: '2024-09-24 11:52:20', parameter: 'Attitude Y', value: '-0.15', unit: 'deg', status: 'Nominal' },
    { timestamp: '2024-09-24 11:52:15', parameter: 'Attitude Z', value: '0.08', unit: 'deg', status: 'Nominal' },
    { timestamp: '2024-09-24 11:52:10', parameter: 'Memory Usage', value: '67', unit: '%', status: 'Nominal' },
    { timestamp: '2024-09-24 11:52:05', parameter: 'CPU Load', value: '23', unit: '%', status: 'Nominal' },
    { timestamp: '2024-09-24 11:52:00', parameter: 'Uplink Quality', value: '98.5', unit: '%', status: 'Nominal' }
  ];

  const reportTypes = ['technical', 'performance', 'telemetry', 'analysis'];

  // Filter reports based on search and filters
  const filteredReports = reports?.filter(report => {
    const matchesSearch = !searchTerm || 
      report?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      report?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesMission = !selectedMission || report?.missionId === selectedMission;
    const matchesType = !selectedType || report?.type === selectedType;
    
    const matchesDateRange = (!dateRange?.start || report?.date >= dateRange?.start) &&
                            (!dateRange?.end || report?.date <= dateRange?.end);
    
    return matchesSearch && matchesMission && matchesType && matchesDateRange;
  });

  const handleDownload = async (report) => {
    // Simulate download process
    console.log(`Downloading report: ${report?.title}`);
    // In a real application, this would trigger an actual file download
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedMission('');
    setSelectedType('');
    setDateRange({ start: '', end: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-72'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Flight Data Center</h1>
              <p className="text-muted-foreground">
                Technical reports, flight performance analytics, and mission documentation
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-success/20 border border-success/30 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-success">DATA STREAMING</span>
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                UTC {currentTime?.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' })}
              </div>
            </div>
          </div>

          {/* Mission Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {missions?.map((mission) => (
              <MissionOverviewCard key={mission?.id} mission={mission} />
            ))}
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <PerformanceChart
              title="Altitude Tracking"
              data={altitudeData}
              dataKey="altitude"
              color="#1E40AF"
              unit=" km"
            />
            <PerformanceChart
              title="Orbital Velocity"
              data={velocityData}
              dataKey="velocity"
              color="#7C3AED"
              unit=" km/s"
            />
            <PerformanceChart
              title="Temperature Monitor"
              data={temperatureData}
              dataKey="temperature"
              color="#F59E0B"
              type="area"
              unit="°C"
            />
          </div>

          {/* Data Visualization Panel */}
          <DataVisualizationPanel data={{}} />

          {/* Filter Panel */}
          <FilterPanel
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedMission={selectedMission}
            onMissionChange={setSelectedMission}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onClearFilters={handleClearFilters}
            missions={missions}
            reportTypes={reportTypes}
          />

          {/* Reports Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={24} className="text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Mission Reports</h2>
                <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                  {filteredReports?.length} reports
                </span>
              </div>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Bulk Download
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReports?.map((report) => (
                <ReportCard
                  key={report?.id}
                  report={report}
                  onDownload={handleDownload}
                />
              ))}
            </div>

            {filteredReports?.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Reports Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find relevant reports.
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Live Telemetry Table */}
          <TelemetryTable
            data={telemetryData}
            title="Live Telemetry Data"
          />

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Zap" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">Quick Actions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
              >
                Export All Data
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh Telemetry
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Share"
                iconPosition="left"
              >
                Share Reports
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Settings"
                iconPosition="left"
              >
                Configure Alerts
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlightDataCenter;