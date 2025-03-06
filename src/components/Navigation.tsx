
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when changing routes
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "py-2 glass-bg border-b border-gray-200/50" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-xl font-bold text-primary">RoboMatch</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              location.pathname === "/" && "text-primary"
            )}
          >
            Home
            {location.pathname === "/" && (
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
            )}
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            How It Works
          </a>
          <a 
            href="#features" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </a>
          <a 
            href="#contact" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span 
            className={cn(
              "w-6 h-0.5 bg-foreground transition-transform duration-300",
              isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
            )} 
          />
          <span 
            className={cn(
              "w-6 h-0.5 bg-foreground transition-opacity duration-300",
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            )} 
          />
          <span 
            className={cn(
              "w-6 h-0.5 bg-foreground transition-transform duration-300",
              isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            )} 
          />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "md:hidden absolute w-full bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-64 py-4" : "max-h-0 py-0"
        )}
      >
        <nav className="container mx-auto px-4 flex flex-col space-y-4">
          <a 
            href="/" 
            className={cn(
              "text-sm font-medium py-2 transition-colors hover:text-primary",
              location.pathname === "/" && "text-primary"
            )}
          >
            Home
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium py-2 transition-colors hover:text-primary"
          >
            How It Works
          </a>
          <a 
            href="#features" 
            className="text-sm font-medium py-2 transition-colors hover:text-primary"
          >
            Features
          </a>
          <a 
            href="#contact" 
            className="text-sm font-medium py-2 transition-colors hover:text-primary"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
