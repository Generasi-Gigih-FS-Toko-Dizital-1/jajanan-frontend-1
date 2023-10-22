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
    <nav className={`${oppened ? "w-80 px-5" : "w-0 px-0"} duration-300`}>
      <div className="flex items-center py-3">
        <Image src="/images/jajanmania-logo.svg" width={60} alt="Logo" />
        {oppened && (
          <h2 className="text-xl font-[400]">
            <span className="font-[600]">JAJAN</span> PANEL
          </h2>
        )}
      </div>
      <ul className="py-1">
        {navList.map((item, index) => (
          <li className="mb-1" key={index}>
            <Link
              className={`flex items-center gap-2 py-2 px-2 hover:bg-[#FDD671] cursor-pointer rounded-lg 
              ${location.pathname.includes(item.link) && "bg-[#FDD671]"}
              ${!oppened && "justify-center"}
              `}
              to={item.link}
            >
              <i>{item.icon}</i>
              {oppened && item.title}
            </Link>
          </li>
        ))}
        <li></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
