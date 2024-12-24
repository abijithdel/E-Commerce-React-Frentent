import React from 'react'
import './Error.css'

function Error(props) {
    console.log(props)
  return (
    <div className='error-page'>
        <title>{props.data.error}</title>
      <h1>{props.data.error}</h1>
      <p>{props.data.message}</p>
    </div>
  )
}

export default Error
