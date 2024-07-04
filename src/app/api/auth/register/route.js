import { NextResponse } from "next/server";
import { connectToDatabase } from '../../../../libs/mongodb';

export const POST = async(request) => {
    const {username, password1, password2, email} = await request.json();
    const client = await connectToDatabase();
    const db = client.db('User');
    const user = db.collection('User');
    const userExist = await user.findOne
    ({
        username: username
    });
    if(userExist){
        return new NextResponse("User already exist", {
            status: 400,
        })
    }
    if(password1 !== password2){
        return new NextResponse("Password does not match", {
            status: 400,
        })
    }
    const newUser = {
        username: username,
        password: password1,
        email: email,
        category:'pelanggan',
        is_login:false,
    }
    await user.insertOne(newUser);

    return new NextResponse("User has been created", {
        status: 201,
    })
}