import React from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

export const Header = (props) => {
	return (
		<header className='header'>
			<div class='wrapper'>
				<span class='logo-text'>
					<NavLink to='/'>My books</NavLink>
				</span>
				<nav>
					<ul className='menu'>
						{props.items.map(link => (
							<li>
								<NavLink to={link.path} activeClassName='selected'>
									{link.item}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	)
}