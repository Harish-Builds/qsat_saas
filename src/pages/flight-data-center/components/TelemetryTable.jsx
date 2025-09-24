import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TelemetryTable = ({ data, title }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data]?.sort((a, b) => {
    const aVal = a?.[sortField];
    const bVal = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const getSortIcon = (field) => {
    if (sortField !== field) return 'ArrowUpDown';
    return sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'nominal': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Database" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-success">LIVE FEED</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Timestamp</span>
                  <Icon name={getSortIcon('timestamp')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('parameter')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Parameter</span>
                  <Icon name={getSortIcon('parameter')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('value')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Value</span>
                  <Icon name={getSortIcon('value')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('unit')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Unit</span>
                  <Icon name={getSortIcon('unit')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-card-foreground hover:text-primary transition-colors"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row, index) => (
              <tr key={index} className="border-t border-border hover:bg-muted/20 transition-colors">
                <td className="p-4 font-mono text-sm text-card-foreground">{row?.timestamp}</td>
                <td className="p-4 text-sm text-card-foreground">{row?.parameter}</td>
                <td className="p-4 font-mono text-sm text-card-foreground">{row?.value}</td>
                <td className="p-4 text-sm text-muted-foreground">{row?.unit}</td>
                <td className="p-4">
                  <span className={`text-sm font-medium ${getStatusColor(row?.status)}`}>
                    {row?.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="p-4 border-t border-border flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData?.length)} of {sortedData?.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            <span className="text-sm text-card-foreground px-3 py-1">
              {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              iconName="ChevronRight"
              iconPosition="right"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TelemetryTable;