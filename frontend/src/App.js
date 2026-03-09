import { useState, useEffect, useCallback } from "react";
import "@/App.css";
import HeroSection from "./components/HeroSection";
import UseCasesSection from "./components/UseCasesSection";
import ROICalculator from "./components/ROICalculator";
import ToolComparison from "./components/ToolComparison";
import ImplementationChecklist from "./components/ImplementationChecklist";
import FloatingNav from "./components/FloatingNav";
import { Toaster } from "./components/ui/sonner";

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavigate = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = ['use-cases', 'roi-calculator', 'tools', 'checklist'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      
      if (window.scrollY < 400) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]" data-testid="app-container">
      <HeroSection onNavigate={handleNavigate} />
      <UseCasesSection />
      <ROICalculator />
      <ToolComparison />
      <ImplementationChecklist />
      <FloatingNav activeSection={activeSection} onNavigate={handleNavigate} />
      <Toaster />
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5" data-testid="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#52525B] text-sm">
            AI Automation Guide for SMBs • 2025
          </p>
          <p className="text-[#3B82F6] text-xs mt-2">
            Built for service & manufacturing businesses
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
