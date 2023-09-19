import { jobDb } from "@/utils/db/jobs";
import { type JobDb } from "@/utils/db/schema/job";
import DeleteJob from "@/components/DeleteJob/client";
import UpdateJobForm from "@/components/UpdateJobForm/client";
import NotesForm from "@/components/NotesForm/client";

export const revalidate = 0;
export const dynamic = "force-dynamic"

export default async function JobDetails({ params }: { params: { user: string, job: string } }) {
  const jobQuery: JobDb[] = await jobDb.getById(params.user, parseInt(params.job));
  const thisJob: JobDb | undefined = jobQuery[0];
  return (
    <>
      {thisJob ? (
        <main>
          <p className="text-center text-3xl">
            {thisJob.company}: {thisJob.status}
          </p>
          <br />
          <DeleteJob currentJob={thisJob} />
          <UpdateJobForm currentJob={thisJob} />
          <div>
            <p>Notes</p>
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
