import React from 'react' // I import like that bc I prefer to "namespace" my hooks
import Layout from '../components/Layout'
import JourneyCard from '../components/JourneyCard'
import Spinner from '../components/Spinner'

function JourneysPage() {
  const [journeys, setJourneys ] = React.useState([])
  const [isLoading, setIsLoading ] = React.useState(false)

  // for infinite pagination
  const [pageNumber, setPageNumber ] = React.useState(1)
  const [hasMore, setHasMore ] = React.useState(false)
  const observer = React.useRef()

  const lastJourney = React.useCallback(component => {
    // If 'isLoading' is true, it means we're fetching data, so bail!
    if (isLoading) return
    // Disconnect previous observer
    if (observer.current) observer.current.disconnect()

    // Create new observer instance
    observer.current = new IntersectionObserver(entries => {
      // If the last station is visible and hasMore is true
      if (entries[0].isIntersecting && hasMore) {
        // console.log('You hit end of page', pageNumber) // testing
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
    async function requestJourneys() {
      // console.log(`requesting page ${pageNumber}`)  // testing
      setIsLoading(true)
      const response = await fetch('/api/journeys')
      const data = await response.json()
      // console.log(data) // testing

      // If data is an empty array, hasMore is set to false
      setHasMore(data.length > 0)

      // setJourneys(prev => [...new Set([...prev, ...data])])
      setJourneys(prev => [...prev, ...data])
      
      setIsLoading(false)
    }

    requestJourneys()
  }, [pageNumber])

  return (
    <Layout>
      <div className='bg-yellow-600'>
        <div className='max-w-4xl text-white mx-auto'>
          <h1 className='text-4xl text-center py-4'>Journeys</h1>
          <ul className='space-y-4 px-4 my-4'>
            {journeys && journeys.length > 0 && journeys.map((journey, idx) => {
              /**
               * I encountered repeated keys issue which couldn't understand,
               * since the _ids in the database were unique and was using them
               * as keys for the components.
               *  I fixed with a not very nice hack (appending the index
               * of the item to the "unique" _id value. If you know why,
               * please, I'd love to know 🙂) 
               */
              if (journeys.length === idx + 1) {
                return (<li key={`${journey._id}${idx}`} ref={lastJourney}>
                  <JourneyCard journey={journey} />
                </li>)
              } else {
                return (<li key={`${journey._id}${idx}`}>
                  <JourneyCard journey={journey} />
                </li>)
              }
            })}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default JourneysPage
