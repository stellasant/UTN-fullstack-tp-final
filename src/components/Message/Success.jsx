import React from 'react'

const Success = ({ msgSuccess }) => {
	return <div>{msgSuccess ? <p>{msgSuccess}</p> : null}</div>
}

export default Success
