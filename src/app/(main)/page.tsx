import { getProjects } from "@/lib/actions/projects";
import { getTags } from "@/lib/actions/tags";
import { ProjectGraph } from "@/components/graph/project-graph";

export default async function DashboardPage() {
  const [projects, tags] = await Promise.all([getProjects(), getTags()]);

  return (
    <div className="h-full relative">
      <ProjectGraph projects={projects} tags={tags} />
    </div>
  );
}
