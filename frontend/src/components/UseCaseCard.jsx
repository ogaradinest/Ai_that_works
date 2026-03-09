import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Badge } from './ui/badge';

const UseCaseCard = ({ useCase, index, onClick }) => {
  const IconComponent = Icons[useCase.icon] || Icons.Zap;
  
  const difficultyColors = {
    Easy: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Hard: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <motion.div
      data-testid={`use-case-card-${useCase.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="bg-white rounded-2xl p-6 cursor-pointer group shadow-sm border border-black/5 hover:shadow-lg transition-all"
    >
      {/* Icon and Title */}
      <div className="flex items-start gap-4 mb-4">
        <div 
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${useCase.color}15` }}
        >
          <IconComponent 
            className="w-6 h-6"
            style={{ color: useCase.color }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#3B82F6] transition-colors">
            {useCase.title}
          </h3>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs ${difficultyColors[useCase.implementation.difficulty]}`}
            >
              {useCase.implementation.difficulty}
            </Badge>
            <span className="text-xs text-[#717171]">
              {useCase.implementation.timeline}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#4a4a4a] mb-4 line-clamp-2">
        {useCase.description}
      </p>

      {/* ROI Metrics Mini Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-[#f5f5f5] rounded-lg p-3">
          <div className="text-lg font-bold text-[#10B981]">
            {useCase.roiMetrics.roiMultiplier}
          </div>
          <div className="text-xs text-[#717171]">ROI</div>
        </div>
        <div className="bg-[#f5f5f5] rounded-lg p-3">
          <div className="text-lg font-bold text-[#3B82F6]">
            {useCase.roiMetrics.timeSaved}
          </div>
          <div className="text-xs text-[#717171]">Time Saved</div>
        </div>
      </div>

      {/* Tools */}
      <div className="flex flex-wrap gap-1.5">
        {useCase.tools.slice(0, 3).map(tool => (
          <span 
            key={tool}
            className="px-2 py-1 text-xs bg-[#f5f5f5] rounded-full text-[#4a4a4a] border border-black/5"
          >
            {tool}
          </span>
        ))}
      </div>

      {/* Cost indicator */}
      <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
        <span className="text-xs text-[#717171]">Est. Cost</span>
        <span className="text-sm font-medium text-[#1a1a1a]">
          {useCase.implementation.cost}
        </span>
      </div>
    </motion.div>
  );
};

export default UseCaseCard;
