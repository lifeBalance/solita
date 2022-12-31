import React from 'react' // I don't destructure bc I prefer to "namespace" my hooks
import Layout from '../components/Layout'
import StationCard from '../components/StationCard'
import Spinner from '../components/Spinner'
import { Collapse } from 'react-collapse'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

function StationsPage() {
  const [stations, setStations] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [isOpenAdvancedSearch, setIsOpenAdvancedSearch] = React.useState(false)
  const [searchVal, setSearchVal] = React.useState('')

  /* hasMore will be set to true during the first request (assuming there are
    stations) and to false when the request returns no stations. */
  const [hasMore, setHasMore] = React.useState(false)

  const observer = React.useRef()

  const lastStation = React.useCallback(
    (component) => {
      // If 'isLoading' is true, it means we're fetching data, so bail!
      if (isLoading) return
      // Disconnect previous observer
      if (observer.current) observer.current.disconnect()

      // Create new observer instance
      observer.current = new IntersectionObserver(
        (entries) => {
          // If the last station is visible and hasMore is true
          if (entries[0].isIntersecting && hasMore) {
            console.log('You hit end of page', pageNumber) // testing
            /* Here we'd increment our page number, which will trigger the 
            callback in useEffect to make a new request for more stations. */
            setPageNumber((curr) => curr + 1)

            observer.current.disconnect()
          }
        },
        {
          threshold: 1,
        },
      )
      // If the component has been rendered, let's observe it
      if (component) observer.current.observe(component)
    },
    [isLoading],
  )

  function filterStations(pattern) {
    const result = stations.filter(station => station.Name.match(new RegExp(pattern.toLowerCase())))
    setStations(result)
  }

  async function requestStations() {
    console.log(`request for page ${pageNumber}`)
    setIsLoading(true)
    const response = await fetch(
      '/api/stations?' +
        new URLSearchParams({
          page: pageNumber,
          search: searchVal
        }),
    )
    const data = await response.json()
    // console.log([...new Set([...stations, ...data])]) // testing

    // If data is an empty array, hasMore is set to false
    setHasMore(data.length > 0)

    // pushing new stations into the state array
    setStations((prev) => [...new Set([...prev, ...data])])
    setIsLoading(false)
    return data
  }

  async function requestSearchedStations() {
    // console.log(`request for page ${pageNumber}`)
    setIsLoading(true)
    const response = await fetch(
      '/api/stations?' +
        new URLSearchParams({
          page: 1,
          search: searchVal
        }),
    )
    const data = await response.json()
    // console.log([...new Set([...stations, ...data])]) // testing

    // If data is an empty array, hasMore is set to false
    setHasMore(data.length > 0)
    setPageNumber(1)

    // pushing new stations into the state array
    setStations(data)
    setIsLoading(false)
  }

  React.useEffect(() => {
    requestStations()
  }, [pageNumber])

  function inputChangeHandler(e) {
    console.log(e.target.value)
    setSearchVal(e.target.value)
  }

  React.useEffect(() => {
    const timerId = setTimeout(async () => {
      if (searchVal) {
        requestSearchedStations()
      }
    }, 800)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchVal])

  return (
    <Layout>
      <div className='bg-yellow-600'>
        <div className='max-w-4xl text-white mx-auto px-2'>
          <h1 className='text-4xl text-center py-4'>Stations</h1>
          <div className='max-w-xl flex flex-col border rounded p-3 mx-auto'>
            <div
              className='flex justify-between'
              onClick={() => setIsOpenAdvancedSearch((prev) => !prev)}
            >
              <p className='text-2xl'>Advanced search</p>
              {isOpenAdvancedSearch ? (
                <ChevronUpIcon className='inline w-6 text-white' />
              ) : (
                <ChevronDownIcon className='inline w-6 text-white' />
              )}
            </div>

            <Collapse isOpened={isOpenAdvancedSearch}>
              <div className='flex flex-col space-y-6'>
                <hr className='' />
                <div className='grid grid-cols-3'>
                  <label className='col-span-1 text-center'>
                    Station Name:
                  </label>
                  <input
                    type='text'
                    className='col-span-2 rounded-sm pl-2 text-slate-700'
                    value={searchVal}
                    onChange={inputChangeHandler}
                    placeholder='Enter a Station Name'
                  />
                </div>
              </div>
            </Collapse>
          </div>

          <ul className='space-y-4 my-4'>
            {!isLoading && stations && stations.length === 0 && <p>No Matching Stations</p>}
            {!isLoading && stations &&
              stations.length > 0 &&
              stations.map((station, idx) => {
                if (stations.length === idx + 1) {
                  return (
                    <li
                      key={`${station._id}`}
                      ref={lastStation}
                    >
                      <StationCard station={station} />
                    </li>
                  )
                } else {
                  return (
                    <li key={`${station._id}`}>
                      <StationCard station={station} />
                    </li>
                  )
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
