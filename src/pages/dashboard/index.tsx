import Link from "next/link";
import { api } from "@/utils/api";
import NewJobForm from "@/components/NewJobForm";
import JobList from "@/components/JobList";
import { useUser } from "@clerk/nextjs";
import { type Job, type JobDb } from "@/server/db/schema/job";
import moment from "moment";
import { useState } from "react";

type JobCache =
  | {
      data: JobDb[];
      updated: Date;
    }
  | undefined;

export default function Dashboard() {
  const client = api.useContext().client;
  const user = useUser();
  const userId = user.user?.id;
  let dbJobs: JobDb[] = [];
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  if (userId) {
    const userJobsCache =
      typeof window != "undefined" && userId
        ? localStorage.getItem(`${userId}-jobs`)
        : null;
    let updateJobs = false;
    checkCacheData: if (userJobsCache != null) {
      console.log("Getting Job cache");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: JobCache = JSON.parse(userJobsCache);
      if (!data) {
        break checkCacheData;
      }
      const unixHour = 3600;
      const lastHour = moment().unix() - unixHour;
      dbJobs = data?.data ? data.data : [];
      updateJobs = lastHour > moment(data.updated).unix();
      console.log(`updateJobs: ${updateJobs}`);
    }
    if (updateJobs || userJobsCache == null) {
      console.log("Updating job cache");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      client.jobs.getForUser
        .query({
          userId: userId ? userId : "",
        })
        .then((jobRes: JobDb[]) => {
          dbJobs = jobRes;
          localStorage.setItem(
            `${userId}-jobs`,
            JSON.stringify({
              data: jobRes,
              updated: new Date(),
            })
          );
        })
        .catch((err: unknown) => {
          console.log(err);
        });
    }
  }

  return (
    <main className="min-h-screen w-full bg-neutral-100 p-12">
      <div className="h-auto w-auto min-w-[250px] max-w-[350px] rounded-md bg-white">
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment*/}
        <NewJobForm userId={userId} updateJobs={setUserJobs} />
      </div>
      <br />
      <div>
        <JobList dbJobs={dbJobs} userJobs={userJobs} />
      </div>
      <Link href={"/"}>Home</Link>
    </main>
  );
}
