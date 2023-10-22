import {
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button
} from "@nextui-org/react";

import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ActionButton(){
  const navigate = useNavigate();
  return(
    <Dropdown>
      <DropdownTrigger>
        <Button
          className="flex justify-center rounded text-xl text-black/50 bg-jajanWarning/20 border border-jajanWarning"
          isIconOnly
          size="sm"
        >
          <AiOutlineEllipsis />
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        onAction={(key) => 
          key === "edit" ? 
            navigate(`/customers/${key}/1`) :
            confirm("Are you sure you want to delete this customer?") &&
            alert("Customer deleted")
        }
      >
        <DropdownItem 
          key="edit" 
        >
          Edit</DropdownItem>
        <DropdownItem key="delete" className="text-danger"color="danger">Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}