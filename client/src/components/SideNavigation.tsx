
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset
} from "@/components/ui/sidebar";
import { 
  Home, 
  BarChart3, 
  Users, 
  Activity,
  MessageSquare,
  Settings,
  Calendar,
  LogOut
} from "lucide-react";

interface SideNavigationProps {
  children: React.ReactNode;
}

export const SideNavigation = ({ children }: SideNavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader className="flex items-center px-2 py-3">
            <div className="flex items-center gap-2 px-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg">SocialDash</span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                      <Link to="/dashboard">
                        <Home className="h-4 w-4" />
                        <span>Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/analytics")}>
                      <Link to="/analytics">
                        <BarChart3 className="h-4 w-4" />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/audience")}>
                      <Link to="/audience">
                        <Users className="h-4 w-4" />
                        <span>Audience</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/engagement")}>
                      <Link to="/engagement">
                        <Activity className="h-4 w-4" />
                        <span>Engagement</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/messages")}>
                      <Link to="/messages">
                        <MessageSquare className="h-4 w-4" />
                        <span>Messages</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/calendar")}>
                      <Link to="/calendar">
                        <Calendar className="h-4 w-4" />
                        <span>Calendar</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/settings")}>
                      <Link to="/settings">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <SidebarTrigger className="absolute top-4 left-4 z-50" />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
