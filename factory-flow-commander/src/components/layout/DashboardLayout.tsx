
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { Sidebar, SidebarProvider } from "./Sidebar";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden">
        <DashboardHeader />
        <main className="flex-grow p-4 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
