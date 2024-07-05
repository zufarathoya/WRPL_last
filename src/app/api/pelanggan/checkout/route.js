import midtrans from 'midtrans-client';
import dotenv from 'dotenv';

dotenv.config();

export const POST = async (request) => {
    try {
        const { location, selected_user_id, totalHarga } = await request.json();

        let snap = new midtrans.Snap({
            isProduction: false,
            serverKey: process.env.MIDTRANS_SERVER_KEY,
            clientKey: process.env.MIDTRANS_CLIENT_KEY
        });

        let parameter = {
            transaction_details: {
                order_id: `order-${Date.now()}`,
                gross_amount: totalHarga
            },
            credit_card: {
                secure: true
            },
            customer_details: selected_user_id
        };

        const transaction = await snap.createTransaction(parameter);
        const redirectUrl = transaction.redirect_url;
        return new Response(JSON.stringify({ redirectUrl }), { status: 200 });
    } catch (error) {
        console.error('Midtrans API request failed:', error.message);
        console.error('Error details:', error);

        return new Response(JSON.stringify({ error: 'Transaction creation failed', details: error.message }), { status: 500 });
    }
};
