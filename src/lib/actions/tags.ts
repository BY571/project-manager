"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function getTags() {
  return db.tag.findMany({ orderBy: { name: "asc" } });
}

export async function createTag(name: string, color: string = "#6366f1") {
  const tag = await db.tag.create({ data: { name, color } });
  revalidatePath("/");
  return tag;
}

export async function deleteTag(id: string) {
  await db.tag.delete({ where: { id } });
  revalidatePath("/");
}
