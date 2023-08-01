import Link from "next/link";
import { useRouter } from "next/router";

const SideNav = ({ isFromHamburger }: { isFromHamburger: boolean }) => {
  const router = useRouter();
  const cssClassNamesForMobile = 'bg-white w-screen z-10'
  const cssClassNamesForWeb = 'w-1/6 border-r-2'
  return (
    <ol className={`${isFromHamburger ? cssClassNamesForMobile : cssClassNamesForWeb} h-screen flex flex-col fixed p-8`}>
        <li className="rounded-md hover:bg-slate-300 my-2 p-2"><Link href={`/user/${router.query.username}/collectionSearch`}>Collection Search</Link></li>
        <li className="hover:bg-slate-300 rounded-md my-2 p-2"><Link href={`/user/${router.query.username}/about`}>About the project</Link></li>
    </ol>
  )
}

export default SideNav