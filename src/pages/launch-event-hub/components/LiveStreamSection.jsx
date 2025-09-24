import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveStreamSection = () => {
  const [isLive, setIsLive] = useState(true);
  const [viewerCount, setViewerCount] = useState(1247);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedStream, setSelectedStream] = useState('main');
  const [streamQuality, setStreamQuality] = useState('1080p');

  const streamSources = [
    {
      id: 'main',
      name: 'Mission Control',
      description: 'Primary mission control feed',
      videoId: 'dQw4w9WgXcQ',
      status: 'live',
      viewers: 1247
    },
    {
      id: 'launch',
      name: 'Launch Pad',
      description: 'Live view of launch vehicle',
      videoId: 'jNQXAC9IVRw',
      status: 'live',
      viewers: 892
    },
    {
      id: 'tracking',
      name: 'Tracking Station',
      description: 'Ground station operations',
      videoId: 'M7lc1UVf-VE',
      status: 'live',
      viewers: 634
    },
    {
      id: 'recovery',
      name: 'Recovery Team',
      description: 'Recovery operations feed',
      videoId: 'ScMzIvxBSi4',
      status: 'standby',
      viewers: 0
    }
  ];

  const qualityOptions = [
    { value: '1080p', label: '1080p HD' },
    { value: '720p', label: '720p' },
    { value: '480p', label: '480p' },
    { value: '360p', label: '360p (Low Bandwidth)' }
  ];

  const initialMessages = [
    {
      id: 1,
      user: 'MissionControl_01',
      message: 'T-minus 2 hours and counting. All systems nominal.',
      timestamp: new Date(Date.now() - 300000),
      type: 'official'
    },
    {
      id: 2,
      user: 'SpaceEnthusiast42',
      message: 'This is so exciting! First time watching a student satellite launch live!',
      timestamp: new Date(Date.now() - 240000),
      type: 'user'
    },
    {
      id: 3,
      user: 'Dr_Sarah_Chen',
      message: 'Weather conditions are perfect for launch. Winds at 5 knots from the southeast.',
      timestamp: new Date(Date.now() - 180000),
      type: 'expert'
    },
    {
      id: 4,
      user: 'StudentEngineer',
      message: 'Two years of work leading to this moment. Go QSAT-1! 🚀',
      timestamp: new Date(Date.now() - 120000),
      type: 'user'
    },
    {
      id: 5,
      user: 'GroundStation_VA',
      message: 'Ground station Virginia is ready for first contact post-deployment.',
      timestamp: new Date(Date.now() - 60000),
      type: 'official'
    }
  ];

  useEffect(() => {
    setChatMessages(initialMessages);

    // Simulate live chat updates
    const chatInterval = setInterval(() => {
      const randomMessages = [
        { user: 'SpaceFan2024', message: 'Amazing work by the student team!', type: 'user' },
        { user: 'AerospaceProf', message: 'Excellent example of hands-on learning', type: 'expert' },
        { user: 'TechStudent', message: 'How long until first signal?', type: 'user' },
        { user: 'MissionOps', message: 'All telemetry looking good', type: 'official' },
        { user: 'SatelliteTracker', message: 'Tracking stations are ready', type: 'user' }
      ];

      const randomMessage = randomMessages?.[Math.floor(Math.random() * randomMessages?.length)];
      const newMsg = {
        id: Date.now(),
        ...randomMessage,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev?.slice(-20), newMsg]);
    }, 8000);

    // Simulate viewer count changes
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => {
      clearInterval(chatInterval);
      clearInterval(viewerInterval);
    };
  }, []);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!newMessage?.trim()) return;

    const message = {
      id: Date.now(),
      user: 'You',
      message: newMessage,
      timestamp: new Date(),
      type: 'user'
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserTypeColor = (type) => {
    switch (type) {
      case 'official':
        return 'text-accent';
      case 'expert':
        return 'text-secondary';
      default:
        return 'text-foreground';
    }
  };

  const currentStream = streamSources?.find(s => s?.id === selectedStream);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-red-500 uppercase tracking-wide">Live Stream</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mission Control Live
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch the QSAT-1 launch mission unfold in real-time with multiple camera angles and expert commentary.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stream Status Bar */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-mono text-red-500">LIVE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-primary" />
                    <span className="text-sm font-mono text-primary">{viewerCount?.toLocaleString()} viewers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground">
                      {formatTime(new Date())} UTC
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select
                    value={streamQuality}
                    onChange={(e) => setStreamQuality(e?.target?.value)}
                    className="bg-input border border-border rounded px-2 py-1 text-sm text-foreground"
                  >
                    {qualityOptions?.map(option => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                  <Button variant="ghost" size="sm" iconName="Settings" />
                </div>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative bg-card/30 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentStream?.videoId}?autoplay=1&mute=0&controls=1&rel=0`}
                  title={currentStream?.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              
              {/* Video Overlay Controls */}
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
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-background/80 backdrop-blur-sm"
                  iconName="Download"
                />
              </div>

              {/* Stream Info Overlay */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3">
                <h3 className="font-semibold text-foreground">{currentStream?.name}</h3>
                <p className="text-sm text-muted-foreground">{currentStream?.description}</p>
              </div>
            </div>

            {/* Stream Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {streamSources?.map((stream) => (
                <button
                  key={stream?.id}
                  onClick={() => setSelectedStream(stream?.id)}
                  className={`relative p-4 rounded-lg border transition-all duration-300 ${
                    selectedStream === stream?.id
                      ? 'bg-primary/20 border-primary/30 mission-glow' :'bg-card/30 border-border hover:bg-card/50'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      stream?.status === 'live' ? 'bg-red-500 animate-pulse' : 'bg-muted-foreground'
                    }`}></div>
                    <span className="text-xs font-mono text-muted-foreground uppercase">
                      {stream?.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{stream?.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{stream?.description}</p>
                  {stream?.status === 'live' && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Icon name="Users" size={12} className="text-primary" />
                      <span className="text-xs text-primary">{stream?.viewers}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat and Social */}
          <div className="space-y-6">
            {/* Live Chat */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageSquare" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Live Chat</h3>
                  <div className="flex items-center space-x-1 ml-auto">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-success">Active</span>
                  </div>
                </div>
              </div>
              
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {chatMessages?.map((msg) => (
                  <div key={msg?.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getUserTypeColor(msg?.type)}`}>
                        {msg?.user}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(msg?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{msg?.message}</p>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e?.target?.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    iconName="Send"
                  />
                </div>
              </form>
            </div>

            {/* Mission Stats */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Mission Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Viewers</span>
                  <span className="font-mono text-foreground">{(viewerCount + 892 + 634)?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Stream Duration</span>
                  <span className="font-mono text-foreground">2h 34m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Chat Messages</span>
                  <span className="font-mono text-foreground">{chatMessages?.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Countries</span>
                  <span className="font-mono text-foreground">47</span>
                </div>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Share the Mission</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" iconName="Twitter" iconPosition="left">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" iconName="Facebook" iconPosition="left">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" iconName="Linkedin" iconPosition="left">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" iconName="Link" iconPosition="left">
                  Copy Link
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button
                variant="default"
                fullWidth
                iconName="UserPlus"
                iconPosition="left"
                className="countdown-pulse"
              >
                Register for Event
              </Button>
              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
              >
                Download Mission Data
              </Button>
              <Button
                variant="ghost"
                fullWidth
                iconName="Bell"
                iconPosition="left"
              >
                Get Notifications
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamSection;