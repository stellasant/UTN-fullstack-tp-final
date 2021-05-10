import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { EditFormPersona } from './EditFormPersona'
import Errors from '../../../common/Message/Errors'
import Success from '../../../common/Message/Success'
import { GridCards, Card } from '../../../common/Card'
import { ButtonsWrapper } from '../../../common/Form'
import { Section } from '../../../common/Section'
import Person from '../../../assets/man.png'

export const ListadoPersonas = () => {
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const [personas, setPersonas] = useState([])
	const [showEditForm, setShowEditForm] = useState(false)
	const [personaEditar, setPersonaEditar] = useState([
		{
			nombre: '',
			apellido: '',
			alias: '',
		},
	])
	const params = useParams()

	const traerPersonas = async () => {
		await axios
			.get('http://localhost:3001/api/personas')
			.then((res) => setPersonas(res.data.respuesta))
			.catch((e) => setError(e.response.data))
	}

	useEffect(() => {
		traerPersonas()
	}, [])

	const handleEdit = async (id) => {
		await axios
			.get(`http://localhost:3001/api/personas/${id}`)
			.then(
				(res) => setPersonaEditar(res.data.respuesta),
				setShowEditForm(true)
			)
			.catch(
				(e) => console.log(e),
				(e) => setError(e.response.data)
			)
	}

	useEffect(() => {
		if (!params.id) return
		handleEdit(params.id)
	}, [params])

	const handleDelete = async (id) => {
		await axios
			.delete(`http://localhost:3001/api/personas/${id}`)
			.then((res) => setSuccess(res.data))
			.catch((e) => setError(e.response.data))
	}

	return (
		<>
			{success && <Success msgSuccess={success} />}
			{error && <Errors msgError={error} />}
			{showEditForm && (
				<Section className='section-form'>
					<EditFormPersona
						personaEditar={personaEditar}
						onClose={() => setShowEditForm(false)}
					/>
				</Section>
			)}
			<GridCards>
				{personas &&
					personas.map((persona) => (
						<Card.Wrapper key={persona.id}>
							<Card.Header>
								<Card.Image src={Person} alt='personas-icon' />
								<div>
									<Card.Value>{persona.nombre}</Card.Value>
									<Card.Label>ID {persona.id}</Card.Label>
								</div>
							</Card.Header>
							<Card.Body>
								<Card.Item>
									<Card.Label>Apellido</Card.Label>
									<Card.Value>{persona.apellido}</Card.Value>
								</Card.Item>
								<Card.Item>
									<Card.Label>Email</Card.Label>
									<Card.Value>{persona.mail}</Card.Value>
								</Card.Item>
								<Card.Item>
									<Card.Label>Alias</Card.Label>
									<Card.Value>{persona.alias}</Card.Value>
								</Card.Item>
							</Card.Body>
							<Card.Footer>
								<Card.Action onClick={() => handleEdit(persona.id)}>
									Editar
								</Card.Action>
								<Card.Action onClick={() => handleDelete(persona.id)}>
									Eliminar
								</Card.Action>
							</Card.Footer>
						</Card.Wrapper>
					))}
			</GridCards>
		</>
	)
}
