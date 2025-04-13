
import { 
  Calendar, 
  Clock, 
  ArrowUpRight 
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Job } from "@/types";

interface UpcomingJobsProps {
  jobs: Job[];
}

export function UpcomingJobs({ jobs }: UpcomingJobsProps) {
  // Filter and sort upcoming jobs
  const upcomingJobs = jobs
    .filter(job => job.status === 'pending' || job.status === 'scheduled')
    .sort((a, b) => {
      // Sort by priority first
      const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by deadline if both have deadlines
      if (a.deadline && b.deadline) {
        return a.deadline.getTime() - b.deadline.getTime();
      }
      
      return 0;
    })
    .slice(0, 5);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Jobs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingJobs.length > 0 ? (
          upcomingJobs.map(job => (
            <UpcomingJobItem key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-4">
            No upcoming jobs
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full flex items-center justify-center gap-2">
          View All Jobs <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function UpcomingJobItem({ job }: { job: Job }) {
  // Get priority badge color
  const priorityColor = {
    'critical': 'bg-status-error text-white',
    'high': 'bg-status-busy text-white',
    'medium': 'bg-status-maintenance text-white',
    'low': 'bg-status-idle text-white'
  }[job.priority];
  
  return (
    <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{job.name}</h4>
          <p className="text-sm text-muted-foreground line-clamp-1">{job.description}</p>
        </div>
        <Badge className={priorityColor}>{job.priority}</Badge>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> 
            {job.estimatedTime} min
          </div>
          {job.deadline && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> 
              {job.deadline.toLocaleDateString()}
            </div>
          )}
        </div>
        <span className="text-xs font-semibold">
          {job.status === 'scheduled' ? 'Scheduled' : 'Pending'}
        </span>
      </div>
    </div>
  );
}
