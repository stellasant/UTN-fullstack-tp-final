import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const LibrosAsociados = () => {
	const [librosAsociados, setLibrosAsociados] = useState([])
	const TraerLibrosAsociados = async () => {
		try {
			const traerCategorias = await axios.get(
				'http://localhost:3001/api/categorias'
			)
			const traerLibros = await axios.get('http://localhost:3001/api/libros')

			const newListado = traerCategorias.data.respuesta.map((categoria) => {
				const libroAsociado = traerLibros.data.respuesta.find(
					(libro) => libro.id === categoria.id_libro
				)
				categoria.libro = libroAsociado
				return categoria
			})

			setLibrosAsociados(newListado)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		TraerLibrosAsociados()
	}, [])

	return (
		<>
			{librosAsociados &&
				librosAsociados.map((libro) => (
					<div key={libro.id}>
						<div>{libro.nombre}</div>
						<div>{libro.descripcion}</div>
					</div>
				))}
		</>
	)
}
