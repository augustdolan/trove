import { type NextPage } from "next";

import { useRouter } from "next/router";
import { useState } from "react";
import { Vinyl } from "types/Vinyl";
import VinylEntry from "~/components/VinylEntry";
import { api } from "~/utils/api";

const CollectionPage: NextPage = ({ isUserCollection = false }) => {
  const router = useRouter();
  const page = router.query.page as string || "1"; //bugfix: default url should be /1 then
  // get for one user, get for two users

  // intersection of two users is two getAll, merge intersection, then slice based on page number. useQuery for caching?
  // discogs needs to be interchangeable
 const [isCompareVinyls, setIsCompareVinyls] = useState(true);
 // bug for if this toggles on at page over intersection && I do not reset to page one, which I should.
 const { data: vinyls } = isCompareVinyls ? api.vinyls.getAllVinylsIntersectionPage.useQuery(({ username: 'augienaught', searchedUsername: 'pdimaso', page})) : api.vinyls.getPage.useQuery({ username: 'augienaught', page });

  return (
    <>
      {vinyls ? vinyls.map(vinyl => <VinylEntry vinyl={vinyl} />) : "...Loading"}
    </>
  )

}

// Container() { map function for ListEntry}
export default CollectionPage;

/**
 * -- collection
 *      - [pages].tsx
 * 
 * -- userSearch.tsx => fetchall of app user + searched user => redis
 *     -- [pages].tsx
 */