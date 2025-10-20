import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import LoginModal from './LoginModal';

const Header = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [missionTime, setMissionTime] = useState(new Date());
  const [loginModal, setLoginModal] = useState({ isOpen: false, itemName: '', itemPath: '' });
  const [currentPath, setCurrentPath] = useState('/mission-control-dashboard');
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setMissionTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
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
      icon: 'Radar'
    },
    { 
      name: 'Launch Hub', 
      path: '/launch-event-hub',
      icon: 'Rocket'
    },
    { 
      name: 'Flight Data', 
      path: '/flight-data-center',
      icon: 'BarChart3'
    },
    { 
      name: 'Recovery Ops', 
      path: '/recovery-operations',
      icon: 'MapPin'
    }
  ];

  const secondaryItems = [
    { 
      name: 'Innovation Showcase', 
      path: '/student-innovation-showcase',
      icon: 'Trophy'
    },
    { 
      name: 'Participant Portal', 
      path: '/participant-portal',
      icon: 'Users'
    }
  ];

  const isActivePath = (path) => currentPath === path;

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.path === '/mission-control-dashboard') {
      setCurrentPath(item.path);
      setIsMenuOpen(false);
      window.location.href = item.path;
    } else {
      setLoginModal({ isOpen: true, itemName: item.name, itemPath: item.path });
    }
  };

  const handleLoginSuccess = () => {
    const path = loginModal.itemPath;
    setCurrentPath(path);
    setLoginModal({ isOpen: false, itemName: '', itemPath: '' });
    setIsMenuOpen(false);
    window.location.href = path;
  };

  const formatMissionTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour12: false,
      timeZone: 'UTC'
    });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border ${className}`}>
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mission-glow">
                <Icon name="Satellite" size={24} className="text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">QSAT Event Hub</span>
              <span className="text-xs font-mono text-muted-foreground">
                UTC {formatMissionTime(missionTime)}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? 'bg-primary/20 text-primary border border-primary/30 mission-glow' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
                {item?.path !== '/mission-control-dashboard' && (
                  <Icon name="Lock" size={12} className="text-muted-foreground/50" />
                )}
              </a>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </Button>
              
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  {secondaryItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        isActivePath(item?.path)
                          ? 'bg-primary/20 text-primary' 
                          : 'text-popover-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span className="flex-1">{item?.name}</span>
                      <Icon name="Lock" size={12} className="text-muted-foreground/50" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mission Status & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1 bg-success/20 border border-success/30 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-success">MISSION ACTIVE</span>
            </div>
            
            <Button 
              variant="default" 
              size="sm"
              className="countdown-pulse"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => setLoginModal({ isOpen: true, itemName: 'Mission', itemPath: '/join-mission' })}
            >
              Join Mission
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border">
            <div className="px-6 py-4 space-y-3">
              {[...navigationItems, ...secondaryItems]?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActivePath(item?.path)
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span className="flex-1">{item?.name}</span>
                  {item?.path !== '/mission-control-dashboard' && (
                    <Icon name="Lock" size={14} className="text-muted-foreground/50" />
                  )}
                </a>
              ))}
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-success/20 border border-success/30 rounded-full">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-success">MISSION ACTIVE</span>
                  </div>
                </div>
                
                <Button 
                  variant="default" 
                  fullWidth
                  className="countdown-pulse"
                  iconName="UserPlus"
                  iconPosition="left"
                  onClick={() => setLoginModal({ isOpen: true, itemName: 'Mission', itemPath: '/join-mission' })}
                >
                  Join Mission
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={loginModal.isOpen}
        onClose={() => setLoginModal({ isOpen: false, itemName: '', itemPath: '' })}
        onLogin={handleLoginSuccess}
        itemName={loginModal.itemName}
      />
    </>
  );
};

export default Header;