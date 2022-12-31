import React from 'react' // I don't destructure bc I prefer to "namespace" my hooks
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'

function StationPage() {
  const [station, setStation] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { id } = useParams()

  React.useEffect(() => {
    async function getStation() {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/stations/${id}`)
        const data = await response.json()
  
        setStation(data)
        // console.log(data) // testing
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }

    getStation()
  }, [])

  if (isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>)

  if (!isLoading && !station)
    return (
      <Layout>
        <p className='text-4xl p-20'>Woops, such station doesn't exist</p>
      </Layout>)

    return (
    <Layout>
      <div className='bg-yellow-600 py-20 px-4'>
        <div className='max-w-4xl text-white mx-auto px-2 flex flex-col space-y-4'>
          <h1 className='text-4xl text-center py-4'>{station.Name}</h1>
          <p>
            <span className=''>Address:</span> <span className='font-bold'>{station.Adress}</span>
          </p>
          <p>
            <span className=''>Town:</span> <span className='font-bold'>{station.Kaupunki || '---'}</span>
          </p>
          <p>
            <span className=''>Journeys starting at this station:</span> <span className='font-bold'>{station.journeysStartingAt || '0'}</span>
          </p>
          <p>
            <span className=''>Journeys ending at this station:</span> <span className='font-bold'>{station.journeysEndingAt || '0'}</span>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default StationPage
