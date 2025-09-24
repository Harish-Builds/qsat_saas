import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    grade: '',
    experience: '',
    interests: [],
    emergencyContact: '',
    emergencyPhone: '',
    agreeTerms: false,
    agreeMarketing: false
  });

  const [errors, setErrors] = useState({});

  const gradeOptions = [
    { value: 'high-school', label: 'High School (9-12)' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate Student' },
    { value: 'educator', label: 'Educator' },
    { value: 'professional', label: 'Industry Professional' },
    { value: 'other', label: 'Other' }
  ];

  const experienceOptions = [
    { value: 'beginner', label: 'Beginner - New to aerospace' },
    { value: 'intermediate', label: 'Intermediate - Some STEM background' },
    { value: 'advanced', label: 'Advanced - Engineering/Physics experience' },
    { value: 'expert', label: 'Expert - Professional aerospace experience' }
  ];

  const interestOptions = [
    { value: 'satellite-design', label: 'Satellite Design & Engineering' },
    { value: 'mission-operations', label: 'Mission Operations' },
    { value: 'data-analysis', label: 'Data Analysis & Telemetry' },
    { value: 'ground-systems', label: 'Ground Systems' },
    { value: 'space-physics', label: 'Space Physics' },
    { value: 'programming', label: 'Programming & Software' },
    { value: 'electronics', label: 'Electronics & Hardware' },
    { value: 'project-management', label: 'Project Management' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleInterestChange = (interest, checked) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev?.interests, interest]
        : prev?.interests?.filter(i => i !== interest)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.institution?.trim()) newErrors.institution = 'Institution is required';
    if (!formData?.grade) newErrors.grade = 'Grade level is required';
    if (!formData?.experience) newErrors.experience = 'Experience level is required';
    if (!formData?.emergencyContact?.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData?.emergencyPhone?.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    if (!formData?.agreeTerms) newErrors.agreeTerms = 'You must agree to terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
          <Icon name="UserPlus" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Mission Registration</h3>
          <p className="text-sm text-muted-foreground">Join the QSAT space exploration community</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="User" size={16} className="text-primary" />
            <span>Personal Information</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="Enter your first name"
              value={formData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              error={errors?.firstName}
              required
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter your last name"
              value={formData?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              error={errors?.lastName}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
          </div>
        </div>

        {/* Academic Information */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="GraduationCap" size={16} className="text-primary" />
            <span>Academic Information</span>
          </h4>
          
          <Input
            label="Institution/School"
            type="text"
            placeholder="Your school, university, or organization"
            value={formData?.institution}
            onChange={(e) => handleInputChange('institution', e?.target?.value)}
            error={errors?.institution}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Grade Level"
              placeholder="Select your current level"
              options={gradeOptions}
              value={formData?.grade}
              onChange={(value) => handleInputChange('grade', value)}
              error={errors?.grade}
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
        </div>

        {/* Interests */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span>Areas of Interest</span>
          </h4>
          <p className="text-sm text-muted-foreground">Select all areas that interest you (optional)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {interestOptions?.map((interest) => (
              <Checkbox
                key={interest?.value}
                label={interest?.label}
                checked={formData?.interests?.includes(interest?.value)}
                onChange={(e) => handleInterestChange(interest?.value, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-card-foreground flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-primary" />
            <span>Emergency Contact</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Emergency Contact Name"
              type="text"
              placeholder="Full name of emergency contact"
              value={formData?.emergencyContact}
              onChange={(e) => handleInputChange('emergencyContact', e?.target?.value)}
              error={errors?.emergencyContact}
              required
            />
            <Input
              label="Emergency Contact Phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData?.emergencyPhone}
              onChange={(e) => handleInputChange('emergencyPhone', e?.target?.value)}
              error={errors?.emergencyPhone}
              required
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Checkbox
            label="I agree to the Terms and Conditions and Privacy Policy"
            description="Required to participate in QSAT events and programs"
            checked={formData?.agreeTerms}
            onChange={(e) => handleInputChange('agreeTerms', e?.target?.checked)}
            error={errors?.agreeTerms}
            required
          />
          <Checkbox
            label="I would like to receive updates about future QSAT missions and events"
            description="Optional marketing communications"
            checked={formData?.agreeMarketing}
            onChange={(e) => handleInputChange('agreeMarketing', e?.target?.checked)}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={loading}
          iconName="Rocket"
          iconPosition="left"
          className="countdown-pulse"
        >
          {loading ? 'Registering...' : 'Join Mission'}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;