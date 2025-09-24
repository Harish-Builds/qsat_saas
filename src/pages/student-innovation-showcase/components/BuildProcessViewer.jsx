import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BuildProcessViewer = ({ buildProcess, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNextStep = () => {
    if (currentStep < buildProcess?.steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = buildProcess?.steps?.[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">
              {buildProcess?.title}
            </h2>
            <p className="text-muted-foreground">
              Step {currentStep + 1} of {buildProcess?.steps?.length}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} iconName="X" />
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Estimated time: {buildProcess?.totalTime}
            </span>
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / buildProcess?.steps?.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Media Section */}
            <div className="space-y-4">
              <div className="relative bg-muted/30 rounded-lg overflow-hidden h-64">
                {currentStepData?.videoUrl && !isPlaying ? (
                  <div className="relative h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
                    <Image
                      src={currentStepData?.thumbnail}
                      alt={`Step ${currentStep + 1} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mission-glow">
                        <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                ) : currentStepData?.videoUrl && isPlaying ? (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-muted-foreground">Video Player Would Load Here</span>
                  </div>
                ) : (
                  <Image
                    src={currentStepData?.image}
                    alt={`Step ${currentStep + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Tools Required */}
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-card-foreground mb-2 flex items-center">
                  <Icon name="Wrench" size={16} className="mr-2" />
                  Tools Required
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentStepData?.tools?.map((tool, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-background/50 rounded text-xs text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">
                  {currentStepData?.title}
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {currentStepData?.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="AlertTriangle" size={14} className="text-warning" />
                    <span className="text-sm text-warning">
                      {currentStepData?.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-card-foreground leading-relaxed mb-4">
                  {currentStepData?.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-card-foreground">Instructions:</h4>
                  <ol className="space-y-2">
                    {currentStepData?.instructions?.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="flex-shrink-0 w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-mono">
                          {index + 1}
                        </span>
                        <span className="text-sm text-card-foreground">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {currentStepData?.tips && (
                  <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                      <div>
                        <h5 className="text-sm font-semibold text-accent mb-1">Pro Tip:</h5>
                        <p className="text-sm text-card-foreground">{currentStepData?.tips}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous Step
          </Button>

          <div className="flex items-center space-x-2">
            {buildProcess?.steps?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-primary'
                    : index < currentStep
                    ? 'bg-success' :'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button
            variant="default"
            onClick={handleNextStep}
            disabled={currentStep === buildProcess?.steps?.length - 1}
            iconName="ChevronRight"
            iconPosition="right"
          >
            {currentStep === buildProcess?.steps?.length - 1 ? 'Complete' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuildProcessViewer;