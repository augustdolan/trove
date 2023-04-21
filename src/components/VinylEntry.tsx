import { Vinyl } from "types/Vinyl";

const VinylEntry = ({ vinyl }: { vinyl: Vinyl }) => {
  return (
    <div>
      <h1>title: {vinyl.title}</h1>
      <p>artists: {vinyl.artists.map((artist) => artist.name)}</p>
      <p>labels: {vinyl.labels.map((label) => label.name)}</p>
      <p>release date: {vinyl.year}</p>
      <img src={vinyl.thumbnail} alt={`${vinyl.title} cover`}></img>
    </div>
  );
};

export default VinylEntry;
