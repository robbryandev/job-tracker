import { jobDb } from "@/utils/db/jobs";
import { type JobDb } from "@/utils/db/schema/job";
import JobDetailsClient from "./client";

export default async function JobDetails({ params }: { params: { user: string, job: string } }) {
  const jobQuery: JobDb[] = await jobDb.getById(params.user, parseInt(params.job));
  const thisJob: JobDb | undefined = jobQuery[0];
  return (
    <>
      {thisJob ? (
        <JobDetailsClient thisJob={thisJob} />
      ) : (
        <main>
          <h1>An error occurred fetching your job information</h1>
        </main>
      )}
    </>
  );
}
