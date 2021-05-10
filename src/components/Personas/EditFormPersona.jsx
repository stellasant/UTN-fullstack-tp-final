import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Errors from '../Message/Errors'
import Success from '../Message/Success'

const EditFormPersona = (props) => {
	const { personaEditar } = props
	const [editPersona, setEditPersona] = useState({
		nombre: '',
		apellido: '',
		alias: '',
	})

	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleChange = (e) => {
		setEditPersona({
			...editPersona,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (id) => {
		await axios
			.put(`http://localhost:3001/api/personas/${id}`, editPersona)
			.then((res) => setSuccess(res.data))
			.catch((e) => setError(e.response.data))
	}

	return (
		<div>
			{success && <Success msgSuccess={success} />}
			{error && <Errors msgError={error} />}
			{personaEditar.map((persona) => (
				<>
					<input
						type='text'
						name='nombre'
						value={editPersona.nombre}
						onChange={handleChange}
						placeholder='Nombre'
						required
					/>
					<input
						type='text'
						name='apellido'
						value={editPersona.apellido}
						onChange={handleChange}
						placeholder='Apellido'
						required
					/>
					<input
						type='text'
						name='alias'
						value={editPersona.alias}
						onChange={handleChange}
						placeholder='Alias'
						required
					/>
					<button onClick={() => handleSubmit(persona.id)}>Editar</button>
				</>
			))}
		</div>
	)
}

export default EditFormPersona

EditFormPersona.propTypes = {
	personaEditar: PropTypes.oneOf([
		{
			nombre: PropTypes.node,
			apellido: PropTypes.node,
			alias: PropTypes.node,
		},
	]),
}
