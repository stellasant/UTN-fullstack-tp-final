import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FormWrapper, WrapperInput, ButtonsWrapper } from '../../../common/Form'

export const EditFormPersona = (props) => {
	const { onClose } = props
	const { personaEditar } = props
	const [editPersona, setEditPersona] = useState({
		nombre: '',
		apellido: '',
		alias: '',
	})

	const handleChange = (e) => {
		setEditPersona({
			...editPersona,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (id) => {
		await axios
			.put(`http://localhost:3001/api/personas/${id}`, editPersona)
			.then((res) => {
				return Swal.fire('Persona Editada con éxito!', `${res.data}`, 'success')
			})
			.catch((e) => {
				return Swal.fire(
					'Ups! La Persona no se pudo Editar!',
					`${e.response.data}`,
					'warning'
				)
			})
	}

	return (
		<FormWrapper>
			{personaEditar.map((persona) => (
				<>
					<h3>Editar {persona.nombre}</h3>
					<WrapperInput>
						<label htmlFor='nombre'>Nombre</label>
						<input
							type='text'
							name='nombre'
							value={editPersona.nombre}
							onChange={handleChange}
							placeholder={persona.nombre}
							required
						/>
					</WrapperInput>
					<WrapperInput>
						<label htmlFor='apellido'>Apellido</label>
						<input
							type='text'
							name='apellido'
							value={editPersona.apellido}
							onChange={handleChange}
							placeholder={persona.apellido}
							required
						/>
					</WrapperInput>
					<WrapperInput>
						<label htmlFor='alias'>Alias</label>
						<input
							type='text'
							name='alias'
							value={editPersona.alias}
							onChange={handleChange}
							placeholder={persona.alias}
							required
						/>
					</WrapperInput>

					<ButtonsWrapper>
						<button
							className='button-primary'
							disabled={
								!editPersona.nombre ||
								!editPersona.apellido ||
								!editPersona.alias
							}
							onClick={() => handleSubmit(persona.id)}
						>
							Guardar
						</button>
						<button className='button-secondary' onClick={onClose}>
							Cancelar
						</button>
					</ButtonsWrapper>
				</>
			))}
		</FormWrapper>
	)
}

EditFormPersona.propTypes = {
	personaEditar: PropTypes.oneOf([
		{
			nombre: PropTypes.node,
			apellido: PropTypes.node,
			alias: PropTypes.node,
		},
	]),
}
