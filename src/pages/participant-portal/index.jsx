import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import CourseEnrollment from './components/CourseEnrollment';
import UserDashboard from './components/UserDashboard';
import CertificateGenerator from './components/CertificateGenerator';
import FeedbackCollection from './components/FeedbackCollection';

const ParticipantPortal = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isRegistered, setIsRegistered] = useState(true); // Mock user state
  const [missionStats, setMissionStats] = useState({
    activeParticipants: 2847,
    completedMissions: 156,
    certificatesIssued: 1923,
    coursesAvailable: 12
  });

  useEffect(() => {
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setMissionStats(prev => ({
        ...prev,
        activeParticipants: prev?.activeParticipants + Math.floor(Math.random() * 3),
        completedMissions: prev?.completedMissions + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const navigationSections = [
    {
      id: 'dashboard',
      title: 'Mission Dashboard',
      icon: 'LayoutDashboard',
      description: 'Your space exploration progress'
    },
    {
      id: 'register',
      title: 'Mission Registration',
      icon: 'UserPlus',
      description: 'Join upcoming space missions'
    },
    {
      id: 'courses',
      title: 'Course Enrollment',
      icon: 'BookOpen',
      description: 'Advance your space skills'
    },
    {
      id: 'certificates',
      title: 'Certificates',
      icon: 'Award',
      description: 'Download your achievements'
    },
    {
      id: 'feedback',
      title: 'Mission Feedback',
      icon: 'MessageSquare',
      description: 'Share your experience'
    }
  ];

  const handleRegistrationSubmit = (formData) => {
    console.log('Registration submitted:', formData);
    setIsRegistered(true);
    setActiveSection('dashboard');
    // In real app, would make API call
  };

  const handleCourseEnrollment = (enrollmentData) => {
    console.log('Course enrollment:', enrollmentData);
    // In real app, would process payment and enrollment
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    // In real app, would send to feedback system
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <UserDashboard userData={{ isRegistered, missionStats }} />;
      case 'register':
        return <RegistrationForm onSubmit={handleRegistrationSubmit} />;
      case 'courses':
        return <CourseEnrollment onEnroll={handleCourseEnrollment} />;
      case 'certificates':
        return <CertificateGenerator />;
      case 'feedback':
        return <FeedbackCollection onSubmit={handleFeedbackSubmit} />;
      default:
        return <UserDashboard userData={{ isRegistered, missionStats }} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-72'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Participant Portal</h1>
                <p className="text-muted-foreground">
                  Your mission control center for space exploration learning
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-1 bg-success/20 border border-success/30 rounded-full">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-success">PORTAL ACTIVE</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  iconName="HelpCircle"
                  iconPosition="left"
                >
                  Help Center
                </Button>
              </div>
            </div>

            {/* Mission Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">
                      {missionStats?.activeParticipants?.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Participants</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Rocket" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">
                      {missionStats?.completedMissions}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed Missions</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">
                      {missionStats?.certificatesIssued?.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Certificates Issued</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                    <Icon name="BookOpen" size={24} className="text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">
                      {missionStats?.coursesAvailable}
                    </div>
                    <div className="text-sm text-muted-foreground">Courses Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {navigationSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                      activeSection === section?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={section?.icon} size={16} />
                    <span>{section?.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Active Section Content */}
          <div className="space-y-6">
            {renderActiveSection()}
          </div>

          {/* Quick Actions */}
          {activeSection === 'dashboard' && (
            <div className="mt-8 bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setActiveSection('register')}
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Register for Mission
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setActiveSection('courses')}
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Browse Courses
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setActiveSection('certificates')}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Certificates
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ParticipantPortal;