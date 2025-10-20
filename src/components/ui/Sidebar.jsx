import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import LoginModal from './LoginModal';

const Sidebar = ({ isCollapsed = false, onToggle, className = '' }) => {
  const [missionData, setMissionData] = useState({
    altitude: 408,
    velocity: 7.66,
    orbits: 15847,
    nextPass: '14:23:45'
  });
  const [loginModal, setLoginModal] = useState({ isOpen: false, itemName: '', itemPath: '' });
  const [currentPath, setCurrentPath] = useState('/mission-control-dashboard');
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setMissionData(prev => ({
        ...prev,
        altitude: prev?.altitude + (Math.random() - 0.5) * 2,
        velocity: prev?.velocity + (Math.random() - 0.5) * 0.1,
        orbits: prev?.orbits + (Math.random() > 0.9 ? 1 : 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location?.pathname) {
      setCurrentPath(location.pathname);
    }
  }, [location]);

  const navigationItems = [
    {
      name: 'Mission Control',
      path: '/mission-control-dashboard',
      icon: 'Radar',
      description: 'Real-time mission oversight'
    },
    {
      name: 'Launch Event Hub',
      path: '/launch-event-hub',
      icon: 'Rocket',
      description: 'Launch coordination center'
    },
    {
      name: 'Flight Data Center',
      path: '/flight-data-center',
      icon: 'BarChart3',
      description: 'Telemetry and analytics'
    },
    {
      name: 'Recovery Operations',
      path: '/recovery-operations',
      icon: 'MapPin',
      description: 'Landing zone management'
    },
    {
      name: 'Innovation Showcase',
      path: '/student-innovation-showcase',
      icon: 'Trophy',
      description: 'Student achievements'
    },
    {
      name: 'Participant Portal',
      path: '/participant-portal',
      icon: 'Users',
      description: 'Team collaboration hub'
    }
  ];

  const isActivePath = (path) => currentPath === path;

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.path === '/mission-control-dashboard') {
      setCurrentPath(item.path);
      window.location.href = item.path;
    } else {
      setLoginModal({ isOpen: true, itemName: item.name, itemPath: item.path });
    }
  };

  const handleLoginSuccess = () => {
    const path = loginModal.itemPath;
    setCurrentPath(path);
    setLoginModal({ isOpen: false, itemName: '', itemPath: '' });
    window.location.href = path;
  };

  return (
    <>
      <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card/95 backdrop-blur-md border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      } ${className}`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-primary">MISSION CONTROL</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="ml-auto"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActivePath(item?.path)
                    ? 'bg-primary/20 text-primary border border-primary/30 mission-glow' :'text-card-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title={isCollapsed ? item?.name : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={`flex-shrink-0 ${isActivePath(item?.path) ? 'text-primary' : ''}`}
                />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate flex items-center justify-between">
                      <span>{item?.name}</span>
                      {item?.path !== '/mission-control-dashboard' && (
                        <Icon name="Lock" size={12} className="text-muted-foreground/50 ml-2" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {item?.description}
                    </div>
                  </div>
                )}
                {!isCollapsed && isActivePath(item?.path) && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </a>
            ))}
          </nav>

          {/* Mission Data Panel */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Satellite" size={16} className="text-primary" />
                  <span className="text-sm font-mono text-primary">LIVE TELEMETRY</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Altitude</div>
                    <div className="font-mono text-foreground">
                      {missionData?.altitude?.toFixed(1)} km
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Velocity</div>
                    <div className="font-mono text-foreground">
                      {missionData?.velocity?.toFixed(2)} km/s
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Orbits</div>
                    <div className="font-mono text-foreground">
                      {missionData?.orbits?.toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground">Next Pass</div>
                    <div className="font-mono text-foreground">
                      {missionData?.nextPass}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-success">SIGNAL STRONG</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed Mission Status */}
          {isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="flex flex-col items-center space-y-2">
                <Icon name="Satellite" size={20} className="text-primary orbital-rotate" />
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </aside>

      <LoginModal
        isOpen={loginModal.isOpen}
        onClose={() => setLoginModal({ isOpen: false, itemName: '', itemPath: '' })}
        onLogin={handleLoginSuccess}
        itemName={loginModal.itemName}
      />
    </>
  );
};

export default Sidebar;