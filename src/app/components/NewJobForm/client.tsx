"use client";
import { useState } from "react";
import moment from "moment";
import { newJob } from "./jobAction";

export default function NewJobForm() {
  const [company, setCompany] = useState("");
  const [date, setDate] = useState(new Date());
  return (
    <div className="h-full w-2/3 max-w-[300px] rounded-md shadow-md">
      <form action={(data) => newJob(data)} onSubmit={() => {
        setCompany("");
      }} className="mx-auto h-full w-10/12">
        <div className="mx-auto flex h-full flex-col space-y-8 p-4">
          <h3 className="pl-2 text-2xl font-medium">New Job</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="company">Company</label>
            <input type="text" name="company" id="company" value={company} onChange={(event) => { setCompany(event.currentTarget.value) }} className="bg-transparent border-b border-b-neutral-200" required />
          </div>
          <div>
            <div>
              <input type="date" name="date" id="date" value={moment(date).format("YYYY-MM-DD")} onChange={(event) => { setDate(new Date(event.currentTarget.value)) }} required />
            </div>
          </div>
          <button type="submit" className="bg-neutral-800 px-1 py-2 rounded-full w-3/5 text-white">Submit</button>
        </div>
      </form>
    </div>
  )
}