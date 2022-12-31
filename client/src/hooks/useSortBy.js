import React from 'react'

export default function useSortBy() {
  const [sortBy, setSortBy] = React.useState('departureStationName')
  // const [sortBy, setSortBy] = React.useState('distance')
  const [orderBy, setOrderBy] = React.useState(1) // 1 is ascending; -1 desc.

  function sortByChangeHandler(e) {
    // console.log(e.target.value)
    setSortBy(e.target.value)
  }
  function orderByChangeHandler(e) {
    // console.log(e.target.value)
    setOrderBy(e.target.value)
  }

  return {
    sortByChangeHandler,
    orderByChangeHandler,
    sortBy,
    orderBy
  }
}
