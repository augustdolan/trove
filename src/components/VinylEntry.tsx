import { type Vinyl } from "types/Vinyl";
import { Card, CardContent, CardMedia } from "@mui/material";
import Image from 'next/image'
const VinylEntry = ({ vinyl }: { vinyl: Vinyl }) => {
  return (
    <div className="p-4 rounded-md flex flex-row border-solid border-2 border-gray-200">
      <Image src={vinyl.thumbnail} width="150" height="150" alt="vinyl cover" className="mr-4" />
      <div>
        <div className="mb-2">
          <h1 className="text-xl font-bold">{vinyl.title}</h1>
          <p className="italic text-sm text-gray-500">Released: {vinyl.year}</p>
        </div>
        <p>{vinyl.artists.map((artist) => artist.name)}</p>
        <p>{vinyl.labels.map((label) => label.name)}</p>
      </div>
    </div>
  );
};

export default VinylEntry;
