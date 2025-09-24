import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventDetailsSection = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const eventDetails = {
    title: "QSAT-1 CubeSat Launch Mission",
    date: "December 15, 2024",
    time: "14:30 UTC (09:30 EST)",
    location: "Wallops Flight Facility, Virginia",
    duration: "6 hours (including pre and post-launch activities)",
    capacity: "5,000 virtual participants",
    status: "Registration Open"
  };

  const tabs = [
    {
      id: 'overview',
      name: 'Mission Overview',
      icon: 'Rocket'
    },
    {
      id: 'schedule',
      name: 'Event Schedule',
      icon: 'Calendar'
    },
    {
      id: 'technical',
      name: 'Technical Specs',
      icon: 'Settings'
    },
    {
      id: 'team',
      name: 'Mission Team',
      icon: 'Users'
    }
  ];

  const scheduleItems = [
    {
      time: "08:00 UTC",
      title: "Pre-Launch Briefing",
      description: "Mission overview and safety protocols",
      status: "upcoming"
    },
    {
      time: "12:00 UTC",
      title: "Final Systems Check",
      description: "Last-minute satellite health verification",
      status: "upcoming"
    },
    {
      time: "14:30 UTC",
      title: "Launch Window Opens",
      description: "QSAT-1 deployment sequence begins",
      status: "critical"
    },
    {
      time: "15:45 UTC",
      title: "First Signal Acquisition",
      description: "Initial contact with deployed satellite",
      status: "upcoming"
    },
    {
      time: "18:00 UTC",
      title: "Mission Debrief",
      description: "Analysis and Q&A session",
      status: "upcoming"
    }
  ];

  const technicalSpecs = [
    {
      category: "Satellite Specifications",
      specs: [
        { label: "Form Factor", value: "3U CubeSat (10×10×30 cm)" },
        { label: "Mass", value: "4.2 kg" },
        { label: "Power System", value: "Solar panels + Li-ion battery" },
        { label: "Communication", value: "UHF/VHF transceiver" }
      ]
    },
    {
      category: "Mission Parameters",
      specs: [
        { label: "Orbit Altitude", value: "400-450 km" },
        { label: "Inclination", value: "51.6°" },
        { label: "Mission Duration", value: "12 months minimum" },
        { label: "Ground Stations", value: "5 worldwide" }
      ]
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Mission Director",
      university: "MIT",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      expertise: "Satellite Systems Engineering"
    },
    {
      name: "Marcus Rodriguez",
      role: "Flight Operations Lead",
      university: "Stanford University",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      expertise: "Mission Control Operations"
    },
    {
      name: "Emily Watson",
      role: "Communications Engineer",
      university: "Georgia Tech",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      expertise: "RF Systems & Antennas"
    },
    {
      name: "David Kim",
      role: "Payload Specialist",
      university: "Caltech",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      expertise: "Scientific Instruments"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground">About This Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  QSAT-1 represents the culmination of two years of collaborative effort by students from leading universities. This 3U CubeSat will demonstrate advanced attitude control systems, test new solar panel technologies, and conduct atmospheric research from low Earth orbit.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The mission serves as both a technological demonstration and an educational platform, providing hands-on experience in satellite operations, mission planning, and space systems engineering for the next generation of aerospace professionals.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Target" size={16} className="text-primary" />
                      <span className="text-sm font-mono text-primary">PRIMARY MISSION</span>
                    </div>
                    <p className="text-sm text-foreground">Attitude Control System Testing</p>
                  </div>
                  
                  <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Zap" size={16} className="text-secondary" />
                      <span className="text-sm font-mono text-secondary">SECONDARY MISSION</span>
                    </div>
                    <p className="text-sm text-foreground">Solar Panel Efficiency Study</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Image
                  src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop"
                  alt="QSAT-1 CubeSat"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3">Mission Objectives</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Deploy and establish communication link</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Test attitude determination and control</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Collect atmospheric density data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Demonstrate educational outreach capabilities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'schedule':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Launch Day Timeline</h3>
            <div className="space-y-4">
              {scheduleItems?.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg border ${
                    item?.status === 'critical' ?'bg-accent/10 border-accent/30' :'bg-card/30 border-border'
                  }`}
                >
                  <div className={`flex-shrink-0 w-20 text-center ${
                    item?.status === 'critical' ? 'text-accent' : 'text-muted-foreground'
                  }`}>
                    <div className="text-lg font-mono font-bold">{item?.time}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      item?.status === 'critical' ? 'text-accent' : 'text-foreground'
                    }`}>
                      {item?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{item?.description}</p>
                  </div>
                  {item?.status === 'critical' && (
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'technical':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground">Technical Specifications</h3>
            <div className="grid lg:grid-cols-2 gap-8">
              {technicalSpecs?.map((category, index) => (
                <div key={index} className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4">{category?.category}</h4>
                  <div className="space-y-3">
                    {category?.specs?.map((spec, specIndex) => (
                      <div key={specIndex} className="flex justify-between items-center py-2 border-b border-border/30 last:border-b-0">
                        <span className="text-sm text-muted-foreground">{spec?.label}</span>
                        <span className="text-sm font-mono text-foreground">{spec?.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'team':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">Mission Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers?.map((member, index) => (
                <div key={index} className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
                  <div className="relative mb-4">
                    <Image
                      src={member?.image}
                      alt={member?.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-success border-2 border-card rounded-full"></div>
                  </div>
                  <h4 className="font-semibold text-foreground">{member?.name}</h4>
                  <p className="text-sm text-primary font-medium">{member?.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{member?.university}</p>
                  <p className="text-xs text-muted-foreground mt-2">{member?.expertise}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Calendar" size={20} className="text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wide">Event Details</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mission Information
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about the QSAT-1 launch event, from technical specifications to team introductions.
          </p>
        </div>

        {/* Event Quick Info */}
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Date</div>
              <div className="font-semibold text-foreground">{eventDetails?.date}</div>
            </div>
            <div className="text-center">
              <Icon name="Clock" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Time</div>
              <div className="font-semibold text-foreground">{eventDetails?.time}</div>
            </div>
            <div className="text-center">
              <Icon name="MapPin" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="font-semibold text-foreground">{eventDetails?.location}</div>
            </div>
            <div className="text-center">
              <Icon name="Users" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-sm text-muted-foreground">Capacity</div>
              <div className="font-semibold text-foreground">{eventDetails?.capacity}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground mission-glow'
                  : 'bg-card/30 text-muted-foreground hover:text-foreground hover:bg-card/50'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border border-primary/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Join the Mission?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Secure your spot for this historic launch event. Registration includes access to live streams, technical documentation, and post-mission analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="countdown-pulse"
                iconName="UserPlus"
                iconPosition="left"
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
              >
                Download Mission Brief
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;