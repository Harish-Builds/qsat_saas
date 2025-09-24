import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationSection = () => {
  const [activeForm, setActiveForm] = useState('registration');
  const [formData, setFormData] = useState({
    // Registration form
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    experience: '',
    interests: [],
    newsletter: false,
    terms: false,
    
    // Course enrollment form
    courseType: '',
    level: '',
    startDate: '',
    
    // Feedback form
    rating: '',
    feedback: '',
    improvements: '',
    recommend: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'educator', label: 'Educator' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'industry', label: 'Industry Professional' },
    { value: 'enthusiast', label: 'Space Enthusiast' },
    { value: 'media', label: 'Media/Press' },
    { value: 'other', label: 'Other' }
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner (No prior experience)' },
    { value: 'intermediate', label: 'Intermediate (Some knowledge)' },
    { value: 'advanced', label: 'Advanced (Extensive experience)' },
    { value: 'expert', label: 'Expert (Professional level)' }
  ];

  const courseOptions = [
    { value: 'cubesat-basics', label: 'CubeSat Fundamentals' },
    { value: 'mission-design', label: 'Mission Design & Planning' },
    { value: 'orbital-mechanics', label: 'Orbital Mechanics' },
    { value: 'satellite-communications', label: 'Satellite Communications' },
    { value: 'ground-operations', label: 'Ground Station Operations' },
    { value: 'full-program', label: 'Complete QSAT Program' }
  ];

  const levelOptions = [
    { value: 'introductory', label: 'Introductory Level' },
    { value: 'intermediate', label: 'Intermediate Level' },
    { value: 'advanced', label: 'Advanced Level' }
  ];

  const ratingOptions = [
    { value: '5', label: 'Excellent (5 stars)' },
    { value: '4', label: 'Very Good (4 stars)' },
    { value: '3', label: 'Good (3 stars)' },
    { value: '2', label: 'Fair (2 stars)' },
    { value: '1', label: 'Poor (1 star)' }
  ];

  const interestOptions = [
    'Satellite Technology',
    'Mission Operations',
    'Ground Systems',
    'Space Science',
    'Educational Outreach',
    'Career Development',
    'Networking',
    'Technical Workshops'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev?.interests?.includes(interest)
        ? prev?.interests?.filter(i => i !== interest)
        : [...prev?.interests, interest]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeForm === 'registration') {
      if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
      if (!formData?.email?.trim()) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
      if (!formData?.role) newErrors.role = 'Please select your role';
      if (!formData?.experience) newErrors.experience = 'Please select your experience level';
      if (!formData?.terms) newErrors.terms = 'You must accept the terms and conditions';
    } else if (activeForm === 'course') {
      if (!formData?.courseType) newErrors.courseType = 'Please select a course';
      if (!formData?.level) newErrors.level = 'Please select your level';
      if (!formData?.startDate) newErrors.startDate = 'Please select a start date';
    } else if (activeForm === 'feedback') {
      if (!formData?.rating) newErrors.rating = 'Please provide a rating';
      if (!formData?.feedback?.trim()) newErrors.feedback = 'Feedback is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        experience: '',
        interests: [],
        newsletter: false,
        terms: false,
        courseType: '',
        level: '',
        startDate: '',
        rating: '',
        feedback: '',
        improvements: '',
        recommend: ''
      });
    }, 3000);
  };

  const forms = [
    {
      id: 'registration',
      name: 'Event Registration',
      icon: 'UserPlus',
      description: 'Register for the QSAT-1 launch event'
    },
    {
      id: 'course',
      name: 'Course Enrollment',
      icon: 'GraduationCap',
      description: 'Enroll in our educational programs'
    },
    {
      id: 'feedback',
      name: 'Feedback',
      icon: 'MessageSquare',
      description: 'Share your thoughts and suggestions'
    }
  ];

  const renderRegistrationForm = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
        />
        
        <Input
          label="Organization/Institution"
          type="text"
          placeholder="University, Company, etc."
          value={formData?.organization}
          onChange={(e) => handleInputChange('organization', e?.target?.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Select
          label="Your Role"
          placeholder="Select your role"
          options={roleOptions}
          value={formData?.role}
          onChange={(value) => handleInputChange('role', value)}
          error={errors?.role}
          required
        />
        
        <Select
          label="Experience Level"
          placeholder="Select your experience"
          options={experienceOptions}
          value={formData?.experience}
          onChange={(value) => handleInputChange('experience', value)}
          error={errors?.experience}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Areas of Interest (Select all that apply)
        </label>
        <div className="grid md:grid-cols-2 gap-3">
          {interestOptions?.map((interest) => (
            <Checkbox
              key={interest}
              label={interest}
              checked={formData?.interests?.includes(interest)}
              onChange={() => handleInterestToggle(interest)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="Subscribe to newsletter for mission updates and educational content"
          checked={formData?.newsletter}
          onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
        />
        
        <Checkbox
          label="I agree to the terms and conditions and privacy policy"
          checked={formData?.terms}
          onChange={(e) => handleInputChange('terms', e?.target?.checked)}
          error={errors?.terms}
          required
        />
      </div>
    </div>
  );

  const renderCourseForm = () => (
    <div className="space-y-6">
      <Select
        label="Course Selection"
        placeholder="Choose a course"
        options={courseOptions}
        value={formData?.courseType}
        onChange={(value) => handleInputChange('courseType', value)}
        error={errors?.courseType}
        required
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Select
          label="Difficulty Level"
          placeholder="Select level"
          options={levelOptions}
          value={formData?.level}
          onChange={(value) => handleInputChange('level', value)}
          error={errors?.level}
          required
        />
        
        <Input
          label="Preferred Start Date"
          type="date"
          value={formData?.startDate}
          onChange={(e) => handleInputChange('startDate', e?.target?.value)}
          error={errors?.startDate}
          required
        />
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-3">Course Benefits</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Hands-on experience with real satellite technology</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Expert instruction from industry professionals</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Certificate of completion</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
            <span>Access to exclusive mission data and resources</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderFeedbackForm = () => (
    <div className="space-y-6">
      <Select
        label="Overall Rating"
        placeholder="Rate your experience"
        options={ratingOptions}
        value={formData?.rating}
        onChange={(value) => handleInputChange('rating', value)}
        error={errors?.rating}
        required
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Your Feedback <span className="text-destructive">*</span>
        </label>
        <textarea
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          rows={4}
          placeholder="Share your thoughts about the event, what you learned, and your overall experience..."
          value={formData?.feedback}
          onChange={(e) => handleInputChange('feedback', e?.target?.value)}
        />
        {errors?.feedback && (
          <p className="text-sm text-destructive mt-1">{errors?.feedback}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Suggestions for Improvement
        </label>
        <textarea
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          rows={3}
          placeholder="How can we make future events better?"
          value={formData?.improvements}
          onChange={(e) => handleInputChange('improvements', e?.target?.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Would you recommend this event to others?
        </label>
        <textarea
          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          rows={2}
          placeholder="Tell us why you would or wouldn't recommend this event..."
          value={formData?.recommend}
          onChange={(e) => handleInputChange('recommend', e?.target?.value)}
        />
      </div>
    </div>
  );

  if (submitSuccess) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-success/20 border border-success/30 rounded-2xl p-12">
              <div className="w-20 h-20 bg-success/20 border border-success/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircle" size={40} className="text-success" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {activeForm === 'registration' && 'Registration Successful!'}
                {activeForm === 'course' && 'Enrollment Complete!'}
                {activeForm === 'feedback' && 'Thank You for Your Feedback!'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {activeForm === 'registration' && 'You\'re all set for the QSAT-1 launch event. Check your email for confirmation details and next steps.'}
                {activeForm === 'course' && 'Welcome to the QSAT educational program! You\'ll receive course materials and access information via email.'}
                {activeForm === 'feedback' && 'Your feedback helps us improve future events and educational programs. We appreciate your participation!'}
              </p>
              <Button
                variant="outline"
                onClick={() => setSubmitSuccess(false)}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Submit Another Form
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="UserPlus" size={20} className="text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-wide">Get Involved</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Join the Mission
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Register for the launch event, enroll in our educational programs, or share your feedback to help us improve.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Form Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {forms?.map((form) => (
              <button
                key={form?.id}
                onClick={() => setActiveForm(form?.id)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                  activeForm === form?.id
                    ? 'bg-primary text-primary-foreground mission-glow'
                    : 'bg-card/30 text-muted-foreground hover:text-foreground hover:bg-card/50'
                }`}
              >
                <Icon name={form?.icon} size={20} />
                <div className="text-left">
                  <div className="font-semibold">{form?.name}</div>
                  <div className="text-xs opacity-80">{form?.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Header */}
              <div className="text-center pb-6 border-b border-border">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Icon name={forms?.find(f => f?.id === activeForm)?.icon} size={24} className="text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">
                    {forms?.find(f => f?.id === activeForm)?.name}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {forms?.find(f => f?.id === activeForm)?.description}
                </p>
              </div>

              {/* Form Content */}
              {activeForm === 'registration' && renderRegistrationForm()}
              {activeForm === 'course' && renderCourseForm()}
              {activeForm === 'feedback' && renderFeedbackForm()}

              {/* Submit Button */}
              <div className="pt-6 border-t border-border">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  iconName={isSubmitting ? "Loader2" : "Send"}
                  iconPosition="left"
                  className="countdown-pulse"
                >
                  {isSubmitting ? 'Processing...' : 
                   activeForm === 'registration' ? 'Register for Event' :
                   activeForm === 'course'? 'Enroll in Course' : 'Submit Feedback'}
                </Button>
              </div>
            </form>
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
              <Icon name="Shield" size={24} className="text-success mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Secure Registration</h4>
              <p className="text-sm text-muted-foreground">Your data is protected with industry-standard encryption</p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
              <Icon name="Mail" size={24} className="text-primary mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Instant Confirmation</h4>
              <p className="text-sm text-muted-foreground">Receive immediate confirmation and event details</p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
              <Icon name="Headphones" size={24} className="text-secondary mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">Get help anytime with our dedicated support team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;