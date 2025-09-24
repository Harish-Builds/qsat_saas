import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    mission: [
      { name: 'Mission Control', href: '/mission-control-dashboard' },
      { name: 'Launch Hub', href: '/launch-event-hub' },
      { name: 'Flight Data', href: '/flight-data-center' },
      { name: 'Recovery Ops', href: '/recovery-operations' }
    ],
    education: [
      { name: 'Student Showcase', href: '/student-innovation-showcase' },
      { name: 'Participant Portal', href: '/participant-portal' },
      { name: 'Learning Resources', href: '#' },
      { name: 'Certification', href: '#' }
    ],
    support: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Ground Control', href: '#' },
      { name: 'Emergency Contact', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Data Protection', href: '#' },
      { name: 'Compliance', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'GitHub', icon: 'Github', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' },
    { name: 'YouTube', icon: 'Youtube', href: '#' }
  ];

  return (
    <footer className="bg-card/95 backdrop-blur-md border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mission-glow">
                  <Icon name="Satellite" size={28} className="text-primary-foreground" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">QSAT Event Hub</h3>
                <p className="text-sm text-muted-foreground font-mono">Mission Control Center</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Democratizing space technology through student innovation and hands-on learning. 
              Making satellite technology accessible to everyone, one mission at a time.
            </p>
            
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-mono text-success">MISSION ACTIVE</span>
            </div>
            
            <Button variant="default" iconName="UserPlus" iconPosition="left">
              Join Mission
            </Button>
          </div>

          {/* Mission Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Mission Centers
            </h4>
            <ul className="space-y-3">
              {footerLinks?.mission?.map((link) => (
                <li key={link?.name}>
                  <a 
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Education Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Education
            </h4>
            <ul className="space-y-3">
              {footerLinks?.education?.map((link) => (
                <li key={link?.name}>
                  <a 
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link) => (
                <li key={link?.name}>
                  <a 
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.name}>
                  <a 
                    href={link?.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link?.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mission Stats Bar */}
        <div className="bg-muted/20 rounded-2xl p-6 mb-8 border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-primary mb-1">47</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Total Missions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-success mb-1">12</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Active Satellites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-accent mb-1">1,250</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Students Involved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono text-secondary mb-1">94.7%</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} QSAT Event Hub. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-xs text-success font-mono">SECURE CONNECTION</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground mr-2">Follow Mission:</span>
            {socialLinks?.map((social) => (
              <a
                key={social?.name}
                href={social?.href}
                className="p-2 rounded-lg bg-muted/30 hover:bg-primary/20 hover:text-primary transition-all duration-200"
                title={social?.name}
              >
                <Icon name={social?.icon} size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex items-center justify-center space-x-4 text-center">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-muted-foreground">Emergency Mission Control:</span>
            </div>
            <a 
              href="tel:+1-800-QSAT-911" 
              className="text-sm font-mono text-error hover:text-error/80 transition-colors"
            >
              +1-800-QSAT-911
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;