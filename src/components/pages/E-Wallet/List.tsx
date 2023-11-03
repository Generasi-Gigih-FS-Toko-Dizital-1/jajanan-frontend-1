import React from 'react'
import { Link } from 'react-router-dom'
import {
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs
} from '@nextui-org/react'

const List = (): React.ReactElement => {
  return (
    <div className="bg-white py-5 md:px-3">
      <div className="flex justify-between mx-4 mb-4">
        <h2 className="font-semibold text-xl sm:text-2xl md:text-xl lg:text-2xl">
          Manage E-Wallet
        </h2>
      </div>
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="photos" title="Top Up History">
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Top Up Id</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Received At</TableColumn>
              <TableColumn>Media</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b">
                <TableCell>1</TableCell>
                <TableCell>
                  <Link to="/e-wallets/topups/1" className="text-jajanDark2 underline">
                    Max Mayfield
                  </Link>
                </TableCell>
                <TableCell>@max</TableCell>
                <TableCell>maxxx@mail.com</TableCell>
                <TableCell>565 Holland Rd, Hawkins, Indiana</TableCell>
                <TableCell>565 Holland Rd, Hawkins, Indiana</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Tab>
        <Tab key="music" title="Payout History">
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableColumn>#</TableColumn>
              <TableColumn>Payout Id</TableColumn>
              <TableColumn>Username</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Claimed At</TableColumn>
              <TableColumn>Media</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b">
                <TableCell>1</TableCell>
                <TableCell>
                  <Link to="/e-wallets/payouts/1" className="text-jajanDark2 underline">
                    Max Mayfield
                  </Link>
                </TableCell>
                <TableCell>@max</TableCell>
                <TableCell>maxxx@mail.com</TableCell>
                <TableCell>565 Holland Rd, Hawkins, Indiana</TableCell>
                <TableCell>565 Holland Rd, Hawkins, Indiana</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Tab>
      </Tabs>
    </div>
  )
}

export default List
