import React from 'react'
import Person from '../../assets/man.png'
import Books from '../../assets/book.svg'
import Generos from '../../assets/magic-book.svg'
import { Link } from 'react-router-dom'
import './style.css'

export const Home = () => {
  return (
    <>
			<section className='slider'>
				<div className='hero-img' />
			</section>
			<section className='info'>
        <Link to= "/personas">
				<div className='info-item'>
					<img src={Person} alt='personas-icon' height='70px' />
					<p>Personas</p>
				</div>
        </Link>
        <Link to= "/libros">
        <div className='info-item'>
					<img src={Books} alt='personas-icon' height='70px' />
					<p>Libros</p>
				</div>
        </Link>
        <Link to= "/generos">
        <div className='info-item'>
					<img src={Generos} alt='personas-icon' height='70px' />
					<p>Géneros</p>
				</div>
        </Link>
			</section>
		</>
  )
}