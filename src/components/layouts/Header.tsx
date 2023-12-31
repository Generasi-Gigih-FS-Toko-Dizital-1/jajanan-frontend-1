import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import useFetch from '../../hooks/useFetch'
import useAuthentication from '../../hooks/useAuthentication'

import { confirmAlert } from '../elements/CustomAlert'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { AiOutlineMenuFold, AiOutlineUser } from 'react-icons/ai'

const Header = ({ sidebarToggle }: { sidebarToggle: () => void }): React.ReactElement => {
  const navigate = useNavigate()
  const { authentication }: any = useAuthentication()

  const session = authentication.session
  const { logout } = useLogout()
  const url = `api/v1/admins/${session.accountId}`
  const { data } = useFetch(url)

  const handleLogout = (): void => {
    void confirmAlert(
      'Are you sure to logout?',
      'You will be logged out from this session!',
      'Yes, logout!',
      'No, cancel!'
    )
      .then((result) => {
        result.isConfirmed === true &&
        logout()
      })
  }

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
          aria-label="Dropdown menu for admin profile and logout"
          className="text-center flex flex-col gap-2"
          onAction={(key) => {
            if (key === 'logout') {
              handleLogout()
            } else if (key === 'profile') {
              navigate(`/admins/${session.accountId}`)
            }
          }
        }
        >
          <DropdownItem
            key="profile"
            color="default"
          >
            {data?.data.fullName}
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-white bg-jajanDanger2/80"
            color="danger"
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </header>
  )
}

export default Header
