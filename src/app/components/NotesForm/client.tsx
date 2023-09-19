"use client"
import { type JobDb } from "@/utils/db/schema/job";
import { updateNotes } from "./NoteAction";
import { useState } from "react";

export default function NotesForm({ currentJob }: { currentJob: JobDb }) {
    const textSize = [30, 10];
    const [contentState, setContent] = useState<string>(currentJob.content ?? "");
    return (
        <form action={(data) => {
            updateNotes({ "job": currentJob, content: contentState })
        }}>
            <textarea className="border border-spacing-2 border-neutral-300 p-2" name="content" id="content" cols={textSize[0]} rows={textSize[1]} value={contentState} onChange={(elm) => {
                setContent(elm.currentTarget.value)
            }}></textarea>
            <br />
            <button type="submit" className="bg-neutral-800 text-white px-2 py-1 rounded-md hover:bg-neutral-600">Save</button>
        </form>
    )
}