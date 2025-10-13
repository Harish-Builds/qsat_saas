import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MissionStatusBar from './components/MissionStatusBar';
import HeroSection from './components/HeroSection';
import LiveDataVisualization from './components/LiveDataVisualization';
import MissionOverview from './components/MissionOverview';
import Footer from './components/Footer';

const MissionControlDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mission-glow orbital-rotate">
            <div className="w-8 h-8 bg-primary-foreground rounded-full"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Initializing Mission Control</h2>
            <p className="text-muted-foreground font-mono">Establishing satellite connections...</p>
          </div>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mission Control Dashboard - QSAT Event Hub</title>
        <meta 
          name="description" 
          content="Real-time satellite mission control center with live telemetry, countdown timers, and interactive data visualization. Monitor QSAT missions and space operations." 
        />
        <meta name="keywords" content="satellite mission control, space technology, QSAT, real-time telemetry, space education" />
        <meta property="og:title" content="Mission Control Dashboard - QSAT Event Hub" />
        <meta property="og:description" content="Monitor live satellite operations and mission data in real-time" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/mission-control-dashboard" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />
        
        {/* Sidebar */}
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <main className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
        } pt-16`}>
          {/* Mission Status Bar */}
          <MissionStatusBar />
          
          {/* Hero Section */}
          {/* <HeroSection /> */}
          
          {/* Live Data Visualization */}
          {/* <LiveDataVisualization /> */}
          
          {/* Mission Overview */}
          <MissionOverview />
          
          {/* Footer */}
          {/* <Footer /> */}
        </main>
      </div>
    </>
  );
};

export default MissionControlDashboard;