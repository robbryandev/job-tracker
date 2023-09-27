"use client";

import { type JobStatus, type JobDb } from "@/utils/db/schema/job";
import { toRelative } from "@/utils/date";
import DeleteJob from "@/components/DeleteJob/client";
import UpdateJobForm from "@/components/UpdateJobForm/client";
import NotesForm from "@/components/NotesForm/client";
import { useState } from "react";

export default function JobDetailsClient({ thisJob }: { thisJob: JobDb }) {
    const [lastUpdated, setLastUpdated] = useState<Date>(thisJob.statusDate ?? new Date());
    const [status, setStatus] = useState<JobStatus>(thisJob.status ?? "applied");
    return (
        <main className="py-6 flex flex-col items-center gap-4">
            <p className="text-3xl">
                {thisJob.company}: {status}
            </p>
            <div className="space-y-2 py-4">
                <p className="text-xl">
                    Last Updated: {toRelative(lastUpdated)}
                </p>
                <p className="text-xl">Applied: {toRelative(thisJob.applyDate!)}</p>
            </div>
            <DeleteJob currentJob={thisJob} />
            <div className="flex flex-col items-center md:items-start md:flex-row gap-4 md:gap-10 w-full md:justify-center">
                <UpdateJobForm currentJob={thisJob} setLastUpdated={setLastUpdated} setStatus={setStatus} />
                <NotesForm currentJob={thisJob} setLastUpdated={setLastUpdated} />
            </div>
        </main>
    )
}