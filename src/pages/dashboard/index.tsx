import Link from "next/link";
import { api } from "@/utils/api";
import NewJobForm from "@/components/NewJobForm";
import JobDisplay from "@/components/JobDisplay";

export default function Dashboard() {
  const hello = api.jobs.test.useQuery().data;
  return (
    <main className="min-h-screen w-full bg-neutral-100 p-12">
      <p>{hello}</p>
      <div className="h-auto w-auto min-w-[250px] max-w-[350px] rounded-md bg-white">
        <NewJobForm />
      </div>
      <br />
      <div className="min-w-fit max-w-sm bg-white">
        <JobDisplay
          company="Test Company"
          applyDate={new Date()}
          status="accepted"
          statusDate={new Date()}
        />
      </div>
      <Link href={"/"}>Home</Link>
    </main>
  );
}
