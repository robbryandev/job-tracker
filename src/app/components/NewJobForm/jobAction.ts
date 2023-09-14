"use server"
import { currentUser } from "@clerk/nextjs";
import { type Job } from "@/utils/db/schema/job";
import { jobDb } from "@/utils/db/jobs";
import { revalidatePath } from "next/cache";

export async function newJob(data: FormData) {
  const company = data.get("company")!.toString();
  const date = new Date(data.get("date")!.toString());
  console.log(date)
  const user = await currentUser();
  const job: Job = {
    company: company,
    applyDate: date,
    status: "applied",
    statusDate: date,
    userId: user!.id,
    id: undefined,
  };
  jobDb.add(job);
  revalidatePath("/dashboard")
}