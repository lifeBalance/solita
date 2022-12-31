export default function SortBy(props) {
  const {
    sortBy,
    orderBy,
    handleSortByChange,
    handleOrderByChange
  } = props

  return (
    <div className='flex justify-center pr-2'>
      <div className='grid grid-cols-3 gap-1'>
        <label className='text-center col-span-1'>Sort by</label>

        <div className='col-span-1'>
          <select
            className='rounded-sm p-1 text-slate-700'
            id='field'
            onChange={handleSortByChange}
            value={sortBy}
          >
            <option value='departureStationName'>Departure</option>
            <option value='returnStationName'>Return</option>
            <option value='distance'>Distance</option>
            <option value='duration'>Duration</option>
          </select>
        </div>

        <div className='col-span-1'>
          <select
            className='rounded-sm p-1 text-slate-700'
            id='order'
            onChange={handleOrderByChange}
            value={orderBy}
          >
            <option value='1'>Ascending</option>
            <option value='-1'>Descending</option>
          </select>
        </div>
      </div>
    </div>
  )
}
