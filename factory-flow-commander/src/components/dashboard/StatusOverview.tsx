
import { Activity, CheckCircle, Clock, XCircle, AlertTriangle, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Machine } from "@/types";

interface StatusOverviewProps {
  machines: Machine[];
}

export function StatusOverview({ machines }: StatusOverviewProps) {
  // Count machines by status
  const statusCount = {
    available: 0,
    busy: 0,
    error: 0,
    maintenance: 0,
    idle: 0
  };
  
  machines.forEach(machine => {
    statusCount[machine.status]++;
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Machine Status Overview</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatusCard
          status="Available"
          count={statusCount.available}
          icon={<CheckCircle className="h-5 w-5 text-status-available" />}
          color="bg-status-available/10 text-status-available"
        />
        <StatusCard
          status="Busy"
          count={statusCount.busy}
          icon={<Clock className="h-5 w-5 text-status-busy" />}
          color="bg-status-busy/10 text-status-busy"
        />
        <StatusCard
          status="Error"
          count={statusCount.error}
          icon={<XCircle className="h-5 w-5 text-status-error" />}
          color="bg-status-error/10 text-status-error"
        />
        <StatusCard
          status="Maintenance"
          count={statusCount.maintenance}
          icon={<Wrench className="h-5 w-5 text-status-maintenance" />}
          color="bg-status-maintenance/10 text-status-maintenance"
        />
        <StatusCard
          status="Idle"
          count={statusCount.idle}
          icon={<AlertTriangle className="h-5 w-5 text-status-idle" />}
          color="bg-status-idle/10 text-status-idle"
        />
      </CardContent>
    </Card>
  );
}

interface StatusCardProps {
  status: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

function StatusCard({ status, count, icon, color }: StatusCardProps) {
  return (
    <div className={`rounded-lg p-3 flex items-center gap-3 ${color}`}>
      <div className="p-2 rounded-full bg-white">{icon}</div>
      <div>
        <p className="text-xs font-medium">{status}</p>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
}
