import { useState } from 'react';
import { motion } from 'framer-motion';
import { implementationChecklist } from '../data/automationData';
import { CheckCircle2, Circle, Clock, ChevronRight } from 'lucide-react';
import { Progress } from './ui/progress';

const ImplementationChecklist = () => {
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [expandedPhase, setExpandedPhase] = useState(0);

  const totalTasks = implementationChecklist.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const completedCount = completedTasks.size;
  const progressPercent = (completedCount / totalTasks) * 100;

  const toggleTask = (phaseIndex, taskIndex) => {
    const taskId = `${phaseIndex}-${taskIndex}`;
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const phaseColors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <section 
      id="checklist"
      data-testid="implementation-checklist-section"
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4">
            Implementation Checklist
          </h2>
          <p className="text-[#4a4a4a] max-w-xl mx-auto">
            A 6-week roadmap to successful AI automation. Track your progress interactively.
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#f5f5f5] rounded-2xl p-6 mb-8 border border-black/5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-[#717171] mb-1">Overall Progress</div>
              <div className="text-2xl font-bold text-[#1a1a1a]">
                {completedCount} / {totalTasks} tasks
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-[#10B981]">
                {progressPercent.toFixed(0)}%
              </div>
              <div className="text-sm text-[#717171]">Complete</div>
            </div>
          </div>
          <Progress value={progressPercent} className="h-3" />
        </motion.div>

        {/* Timeline View */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-black/10 hidden sm:block" />

          {/* Phases */}
          {implementationChecklist.map((phase, phaseIndex) => {
            const phaseTasks = phase.tasks.map((_, i) => `${phaseIndex}-${i}`);
            const phaseCompleted = phaseTasks.filter(id => completedTasks.has(id)).length;
            const isExpanded = expandedPhase === phaseIndex;

            return (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: phaseIndex * 0.1 }}
                className="relative mb-4"
              >
                {/* Phase Header */}
                <button
                  data-testid={`phase-${phaseIndex}`}
                  onClick={() => setExpandedPhase(isExpanded ? -1 : phaseIndex)}
                  className="w-full relative z-10"
                >
                  <div 
                    className={`bg-white rounded-2xl p-6 transition-all border shadow-sm ${
                      isExpanded ? 'border-black/20 shadow-md' : 'border-black/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Phase number */}
                      <div 
                        className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
                        style={{ backgroundColor: phaseColors[phaseIndex] }}
                      >
                        {phaseIndex + 1}
                      </div>

                      {/* Phase info */}
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-[#1a1a1a]">
                            {phase.phase}
                          </h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-[#f5f5f5] text-[#717171]">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {phase.duration}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={(phaseCompleted / phase.tasks.length) * 100} 
                            className="h-1.5 w-32"
                          />
                          <span className="text-xs text-[#717171]">
                            {phaseCompleted}/{phase.tasks.length}
                          </span>
                        </div>
                      </div>

                      {/* Expand indicator */}
                      <ChevronRight 
                        className={`w-5 h-5 text-[#717171] transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {/* Tasks List */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <div className="pl-4 sm:pl-16 pr-4 pt-4 space-y-2">
                    {phase.tasks.map((task, taskIndex) => {
                      const taskId = `${phaseIndex}-${taskIndex}`;
                      const isCompleted = completedTasks.has(taskId);

                      return (
                        <button
                          key={taskIndex}
                          data-testid={`task-${phaseIndex}-${taskIndex}`}
                          onClick={() => toggleTask(phaseIndex, taskIndex)}
                          className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                            isCompleted 
                              ? 'bg-[#10B981]/10 border border-[#10B981]/20' 
                              : 'bg-[#f5f5f5] border border-transparent hover:bg-[#e5e5e5]'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#717171] flex-shrink-0" />
                          )}
                          <span className={`text-sm text-left ${
                            isCompleted ? 'text-[#10B981]' : 'text-[#4a4a4a]'
                          }`}>
                            {task}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion Message */}
        {progressPercent === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 rounded-2xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}
          >
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
              Congratulations!
            </h3>
            <p className="text-[#4a4a4a]">
              You've completed the implementation checklist. Your automation journey begins!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ImplementationChecklist;
