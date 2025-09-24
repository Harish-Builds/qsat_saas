import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FeedbackCollection = ({ onSubmit }) => {
  const [feedbackType, setFeedbackType] = useState('');
  const [formData, setFormData] = useState({
    rating: '',
    title: '',
    description: '',
    category: '',
    priority: '',
    attachments: [],
    anonymous: false,
    followUp: true
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTypes = [
    { value: 'course-feedback', label: 'Course Feedback' },
    { value: 'event-feedback', label: 'Event Feedback' },
    { value: 'platform-feedback', label: 'Platform Feedback' },
    { value: 'instructor-feedback', label: 'Instructor Feedback' },
    { value: 'technical-issue', label: 'Technical Issue' },
    { value: 'feature-request', label: 'Feature Request' },
    { value: 'general-feedback', label: 'General Feedback' }
  ];

  const ratingOptions = [
    { value: '5', label: '⭐⭐⭐⭐⭐ Excellent (5/5)' },
    { value: '4', label: '⭐⭐⭐⭐ Good (4/5)' },
    { value: '3', label: '⭐⭐⭐ Average (3/5)' },
    { value: '2', label: '⭐⭐ Poor (2/5)' },
    { value: '1', label: '⭐ Very Poor (1/5)' }
  ];

  const categoryOptions = [
    { value: 'content-quality', label: 'Content Quality' },
    { value: 'instructor-performance', label: 'Instructor Performance' },
    { value: 'technical-platform', label: 'Technical Platform' },
    { value: 'user-experience', label: 'User Experience' },
    { value: 'course-structure', label: 'Course Structure' },
    { value: 'support-services', label: 'Support Services' },
    { value: 'accessibility', label: 'Accessibility' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low - General feedback' },
    { value: 'medium', label: 'Medium - Improvement suggestion' },
    { value: 'high', label: 'High - Important issue' },
    { value: 'urgent', label: 'Urgent - Critical problem' }
  ];

  const recentFeedback = [
    {
      id: 1,
      type: 'Course Feedback',
      title: 'Excellent satellite fundamentals course',
      rating: 5,
      date: '2024-09-20',
      status: 'reviewed',
      response: 'Thank you for your positive feedback! We\'re glad you enjoyed the course.'
    },
    {
      id: 2,
      type: 'Technical Issue',
      title: 'Video playback issues in Mission Operations module',
      rating: null,
      date: '2024-09-18',
      status: 'resolved',
      response: 'This issue has been fixed. Please try accessing the videos again.'
    },
    {
      id: 3,
      type: 'Feature Request',
      title: 'Add mobile app for course access',
      rating: null,
      date: '2024-09-15',
      status: 'under-review',
      response: null
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!feedbackType) newErrors.feedbackType = 'Please select feedback type';
    if (!formData?.title?.trim()) newErrors.title = 'Title is required';
    if (!formData?.description?.trim()) newErrors.description = 'Description is required';
    if (!formData?.category) newErrors.category = 'Category is required';
    if (!formData?.priority) newErrors.priority = 'Priority is required';

    // Rating required for certain feedback types
    if (['course-feedback', 'event-feedback', 'instructor-feedback']?.includes(feedbackType) && !formData?.rating) {
      newErrors.rating = 'Rating is required for this feedback type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      const feedbackData = {
        type: feedbackType,
        ...formData,
        timestamp: new Date()?.toISOString(),
        id: Date.now()
      };

      onSubmit?.(feedbackData);
      
      // Reset form
      setFeedbackType('');
      setFormData({
        rating: '',
        title: '',
        description: '',
        category: '',
        priority: '',
        attachments: [],
        anonymous: false,
        followUp: true
      });
      
      setIsSubmitting(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reviewed': return 'text-success';
      case 'resolved': return 'text-primary';
      case 'under-review': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'reviewed': return 'CheckCircle';
      case 'resolved': return 'Check';
      case 'under-review': return 'Clock';
      default: return 'Circle';
    }
  };

  return (
    <div className="space-y-6">
      {/* New Feedback Form */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Share Your Feedback</h3>
            <p className="text-sm text-muted-foreground">Help us improve your QSAT experience</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Type */}
          <Select
            label="Feedback Type"
            placeholder="What would you like to share feedback about?"
            options={feedbackTypes}
            value={feedbackType}
            onChange={setFeedbackType}
            error={errors?.feedbackType}
            required
          />

          {/* Rating (conditional) */}
          {['course-feedback', 'event-feedback', 'instructor-feedback']?.includes(feedbackType) && (
            <Select
              label="Overall Rating"
              placeholder="How would you rate your experience?"
              options={ratingOptions}
              value={formData?.rating}
              onChange={(value) => handleInputChange('rating', value)}
              error={errors?.rating}
              required
            />
          )}

          {/* Title */}
          <Input
            label="Feedback Title"
            type="text"
            placeholder="Brief summary of your feedback"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            error={errors?.title}
            required
          />

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-card-foreground">
              Detailed Description <span className="text-error">*</span>
            </label>
            <textarea
              className="w-full min-h-[120px] px-3 py-2 bg-input border border-border rounded-md text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              placeholder="Please provide detailed feedback. The more specific you are, the better we can address your concerns or suggestions."
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              required
            />
            {errors?.description && (
              <p className="text-sm text-error">{errors?.description}</p>
            )}
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              placeholder="Select relevant category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              error={errors?.category}
              required
            />
            <Select
              label="Priority Level"
              placeholder="How urgent is this feedback?"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)}
              error={errors?.priority}
              required
            />
          </div>

          {/* Options */}
          <div className="space-y-3 pt-4 border-t border-border">
            <Checkbox
              label="Submit feedback anonymously"
              description="Your name will not be associated with this feedback"
              checked={formData?.anonymous}
              onChange={(e) => handleInputChange('anonymous', e?.target?.checked)}
            />
            <Checkbox
              label="I would like follow-up communication about this feedback"
              description="We may contact you for clarification or updates"
              checked={formData?.followUp}
              onChange={(e) => handleInputChange('followUp', e?.target?.checked)}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
            className="mission-glow"
          >
            {isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>
      {/* Recent Feedback */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Your Recent Feedback</h3>
            <p className="text-sm text-muted-foreground">Track the status of your submissions</p>
          </div>
        </div>

        <div className="space-y-4">
          {recentFeedback?.map((feedback) => (
            <div key={feedback?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-medium text-card-foreground">{feedback?.title}</h5>
                    <div className={`flex items-center space-x-1 ${getStatusColor(feedback?.status)}`}>
                      <Icon name={getStatusIcon(feedback?.status)} size={14} />
                      <span className="text-xs capitalize">{feedback?.status?.replace('-', ' ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center space-x-1">
                      <Icon name="Tag" size={14} />
                      <span>{feedback?.type}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{new Date(feedback.date)?.toLocaleDateString()}</span>
                    </span>
                    {feedback?.rating && (
                      <span className="flex items-center space-x-1">
                        <Icon name="Star" size={14} />
                        <span>{feedback?.rating}/5</span>
                      </span>
                    )}
                  </div>

                  {feedback?.response && (
                    <div className="bg-muted/30 rounded-lg p-3 mt-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="MessageCircle" size={14} className="text-primary" />
                        <span className="text-sm font-medium text-primary">Response from QSAT Team</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{feedback?.response}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {recentFeedback?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No feedback submitted yet</p>
            <p className="text-sm text-muted-foreground">Your feedback history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackCollection;