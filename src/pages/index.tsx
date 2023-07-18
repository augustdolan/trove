import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import router from "next/router";
import { buttonClass, h2Class } from "~/utils/tailwindClasses";
import Header from "~/components/Header";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [loggedInUsername, setLoggedInUsername] = useState("");
  return (
    <>
      <Head>
        <title>Trove</title>
        <meta
          name="a place to enjoy your records"
          content="Generated by create-t3-app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div>
          <form className="flex flex-col items-center justify-center">
            <label htmlFor="discogs-collection-search" className={h2Class}>
              Enter your Discogs username
            </label>
            <input
              className="w-half mb-4 h-10 rounded-full border-2 border-solid border-green-500 px-4 text-center"
              type="search"
              id="discogs-collection-search"
              placeholder="e.g., augienaught"
              onChange={(event) => setLoggedInUsername(event.target.value)}
            />
            <button
              className={buttonClass}
              onClick={(e) => {
                e.preventDefault();
                router.push({
                  pathname: "/user/[name]/collectionSearch",
                  query: { name: loggedInUsername },
                });
              }}
            >
              Continue
            </button>
          </form>
        </div>
        <AuthShowcase />
      </main>
    </>
  );
};

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.vinyls.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full px-10 py-3 font-semibold transition"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}

export default Home;
