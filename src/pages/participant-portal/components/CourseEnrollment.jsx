import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CourseEnrollment = ({ onEnroll }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [paymentPlan, setPaymentPlan] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const courses = [
    {
      id: 'satellite-fundamentals',
      title: 'Satellite Fundamentals',
      duration: '8 weeks',
      level: 'Beginner',
      price: 299,
      originalPrice: 399,
      description: 'Learn the basics of satellite design, orbital mechanics, and mission planning through hands-on projects.',
      features: [
        'Interactive satellite design simulations',
        'Live mission control sessions',
        'Certificate of completion',
        'Access to QSAT community forum'
      ],
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop',
      instructor: 'Dr. Sarah Chen',
      students: 1247,
      rating: 4.8,
      nextStart: '2024-10-15'
    },
    {
      id: 'mission-operations',
      title: 'Mission Operations & Control',
      duration: '12 weeks',
      level: 'Intermediate',
      price: 499,
      originalPrice: 649,
      description: 'Master real-time satellite operations, telemetry analysis, and mission command protocols.',
      features: [
        'Real satellite telemetry data',
        'Mission planning software training',
        'Industry mentor sessions',
        'Capstone project with live satellite'
      ],
      image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=250&fit=crop',
      instructor: 'Commander Mike Rodriguez',
      students: 892,
      rating: 4.9,
      nextStart: '2024-11-01'
    },
    {
      id: 'cubesat-engineering',
      title: 'CubeSat Engineering Workshop',
      duration: '16 weeks',
      level: 'Advanced',
      price: 799,
      originalPrice: 999,
      description: 'Build and launch your own CubeSat with comprehensive engineering and project management training.',
      features: [
        'Complete CubeSat kit included',
        'Launch opportunity coordination',
        'Professional engineering review',
        'Industry networking events'
      ],
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=250&fit=crop',
      instructor: 'Prof. Elena Vasquez',
      students: 456,
      rating: 4.9,
      nextStart: '2024-12-01'
    }
  ];

  const paymentOptions = [
    { value: 'full', label: 'Pay in Full (Save 10%)' },
    { value: 'monthly', label: 'Monthly Payments' },
    { value: 'scholarship', label: 'Apply for Scholarship' }
  ];

  const selectedCourseData = courses?.find(course => course?.id === selectedCourse);

  const calculatePrice = () => {
    if (!selectedCourseData) return 0;
    
    if (paymentPlan === 'full') {
      return Math.round(selectedCourseData?.price * 0.9);
    }
    return selectedCourseData?.price;
  };

  const handleEnroll = async () => {
    if (!selectedCourse || !paymentPlan || !agreeTerms) return;
    
    setLoading(true);
    
    // Simulate enrollment process
    setTimeout(() => {
      onEnroll({
        courseId: selectedCourse,
        paymentPlan,
        price: calculatePrice()
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
          <Icon name="BookOpen" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Course Enrollment</h3>
          <p className="text-sm text-muted-foreground">Advance your space technology skills</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Course Selection */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-card-foreground">Select Course</h4>
          
          <div className="grid gap-4">
            {courses?.map((course) => (
              <div
                key={course?.id}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedCourse === course?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedCourse(course?.id)}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
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
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>{course?.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="BarChart" size={14} />
                            <span>{course?.level}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Users" size={14} />
                            <span>{course?.students?.toLocaleString()}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-card-foreground">${course?.price}</span>
                          <span className="text-sm text-muted-foreground line-through">${course?.originalPrice}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Icon name="Star" size={14} className="text-accent fill-current" />
                          <span className="text-sm text-muted-foreground">{course?.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{course?.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Instructor: <span className="text-card-foreground">{course?.instructor}</span>
                      </div>
                      <div className="text-sm text-primary">
                        Next start: {new Date(course.nextStart)?.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Details */}
        {selectedCourseData && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="font-medium text-card-foreground mb-3">Course Features</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {selectedCourseData?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Options */}
        {selectedCourse && (
          <div className="space-y-4">
            <h4 className="text-md font-medium text-card-foreground">Payment Options</h4>
            
            <Select
              label="Choose Payment Plan"
              placeholder="Select payment option"
              options={paymentOptions}
              value={paymentPlan}
              onChange={setPaymentPlan}
              required
            />

            {paymentPlan && (
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-card-foreground">Total Cost:</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-card-foreground">${calculatePrice()}</span>
                    {paymentPlan === 'full' && (
                      <div className="text-sm text-success">Save ${selectedCourseData?.price - calculatePrice()}</div>
                    )}
                    {paymentPlan === 'monthly' && (
                      <div className="text-sm text-muted-foreground">
                        ${Math.round(calculatePrice() / 4)}/month for 4 months
                      </div>
                    )}
                    {paymentPlan === 'scholarship' && (
                      <div className="text-sm text-accent">Scholarship application required</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Terms */}
        {selectedCourse && paymentPlan && (
          <div className="space-y-3 pt-4 border-t border-border">
            <Checkbox
              label="I agree to the Course Terms and Conditions"
              description="Includes refund policy and course requirements"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e?.target?.checked)}
              required
            />
          </div>
        )}

        {/* Enroll Button */}
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={!selectedCourse || !paymentPlan || !agreeTerms}
          onClick={handleEnroll}
          iconName="GraduationCap"
          iconPosition="left"
          className="mission-glow"
        >
          {loading ? 'Processing Enrollment...' : 'Enroll Now'}
        </Button>
      </div>
    </div>
  );
};

export default CourseEnrollment;