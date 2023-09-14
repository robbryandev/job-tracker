"use server"
import { currentUser } from "@clerk/nextjs"
import { jobDb } from "../utils/db/jobs";
import NewJobForm from "@/components/NewJobForm/client";
import DisplayJobs from "@/components/DisplayJobs";
import { type JobDb } from "@/utils/db/schema/job";
import { revalidatePath } from "next/cache";

export default async function Dashboard() {
  const user = await currentUser()!;
  const userJobs: JobDb[] = await jobDb.getAll(user!.id);
  return (
    <>
      <NewJobForm />
      <DisplayJobs userJobs={userJobs} />
      <footer></footer>
    </>
  )
}