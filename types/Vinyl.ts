import { Artist, Label } from './DiscogsRelease';

export type Vinyl = {
  title: string,
  artists: Artist[],
  thumbnail: string,
  labels: Label[],
  year: number
}