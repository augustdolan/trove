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

    const vinyls: Vinyl[] = response.releases.reduce((vinyls: Vinyl[], release: DiscogsRelease) => {
      if (release.basic_information.formats.some(format => format.name.toLowerCase() === "vinyl")) {
        vinyls.push({
          title: release.basic_information.title,
          artists: release.basic_information.artists,
          thumbnail: release.basic_information.thumb,
          labels: release.basic_information.labels,
          year: release.basic_information.year,
        })
      }
      return vinyls;
    }, []);

    return vinyls;
  }),
  getAllVinylsIntersectionPage: publicProcedure
    .input(z.object({ username: z.string(), searchedUsername: z.string(), page: z.string()}))
    .query(async ({ ctx, input }) => {
      const userReleases = await getAllReleases(ctx, input.username);

      // make dry with above
      const vinyls: Vinyl[] = userReleases.reduce((vinyls: Vinyl[], release: DiscogsRelease) => {
        if (release.basic_information.formats.some(format => format.name.toLowerCase() === "vinyl")) {
          vinyls.push({
            title: release.basic_information.title,
            artists: release.basic_information.artists,
            thumbnail: release.basic_information.thumb,
            labels: release.basic_information.labels,
            year: release.basic_information.year,
          })
        }
        return vinyls;
      }, []);
  
      return vinyls;
    }),
});

const getAllReleases = async (ctx: any /* get type */ , username: string): Promise<DiscogsRelease[]> => {
  let releases: DiscogsRelease[] = [];
  const response = await ctx.discogsClient.getVinylPage(username, "1");
  releases = releases.concat(response.releases);
  let nextPage = response.pagination.urls.next;
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