import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Clock, DollarSign, Sparkles } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    hoursPerTask: 5,
    tasksPerWeek: 10,
    hourlyRate: 50,
    automationEfficiency: 80,
    toolCost: 100
  });

  const results = useMemo(() => {
    const currentMonthlyCost = inputs.hoursPerTask * inputs.tasksPerWeek * inputs.hourlyRate * 4;
    const timeSaved = (inputs.hoursPerTask * inputs.tasksPerWeek * (inputs.automationEfficiency / 100)) * 4;
    const moneySaved = timeSaved * inputs.hourlyRate;
    const netSavings = moneySaved - inputs.toolCost;
    const roi = inputs.toolCost > 0 ? ((netSavings / inputs.toolCost) * 100).toFixed(0) : 0;
    const paybackDays = inputs.toolCost > 0 ? Math.ceil(inputs.toolCost / (netSavings / 30)) : 0;
    
    return {
      currentMonthlyCost,
      timeSaved,
      moneySaved,
      netSavings,
      roi,
      paybackDays
    };
  }, [inputs]);

  return (
    <section 
      id="roi-calculator"
      data-testid="roi-calculator-section"
      className="py-20 px-6 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1752614671052-92e18f534db1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBhdXRvbWF0ZWQlMjBmYWN0b3J5JTIwcm9ib3RpY3N8ZW58MHx8fHwxNzcyMDU4OTk2fDA&ixlib=rb-4.1.0&q=85')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#1a1a1a]/95 to-[#1a1a1a]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-6">
            <Calculator className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm text-[#10B981]">Interactive Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-[#A1A1AA] max-w-xl mx-auto">
            Enter your numbers to see potential savings from AI automation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
              Your Current Workflow
            </h3>

            <div className="space-y-6">
              {/* Hours per task */}
              <div>
                <Label className="text-[#A1A1AA] mb-3 block">
                  Hours spent per task
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    data-testid="input-hours-per-task"
                    value={[inputs.hoursPerTask]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, hoursPerTask: value }))}
                    max={20}
                    min={1}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-white font-mono">
                    {inputs.hoursPerTask}h
                  </span>
                </div>
              </div>

              {/* Tasks per week */}
              <div>
                <Label className="text-[#A1A1AA] mb-3 block">
                  Tasks per week
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    data-testid="input-tasks-per-week"
                    value={[inputs.tasksPerWeek]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, tasksPerWeek: value }))}
                    max={50}
                    min={1}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-white font-mono">
                    {inputs.tasksPerWeek}
                  </span>
                </div>
              </div>

              {/* Hourly rate */}
              <div>
                <Label className="text-[#A1A1AA] mb-3 block">
                  Employee hourly rate ($)
                </Label>
                <Input
                  data-testid="input-hourly-rate"
                  type="number"
                  value={inputs.hourlyRate}
                  onChange={e => setInputs(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              {/* Automation efficiency */}
              <div>
                <Label className="text-[#A1A1AA] mb-3 block">
                  Automation efficiency (%)
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    data-testid="input-efficiency"
                    value={[inputs.automationEfficiency]}
                    onValueChange={([value]) => setInputs(prev => ({ ...prev, automationEfficiency: value }))}
                    max={100}
                    min={10}
                    step={5}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-white font-mono">
                    {inputs.automationEfficiency}%
                  </span>
                </div>
              </div>

              {/* Tool cost */}
              <div>
                <Label className="text-[#A1A1AA] mb-3 block">
                  Monthly tool cost ($)
                </Label>
                <Input
                  data-testid="input-tool-cost"
                  type="number"
                  value={inputs.toolCost}
                  onChange={e => setInputs(prev => ({ ...prev, toolCost: Number(e.target.value) }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main ROI Card */}
            <div 
              className="rounded-3xl p-8 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
            >
              <div className="text-sm text-[#A1A1AA] uppercase tracking-wider mb-2">
                Your Projected ROI
              </div>
              <div 
                className="text-6xl sm:text-7xl font-bold mb-2"
                style={{ color: results.roi >= 100 ? '#10B981' : results.roi >= 50 ? '#F59E0B' : '#EF4444' }}
                data-testid="roi-result"
              >
                {results.roi}%
              </div>
              <div className="text-[#52525B]">
                Return on Investment
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-2xl p-6" data-testid="result-time-saved">
                <Clock className="w-8 h-8 text-[#3B82F6] mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {results.timeSaved.toFixed(0)}h
                </div>
                <div className="text-sm text-[#52525B]">Hours saved/month</div>
              </div>

              <div className="glass-card rounded-2xl p-6" data-testid="result-money-saved">
                <DollarSign className="w-8 h-8 text-[#10B981] mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  ${results.moneySaved.toLocaleString()}
                </div>
                <div className="text-sm text-[#52525B]">Savings/month</div>
              </div>

              <div className="glass-card rounded-2xl p-6" data-testid="result-net-savings">
                <TrendingUp className="w-8 h-8 text-[#8B5CF6] mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  ${results.netSavings.toLocaleString()}
                </div>
                <div className="text-sm text-[#52525B]">Net savings/month</div>
              </div>

              <div className="glass-card rounded-2xl p-6" data-testid="result-payback">
                <Calculator className="w-8 h-8 text-[#F59E0B] mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  {results.paybackDays > 0 ? `${results.paybackDays}d` : '∞'}
                </div>
                <div className="text-sm text-[#52525B]">Payback period</div>
              </div>
            </div>

            {/* Annual projection */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#52525B] mb-1">Annual Savings Projection</div>
                  <div className="text-2xl font-bold text-[#10B981]">
                    ${(results.netSavings * 12).toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-[#52525B] mb-1">Current Annual Cost</div>
                  <div className="text-2xl font-bold text-[#EF4444]">
                    ${(results.currentMonthlyCost * 12).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
