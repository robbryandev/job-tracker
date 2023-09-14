import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { type JobDb } from '@/utils/db/schema/job';
import { toRelative } from '@/utils/date';
import colors from "tailwindcss/colors";
import { SiInstatus } from "react-icons/si";

export default async function DisplayJobs({ userJobs }: { userJobs: JobDb[] }) {
  const statusColor = {
    "applied": colors.blue["300"],
    "rejected": colors.red["400"],
    "interview": colors.purple["300"],
    "accepted": colors.green["500"]
  }
  return (
    <TableContainer component={Paper} className='max-w-3xl'>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
        <TableBody className='[&>*:nth-child(odd)]:bg-neutral-50'>
          {
            userJobs.map((job: JobDb) => {
              return (
                <TableRow key={job.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/${job.userId ? job.userId : "error"}/${job.id
                        }`}
                      className="underline underline-offset-1"
                    >
                      {job.company}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <pre><SiInstatus className="svg-inline" style={{ color: statusColor[job.status!] }} />  {job.status}</pre>
                  </TableCell>
                  <TableCell>{toRelative(job.statusDate!)}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}