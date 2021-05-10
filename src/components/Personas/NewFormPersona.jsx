import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Errors from '../Message/Errors'

const NewFormPersona = () => {
	const [nuevaPersona, setNuevaPersona] = useState({
		id: undefined,
		nombre: '',
		apellido: '',
		mail: '',
		alias: '',
	})
	const [error, setError] = useState([])
	const history = useHistory()

	const handleChange = (e) => {
		setNuevaPersona({
			...nuevaPersona,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		await axios
			.post('http://localhost:3001/api/personas', nuevaPersona)
			.then((res) => console.log(res), history.go(0))
			.catch((e) => {
				return setError([e.response.data.Error])
			})
	}

	// useEffect(() => {
	//      handleSubmit()
	// }, [])

	return (
		<div>
			<h2>Agrega una nueva Persona</h2>
			{error.length > 0 && <Errors msgError={error} />}
			<label>Nombre</label>
			<input
				type='text'
				name='nombre'
				placeholder='Nombre'
				value={nuevaPersona.nombre}
				onChange={handleChange}
				required
			/>
			<label>Apellido</label>
			<input
				type='text'
				name='apellido'
				placeholder='Apellido'
				value={nuevaPersona.apellido}
				onChange={handleChange}
				required
			/>
			<label>Email</label>
			<input
				type='email'
				name='mail'
				placeholder='Email'
				value={nuevaPersona.mail}
				onChange={handleChange}
				required
			/>
			<label>Alias</label>
			<input
				type='text'
				name='alias'
				placeholder='Alias'
				value={nuevaPersona.alias}
				onChange={handleChange}
				required
			/>
			<button onClick={handleSubmit}>Agregar</button>
		</div>
	)
}

export default NewFormPersona
