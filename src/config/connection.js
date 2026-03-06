import { Pool } from 'pg';
import 'dotenv/config';

const connect = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  port: process.env.PGPORT || 5432,
});

connect.on('connect', () => {
  console.log('✅ Base de dados conectada com sucesso!');
});

export default connect;