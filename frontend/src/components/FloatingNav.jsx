import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Calculator, Wrench, CheckSquare, ArrowUp } from 'lucide-react';

const FloatingNav = ({ activeSection, onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
      setShowScrollTop(window.scrollY > 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'use-cases', label: 'Use Cases', icon: LayoutGrid },
    { id: 'roi-calculator', label: 'ROI', icon: Calculator },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'checklist', label: 'Checklist', icon: CheckSquare }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          data-testid="floating-nav"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#222222]/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
            {navItems.map(item => (
              <button
                key={item.id}
                data-testid={`nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  activeSection === item.id
                    ? 'bg-[#3B82F6] text-white'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">
                  {item.label}
                </span>
              </button>
            ))}

            {/* Scroll to top button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={scrollToTop}
                  className="ml-2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  data-testid="scroll-to-top"
                >
                  <ArrowUp className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
