import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Errors from '../Message/Errors'

const EditFormPersona = ({ personaEditar }) => {
	const [personaedit, setpersonaEdit] = useState({
		nombre: '',
		apellido: '',
		alias: '',
	})
	const [error, setError] = useState([])
	const history = useHistory()

	const handleChange = (e) => {
		setpersonaEdit({
			...personaedit,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (id) => {
		await axios
			.put(`http://localhost:3001/api/personas/${id}`, personaedit)
			.then((res) => console.log(res), history.go(0))
			.catch((e) => console.log(e))
	}

	return (
		<div>
			{error.length > 0 && <Errors msgError={error} />}
			{personaEditar.map((el) => (
				<>
					<input
						type='text'
						name='nombre'
						value={personaedit.nombre}
						onChange={handleChange}
						placeholder='Nombre'
					/>
					<input
						type='text'
						name='apellido'
						value={personaedit.apellido}
						onChange={handleChange}
						placeholder='Apellido'
					/>
					<input
						type='text'
						name='alias'
						value={personaedit.alias}
						onChange={handleChange}
						placeholder='Alias'
					/>
					<button onClick={() => handleSubmit(el.id)}>Editar</button>
				</>
			))}
		</div>
	)
}

export default EditFormPersona
