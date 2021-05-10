import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import NewFormLibro from './NewFormLibro'
import EditFormLibro from './EditFormLibro'
import Errors from '../Message/Errors'
import Success from '../Message/Success'

export const Libros = () => {
	const [libros, setLibros] = useState([])

	const [personaPrestar, setPersonaPrestar] = useState([])
	const [libroPrestar, setLibroPrestar] = useState([])
	const [selectPersona, setSelectPersona] = useState(false)
	const [personaAPrestar, setPersonaAPrestar] = useState({})

	const [showNewForm, setShowNewForm] = useState(false)
	const [showEditForm, setShowEditForm] = useState(false)
	const [libroEditar, setLibroEditar] = useState([
		{
			descripcion: '',
		},
	])

	const [categorias, setCategorias] = useState([])

	const history = useHistory()
	const params = useParams()
	const [errorPrestar, setErrorPrestar] = useState('')
	const [errors, setErrors] = useState('')
	const [success, setSuccess] = useState('')

	const TraerLibros = async () => {
		try {
			const traerPersonas = await axios.get(
				'http://localhost:3001/api/personas'
			)
			const traerLibros = await axios.get('http://localhost:3001/api/libros')
			const traerCategorias = await axios.get(
				'http://localhost:3001/api/categorias'
			)
			setCategorias(traerCategorias.data.respuesta)

			const newListado = traerLibros.data.respuesta.map((libro) => {
				const personaAsociada = traerPersonas.data.respuesta.find(
					(persona) => persona.id === libro.id_persona
				)
				libro.persona = personaAsociada
				return libro
			})

			const newListadoAll = newListado.map((libro) => {
				const categoriaAsociada = traerCategorias.data.respuesta.find(
					(categoria) => categoria.id === libro.id_genero
				)
				libro.categoria = categoriaAsociada
				return libro
			})

			setLibros(newListadoAll)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		TraerLibros()
	}, [])

	const handleDevolver = async (id) => {
		await axios
			.put(`http://localhost:3001/api/libros/devolver/${id}`)
			.then((res) => setSuccess(res.data))
			.catch((e) => setErrors(e.response.data))
	}

	const handlePrestar = async (id) => {
		try {
			const libro = await axios.get(`http://localhost:3001/api/libros/${id}`)
			setLibroPrestar(libro.data.respuesta)
			const personas = await axios.get('http://localhost:3001/api/personas')
			setPersonaPrestar(personas.data.respuesta)
			setSelectPersona(true)
		} catch (e) {
			setErrorPrestar(e.response.data)
		}
	}

	const handleChangePrestar = (e) => {
		setPersonaAPrestar({ id_persona: e.target.value })
	}

	const handleSubmitPrestar = async () => {
		await axios
			.put(
				`http://localhost:3001/api/libros/prestar/${libroPrestar[0].id}`,
				personaAPrestar
			)
			.then((res) => setSuccess(res.data))
			.catch((e) => setErrorPrestar(e.response.data))
	}

	const handleDelete = async (id) => {
		await axios
			.delete(`http://localhost:3001/api/libros/${id}`)
			.then((res) => console.log('handleDelete:', res), history.go(0))
			.catch((e) => console.log(e))
	}

	const handleEdit = async (id) => {
		await axios
			.get(`http://localhost:3001/api/libros/${id}`)
			.then(
				(res) => setLibroEditar(res.data.respuesta),
				(res) => console.log('setLibroEditar:', res.data.respuesta),
				setShowEditForm(true)
			)
			.catch((e) => {
				return setErrors(e.response.data)
			})
	}

	useEffect(() => {
		if (!params.id) return
		handleEdit(params.id)
	}, [params])

	return (
		<div>
			<h1>Libros:</h1>
			<button onClick={() => setShowNewForm(true)}>Agregar un Libro</button>
			{errors && <Errors msgError={errors} />}
			{success && <Success msgSuccess={success} />}
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Descripcion</th>
						<th>Genero</th>
						<th>Prestado?</th>
						<th>Acciones</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{libros &&
						libros.map((libro) => (
							<tr key={libro.id}>
								<td>{libro.nombre}</td>
								<td>{libro.descripcion}</td>
								<td>{libro.categoria.nombre}</td>
								{libro.persona ? (
									<td>
										{libro.persona.nombre} {libro.persona.apellido}
									</td>
								) : (
									<td>No</td>
								)}
								<td>
									<button onClick={() => handleDevolver(libro.id)}>
										Devolver
									</button>
									<button onClick={() => handlePrestar(libro.id)}>
										Prestar
									</button>
									<button onClick={() => handleDelete(libro.id)}>
										Eliminar
									</button>
									<button onClick={() => handleEdit(libro.id)}>Editar</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{selectPersona && (
				<>
					<h4>Prestar a:</h4>
					{errorPrestar && <Errors msgError={errorPrestar} />}
					<select onChange={handleChangePrestar}>
						<option selected disabled>
							--Selecciona--
						</option>
						{personaPrestar.map((persona) => (
							<option key={persona.id} value={persona.id}>
								{persona.nombre}
							</option>
						))}
					</select>
					<button onClick={handleSubmitPrestar}>Prestar Libro</button>
				</>
			)}
			{showNewForm && <NewFormLibro categorias={categorias} />}
			{showEditForm && <EditFormLibro libroEditar={libroEditar} />}
		</div>
	)
}
