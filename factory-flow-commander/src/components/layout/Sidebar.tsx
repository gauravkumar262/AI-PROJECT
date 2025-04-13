
import React, { createContext, useContext, useState } from "react";
import { 
  Gauge, Clock, Activity, 
  CalendarClock, Wrench, Settings, 
  ChevronLeft, ChevronRight, BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

// Sidebar Context
type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
  close: () => {}
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);
  
  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close }}>
      <div className="flex min-h-screen w-full">
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger({ children }: { children?: React.ReactNode }) {
  const { toggle } = useContext(SidebarContext);
  
  if (children) {
    return (
      <div onClick={toggle}>
        {children}
      </div>
    );
  }
  
  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      <MenuIcon className="h-5 w-5" />
    </Button>
  );
}

export function Sidebar({ children }: { children?: React.ReactNode }) {
  const { isOpen, toggle } = useContext(SidebarContext);
  
  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border text-sidebar-foreground h-screen transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 flex items-center px-4 justify-between border-b border-sidebar-border">
          <div className={cn("overflow-hidden", isOpen ? "block" : "hidden")}>
            <h1 className="font-bold text-lg">FlowCommander</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-sidebar-foreground hover:text-white hover:bg-sidebar-accent"
          >
            {isOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="p-2 flex flex-col gap-1 flex-grow">
          <SidebarNavItem 
            to="/" 
            icon={<Gauge />} 
            label="Dashboard" 
            isOpen={isOpen} 
          />
          <SidebarNavItem 
            to="/jobs" 
            icon={<Clock />} 
            label="Jobs" 
            isOpen={isOpen} 
          />
          <SidebarNavItem 
            to="/machines" 
            icon={<Wrench />} 
            label="Machines" 
            isOpen={isOpen} 
          />
          <SidebarNavItem 
            to="/schedule" 
            icon={<CalendarClock />} 
            label="Schedule" 
            isOpen={isOpen} 
          />
          <SidebarNavItem 
            to="/analytics" 
            icon={<BarChart3 />} 
            label="Analytics" 
            isOpen={isOpen} 
          />
          <SidebarNavItem 
            to="/monitoring" 
            icon={<Activity />} 
            label="Monitoring" 
            isOpen={isOpen} 
          />
        </div>
        
        <div className="p-2 border-t border-sidebar-border">
          <SidebarNavItem 
            to="/settings" 
            icon={<Settings />} 
            label="Settings" 
            isOpen={isOpen} 
          />
        </div>
      </div>
    </aside>
  );
}

function SidebarNavItem({ 
  to, 
  icon, 
  label, 
  isOpen 
}: { 
  to: string; 
  icon: React.ReactNode; 
  label: string; 
  isOpen: boolean;
}) {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-accent text-white" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
        )
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
