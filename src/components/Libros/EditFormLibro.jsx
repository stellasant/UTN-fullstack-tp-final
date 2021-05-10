import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Errors from '../Message/Errors'
import PropTypes from 'prop-types'

const EditFormLibro = (props) => {
	const { libroEditar } = props
	const [editLibro, setEditLibro] = useState({
		descripcion: '',
	})
	const [error, setError] = useState([])
	const history = useHistory()

	const handleChange = (e) => {
		setEditLibro({
			...editLibro,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (id) => {
		await axios
			.put(`http://localhost:3001/api/libros/${id}`, editLibro)
			.then((res) => console.log(res), history.go(0))
			.catch((e) => console.log(e))
	}

	return (
		<div>
			{error.length > 0 && <Errors msgError={error} />}
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
