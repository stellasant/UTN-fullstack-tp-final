import React, { useState } from 'react'
import axios from 'axios'
import Errors from '../Message/Errors'
import Success from '../Message/Success'

const NewFormPersona = () => {
	const [newPersona, setNewPersona] = useState({
		id: undefined,
		nombre: '',
		apellido: '',
		mail: '',
		alias: '',
	})
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleChange = (e) => {
		setNewPersona({
			...newPersona,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		await axios
			.post('http://localhost:3001/api/personas', newPersona)
			.then((res) => setSuccess(res.data))
			.catch((e) => setError(e.response.data))
	}

	return (
		<div>
			<h2>Agrega una nueva Persona</h2>
			{success && <Success msgSuccess={success} />}
			{error && <Errors msgError={error} />}
			<label>Nombre</label>
			<input
				type='text'
				name='nombre'
				placeholder='Nombre'
				value={newPersona.nombre}
				onChange={handleChange}
				required
			/>
			<label>Apellido</label>
			<input
				type='text'
				name='apellido'
				placeholder='Apellido'
				value={newPersona.apellido}
				onChange={handleChange}
				required
			/>
			<label>Email</label>
			<input
				type='email'
				name='mail'
				placeholder='Email'
				value={newPersona.mail}
				onChange={handleChange}
				required
			/>
			<label>Alias</label>
			<input
				type='text'
				name='alias'
				placeholder='Alias'
				value={newPersona.alias}
				onChange={handleChange}
				required
			/>
			<button onClick={handleSubmit}>Agregar</button>
		</div>
	)
}

export default NewFormPersona
