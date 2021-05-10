import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Errors from '../Message/Errors'
import Success from '../Message/Success'

const NewFormCategoria = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const [newCategoria, setNewCategoria] = useState({
		nombre: '',
	})
	const history = useHistory()

	const handleChange = async (e) => {
		setNewCategoria({
			...newCategoria,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		await axios
			.post('http://localhost:3001/api/categorias', newCategoria)
			.then(
				(res) => setSuccess(res.data)
				/* history.go(0) */
			)
			.catch((e) => setError(e.response.data))
	}

	return (
		<div>
			<h3>Agrega una nueva Categoria</h3>
			{success && <Success msgSuccess={success} />}
			{error && <Errors msgError={error} />}
			<label>Nombre</label>
			<input
				type='text'
				name='nombre'
				placeholder='Ingrese el nombre'
				onChange={handleChange}
				value={newCategoria.nombre}
			/>
			<button onClick={handleSubmit}>Agregar Categoria</button>
		</div>
	)
}

export default NewFormCategoria
