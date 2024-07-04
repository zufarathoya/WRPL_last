'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ProductsPage from './product'
import Layout from '../components/layout'

const Page = () => {
    const { data: session, status} = useSession()
    const router = useRouter()
    console.log(session)
    console.log(status)
    useEffect(() => {
        if (status === 'authenticated') {
            console.log('User ID:', session.user.id);
        }
    }, [status, session]);
    const handleNavigation = () => {
        if (session?.user?.id) {
            router.push(`/products?userId=${session.user.id}`);
        }
    };
    return (
        <div>
            <Layout>
                <ProductsPage userId={session?.user?.id} />
            </Layout>
        </div>
    )
}

export default Page;

// export default page