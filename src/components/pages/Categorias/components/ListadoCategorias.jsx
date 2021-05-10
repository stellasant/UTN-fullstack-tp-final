import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { NewFormCategoria } from './NewFormCategoria'
import { GridCards, Card } from '../../../common/Card'
import Categorias from '../../../assets/categorias.svg'

export const ListadoCategorias = () => {
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

	return (
		<div>
			<h1>Categorias:</h1>
			<button onClick={() => setShowNewForm(true)}>Agrega una categoria</button>
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
							</Card.Body>
							<Card.Footer>
								<Card.Action onClick={() => handleDelete(categoria.id)}>
									Eliminar
								</Card.Action>
							</Card.Footer>
						</Card.Wrapper>
					))}
			</GridCards>
		</div>
	)
}
