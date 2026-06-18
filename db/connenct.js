import { MongoClient } from "mongodb";

const connectioString = process.env.ATLAS_URI;

const client = new MongoClient(connectioString);

let conn;
try {
    conn = await client.connect();
    console.log("mongodb connected")
} catch (error) {
    console.error(error);
}

let db = conn.db("openai");
export default db;