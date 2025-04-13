
import { Job, Machine } from "../types";

export const mockMachines: Machine[] = [
  {
    id: "m1",
    name: "CNC Mill A",
    status: "available",
    type: "CNC Mill",
    capabilities: ["milling", "drilling"],
    efficiency: 0.92
  },
  {
    id: "m2",
    name: "Laser Cutter X1",
    status: "busy",
    type: "Laser Cutter",
    capabilities: ["cutting", "engraving"],
    efficiency: 0.87,
    currentJob: "j1"
  },
  {
    id: "m3",
    name: "Assembly Robot 1",
    status: "maintenance",
    type: "Robot",
    capabilities: ["assembly", "inspection"],
    efficiency: 0.78,
    lastMaintenance: new Date(2025, 3, 5),
    nextMaintenance: new Date(2025, 5, 15)
  },
  {
    id: "m4",
    name: "3D Printer Pro",
    status: "error",
    type: "3D Printer",
    capabilities: ["printing", "prototyping"],
    efficiency: 0.85
  },
  {
    id: "m5",
    name: "Injection Molder",
    status: "idle",
    type: "Molder",
    capabilities: ["molding", "casting"],
    efficiency: 0.89
  },
  {
    id: "m6",
    name: "Packaging Unit",
    status: "available",
    type: "Packaging",
    capabilities: ["packaging", "labeling"],
    efficiency: 0.95
  }
];

export const mockJobs: Job[] = [
  {
    id: "j1",
    name: "Precision Gears Production",
    description: "Manufacturing 500 precision gears for automotive client",
    status: "in_progress",
    priority: "high",
    requiredCapabilities: ["cutting", "engraving"],
    estimatedTime: 180, // 3 hours
    deadline: new Date(2025, 4, 20),
    assignedMachine: "m2",
    startTime: new Date(2025, 4, 13, 9, 0),
    endTime: new Date(2025, 4, 13, 12, 0),
    progress: 45
  },
  {
    id: "j2",
    name: "Prototype Housing",
    description: "3D printing prototype housing for new electronics product",
    status: "pending",
    priority: "medium",
    requiredCapabilities: ["printing", "prototyping"],
    estimatedTime: 240, // 4 hours
    deadline: new Date(2025, 4, 15)
  },
  {
    id: "j3",
    name: "Medical Components Assembly",
    description: "Precision assembly of medical device components",
    status: "scheduled",
    priority: "critical",
    requiredCapabilities: ["assembly", "inspection"],
    estimatedTime: 120, // 2 hours
    deadline: new Date(2025, 4, 14),
    assignedMachine: "m3"
  },
  {
    id: "j4",
    name: "Custom Metal Parts",
    description: "Milling custom metal parts for industrial application",
    status: "pending",
    priority: "low",
    requiredCapabilities: ["milling", "drilling"],
    estimatedTime: 300 // 5 hours
  },
  {
    id: "j5",
    name: "Plastic Components",
    description: "Molding 1000 plastic components",
    status: "completed",
    priority: "medium",
    requiredCapabilities: ["molding", "casting"],
    estimatedTime: 150, // 2.5 hours
    assignedMachine: "m5",
    startTime: new Date(2025, 4, 12, 13, 0),
    endTime: new Date(2025, 4, 12, 15, 30),
    progress: 100
  },
  {
    id: "j6",
    name: "Product Packaging",
    description: "Packaging and labeling finished products",
    status: "pending",
    priority: "low",
    requiredCapabilities: ["packaging", "labeling"],
    estimatedTime: 90 // 1.5 hours
  }
];
