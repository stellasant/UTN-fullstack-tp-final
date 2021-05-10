import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import AddFormCategoria from './AddFormCategoria'

export default function GetCategorias() {
	const [listado, setListado] = useState([])
	const [error, setError] = useState([])
	const [errordelete, setErrorDelete] = useState([])

	const [formAgregar, setFormAgregar] = useState(false)

	const history = useHistory()

	async function traerlistado() {
		try {
			const respuesta = await axios.get('http://localhost:3001/api/categorias')
			setListado(respuesta.data.respuesta)
		} catch (e) {
			setError('No pude fetchear')
		}
	}
	useEffect(() => {
		traerlistado()
	}, [])

	const handleDelete = async (id) => {
		await axios
			.delete(`http://localhost:3001/api/categorias/${id}`)
			.then((res) => console.log(res), history.go(0))
			.catch((e) => setErrorDelete([e.response.data.Error]))
	}

	return (
		<div>
			<h1>Categorias:</h1>
			<button onClick={() => setFormAgregar(true)}>Agrega una categoria</button>
			{errordelete &&
				errordelete.map((err) => (
					<div key={1}>
						<p>{err}</p>
					</div>
				))}
			{listado &&
				listado.map((unaCategoria) => (
					<div key={unaCategoria.id} className='categoria'>
						<h3>
							{unaCategoria.nombre}
							<button onClick={() => handleDelete(unaCategoria.id)}>
								Eliminar
							</button>
						</h3>
					</div>
				))}

			{formAgregar && <AddFormCategoria />}
		</div>
	)
}
