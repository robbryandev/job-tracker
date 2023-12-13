"use client"
import { type JobDb } from "@/utils/db/schema/job";
import { updateNotes } from "./NoteAction";
import { useState } from "react";

export default function NotesForm({ currentJob, setLastUpdated }: { currentJob: JobDb, setLastUpdated: CallableFunction }) {
    const textSize = [30, 10];
    const [contentState, setContent] = useState<string>(currentJob.content ?? "");
    return (
        <form action={(data) => {
            updateNotes({ "job": currentJob, content: contentState })
            setLastUpdated(new Date());
        }}>
            <textarea className="border border-spacing-2 border-neutral-300 p-2 dark:bg-neutral-700" name="content" id="content" cols={textSize[0]} rows={textSize[1]} value={contentState} placeholder="Notes" onChange={(elm) => {
                setContent(elm.currentTarget.value)
            }}></textarea>
            <br />
            <button type="submit" className="bg-neutral-800 text-white px-2 py-1 rounded-md hover:bg-neutral-600">Save</button>
        </form>
    )
}