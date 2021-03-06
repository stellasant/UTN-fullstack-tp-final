import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FormWrapper, WrapperInput, ButtonsWrapper } from '../../../common/Form'

export const EditFormLibro = (props) => {
	const { libroEditar } = props
	const [editLibro, setEditLibro] = useState({
		descripcion: '',
	})

	const handleChange = (e) => {
		setEditLibro({
			...editLibro,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (id) => {
		await axios
			.put(`http://localhost:3001/api/libros/${id}`, editLibro)
			.then((res) => {
				return Swal.fire('Editado!', `${res.data}`, 'success')
			})
			.catch((e) => {
				return Swal.fire('No se pudo Editar!', `${e.response.data}`, 'warning')
			})
	}

	return (
		<FormWrapper>
			{libroEditar.map((libro) => (
				<>
					<WrapperInput>
						<input
							type='text'
							name='descripcion'
							value={editLibro.descripcion}
							onChange={handleChange}
							placeholder='Descripcion'
							key={editLibro.id}
						/>
					</WrapperInput>
					<ButtonsWrapper>
						<button
							className='button-primary'
							disabled={!editLibro.descripcion}
							onClick={() => handleSubmit(libro.id)}
						>
							Editar
						</button>
					</ButtonsWrapper>
				</>
			))}
		</FormWrapper>
	)
}
