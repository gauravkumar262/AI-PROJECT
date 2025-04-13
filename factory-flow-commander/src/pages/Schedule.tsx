
import { useState } from "react";
import { mockJobs, mockMachines } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, RefreshCw } from "lucide-react";
import { Job, Machine } from "@/types";
import { cn } from "@/lib/utils";

export default function Schedule() {
  const [machines] = useState<Machine[]>(mockMachines);
  const [jobs] = useState<Job[]>(mockJobs);
  
  // Create a mapping of jobs assigned to machines
  const machineJobs = machines.map(machine => {
    const assignedJobs = jobs.filter(job => job.assignedMachine === machine.id);
    return {
      machine,
      jobs: assignedJobs
    };
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            April 2025
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Production Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {machineJobs.map(({ machine, jobs }) => (
                  <div key={machine.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`status-indicator ${machine.status}`} />
                        <span className="font-medium">{machine.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground capitalize">
                        {machine.status}
                      </span>
                    </div>
                    <div className="h-12 relative bg-gray-100 rounded-md overflow-hidden">
                      {jobs.map(job => (
                        <div 
                          key={job.id}
                          className={cn(
                            "absolute h-full px-2 flex items-center text-white text-sm font-medium",
                            job.priority === "critical" ? "bg-status-error" : 
                            job.priority === "high" ? "bg-status-busy" : 
                            job.priority === "medium" ? "bg-status-maintenance" : 
                            "bg-status-idle"
                          )}
                          style={{ 
                            left: `${(job.progress || 0)}%`, 
                            width: `${50 - (job.progress || 0)}%` 
                          }}
                        >
                          {job.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Time scale */}
                <div className="grid grid-cols-12 gap-1 mt-2 px-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="text-xs text-center text-muted-foreground">
                      {(i * 2) + 8}:00
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Calendar view coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
