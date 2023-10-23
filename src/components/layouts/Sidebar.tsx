import { Image } from "@nextui-org/react";
import { NavigationListTypes } from "../../types/NavigationListTypes";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({
  navList,
  oppened,
}: {
  navList: NavigationListTypes[];
  oppened: boolean;
}) => {
  const location = useLocation();
  
  return (
    <nav className={`${oppened ? "-translate-x-full" : "transform-none"} fixed top-0 left-0 z-[9999] h-screen overflow-y-auto transition-transform bg-white w-60 md:w-72 px-5`}>
      <div className="flex items-center pt-2">
        <Image src="/images/jajanmania-logo.svg" width={60} alt="Logo" />
        <h2 className="text-xl lg:text-2xl font-normal">
          <span className="font-semibold">JAJAN</span> PANEL
        </h2>
      </div>
      <ul className="py-5 md:py-6 lg:py-8">
        {navList.map((item, index) => (
          <li 
            className="mb-1.5 text-base md:text-lg"
            key={index}>
            <Link
              className={`flex items-center gap-2 py-2 px-2 hover:bg-jajanWarning rounded-lg 
              ${location.pathname.includes(item.link) && "bg-jajanWarning"}`}
              to={item.link}
            >
              {item.icon}
              {item.title}
            </Link>
          </li>
        ))}
        <li></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
