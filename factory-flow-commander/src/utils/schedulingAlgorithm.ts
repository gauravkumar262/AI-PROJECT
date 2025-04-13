
import { Job, Machine, ScheduleEntry } from "../types";

/**
 * Rule-based scheduling algorithm that assigns jobs to machines
 * based on priority, deadlines, and machine availability
 */
export function scheduleJobs(jobs: Job[], machines: Machine[]): ScheduleEntry[] {
  const schedule: ScheduleEntry[] = [];
  const now = new Date();
  
  // Sort jobs by priority and deadline
  const sortedJobs = [...jobs]
    .filter(job => job.status === 'pending')
    .sort((a, b) => {
      // First sort by priority
      const priorityWeight = {
        'critical': 4,
        'high': 3,
        'medium': 2,
        'low': 1
      };
      
      const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then sort by deadline if both have deadlines
      if (a.deadline && b.deadline) {
        return a.deadline.getTime() - b.deadline.getTime();
      }
      
      // Jobs with deadlines come before those without
      if (a.deadline && !b.deadline) return -1;
      if (!a.deadline && b.deadline) return 1;
      
      // Finally sort by estimated time (shorter jobs first)
      return a.estimatedTime - b.estimatedTime;
    });
  
  // Get available machines
  const availableMachines = machines.filter(machine => 
    machine.status === 'available' || machine.status === 'idle'
  );
  
  // For each job, find the best machine
  for (const job of sortedJobs) {
    // Find machines that have the capabilities for this job
    const capableMachines = availableMachines.filter(machine => 
      job.requiredCapabilities.every(capability => 
        machine.capabilities.includes(capability)
      )
    );
    
    if (capableMachines.length === 0) continue;
    
    // Choose the most efficient machine
    const bestMachine = capableMachines.reduce((best, current) => 
      current.efficiency > best.efficiency ? current : best
    , capableMachines[0]);
    
    // Calculate start and end time
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + job.estimatedTime * 60000);
    
    // Create schedule entry
    schedule.push({
      jobId: job.id,
      machineId: bestMachine.id,
      startTime,
      endTime
    });
    
    // Update job status
    job.status = 'scheduled';
    job.assignedMachine = bestMachine.id;
    job.startTime = startTime;
    job.endTime = endTime;
    
    // Update machine status
    const machineIndex = availableMachines.findIndex(m => m.id === bestMachine.id);
    if (machineIndex !== -1) {
      availableMachines.splice(machineIndex, 1);
    }
  }
  
  return schedule;
}

/**
 * Calculate dashboard statistics
 */
export function calculateDashboardStats(jobs: Job[], machines: Machine[]) {
  const totalMachines = machines.length;
  const availableMachines = machines.filter(m => m.status === 'available' || m.status === 'idle').length;
  const totalJobs = jobs.length;
  const pendingJobs = jobs.filter(j => j.status === 'pending' || j.status === 'scheduled').length;
  const completedJobs = jobs.filter(j => j.status === 'completed').length;
  
  // Calculate overall efficiency (active machines / total machines)
  const activeMachines = machines.filter(m => m.status === 'busy').length;
  const overallEfficiency = totalMachines > 0 ? (activeMachines / totalMachines) * 100 : 0;
  
  // Calculate resource utilization (based on machine efficiency)
  const totalEfficiency = machines.reduce((sum, machine) => sum + machine.efficiency, 0);
  const resourceUtilization = totalMachines > 0 ? (totalEfficiency / totalMachines) : 0;
  
  return {
    totalMachines,
    availableMachines,
    totalJobs,
    pendingJobs,
    completedJobs,
    overallEfficiency,
    resourceUtilization
  };
}
