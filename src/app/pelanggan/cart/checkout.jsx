'use client';
import React, { useState } from 'react';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export const getServerSideProps = () => {
    console.log(process.env.MIDTRANS_SERVER_KEY)
    return {
        props: {
            userId: 1,
            totalHargaKeranjang: 100000,
        },
    };

}

const Checkout = ({ userId, totalHargaKeranjang }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const onProceedToCheckout = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const location = formData.get('location');
        const selected_user_id = userId;
        const totalHarga = totalHargaKeranjang;
        fetch('../../api/pelanggan/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location, selected_user_id, totalHarga }),
        }).then(response => response.json())
        .then(data => {
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            } else {
                console.error('Failed to get redirect URL:', data.error);
            }
        })
        .catch(error => {
            console.error('Error during fetch:', error);
        });

    };

    return (
        <div>
            <button
                onClick={handleToggleModal}
                type="button"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
                Proceed to Checkout
            </button>
            {isModalOpen && (
                <div id="crud-modal" tabindex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Pilih Lokasi
                            </h3>
                            <button onClick={handleToggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4 md:p-5" onSubmit={onProceedToCheckout}>
                            <div className="text-xl mb-2">Total Harga: Rp{totalHargaKeranjang}</div>
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Lokasi Tujuan</label>
                            <select name="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value={""}>Pilih</option>
                                <option value={"Jakarta"}>Jakarta</option>
                                <option value={"Surabaya"}>Surabaya</option>
                                <option value={"Bekasi"}>Bekasi</option>
                            </select>
                            <button type="submit" className="mt-3 text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <ShoppingCartCheckoutIcon />
                                <p className='mx-3'>Checkout</p>
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;
