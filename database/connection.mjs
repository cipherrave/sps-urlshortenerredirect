// establish connection with PostgreSQL database
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "admin",
  database: "url_shortener",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected to database", client.database);
  } catch (error) {
    console.log("Could not connect to database", error);
  }
}

export default pool;
