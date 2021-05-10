import React from 'react'
import './App.scss'
import { Header } from './components/common/Header'
import { Home } from './components/pages/Home'
import { Personas } from './components/pages/Personas'
import { Libros } from './components/pages/Libros'
import { Categorias } from './components/pages/Categorias'
import { Switch, Route } from 'react-router-dom'

function App() {
	let menuLinks = [
		{
			item: 'Home',
			path: '/',
			component: Home,
		},
		{
			item: 'Personas',
			path: '/personas',
			component: Personas,
		},
		{
			item: 'Libros',
			path: '/libros',
			component: Libros,
		},
		{
			item: 'Categorias',
			path: '/categorias',
			component: Categorias,
		},
	]
	return (
		<div className='App'>
			<div className='container'>
				<Header items={menuLinks} />

				<main className='main'>
					<Switch>
						{menuLinks.map((link, index) => (
							<Route
								key={index}
								path={link.path}
								component={link.component}
								exact
							/>
						))}
					</Switch>
				</main>
			</div>
			<footer>My Books - 2021</footer>
		</div>
	)
}

export default App
