import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectGallery = ({ images, title }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images?.length);
  };

  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'ArrowRight') handleNext();
    if (e?.key === 'ArrowLeft') handlePrev();
    if (e?.key === 'Escape') setIsFullscreen(false);
  };

  React.useEffect(() => {
    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isFullscreen]);

  if (!images || images?.length === 0) {
    return (
      <div className="bg-muted/20 rounded-lg p-8 text-center">
        <Icon name="ImageOff" size={48} className="text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Main Image */}
        <div className="relative h-64 md:h-80 bg-muted/20">
          <Image
            src={images?.[currentImage]?.url}
            alt={images?.[currentImage]?.caption || `${title} - Image ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background/90 transition-all"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background/90 transition-all"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-2 right-2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background/90 transition-all"
          >
            <Icon name="Maximize2" size={16} />
          </button>

          {/* Image Counter */}
          {images?.length > 1 && (
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs font-mono text-foreground">
              {currentImage + 1} / {images?.length}
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images?.length > 1 && (
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2 overflow-x-auto">
              {images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImage
                      ? 'border-primary ring-2 ring-primary/20' :'border-border hover:border-muted-foreground'
                  }`}
                >
                  <Image
                    src={image?.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Image Caption */}
        {images?.[currentImage]?.caption && (
          <div className="px-4 pb-4">
            <p className="text-sm text-muted-foreground">
              {images?.[currentImage]?.caption}
            </p>
          </div>
        )}
      </div>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            <Image
              src={images?.[currentImage]?.url}
              alt={images?.[currentImage]?.caption || `${title} - Image ${currentImage + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
              iconName="X"
            />

            {/* Navigation in Fullscreen */}
            {images?.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background/90 transition-all"
                >
                  <Icon name="ChevronLeft" size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background/90 transition-all"
                >
                  <Icon name="ChevronRight" size={24} />
                </button>
              </>
            )}

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  {images?.[currentImage]?.caption && (
                    <p className="text-foreground font-medium mb-1">
                      {images?.[currentImage]?.caption}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground font-mono">
                    Image {currentImage + 1} of {images?.length}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="Download">
                    Download
                  </Button>
                  <Button variant="outline" size="sm" iconName="Share2">
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectGallery;