import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  return (
    <div className="bg-white p-5">
      <div className="flex justify-between items-center">
        <h2 className="font-[600] text-2xl">Manage Admin</h2>
        <Link to={"/admin/add"}>
          <Button className="bg-jajanDark2 text-white rounded-md py-2 px-3 focus:shadow-md focus:shadow-jajanWarning transition-all ease-in-out duration-100">
            Add Admin
          </Button>
        </Link>
      </div>
      <Table className="overflow-x-auto">
        <TableHeader>
          <TableColumn>#</TableColumn>
          <TableColumn>Fullname</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Gender</TableColumn>
          <TableColumn>Updated at</TableColumn>
          <TableColumn>Created at</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b">
            <TableCell>1</TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>4Nn2s@example.com</TableCell>
            <TableCell>Male</TableCell>
            <TableCell>2022-01-01</TableCell>
            <TableCell>2022-01-01</TableCell>
            <TableCell>
              <button className="flex justify-center bg-[#FDD671] border border-black py-1 px-2">
                Detail
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default List;
