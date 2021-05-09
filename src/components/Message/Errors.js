import React from 'react'

const Errors = ({ msgError }) => {
	console.log(msgError)

	return <div>{msgError ? <p>{msgError}</p> : null}</div>
}

export default Errors
