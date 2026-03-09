import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/actions/projects";
import { getTags } from "@/lib/actions/tags";
import { ProjectPageClient } from "./project-page-client";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, allProjects, allTags] = await Promise.all([
    getProject(id),
    getProjects(),
    getTags(),
  ]);

  if (!project) notFound();

  const otherProjects = allProjects
    .filter((p) => p.id !== project.id)
    .map((p) => ({ id: p.id, name: p.name }));

  return (
    <ProjectPageClient
      project={project}
      allTags={allTags}
      otherProjects={otherProjects}
    />
  );
}
