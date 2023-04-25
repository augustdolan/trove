import { type NextPage } from "next";
import Head from "next/head";
// import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import router from "next/router";
import { buttonClass, h2Class } from "~/utils/tailwindClasses";
import Header from "~/components/Header";

const Home: NextPage = () => {
  const [loggedInUsername, setLoggedInUsername] = useState("");
  return (
    <>
      <Head>
        <title>Trove</title>
        <meta name="a place to enjoy your records" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className=" mt-72 flex flex-col items-center justify-center">
        <label htmlFor="discogs-collection-search" className={h2Class}>
          Fake Discogs Login
        </label>
        <input
          className="h-10 w-half text-center rounded-full border-2 border-solid border-green-500 px-4 mb-4"
          type="search"
          id="discogs-collection-search"
          placeholder="enter discogs username"
          onChange={(event) => setLoggedInUsername(event.target.value)}
        />
        <button
          className={buttonClass}
          onClick={() => {
            router.push({
              pathname: "/user/[name]/collectionSearch",
              query: { name: loggedInUsername },
            });
          }}
        >
          Login
        </button>
      </main>
    </>
  );
};

export default Home;
