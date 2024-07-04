'use server'
import { signIn } from '../../auth'
import Email from 'next-auth/providers/email'
import { redirect } from 'next/dist/server/api-utils'

export const doCredentialLogin = async (fromData) =>{
    try{
        const response = await signIn('credentials', {
            username: fromData.get('username'),
            password: fromData.get('password'),
            redirect: false,
        })
        return response
    } catch (error){
        throw new Error(error)
    }
}