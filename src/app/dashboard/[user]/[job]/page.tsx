import { jobDb } from "@/utils/db/jobs";
import { type JobDb } from "@/utils/db/schema/job";
import DeleteJob from "@/components/DeleteJob/client";
import UpdateJobForm from "@/components/UpdateJobForm/client";
import NotesForm from "@/components/NotesForm/client";
import { toRelative } from "@/utils/date";

export const revalidate = 0;
export const dynamic = "force-dynamic"

export default async function JobDetails({ params }: { params: { user: string, job: string } }) {
  const jobQuery: JobDb[] = await jobDb.getById(params.user, parseInt(params.job));
  const thisJob: JobDb | undefined = jobQuery[0];
  return (
    <>
      {thisJob ? (
        <main className="py-6 flex flex-col items-center gap-4">
          <p className="text-3xl">
            {thisJob.company}: {thisJob.status}
          </p>
          <div className="space-y-2 py-4">
            <p className="text-xl">
              Last Updated: {toRelative(thisJob.statusDate!)}
            </p>
            <p className="text-xl">Applied: {toRelative(thisJob.applyDate!)}</p>
          </div>
          <DeleteJob currentJob={thisJob} />
          <div className="flex flex-col items-center md:items-start md:flex-row gap-4 md:gap-10 w-full md:justify-center">
            <UpdateJobForm currentJob={thisJob} />
            <NotesForm currentJob={thisJob} />
          </div>
        </main>
      ) : (
        <main>
          <h1>An error occurred fetching your job information</h1>
        </main>
      )}
    </>
  );
}
