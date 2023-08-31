import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Link from "next/link";

export default function JobDetails() {
  const router = useRouter();
  const userJobQuery = api.jobs.get.useQuery({
    userId: typeof router.query.user == "string" ? router.query.user : "",
    jobId: parseInt(
      typeof router.query.job == "string" ? router.query.job : "0"
    ),
  });
  const userJob = userJobQuery.isLoading ? undefined : userJobQuery.data;
  return (
    <>
      <Link href="/dashboard">Back</Link>
      <p>{JSON.stringify(userJob)}</p>
    </>
  );
}
