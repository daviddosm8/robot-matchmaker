
import { RobotArm, robotArms } from "../data/robotArms";

export interface UserRequirements {
  application: string;
  payloadNeeded: number;
  reachNeeded: number;
  precisionNeeded: number;
  speedImportance: number; // 1-5
  budgetMax: number;
}

// Calculate match score for each robot arm based on user requirements
export const findMatchingRobotArms = (requirements: UserRequirements): RobotArm[] => {
  // Apply initial filtering
  const filteredArms = robotArms.filter(arm => {
    // Hard requirements - must meet these
    const meetsPayload = arm.payload >= requirements.payloadNeeded;
    const meetsReach = arm.reach >= requirements.reachNeeded;
    const meetsPrecision = arm.precision <= requirements.precisionNeeded; // Lower is better for precision
    const meetsBudget = arm.price.min <= requirements.budgetMax;
    const supportsApplication = arm.applications.some(app => 
      app.toLowerCase().includes(requirements.application.toLowerCase()) || 
      requirements.application.toLowerCase().includes(app.toLowerCase())
    );
    
    return meetsPayload && meetsReach && meetsPrecision && meetsBudget && (supportsApplication || requirements.application === "");
  });

  // If no arms pass the filtering, relax constraints and try again
  let matchingArms = filteredArms.length > 0 ? filteredArms : relaxConstraints(requirements);

  // Score the matching arms
  const scoredArms = matchingArms.map(arm => {
    let score = 0;
    
    // Payload score (closer to requirement without going under is better)
    const payloadRatio = arm.payload / requirements.payloadNeeded;
    score += payloadRatio >= 1 && payloadRatio <= 1.5 ? 10 : 
             payloadRatio > 1.5 && payloadRatio <= 2 ? 8 : 
             payloadRatio > 2 ? 5 : 0;
    
    // Reach score (closer to requirement without going under is better)
    const reachRatio = arm.reach / requirements.reachNeeded;
    score += reachRatio >= 1 && reachRatio <= 1.3 ? 10 : 
             reachRatio > 1.3 && reachRatio <= 1.6 ? 8 : 
             reachRatio > 1.6 ? 5 : 0;
    
    // Precision score (better than required is good)
    const precisionRatio = requirements.precisionNeeded / arm.precision; // Inverted because lower is better
    score += precisionRatio >= 2 ? 15 :
             precisionRatio >= 1.5 ? 12 :
             precisionRatio >= 1 ? 10 : 5;
    
    // Speed score (weighted by importance)
    score += (arm.speed / 10) * requirements.speedImportance * 2;
    
    // Budget score (lower is better)
    const budgetRatio = requirements.budgetMax / arm.price.max;
    score += budgetRatio >= 2 ? 15 :
             budgetRatio >= 1.5 ? 12 :
             budgetRatio >= 1.2 ? 8 :
             budgetRatio >= 1 ? 5 : 0;
    
    // Application match score
    const directApplicationMatch = arm.applications.some(app => 
      app.toLowerCase() === requirements.application.toLowerCase()
    );
    score += directApplicationMatch ? 15 : 
             arm.applications.some(app => app.toLowerCase().includes(requirements.application.toLowerCase())) ? 10 :
             requirements.application.toLowerCase().includes(arm.applications.some(app => app.toLowerCase())) ? 5 : 0;
    
    return {
      ...arm,
      score
    };
  });

  // Sort by score in descending order
  return scoredArms
    .sort((a, b) => (b as any).score - (a as any).score)
    .map(({ score, ...arm }) => arm) // Remove score property
    .slice(0, 3); // Return top 3
};

const relaxConstraints = (requirements: UserRequirements): RobotArm[] => {
  // Relax constraints by 20%
  const relaxedRequirements = {
    ...requirements,
    payloadNeeded: requirements.payloadNeeded * 0.8,
    reachNeeded: requirements.reachNeeded * 0.8,
    precisionNeeded: requirements.precisionNeeded * 1.2, // Higher value is more relaxed for precision
    budgetMax: requirements.budgetMax * 1.2
  };

  return robotArms.filter(arm => {
    // Apply relaxed filtering
    const meetsPayload = arm.payload >= relaxedRequirements.payloadNeeded;
    const meetsReach = arm.reach >= relaxedRequirements.reachNeeded;
    const meetsPrecision = arm.precision <= relaxedRequirements.precisionNeeded;
    const meetsBudget = arm.price.min <= relaxedRequirements.budgetMax;
    
    return meetsPayload && meetsReach && meetsPrecision && meetsBudget;
  });
};

// Function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
