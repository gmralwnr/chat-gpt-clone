import { user } from "@/db/schema";
//user type 정의 
export type User = typeof user.$inferSelect;
