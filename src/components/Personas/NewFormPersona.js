import React, { useState } from 'react'
import Axios from 'axios'
import Errors from '../Message/Errors'
import { useHistory } from 'react-router-dom'

const NewFormPersona = () => {
	const [nuevaPersona, setNuevaPersona] = useState({
		nombre: '',
		apellido: '',
		mail: '',
		alias: '',
	})

	const [error, setError] = useState([])

	const handleChange = (e) => {
		setNuevaPersona({
			...nuevaPersona,
			[e.target.name]: e.target.value,
		})
	}

	const history = useHistory()

	const handleSubmit = async () => {
		await Axios.post('http://localhost:3001/api/personas', nuevaPersona)
			.then((res) => console.log(res), history.go(0))
			.catch((e) => {
				return setError([e.response.data.Error])
			})
	}

	return (
		<div>
			<h2>Agrega una nueva Persona</h2>
			{error.length > 0 && <Errors msgError={error} />}
			<div>
				<label>Nombre</label>
				<input
					type='text'
					name='nombre'
					placeholder='Nombre'
					value={nuevaPersona.nombre}
					onChange={handleChange}
				/>
				<label>Apellido</label>
				<input
					type='text'
					name='apellido'
					placeholder='Apellido'
					value={nuevaPersona.apellido}
					onChange={handleChange}
				/>
				<label>Email</label>
				<input
					type='text'
					name='mail'
					placeholder='Email'
					value={nuevaPersona.mail}
					onChange={handleChange}
				/>
				<label>Alias</label>
				<input
					type='text'
					name='alias'
					placeholder='Alias'
					value={nuevaPersona.alias}
					onChange={handleChange}
				/>

				<button onClick={handleSubmit}>Agregar</button>
			</div>
		</div>
	)
}

export default NewFormPersona
