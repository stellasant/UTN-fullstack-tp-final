import React, { useState } from 'react'
import Axios from 'axios'
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

	const handleChange = (e) => {
		setNuevaPersona({
			...nuevaPersona,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		await Axios.post('http://localhost:3001/api/personas', nuevaPersona)
			.then((res) => console.log(res))
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
			<form onSubmit={handleSubmit}>
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

				<button type='submit'>Agregar</button>
			</form>
		</div>
	)
}

export default NewFormPersona
