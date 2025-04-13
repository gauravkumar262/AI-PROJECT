
import { useState } from "react";
import { PlusIcon, Search, FilterX, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Machine } from "@/types";
import { mockMachines } from "@/data/mockData";

export default function Machines() {
  const [machines, setMachines] = useState<Machine[]>(mockMachines);
  const [search, setSearch] = useState("");
  
  const filteredMachines = machines.filter(machine => 
    machine.name.toLowerCase().includes(search.toLowerCase()) ||
    machine.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Machines</h1>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Machine
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search machines..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>
        <Button variant="outline" size="icon">
          <FilterX className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMachines.map(machine => (
          <MachineCard key={machine.id} machine={machine} />
        ))}
        {filteredMachines.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No machines found
          </div>
        )}
      </div>
    </div>
  );
}

function MachineCard({ machine }: { machine: Machine }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{machine.name}</CardTitle>
            <CardDescription>{machine.type}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={`status-indicator ${machine.status}`} />
            <span className="text-sm capitalize">{machine.status}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pb-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Capabilities</div>
          <div className="flex flex-wrap gap-1">
            {machine.capabilities.map(capability => (
              <Badge key={capability} variant="secondary" className="capitalize">
                {capability}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground mb-1">Efficiency</div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-factory-teal" 
                style={{ width: `${machine.efficiency * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">
              {Math.round(machine.efficiency * 100)}%
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div>
          {machine.currentJob ? (
            <div className="text-sm">
              <span className="text-muted-foreground">Current Job: </span>
              <span className="font-medium">#{machine.currentJob}</span>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">No active job</span>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Assign Job</DropdownMenuItem>
            <DropdownMenuItem>Set Maintenance</DropdownMenuItem>
            <DropdownMenuItem>Edit Machine</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
