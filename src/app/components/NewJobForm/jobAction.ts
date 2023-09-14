"use server"
import { currentUser } from "@clerk/nextjs";
import { type Job } from "@/utils/db/schema/job";
import { jobDb } from "@/utils/db/jobs";
import { revalidatePath } from "next/cache";

export async function newJob(data: { company: string, date: Date }) {
  console.log(data.date)
  const user = await currentUser();
  const job: Job = {
    company: data.company,
    applyDate: data.date,
    status: "applied",
    statusDate: data.date,
    userId: user!.id,
    id: undefined,
  }

  jobDb.add(job);
  revalidatePath("/dashboard")
}