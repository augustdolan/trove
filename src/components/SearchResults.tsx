import { h2Class } from "~/utils/tailwindClasses";
import VinylEntry from "./VinylEntry";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Vinyl } from "types/Vinyl";

const SearchResults = ({
  isCompareVinyls,
  setIsCompareVinyls,
  collectorName,
  username,
  vinyls,
}: {
  isCompareVinyls: boolean;
  setIsCompareVinyls: Function;
  collectorName: string;
  username: string;
  vinyls?: Vinyl[];
}) => {
  return (
    <>
      <div className="relative mb-10">
        <h2 className={h2Class}>
          {isCompareVinyls
            ? `${collectorName} + ${username}`
            : `${collectorName}`}
        </h2>
        <p className="text-center text-2xl font-bold">
          {isCompareVinyls
            ? `Records in Common: ${
                vinyls?.length ? vinyls?.length : "...loading"
              }`
            : `Total Collection: ${
                vinyls?.length ? vinyls?.length : "...loading"
              }`}
        </p>
        <FormControlLabel
          className="absolute right-0 top-1/2 -translate-y-1/2 transform"
          checked={isCompareVinyls}
          onClick={() => {
            setIsCompareVinyls(!isCompareVinyls);
          }}
          control={<Switch />}
          label="Compare Vinyls"
        />
      </div>
      {Boolean(vinyls) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {vinyls?.map((vinyl) => (
            <VinylEntry vinyl={vinyl} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResults;
