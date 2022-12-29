import React from 'react'

const stations = [
  {
    Name: 'Station name',
    Adress: 'Some Address',
    Kaupunki: 'Some town'
  },
  {
    Name: 'Another station name',
    Adress: 'Some other Address',
    Kaupunki: 'Some other town'
  },
  {
    Name: 'yet another station name',
    Adress: 'Some different Address',
    Kaupunki: 'Another town'
  }
]

function StationsPage() {
  return (
    <div className='bg-yellow-600  min-h-screen flex'>
      <div className='max-w-4xl text-white mx-auto'>
        <h1 className='text-4xl text-center py-4'>Stations</h1>
        <ul className='space-y-4'>
          {stations && stations.length > 0 && stations.map(s => (
            <li className='border rounded-lg p-3' key={s._id}>
              <p>
                <span className=''>Name:</span> <span className='font-bold'>{s.Name}</span>
              </p>
              <p>
                <span className=''>Address:</span> <span className='font-bold'>{s.Adress}</span>
              </p>
              <p>
                <span className=''>Town:</span> <span className='font-bold'>{s.Kaupunki}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StationsPage