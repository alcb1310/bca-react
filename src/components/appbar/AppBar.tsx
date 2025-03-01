import { useAppDispatch } from '@/redux/hooks'
import { logout } from '@/redux/features/login/loginSlice'
import { LogOutIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import UserMenu from '../menu/User/User'

export default function ApplicationBar() {
  const dispatch = useAppDispatch()

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <div className='flex h-[60px] w-full items-center justify-between bg-primary px-5 text-white'>
      <h1 className='text-2xl font-semibold'>
        <Link to='/'>Sistema Control Prespuestario </Link>
      </h1>
      <div className='flex gap-3'>
        <UserMenu />

        <LogOutIcon onClick={handleLogout} size={22} strokeWidth={1} />
      </div>
    </div>
  )
}
