
import { useEffect, useState } from "react";
import { 
  Gauge, 
  Clock, 
  Wrench, 
  CheckCircle2, 
  BarChart3
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusOverview } from "@/components/dashboard/StatusOverview";
import { UpcomingJobs } from "@/components/dashboard/UpcomingJobs";
import { MachineStatusTable } from "@/components/dashboard/MachineStatusTable";
import { ResourceUtilization } from "@/components/dashboard/ResourceUtilization";
import { mockJobs, mockMachines } from "@/data/mockData";
import { calculateDashboardStats, scheduleJobs } from "@/utils/schedulingAlgorithm";
import { Job, Machine } from "@/types";

export default function Dashboard() {
  const [machines, setMachines] = useState<Machine[]>(mockMachines);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [stats, setStats] = useState(calculateDashboardStats(jobs, machines));
  
  // Simulate job scheduling when component mounts
  useEffect(() => {
    const schedule = scheduleJobs(jobs, machines);
    console.log("Generated schedule:", schedule);
    
    // We would update jobs and machines here based on schedule in a real app
    setStats(calculateDashboardStats(jobs, machines));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Machines Available" 
          value={`${stats.availableMachines}/${stats.totalMachines}`}
          icon={<Wrench />}
          description="Ready for assignment"
        />
        <StatCard 
          title="Jobs Pending" 
          value={stats.pendingJobs}
          icon={<Clock />}
          trend={{
            value: 12,
            isPositive: false
          }}
        />
        <StatCard 
          title="Resource Utilization" 
          value={`${Math.round(stats.resourceUtilization * 100)}%`}
          icon={<Gauge />}
          trend={{
            value: 8,
            isPositive: true
          }}
        />
        <StatCard 
          title="Completed Jobs" 
          value={stats.completedJobs}
          icon={<CheckCircle2 />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StatusOverview machines={machines} />
          <MachineStatusTable machines={machines} />
        </div>
        <div>
          <UpcomingJobs jobs={jobs} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResourceUtilization machines={machines} />
      </div>
    </div>
  );
}
