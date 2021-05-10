import React from 'react'

const Errors = ({ msgError }) => {
	return <div>{msgError ? <p>{msgError}</p> : null}</div>
}

export default Errors
