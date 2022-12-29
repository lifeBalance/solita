import React from 'react' // I import like that bc I prefer to "namespace" my hooks

// const journeys = [
//   {
//     departureStationName: 'Some station',
//     returnStationName: 'some other station',
//     distance: 1203,
//     duration: 10
//   },
//   {
//     departureStationName: 'Another station',
//     returnStationName: 'home station',
//     distance: 2203,
//     duration: 22
//   },
//   {
//     departureStationName: 'yet another station',
//     returnStationName: 'and another one',
//     distance: 3203,
//     duration: 34
//   }
// ]


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
    <div className='bg-yellow-600  min-h-screen flex'>
      <div className='max-w-4xl text-white mx-auto'>
        <h1 className='text-4xl text-center py-4'>Journeys</h1>
        <ul className='space-y-4'>
          {journeys && journeys.length > 0 && journeys.map(j => (
            <li className='border rounded-lg p-3' key={j._id}>
              <p>
                <span className=''>Departure:</span> <span className='font-bold'>{j.departureStationName}</span>
              </p>

              <p>
                <span className=''>Return:</span> <span className='font-bold'>{j.returnStationName}</span>
              </p>

              <p>
                <span className=''>Distance:</span> <span className='font-bold'>{j.distance}</span> meters
              </p>

              <p>
                <span className=''>Duration:</span> <span className='font-bold'>{j.duration}</span> minutes
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default JourneysPage
