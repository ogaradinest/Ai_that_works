import { useState } from 'react';
import { motion } from 'framer-motion';
import { tools } from '../data/automationData';
import { Star, ExternalLink, Check, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

const ToolComparison = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'LLM', 'Automation', 'Voice AI', 'Vision AI', 'AI Platform'];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category === selectedCategory);

  const ToolCard = ({ tool, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-2xl p-6 group"
      data-testid={`tool-card-${tool.name.toLowerCase().replace(/\s/g, '-')}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {tool.logo ? (
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
              <img 
                src={tool.logo} 
                alt={tool.name}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="text-lg font-bold" style="color: ${tool.color}">${tool.name[0]}</span>`;
                }}
              />
            </div>
          ) : (
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold"
              style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
            >
              {tool.name[0]}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-[#3B82F6] transition-colors">
              {tool.name}
            </h3>
            <Badge variant="outline" className="text-xs text-[#52525B] border-white/10">
              {tool.category}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[#F59E0B]">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{tool.rating}</span>
        </div>
      </div>

      {/* Best For */}
      <div className="mb-4">
        <div className="text-xs text-[#52525B] uppercase tracking-wider mb-2">Best For</div>
        <div className="flex flex-wrap gap-2">
          {tool.bestFor.map(item => (
            <span 
              key={item}
              className="px-2 py-1 text-xs rounded-full bg-white/5 text-[#A1A1AA]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div className="border-t border-white/5 pt-4">
        <div className="text-xs text-[#52525B] uppercase tracking-wider mb-3">Pricing</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-xs text-[#52525B] mb-1">Free</div>
            <div className="text-sm font-medium text-white">
              {tool.pricing.free ? (
                <Check className="w-4 h-4 text-[#10B981] mx-auto" />
              ) : (
                <X className="w-4 h-4 text-[#52525B] mx-auto" />
              )}
            </div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-xs text-[#52525B] mb-1">Starter</div>
            <div className="text-sm font-medium text-white">{tool.pricing.starter}</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-xs text-[#52525B] mb-1">Pro</div>
            <div className="text-sm font-medium text-white">{tool.pricing.pro}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section 
      id="tools"
      data-testid="tool-comparison-section"
      className="py-20 px-6 bg-[#222222]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tool Comparison Guide
          </h2>
          <p className="text-[#A1A1AA] max-w-xl mx-auto">
            Compare pricing, features, and ratings of the top AI automation tools
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white/5 rounded-full">
            {categories.map(cat => (
              <button
                key={cat}
                data-testid={`tool-category-${cat}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Tools' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool, index) => (
            <ToolCard key={tool.name} tool={tool} index={index} />
          ))}
        </div>

        {/* Comparison Table for Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 hidden lg:block"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Quick Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-medium text-[#52525B]">Tool</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-[#52525B]">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-[#52525B]">Free Tier</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-[#52525B]">Starting Price</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-[#52525B]">Rating</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-[#52525B]">Best For</th>
                </tr>
              </thead>
              <tbody>
                {tools.map(tool => (
                  <tr 
                    key={tool.name} 
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                          style={{ backgroundColor: `${tool.color}20`, color: tool.color }}
                        >
                          {tool.name[0]}
                        </div>
                        <span className="text-white font-medium">{tool.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#A1A1AA]">{tool.category}</td>
                    <td className="py-4 px-4">
                      {tool.pricing.free ? (
                        <Check className="w-5 h-5 text-[#10B981]" />
                      ) : (
                        <X className="w-5 h-5 text-[#52525B]" />
                      )}
                    </td>
                    <td className="py-4 px-4 text-white">{tool.pricing.starter}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-[#F59E0B]">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{tool.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#A1A1AA] text-sm">
                      {tool.bestFor.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolComparison;
