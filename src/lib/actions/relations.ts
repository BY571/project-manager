"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createRelation(data: {
  sourceProjectId: string;
  targetProjectId: string;
  type: string;
  label?: string;
}) {
  const relation = await db.projectRelation.create({ data });
  revalidatePath("/");
  revalidatePath(`/projects/${data.sourceProjectId}`);
  revalidatePath(`/projects/${data.targetProjectId}`);
  return relation;
}

export async function deleteRelation(id: string) {
  const relation = await db.projectRelation.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath(`/projects/${relation.sourceProjectId}`);
  revalidatePath(`/projects/${relation.targetProjectId}`);
}
