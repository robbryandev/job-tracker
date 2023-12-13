"use client"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { type JobDb } from '@/utils/db/schema/job';
import { toRelative } from '@/utils/date';
import { SiInstatus } from "react-icons/si";
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { statusColor } from '@/utils/color';

export default function DisplayJobs({ userJobs }: { userJobs: JobDb[] }) {
  const router = useRouter();
  const datedJobs: JobDb[] = [...userJobs].sort((a: JobDb, b: JobDb) => {
    return moment(a.statusDate).unix() >= moment(b.statusDate).unix() ? -1 : 1;
  });
  return (
    <TableContainer component={Paper} className='max-w-3xl md:max-w-none dark:!bg-neutral-700'>
      <Table aria-label="job table">
        <TableHead className='bg-neutral-800'>
          <TableRow>
            <TableCell>
              <h3 className="text-white">
                Company
              </h3>
            </TableCell>
            <TableCell>
              <h3 className="text-white">Status</h3>
            </TableCell>
            <TableCell>
              <h3 className="text-white">Last Updated</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='[&>*:nth-child(odd)]:bg-neutral-50 dark:[&>*:nth-child(odd)]:bg-neutral-500 dark:[&>*:nth-child(even)]:bg-neutral-600'>
          {
            datedJobs.map((job: JobDb) => {
              const jobPath = `/dashboard/${job.userId}/${job.id}`
              return (
                <TableRow key={job.id} role="link" className='cursor-pointer' onClick={() => {
                  router.push(jobPath);
                }}>
                  <TableCell className='dark:!text-white'>
                    <a
                      href={jobPath}
                      className="underline underline-offset-1"
                    >
                      {job.company}
                    </a>
                  </TableCell>
                  <TableCell className='dark:!text-white'>
                    <pre><SiInstatus className="svg-inline" style={{ color: statusColor[job.status!] }} />  {job.status}</pre>
                  </TableCell>
                  <TableCell className='dark:!text-white'>{toRelative(job.statusDate!)}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}