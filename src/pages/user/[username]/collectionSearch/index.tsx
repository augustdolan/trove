import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import VinylEntry from "~/components/VinylEntry";
import { api } from "~/utils/api";

const CollectionSearch = () => {
  const router = useRouter();
  // type issue with string | string[] so not destructuring
  const { username, collectorName, page } = router.query as ParsedUrlQuery & { username: string, collectorName: string, page: string };

  const [usernameToQuery, setUsernameToQuery] = useState("");
  const [isCompareVinyls, setIsCompareVinyls] = useState(true);

  const useQueryOptions = {
    enabled: Boolean(collectorName),
    refetchOnWindowFocus: false,
  };
  const {
    data: vinyls,
    refetch,
    isRefetching,
  } = isCompareVinyls
    ? api.vinyls.getAllVinylsIntersectionPage.useQuery(
        {
          loggedInUsername: username,
          collectorName,
          page,
        },
        useQueryOptions
      )
    : api.vinyls.getPage.useQuery({ collectorName, page }, useQueryOptions);

  return (
    <div className="p-8">
      <button
        onClick={() => {
          setIsCompareVinyls(!isCompareVinyls);
        }}
      >
        Toggle Compare Vinyls
      </button>
      <p>compare state: {JSON.stringify(isCompareVinyls)}</p>
      <p>
        hello {username}, you've searched for {collectorName}
      </p>
      <label htmlFor="discogs-collection-search">Collection Search</label>
      <input
        type="search"
        id="discogs-collection-search"
        onChange={(event) => setUsernameToQuery(event.target.value)}
      />
      <button
        onClick={() => {
          router.push({
            pathname: "/user/[username]/collectionSearch",
            query: {
              username,
              collectorName: usernameToQuery,
              page: "1",
            },
          });
        }}
      >
        Search
      </button>

      <div className="grid grid-cols-3 gap-5">
        {vinyls
          ? vinyls.map((vinyl) => <VinylEntry vinyl={vinyl} />)
          : "...Loading"}
      </div>
    </div>
  );
};

export default CollectionSearch;
