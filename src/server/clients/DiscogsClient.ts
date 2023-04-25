import axios from "axios";
import { fstat } from "fs";
import type { DiscogsRelease, DiscogsResponse } from "types/DiscogsRelease";
import { Vinyl } from "types/Vinyl";
import { env } from "~/env.mjs";
// convert to left/right type split

type GetAllReleasesReturn = {
  status: number,
  vinyls: Vinyl[]
}

type DiscogsReleaseAndStatusCode = {
  status: number,
  releasesWithPaginationData: DiscogsResponse,
}

type VinylsWithPaginationData = {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: {
      last: string;
      next: string;
    };
  };
  vinyls: Vinyl[];
}

export class DiscogsClient {
  private static baseUrl = "https://api.discogs.com";
  private static userAgent = "recordtrove/0.1 +http://recordtrove.com";

  private sortByTitle = (vinyls: Vinyl[]) => {
    return vinyls.sort((a, b) => {
      const nameA = a.title.toLowerCase(); 
      const nameB = b.title.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  private transformReleasesToVinylsAndSortByTitle = (releases: DiscogsRelease[]): Vinyl[] => {
    // future fix: add return type to reduce generic
    const vinyls: Vinyl[] = releases.reduce<Vinyl[]>((vinyls: Vinyl[], release: DiscogsRelease) => {
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
      return vinyls;
      // so the merge algorithm elsewhere is fast and there is no change in vinyl chronology on the client side
    }, []);

    return this.sortByTitle(vinyls);
  }

  private async getVinylPage(
    username: string,
    page: number | string
  ): Promise<DiscogsReleaseAndStatusCode> {
    const allRecordsFolderEnum = 0;
    // incase I want to make this user input later, 100 is max
    const recordsPerPage = 100;
    // need to paginate and collection
    const options = {
      method: 'get',
      headers: {
        "User-Agent": DiscogsClient.userAgent,
      },
      url: `${DiscogsClient.baseUrl}/users/${username}/collection/folders/${allRecordsFolderEnum}/releases`,
      params: {
        page,
        per_page: recordsPerPage,
        key: env.DISCOGS_KEY,
        secret: env.DISCOGS_SECRET,
      },
    };
    // no error handling right now
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try {
      const response = await axios.request(options);
      return {
        status: response.status,
        releasesWithPaginationData: response.data,
      };
    } catch (err: any) {
      console.error("unexpected error", err);
      return {
        status: err.status,
        // need to fix this return
        releasesWithPaginationData: err.data
      };
    }
  }

  getAllReleases = async (username: string): Promise<GetAllReleasesReturn>  => {
    let releases: DiscogsRelease[] = [];
    let pageNumber = 1;
    const response = await this.getVinylPage(username, pageNumber);

    releases = releases.concat(response.releasesWithPaginationData.releases);
    pageNumber++;

    const lastPage = response.releasesWithPaginationData.pagination.pages
  
    while (pageNumber <= lastPage) {
    const nextPageResponse = await this.getVinylPage(username, pageNumber);
      releases = releases.concat(nextPageResponse.releasesWithPaginationData.releases);
      pageNumber++;
    }

    return {
      status: response.status,
      vinyls: this.transformReleasesToVinylsAndSortByTitle(releases),
    }
  };
}
