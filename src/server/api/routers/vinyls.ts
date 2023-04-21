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
    console.log(response.releases);
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
});
