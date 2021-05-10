import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FormWrapper, WrapperInput, ButtonsWrapper } from '../../../common/Form'

export const NewFormCategoria = (props) => {
	const { onClose } = props
	const [newCategoria, setNewCategoria] = useState({
		nombre: '',
	})

	const handleChange = async (e) => {
		setNewCategoria({
			...newCategoria,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		await axios
			.post('http://localhost:3001/api/categorias', newCategoria)
			.then((res) => {
				return Swal.fire('Agregado!', `${res.data}`, 'success')
			})
			.catch((e) => {
				return Swal.fire('No se pudo Agregar!', `${e.response.data}`, 'warning')
			})
	}

	return (
		<FormWrapper>
			<h3>Agrega una nueva Categoría</h3>
			<WrapperInput>
				<label htmlFor='nombre'>Nombre</label>
				<input
					type='text'
					name='nombre'
					value={newCategoria.nombre}
					onChange={handleChange}
					required
				/>
			</WrapperInput>
			<ButtonsWrapper>
				<button
					className='button-primary'
					onClick={handleSubmit}
					disabled={!newCategoria.nombre}
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
