import React, { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { Images, LayoutDashboard, Settings, LogOut, Tags, UtensilsCrossed } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden relative">
        <Sidebar className="border-r border-border/40">
          <SidebarHeader className="p-4 py-6 border-b border-border/40">
            <h2 className="text-xl font-black tracking-tighter text-primary">Leopard Cave</h2>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Admin Portal</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 font-bold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={activePath === '/dashboard'} className="gap-3 font-medium text-[15px] py-6">
                      <Link to="/dashboard">
                        <LayoutDashboard className="w-5 h-5"/>
                        <span>Overview</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={activePath === '/menu'} className="gap-3 font-medium text-[15px] py-6">
                      <Link to="/menu">
                        <UtensilsCrossed className="w-5 h-5"/>
                        <span>Menu Items</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={activePath === '/categories'} className="gap-3 font-medium text-[15px] py-6">
                      <Link to="/categories">
                        <Tags className="w-5 h-5"/>
                        <span>Categories</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={activePath === '/gallery'} className="gap-3 font-medium text-[15px] py-6">
                      <Link to="/gallery">
                        <Images className="w-5 h-5"/>
                        <span>Gallery</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="px-2 font-bold uppercase tracking-wider text-muted-foreground mb-2">System</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={activePath === '/settings'} className="gap-3 font-medium text-[15px] py-6">
                      <Link to="/settings">
                        <Settings className="w-5 h-5"/>
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-border/40">
             <Button variant="outline" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={handleSignOut}>
               <LogOut className="mr-3 h-4 w-4" />
               Log out
             </Button>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 transition-all duration-300 bg-muted/5">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
