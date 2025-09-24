import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, projectCounts }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'All Projects': return 'Grid3X3';
      case 'Antenna Systems': return 'Radio';
      case 'Power Systems': return 'Battery';
      case 'Communication': return 'Wifi';
      case 'Sensors': return 'Gauge';
      case 'Structure': return 'Box';
      case 'Software': return 'Code';
      default: return 'Satellite';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2 text-primary" />
          Filter by Category
        </h3>
        {activeCategory !== 'All Projects' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCategoryChange('All Projects')}
            iconName="X"
          >
            Clear
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2">
        {categories?.map((category) => {
          const isActive = activeCategory === category;
          const count = projectCounts?.[category] || 0;
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex flex-col items-center p-3 rounded-lg border transition-all duration-200 ${
                isActive
                  ? 'bg-primary/20 border-primary/50 text-primary mission-glow' :'bg-background/50 border-border text-card-foreground hover:bg-muted/50 hover:border-muted-foreground/30'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                isActive ? 'bg-primary/30' : 'bg-muted/30'
              }`}>
                <Icon 
                  name={getCategoryIcon(category)} 
                  size={20} 
                  className={isActive ? 'text-primary' : 'text-muted-foreground'} 
                />
              </div>
              <span className="text-xs font-medium text-center leading-tight">
                {category}
              </span>
              <span className={`text-xs font-mono mt-1 ${
                isActive ? 'text-primary/80' : 'text-muted-foreground'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary font-mono">
              {Object.values(projectCounts)?.reduce((a, b) => a + b, 0) - (projectCounts?.['All Projects'] || 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Projects</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success font-mono">
              {categories?.length - 1}
            </div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning font-mono">
              24
            </div>
            <div className="text-xs text-muted-foreground">Students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;