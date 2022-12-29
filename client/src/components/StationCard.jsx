function StationCard(props) {

  const { station } = props
  return (
    <div className='border rounded-lg p-3'>
      <p>
        <span className=''>Name:</span> <span className='font-bold'>{station.Name}</span>
      </p>
      <p>
        <span className=''>Address:</span> <span className='font-bold'>{station.Adress}</span>
      </p>
      <p>
        <span className=''>Town:</span> <span className='font-bold'>{station.Kaupunki}</span>
      </p>
    </div>
  )
}
export default StationCard