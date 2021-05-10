import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import NewFormCategoria from './NewFormCategoria'

const Categorias = () => {
	/*
	 * TODO Categorias:
	 * - Alta => Agregar nueva Categoria
	 * - Baja => Borrar Categoria
	 */

	const [categorias, setCategorias] = useState([])
	const [error, setError] = useState([])
	const [errorDelete, setErrorDelete] = useState([])

	const [showNewForm, setShowNewForm] = useState(false)

	const history = useHistory()

	const traerCategorias = async () => {
		await axios
			.get('http://localhost:3001/api/categorias')
			.then(
				(res) => setCategorias(res.data.respuesta),
				(res) => console.log('setCategorias:', res.data.respuesta)
			)
			.catch((e) => setError(e.response.data))
	}

	useEffect(() => {
		traerCategorias()
	}, [])

	const handleDelete = async (id) => {
		await axios
			.delete(`http://localhost:3001/api/categorias/${id}`)
			.then((res) => console.log('handleDelete:', res), history.go(0))
			.catch((e) => setErrorDelete([e.response.data.Error]))
	}

	return (
		<div>
			<h1>Categorias:</h1>
			<button onClick={() => setShowNewForm(true)}>Agrega una categoria</button>
			{errorDelete &&
				errorDelete.map((err) => (
					<div key={1}>
						<p>{err}</p>
					</div>
				))}
			{categorias &&
				categorias.map((categoria) => (
					<div key={categoria.id} className='categoria'>
						<h3>
							{categoria.nombre}
							<button onClick={() => handleDelete(categoria.id)}>
								Eliminar
							</button>
						</h3>
					</div>
				))}

			{showNewForm && <NewFormCategoria />}
		</div>
	)
}

export default Categorias
