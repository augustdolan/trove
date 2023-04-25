import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import { useState } from "react";
import VinylEntry from "~/components/VinylEntry";
import { api } from "~/utils/api";
import { FormControlLabel, Switch } from "@mui/material";
import Header from "~/components/Header";
import { buttonClass, h2Class } from "~/utils/tailwindClasses";

const CollectionSearch = () => {
  const router = useRouter();
  // type issue with string | string[] so not destructuring
  const { username, collectorName } = router.query as ParsedUrlQuery & {
    username: string;
    collectorName: string;
  };

  const [usernameToQuery, setUsernameToQuery] = useState("");
  const [isCompareVinyls, setIsCompareVinyls] = useState(false);

  const useQueryOptions = {
    enabled: Boolean(collectorName),
    refetchOnWindowFocus: false,
  };
  const { data: vinyls, isFetching } = isCompareVinyls
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
      <Header username={username}/>
      <div className="p-8">
        <div className="mb-16 grid grid-cols-10 gap-x-4">
          <div className="relative col-span-9">
            <label
              className="absolute -translate-y-4 pl-8 text-xs"
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
            className={buttonClass}
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
        {isFetching && (
          <div>
            {isCompareVinyls ? (
              <p>
                Comparing <span className="capitalize">{collectorName}'s</span> trove to yours!
              </p>
            ) : (
              <p>
                sit tight while we grab <span className="capitalize">{collectorName}'s</span> trove
              </p>
            )}
          </div>
        )}
        {(isFetching || Boolean(vinyls)) && (
          <>
            <div className="relative mb-10">
              <h2 className={h2Class}>
                {isCompareVinyls
                  ? `${collectorName} + ${username}`
                  : `${collectorName}`}
              </h2>
              <p className="text-center text-2xl font-bold">
                {isCompareVinyls
                  ? `Records in Common: ${vinyls?.length}`
                  : `Total Collection: ${vinyls?.length}`}
              </p>
              <FormControlLabel
                className="absolute right-0 top-1/2 -translate-y-1/2 transform"
                checked={isCompareVinyls}
                onClick={() => {
                  setIsCompareVinyls(!isCompareVinyls);
                }}
                control={<Switch />}
                label="Compare Vinyls"
              />
            </div>
            {Boolean(vinyls) && (
              <div className="grid grid-cols-3 gap-5">
                {vinyls!.map((vinyl) => (
                  <VinylEntry vinyl={vinyl} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CollectionSearch;
