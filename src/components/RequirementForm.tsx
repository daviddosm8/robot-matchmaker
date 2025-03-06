
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRequirements } from '@/utils/matchingLogic';
import { cn } from "@/lib/utils";

interface RequirementFormProps {
  onSubmit: (requirements: UserRequirements) => void;
  className?: string;
}

const RequirementForm = ({ onSubmit, className }: RequirementFormProps) => {
  const [formState, setFormState] = useState<UserRequirements>({
    application: "",
    payloadNeeded: 5,
    reachNeeded: 1000,
    precisionNeeded: 0.5,
    speedImportance: 3,
    budgetMax: 50000
  });

  const [applicationInput, setApplicationInput] = useState("");
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const handleInputChange = (field: keyof UserRequirements, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleApplicationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationInput(e.target.value);
  };

  const handleApplicationSubmit = () => {
    if (applicationInput.trim()) {
      setFormState(prev => ({ ...prev, application: applicationInput.trim() }));
      goToNextStep();
    }
  };

  const goToNextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      onSubmit(formState);
    }
  };

  const goToPrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      goToNextStep();
    } else {
      onSubmit(formState);
    }
  };

  const commonApplications = [
    "Packaging", 
    "Assembly", 
    "Welding", 
    "Pick and Place", 
    "Material Handling",
    "Palletizing",
    "Quality Inspection"
  ];

  return (
    <div id="requirements-form" className={cn("px-4 py-8 md:p-10 glass-card rounded-xl", className)}>
      <h2 className="text-2xl font-bold mb-2 text-center">Find Your Perfect Robot Arm</h2>
      <p className="text-gray-600 mb-8 text-center">Tell us what you need and we'll find the best matches</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Progress indicator */}
        <div className="w-full mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-700 ease-in-out" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Step 1: Application */}
        <div className={cn("space-y-4 transition-all duration-500", step === 1 ? "block" : "hidden")}>
          <h3 className="text-lg font-semibold">What will you use the robot arm for?</h3>
          <p className="text-sm text-gray-600 mb-4">Describe your application or select from common options below</p>
          
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="Describe your application (e.g., 'packaging small electronics')"
              value={applicationInput}
              onChange={handleApplicationInput}
              className="w-full"
            />
            
            <div className="flex flex-wrap gap-2 mt-4">
              {commonApplications.map((app) => (
                <Button
                  key={app}
                  type="button"
                  variant="outline"
                  size="sm"
                  className={cn(
                    "rounded-full text-sm", 
                    applicationInput.toLowerCase().includes(app.toLowerCase()) && "bg-primary/10 border-primary"
                  )}
                  onClick={() => {
                    setApplicationInput(app);
                    setTimeout(handleApplicationSubmit, 500);
                  }}
                >
                  {app}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Step 2: Payload */}
        <div className={cn("space-y-4 transition-all duration-500", step === 2 ? "block" : "hidden")}>
          <h3 className="text-lg font-semibold">What payload capacity do you need?</h3>
          <p className="text-sm text-gray-600 mb-4">Maximum weight the robot arm needs to lift (in kg)</p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Payload Capacity</Label>
                <span className="text-sm font-medium">{formState.payloadNeeded} kg</span>
              </div>
              <Slider
                value={[formState.payloadNeeded]}
                min={1}
                max={100}
                step={1}
                onValueChange={(value) => handleInputChange('payloadNeeded', value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Light (1kg)</span>
                <span>Medium (25kg)</span>
                <span>Heavy (100kg)</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div 
                className={cn(
                  "flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all",
                  formState.payloadNeeded <= 10 ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleInputChange('payloadNeeded', 5)}
              >
                <span className="text-sm font-medium">Light</span>
                <span className="text-xs text-gray-500">1-10 kg</span>
              </div>
              <div 
                className={cn(
                  "flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all",
                  formState.payloadNeeded > 10 && formState.payloadNeeded <= 50 ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleInputChange('payloadNeeded', 25)}
              >
                <span className="text-sm font-medium">Medium</span>
                <span className="text-xs text-gray-500">10-50 kg</span>
              </div>
              <div 
                className={cn(
                  "flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all",
                  formState.payloadNeeded > 50 ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleInputChange('payloadNeeded', 75)}
              >
                <span className="text-sm font-medium">Heavy</span>
                <span className="text-xs text-gray-500">50+ kg</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 3: Reach & Precision */}
        <div className={cn("space-y-4 transition-all duration-500", step === 3 ? "block" : "hidden")}>
          <h3 className="text-lg font-semibold">What reach and precision do you need?</h3>
          <p className="text-sm text-gray-600 mb-4">Define the operating range and accuracy requirements</p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Reach Required</Label>
                <span className="text-sm font-medium">{formState.reachNeeded} mm</span>
              </div>
              <Slider
                value={[formState.reachNeeded]}
                min={500}
                max={3000}
                step={100}
                onValueChange={(value) => handleInputChange('reachNeeded', value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Compact (500mm)</span>
                <span>Standard (1500mm)</span>
                <span>Extended (3000mm)</span>
              </div>
            </div>
            
            <div className="space-y-2 mt-6">
              <div className="flex justify-between">
                <Label>Precision Required</Label>
                <span className="text-sm font-medium">±{formState.precisionNeeded} mm</span>
              </div>
              <Slider
                value={[formState.precisionNeeded * 100]}
                min={1}
                max={100}
                step={1}
                onValueChange={(value) => handleInputChange('precisionNeeded', value[0] / 100)}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Ultra-precise (±0.01mm)</span>
                <span>Standard (±0.5mm)</span>
                <span>Basic (±1mm)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 4: Speed Importance */}
        <div className={cn("space-y-4 transition-all duration-500", step === 4 ? "block" : "hidden")}>
          <h3 className="text-lg font-semibold">How important is speed for your application?</h3>
          <p className="text-sm text-gray-600 mb-4">Rate the importance of operational speed</p>
          
          <RadioGroup
            value={formState.speedImportance.toString()}
            onValueChange={(value) => handleInputChange('speedImportance', parseInt(value))}
            className="grid grid-cols-1 gap-4 mt-4"
          >
            {[
              { value: "5", label: "Critical - Maximum speed is essential", desc: "For high-volume production lines" },
              { value: "4", label: "Very Important - Speed is a key factor", desc: "For efficient operations with throughput targets" },
              { value: "3", label: "Important - Good balance of speed and other factors", desc: "For standard industrial applications" },
              { value: "2", label: "Somewhat Important - Speed is secondary", desc: "For applications where precision matters more" },
              { value: "1", label: "Not Important - Speed is not a concern", desc: "For specialized or sensitive operations" }
            ].map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center space-x-3 rounded-lg border p-4 transition-all cursor-pointer hover:border-primary/50",
                  formState.speedImportance.toString() === option.value ? "border-primary bg-primary/5" : "border-gray-200"
                )}
                onClick={() => handleInputChange('speedImportance', parseInt(option.value))}
              >
                <RadioGroupItem value={option.value} id={`speed-${option.value}`} className="hidden" />
                <div className="flex-1">
                  <Label
                    htmlFor={`speed-${option.value}`}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {option.label}
                  </Label>
                  <p className="text-xs text-gray-500">{option.desc}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* Step 5: Budget */}
        <div className={cn("space-y-4 transition-all duration-500", step === 5 ? "block" : "hidden")}>
          <h3 className="text-lg font-semibold">What's your budget?</h3>
          <p className="text-sm text-gray-600 mb-4">Maximum investment for your robot arm solution</p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Maximum Budget</Label>
                <span className="text-sm font-medium">${formState.budgetMax.toLocaleString()}</span>
              </div>
              <Slider
                value={[formState.budgetMax]}
                min={5000}
                max={150000}
                step={5000}
                onValueChange={(value) => handleInputChange('budgetMax', value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$5,000</span>
                <span>$75,000</span>
                <span>$150,000</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: "Entry-Level", value: 15000, range: "$5K-$25K" },
                { label: "Mid-Range", value: 50000, range: "$25K-$75K" },
                { label: "Premium", value: 100000, range: "$75K-$150K" }
              ].map((option) => (
                <div 
                  key={option.label}
                  className={cn(
                    "flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-all",
                    Math.abs(formState.budgetMax - option.value) <= 25000 ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => handleInputChange('budgetMax', option.value)}
                >
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-xs text-gray-500">{option.range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={goToPrevStep}
            disabled={step === 1}
            className={cn(
              "transition-all duration-300",
              step === 1 ? "opacity-0" : "opacity-100"
            )}
          >
            Back
          </Button>
          
          <Button
            type={step === totalSteps ? "submit" : "button"}
            onClick={step < totalSteps ? goToNextStep : undefined}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {step === totalSteps ? "Find Matches" : "Continue"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequirementForm;
