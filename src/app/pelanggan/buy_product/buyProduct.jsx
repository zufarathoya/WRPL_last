'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const fetching = async (id) => {
  try {
      const response = await fetch('../api/topics/');
      if (!response.ok) {
          throw new Error('Failed to fetch products');
      }
      const data = await response.json();

      // Filter the data to find items with the matching id
      const filteredData = data.filter(item => item._id == id);

      return filteredData;
  } catch (error) {
      console.error('Error fetching products:', error);
      return []; // or handle error state as needed
  }
};

const BuyProductPage = ({ csrfToken }) => {
  const { data: session, status} = useSession()
  console.log(session)
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')

  useEffect(() => {
    fetching(productId).then(data => {
        setProducts(data);
      });
  }, [productId]);
  
  const userId = session.user.id
  const handleSubmit = async(event) => {
    event.preventDefault()
    const fromData  = new FormData(event.currentTarget)
    const _id = fromData.get('selected_product_id')
    const quantity = parseInt(fromData.get('quantity'))

    const response = await fetch('../../api/pelanggan/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id, userId, quantity }),
    })
  }

  return (
    <div className="container mx-auto p-4">
        <h1>{userId}</h1>
        <h1 className="text-2xl font-bold mb-4">Buy Product</h1>
        
        <div className="bg-white shadow-md rounded-lg p-4">
        {products.map(product => (
        <div key={product._id}>
            <h2 className="text-lg font-semibold mb-2">{product.nama}</h2>
            <p className="text-gray-700 mb-2">ID: {product._id}</p>
            <p className="text-gray-700 mb-2">Description: {product.deskripsi}</p>
            <p className="text-gray-700 mb-2">Price: {product.harga}</p>
            <p className="text-gray-700 mb-2">Stock: {product.stok}</p>
            <p className="text-gray-700 mb-2">Category: {product.kategori}</p>

            <form method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
                <input type="hidden" name="selected_product_id" value={product._id} />
                <label htmlFor="quantity">Quantity:</label>
                <input 
                    type="number" 
                    name="quantity" 
                    id="quantity" 
                    min="1" 
                    max={product.stok}
                    className="w-64 h-10 shadow-inner bg-gray-100 content" 
                    required 
                />
                
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Buy</button>
            </form>
        </div>
        ))}
        </div>
        
    </div>
  )
}

export default BuyProductPage
