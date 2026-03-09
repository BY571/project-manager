"use client";

import { ProjectHeader } from "@/components/projects/project-header";
import { TaskList } from "@/components/projects/task-list";
import { NoteList } from "@/components/projects/note-list";
import { ConnectionList } from "@/components/projects/connection-list";

interface ProjectPageClientProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    priority: string;
    path: string;
    githubUrl: string;
    archived: boolean;
    tags: { projectId: string; tagId: string; tag: { id: string; name: string; color: string } }[];
    tasks: { id: string; projectId: string; title: string; description: string; completed: boolean; order: number; createdAt: Date }[];
    notes: { id: string; projectId: string; content: string; type: string; resolved: boolean; createdAt: Date }[];
    outgoingRelations: { id: string; type: string; sourceProjectId: string; targetProjectId: string; label: string; target: { id: string; name: string } }[];
    incomingRelations: { id: string; type: string; sourceProjectId: string; targetProjectId: string; label: string; source: { id: string; name: string } }[];
  };
  allTags: { id: string; name: string; color: string }[];
  otherProjects: { id: string; name: string }[];
}

export function ProjectPageClient({ project, allTags, otherProjects }: ProjectPageClientProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <ProjectHeader project={project} allTags={allTags} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskList projectId={project.id} tasks={project.tasks} />
        <NoteList projectId={project.id} notes={project.notes} />
      </div>

      <ConnectionList
        projectId={project.id}
        outgoing={project.outgoingRelations}
        incoming={project.incomingRelations}
        otherProjects={otherProjects}
      />
    </div>
  );
}
