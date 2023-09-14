import { type JobDb } from "@/utils/db/schema/job";
import Link from "next/link";

export default async function DisplayJobs({ userJobs }: { userJobs: JobDb[] }) {
  return (
    <div className="flex flex-col gap-2">
      {userJobs.map((job: JobDb) => {
        return <Link href={`/dashboard/${job.userId}/${job.id}`} key={job.id}>{job.company}</Link>
      })}
    </div>
  )
}