import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudentTestimonial = ({ testimonial, isExpanded = false, onToggleExpand }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // Video play logic would go here
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary/30">
      <div className="flex items-start space-x-4">
        <div className="relative flex-shrink-0">
          <Image
            src={testimonial?.student?.avatar}
            alt={testimonial?.student?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="GraduationCap" size={12} className="text-primary-foreground" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-lg font-semibold text-card-foreground">
                {testimonial?.student?.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {testimonial?.student?.school} • {testimonial?.student?.grade}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={`${
                    i < testimonial?.rating
                      ? 'text-warning fill-current' :'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className={`text-card-foreground leading-relaxed ${
              isExpanded ? '' : 'line-clamp-3'
            }`}>
              {testimonial?.content}
            </p>
            {testimonial?.content?.length > 200 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExpand}
                className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </div>

          {testimonial?.videoUrl && (
            <div className="mb-4">
              <div className="relative bg-muted/30 rounded-lg overflow-hidden">
                {!isPlaying ? (
                  <div className="relative h-32 flex items-center justify-center cursor-pointer" onClick={handlePlayVideo}>
                    <Image
                      src={testimonial?.videoThumbnail}
                      alt="Video thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mission-glow">
                        <Icon name="Play" size={20} className="text-primary-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center">
                    <span className="text-muted-foreground">Video Player Would Load Here</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">
                  {testimonial?.date}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {testimonial?.achievement}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" iconName="Heart">
                {testimonial?.likes}
              </Button>
              <Button variant="ghost" size="sm" iconName="Share2">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTestimonial;