"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createNote(
  projectId: string,
  content: string,
  type: "note" | "blocker" = "note"
) {
  const note = await db.note.create({ data: { projectId, content, type } });
  revalidatePath(`/projects/${projectId}`);
  return note;
}

export async function updateNote(
  id: string,
  data: { content?: string; resolved?: boolean }
) {
  const note = await db.note.update({ where: { id }, data });
  revalidatePath(`/projects/${note.projectId}`);
  return note;
}

export async function deleteNote(id: string) {
  const note = await db.note.delete({ where: { id } });
  revalidatePath(`/projects/${note.projectId}`);
}
