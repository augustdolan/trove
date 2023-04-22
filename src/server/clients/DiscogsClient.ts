import { env } from "~/env.mjs";

export class DiscogsClient {
  private static baseUrl: string = 'https://api.discogs.com';
  static userAgent: string = 'recordtrove/0.1 +http://recordtrove.com';

  constructor () {
  }

  async getVinylPage(username: string, page: string) {
    const allRecordsFolderEnum = 0;
    // incase I want to make this user input later, 100 is max
    const recordsPerPage = 100;
    // need to paginate and collection
    const options = {
      headers: {
        "User-Agent": DiscogsClient.userAgent,
      }
    };

    const url = `${DiscogsClient.baseUrl}/users/${username}/collection/folders/${allRecordsFolderEnum}/releases?page=${page}&per_page=${recordsPerPage}&key=${env.DISCOGS_KEY}&secret=${env.DISCOGS_SECRET}`;

    const vinyls = await fetch(url, options).then(response => response.json());
    return vinyls;
  }
}