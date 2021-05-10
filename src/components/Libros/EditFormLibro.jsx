import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import Errors from '../Message/Errors'
import Success from '../Message/Success'

const EditFormLibro = (props) => {
	const { libroEditar } = props
	const [editLibro, setEditLibro] = useState({
		descripcion: '',
	})
	const history = useHistory()

	const [errors, setErrors] = useState('')
	const [success, setSuccess] = useState('')

	const handleChange = (e) => {
		setEditLibro({
			...editLibro,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (id) => {
		await axios
			.put(`http://localhost:3001/api/libros/${id}`, editLibro)
			.then((res) => setSuccess(res.data))
			.catch((e) => setErrors(e.response.data))
	}

	return (
		<div>
			{errors && <Errors msgError={errors} />}
			{success && <Success msgSuccess={success} />}
			{libroEditar.map((libro) => (
				<>
					<input
						type='text'
						name='descripcion'
						value={editLibro.descripcion}
						onChange={handleChange}
						placeholder='Descripcion'
					/>
					<button onClick={() => handleSubmit(libro.id)}>Editar</button>
				</>
			))}
		</div>
	)
}

export default EditFormLibro

EditFormLibro.propTypes = {
	libroEditar: PropTypes.oneOf([
		{
			descripcion: PropTypes.node,
		},
	]),
}
