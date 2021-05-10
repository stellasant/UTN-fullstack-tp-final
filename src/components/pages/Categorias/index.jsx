import React, { useState } from 'react'
import { Titulo } from '../../common/Titulo'
import { Section } from '../../common/Section'
import { ActionsSection, AddButton } from '../../common/ActionsSection'
import { NewFormCategoria } from './components/NewFormCategoria'
import { ListadoCategorias } from './components/ListadoCategorias'
import { GridCards } from '../../common/Card'

export const Categorias = () => {
	const [isOpenForm, setIsOpenForm] = useState(false)
	return (
		<>
			<Titulo nombre='Categorias' />
			<Section>
				<ActionsSection>
					<AddButton onClick={() => setIsOpenForm(true)}>
						+ Agregar Categoria
					</AddButton>
				</ActionsSection>
				{isOpenForm && (
					<NewFormCategoria onClose={() => setIsOpenForm(false)} />
				)}
				<GridCards>
					<ListadoCategorias />
				</GridCards>
			</Section>
		</>
	)
}
