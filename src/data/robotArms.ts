
export interface RobotArm {
  id: string;
  name: string;
  manufacturer: string;
  payload: number; // in kg
  reach: number; // in mm
  speed: number; // relative score 1-10
  precision: number; // in mm
  applications: string[];
  description: string;
  price: {
    min: number;
    max: number;
  };
  features: string[];
  image: string;
}

export const robotArms: RobotArm[] = [
  {
    id: "ra001",
    name: "PrecisionBot 2000",
    manufacturer: "RoboTech Industries",
    payload: 10,
    reach: 1500,
    speed: 7,
    precision: 0.1,
    applications: ["Packaging", "Assembly", "Material Handling"],
    description: "The PrecisionBot 2000 is designed for high-precision tasks in manufacturing environments. With its advanced servo motors and lightweight carbon fiber construction, it offers exceptional accuracy and speed.",
    price: {
      min: 25000,
      max: 35000,
    },
    features: [
      "6-axis movement",
      "Advanced path planning",
      "Integrated vision system",
      "Collision detection",
      "Customizable end effectors"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra002",
    name: "HeavyLifter 500",
    manufacturer: "Industrial Automation Corp",
    payload: 500,
    reach: 3200,
    speed: 4,
    precision: 0.5,
    applications: ["Heavy Material Handling", "Palletizing", "Machine Tending"],
    description: "The HeavyLifter 500 is built for industrial environments where heavy lifting capacity is essential. Despite its impressive payload capacity, it maintains good precision for its class.",
    price: {
      min: 75000,
      max: 95000,
    },
    features: [
      "Reinforced steel frame",
      "High-torque motors",
      "Integrated safety systems",
      "Low maintenance design",
      "Extended warranty"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra003",
    name: "SpeedyAssembler Pro",
    manufacturer: "FastBot Automation",
    payload: 3,
    reach: 800,
    speed: 10,
    precision: 0.05,
    applications: ["Electronics Assembly", "Pick and Place", "Quality Inspection"],
    description: "The SpeedyAssembler Pro excels in high-speed, precision applications like electronics manufacturing. Its lightweight design and advanced motion control algorithms deliver exceptional throughput.",
    price: {
      min: 18000,
      max: 24000,
    },
    features: [
      "Ultra-high speed servos",
      "Compact footprint",
      "Built-in vision processing",
      "Pre-programmed movement patterns",
      "Energy efficient design"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra004",
    name: "FlexiArm 360",
    manufacturer: "Adaptable Robotics",
    payload: 15,
    reach: 1800,
    speed: 6,
    precision: 0.2,
    applications: ["Welding", "Cutting", "Spraying", "Assembly"],
    description: "The FlexiArm 360 is designed for versatility across multiple applications. Its modular design allows for quick retooling and adaptation to different manufacturing processes.",
    price: {
      min: 30000,
      max: 42000,
    },
    features: [
      "Quick-change tool system",
      "Modular design",
      "Advanced path optimization",
      "Remote monitoring capabilities",
      "Intuitive programming interface"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra005",
    name: "CompactBot Mini",
    manufacturer: "Small Space Solutions",
    payload: 2,
    reach: 600,
    speed: 8,
    precision: 0.1,
    applications: ["Laboratory Automation", "Small Parts Assembly", "Testing"],
    description: "The CompactBot Mini is perfect for space-constrained environments that still require precision and reliability. Its small footprint hides powerful capabilities.",
    price: {
      min: 15000,
      max: 22000,
    },
    features: [
      "Ultra-compact design",
      "Low power consumption",
      "Silent operation",
      "Desktop mounting options",
      "Simple programming interface"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra006",
    name: "SurgicalAssist 7000",
    manufacturer: "MedTech Robotics",
    payload: 1,
    reach: 900,
    speed: 5,
    precision: 0.01,
    applications: ["Medical Procedures", "Laboratory Work", "Precision Assembly"],
    description: "The SurgicalAssist 7000 represents the pinnacle of precision robotics, designed for environments where accuracy is paramount. Its ultra-stable design virtually eliminates vibration.",
    price: {
      min: 120000,
      max: 150000,
    },
    features: [
      "Sub-micron precision",
      "Medical-grade materials",
      "Tremor-free operation",
      "Advanced force feedback",
      "Sterile environment compatible"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra007",
    name: "PackMaster 3000",
    manufacturer: "Packaging Systems Inc",
    payload: 30,
    reach: 2200,
    speed: 9,
    precision: 0.3,
    applications: ["Packaging", "Boxing", "Palletizing", "Order Fulfillment"],
    description: "The PackMaster 3000 is specifically designed for packaging operations, with optimized movements for picking, packing, and palletizing tasks. It's the efficiency champion in logistics operations.",
    price: {
      min: 40000,
      max: 55000,
    },
    features: [
      "High-speed pick and place",
      "Integrated package detection",
      "Multiple gripper options",
      "Box recognition software",
      "Warehouse management integration"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra008",
    name: "WelderPro X",
    manufacturer: "FabTech Solutions",
    payload: 25,
    reach: 2500,
    speed: 5,
    precision: 0.2,
    applications: ["Welding", "Metal Fabrication", "Heavy Assembly"],
    description: "The WelderPro X combines robust design with precision control, making it ideal for welding applications. Its specialized arm geometry provides excellent access to complex workpieces.",
    price: {
      min: 55000,
      max: 70000,
    },
    features: [
      "Heat-resistant components",
      "Integrated welding equipment",
      "Seam tracking technology",
      "Multi-pass weld programming",
      "Spark and spatter protection"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra009",
    name: "CleanBot Ultra",
    manufacturer: "Sterile Processing Technologies",
    payload: 8,
    reach: 1200,
    speed: 6,
    precision: 0.2,
    applications: ["Pharmaceutical Manufacturing", "Food Processing", "Clean Room Operations"],
    description: "The CleanBot Ultra is designed for environments with stringent cleanliness requirements. Its sealed joints and washdown-ready construction make it perfect for hygienic applications.",
    price: {
      min: 45000,
      max: 60000,
    },
    features: [
      "IP69K rated components",
      "Sealed construction",
      "FDA-compliant materials",
      "Cleanroom certified",
      "Chemical resistant surfaces"
    ],
    image: "placeholder.svg"
  },
  {
    id: "ra010",
    name: "EconomyArm Basic",
    manufacturer: "Budget Automation",
    payload: 5,
    reach: 1000,
    speed: 4,
    precision: 0.4,
    applications: ["Basic Material Handling", "Simple Assembly", "Education and Training"],
    description: "The EconomyArm Basic provides an affordable entry point to robotics automation. While not as feature-rich as premium models, it delivers reliable performance for standard tasks.",
    price: {
      min: 8000,
      max: 12000,
    },
    features: [
      "Simple programming interface",
      "Standard tooling compatibility",
      "Low maintenance design",
      "Compact controller",
      "Training materials included"
    ],
    image: "placeholder.svg"
  },
];
