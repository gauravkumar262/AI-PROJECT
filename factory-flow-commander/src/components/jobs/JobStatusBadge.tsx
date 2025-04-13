
import { Check, Clock, AlertTriangle, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { JobStatus } from "@/types";

interface JobStatusBadgeProps {
  status: JobStatus;
  className?: string;
}

export function JobStatusBadge({ status, className }: JobStatusBadgeProps) {
  const icons = {
    pending: <Clock className="h-3 w-3" />,
    scheduled: <AlertTriangle className="h-3 w-3" />,
    in_progress: <Play className="h-3 w-3" />,
    completed: <Check className="h-3 w-3" />,
    failed: <X className="h-3 w-3" />,
    cancelled: <X className="h-3 w-3" />
  };
  
  const styles = {
    pending: "bg-blue-100 text-blue-800",
    scheduled: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-indigo-100 text-indigo-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
    cancelled: "bg-gray-100 text-gray-800"
  };
  
  return (
    <div className={cn(
      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium gap-1",
      styles[status],
      className
    )}>
      {icons[status]}
      <span>{status.replace("_", " ")}</span>
    </div>
  );
}
