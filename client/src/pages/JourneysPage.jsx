import React from 'react' // I import like that bc I prefer to "namespace" my hooks
import Layout from '../components/Layout'
import JourneyCard from '../components/JourneyCard'

function JourneysPage() {
  const [journeys, setJourneys ] = React.useState([])

  React.useEffect(() => {
    async function requestJourneys() {
      const response = await fetch('/api/journeys')
      const data = await response.json()
      setJourneys(data)
    }

    requestJourneys()
  }, [])

  return (
    <Layout>
      <div className='bg-yellow-600'>
        <div className='max-w-4xl text-white mx-auto'>
          <h1 className='text-4xl text-center py-4'>Journeys</h1>
          <ul className='space-y-4 px-4 my-4'>
            {journeys && journeys.length > 0 && journeys.map(j => (
              <li key={j._id}>
                <JourneyCard journey={j} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default JourneysPage
