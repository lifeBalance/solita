function JourneyCard(props) {
  const { journey } = props

  return (
    <div className='border rounded-lg p-3'>
      <p>
        <span className=''>Departure:</span> <span className='font-bold'>{journey.departureStationName}</span>
      </p>

      <p>
        <span className=''>Return:</span> <span className='font-bold'>{journey.returnStationName}</span>
      </p>

      <p>
        <span className=''>Distance:</span> <span className='font-bold'>{parseFloat((journey.distance) / 1000).toFixed(3)}</span> Km.
      </p>

      <p>
        <span className=''>Duration:</span> <span className='font-bold'>{journey.duration}</span> minutes
      </p>
    </div>
  )
}
export default JourneyCard