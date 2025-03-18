import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
const sql = neon(process.env.DATABASE_URL!); //환경변수에 넣은 .env Connection String neon db연결해주는 코드
const db = drizzle(sql, { schema });  //neon 클라이언트를 drizzle 에 넣어주는 변수

export default db;

