"use server"
import { type Job, type JobDb } from "@/utils/db/schema/job";
import { jobDb } from "@/utils/db/jobs";
import { revalidatePath } from "next/cache";

export async function updateJob(data: { status: "applied" | "rejected" | "interview" | "accepted", date: Date, currentJob: JobDb }) {
  console.log(data.date)
  const job: Job = { ...data.currentJob, status: data.status, statusDate: data.date } as Job
  jobDb.update(job);
  const path = `/dashboard/${data.currentJob.userId}/${data.currentJob.id}`;
  console.log(`Server: ${path}`);
  revalidatePath(path);
}