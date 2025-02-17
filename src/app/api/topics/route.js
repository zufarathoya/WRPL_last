// import connectMongoDB from "@/libs/mongodb";
import { connectToDatabase } from '../../../libs/mongodb';
import { NextResponse } from "next/server";

async function fetchProducts() {
    const client = await connectToDatabase();
    const db = client.db('dbSales');
    const collection = db.collection('product');
    const products = await collection.find().toArray();
    return products;
}

export const GET = async () => {
    try {
        const products = await fetchProducts();
        return NextResponse.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
// export async function GET(req) {
//     return NextResponse.json({
//         hello: 'world',
//     })
// }
