import React from 'react'
import Personas from '../../assets/personas-red.svg'
import Libros from '../../assets/libros.svg'
import Categorias from '../../assets/categorias.svg'
import { Link } from 'react-router-dom'
import './style.css'

export const Home = () => {
	return (
		<>
			<section className='slider'>
				<div className='hero-img' />
			</section>
			<section className='info'>
				<Link to='/personas'>
					<div className='info-item'>
						<img src={Personas} alt='personas-icon' height='70px' />
						<p>Personas</p>
					</div>
				</Link>
				<Link to='/libros'>
					<div className='info-item'>
						<img src={Libros} alt='personas-icon' height='70px' />
						<p>Libros</p>
					</div>
				</Link>
				<Link to='/generos'>
					<div className='info-item'>
						<img src={Categorias} alt='personas-icon' height='70px' />
						<p>Categorías</p>
					</div>
				</Link>
			</section>
		</>
	)
}
