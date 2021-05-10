import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Errors from '../Message/Errors'
import Success from '../Message/Success'

const NewFormLibro = (props) => {
	const { categorias } = props
	const [newLibro, setNewlibro] = useState({
		nombre: '',
		descripcion: '',
		id_genero: '',
	})
	const history = useHistory()

	const [errors, setErrors] = useState('')
	const [success, setSuccess] = useState('')

	const handleChange = (e) => {
		setNewlibro({
			...newLibro,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		await axios
			.post('http://localhost:3001/api/libros', newLibro)
			.then((res) => setSuccess(res.data))
			.catch((e) => setErrors(e.response.data))
	}

	return (
		<div>
			<label>Nombre</label>
			{errors && <Errors msgError={errors} />}
			{success && <Success msgSuccess={success} />}
			<input
				type='text'
				name='nombre'
				placeholder='Ingresa el nombre'
				value={newLibro.nombre}
				onChange={handleChange}
			/>
			<label>Descripcion</label>
			<textarea
				name='descripcion'
				value={newLibro.descripcion}
				onChange={handleChange}
			></textarea>
			<select name='id_genero' onChange={handleChange}>
				<option selected disabled>
					--Selecciona--
				</option>
				{categorias.map((categoria) => (
					<option key={categoria.id} value={categoria.id}>
						{categoria.nombre}
					</option>
				))}
			</select>
			<button onClick={handleSubmit}>Agregar Libro</button>
		</div>
	)
}

export default NewFormLibro
