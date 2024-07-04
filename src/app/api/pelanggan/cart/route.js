import { connectToDatabase } from '../../../../libs/mongodb';
import { NextResponse } from "next/server";

async function fetchProducts() {
    const client = await connectToDatabase();
    const db = client.db('dbBuyers');
    const collection = db.collection('Chart');
    return collection
    // const products = await collection.find().toArray();
    // return products;
}

export const GET = async () => {
    try {
        const fetch = await fetchProducts();
        const products = await fetch.find().toArray();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

const removeItem = async() => {
    
}