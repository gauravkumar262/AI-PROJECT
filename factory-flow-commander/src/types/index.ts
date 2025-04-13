
// Machine Status Types
export type MachineStatus = 'available' | 'busy' | 'error' | 'maintenance' | 'idle';

// Machine Type
export interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  type: string;
  capabilities: string[];
  efficiency: number;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  currentJob?: string;
}

// Job Priority
export type JobPriority = 'low' | 'medium' | 'high' | 'critical';

// Job Status
export type JobStatus = 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'failed' | 'cancelled';

// Job Type
export interface Job {
  id: string;
  name: string;
  description: string;
  status: JobStatus;
  priority: JobPriority;
  requiredCapabilities: string[];
  estimatedTime: number; // in minutes
  deadline?: Date;
  assignedMachine?: string;
  startTime?: Date;
  endTime?: Date;
  progress?: number; // 0-100
}

// Schedule Entry
export interface ScheduleEntry {
  jobId: string;
  machineId: string;
  startTime: Date;
  endTime: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalMachines: number;
  availableMachines: number;
  totalJobs: number;
  pendingJobs: number;
  completedJobs: number;
  overallEfficiency: number;
  resourceUtilization: number;
}
