import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportCard = ({ report, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload(report);
      // Simulate download delay
      setTimeout(() => {
        setIsDownloading(false);
      }, 2000);
    } catch (error) {
      setIsDownloading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'technical': return 'FileText';
      case 'performance': return 'BarChart3';
      case 'telemetry': return 'Radio';
      case 'analysis': return 'PieChart';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'technical': return 'text-blue-400 bg-blue-400/20';
      case 'performance': return 'text-green-400 bg-green-400/20';
      case 'telemetry': return 'text-purple-400 bg-purple-400/20';
      case 'analysis': return 'text-orange-400 bg-orange-400/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(report?.type)}`}>
            <Icon name={getTypeIcon(report?.type)} size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-card-foreground mb-1">{report?.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{report?.date}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="FileText" size={14} />
                <span>{report?.pages} pages</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Download" size={14} />
                <span>{report?.downloads} downloads</span>
              </span>
            </div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-mono ${getTypeColor(report?.type)}`}>
          {report?.type?.toUpperCase()}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{report?.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Size:</span>
          <span className="text-xs font-mono text-card-foreground">{report?.size}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Format:</span>
          <span className="text-xs font-mono text-card-foreground">{report?.format}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            className="text-xs"
          >
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            loading={isDownloading}
            iconName="Download"
            iconPosition="left"
            onClick={handleDownload}
            className="text-xs"
          >
            {isDownloading ? 'Downloading...' : 'Download'}
          </Button>
        </div>
      </div>
      {report?.tags && report?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-border">
          {report?.tags?.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-muted/30 text-xs font-mono text-muted-foreground rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportCard;