import { api } from "@/utils/api";
import { type FormEvent, useState, ChangeEvent } from "react";
import { type Job } from "@/server/db/schema/job";

import { TextInput } from "@/components/ui/TextInput";
import DatePicker from "@/components/ui/DatePicker";
import { Button } from "./ui/Button";

export default function NewJobForm() {
  const client = api.useContext().client;
  const [job, setJob] = useState<Job>({
    company: "",
    applyDate: new Date(),
    status: "applied",
    statusDate: new Date(),
  });

  const testNewJob = (event: FormEvent) => {
    event.preventDefault();
    client.jobs.add
      .mutate(job)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={testNewJob} className="mx-auto h-full w-10/12">
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
                setJob({ ...job, applyDate: date, statusDate: date });
              }}
            />
          </div>
        </div>
        <Button variant={"default"} type="submit">
          Add job
        </Button>
      </div>
    </form>
  );
}
