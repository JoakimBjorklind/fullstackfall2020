import React from 'react'

const Filter = ({handlefilterChange, newFilter}) => {
  return (
    <div>
      find countries: <input onChange={handlefilterChange} value={newFilter} />
    </div>
  )
}

export default Filter