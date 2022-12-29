import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className='bg-bikes w-screen h-screen bg-center bg-cover flex flex-col space-y-4 items-center justify-center'>
      <div className='max-w-4xl backdrop-blur-sm bg-white/20 rounded-lg border p-10 space-y-20'>
        <div className='flex px-10'>
          <h1 className='text-white text-right font-bold text-6xl tracking-tighter'>
            Welcome to Helsinki City Bike
          </h1>
          <img
            src={logo}
            alt='Helsinki City Bike'
            className='w-[20%] hidden md:inline'
          />
        </div>
        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 items-center md:space-x-6 text-white text-4xl font-bold'>
          <Link
            to='/journeys'
            className='text-center border w-full rounded-lg p-8 hover:bg-white hover:bg-opacity-20 hover:scale-110'
          >
            Journeys
          </Link>
          <Link
            to='/stations'
            className='text-center border w-full rounded-lg p-8 hover:bg-white hover:bg-opacity-20 hover:scale-110'
          >
            Stations
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
