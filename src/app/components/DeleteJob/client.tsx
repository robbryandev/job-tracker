"use client"

import { type JobDb } from "@/utils/db/schema/job";
import * as Popover from "@radix-ui/react-popover";
import { deleteJob } from "./jobAction";
import { useRouter } from "next/navigation";

export default function DeleteJob({ currentJob }: { currentJob: JobDb }) {
  const router = useRouter();
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button>Delete</button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <div className="bg-white shadow-md p-6">
            <form action={() => deleteJob(currentJob)} onSubmit={() => {
              setTimeout(() => {
                router.push("/dashboard");
              }, 250)
            }}>
              <h2>Are you sure you want to delete this job?</h2>
              <div className="pt-2 space-x-6">
                <button type="submit" className="font-semibold underline underline-offset-2">Delete</button>
                <Popover.Close>
                  Cancel
                </Popover.Close>
              </div>
            </form>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}