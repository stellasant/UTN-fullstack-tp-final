import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import EditFormPersona from './EditFormPersona'
import NewFormPersona from './NewFormPersona'
import Errors from '../Message/Errors'

const Personas = () => {
	const [personas, setPersonas] = useState([])
	const [error, setError] = useState([])
	const [mostrarFormEdit, setmostrarFormEdit] = useState(false)
	const [mostrarFormNew, setmostrarFormNew] = useState(false)
	const [personaEditar, setPersonaEditar] = useState([])
	const history = useHistory()

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
			.then((res) => setPersonaEditar(res.data.respuesta))
			.catch((e) => {
				return setError([e.response.data])
			})
		setmostrarFormEdit(true)
	}

	useEffect(() => {
		handleEdit()
	}, [])

	const handleDelete = async (id) => {
		await axios
			.delete(`http://localhost:3001/api/personas/${id}`)
			.then((res) => console.log(res), history.go(0))
			.catch((e) => setError(e.response.data)) //De esta forma accedemos al codigo de error del backend que pusimos
	}

	return (
		<div>
			<h2>Listado de Personas</h2>
			<button onClick={() => setmostrarFormNew(true)}>Agregar Persona</button>
			{error.length > 0 && <Errors msgError={error} />}
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

			{mostrarFormEdit && <EditFormPersona personaEditar={personaEditar} />}
			{mostrarFormNew && <NewFormPersona />}
		</div>
	)
}

export default Personas
