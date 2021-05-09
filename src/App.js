import './App.css'
import { Switch, Route, Link } from 'react-router-dom'
import Personas from './components/Personas/Personas'
import Libros from './components/Libros/Libros'
import GetCategorias from './components/Categorias/GetCategorias'

function App() {
	return (
		<div className='App'>
			<div style={{ position: 'relative' }}>
				<div
					style={{
						display: 'flex',
						gap: '20px',
						justifyContent: 'center',
						padding: '1rem',
						position: 'sticky',
						top: '0px',
					}}
				>
					<Link to='/personas'>Personas</Link>
					<Link to='/libros'>Libros</Link>
					<Link to='/categorias'>Categorias</Link>
				</div>
			</div>
			<Switch>
				<Route path='/personas' component={Personas} />
				<Route path='/libros' component={Libros} />
				<Route path='/categorias' component={GetCategorias} />
			</Switch>
		</div>
	)
}

export default App
