import { NextResponse } from "next/server";
import { connectToDatabase } from '../../../../libs/mongodb';
import { ObjectId } from 'mongodb';

export const POST = async(request) => {
    const { _id, userId, quantity } = await request.json();
    const client = await connectToDatabase();
    const db = client.db('dbSales');
    const product = db.collection('product');
    const productExist = await product.findOne({
        _id: new ObjectId(_id)
    });
    if(!productExist){
        console.log('Error')
        return new NextResponse("Product not found", {
            status: 400,
        })
    }
    const dbPelanggan = client.db('dbBuyers')
    const cart = dbPelanggan.collection('Chart');
    const cartExist = await cart.findOne({
        user_id: userId
    });
    if(!cartExist){
        const newCart = {
            user_id: userId,
            products: [
                {
                    product_id: _id,
                    kuantitas: parseInt(quantity),
                    nama: productExist.nama,
                    harga: parseInt(productExist.harga),
                    merek: productExist.merek,
                }
            ]
        }
        await cart.insertOne(newCart);
    } else {
        const productExistInCart = cartExist.products.find(product => product.product_id == _id);
        if(productExistInCart){
            productExistInCart.kuantitas += parseInt(quantity);
        } else {
            cartExist.products.push({
                product_id: _id,
                    kuantitas: quantity,
                    nama: productExist.nama,
                    harga: parseInt(productExist.harga),
                    merek: productExist.merek,
            });
        }
        await cart.updateOne(
            { user_id: userId },
            { $set: { products: cartExist.products } }
        );
    }
    return new NextResponse("Product has been added to cart", {
        status: 201,
    })
}