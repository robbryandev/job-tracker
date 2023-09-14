import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { schema as jobSchema } from "./job";

export const jobTable = jobSchema;
export const insertJobSchema = createInsertSchema(jobSchema);
export const selectJobSchema = createSelectSchema(jobSchema);
