import { jobDb } from "@/utils/db/jobs";
import { type JobDb } from "@/utils/db/schema/job";
import DeleteJob from "@/components/DeleteJob/client";
import UpdateJobForm from "@/components/UpdateJobForm/client";

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
            <h3>Add Notes client Component</h3>
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
