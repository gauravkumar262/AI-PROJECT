
import { BellIcon, MenuIcon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/layout/Sidebar";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-border h-16 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SidebarTrigger>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-factory-blue to-factory-teal bg-clip-text text-transparent">
            Factory Flow Commander
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
