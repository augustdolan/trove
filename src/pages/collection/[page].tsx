import { type NextPage } from "next";

import { useRouter } from "next/router";
import { Vinyl } from "types/Vinyl";
import VinylEntry from "~/components/VinylEntry";
import { api } from "~/utils/api";

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const page = router.query.page as string || "1"; //bugfix: default url should be /1 then
  const {data: vinyls} = api.vinyls.getPage.useQuery({ username: 'augienaught', page });

  return (
    <>
      {vinyls ? vinyls.map(vinyl => <VinylEntry vinyl={vinyl} />) : "...Loading"}
    </>
  )

}

export default CollectionPage;