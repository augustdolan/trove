import { type NextPage } from "next";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Vinyl } from "types/Vinyl";
import VinylEntry from "~/components/VinylEntry";
import { api } from "~/utils/api";

// util function to move? 
const fetchCollection = (isCompareVinyls: boolean, page: string, searchedUsername?: string, loggedInUsername?: string) => {
  const { data: vinyls } = isCompareVinyls ? api.vinyls.getAllVinylsIntersectionPage.useQuery(({ loggedInUsername, searchedUsername, page})) : api.vinyls.getPage.useQuery({ searchedUsername, page });
  return vinyls;
}

const CollectionPage: NextPage = ({ isUserCollection = false }) => {
  const [ vinyls, setVinyls ] = useState<Vinyl[]>()
  const router = useRouter();
  const page = router.query.page as string || "1"; //bugfix: default url should be /1 then
  // need to push this down with a provider / make it inputtable on a front page
  // I know there is a better way to implement saerch saving without state updates
  const [ usernameToQuery, setUsernameToQuery ] = useState("");
  const [isCompareVinyls, setIsCompareVinyls] = useState(true);

 // bug for if this toggles on at page over intersection && I do not reset to page one, which I should.

  return (
    <>
      <h1>Trove</h1>
      <label htmlFor="discogs-collection-search">Collection Search</label>
      <input type="search" id="discogs-collection-search" onChange={event => setUsernameToQuery(event.target.value)}/>
      <button onClick={() => setVinyls(fetchCollection(isCompareVinyls, page, usernameToQuery, loggedInUsername))}>Search</button>
      <div>{vinyls ? vinyls.map(vinyl => <VinylEntry vinyl={vinyl} />) : "...Loading"}</div>
    </>
  )

}

export default CollectionPage;
