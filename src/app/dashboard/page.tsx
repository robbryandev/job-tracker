"use server"
import { currentUser } from "@clerk/nextjs"
import { jobDb } from "../utils/db/jobs";
import NewJobForm from "@/components/NewJobForm/client";
import DisplayJobs from "@/components/DisplayJobs";
import JobStats from "@/components/JobStats";
import { type JobDb } from "@/utils/db/schema/job";

export default async function Dashboard() {
  const user = await currentUser()!;
  const userJobs: JobDb[] = await jobDb.getAll(user!.id);
  return (
    <main>
      <JobStats userJobs={userJobs} />
      <div className="flex flex-col md:flex-row gap-6 pt-2">
        <NewJobForm />
        <DisplayJobs userJobs={userJobs} />
      </div>
    </main>
  )
}