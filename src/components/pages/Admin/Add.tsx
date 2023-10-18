import { Button } from "@nextui-org/react";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import AdminForm from "../../fragments/admin-form";

const AdminAdd = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Add Admin");
  };
  return (
    <div className="bg-white p-5 h-full">
      <div className="flex justify-between items-center">
        <h2 className="font-[600] text-2xl">Add Admin</h2>
        <Link to={"/admin"}>
          <Button
            variant="bordered"
            className="flex items-center border border-black rounded-md py-2 px-3 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
          >
            <AiOutlineArrowLeft /> Back
          </Button>
        </Link>
      </div>
      <AdminForm className="mt-5" action={handleSubmit} />
    </div>
  );
};

export default AdminAdd;
