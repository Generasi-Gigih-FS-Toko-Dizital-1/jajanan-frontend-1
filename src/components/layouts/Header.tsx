import React from 'react'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { AiOutlineMenuFold, AiOutlineUser } from 'react-icons/ai'

import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import BackendOneClient from '../../clients/BackendOneClient'
import useAuthentication from '../../hooks/useAuthentication'

const Header = ({ sidebarToggle }: { sidebarToggle: () => void }): React.ReactElement => {
  const navigate = useNavigate()
  const client = new BackendOneClient()
  const { authentication, setAuthentication }: any = useAuthentication()

  const session = authentication.session

  const url = `api/v1/admins/${session.accountId}`
  const { data } = useFetch(url)

  const handleLogout = (): void => {
    confirm('Are you sure you want to logout?')
      ? client.instance.post('api/v1/authentications/admins/logout', {
        session: authentication.session
      })
        .then(() => {
          setAuthentication(null)
          localStorage.removeItem('authentication')
          navigate('/login')
        })
        .catch((err: any) => { console.log(err) })
      : alert('logout canceled')
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
          aria-label="Static Actions"
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
            <p className="text-jajanDark2">{data?.data.fullName}</p>
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
