import React, { useState } from 'react'
import { Titulo } from '../../common/Titulo'
import { Section } from '../../common/Section'
import { ActionsSection, AddButton } from '../../common/ActionsSection'
import { NewFormPersona } from './components/NewFormPersona'
import { ListadoPersonas } from './components/ListadoPersonas'

export const Personas = () => {
	const [showNewForm, setShowNewForm] = useState(false)
	return (
		<>
			<Titulo nombre='Personas' />
			<Section>
				<ActionsSection>
					<h2>Listado de Personas en Biblioteca</h2>
					<AddButton onClick={() => setShowNewForm(true)}>
						+ Agregar Persona
					</AddButton>
				</ActionsSection>
			</Section>
			{showNewForm && (
				<Section className='section-form'>
					<NewFormPersona onClose={() => setShowNewForm(false)} />
				</Section>
			)}
			<Section>
				<ListadoPersonas />
			</Section>
		</>
	)
}
