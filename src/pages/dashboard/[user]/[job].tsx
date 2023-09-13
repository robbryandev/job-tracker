/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Link from "next/link";
import { toRelative } from "@/utils/date";
import { useState } from "react";

export default function JobDetails() {
  const router = useRouter();
  const [notes, setNotes] = useState<string>("");
  const userJobQuery = api.jobs.get.useQuery({
    userId: typeof router.query.user == "string" ? router.query.user : "",
    jobId: parseInt(
      typeof router.query.job == "string" ? router.query.job : "0"
    ),
  });
  const userJobData = userJobQuery.isLoading ? undefined : userJobQuery.data;
  if (!userJobData || userJobData?.length == 0) {
    return (
      <>
        <Link href="/dashboard">Back</Link>
      </>
    );
  }
  const { company, applyDate, status, statusDate, content } = userJobData![0]!;
  return (
    <>
      <Link href="/dashboard">Back</Link>
      <p className="text-center text-3xl">
        {company}: {status}
      </p>
      <br />
      <div>
        <p className="text-center text-xl">Applied: {toRelative(applyDate!)}</p>
        <p className="text-center text-xl">
          Last Updated: {toRelative(statusDate!)}
        </p>
      </div>
      <div>
        <form>
          <p>Notes</p>
          <textarea
            className="border border-black"
            name="notes"
            id="notes"
            cols={30}
            rows={10}
            value={notes ?? content ?? ""}
            onChange={(elm) => setNotes(elm.currentTarget.value)}
          ></textarea>
          <br />
        </form>
        <button>Save</button>
      </div>
    </>
  );
}
