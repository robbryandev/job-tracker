"use server"
import { type Job, type JobDb } from "@/utils/db/schema/job";
import { jobDb } from "@/utils/db/jobs";

export async function updateJob(data: { status: "applied" | "rejected" | "interview" | "accepted", date: Date, currentJob: JobDb }) {
  const job: Job = { ...data.currentJob, status: data.status, statusDate: data.date } as Job
  jobDb.update(job);
}