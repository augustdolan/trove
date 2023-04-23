import { type NextPage } from "next";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Vinyl } from "types/Vinyl";
import VinylEntry from "~/components/VinylEntry";
import { api } from "~/utils/api";

const CollectionPage: NextPage = ({
  loggedInUsername = "augienaught",
  isUserCollection = false,
}) => {

  const router = useRouter();
  const page = (router.query.page as string) || "1"; //bugfix: default url should be /1 then
  // need to push this down with a provider / make it inputtable on a front page
  // I know there is a better way to implement saerch saving without state updates



  // bug for if this toggles on at page over intersection && I do not reset to page one, which I should.

  return (
    <>
      <h1>Trove make me a header to pass around please</h1>

      {/* this loading shouldn't be here, it should only appear when vinyls are getting fetched, which is a reduxy thing though... */}

    </>
  );
};

export default CollectionPage;
