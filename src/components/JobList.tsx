import { type JobDb, type Job } from "@/server/db/schema/job";
import moment from "moment";

export default function JobList({
  dbJobs,
  userJobs,
}: {
  dbJobs: JobDb[] | undefined;
  userJobs: Job[];
}) {
  const jobs = dbJobs ? [...userJobs, ...dbJobs] : [...userJobs];
  return (
    <table className="table-auto border-separate border-spacing-2">
      <thead>
        <tr>
          <th>Company</th>
          <th>Last Updated</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => {
          return (
            <tr key={index}>
              <td>{job.company}</td>
              <td>{moment(job.statusDate).fromNow()}</td>
              <td>{job.status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
