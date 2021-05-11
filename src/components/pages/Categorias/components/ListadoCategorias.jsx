import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { GridCards, Card } from '../../../common/Card'
import Categorias from '../../../assets/categorias.svg'

export const ListadoCategorias = () => {
	const [categorias, setCategorias] = useState([])
	const [librosAsociados, setLibrosAsociados] = useState([])

	const traerCategorias = async () => {
		await axios
			.get('http://localhost:3001/api/categorias')
			.then((res) => setCategorias(res.data.respuesta))
			.catch((e) => console.log(e))
	}

	useEffect(() => {
		traerCategorias()
	}, [])

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
			await axios.delete(`http://localhost:3001/api/categorias/${id}`)
			Swal.fire(
				'Eliminado!',
				'La Categoría fue eliminada correctamente',
				'success'
			)
		} catch (e) {
			Swal.fire('Ups! No se pudo Eliminar', `${e.response.data}`, 'warning')
		}
	}

	const TraerLibrosAsociados = async () => {
		try {
			const traerCategorias = await axios.get(
				'http://localhost:3001/api/categorias'
			)
			const traerLibros = await axios.get('http://localhost:3001/api/libros')

			const newListado = traerCategorias.data.respuesta.map((categoria) => {
				const libroAsociado = traerLibros.data.respuesta.filter(
					(libro) => libro.id_genero === categoria.id
				)
				categoria.libro = libroAsociado
				console.log(categoria)
				return categoria
			})

			setLibrosAsociados(newListado)
			console.log(newListado)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		TraerLibrosAsociados()
	}, [])

	return (
		<GridCards>
			{categorias &&
				categorias.map((categoria) => (
					<Card.Wrapper key={categoria.id}>
						<Card.Header>
							<Card.Image src={Categorias} alt='categorias-icon' />
							<div>
								<Card.Value>{categoria.nombre}</Card.Value>
								<Card.Label>ID {categoria.id}</Card.Label>
							</div>
						</Card.Header>
						<Card.Body>
							<Card.Item>Libros Asociados</Card.Item>
							{librosAsociados &&
								librosAsociados.map((item) => (
									<div key={item.id}>
										<h1>{item.nombre}</h1>
										{item.libro.map((libro) => (
											<p key={libro.id}>{libro.nombre}</p>
										))}
									</div>
								))}
						</Card.Body>
						<Card.Footer>
							<Card.Action onClick={() => handleDelete(categoria.id)}>
								Eliminar
							</Card.Action>
						</Card.Footer>
					</Card.Wrapper>
				))}
		</GridCards>
	)
}
