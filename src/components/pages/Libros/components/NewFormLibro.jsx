import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FormWrapper, WrapperInput, ButtonsWrapper } from '../../../common/Form'

export const NewFormLibro = (props) => {
	const { categorias, onClose } = props

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
		<FormWrapper>
			<h3>Agrega un nuevo Libro</h3>
			<WrapperInput>
				<label htmlFor='nombre'>Nombre</label>
				<input
					type='text'
					name='nombre'
					value={newLibro.nombre}
					onChange={handleChange}
					required
				/>
			</WrapperInput>
			<WrapperInput>
				<label htmlFor='descripcion'>Descripción</label>
				<input
					type='text'
					name='descripcion'
					value={newLibro.descripcion}
					onChange={handleChange}
					required
				/>
			</WrapperInput>
			<WrapperInput>
				<label htmlFor='categoria'>Seleccionar Categoría</label>
				<select name='categoria' onChange={handleChange}>
					<option selected disabled>
						--Selecciona--
					</option>
					{categorias.map((categoria) => (
						<option key={categoria.id} value={categoria.id}>
							{categoria.nombre}
						</option>
					))}
				</select>
			</WrapperInput>
			<ButtonsWrapper>
				<button
					className='button-primary'
					onClick={handleSubmit}
					disabled={
						!newLibro.nombre || !newLibro.descripcion || !newLibro.categoria
					}
				>
					Agregar
				</button>
				<button className='button-secondary' onClick={onClose}>
					Cancelar
				</button>
			</ButtonsWrapper>
		</FormWrapper>
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
