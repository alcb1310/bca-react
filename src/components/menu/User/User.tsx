import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserCircleIcon } from 'lucide-react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import ChangePassword from '@/pages/users/password'

export default function UserMenu() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function userNavigation(route: string) {
    navigate(route)
  }

  function openPasswordDrawer() {
    setShowPassword((prev) => !prev)
  }

  return (
    <>
      <Menubar className='bg-primary text-white'>
        <MenubarMenu>
          <MenubarTrigger className='bg-primary text-white hover:cursor-pointer'>
            <UserCircleIcon size={22} strokeWidth={1} />
          </MenubarTrigger>

          <MenubarContent>
            <MenubarItem onClick={() => userNavigation('/usuarios')}>
              Perfil
            </MenubarItem>
            <MenubarItem onClick={() => userNavigation('/usuarios/admin')}>
              Administrar
            </MenubarItem>
            <MenubarItem onClick={() => openPasswordDrawer()}>
              Cambiar contraseña
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      {showPassword && (
        <ChangePassword onClose={() => setShowPassword((prev) => !prev)} />
      )}
    </>
  )
}
