import logo from '../assets/logo.png'
import { NavLink, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  const pathname = location.pathname

  // console.log(pathname)
  return (
    <header className='bg-yellow-500 flex justify-between items-center border-b-2 border-black'>
      <NavLink to='/' className='flex p-2 items-center'>
        <img src={logo} className='inline w-12 drop-shadow-xl'/>

        <h1 className='text-2xl md:text-3xl font-bold tracking-tighter text-white drop-shadow-xl'>Helsinki City Bikes</h1>
      </NavLink>

      <nav>
        <ul className='flex space-x-6 pr-6 text-white font-bold'>
          {pathname === '/stations' && <li className='drop-shadow-xl hover:underline hover:underline-offset-4 hover:scale-110'>
            <NavLink to='/journeys'>Journeys</NavLink>
          </li>}

          {(pathname === '/journeys' || pathname.startsWith('/stations/')) && <li className='drop-shadow-xl hover:underline hover:underline-offset-4 hover:scale-110'>
            <NavLink to='/stations'>Stations</NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  )
}
export default Header
