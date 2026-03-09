import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { X, Clock, DollarSign, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const UseCaseModal = ({ useCase, onClose }) => {
  const IconComponent = Icons[useCase.icon] || Icons.Zap;
  
  const difficultyProgress = {
    Easy: 33,
    Medium: 66,
    Hard: 100
  };

  const difficultyColors = {
    Easy: '#10B981',
    Medium: '#F59E0B',
    Hard: '#EF4444'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      data-testid="use-case-modal-overlay"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-black/10 shadow-2xl"
        data-testid={`use-case-modal-${useCase.id}`}
      >
        {/* Header with gradient */}
        <div 
          className="relative p-8 pb-12"
          style={{
            background: `linear-gradient(135deg, ${useCase.color}10 0%, transparent 100%)`
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            data-testid="close-modal"
          >
            <X className="w-5 h-5 text-[#4a4a4a]" />
          </button>

          <div className="flex items-start gap-5">
            <div 
              className="p-4 rounded-2xl"
              style={{ backgroundColor: `${useCase.color}15` }}
            >
              <IconComponent 
                className="w-10 h-10"
                style={{ color: useCase.color }}
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-2">
                {useCase.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {useCase.industry.map(ind => (
                  <Badge key={ind} variant="secondary" className="bg-[#f5f5f5] text-[#4a4a4a]">
                    {ind === 'service' ? 'Service' : 'Manufacturing'}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-8 space-y-8">
          {/* Description */}
          <p className="text-lg text-[#4a4a4a] leading-relaxed">
            {useCase.description}
          </p>

          {/* ROI Metrics Infographic */}
          <div className="bg-[#f5f5f5] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-[#717171] uppercase tracking-wider mb-4">
              ROI Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <TrendingUp className="w-6 h-6 text-[#10B981] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#10B981]">
                  {useCase.roiMetrics.roiMultiplier}
                </div>
                <div className="text-xs text-[#717171]">ROI Multiplier</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Clock className="w-6 h-6 text-[#3B82F6] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#3B82F6]">
                  {useCase.roiMetrics.timeSaved}
                </div>
                <div className="text-xs text-[#717171]">Time Saved</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <DollarSign className="w-6 h-6 text-[#8B5CF6] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#8B5CF6]">
                  {useCase.roiMetrics.costReduction}
                </div>
                <div className="text-xs text-[#717171]">Cost Reduction</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                <Zap className="w-6 h-6 text-[#F59E0B] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#F59E0B]">
                  {useCase.roiMetrics.paybackPeriod}
                </div>
                <div className="text-xs text-[#717171]">Payback Period</div>
              </div>
            </div>
          </div>

          {/* Implementation Details */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <h3 className="text-sm font-medium text-[#717171] uppercase tracking-wider mb-4">
                Implementation
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#4a4a4a]">Difficulty</span>
                    <span 
                      className="font-medium"
                      style={{ color: difficultyColors[useCase.implementation.difficulty] }}
                    >
                      {useCase.implementation.difficulty}
                    </span>
                  </div>
                  <Progress 
                    value={difficultyProgress[useCase.implementation.difficulty]} 
                    className="h-2"
                  />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#4a4a4a]">Timeline</span>
                  <span className="text-sm text-[#1a1a1a] font-medium">
                    {useCase.implementation.timeline}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#4a4a4a]">Monthly Cost</span>
                  <span className="text-sm text-[#1a1a1a] font-medium">
                    {useCase.implementation.cost}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#f5f5f5] rounded-2xl p-6">
              <h3 className="text-sm font-medium text-[#717171] uppercase tracking-wider mb-4">
                Recommended Tools
              </h3>
              <div className="space-y-3">
                {useCase.tools.map(tool => (
                  <div 
                    key={tool}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-[#10B981]" />
                    <span className="text-[#1a1a1a]">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Start Steps */}
          <div className="bg-[#f5f5f5] rounded-2xl p-6">
            <h3 className="text-sm font-medium text-[#717171] uppercase tracking-wider mb-4">
              Quick Start Steps
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { step: 1, title: 'Choose Tool', desc: `Start with ${useCase.tools[0]}` },
                { step: 2, title: 'Configure', desc: 'Set up workflows and integrations' },
                { step: 3, title: 'Test & Scale', desc: 'Pilot, then expand across team' }
              ].map(item => (
                <div key={item.step} className="flex gap-3">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
                    style={{ backgroundColor: useCase.color }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#1a1a1a]">{item.title}</div>
                    <div className="text-xs text-[#717171]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button
            data-testid="modal-get-started"
            className="w-full py-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl text-lg font-medium shadow-lg"
          >
            Get Started with {useCase.title}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UseCaseModal;
