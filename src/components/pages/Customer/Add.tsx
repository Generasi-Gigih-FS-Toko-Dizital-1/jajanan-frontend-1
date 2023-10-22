import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import CustomerForm from "../../fragments/customer-form";

const Add = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Add Customer");
  };
  const navigate = useNavigate();

  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">Add Customer</h2>
        <Button 
          onPress={() => navigate('/customers')}
          variant="bordered"
          className="flex items-center border border-jajanDark2 text-jajanDark2 rounded-md p-2 hover: shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
        >
          <AiOutlineArrowLeft/>
          Back
        </Button>
      </div>
      <CustomerForm className="p-4" action={handleSubmit} />
    </div>
  );
};

export default Add;