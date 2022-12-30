export default function FilterMinMax(props) {
  const { label, type, minVal, maxVal, handleChange } = props

  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-3 gap-3'>
        <label className='text-center col-span-1'>{label}</label>
        <input
          id='min'
          onChange={handleChange}
          type={type}
          min='0'
          className='col-span-1 rounded-sm pl-2 text-slate-700'
          value={minVal}
          placeholder='Minimum'
        />

        <input
          id='max'
          onChange={handleChange}
          type={type}
          min='0'
          className='col-span-1 rounded-sm pl-2 text-slate-700'
          value={maxVal}
          placeholder='Maximum'
        />
      </div>
    </div>
  )
}
