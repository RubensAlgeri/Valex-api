import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

const connectionsConfig:pg = {
    connectionString: process.env.DATABASE_URL
}

if (process.env.MODE === 'PROD'){
    connectionsConfig.ssl = {
    rejectUnauthorized: false
    }
}

const connection = new Pool(connectionsConfig);

export default connection;