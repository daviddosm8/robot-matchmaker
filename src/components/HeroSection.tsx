
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      // Calculate center of the element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center
      const distanceX = (clientX - centerX) / 40;
      const distanceY = (clientY - centerY) / 40;
      
      // Apply the parallax effect to the background
      if (heroRef.current) {
        heroRef.current.style.setProperty('--move-x', `${distanceX}px`);
        heroRef.current.style.setProperty('--move-y', `${distanceY}px`);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{
        perspective: '1000px',
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div
        className="absolute top-1/4 -left-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl"
        style={{
          transform: 'translate(calc(var(--move-x, 0) * -1), calc(var(--move-y, 0) * -1))',
          transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      />
      <div
        className="absolute bottom-1/4 -right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"
        style={{
          transform: 'translate(calc(var(--move-x, 0)), calc(var(--move-y, 0)))',
          transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="staggered-reveal max-w-4xl mx-auto text-center">
          <span className="inline-block mb-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Robotic Automation Simplified
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Find Your Perfect <span className="text-gradient">Robot Arm</span> Solution
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto text-balance">
            Answer a few questions about your requirements and we'll match you with the ideal robot arm for your specific needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 transition-all duration-300 shadow-md hover:shadow-lg"
              onClick={() => document.getElementById('requirements-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Find My Match
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-300 hover:bg-gray-100 rounded-full px-8 transition-all duration-300"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Robot Arm Visualization - Removed placeholder text */}
        <div 
          className="mt-16 max-w-3xl mx-auto relative animate-float"
          style={{
            transform: 'translate3d(calc(var(--move-x, 0) * 0.5), calc(var(--move-y, 0) * 0.5), 0)',
            transition: 'transform 0.2s cubic-bezier(0.33, 1, 0.68, 1)',
          }}
        >
          <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-xl">
            {/* Empty space where the placeholder was previously */}
          </div>
          
          {/* Floating Details */}
          <div className="absolute -right-4 sm:right-4 top-4 glass-card p-3 rounded-lg shadow-lg animate-pulse-soft">
            <div className="text-sm font-medium text-gray-800">Precision</div>
            <div className="text-xs text-gray-600">±0.1mm accuracy</div>
          </div>
          
          <div className="absolute -left-4 sm:left-4 bottom-4 glass-card p-3 rounded-lg shadow-lg animate-pulse-soft" style={{ animationDelay: '1s' }}>
            <div className="text-sm font-medium text-gray-800">Speed</div>
            <div className="text-xs text-gray-600">Up to 5m/s</div>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70">
          <span className="text-xs font-medium text-gray-500">Scroll Down</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
