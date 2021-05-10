import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { EditFormPersona } from './EditFormPersona'
import { GridCards, Card } from '../../../common/Card'
import { Section } from '../../../common/Section'
import Personas from '../../../assets/personas-red.svg'

export const ListadoPersonas = () => {
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
			.catch((e) => console.log(e.response.data))
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
			.catch((e) => console.log(e.response.data))
	}

	useEffect(() => {
		if (!params.id) return
		handleEdit(params.id)
	}, [params])

	const handleDelete = (id) => {
		Swal.fire({
			title: '¿Estas seguro?',
			text: 'Una vez eliminado no se puede recuperar',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Borrar!',
			cancelButtonText: 'No, Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				deleteConfirm(id)
			} else {
				return
			}
		})
	}

	const deleteConfirm = async (id) => {
		try {
			await axios.delete(`http://localhost:3001/api/personas/${id}`)
			Swal.fire(
				'Eliminado!',
				'La persona fue eliminada correctamente',
				'success'
			)
		} catch (e) {
			Swal.fire('Ups! No se pudo Eliminar', `${e.response.data}`, 'warning')
		}
	}

	return (
		<>
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
								<Card.Image src={Personas} alt='personas-icon' />
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
