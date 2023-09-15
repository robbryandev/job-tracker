"use server"
import { jobDb } from "@/utils/db/jobs";
import { JobDb } from "@/utils/db/schema/job";
import { revalidatePath } from "next/cache";

export async function deleteJob(currentJob: JobDb) {
  jobDb.delete(currentJob.id);
  const path = `/dashboard/${currentJob.userId}/${currentJob.id}`;
  revalidatePath(path);
}