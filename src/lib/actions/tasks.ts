"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createTask(projectId: string, title: string) {
  const maxOrder = await db.task.aggregate({
    where: { projectId },
    _max: { order: true },
  });
  const task = await db.task.create({
    data: { projectId, title, order: (maxOrder._max.order ?? -1) + 1 },
  });
  revalidatePath(`/projects/${projectId}`);
  return task;
}

export async function updateTask(
  id: string,
  data: { title?: string; description?: string; completed?: boolean; order?: number }
) {
  const task = await db.task.update({ where: { id }, data });
  revalidatePath(`/projects/${task.projectId}`);
  return task;
}

export async function deleteTask(id: string) {
  const task = await db.task.delete({ where: { id } });
  revalidatePath(`/projects/${task.projectId}`);
}
