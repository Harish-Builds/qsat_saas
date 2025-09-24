import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30
  });

  const slides = [
    {
      id: 1,
      title: "QSAT Mission Control",
      subtitle: "Live Satellite Operations Center",
      description: "Monitor real-time telemetry, track orbital parameters, and coordinate mission operations from our advanced control center.",
      videoId: "dQw4w9WgXcQ",
      type: "live"
    },
    {
      id: 2,
      title: "Student Innovation Showcase",
      subtitle: "Next Generation Space Technology",
      description: "Witness groundbreaking satellite technology developed by students, pushing the boundaries of accessible space exploration.",
      videoId: "jNQXAC9IVRw",
      type: "promo"
    },
    {
      id: 3,
      title: "Mission Timeline",
      subtitle: "Critical Phase Operations",
      description: "Follow our comprehensive mission timeline from launch preparation through orbital deployment and data collection phases.",
      videoId: "9bZkp7q19f0",
      type: "timeline"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let newSeconds = prev?.seconds - 1;
        let newMinutes = prev?.minutes;
        let newHours = prev?.hours;
        let newDays = prev?.days;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }
        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }
        if (newHours < 0) {
          newHours = 23;
          newDays -= 1;
        }

        return {
          days: Math.max(0, newDays),
          hours: Math.max(0, newHours),
          minutes: Math.max(0, newMinutes),
          seconds: Math.max(0, newSeconds)
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides?.length);
    }, 8000);
    return () => clearInterval(slideTimer);
  }, [slides?.length]);

  const currentSlideData = slides?.[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-card to-background overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-secondary rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-success rounded-full animate-pulse delay-3000"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-primary uppercase tracking-wider">
                  Mission Status: Active
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                {currentSlideData?.title}
              </h1>
              
              <h2 className="text-xl md:text-2xl text-accent font-medium">
                {currentSlideData?.subtitle}
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {currentSlideData?.description}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-muted/20 backdrop-blur-sm rounded-2xl p-6 border border-border">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Timer" size={20} className="text-accent" />
                <span className="text-sm font-mono text-accent uppercase tracking-wider">
                  Next Mission Event
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Days', value: countdown?.days },
                  { label: 'Hours', value: countdown?.hours },
                  { label: 'Minutes', value: countdown?.minutes },
                  { label: 'Seconds', value: countdown?.seconds }
                ]?.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-primary/20 rounded-lg p-3 mb-2 countdown-pulse">
                      <span className="text-2xl md:text-3xl font-mono font-bold text-primary">
                        {item?.value?.toString()?.padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item?.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="default" 
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="mission-glow"
              >
                Watch Live Stream
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                iconName="Download"
                iconPosition="left"
              >
                Mission Reports
              </Button>
            </div>
          </div>

          {/* Video Section */}
          <div className="space-y-6">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted/20 border border-border">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentSlideData?.videoId}?autoplay=1&mute=1&loop=1&playlist=${currentSlideData?.videoId}`}
                title={currentSlideData?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              
              {/* Video Overlay */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-error bg-background/80 px-2 py-1 rounded">
                  {currentSlideData?.type?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-2">
              {slides?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary mission-glow' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            {/* Mission Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Altitude', value: '408.2 km', icon: 'TrendingUp' },
                { label: 'Velocity', value: '7.66 km/s', icon: 'Zap' },
                { label: 'Orbits', value: '15,847', icon: 'RotateCcw' }
              ]?.map((stat, index) => (
                <div key={index} className="bg-muted/20 rounded-lg p-4 text-center border border-border">
                  <Icon name={stat?.icon} size={20} className="text-accent mx-auto mb-2" />
                  <div className="text-lg font-mono font-bold text-foreground">
                    {stat?.value}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {stat?.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;