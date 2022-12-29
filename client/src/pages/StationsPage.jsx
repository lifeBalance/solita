import React from 'react' // I don't destructure bc I prefer to "namespace" my hooks
import Layout from '../components/Layout'
import StationCard from '../components/StationCard'

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

  const observer = React.useRef()
  const lastStation = React.useCallback(component => {
    // If 'isLoading' is true, it means we're fetching data, so bail!
    if (isLoading) return
    // Disconnect previous observer
    if (observer.current) observer.current.disconnect()

    // Create new observer instance
    observer.current = new IntersectionObserver(entries => {
      // In the condition below check also that hasMore is true (gotta create that state)
      if (entries[0].isIntersecting) {
        console.log('Page', pageNumber)
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
            {isLoading && <p className='text-3xl text-white text-center font-bold'>Loading...</p>}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default StationsPage
