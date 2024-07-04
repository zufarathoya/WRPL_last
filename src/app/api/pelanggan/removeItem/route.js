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

export const POST = async (request) => {
    try {
        const { selected_product_id, selected_user_id, onRemove } = await request.json();
        const fetch = await fetchProducts();
        const products = await fetch.find().toArray();
        console.log(selected_product_id)
        console.log(selected_user_id)

        if (onRemove){
            removeItem(selected_product_id, selected_user_id)
        }
        return NextResponse.json(products);
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

const removeItem = async(selected_product_id, selected_user_id) => {
    const client = await connectToDatabase();
    const db = client.db('dbBuyers');
    const collection = db.collection('Chart');
    await collection.updateOne(
        { user_id: selected_user_id },
        { $pull: { products: { product_id: selected_product_id }}}
    );
}
