/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { schema as jobSchema } from "./job";

export const jobTable = jobSchema;
export const insertJobSchema = createInsertSchema(jobSchema);
export const selectJobSchema = createSelectSchema(jobSchema);
