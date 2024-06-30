// // pages/api/products.js
// import { connectToDatabase } from '../../libs/mongodb';

// // export default async function handler(req, res) {
// //     try {
// //         const { db } = await connectToDatabase();
// //         const collection = db.collection('products');
// //         const products = await collection.find().toArray();
// //         res.status(200).json(products);
// //     } catch (error) {
// //         console.error('Error fetching products:', error);
// //         res.status(500).json({ error: 'Failed to fetch products' });
// //     }
// // }

// // import React, { useState, useEffect } from 'react';


// let list_product = []

//     // const { db } = await connectToDatabase();
//     // const collection = db.collection('products');
//     // const products = await collection.find().toArray();
//     // console.log(products)

// const fetchData = async() => {
//     const { db } = await connectToDatabase();
//     const collection = db.collection('products');
//     const products = await collection.find().toArray();
//     list_product = products
//     return products
// }
// export default fetchData