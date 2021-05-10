import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import EditFormPersona from './EditFormPersona'
import NewFormPersona from './NewFormPersona'
import Errors from '../Message/Errors'
import Success from '../Message/Success'

const Personas = () => {
	/*
	 * TODO Personas:
	 * - Alta => Agregar nueva Persona
	 * - Modificación => Editar Persona
	 * - Baja => Borrar Persona
	 */
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	const [personas, setPersonas] = useState([])
	const [showNewForm, setShowNewForm] = useState(false)
	const [showEditForm, setShowEditForm] = useState(false)
	const [personaEditar, setPersonaEditar] = useState([
		{
			nombre: '',
			apellido: '',
			alias: '',
		},
	])
	const history = useHistory()
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
		<div>
			<h2>Listado de Personas</h2>
			<button onClick={() => setShowNewForm(true)}>Agregar Persona</button>
			{success && <Success msgSuccess={success} />}
			{error && <Errors msgError={error} />}
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Apellido</th>
						<th>Alias</th>
						<th>Email</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{personas &&
						personas.map((persona) => (
							<tr key={persona.id}>
								<td>{persona.nombre}</td>
								<td>{persona.apellido}</td>
								<td>{persona.alias}</td>
								<td>{persona.mail}</td>
								<td>
									<button onClick={() => handleEdit(persona.id)}>Editar</button>
									<button onClick={() => handleDelete(persona.id)}>
										Eliminar
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{showNewForm && <NewFormPersona />}
			{showEditForm && <EditFormPersona personaEditar={personaEditar} />}
		</div>
	)
}

export default Personas
