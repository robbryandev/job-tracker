/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import { type Job, type JobDb } from "@/server/db/schema/job";
import { toRelative } from "@/utils/date";

export default function NewJobList({
  dbJobs,
  userJobs,
}: {
  dbJobs: JobDb[] | undefined;
  userJobs: Job[];
}) {
  const jobs = dbJobs ? [...dbJobs, ...userJobs] : [...userJobs];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Company</TableCell>
          <TableCell>Last Updated</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => {
          const displayDate = toRelative(job.statusDate!);
          return (
            <TableRow key={job.id}>
              <TableCell>{job.company}</TableCell>
              <TableCell>{displayDate}</TableCell>
              <TableCell>{job.status}</TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/${job.userId ? job.userId : "error"}/${job.id
                    }`}
                  className="underline underline-offset-1"
                >
                  details
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
