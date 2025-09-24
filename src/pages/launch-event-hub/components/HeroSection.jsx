import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const slides = [
    {
      id: 1,
      title: "QSAT-1 Launch Event",
      subtitle: "Student-Built Satellite Mission",
      description: "Join us for the historic launch of QSAT-1, a CubeSat designed and built entirely by students. Experience real-time mission control and be part of space exploration history.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1200&h=600&fit=crop",
      videoId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "Live Mission Control",
      subtitle: "Real-Time Space Operations",
      description: "Watch our mission unfold in real-time with live telemetry data, ground station communications, and expert commentary from our student mission control team.",
      image: "https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?w=1200&h=600&fit=crop",
      videoId: "jNQXAC9IVRw"
    },
    {
      id: 3,
      title: "Educational Experience",
      subtitle: "Learn Space Technology",
      description: "Discover how satellites work, explore our build process, and learn about orbital mechanics through interactive demonstrations and expert presentations.",
      image: "https://images.pixabay.com/photo/2011/12/14/12/21/orion-nebula-11107_1280.jpg?w=1200&h=600&fit=crop",
      videoId: "M7lc1UVf-VE"
    }
  ];

  // Launch countdown - Set to December 15, 2024, 14:30 UTC
  useEffect(() => {
    const targetDate = new Date('2024-12-15T14:30:00Z')?.getTime();
    
    const timer = setInterval(() => {
      const now = new Date()?.getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides?.length);
    }, 8000);

    return () => clearInterval(slideTimer);
  }, [slides?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides?.length) % slides?.length);
  };

  const currentSlideData = slides?.[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-slate-900 to-slate-800 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData?.image}
          alt={currentSlideData?.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent"></div>
      </div>
      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      <div className="relative z-10 container mx-auto px-6 py-20 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content Section */}
          <div className="space-y-8">
            {/* Mission Status Badge */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-primary">MISSION ACTIVE</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/20 border border-success/30 rounded-full">
                <Icon name="Satellite" size={16} className="text-success orbital-rotate" />
                <span className="text-sm font-mono text-success">T-MINUS COUNTING</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  {currentSlideData?.title}
                </h1>
                <p className="text-xl lg:text-2xl text-primary font-semibold">
                  {currentSlideData?.subtitle}
                </p>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {currentSlideData?.description}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Clock" size={20} className="text-accent" />
                <span className="text-sm font-mono text-accent uppercase tracking-wide">
                  Launch Countdown
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft)?.map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-primary/20 border border-primary/30 rounded-lg p-3 countdown-pulse">
                      <div className="text-2xl lg:text-3xl font-mono font-bold text-primary">
                        {value?.toString()?.padStart(2, '0')}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">
                      {unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                className="countdown-pulse"
                iconName="UserPlus"
                iconPosition="left"
              >
                Register for Event
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
              >
                Watch Live Stream
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                iconName="Download"
                iconPosition="left"
              >
                Mission Brief
              </Button>
            </div>
          </div>

          {/* Video/Media Section */}
          <div className="space-y-6">
            {/* Main Video Player */}
            <div className="relative bg-card/30 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentSlideData?.videoId}?autoplay=0&mute=1&controls=1&rel=0`}
                  title={currentSlideData?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              
              {/* Video Controls Overlay */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm"
                  iconName="Maximize"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm"
                  iconName="Share"
                />
              </div>
            </div>

            {/* Slide Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={prevSlide}
                iconName="ChevronLeft"
                className="w-12 h-12"
              />
              
              <div className="flex space-x-2">
                {slides?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-primary scale-125' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={nextSlide}
                iconName="ChevronRight"
                className="w-12 h-12"
              />
            </div>

            {/* Live Status Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-success">LIVE</span>
                </div>
                <div className="text-xs text-muted-foreground">Mission Control</div>
                <div className="text-lg font-mono text-foreground">1,247 viewers</div>
              </div>
              
              <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={12} className="text-primary" />
                  <span className="text-sm font-mono text-primary">REGISTERED</span>
                </div>
                <div className="text-xs text-muted-foreground">Participants</div>
                <div className="text-lg font-mono text-foreground">3,892</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-xs text-muted-foreground font-mono">SCROLL TO EXPLORE</span>
          <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;