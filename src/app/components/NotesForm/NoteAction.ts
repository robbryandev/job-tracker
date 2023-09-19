"use server"

import { type JobDb, type Job } from "@/utils/db/schema/job";
import { jobDb } from "@/utils/db/jobs";
import { revalidatePath } from "next/cache";

export async function updateNotes(data: { job: JobDb, content: string }) {
    const job: Job = { ...data.job, content: data.content } as Job;
    jobDb.update(job);
    setTimeout(() => {
        const path = `/dashboard/${job.userId}/${job.id}`;
        revalidatePath(path, "page");
        revalidatePath(`/dashboard/`);
        console.log("sent revalidatePath for updateNotes");
    }, 200)
}