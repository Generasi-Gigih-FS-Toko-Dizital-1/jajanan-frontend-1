import { Avatar } from "@nextui-org/react";
import { AiOutlineMenuFold, AiOutlineUser } from "react-icons/ai";

const Header = ({ sidebarToggle }: { sidebarToggle: () => void }) => {
  return (
    <header className="flex p-4 items-center justify-between bg-[#FDD671]">
      <AiOutlineMenuFold
        onClick={sidebarToggle}
        className="hover:cursor-pointer w-6 h-6"
      />
      <Avatar
        className=" bg-[#424242] text-white"
        showFallback
        fallback={<AiOutlineUser className="w-6 h-6" />}
      />
    </header>
  );
};

export default Header;
