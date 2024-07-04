'use client'
import React, { useEffect, useState } from 'react'
import Cart from './cart'
import { useSession } from 'next-auth/react'
import Layout from '../components/layout'

// Function to fetch products for a specific user
const fetching = async (userId) => {
    try {
        const response = await fetch('../api/pelanggan/cart');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const userCart = data.find(item => item.user_id === userId);
        if (userCart && userCart.products) {
            return userCart.products;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return []; // or handle error state as needed
    }
};

const Page = () => {
    const [products, setProducts] = useState([]);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session && session.user) {
            const userId = session.user.id;
            fetching(userId).then(userProducts => {
                setProducts(userProducts);
            });
        }
    }, [session]);
    let totalHargaKeranjang = 0
    products.map((item) => {
        totalHargaKeranjang += item.harga * item.kuantitas
    })
    
    return (
        <div>
            <Layout>
                <Cart cartItems={products} userId={session?.user?.id} totalHargaKeranjang={totalHargaKeranjang} />
            </Layout>
        </div>
    );
}

export default Page
