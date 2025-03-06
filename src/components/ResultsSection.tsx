
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import RobotArmCard from "./RobotArmCard";
import { RobotArm } from '@/data/robotArms';
import { cn } from "@/lib/utils";

interface ResultsSectionProps {
  results: RobotArm[];
  onStartOver: () => void;
  className?: string;
}

const ResultsSection = ({ results, onStartOver, className }: ResultsSectionProps) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (results.length > 0 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
      
      // Add animation classes to each card with a delay
      const cards = resultsRef.current.querySelectorAll('.result-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('fade-in-section', 'is-visible');
        }, 300 * index);
      });
    }
  }, [results]);

  if (results.length === 0) return null;

  return (
    <div 
      ref={resultsRef}
      className={cn("py-16 px-4 transition-all duration-700", className)}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 staggered-reveal">
          <span className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Results Found
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Perfect Robot Arm Matches</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your requirements, we've identified these top matches for your specific needs.
            Each option offers unique strengths to consider.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {results.map((robotArm, index) => (
            <div key={robotArm.id} className="result-card opacity-0 transform translate-y-4">
              <RobotArmCard 
                robotArm={robotArm} 
                rank={index + 1} 
              />
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            className="rounded-full px-8"
            onClick={onStartOver}
          >
            Start Over
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8"
          >
            Compare All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
