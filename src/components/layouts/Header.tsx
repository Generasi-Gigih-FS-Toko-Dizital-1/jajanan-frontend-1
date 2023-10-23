import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { AiOutlineMenuFold, AiOutlineUser } from "react-icons/ai";

const Header = ({ sidebarToggle }: { sidebarToggle: () => void }) => {
  return (
    <header className="fixed w-full z-[99] flex p-4 items-center justify-between bg-[#FDD671]">
      <AiOutlineMenuFold
        onClick={sidebarToggle}
        className="hover:cursor-pointer w-6 h-6"
      />
      <Dropdown>
        <DropdownTrigger
        >
          <Avatar
            className=" bg-[#424242] text-white cursor-pointer"
            showFallback
            fallback={<AiOutlineUser className="w-6 h-6" />}
          />
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Static Actions"
          className="text-center"
          onAction={(key) => 
            key === "logout" &&
              confirm('Are you sure you want to logout?') &&
              alert('Admin succesfully logout')
          }
        >
          <DropdownItem>ADMIN 1</DropdownItem>
          <DropdownItem 
            key="logout" 
            className="text-danger" 
            color="danger"
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  );
};

export default Header;
