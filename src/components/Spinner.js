import React from 'react'
import Loading from './loading.gif'

const Spinner = ()=> {
    return (
      <div className='text-center mb-3'>
        <img src={Loading} alt="Please Wait" />
      </div>
    )
  }

export default Spinner
