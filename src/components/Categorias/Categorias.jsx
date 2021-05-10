import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NewFormCategoria from './NewFormCategoria'
import Success from '../Message/Success'

const Categorias = () => {
	/*
	 * TODO Categorias:
	 * - Alta => Agregar nueva Categoria
	 * - Baja => Borrar Categoria
	 */

	const [success, setSuccess] = useState('')

	const [categorias, setCategorias] = useState([])
	const [showNewForm, setShowNewForm] = useState(false)

	const traerCategorias = async () => {
		await axios
			.get('http://localhost:3001/api/categorias')
			.then((res) => setCategorias(res.data.respuesta))
			.catch((e) => console.log(e))
	}

	useEffect(() => {
		traerCategorias()
	}, [])

	const handleDelete = async (id) => {
		await axios
			.delete(`http://localhost:3001/api/categorias/${id}`)
			.then((res) => setSuccess(res.data))
			.catch((e) => console.log(e))
	}

	return (
		<div>
			<h1>Categorias:</h1>
			<button onClick={() => setShowNewForm(true)}>Agrega una categoria</button>
			{success && <Success msgSuccess={success} />}
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
