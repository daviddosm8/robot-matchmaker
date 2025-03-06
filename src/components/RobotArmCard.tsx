
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RobotArm } from '@/data/robotArms';
import { formatCurrency } from '@/utils/matchingLogic';
import { cn } from "@/lib/utils";

interface RobotArmCardProps {
  robotArm: RobotArm;
  rank: number;
  className?: string;
}

const RobotArmCard = ({ robotArm, rank, className }: RobotArmCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transition-all duration-500 hover-scale",
        isExpanded ? "max-h-[1000px]" : "max-h-[450px]",
        className
      )}
    >
      {/* Rank Indicator */}
      <div className="absolute top-4 left-4 z-10 bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg border border-gray-100">
        <span className="font-bold text-primary">{rank}</span>
      </div>
      
      {/* Image Section */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Robot Arm Image</div>
        </div>
        
        {/* Highlights */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {robotArm.payload}kg Payload
          </span>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            ±{robotArm.precision}mm Precision
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold">{robotArm.name}</h3>
            <p className="text-sm text-gray-600">{robotArm.manufacturer}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold">
              {formatCurrency(robotArm.price.min)} - {formatCurrency(robotArm.price.max)}
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{robotArm.description}</p>
        
        {/* Specifications */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div className="text-xs">
            <span className="text-gray-500">Reach:</span>{" "}
            <span className="font-medium">{robotArm.reach}mm</span>
          </div>
          <div className="text-xs">
            <span className="text-gray-500">Speed:</span>{" "}
            <span className="font-medium">{robotArm.speed}/10</span>
          </div>
          <div className="text-xs col-span-2">
            <span className="text-gray-500">Applications:</span>{" "}
            <span className="font-medium">{robotArm.applications.join(", ")}</span>
          </div>
        </div>
        
        {/* Expanded Content */}
        <div className={cn(
          "overflow-hidden transition-all duration-500",
          isExpanded ? "opacity-100 max-h-[500px] mt-4" : "opacity-0 max-h-0"
        )}>
          <h4 className="text-sm font-semibold mb-2">Key Features</h4>
          <ul className="text-xs text-gray-700 space-y-1 mb-4">
            {robotArm.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </Button>
          
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white text-xs"
          >
            Request Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RobotArmCard;
