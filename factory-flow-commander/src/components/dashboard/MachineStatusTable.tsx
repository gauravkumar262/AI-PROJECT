
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Machine } from "@/types";
import { cn } from "@/lib/utils";

interface MachineStatusTableProps {
  machines: Machine[];
}

export function MachineStatusTable({ machines }: MachineStatusTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Machine</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Efficiency</TableHead>
            <TableHead>Current Job</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {machines.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell className="font-medium">{machine.name}</TableCell>
              <TableCell>{machine.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`status-indicator ${machine.status}`} />
                  <span className="capitalize">{machine.status}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        machine.efficiency > 0.9 
                          ? "bg-status-available" 
                          : machine.efficiency > 0.7 
                            ? "bg-status-busy" 
                            : "bg-status-error"
                      )}
                      style={{ width: `${machine.efficiency * 100}%` }}
                    />
                  </div>
                  <span>{Math.round(machine.efficiency * 100)}%</span>
                </div>
              </TableCell>
              <TableCell>
                {machine.currentJob 
                  ? <Badge variant="outline">Job #{machine.currentJob}</Badge> 
                  : <span className="text-muted-foreground">-</span>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
