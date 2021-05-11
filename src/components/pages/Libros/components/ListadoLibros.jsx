import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'
import { GridCards, Card } from '../../../common/Card'
import { Section } from '../../../common/Section'
import Libros from '../../../assets/libros.svg'
import { EditFormLibro } from './EditFormLibro'

export const ListadoLibros = () => {
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

	const [categorias, setCategorias] = useState([
		{
			nombre: '',
		},
	])
	const params = useParams()

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
			.then((res) => {
				Swal.fire('Devuelto!', `${res.data}`, 'success')
			})
			.catch((e) => {
				Swal.fire('Ups! No se pudo Devolver', `${e.response.data}`, 'warning')
			})
	}

	const handlePrestar = async (id) => {
		try {
			const libro = await axios.get(`http://localhost:3001/api/libros/${id}`)
			setLibroPrestar(libro.data.respuesta)
			const personas = await axios.get('http://localhost:3001/api/personas')
			setPersonaPrestar(personas.data.respuesta)
			setSelectPersona(true)
		} catch (e) {
			console.log(e.response.data)
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
			.then((res) => {
				Swal.fire('Prestado!', `${res.data}`, 'success')
			})
			.catch((e) => {
				Swal.fire('Ups! No se pudo Prestar', `${e.response.data}`, 'warning')
			})
	}

	const handleDelete = async (id) => {
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
			await axios.delete(`http://localhost:3001/api/libros/${id}`)
			Swal.fire('Eliminado!', 'El Libro fue eliminado correctamente', 'success')
		} catch (e) {
			Swal.fire('Ups! No se pudo Eliminar', `${e.response.data}`, 'warning')
		}
	}

	const handleEdit = async (id) => {
		await axios
			.get(`http://localhost:3001/api/libros/${id}`)
			.then((res) => setLibroEditar(res.data.respuesta), setShowEditForm(true))
			.catch((e) => console.log(e))
	}

	useEffect(() => {
		if (!params.id) return
		handleEdit(params.id)
	}, [params])

	return (
		<div>
			{selectPersona && (
				<>
					<h4>Prestar a:</h4>

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

			<>
				{showEditForm && (
					<Section className='section-form'>
						<EditFormLibro
							libroEditar={libroEditar}
							onClose={() => setShowEditForm(false)}
						/>
					</Section>
				)}
				<GridCards>
					{libros &&
						libros.map((libro) => (
							<Card.Wrapper key={libro.id}>
								<Card.Header>
									<Card.Image src={Libros} alt='personas-icon' />
									<div>
										<Card.Value>{libro.nombre}</Card.Value>
										<Card.Label>ID {libro.id}</Card.Label>
									</div>
								</Card.Header>
								<Card.Body>
									<Card.Item>
										<Card.Label>Descripción</Card.Label>
										<Card.Value>{libro.descripcion}</Card.Value>
									</Card.Item>
									<Card.Item>
										<Card.Label>Categoría</Card.Label>
										<Card.Value>{libro.categoria.nombre}</Card.Value>
									</Card.Item>
									<Card.Item>
										<Card.Label>Prestado?</Card.Label>
										<Card.Value>
											{libro.persona
												? libro.persona.nombre + libro.persona.apellido
												: 'No'}
										</Card.Value>
									</Card.Item>
									{selectPersona && (
										<Card.Item>
											<Card.Label>Prestar a?</Card.Label>

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
											<Card.Action onClick={handleSubmitPrestar}>
												Prestar Libro
											</Card.Action>
										</Card.Item>
									)}
								</Card.Body>
								<Card.Footer>
									<Card.Action
										onClick={() => handlePrestar(libro.id)}
										disabled={libro.persona}
									>
										Prestar
									</Card.Action>
									<Card.Action
										onClick={() => handleDevolver(libro.id)}
										disabled={!libro.persona}
									>
										Devolver
									</Card.Action>
									<Card.Action onClick={() => handleEdit(libro.id)}>
										Editar
									</Card.Action>
									<Card.Action onClick={() => handleDelete(libro.id)}>
										Eliminar
									</Card.Action>
								</Card.Footer>
							</Card.Wrapper>
						))}
				</GridCards>
			</>
		</div>
	)
}
