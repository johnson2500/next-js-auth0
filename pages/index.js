import Head from "next/head";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getSession } from "@auth0/nextjs-auth0";

export default function Chat() {
  const { isLoading, error, user } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Chatty Pete Loging/Sign Up</title>
      </Head>
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-800 text-center text-white">
        <div>
          {!!user && (
            <>
              <Link className="btn" href={"/api/auth/logout"}>
                Logout
              </Link>
            </>
          )}
          {!user && (
            <>
              <Link
                className="btn"
                href={"/api/auth/login"}
                // not auto from the auth0 stuff handle auth more specifically
              >
                Login
              </Link>
              <Link
                className="btn"
                href={"/api/auth/signup"}
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
  const session = await getSession(context.req, context.res);
  if (!!session) {
    return {
      redirect: {
        destination: "/chat",
      },
    };
  }

  return {
    props: {},
  };
};
