import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../../libs/mongodb";

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: 'asd',
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { username, password } = credentials;
                // const user = {
                //     id: 1,
                //     username: 'admin@admin',
                //     name: 'admin',
                //     role: 'admin',
                //     email: 'admin@admin',
                // };
                const client = await connectToDatabase();
                const db = client.db('User');
                const user = await db.collection('User').findOne({ username: username });
                if (user) {
                    if (user.password !== password) {
                        return null;
                    }
                    return user;
                } else return null
                // if (username === 'admin@admin' && password === 'admin') {
                //     return user;
                // } else {
                //     return null;
                // }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account?.provider === 'credentials') {
                token.id = user._id;
                token.username = user.username;
                token.email = user.email;
                token.role = user.category;
            }
            return token;
        },
        async session({ session, token }) {
            if ('username' in token) {
                session.user.username = token.username;
            }
            if ('role' in token) {
                session.user.role = token.role;
            }
            if ('id' in token) {
                session.user.id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: '/authentication/login'
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };