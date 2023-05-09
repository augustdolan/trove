import Link from "next/link";
import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <ol className="h-screen border-r-2 flex flex-col w-1/6 fixed mt-16 p-8">
        <li className="rounded-md hover:bg-slate-300 my-2 p-2"><Link href={`/user/${router.query.username}/collectionSearch`}>Collection Search</Link></li>
        <li className="hover:bg-slate-300 rounded-md my-2 p-2"><Link href={`/user/${router.query.username}/about`}>About the project</Link></li>
    </ol>
  )
}

export default SideNav