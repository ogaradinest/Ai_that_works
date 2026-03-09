import { motion } from 'framer-motion';
import { heroStats } from '../data/automationData';
import { Zap, ArrowDown } from 'lucide-react';

const HeroSection = ({ onNavigate }) => {
  return (
    <section 
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBhdXRvbWF0ZWQlMjBmYWN0b3J5JTIwcm9ib3RpY3N8ZW58MHx8fHwxNzcyMDU4OTk2fDA&ixlib=rb-4.1.0&q=85')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/85 to-[#f5f5f5]" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-[#1a1a1a]">AI Automations</span>
            <br />
            <span className="gradient-text">that actually work</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#4a4a4a] max-w-2xl mx-auto mb-12">
            15 proven use cases with real ROI calculations. 
            Stop guessing, start automating.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.button
              data-testid="cta-explore-cases"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('use-cases')}
              className="px-8 py-4 bg-[#3B82F6] text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl hover:bg-[#2563EB] transition-all"
            >
              Explore Use Cases
            </motion.button>
            <motion.button
              data-testid="cta-calculate-roi"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('roi-calculator')}
              className="px-8 py-4 bg-white text-[#1a1a1a] rounded-full font-medium text-lg border border-black/10 shadow-sm hover:shadow-md transition-all"
            >
              Calculate ROI
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-black/5"
                data-testid={`hero-stat-${index}`}
              >
                <div className="metric-highlight text-[#1a1a1a] mb-2">
                  {stat.value}
                  <span className="text-[#3B82F6]">{stat.suffix}</span>
                </div>
                <div className="text-sm text-[#717171]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-[#717171]"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
