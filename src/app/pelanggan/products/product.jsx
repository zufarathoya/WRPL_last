'use client'
import { redirect } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from "next/link";
import { signIn } from "next-auth/react"

const fetching = async () => {
    try {
        const response = await fetch('../api/topics/');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // or handle error state as needed
    }
};

const getCategory = async (category) => {
    try {
        const response = await fetch('../api/topics/');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const filteredData = data.filter(item => item.kategori == category);
        return filteredData;
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // or handle error state as needed
    }
};

const getUniqueCategories = (products) => {
    const categories = products.map(product => product.kategori);
    return Array.from(new Set(categories)); // Convert the Set back to an array
};

export default function ProductsPage({userId}) {
    const [products, setProducts] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);

    // const router = useRouter();
    
    useEffect(() => {
        fetching().then(data => {
            setProducts(data);
            setUniqueCategories(getUniqueCategories(data));
        });
    }, []);
    console.log(products)
    // const buyProduct = () => {
    //     redirect('../buy_product')
    // } 

    return (
    <div className="container mx-auto p-4">
        <div>{userId}</div>
        <button 
            className="bg-black rounded-md px-3 text-sm h-7 cursor-pointer"
            onClick={() => signIn()}
        ></button>
        <h1 className="text-2xl font-bold mb-4">Product List</h1>
        <form className="mb-4">
            <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">Sort by Category:</label>
            <div className="static">
                <select name="kategori" id="kategori" className="mt-1 w-1/3 py-2 px-3 border border-gray-300 bg-white rounded-md sm:text-sm inline-block">
                    <option value="">All</option>
                    {uniqueCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 inline-block">Find</button>
            </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <div key={product._id} className="bg-white shadow-md rounded-lg h-56 overflow-hidden relative">
                    <div className="p-2">
                        <h2 className="text-lg font-semibold mb-2">{product.nama}</h2>
                        <p className="text-gray-700 mb-2">Price: {product.harga}</p>
                        <p className="text-gray-700 mb-2">Stock: {product.stok}</p>
                        <p className="text-gray-700 mb-2">Category: {product.kategori}</p>
                    </div>
                    {/* <div className="absolute bottom-0 right-0 p-2 py-4">
                        <form method="get" action={buyProduct}>
                            <button value={product} name="beli" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                                Buy
                            </button>
                        </form>
                    </div> */}
                    <div className="absolute bottom-0 right-0 p-2 py-4">
                        <Link className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" 
                            href={`/pelanggan/buy_product?productId=${product._id}`} passHref>
                            {/* <a className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"> */}
                                Buy
                            {/* </a> */}
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}
