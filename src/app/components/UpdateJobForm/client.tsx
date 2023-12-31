"use client";
import { useState } from "react";
import * as Popover from '@radix-ui/react-popover';
import { DayPicker } from 'react-day-picker';
import moment from "moment";
import { updateJob } from "./jobAction";
import { type JobDb, type JobStatus } from "@/utils/db/schema/job";
import { toRelative } from "@/utils/date";

export default function UpdateJobForm({
  currentJob, setLastUpdated, setStatus
}: { currentJob: JobDb, setLastUpdated: CallableFunction, setStatus: CallableFunction }) {
  const [tmpStatus, setTmpStatus] = useState<JobStatus>(currentJob.status as JobStatus);
  const [date, setDate] = useState<Date>(new Date());
  return (
    <>
      <div className="h-full w-2/3 max-w-[300px] rounded-md shadow-md bg-white dark:bg-neutral-700">
        <form action={() => {
          updateJob({ status: tmpStatus, date: date, currentJob: currentJob! })
          setLastUpdated(date)
          setStatus(tmpStatus)
        }} className="mx-auto h-full w-10/12">
          <div className="mx-auto flex h-full flex-col space-y-8 p-4">
            <h3 className="pl-2 text-2xl font-medium">Update Job</h3>
            <div className="flex flex-col gap-2">
              <label htmlFor="status">Status</label>
              <select className="dark:bg-neutral-600" name="status" id="status" value={tmpStatus} onChange={(elm) => {
                setTmpStatus(elm.currentTarget.value as JobStatus);
              }}>
                <optgroup>
                  <option value="applied">Applied</option>
                  <option value="rejected">Rejected</option>
                  <option value="interview">Interview</option>
                  <option value="accepted">Accepted</option>
                </optgroup>
              </select>
            </div>
            <div>
              <Popover.Root>
                <Popover.Trigger asChild>
                  <div className="flex flex-row gap-4 cursor-pointer">
                    <button type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </button>
                    <p>{moment(date).format("M-D-YYYY")}</p>
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content>
                    <div className="bg-white border border-neutral-400 rounded-xl p-4">
                      <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={(val) => {
                          setDate(val!);
                        }}
                      />
                    </div>
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
            </div>
            <button type="submit" className="bg-neutral-800 px-1 py-2 rounded-full w-3/5 text-white">Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}