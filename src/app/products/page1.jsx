import { connectToDatabase } from '../../libs/mongodb';
// import React, { useState, useEffect } from 'react';


let list_product = []

export default function ProductsPage() {
    // const { db } = await connectToDatabase();
    // const collection = db.collection('products');
    // const products = await collection.find().toArray();
    // console.log(products)

    const fetchData = async() => {
        const { db } = await connectToDatabase();
        const collection = db.collection('products');
        const products = await collection.find().toArray();
        list_product = products
        return products
    }
    let products = []
    const updateProducts = async() => {
        products = await fetchData();
    }
    
    updateProducts();

    return (
        <div>
            <h1>Products</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>ID</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Nama</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id.toString()}>
                            <td style={{ padding: '8px', border: '1px solid #ddd',  textAlign: 'center'  }}>{product._id.toString()}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd',  textAlign: 'center'  }}>{product.nama.toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
