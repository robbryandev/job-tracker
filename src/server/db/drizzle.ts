/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { type Connection, connect } from "@planetscale/database";
import * as schema from "./schema/schema";

const connection: Connection = connect({
  url: process.env.DATABASE_URL,
});
export const db = drizzle(connection, { schema });
