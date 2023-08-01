import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import { buttonClass, h2Class } from "~/utils/tailwindClasses";
import SearchResults from "~/components/SearchResults";
import SideNav from "~/components/SideNav";
import { useIsAboveTailwindSm } from "~/utils/checkMediaQuery";

const CollectionSearch = () => {
  const isAboveTailwindSm = useIsAboveTailwindSm();
  const router = useRouter();
  // type issue with string | string[] so not destructuring
  const { collectorName, username } = router.query as ParsedUrlQuery & {
    collectorName: string;
    username: string;
  };

  const errorEnum = {
    "404": (
      <p className="text-center">Sorry, user {collectorName} doesn't exist!</p>
    ),
    "403": (
      <p className="text-center">
        Sorry, user {collectorName}'s collection is private
      </p>
    ),
    "500": (
      <p className="text-center">Sorry, an internal service error occurred</p>
    ),
  };

  const [usernameToQuery, setUsernameToQuery] = useState("");
  const [isCompareVinyls, setIsCompareVinyls] = useState(false);

  const useQueryOptions = {
    enabled: Boolean(collectorName),
    refetchOnWindowFocus: false,
  };

  const { data, isFetching, error } = isCompareVinyls
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
      <Header username={username} />
      <div className="pt-16" >
        {isAboveTailwindSm && <SideNav />}
        <div className="p-8 sm:w-5/6 sm:translate-x-[20%]">
          <div>
            <form className="mb-16 grid grid-cols-10 gap-x-4">
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
                  placeholder="enter collector's username, e.g., pdimaso"
                  onChange={(e) => {
                    setUsernameToQuery(e.target.value);
                  }}
                />
              </div>
              <button
                className={buttonClass}
                onClick={(e) => {
                  e.preventDefault();
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
            </form>
            {(isFetching || Boolean(data)) && (
              <SearchResults
                isCompareVinyls={isCompareVinyls}
                setIsCompareVinyls={setIsCompareVinyls}
                username={username}
                collectorName={collectorName}
                vinyls={data?.vinyls}
              />
            )}
            {Boolean(error) &&
              errorEnum[
                (error?.data?.httpStatus.toString() as keyof typeof errorEnum) ||
                  "500"
              ]}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionSearch;
