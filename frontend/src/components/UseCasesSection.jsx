import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCases } from '../data/automationData';
import UseCaseCard from './UseCaseCard';
import FilterSidebar from './FilterSidebar';
import UseCaseModal from './UseCaseModal';
import { Filter, Grid3X3, List } from 'lucide-react';
import { Button } from './ui/button';

const UseCasesSection = () => {
  const [filters, setFilters] = useState({
    industry: 'all',
    difficulty: 'all',
    roi: 'all',
    minTimeSaved: 0
  });
  const [selectedCase, setSelectedCase] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const filteredCases = useMemo(() => {
    return useCases.filter(uc => {
      // Industry filter
      if (filters.industry !== 'all' && !uc.industry.includes(filters.industry)) {
        return false;
      }
      
      // Difficulty filter
      if (filters.difficulty !== 'all' && uc.implementation.difficulty !== filters.difficulty) {
        return false;
      }
      
      // ROI filter
      if (filters.roi !== 'all') {
        const roiNum = parseInt(uc.roiMetrics.roiMultiplier);
        if (filters.roi === '4-6' && (roiNum < 4 || roiNum > 6)) return false;
        if (filters.roi === '7-10' && (roiNum < 7 || roiNum > 10)) return false;
        if (filters.roi === '10+' && roiNum < 10) return false;
      }
      
      // Time saved filter
      const timeSaved = parseInt(uc.roiMetrics.timeSaved);
      if (timeSaved < filters.minTimeSaved) return false;
      
      return true;
    });
  }, [filters]);

  return (
    <section 
      id="use-cases"
      data-testid="use-cases-section"
      className="py-20 px-6 bg-[#f5f5f5]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-3"
            >
              15 Proven Use Cases
            </motion.h2>
            <p className="text-[#4a4a4a] max-w-xl">
              Real automation workflows with documented ROI. Filter by your industry and requirements.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Mobile filter button */}
            <Button
              data-testid="open-filters-mobile"
              variant="outline"
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden border-black/10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            
            {/* View toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-white rounded-lg p-1 border border-black/10">
              <button
                data-testid="view-grid"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-[#f5f5f5] text-[#1a1a1a]' : 'text-[#717171] hover:text-[#1a1a1a]'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                data-testid="view-list"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-[#f5f5f5] text-[#1a1a1a]' : 'text-[#717171] hover:text-[#1a1a1a]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            {/* Results count */}
            <span className="text-sm text-[#717171]">
              {filteredCases.length} results
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters}
            />
          </div>

          {/* Mobile Filter Modal */}
          {showMobileFilters && (
            <FilterSidebar 
              filters={filters} 
              setFilters={setFilters}
              onClose={() => setShowMobileFilters(false)}
              isMobile
            />
          )}

          {/* Use Cases Grid */}
          <div className="flex-1">
            {filteredCases.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-[#717171] text-lg">No use cases match your filters</p>
                <Button
                  variant="link"
                  onClick={() => setFilters({ industry: 'all', difficulty: 'all', roi: 'all', minTimeSaved: 0 })}
                  className="text-[#3B82F6] mt-2"
                >
                  Reset filters
                </Button>
              </motion.div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredCases.map((useCase, index) => (
                  <UseCaseCard
                    key={useCase.id}
                    useCase={useCase}
                    index={index}
                    onClick={() => setSelectedCase(useCase)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Use Case Modal */}
      {selectedCase && (
        <UseCaseModal 
          useCase={selectedCase} 
          onClose={() => setSelectedCase(null)} 
        />
      )}
    </section>
  );
};

export default UseCasesSection;
