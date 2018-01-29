import React from 'react'

function Sort ({ sortType, handleChange }) {
  return (
    <button onClick={handleClick}>
      {sortType === 'ASC' ? '☝️' : '👇'}
    </button>
  )

  function handleClick () {
    switch (sortType) {
      case 'DESC' :
        return handleChange('ASC')
      case 'ASC' :
        return handleChange('DESC')
    }
  }
}

export default Sort
