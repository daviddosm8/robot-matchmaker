
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';
import RequirementForm from '@/components/RequirementForm';
import ResultsSection from '@/components/ResultsSection';
import { UserRequirements, findMatchingRobotArms } from '@/utils/matchingLogic';
import { RobotArm } from '@/data/robotArms';
import { toast } from 'sonner';

const Index = () => {
  const [matchResults, setMatchResults] = useState<RobotArm[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(true);

  useEffect(() => {
    const initializeIntersectionObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      document.querySelectorAll('.fade-in-section').forEach((element) => {
        observer.observe(element);
      });

      return observer;
    };

    const observer = initializeIntersectionObserver();

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleRequirementsSubmit = (requirements: UserRequirements) => {
    try {
      // Find matching robot arms
      const matches = findMatchingRobotArms(requirements);

      // If there are matches, update the state
      if (matches.length > 0) {
        setMatchResults(matches);
        setIsFormVisible(false);
        toast.success('Found your perfect robot arm matches!');
      } else {
        toast.error('No matching robot arms found. Please adjust your requirements.');
      }
    } catch (error) {
      console.error('Error finding matches:', error);
      toast.error('Error processing your request. Please try again.');
    }
  };

  const handleStartOver = () => {
    setMatchResults([]);
    setIsFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      <HeroSection />
      
      {/* Requirements Form Section */}
      <section 
        id="find-match" 
        className="py-16 bg-gradient-to-b from-white to-gray-50 relative"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="fade-in-section">
            {isFormVisible ? (
              <RequirementForm onSubmit={handleRequirementsSubmit} />
            ) : (
              <ResultsSection 
                results={matchResults} 
                onStartOver={handleStartOver} 
              />
            )}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block mb-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How RoboMatch Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our intelligent matching algorithm finds the perfect robot arm solution for your specific needs in just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "1. Define Requirements",
                description: "Tell us what you need your robot arm to do, including payload, reach, precision, and budget."
              },
              {
                title: "2. Intelligent Matching",
                description: "Our algorithm evaluates thousands of possible combinations to find your ideal robot arm solutions."
              },
              {
                title: "3. Review & Compare",
                description: "Get detailed information about your top matches and make an informed decision with confidence."
              }
            ].map((step, index) => (
              <div key={index} className="fade-in-section p-6 rounded-xl glass-card">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-primary">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block mb-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Key Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Use RoboMatch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique advantages to help you find the perfect robot arm solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Matching Algorithm",
                description: "Our sophisticated algorithm accounts for all critical factors to ensure the best possible recommendations."
              },
              {
                title: "Comprehensive Database",
                description: "Access detailed information about a wide range of robot arms from leading manufacturers."
              },
              {
                title: "Time & Cost Savings",
                description: "Eliminate hours of research and make a more informed decision, faster."
              },
              {
                title: "Unbiased Recommendations",
                description: "Get objective recommendations based purely on your technical requirements."
              },
              {
                title: "Detailed Specifications",
                description: "Compare key technical details side-by-side to understand the differences between options."
              },
              {
                title: "Future-Proof Solutions",
                description: "Find robot arms that not only meet your current needs but can also adapt to future requirements."
              }
            ].map((feature, index) => (
              <div key={index} className="fade-in-section p-6 bg-white rounded-xl shadow-subtle hover-scale">
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10 fade-in-section">
            <span className="inline-block mb-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Expert Advice?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of robotics specialists is ready to help you find the perfect solution for your needs.
            </p>
          </div>
          
          <div className="fade-in-section glass-card p-8 rounded-xl">
            <div className="text-center">
              <p className="mb-6 text-gray-600">
                If you need personalized recommendations or have specific questions about robot arm solutions, don't hesitate to reach out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-3 transition-all shadow-md hover:shadow-lg">
                  Contact Us
                </button>
                <button className="rounded-full border border-gray-300 hover:bg-gray-100 px-8 py-3 transition-all">
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center gap-2 text-lg font-semibold">
                <span className="text-xl font-bold text-primary">RoboMatch</span>
              </a>
              <p className="text-sm text-gray-500 mt-2">Find your perfect robot arm solution</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} RoboMatch. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
