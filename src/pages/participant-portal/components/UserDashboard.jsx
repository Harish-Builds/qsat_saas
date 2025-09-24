import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserDashboard = ({ userData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [missionProgress, setMissionProgress] = useState(0);

  useEffect(() => {
    // Simulate progress animation
    const timer = setTimeout(() => {
      setMissionProgress(userData?.progress || 0);
    }, 500);
    return () => clearTimeout(timer);
  }, [userData]);

  const mockUserData = {
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    institution: 'MIT',
    level: 'Intermediate',
    joinDate: '2024-08-15',
    progress: 68,
    completedCourses: 3,
    activeCourses: 2,
    certificates: 3,
    points: 2450,
    rank: 'Mission Specialist',
    nextRank: 'Flight Engineer',
    pointsToNext: 550,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  };

  const user = userData || mockUserData;

  const activeCourses = [
    {
      id: 1,
      title: 'Mission Operations & Control',
      progress: 75,
      nextLesson: 'Telemetry Analysis',
      dueDate: '2024-10-30',
      instructor: 'Commander Mike Rodriguez',
      image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'CubeSat Engineering Workshop',
      progress: 45,
      nextLesson: 'Power Systems Design',
      dueDate: '2024-11-15',
      instructor: 'Prof. Elena Vasquez',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop'
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: 'Satellite Fundamentals Certificate',
      date: '2024-09-20',
      type: 'certificate',
      icon: 'Award',
      color: 'text-accent'
    },
    {
      id: 2,
      title: 'Mission Specialist Rank',
      date: '2024-09-15',
      type: 'rank',
      icon: 'Star',
      color: 'text-secondary'
    },
    {
      id: 3,
      title: 'First Satellite Design Completed',
      date: '2024-09-10',
      type: 'milestone',
      icon: 'Satellite',
      color: 'text-primary'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'QSAT-1 Launch Event',
      date: '2024-10-25',
      time: '14:30 UTC',
      type: 'Launch',
      registered: true
    },
    {
      id: 2,
      title: 'Student Innovation Showcase',
      date: '2024-11-05',
      time: '16:00 UTC',
      type: 'Showcase',
      registered: false
    },
    {
      id: 3,
      title: 'Mission Planning Workshop',
      date: '2024-11-12',
      time: '18:00 UTC',
      type: 'Workshop',
      registered: true
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'courses', label: 'My Courses', icon: 'BookOpen' },
    { id: 'achievements', label: 'Achievements', icon: 'Trophy' },
    { id: 'events', label: 'Events', icon: 'Calendar' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Target" size={20} className="text-primary" />
            <span className="font-medium text-card-foreground">Mission Progress</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="text-card-foreground font-medium">{missionProgress}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
                style={{ width: `${missionProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Star" size={20} className="text-secondary" />
            <span className="font-medium text-card-foreground">Current Rank</span>
          </div>
          <div className="space-y-2">
            <div className="text-lg font-bold text-card-foreground">{user?.rank}</div>
            <div className="text-sm text-muted-foreground">
              {user?.pointsToNext} points to {user?.nextRank}
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-secondary rounded-full h-2"
                style={{ width: `${((user?.points % 1000) / 1000) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Icon name="Award" size={20} className="text-accent" />
            <span className="font-medium text-card-foreground">Achievements</span>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-card-foreground">{user?.certificates}</div>
            <div className="text-sm text-muted-foreground">Certificates earned</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-xl font-bold text-card-foreground">{user?.completedCourses}</div>
          <div className="text-sm text-muted-foreground">Completed Courses</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-xl font-bold text-card-foreground">{user?.activeCourses}</div>
          <div className="text-sm text-muted-foreground">Active Courses</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-xl font-bold text-card-foreground">{user?.points?.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Mission Points</div>
        </div>
        <div className="text-center p-4 bg-muted/20 rounded-lg">
          <div className="text-xl font-bold text-card-foreground">
            {Math.floor((Date.now() - new Date(user.joinDate)) / (1000 * 60 * 60 * 24))}
          </div>
          <div className="text-sm text-muted-foreground">Days Active</div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-card-foreground">Active Courses</h4>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Browse Courses
        </Button>
      </div>

      <div className="grid gap-6">
        {activeCourses?.map((course) => (
          <div key={course?.id} className="bg-muted/30 rounded-lg p-6">
            <div className="flex gap-4">
              <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={course?.image}
                  alt={course?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-semibold text-card-foreground">{course?.title}</h5>
                    <p className="text-sm text-muted-foreground">Instructor: {course?.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-card-foreground">{course?.progress}%</div>
                    <div className="text-xs text-muted-foreground">Complete</div>
                  </div>
                </div>
                
                <div className="w-full bg-border rounded-full h-2 mb-3">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-500"
                    style={{ width: `${course?.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Next: <span className="text-card-foreground">{course?.nextLesson}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due: {new Date(course.dueDate)?.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="default" size="sm" iconName="Play" iconPosition="left">
                Continue Learning
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-card-foreground">Recent Achievements</h4>
      
      <div className="grid gap-4">
        {recentAchievements?.map((achievement) => (
          <div key={achievement?.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
            <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${achievement?.color}`}>
              <Icon name={achievement?.icon} size={20} />
            </div>
            <div className="flex-1">
              <h5 className="font-medium text-card-foreground">{achievement?.title}</h5>
              <p className="text-sm text-muted-foreground">
                Earned on {new Date(achievement.date)?.toLocaleDateString()}
              </p>
            </div>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Download
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-card-foreground">Upcoming Events</h4>
      
      <div className="grid gap-4">
        {upcomingEvents?.map((event) => (
          <div key={event?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <h5 className="font-medium text-card-foreground">{event?.title}</h5>
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date)?.toLocaleDateString()} at {event?.time}
                </p>
                <span className="inline-block px-2 py-1 text-xs bg-primary/20 text-primary rounded-full mt-1">
                  {event?.type}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {event?.registered ? (
                <div className="flex items-center space-x-2 text-success">
                  <Icon name="Check" size={16} />
                  <span className="text-sm">Registered</span>
                </div>
              ) : (
                <Button variant="outline" size="sm">
                  Register
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* User Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-card-foreground">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
              <span>{user?.institution}</span>
              <span>•</span>
              <span>{user?.level}</span>
              <span>•</span>
              <span>Joined {new Date(user.joinDate)?.toLocaleDateString()}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 text-primary">
              <Icon name="Star" size={16} />
              <span className="font-medium">{user?.rank}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {user?.points?.toLocaleString()} points
            </div>
          </div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'achievements' && renderAchievements()}
        {activeTab === 'events' && renderEvents()}
      </div>
    </div>
  );
};

export default UserDashboard;