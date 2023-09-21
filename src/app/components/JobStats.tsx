"use client"

import { type JobDb } from "@/utils/db/schema/job";
import { statusColor } from "@/utils/color";
import { SiInstatus } from "react-icons/si";
import { Switch } from "@mui/material";
import { useCallback, useState } from "react";
import useLocal from "@/hooks/useLocal";

export default function JobStats({ userJobs }: { userJobs: JobDb[] }) {
    const { value: enabled, setValue: setEnabled } = useLocal("stats-enabled", "true");
    const isEnabled = () => enabled == "true";
    const jobCounts: Record<string, number> = (() => {
        let applied = 0;
        let rejected = 0;
        let interview = 0;
        let accepted = 0;

        userJobs.forEach((thisJob: JobDb) => {
            switch (thisJob.status) {
                case "applied":
                    applied++;
                    break;
                case "rejected":
                    rejected++;
                    break;
                case "accepted":
                    accepted++;
                    break;
                case "interview":
                    interview++;
                    break;
                default:
                    break;
            }
        });
        return {
            applied: applied,
            rejected: rejected,
            interview: interview,
            accepted: accepted
        }
    })();
    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-row">
                <p className="pt-2 pr-2">Show stats</p>
                <Switch defaultChecked={isEnabled()} onChange={(ev, checked) => {
                    setEnabled(`${checked}`);
                }} />
            </div>
            {
                isEnabled() && (
                    <div className="flex flex-row flex-wrap gap-4 md:pt-2 md:pl-4">
                        {
                            Object.keys(jobCounts).map((key: string) => {
                                return <pre key={`status-${key}`}><SiInstatus className="svg-inline" style={{ color: statusColor[key] }} />{key}  {jobCounts[key]}</pre>
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}