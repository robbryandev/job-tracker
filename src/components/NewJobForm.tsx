import { api } from "@/utils/api";
import { type FormEvent, type ChangeEvent, useState } from "react";
import { type Job } from "@/server/db/schema/job";

import { TextInput } from "@/components/ui/TextInput";
import DatePicker from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/Button";
import moment from "moment";

export default function NewJobForm({
  userId,
  currentJobs,
  updateJobs,
}: {
  userId: string;
  currentJobs: Job[];
  updateJobs: Function;
}) {
  const client = api.useContext().client;
  const defaultJob: Job = {
    company: "",
    applyDate: new Date(),
    status: "applied",
    statusDate: new Date(),
    userId: userId,
    id: undefined,
  };
  const [job, setJob] = useState<Job>(defaultJob);

  const addNewJob = (event: FormEvent) => {
    event.preventDefault();
    client.jobs.add
      .mutate(job)
      .then((res) => {
        console.log(res);
        const getCache = localStorage.getItem(`${userId}-jobs`);
        const currCache: { data: Job[]; updated: Date } = JSON.parse(
          getCache
            ? getCache
            : JSON.stringify({ data: [], updated: new Date() })
        );
        if (typeof res != "string") {
          console.log(`setting id: ${res.jobId}`);
          setJob({ ...job, id: res.jobId });
          updateJobs([...currentJobs, { ...job, id: res.jobId }]);
          currCache.data = [...currCache.data, { ...job, id: res.jobId }];
        } else {
          console.log("failed to set id");
          console.log(res);
        }
        currCache.updated = new Date();
        localStorage.setItem(`${userId}-jobs`, JSON.stringify(currCache));
        // updateJobs([...currentJobs, job]);
        setJob(defaultJob);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-full w-full rounded-md shadow-md">
      <form onSubmit={addNewJob} className="mx-auto h-full w-10/12">
        <div className="mx-auto flex h-full flex-col space-y-8 p-4">
          <h3 className="pl-2 text-2xl font-medium">New Job</h3>
          <div>
            <TextInput
              label="Company"
              name="company"
              id="company"
              value={job.company}
              onChange={(event: ChangeEvent) => {
                const target = event.currentTarget as HTMLInputElement;
                setJob({ ...job, company: target.value });
              }}
            />
          </div>
          <div>
            <div>
              <DatePicker
                label="Application Date"
                onDateChange={(date: Date) => {
                  const logDate: string = moment(date, "YYYY-MM-DD").format(
                    "YYYY-MM-DD"
                  );
                  console.log(`New date: ${logDate}`);
                  setJob({
                    ...job,
                    applyDate: date,
                    statusDate: moment(logDate).toDate(),
                  });
                }}
              />
            </div>
          </div>
          <Button variant={"default"} type="submit" disabled={userId == ""}>
            Add job
          </Button>
        </div>
      </form>
    </div>
  );
}
