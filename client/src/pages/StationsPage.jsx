import React from 'react' // I don't destructure bc I prefer to "namespace" my hooks
import Layout from '../components/Layout'
import StationCard from '../components/StationCard'
import Spinner from '../components/Spinner'

// const stations = [
//   {
//     Name: 'Station name',
//     Adress: 'Some Address',
//     Kaupunki: 'Some town'
//   },
//   {
//     Name: 'Another station name',
//     Adress: 'Some other Address',
//     Kaupunki: 'Some other town'
//   },
//   {
//     Name: 'yet another station name',
//     Adress: 'Some different Address',
//     Kaupunki: 'Another town'
//   }
// ]

function StationsPage() {
  const [stations, setStations ] = React.useState([])
  const [isLoading, setIsLoading ] = React.useState(false)
  const [pageNumber, setPageNumber ] = React.useState(1)
  /* hasMore will be set to true during the first request (assuming there are
    stations) and to false when the request returns no stations. */
  const [hasMore, setHasMore ] = React.useState(false)

  const observer = React.useRef()

  const lastStation = React.useCallback(component => {
    // If 'isLoading' is true, it means we're fetching data, so bail!
    if (isLoading) return
    // Disconnect previous observer
    if (observer.current) observer.current.disconnect()

    // Create new observer instance
    observer.current = new IntersectionObserver(entries => {
      // If the last station is visible and hasMore is true
      if (entries[0].isIntersecting && hasMore) {
        console.log('You hit end of page', pageNumber) // testing
        /* Here we'd increment our page number, which will trigger the 
        callback in useEffect to make a new request for more stations. */
        setPageNumber(curr => curr + 1)

        observer.current.disconnect()
      }
    }, {
      threshold: 1
    })
    // If the component has been rendered, let's observe it
    if (component) observer.current.observe(component)
  }, [isLoading])

  React.useEffect(() => {
    async function requestStations() {
      console.log(`request for page ${pageNumber}`)
      setIsLoading(true)
      const response = await fetch('/api/stations?' + new URLSearchParams({
        page: pageNumber
      }))
      const data = await response.json()
      // console.log([...new Set([...stations, ...data])]) // testing

      // If data is an empty array, hasMore is set to false
      setHasMore(data.length > 0)

      // pushing new stations into the state array
      setStations(prev => [...new Set([...prev, ...data])])
      setIsLoading(false)
    }

    requestStations()
  }, [pageNumber])

  return (
    <Layout>
      <div className='bg-yellow-600'>
        <div className='max-w-4xl text-white mx-auto'>
          <h1 className='text-4xl text-center py-4'>Stations</h1>
          <ul className='space-y-4 px-4 my-4'>
            {stations && stations.length > 0 && stations.map((station, idx) => {
              if (stations.length === idx + 1) {
                return (<li key={station._id} ref={lastStation}>
                  <StationCard station={station} />
                </li>)
              } else {
                return (<li key={station._id}>
                  <StationCard station={station} />
                </li>)
              }
            })}
            {isLoading && <Spinner />}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default StationsPage
