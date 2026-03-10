"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function getProjects(includeArchived = false) {
  return db.project.findMany({
    where: includeArchived ? {} : { archived: false },
    include: {
      tags: { include: { tag: true } },
      tasks: true,
      notes: true,
      outgoingRelations: { include: { target: true } },
      incomingRelations: { include: { source: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getArchivedProjects() {
  return db.project.findMany({
    where: { archived: true },
    include: {
      tags: { include: { tag: true } },
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getProject(id: string) {
  return db.project.findUnique({
    where: { id },
    include: {
      tags: { include: { tag: true } },
      tasks: { orderBy: { order: "asc" } },
      notes: { orderBy: { createdAt: "desc" } },
      outgoingRelations: { include: { target: true } },
      incomingRelations: { include: { source: true } },
    },
  });
}

export async function createProject(data: {
  name: string;
  description?: string;
  status?: string;
  priority?: string;
  path?: string;
  githubUrl?: string;
  tagIds?: string[];
  workspaceId?: string | null;
}) {
  const project = await db.project.create({
    data: {
      name: data.name,
      description: data.description ?? "",
      status: data.status ?? "not_started",
      priority: data.priority ?? "medium",
      path: data.path ?? "",
      githubUrl: data.githubUrl ?? "",
      workspaceId: data.workspaceId ?? null,
      tags: data.tagIds
        ? { create: data.tagIds.map((tagId) => ({ tagId })) }
        : undefined,
    },
  });
  revalidatePath("/");
  return project;
}

export async function updateProject(
  id: string,
  data: {
    name?: string;
    description?: string;
    status?: string;
    priority?: string;
    path?: string;
    githubUrl?: string;
    tagIds?: string[];
    workspaceId?: string | null;
    archived?: boolean;
  }
) {
  const { tagIds, ...projectData } = data;

  if (tagIds !== undefined) {
    await db.$transaction([
      db.projectTag.deleteMany({ where: { projectId: id } }),
      db.projectTag.createMany({
        data: tagIds.map((tagId) => ({ projectId: id, tagId })),
      }),
    ]);
  }

  const hasProjectUpdates = Object.keys(projectData).length > 0;
  const project = hasProjectUpdates
    ? await db.project.update({ where: { id }, data: projectData })
    : await db.project.findUniqueOrThrow({ where: { id } });

  revalidatePath("/");
  revalidatePath(`/projects/${id}`);
  return project;
}

export async function deleteProject(id: string) {
  await db.project.delete({ where: { id } });
  revalidatePath("/");
}
