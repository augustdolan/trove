import { useState } from "react";
import SideNav from "~/components/SideNav";

const HamburgerMenu = () => {
  const [isActive, setIsActive] = useState(false);
  return <>{isActive ? 
  <SideNav isFromHamburger={true} /> : 
  <div className="mr-4 rounded-sm border-solid border-2 p-2 w-12 border-black flex flex-col justify-around" onClick={() => {setIsActive(!isActive)}}>
    <div className="border border-black" />
    <div className="border border-black" />
    <div className="border border-black" />
  </div>}</>;
};

export default HamburgerMenu;
