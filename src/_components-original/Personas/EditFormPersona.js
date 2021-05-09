import React, { useState } from 'react'
import Axios from 'axios'
import Errors from '../Message/Errors'

const EditFormPersona = ({ personaEditar }) => {
	const [personaedit, setpersonaEdit] = useState({
		nombre: '',
		apellido: '',
		alias: '',
	})
	const [error, setError] = useState([])

	const handleChange = (e) => {
		setpersonaEdit({
			...personaedit,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (id) => {
		await Axios.put(`http://localhost:3001/api/personas/${id}`, personaedit)
			.then((res) => console.log(res))
			.catch((e) => {
				return setError(e.response.data)
			})
	}

	return (
		<div>
			{error.length > 0 && <Errors msgError={error} />}
			{personaEditar &&
				personaEditar.map((el) => (
					<form onSubmit={() => handleSubmit(el.id)}>
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
						<button type='submit'>Editar</button>
					</form>
				))}
		</div>
	)
}

export default EditFormPersona
