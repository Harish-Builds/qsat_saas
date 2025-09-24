import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterPanel = ({ 
  searchTerm, 
  onSearchChange, 
  selectedMission, 
  onMissionChange, 
  selectedType, 
  onTypeChange, 
  dateRange, 
  onDateRangeChange,
  onClearFilters,
  missions,
  reportTypes 
}) => {
  const hasActiveFilters = searchTerm || selectedMission || selectedType || dateRange?.start || dateRange?.end;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground">Filter Reports</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            className="text-muted-foreground hover:text-card-foreground"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Search Reports</label>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>
        </div>

        {/* Mission Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Mission</label>
          <select
            value={selectedMission}
            onChange={(e) => onMissionChange(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Missions</option>
            {missions?.map((mission) => (
              <option key={mission?.id} value={mission?.id}>
                {mission?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Report Type Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Report Type</label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-md text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Types</option>
            {reportTypes?.map((type) => (
              <option key={type} value={type}>
                {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Date Range</label>
          <div className="flex space-x-2">
            <Input
              type="date"
              value={dateRange?.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
              className="flex-1"
            />
            <Input
              type="date"
              value={dateRange?.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Filter" size={14} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full flex items-center space-x-1">
                <span>Search: "{searchTerm}"</span>
                <button onClick={() => onSearchChange('')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {selectedMission && (
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full flex items-center space-x-1">
                <span>Mission: {missions?.find(m => m?.id === selectedMission)?.name}</span>
                <button onClick={() => onMissionChange('')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {selectedType && (
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full flex items-center space-x-1">
                <span>Type: {selectedType}</span>
                <button onClick={() => onTypeChange('')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {(dateRange?.start || dateRange?.end) && (
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full flex items-center space-x-1">
                <span>
                  Date: {dateRange?.start || 'Start'} - {dateRange?.end || 'End'}
                </span>
                <button onClick={() => onDateRangeChange({ start: '', end: '' })}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;