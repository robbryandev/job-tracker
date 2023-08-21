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
    <table className="mx-auto w-10/12 table-auto border-collapse border-spacing-x-20 border-spacing-y-10 overflow-x-scroll border bg-neutral-200 shadow-md md:mx-4 md:w-auto md:border-spacing-80">
      <thead>
        <tr>
          <th>Company</th>
          <th className="hidden md:block">Last Updated</th>
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
              <tr key={index} className="odd:bg-white even:bg-neutral-100">
                <td className="py-4 pl-4 pr-6">{job.company}</td>
                <td className="hidden px-6 py-4 md:block">{displayDate}</td>
                <td className="px-6 py-4">{job.status}</td>
                <td className="py-4 pl-6 pr-4">
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
