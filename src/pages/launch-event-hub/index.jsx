import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import EventDetailsSection from './components/EventDetailsSection';
import InteractiveTimeline from './components/InteractiveTimeline';
import LiveStreamSection from './components/LiveStreamSection';
import RegistrationSection from './components/RegistrationSection';

const LaunchEventHub = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Launch Event Hub - QSAT Event Hub</title>
        <meta name="description" content="Join the historic QSAT-1 CubeSat launch event. Watch live streams, register for participation, and be part of student-led space exploration." />
        <meta name="keywords" content="QSAT-1, CubeSat launch, student satellite, space mission, live stream, mission control" />
        <meta property="og:title" content="QSAT-1 Launch Event Hub - Live Mission Control" />
        <meta property="og:description" content="Experience the excitement of student-built satellite deployment with real-time mission tracking and educational content." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/launch-event-hub" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section with Countdown and Live Stream */}
          <HeroSection />
          
          {/* Event Details with Tabs */}
          <EventDetailsSection />
          
          {/* Interactive Mission Timeline */}
          <InteractiveTimeline />
          
          {/* Live Stream Section */}
          <LiveStreamSection />
          
          {/* Registration and Feedback Forms */}
          <RegistrationSection />
        </main>

        {/* Footer */}
        <footer className="bg-card/50 backdrop-blur-sm border-t border-border py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">Q</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">QSAT Event Hub</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Democratizing space technology through student innovation and hands-on learning.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/mission-control-dashboard" className="hover:text-foreground transition-colors">Mission Control</a></li>
                  <li><a href="/flight-data-center" className="hover:text-foreground transition-colors">Flight Data</a></li>
                  <li><a href="/recovery-operations" className="hover:text-foreground transition-colors">Recovery Ops</a></li>
                  <li><a href="/student-innovation-showcase" className="hover:text-foreground transition-colors">Innovation Showcase</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Mission Brief</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Technical Docs</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Educational Materials</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Press Kit</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Newsletter</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Social Media</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} QSAT Event Hub. All rights reserved. | 
                <span className="ml-2">Making space technology accessible to everyone.</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LaunchEventHub;