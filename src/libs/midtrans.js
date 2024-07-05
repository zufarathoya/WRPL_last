import dotenv from 'dotenv';

dotenv.config();

const serverKey = process.env.MIDTRANS_SERVER_KEY
const clientKey = process.env.MIDTRANS_CLIENT_KEY

export {serverKey, clientKey}