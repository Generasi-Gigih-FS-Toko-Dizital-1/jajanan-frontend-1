import { Button } from "@nextui-org/react";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import AdminForm from "../../fragments/admin-form";

const AdminEdit = () => {
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Update Admin");
  };

  const admin = {
    fullname: "John Doe",
    email: "john@gmail.com",
    gender: "M"
  };

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between items-center px-4 pb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Edit Admin</h2>
        <Button 
          onPress={() => navigate('/admin')}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      <AdminForm 
        className="p-4"
        action={handleSubmit} 
        data={admin}
      />
    </div>
  );
};

export default AdminEdit;
