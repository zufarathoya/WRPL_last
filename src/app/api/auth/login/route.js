import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from '../../../../libs/mongodb'; 
import { getUserByEmail } from "./user";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials){
                if (credentials === null) return null
                try{
                    const user = getUserByEmail(credentials?.email)
                    if (user) {
                        const isMatch = user?.password === credentials?.password
                        if (isMatch) {
                            return user
                        } else {
                            throw new Error('Password false')
                        }
                    } else {
                        throw new Error('User not found')
                    }
                } catch (error) { 
                    throw new Error('Invalid credentials')
                }
            }
        })
    ]
})