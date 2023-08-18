import { type Job } from "@/server/db/schema/job";
import { twMerge } from "tailwind-merge";
import moment from "moment";

// import { Button } from "./ui/Button";

export default function JobDisplay(props: Job) {
  const statusColors: Record<string, string> = {
    applied: "border-sky-300",
    rejected: "border-red-300",
    interview: "border-purple-400",
    accepted: "border-lime-500",
  };
  return (
    <div
      className={twMerge(
        "grid w-full border-spacing-2 grid-flow-col border-t-8 px-4 py-2 shadow-sm",
        statusColors[props.status]
      )}
    >
      <div>
        <p className="text-xl">{props.company}</p>
        <p>Updated: {moment(props.statusDate).fromNow()}</p>
      </div>
      <div></div>
      {/* <Button className="self-center" variant={"link"}>
        Edit
      </Button> */}
    </div>
  );
}
