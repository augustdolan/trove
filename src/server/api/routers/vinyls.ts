import _ from 'lodash';
import { z } from "zod";
import { DiscogsRelease } from '../../../../types/DiscogsRelease';

import {
  createTRPCRouter,
  publicProcedure,
  // for login
  protectedProcedure,
} from "~/server/api/trpc";
import { Vinyl } from "types/Vinyl";

export const vinylsRouter = createTRPCRouter({
  getPage: publicProcedure
  .input(z.object({ username: z.string(), page: z.string()}))
  .query(async ({ ctx, input }) => {
    const response = await ctx.discogsClient.getVinylPage(input.username, input.page);

    return transformReleasesToVinyls(response.releases);
  }),
  getAllVinylsIntersectionPage: publicProcedure
    .input(z.object({ username: z.string(), searchedUsername: z.string(), page: z.string()}))
    .query(async ({ ctx, input }) => {
      // run concurrently with bPromise
      console.log('hi');
      const userReleases = await getAllReleases(ctx, input.username);
      const searchedUserReleases = await getAllReleases(ctx, input.searchedUsername);
      console.log(searchedUserReleases);
      const userVinyls = transformReleasesToVinyls(userReleases);
      const searchedUserVinyls = transformReleasesToVinyls(searchedUserReleases);

      return getVinylIntersection(userVinyls, searchedUserVinyls);
    }),
});

const getAllReleases = async (ctx: any /* get type */ , username: string): Promise<DiscogsRelease[]> => {
  let releases: DiscogsRelease[] = [];
  const response = await ctx.discogsClient.getVinylPage(username, "1");
  releases = releases.concat(response.releases);
  let nextPage = response.pagination?.urls.next;
  
  // idk that this should be here
  const options = {
    headers: {
      "User-Agent": ctx.discogsClient.userAgent,
    }
  };
  while (nextPage) {
    const nextResponse = await fetch(nextPage, options).then(response => response.json());
    releases = releases.concat(nextResponse.releases);
    nextPage = nextResponse.pagination.urls.next
  }

  return releases;
}

const transformReleasesToVinyls = (releases: DiscogsRelease[]): Vinyl[] => {
  // future fix: add return type to reduce generic
  const vinyls = releases.reduce((vinyls: Vinyl[], release: DiscogsRelease) => {
    if (release.basic_information.formats.some(format => format.name.toLowerCase() === "vinyl")) {
      vinyls.push({
        title: release.basic_information.title,
        artists: release.basic_information.artists,
        thumbnail: release.basic_information.thumb,
        labels: release.basic_information.labels,
        year: release.basic_information.year,
        id: release.id
      })
    }
    // so the merge algorithm elsewhere is fast and there is no change in vinyl chronology on the client side
    return vinyls.sort((a, b) => a.id - b.id);
  }, []);
  return vinyls;
}

const getVinylIntersection = (collectionOne: Vinyl[], collectionTwo: Vinyl[]): Vinyl[] => {
  const sharedVinyls: Vinyl[] = []
  let collectionOneIndex = 0,
  collectionTwoIndex = 0;

  while (collectionOneIndex < collectionOne.length && collectionTwoIndex < collectionTwo.length) {
    // these can't be undefined, but TS isn't understand the while logic check
    const vinylOne = collectionOne[collectionOneIndex]!;
    const vinylTwo = collectionTwo[collectionTwoIndex]!;

    if (vinylOne.id < vinylTwo.id) {
      collectionOneIndex++
    } else if (vinylOne.id > vinylTwo.id) {
      collectionTwoIndex++
    } else {
      sharedVinyls.push(vinylOne);

      collectionOneIndex++;
      collectionTwoIndex++;
    }

  }
  return sharedVinyls;
}