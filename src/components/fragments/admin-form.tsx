import { Button, Input } from "@nextui-org/react";
import React from "react";

const AdminForm = ({
  className,
  action,
}: {
  className?: string;
  action: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form className={className} onSubmit={action}>
      <div className="flex flex-col md:flex-row gap-5 md:gap-3">
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="John Doe"
          type="text"
          variant="bordered"
          label="Fullname"
          radius="none"
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
        />
      </div>
      <div className="my-5 md:my-0">
        <label className="font-[500]">
          Gender<span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border-3 border-[#E4E4E7] cursor-pointer py-1 text-[#71717A]"
          name="cars"
          id="cars"
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div></div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-3">
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="********"
          type="text"
          variant="bordered"
          label="New Password"
          radius="none"
        />
        <Input
          isRequired
          labelPlacement="outside"
          placeholder="********"
          type="password"
          variant="bordered"
          label="Confirm Password"
          radius="none"
        />
      </div>
      <Button
        type="submit"
        className="bg-jajanDark2 text-white rounded-md py-2 px-4 mt-6 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100"
      >
        Add Admin
      </Button>
    </form>
  );
};

export default AdminForm;
