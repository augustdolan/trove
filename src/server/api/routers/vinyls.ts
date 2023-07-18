import { z } from "zod";
import { type DiscogsRelease } from "../../../../types/DiscogsRelease";

import {
  createTRPCRouter,
  publicProcedure,
  // for login
  protectedProcedure,
} from "~/server/api/trpc";
import { type Vinyl } from "types/Vinyl";

export const vinylsRouter = createTRPCRouter({
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  getAllVinyls: publicProcedure
    .input(z.object({ collectorName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { status, vinyls } = await ctx.discogsClient.getAllReleases(input.collectorName);
      return {
        status,
        vinyls
      };
    }),
  getAllVinylsIntersection: publicProcedure
    .input(
      z.object({ loggedInUsername: z.string(), collectorName: z.string() })
    )
    .query(async ({ ctx, input }) => {
      // run concurrently with bPromise
      const {status: userVinylsStatus, vinyls: userVinyls} = await ctx.discogsClient.getAllReleases(input.loggedInUsername);
      const {status: searchedVinylsStatus, vinyls: searchedUserVinyls} = await ctx.discogsClient.getAllReleases(
        input.collectorName
      );
      // update this to choose an error status
      const vinyls = getVinylIntersection(userVinyls, searchedUserVinyls)
      return {
        status: userVinylsStatus,
        vinyls,
      }
    }),
  // getPage: publicProcedure
  //   .input(z.object({ collectorName: z.string(), page: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const response = await ctx.discogsClient.getVinylPage(
  //       input.collectorName,
  //       input.page
  //     );

  //     return response;
  //   }),
});

const getVinylIntersection = (
  collectionOne: Vinyl[],
  collectionTwo: Vinyl[]
): Vinyl[] => {
  const sharedVinyls: Vinyl[] = [];
  let collectionOneIndex = 0,
    collectionTwoIndex = 0;

  while (
    collectionOneIndex < collectionOne.length &&
    collectionTwoIndex < collectionTwo.length
  ) {
    // these can't be undefined, but TS isn't understand the while logic check
    const vinylOne = collectionOne[collectionOneIndex]!;
    const vinylTwo = collectionTwo[collectionTwoIndex]!;

    if (vinylOne.title.toLowerCase() < vinylTwo.title.toLowerCase()) {
      collectionOneIndex++;
    } else if (vinylOne.title.toLowerCase() > vinylTwo.title.toLowerCase()) {
      collectionTwoIndex++;
    } else {
      sharedVinyls.push(vinylOne);

      collectionOneIndex++;
      collectionTwoIndex++;
    }
  }
  return sharedVinyls;
};
