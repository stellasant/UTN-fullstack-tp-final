import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Swal from 'sweetalert2'

export const NewFormLibro = (props) => {
	const { categorias } = props
	const [newLibro, setNewlibro] = useState({
		nombre: '',
		descripcion: '',
		id_genero: '',
	})

	const handleChange = (e) => {
		setNewlibro({
			...newLibro,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		await axios
			.post('http://localhost:3001/api/libros', newLibro)
			.then((res) => {
				return Swal.fire('Agregado!', `${res.data}`, 'success')
			})
			.catch((e) => {
				return Swal.fire('No se pudo Agregar!', `${e.response.data}`, 'warning')
			})
	}

	return (
		<div>
			<label>Nombre</label>
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

NewFormLibro.propTypes = {
	newLibro: PropTypes.oneOf([
		{
			nombre: PropTypes.node,
			descripcion: PropTypes.node,
			id_genero: PropTypes.node,
		},
	]),
}
