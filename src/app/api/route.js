// pages/api/products.js
import { connectToDatabase } from '../../libs/mongodb';
import { NextResponse } from 'next/server';

// export default async function handler(req, res) {
//     try {
//         const { db } = await connectToDatabase();
//         const collection = db.collection('products');
//         const products = await collection.find().toArray();
//         res.status(200).json(products);
//     } catch (error) {
//         console.error('Failed to fetch products:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

export async function GET(req) {
    return NextResponse.json({
        hello: 'world',
    })
}