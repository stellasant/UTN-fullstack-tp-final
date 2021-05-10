import React, { useState } from 'react'
import { Titulo } from '../../common/Titulo'
import { Section } from '../../common/Section'
import { ActionsSection, AddButton } from '../../common/ActionsSection'
import { NewFormCategoria } from './components/NewFormCategoria'
import { ListadoCategorias } from './components/ListadoCategorias'

export const Categorias = () => {
	const [showNewForm, setShowNewForm] = useState(false)
	return (
		<>
			<Titulo nombre='Personas' />
			<Section>
				<ActionsSection>
					<h2>Listado de Categorías en Biblioteca</h2>
					<AddButton onClick={() => setShowNewForm(true)}>
						Agregar Categoría
					</AddButton>
				</ActionsSection>
			</Section>
			{showNewForm && (
				<Section className='section-form'>
					<NewFormCategoria onClose={() => setShowNewForm(false)} />
				</Section>
			)}
			<Section>
				<ListadoCategorias />
			</Section>
		</>
	)
}
