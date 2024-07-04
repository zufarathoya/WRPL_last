import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToDatabase() {
    if (!client.isConnected) {
        await client.connect();
    }
    // const db = client.db('Gudang');
    // return { db, client };
    return client
}