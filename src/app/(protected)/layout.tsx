import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { AppSidebar } from "./components/app-sidebar";
import ShadcnMenu from "./components/shadcn-menu";

const ProtectedLayout = ({children}: { children: React.ReactNode}) => {
  return (
    <>
      <SidebarProvider>
      <AppSidebar />
      <ShadcnMenu />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </>
  );
}
 
export default ProtectedLayout;