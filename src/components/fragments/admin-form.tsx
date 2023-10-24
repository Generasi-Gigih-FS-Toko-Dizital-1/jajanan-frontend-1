import React from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import type { AdminTypes } from "../../types/UserTypes";

const AdminForm = ({
  className,
  action,
  data
}: {
  className?: string;
  action: (e: React.FormEvent<HTMLFormElement>) => void;
  data?: AdminTypes
}) => {
  const [isVisiblePassword, setIsVisiblePassword] = React.useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    React.useState(false);

  return (
    <form className={className} onSubmit={action}>
      <div className="flex flex-col md:flex-row gap-5 mb-4 md:gap-4 md:mb-5">
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="John Doe"
          type="text"
          variant="bordered"
          label="Fullname"
          radius="none"
          defaultValue={data ? data.fullname : ""}
        />
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="example@gmail.com"
          type="email"
          variant="bordered"
          classNames={{ input: "bg-blue-500" }}
          label="Email"
          radius="none"
          defaultValue={data ? data.email : ""}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-5 mb-8 md:gap-4 md:mb-10">
       <Select
          labelPlacement="outside"
          label="Gender"
          placeholder="Select gender"
          isRequired
          variant="bordered"
          radius="none"
          className="w-full md:w-[calc(50%-.5rem)]"
          defaultSelectedKeys={`${data? data.gender : ""}`}
        >
          <SelectItem key="F" value="F">Female</SelectItem>
          <SelectItem key="M" value="M">Male</SelectItem>
        </Select>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mb-4 md:gap-4 md:mb-5">
        <Input
          isRequired
          labelPlacement="outside"
          label="New Password"
          placeholder="Enter your password"
          variant="bordered"
          radius="none"
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => {setIsVisiblePassword(!isVisiblePassword)}} >
              {isVisiblePassword ? (
                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisiblePassword ? "text" : "password"}
        />
        <Input
          isRequired
          labelPlacement="outside"
          label="Confirm Password"
          placeholder="Re-enter your password"
          variant="bordered"
          radius="none"
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => {setIsVisibleConfirmPassword(!isVisibleConfirmPassword)}} >
              {isVisibleConfirmPassword ? (
                <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisibleConfirmPassword ? "text" : "password"}
        />
      </div>
      <Button
        type="submit"
        className="bg-jajanDark2 text-white rounded-md py-2 px-4 hover:shadow-md hover:shadow-jajanWarning focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
      >
        {data ? "Update" : "Save"}
      </Button>
    </form>
  );
};

export default AdminForm;
