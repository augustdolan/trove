import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import VinylEntry from "~/components/VinylEntry";
import { api } from "~/utils/api";
import { FormControlLabel, Switch } from "@mui/material";
import Header from "~/components/Header";

const CollectionSearch = () => {
  const router = useRouter();
  // type issue with string | string[] so not destructuring
  const { username, collectorName, page } = router.query as ParsedUrlQuery & {
    username: string;
    collectorName: string;
    page: string;
  };

  const [usernameToQuery, setUsernameToQuery] = useState("");
  const [isCompareVinyls, setIsCompareVinyls] = useState(false);

  const useQueryOptions = {
    enabled: Boolean(collectorName),
    refetchOnWindowFocus: false,
  };
  const {
    data: vinyls,
    refetch,
    isRefetching,
  } = isCompareVinyls
    ? api.vinyls.getAllVinylsIntersection.useQuery(
        {
          loggedInUsername: username,
          collectorName,
        },
        useQueryOptions
      )
    : api.vinyls.getAllVinyls.useQuery({ collectorName }, useQueryOptions);

  return (
    <>
      <Header />
      <div className="p-8">
        <div className="grid grid-cols-10 mb-16 gap-x-4">
          <div className="relative col-span-9">
            <label
              className="absolute pl-8 text-xs -translate-y-4"
              htmlFor="discogs-collection-search"
            >
              Collection Search
            </label>
            <input
              className="h-10 w-full rounded-full border-2 border-solid border-green-500 pl-8 pr-4  "
              type="search"
              id="discogs-collection-search"
              onChange={(event) => setUsernameToQuery(event.target.value)}
            />
          </div>
          <button
            className="rounded-md bg-green-500 p-2"
            onClick={() => {
              router.push({
                pathname: "/user/[username]/collectionSearch",
                query: {
                  username,
                  collectorName: usernameToQuery,
                },
              });
            }}
          >
            Search
          </button>
        </div>
        <div className="relative mb-10">
          <h2 className="mb-4 text-center text-6xl font-bold capitalize">
            {isCompareVinyls
              ? `${collectorName} + ${username}`
              : `${collectorName}`}
          </h2>
          <p className="text-center text-2xl font-bold">
            {isCompareVinyls
              ? `Records in Common: ${vinyls?.length}`
              : `Total Collection: ${vinyls?.length}`}
          </p>
          {/* togle */}
          <FormControlLabel
            className="absolute right-0 top-1/2 -translate-y-1/2 transform"
            onClick={() => {
              setIsCompareVinyls(!isCompareVinyls);
            }}
            control={<Switch />}
            label="Compare Vinyls"
          />
        </div>
        <div className="grid grid-cols-3 gap-5">
          {vinyls
            ? vinyls.map((vinyl) => <VinylEntry vinyl={vinyl} />)
            : "...Loading"}
        </div>
      </div>
    </>
  );
};

export default CollectionSearch;
