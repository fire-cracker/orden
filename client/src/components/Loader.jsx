import React from 'react'

import ClipLoader from 'react-spinners/ClipLoader'

const  Loader = () => {
  return (
    <div className='container h-100 d-flex justify-content-center'>
      <div className='jumbotron my-auto'>
        <ClipLoader size={50} color={'#00acc1'} loading={true} />
      </div>
    </div>
  )
}

export default Loader