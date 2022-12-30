import React from 'react'

export default function useMinMax(params) {
  const [min, setMin] = React.useState('')
  const [max, setMax] = React.useState('')

  function handleChange(e) {
    // console.log(e.target.id)
    if (e.target.id === 'min')
      setMin(e.target.value)
    else
      setMax(e.target.value)
  }

  return {
    handleChange,
    min,
    max
  }
}
