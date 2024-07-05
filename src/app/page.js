'use client'
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl mb-10">Selamat datang di Beauty Heaven</h1>
          <p className="text-3xl mb-10">Silahkan login untuk melanjutkan</p>
          <button
            onClick={() => router.push('authentication/login')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          >
            <p className="text-3xl">Login</p>
          </button>
        </div>
      </div>
    );
  } else if (status === "authenticated"){
    if (session.user.role === "pelanggan"){
      router.push('/pelanggan/products')
    }
  }
  return (
    <div>

    </div>
  );
}