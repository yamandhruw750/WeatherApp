import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { CloudSunRain } from "lucide-react";

export function AppSidebar() {
  return ( 
  
  <Sidebar collapsible="icon">

      <SidebarHeader>
        <span><CloudSunRain /></span>
      </SidebarHeader>
  </Sidebar>
  
  
  )
}
