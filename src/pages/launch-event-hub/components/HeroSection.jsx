import React, { useState, useEffect, useRef } from 'react';
import { Download, Play, Pause, Trash2, Database, Activity, Clock, ChevronLeft, ChevronRight, Users, Satellite, ChevronDown, Maximize, Share, UserPlus } from 'lucide-react';

const HeroSectionWithMonitor = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dataLog, setDataLog] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [dataCount, setDataCount] = useState(0);
  const monitorRef = useRef(null);

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

  const missionDataTemplates = [
    { type: 'TELEMETRY', data: () => ({ 
      altitude: (400 + Math.random() * 50).toFixed(2),
      velocity: (7.5 + Math.random() * 0.5).toFixed(2),
      temperature: (-20 + Math.random() * 10).toFixed(1)
    })},
    { type: 'SYSTEM_STATUS', data: () => ({ 
      battery: (85 + Math.random() * 15).toFixed(1),
      solar_panels: Math.random() > 0.5 ? 'ACTIVE' : 'CHARGING',
      communication: 'NOMINAL'
    })},
    { type: 'ATTITUDE', data: () => ({ 
      roll: (Math.random() * 360).toFixed(2),
      pitch: (Math.random() * 360).toFixed(2),
      yaw: (Math.random() * 360).toFixed(2)
    })},
    { type: 'GPS_POSITION', data: () => ({ 
      latitude: (Math.random() * 180 - 90).toFixed(6),
      longitude: (Math.random() * 360 - 180).toFixed(6),
      accuracy: (Math.random() * 5).toFixed(2)
    })},
    { type: 'PAYLOAD_DATA', data: () => ({ 
      sensor_1: (Math.random() * 100).toFixed(2),
      sensor_2: (Math.random() * 100).toFixed(2),
      status: 'COLLECTING'
    })},
    { type: 'GROUND_STATION', data: () => ({ 
      signal_strength: (-80 + Math.random() * 20).toFixed(1),
      data_rate: (9600 + Math.random() * 400).toFixed(0),
      station_id: `GS_${Math.floor(Math.random() * 5) + 1}`
    })}
  ];

  // Generate real-time data
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      const template = missionDataTemplates[Math.floor(Math.random() * missionDataTemplates.length)];
      const timestamp = new Date();
      const dataValues = template.data();
      
      const newEntry = {
        id: Date.now(),
        timestamp: timestamp.toISOString(),
        timeFormatted: timestamp.toLocaleTimeString('en-US', { hour12: false }),
        type: template.type,
        ...dataValues,
        raw: JSON.stringify(dataValues)
      };

      setDataLog(prev => [...prev, newEntry]);
      setDataCount(prev => prev + 1);

      if (monitorRef.current) {
        monitorRef.current.scrollTop = monitorRef.current.scrollHeight;
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  // Auto-advance slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(slideTimer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const exportToCSV = () => {
    if (dataLog.length === 0) {
      alert('No data to export');
      return;
    }

    const allKeys = new Set();
    dataLog.forEach(entry => {
      Object.keys(entry).forEach(key => {
        if (key !== 'id' && key !== 'raw') allKeys.add(key);
      });
    });

    const headers = Array.from(allKeys);
    const csvContent = [
      headers.join(','),
      ...dataLog.map(entry => 
        headers.map(header => {
          const value = entry[header] || '';
          return typeof value === 'string' && (value.includes(',') || value.includes('"'))
            ? `"${value.replace(/"/g, '""')}"`
            : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `qsat_mission_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearLog = () => {
    if (window.confirm('Clear all logged data?')) {
      setDataLog([]);
      setDataCount(0);
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'TELEMETRY': 'text-cyan-400',
      'SYSTEM_STATUS': 'text-green-400',
      'ATTITUDE': 'text-purple-400',
      'GPS_POSITION': 'text-blue-400',
      'PAYLOAD_DATA': 'text-yellow-400',
      'GROUND_STATION': 'text-orange-400'
    };
    return colors[type] || 'text-gray-400';
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentSlideData.image}
          alt={currentSlideData.title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent"></div>
      </div>

      {/* Animated Stars Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-blue-400">MISSION ACTIVE</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                <Satellite size={16} className="text-green-400" />
                <span className="text-sm font-mono text-green-400">T-MINUS COUNTING</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  {currentSlideData.title}
                </h1>
                <p className="text-xl lg:text-2xl text-blue-400 font-semibold">
                  {currentSlideData.subtitle}
                </p>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                {currentSlideData.description}
              </p>
            </div>

            {/* Serial Monitor */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-900/80">
                <div className="flex items-center space-x-3">
                  <Activity size={20} className="text-cyan-400" />
                  <span className="text-sm font-mono text-cyan-400 uppercase tracking-wide">
                    Live Telemetry Stream
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {isMonitoring ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-green-400">LIVE</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-xs font-mono text-red-400">PAUSED</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Monitor Display - Fixed Height with Scroll */}
              <div className="relative h-[280px] bg-black">
                <div
                  ref={monitorRef}
                  className="absolute inset-0 overflow-y-auto p-4 font-mono text-xs scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#475569 transparent'
                  }}
                >
                  {dataLog.length === 0 ? (
                    <div className="text-gray-600 text-center py-12">
                      <Activity className="w-8 h-8 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Waiting for mission data...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {dataLog.map((entry, index) => (
                        <div key={entry.id} className="hover:bg-slate-900/30 px-2 py-1 rounded transition-colors">
                          <div className="flex items-start gap-2">
                            <span className="text-gray-600 whitespace-nowrap">[{index + 1}]</span>
                            <span className="text-gray-500 whitespace-nowrap">{entry.timeFormatted}</span>
                            <span className={`font-semibold ${getTypeColor(entry.type)} whitespace-nowrap`}>
                              {entry.type}
                            </span>
                            <span className="text-gray-300 flex-1 break-all">
                              {Object.entries(entry)
                                .filter(([key]) => !['id', 'timestamp', 'timeFormatted', 'type', 'raw'].includes(key))
                                .map(([key, value]) => `${key}=${value}`)
                                .join(' | ')}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {isMonitoring && (
                        <div className="flex items-center gap-2 text-gray-600 animate-pulse px-2 py-1">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
                          <span>Receiving data...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Monitor Controls */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-slate-700 bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMonitoring(!isMonitoring)}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors"
                    title={isMonitoring ? 'Pause' : 'Resume'}
                  >
                    {isMonitoring ? (
                      <Pause size={16} className="text-red-400" />
                    ) : (
                      <Play size={16} className="text-green-400" />
                    )}
                  </button>
                  <button
                    onClick={clearLog}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors"
                    title="Clear Log"
                    disabled={dataLog.length === 0}
                  >
                    <Trash2 size={16} className="text-gray-400" />
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="p-1.5 rounded hover:bg-slate-800 transition-colors"
                    title="Export CSV"
                    disabled={dataLog.length === 0}
                  >
                    <Download size={16} className="text-cyan-400" />
                  </button>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-gray-500">
                    <Database size={12} className="inline mr-1" />
                    {dataCount} entries
                  </span>
                  <span className="text-gray-500">9600 baud</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20">
                <UserPlus size={20} />
                Register for Event
              </button>
              
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg font-medium transition-all">
                <Play size={20} />
                Watch Live Stream
              </button>
              
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent hover:bg-slate-800/50 text-white rounded-lg font-medium transition-all">
                <Download size={20} />
                Mission Brief
              </button>
            </div>
          </div>

          {/* Video/Media Section */}
          <div className="space-y-6">
            {/* Main Video Player */}
            <div className="relative bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentSlideData.videoId}?autoplay=0&mute=1&controls=1&rel=0`}
                  title={currentSlideData.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 bg-slate-950/80 backdrop-blur-sm hover:bg-slate-900 rounded-lg transition-colors">
                  <Maximize size={16} className="text-white" />
                </button>
                <button className="p-2 bg-slate-950/80 backdrop-blur-sm hover:bg-slate-900 rounded-lg transition-colors">
                  <Share size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Slide Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevSlide}
                className="w-12 h-12 flex items-center justify-center bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronLeft size={24} className="text-white" />
              </button>
              
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-blue-500 scale-125'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="w-12 h-12 flex items-center justify-center bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ChevronRight size={24} className="text-white" />
              </button>
            </div>

            {/* Live Status Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-mono text-green-400">LIVE</span>
                </div>
                <div className="text-xs text-gray-400">Mission Control</div>
                <div className="text-lg font-mono text-white">1,247 viewers</div>
              </div>
              
              <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users size={12} className="text-blue-400" />
                  <span className="text-sm font-mono text-blue-400">REGISTERED</span>
                </div>
                <div className="text-xs text-gray-400">Participants</div>
                <div className="text-lg font-mono text-white">3,892</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <span className="text-xs text-gray-400 font-mono">SCROLL TO EXPLORE</span>
          <ChevronDown size={20} className="text-gray-400" />
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </section>
  );
};

export default HeroSectionWithMonitor;