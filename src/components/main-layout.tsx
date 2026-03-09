"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { CreateProjectDialog } from "@/components/projects/create-project-dialog";
import { ActiveTagContext } from "@/components/graph/active-tag-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

interface MainLayoutProps {
  projects: { id: string; name: string; status: string }[];
  tags: { id: string; name: string; color: string }[];
  children: React.ReactNode;
}

export function MainLayout({ projects, tags, children }: MainLayoutProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTagId, setActiveTagId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <Sidebar
      projects={projects}
      tags={tags}
      onNewProject={() => {
        setMobileOpen(false);
        setShowCreateDialog(true);
      }}
      activeTagId={activeTagId}
      onTagFilter={setActiveTagId}
      onNavigate={() => setMobileOpen(false)}
    />
  );

  return (
    <ActiveTagContext value={{ activeTagId }}>
      <div className="flex h-screen">
        {/* Desktop sidebar -- hidden on mobile */}
        <div className="hidden md:block">
          {sidebarContent}
        </div>

        {/* Mobile sidebar sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64" showCloseButton={false}>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            {sidebarContent}
          </SheetContent>
        </Sheet>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center gap-3 border-b px-4 py-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </Button>
            <span className="font-semibold text-sm">Project Manager</span>
          </div>

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>

        <CreateProjectDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          tags={tags}
        />
      </div>
    </ActiveTagContext>
  );
}
