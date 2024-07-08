import Head from "next/head";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client'
import { getSession } from "@auth0/nextjs-auth0";



export default function Chat() {
  const { isLoading, error, user } = useUser();

  if(isLoading) return <div>Loading...</div> 
  if(error) return <div>{error.message}</div>

  return (
    <>
      <Head>
        <title>Chatty Pete Loging/Sign Up</title>
      </Head>
      <div className="flex justify-center items-center min-h-screen w-full bg-gray-800 text-white text-center">
        <div>
          {!!user && (
            <>
              <Link 
                className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600" 
                href={'/api/auth/logout'}
              >
                Logout
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link 
                className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600" 
                href={'/api/auth/login'}
                // not auto from the auth0 stuff handle auth more specifically
              >
                Login
              </Link>
              <Link 
                className="rounded-md bg-emerald-500 px-4 py-2 text-white hover:bg-emerald-600" 
                href={'/api/auth/signup'}
                // not auto from the auth0 stuff handle auth more specifically
                // Looks like auth0 login but is not
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context.req, context.res)
  if(!!session) {
    return {
      redirect:{
        destination: '/chat'
      }
    }
  }

  return {
    props: {}
  }
}
