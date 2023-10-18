import { Button, Chip } from "@nextui-org/react";
import React from "react";
import { AiOutlineArrowLeft, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

const AdminDetail = () => {
  return (
    <div className="bg-white p-5 h-full">
      <div className="flex justify-between items-center">
        <h2 className="font-[600] text-2xl">Detail Admin</h2>
        <Link to={"/admin"}>
          <Button
            variant="bordered"
            className="flex items-center border border-black rounded-md py-2 px-3 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
          >
            <AiOutlineArrowLeft /> Back
          </Button>
        </Link>
      </div>
      <AdminProfileCard className="my-5" />
      <div>
        <h3 className="font-[500] lg:text-xl">Created at</h3>
        <p className="text-sm opacity-70 lg:text-base">2022-01-01</p>
      </div>
      <div>
        <h3 className="font-[500] lg:text-xl">Updated at</h3>
        <p className="text-sm opacity-70 lg:text-base">2022-01-01</p>
      </div>
      <div className="flex items-center gap-3 mt-5">
        <Button radius="sm" className="bg-jajanDark2 text-white">
          Edit
        </Button>
        <Button radius="sm" className="bg-jajanDanger text-white">
          Delete
        </Button>
      </div>
    </div>
  );
};

const AdminProfileCard = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} flex items-center gap-5`}>
      <div className="text-white rounded-full p-1 bg-[#BFBFBF]">
        <AiOutlineUser className="w-20 h-20 lg:w-32 lg:h-32" />
      </div>
      <div>
        <h2 className="text-3xl font-[600] lg:text-4xl">John Brown</h2>
        <p className="text-sm opacity-70 md:text-xl">john@gmail.com</p>
        <Chip size="sm" className="bg-[#FDD671] mt-3" radius="sm">
          Male
        </Chip>
      </div>
    </div>
  );
};

export default AdminDetail;
