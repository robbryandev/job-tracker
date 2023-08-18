import { api } from "@/utils/api";
import { type FormEvent, useState } from "react";
import { type Job } from "@/server/db/schema/job";

export default function NewJobForm() {
  const client = api.useContext().client;
  const [job, setJob] = useState<Job>({
    company: "",
    applyDate: new Date(),
    status: "applied",
    statusDate: new Date(),
  });

  function formatDateForInput(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
    <form onSubmit={testNewJob}>
      <input
        type="text"
        name="company"
        id="company"
        value={job.company}
        onChange={(event) => setJob({ ...job, company: event.target.value })}
      />
      <input
        type="date"
        name="applyDate"
        id="applyDate"
        value={formatDateForInput(job.applyDate)}
        onChange={(event) => {
          const currDate: Date = new Date(event.target.value);
          setJob({ ...job, applyDate: currDate, statusDate: currDate });
        }}
      />
      <button type="submit">Add job</button>
    </form>
  );
}
