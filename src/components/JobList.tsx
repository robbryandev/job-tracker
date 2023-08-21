import { type JobDb, type Job } from "@/server/db/schema/job";
import moment from "moment";
import { Suspense } from "react";

export default function JobList({
  dbJobs,
  userJobs,
}: {
  dbJobs: JobDb[] | undefined;
  userJobs: Job[];
}) {
  const jobs = dbJobs ? [...dbJobs, ...userJobs] : [...userJobs];
  return (
    <table className="table-auto border-separate border-spacing-2">
      <thead>
        <tr>
          <th>Company</th>
          <th>Last Updated</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <Suspense fallback={<p>loading...</p>}>
          {jobs.map((job, index) => {
            const dateFormat = "YYYY-MM-DD";
            const statusDate = moment(job.statusDate, dateFormat).format(
              dateFormat
            );
            const today = moment().format(dateFormat);
            const relativeStatusDate = moment(statusDate, dateFormat).from(
              today
            );
            const displayDate =
              statusDate == today ? "today" : relativeStatusDate;
            return (
              <tr key={index}>
                <td>{job.company}</td>
                <td>{displayDate}</td>
                <td>{job.status}</td>
                <td>
                  <a
                    href={`/dashboard/${job.userId}/${job.id}`}
                    className="underline underline-offset-1"
                  >
                    details
                  </a>
                </td>
              </tr>
            );
          })}
        </Suspense>
      </tbody>
    </table>
  );
}
