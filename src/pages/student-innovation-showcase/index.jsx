import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProjectCard from './components/ProjectCard';
import StudentTestimonial from './components/StudentTestimonial';
import BuildProcessViewer from './components/BuildProcessViewer';
import CategoryFilter from './components/CategoryFilter';
import AchievementBadge from './components/AchievementBadge';
import ProjectGallery from './components/ProjectGallery';

const StudentInnovationShowcase = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBuildProcess, setSelectedBuildProcess] = useState(null);
  const [expandedTestimonials, setExpandedTestimonials] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock data for student projects
  const projects = [
    {
      id: 1,
      title: "Advanced Helical Antenna System",
      description: "High-gain circularly polarized antenna designed for optimal satellite communication with ground stations. Features precision-wound copper elements.",
      category: "Antenna Systems",
      difficulty: "Advanced",
      student: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        school: "MIT",
        grade: "Senior"
      },
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      buildTime: "6 weeks",
      rating: 4.9,
      views: "2.3k",
      downloads: "456",
      isNew: true,
      videoUrl: "https://example.com/video1",
      achievements: [
        { type: "Innovation Award", name: "Best Design", date: "2024" },
        { type: "First Launch", name: "Successful Deploy", date: "Sep 2024" }
      ]
    },
    {
      id: 2,
      title: "Solar Panel Power Management Unit",
      description: "Efficient power conversion system with maximum power point tracking for CubeSat applications. Includes battery management and load balancing.",
      category: "Power Systems",
      difficulty: "Intermediate",
      student: {
        name: "Marcus Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        school: "Stanford University",
        grade: "Junior"
      },
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      buildTime: "4 weeks",
      rating: 4.7,
      views: "1.8k",
      downloads: "324",
      isNew: false,
      achievements: [
        { type: "Perfect Score", name: "100% Efficiency", date: "2024" }
      ]
    },
    {
      id: 3,
      title: "Multi-Sensor Environmental Monitor",
      description: "Integrated sensor package measuring temperature, humidity, pressure, and radiation levels with real-time data transmission capabilities.",
      category: "Sensors",
      difficulty: "Intermediate",
      student: {
        name: "Aisha Patel",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        school: "Caltech",
        grade: "Graduate"
      },
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
      buildTime: "5 weeks",
      rating: 4.8,
      views: "1.9k",
      downloads: "387",
      isNew: true,
      achievements: [
        { type: "Team Leader", name: "Project Lead", date: "2024" }
      ]
    },
    {
      id: 4,
      title: "Lightweight Carbon Fiber Frame",
      description: "Ultra-lightweight structural framework using advanced carbon fiber composites with integrated mounting points for all satellite subsystems.",
      category: "Structure",
      difficulty: "Advanced",
      student: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg",
        school: "Georgia Tech",
        grade: "Senior"
      },
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      buildTime: "8 weeks",
      rating: 4.6,
      views: "1.5k",
      downloads: "298",
      isNew: false,
      achievements: [
        { type: "Quick Builder", name: "Fast Assembly", date: "2024" }
      ]
    },
    {
      id: 5,
      title: "Real-Time Data Processing Unit",
      description: "Embedded software system for real-time telemetry processing, data compression, and autonomous decision making with machine learning capabilities.",
      category: "Software",
      difficulty: "Advanced",
      student: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/41.jpg",
        school: "Carnegie Mellon",
        grade: "Graduate"
      },
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
      buildTime: "10 weeks",
      rating: 4.9,
      views: "2.7k",
      downloads: "523",
      isNew: true,
      achievements: [
        { type: "Innovation Award", name: "AI Integration", date: "2024" },
        { type: "Mentor", name: "Student Guide", date: "2024" }
      ]
    },
    {
      id: 6,
      title: "High-Frequency Communication Module",
      description: "Advanced transceiver system supporting multiple communication protocols with adaptive frequency hopping and error correction.",
      category: "Communication",
      difficulty: "Advanced",
      student: {
        name: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg",
        school: "UC Berkeley",
        grade: "Senior"
      },
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
      buildTime: "7 weeks",
      rating: 4.8,
      views: "2.1k",
      downloads: "445",
      isNew: false,
      achievements: [
        { type: "First Launch", name: "Comm Success", date: "2024" }
      ]
    }
  ];

  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      student: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        school: "MIT",
        grade: "Senior"
      },
      content: `Working on the QSAT project has been absolutely transformative for my understanding of aerospace engineering. The hands-on experience of building actual satellite components that will fly in space is incredible. The mentorship program connected me with industry professionals who guided me through complex RF design challenges. I learned more in these few months than in entire semesters of traditional coursework. The collaborative environment and access to professional-grade equipment made this feel like working at a real aerospace company. This experience has solidified my career path in satellite communications.`,
      rating: 5,
      date: "September 2024",
      achievement: "Innovation Award Winner",
      likes: 47,
      videoUrl: "https://example.com/testimonial1",
      videoThumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300"
    },
    {
      id: 2,
      student: {
        name: "Marcus Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        school: "Stanford University",
        grade: "Junior"
      },
      content: `The power systems track taught me everything from basic circuit design to advanced power management algorithms. Building a system that actually powers a satellite in orbit is mind-blowing. The real-time feedback from our deployed satellite helps us understand how our designs perform in the harsh space environment. The program's emphasis on practical problem-solving and iterative design has prepared me for industry work better than any textbook could.`,
      rating: 5,
      date: "August 2024",
      achievement: "Perfect Score Achievement",
      likes: 32,
      videoUrl: null,
      videoThumbnail: null
    },
    {
      id: 3,
      student: {
        name: "Aisha Patel",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        school: "Caltech",
        grade: "Graduate"
      },
      content: `Leading a team of undergraduate students while working on sensor integration was challenging but incredibly rewarding. The program teaches not just technical skills but also project management, teamwork, and communication. Seeing our environmental monitoring package collect real data from space and contribute to climate research gives our work real purpose and impact.`,
      rating: 5,
      date: "September 2024",
      achievement: "Team Leadership Excellence",
      likes: 28,
      videoUrl: "https://example.com/testimonial3",
      videoThumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300"
    }
  ];

  // Mock build process data
  const buildProcesses = [
    {
      id: 1,
      title: "Advanced Helical Antenna System Build",
      totalTime: "6 weeks",
      steps: [
        {
          title: "Design and Simulation",
          duration: "1 week",
          difficulty: "Advanced",
          description: "Create 3D models and run electromagnetic simulations to optimize antenna performance for the target frequency range.",
          instructions: [
            "Use HFSS software to model the helical antenna geometry",
            "Optimize pitch angle and wire diameter for maximum gain",
            "Simulate radiation patterns and impedance matching",
            "Generate manufacturing drawings with precise dimensions"
          ],
          tools: ["HFSS", "SolidWorks", "Vector Network Analyzer"],
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
          videoUrl: "https://example.com/build1-step1",
          thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300",
          tips: "Always verify your simulation results with hand calculations for basic parameters like resonant frequency."
        },
        {
          title: "Material Preparation",
          duration: "3 days",
          difficulty: "Intermediate",
          description: "Prepare copper wire, support structure, and mounting hardware according to design specifications.",
          instructions: [
            "Cut copper wire to calculated length with 5% margin",
            "Prepare fiberglass support rod with precise diameter",
            "Machine mounting brackets from aluminum stock",
            "Clean all components with isopropyl alcohol"
          ],
          tools: ["Wire cutters", "Lathe", "Milling machine", "Calipers"],
          image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
          videoUrl: null,
          thumbnail: null,
          tips: "Use a wire straightener to ensure consistent wire geometry before winding."
        }
      ]
    }
  ];

  // Categories and project counts
  const categories = ['All Projects', 'Antenna Systems', 'Power Systems', 'Communication', 'Sensors', 'Structure', 'Software'];
  const projectCounts = {
    'All Projects': projects.length,
    'Antenna Systems': projects.filter(p => p.category === 'Antenna Systems').length,
    'Power Systems': projects.filter(p => p.category === 'Power Systems').length,
    'Communication': projects.filter(p => p.category === 'Communication').length,
    'Sensors': projects.filter(p => p.category === 'Sensors').length,
    'Structure': projects.filter(p => p.category === 'Structure').length,
    'Software': projects.filter(p => p.category === 'Software').length
  };

  // Gallery images for featured projects
  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
      caption: "Advanced Helical Antenna System - Final Assembly"
    },
    {
      url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
      caption: "Solar Panel Power Management Unit - Testing Phase"
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      caption: "Multi-Sensor Environmental Monitor - Integration"
    },
    {
      url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      caption: "Carbon Fiber Frame - Structural Testing"
    }
  ];

  // Filter projects based on category and search
  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All Projects' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.isNew - a.isNew;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return parseInt(b.views.replace('k', '000')) - parseInt(a.views.replace('k', '000'));
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const handleBuildProcess = (projectId) => {
    const buildProcess = buildProcesses.find(bp => bp.id === projectId);
    if (buildProcess) {
      setSelectedBuildProcess(buildProcess);
    }
  };

  const toggleTestimonialExpansion = (testimonialId) => {
    setExpandedTestimonials(prev => ({
      ...prev,
      [testimonialId]: !prev[testimonialId]
    }));
  };

  return (
    <>
      <Helmet>
        <title>Student Innovation Showcase - QSAT Event Hub</title>
        <meta name="description" content="Explore student-built satellite components, build processes, and educational achievements. Discover hands-on space technology projects and inspiring success stories." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />

        <main className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-72'
        } pt-16`}>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b border-border">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23334155%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
            
            <div className="relative px-6 py-16">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mission-glow">
                      <Icon name="Trophy" size={32} className="text-primary-foreground" />
                    </div>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                    Student Innovation
                    <span className="block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                      Showcase
                    </span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                    Discover incredible satellite components built by students worldwide. From antenna systems to power management, 
                    explore hands-on projects that are pushing the boundaries of space technology education.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={20} className="text-primary" />
                      <span className="text-foreground font-semibold">24 Students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Rocket" size={20} className="text-success" />
                      <span className="text-foreground font-semibold">12 Launched Projects</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Award" size={20} className="text-warning" />
                      <span className="text-foreground font-semibold">8 Awards Won</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    <Button 
                      variant="default" 
                      size="lg"
                      iconName="Play"
                      iconPosition="left"
                      className="countdown-pulse"
                    >
                      Watch Success Stories
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Build Guides
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="px-6 py-8 border-b border-border">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-6 mb-8">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search projects, students, or technologies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-card border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="newest">Newest First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="popular">Most Popular</option>
                    <option value="name">Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                projectCounts={projectCounts}
              />
            </div>
          </section>

          {/* Projects Grid */}
          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {activeCategory === 'All Projects' ? 'All Projects' : activeCategory}
                  </h2>
                  <p className="text-muted-foreground">
                    {sortedProjects.length} project{sortedProjects.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                  </p>
                </div>
              </div>

              {sortedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onViewDetails={handleProjectDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or category filter
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('All Projects');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Featured Gallery */}
          <section className="px-6 py-12 bg-muted/20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Project Gallery
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Take a closer look at our students' incredible work through detailed photos and documentation
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <ProjectGallery 
                  images={galleryImages}
                  title="Student Innovation Showcase"
                />
              </div>
            </div>
          </section>

          {/* Student Testimonials */}
          <section className="px-6 py-12">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Student Success Stories
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear from students who have transformed their understanding of space technology through hands-on experience
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {testimonials.map((testimonial) => (
                  <StudentTestimonial
                    key={testimonial.id}
                    testimonial={testimonial}
                    isExpanded={expandedTestimonials[testimonial.id]}
                    onToggleExpand={() => toggleTestimonialExpansion(testimonial.id)}
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Share Your Story
                </Button>
              </div>
            </div>
          </section>

          {/* Achievement Highlights */}
          <section className="px-6 py-12 bg-muted/20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Student Achievements
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Celebrating the outstanding accomplishments of our student innovators
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, 6).map((project) => (
                  <div key={project.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Image
                        src={project.student.avatar}
                        alt={project.student.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-card-foreground">
                          {project.student.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.student.school}
                        </p>
                      </div>
                    </div>

                    <h5 className="font-medium text-card-foreground mb-3">
                      {project.title}
                    </h5>

                    <div className="flex flex-wrap gap-2">
                      {project.achievements?.map((achievement, index) => (
                        <AchievementBadge
                          key={index}
                          achievement={achievement}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="px-6 py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8 mission-glow">
                <Icon name="Rocket" size={40} className="text-primary-foreground" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Build Your Own Satellite?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our next cohort of student innovators and turn your space technology dreams into reality. 
                Applications are now open for the 2025 program.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="UserPlus"
                  iconPosition="left"
                  className="countdown-pulse"
                >
                  Apply Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  View Program Schedule
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  Contact Mentors
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* Modals */}
        {selectedBuildProcess && (
          <BuildProcessViewer
            buildProcess={selectedBuildProcess}
            onClose={() => setSelectedBuildProcess(null)}
          />
        )}
      </div>
    </>
  );
};

export default StudentInnovationShowcase;