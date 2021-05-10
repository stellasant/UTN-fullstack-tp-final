import React, { useState } from 'react'
import axios from 'axios'
import Errors from '../../../common/Message/Errors'
import Success from '../../../common/Message/Success'
import { FormWrapper, WrapperInput, ButtonsWrapper } from '../../../common/Form'

export const NewFormPersona = (props) => {
	const { onClose } = props
	const [newPersona, setNewPersona] = useState({
		id: undefined,
		nombre: '',
		apellido: '',
		mail: '',
		alias: '',
	})
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const handleChange = (e) => {
		setNewPersona({
			...newPersona,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async () => {
		await axios
			.post('http://localhost:3001/api/personas', newPersona)
			.then((res) => setSuccess(res.data))
			.catch((e) => setError(e.response.data))
	}

	return (
		<FormWrapper>
			<h3>Agrega una nueva Persona</h3>
			{success && <Success msgSuccess={success} />}
			{error && <Errors msgError={error} />}
			<WrapperInput>
				<label htmlFor='nombre'>Nombre</label>
				<input
					type='text'
					name='nombre'
					value={newPersona.nombre}
					onChange={handleChange}
					required
				/>
			</WrapperInput>
			<WrapperInput>
				<label htmlFor='apellido'>Apellido</label>
				<input
					type='text'
					name='apellido'
					value={newPersona.apellido}
					onChange={handleChange}
					required
				/>
			</WrapperInput>
			<WrapperInput>
				<label htmlFor='mail'>Email</label>
				<input
					type='email'
					name='mail'
					value={newPersona.mail}
					onChange={handleChange}
					required
				/>
			</WrapperInput>
			<WrapperInput>
				<label htmlFor='alias'>Alias</label>
				<input
					type='text'
					name='alias'
					value={newPersona.alias}
					onChange={handleChange}
					required
				/>
			</WrapperInput>

			<ButtonsWrapper>
				<button
					className='button-primary'
					onClick={handleSubmit}
					disabled={
						!newPersona.nombre ||
						!newPersona.apellido ||
						!newPersona.mail ||
						!newPersona.alias
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
