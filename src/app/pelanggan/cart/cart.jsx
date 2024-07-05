'use client'
import React from 'react'
import { RemoveFromQueue } from '@mui/icons-material'
import Remove from './remove'
import Checkout from './checkout'

const Cart = ({cartItems, userId, totalHargaKeranjang}) => {
  const onProceedToCheckout = () => {

  }
  const onRemoveItem = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const selected_product_id = formData.get('selected_product_id')
    const selected_user_id = formData.get('selected_user_id')
    // const selected_product_id = item.product_id
    // const selected_user_id = userId
    const onRemove = true;
    // const data = {selected_product_id, selected_user_id, onRemove}
    // console.log(data)
    fetch('../../api/pelanggan/removeItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({selected_product_id, selected_user_id, onRemove}),
    })
  }
  const onContinueShopping = () => {

  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Your Cart</h2>
        <ul>
          <div className="w-full h-0.5 bg-black"></div>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={index}>
                <strong>Name:</strong> {item.product_id}<br />
                <strong>Name:</strong> {item.nama}<br />
                <strong>Price:</strong> Rp{item.harga}<br />
                <strong>Quantity:</strong> {item.kuantitas}<br />
                <form method='post' onSubmit={onRemoveItem}>
                  <input type="hidden" id='selected_product_id' name="selected_product_id" value={item.product_id} />
                  <input type="hidden" id='selected_user_id' name="selected_user_id" value={userId} />
                  <input type="hidden" name="selected_quantity" value={item.kuantitas} />
                  <input type="hidden" name="selected_price" value={item.harga} />
                  <input type="hidden" name="selected_category" value={item.kategori} />
                  <input type="hidden" name="selected_name" value={item.nama} />
                  {/* <button type="submit" className="bg-red-500 rounded text-white py-0.5 px-2"> <RemoveFromQueue/> Remove</button> */}
                  <Remove selected_product_id={item.product_id} selected_user_id={userId}/>
                </form>
                <div className="w-full h-0.5 bg-black"></div>
              </li>
            ))
          ) : (
            <li>No items in your cart</li>
          )}
          <p><strong>Total Belanjaan: </strong>Rp{totalHargaKeranjang}</p>
        </ul>
      </div>

      <div className="mt-4 flex justify-end">

        <Checkout userId={userId} totalHargaKeranjang={totalHargaKeranjang}/>
      </div>
    </div>
  )
}
export default Cart