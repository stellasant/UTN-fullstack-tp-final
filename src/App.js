import './App.css'
import { Switch, Route, Link } from 'react-router-dom'
import Personas from './components/Personas/Personas'
import NewFormPersona from './components/Personas/NewFormPersona'
import EditFormPersona from './components/Personas/EditFormPersona'
import Libros from './components/Libros/Libros'
import GetCategorias from './components/Categorias/GetCategorias'
import AddFormCategoria from './components/Categorias/AddFormCategoria'

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
					<Link to='/add-persona'>Add Persona</Link>
					<Link to='/edit-persona'>Edit Persona</Link>
					<Link to='/libros'>Libros</Link>
					<Link to='/categorias'>Categorias</Link>
					<Link to='/personas'>Personas</Link>
					<Link to='/add-categoria'>Add Categoria</Link>
				</div>
			</div>
			<Switch>
				<Route path='/personas' component={Personas} />
				<Route path='/add-persona' component={NewFormPersona} />
				<Route path='/edit-persona' component={EditFormPersona} />
				<Route path='/libros' component={Libros} />
				<Route path='/categorias' component={GetCategorias} />
				<Route path='/add-categoria' component={AddFormCategoria} />
			</Switch>
		</div>
	)
}

export default App
