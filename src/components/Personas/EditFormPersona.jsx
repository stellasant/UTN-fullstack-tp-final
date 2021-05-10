import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Errors from '../Message/Errors'
import PropTypes from 'prop-types'

const EditFormPersona = (props) => {
	const { personaEditar } = props
	const [personaEdit, setpersonaEdit] = useState({
		nombre: '',
		apellido: '',
		alias: '',
	})
	const [error, setError] = useState([])
	const history = useHistory()

	const handleChange = (e) => {
		setpersonaEdit({
			...personaEdit,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (id) => {
		await axios
			.put(`http://localhost:3001/api/personas/${id}`, personaEdit)
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
						value={personaEdit.nombre}
						onChange={handleChange}
						placeholder='Nombre'
					/>
					<input
						type='text'
						name='apellido'
						value={personaEdit.apellido}
						onChange={handleChange}
						placeholder='Apellido'
					/>
					<input
						type='text'
						name='alias'
						value={personaEdit.alias}
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

EditFormPersona.propTypes = {
	personaEditar: PropTypes.oneOf([
		{
			nombre: PropTypes.node,
			apellido: PropTypes.node,
			alias: PropTypes.node,
		},
	]),
}