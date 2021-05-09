const express = require('express')
const mysql = require('mysql')
const util = require('util')
const cors = require('cors')

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

//Conexión a la BD
const conexion = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'biblioteca-db',
})

conexion.connect((error) => {
	if (error) {
		throw error
	}
	console.log('Conexión establecida con la base de datos')
})

const qy = util.promisify(conexion.query).bind(conexion)

//Desarrollo del programa

//Categoria

//GET /categorias para devolver todas las categorias
app.get('/api/categorias', async (req, res) => {
	try {
		const query = 'SELECT * FROM genero'
		const respuesta = await qy(query)
		res.send({ respuesta: respuesta })
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//GET /categorias/:id para devolver una sola categoria
app.get('/api/categorias/:id', async (req, res) => {
	try {
		const query = 'SELECT * FROM genero WHERE id = ?'
		const respuesta = await qy(query, [req.params.id])
		console.log(respuesta)
		res.send({ respuesta: respuesta })
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//POST /categorias para guardar una categoria nueva
app.post('/api/categorias', async (req, res) => {
	try {
		if (!req.body.nombre) {
			throw new Error('Faltan datos')
		}
		const nombre = req.body.nombre.toUpperCase()

		let query = 'SELECT id FROM genero WHERE nombre = ?'
		let respuesta = await qy(query, [nombre])

		if (respuesta.length > 0) {
			throw new Error('Ese genero ya existe')
		}

		query = 'INSERT INTO genero (nombre) VALUE (?)'
		respuesta = await qy(query, [nombre])

		res.send({ respuesta: respuesta.insertId })
		console.log(`Se inserto correctamente la categoria ${req.body.nombre}`)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//PUT /categoria/:id para modificar una categoria
app.put('/api/categorias/:id', async (req, res) => {
	try {
		if (!req.body.nombre) {
			throw new Error('Complete todos los campos para modificar a una categoría') //Sino, error
		}
		const nombre = req.body.nombre.toUpperCase()

		let query = 'SELECT * FROM genero WHERE nombre =? AND id <> ?'
		let respuesta = await qy(query, [nombre, req.params.id])
		if (respuesta.length > 0) {
			throw new Error('El genero ya existe')
		}

		query = 'UPDATE genero SET nombre = ? WHERE id = ?'
		respuesta = await qy(query, [nombre, req.params.id])
		res.send({ respuesta: respuesta.affectedRows })

		console.log(
			`Se modificaron los datos correctamente: Nombre:${req.body.nombre}`
		)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//DELETE /categoria/:id para borrar una categoria existente
app.delete('/api/categorias/:id', async (req, res) => {
	try {
		let query = 'SELECT * FROM libros WHERE id_genero = ?'
		let respuesta = await qy(query, [req.params.id])
		if (respuesta.length > 0) {
			//Si hay libros asociados a ese genero, no se pueden borrar.
			throw new Error('Este género tiene libros asociados, no se puede borrar.')
		}
		query = 'DELETE FROM genero WHERE id = ?'
		respuesta = await qy(query, [req.params.id])
		res.send({ respuesta: respuesta.affectedRows })
		console.log(`Se eliminó correctamente el género con id ${req.params.id}`)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//Personas

// GET /personas para devolver todas las personas
app.get('/api/personas', async (req, res) => {
	try {
		const query = 'SELECT * FROM persona'
		const respuesta = await qy(query)
		res.send({ respuesta: respuesta })
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

// GET /personas/:id para devolver una sola persona
app.get('/api/personas/:id', async (req, res) => {
	try {
		const query = 'SELECT nombre,apellido,mail,alias FROM persona WHERE id = ?'
		const respuesta = await qy(query, [req.params.id])
		console.log(respuesta)
		res.send({ respuesta: respuesta })
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

// POST /personas para guardar una persona nueva
app.post('/api/personas', async (req, res) => {
	try {
		if (
			!req.body.nombre ||
			!req.body.apellido ||
			!req.body.mail ||
			!req.body.alias
		) {
			throw new Error(
				'Todos los datos son obligatorios para registrar a una persona'
			)
		}
		let query = 'SELECT * FROM persona WHERE mail = ? AND alias = ?'
		let respuesta = await qy(query, [req.body.mail, req.body.alias])

		if (respuesta.length > 0) {
			throw new Error(
				'Ya se encuentra registrado con el mismo email o alias otro usuario, por favor verificar los datos.'
			)
		}

		const nombre = req.body.nombre.toUpperCase()
		const apellido = req.body.apellido.toUpperCase()
		const mail = req.body.mail.toUpperCase()
		const alias = req.body.alias.toUpperCase()

		query = 'INSERT INTO persona (nombre, apellido, mail, alias) VALUE (?,?,?,?)'
		respuesta = await qy(query, [nombre, apellido, mail, alias])
		res.send({ respuesta: respuesta })
		console.log(
			`Se registro correctamente al cliente ${req.body.nombre} ${req.body.apellido}`
		)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

// PUT /personas/:id' para modificar una persona existente
app.put('/api/personas/:id', async (req, res) => {
	try {
		if (!req.body.nombre && !req.body.apellido && !req.body.alias) {
			throw new Error('Complete todos los campos para modificar a una persona') //Sino, error
		}
		const nombre = req.body.nombre.toUpperCase()
		const apellido = req.body.apellido.toUpperCase()
		const alias = req.body.alias.toUpperCase()

		let query = 'SELECT * FROM persona WHERE nombre =? AND id <> ?'
		let respuesta = await qy(query, [nombre, req.params.id])
		if (respuesta.length > 0) {
			throw new Error('La persona ya existe')
		}
		if (req.body.mail) {
			throw new Error('El email no se puede modificar.')
		} //No se puede modificar el mail pero los demás datos se actualizan
		query = 'UPDATE persona SET nombre = ?, apellido = ?, alias = ? WHERE id = ?'
		respuesta = await qy(query, [nombre, apellido, alias, req.params.id])
		res.send({ respuesta: respuesta.affectedRows })

		console.log(
			`Se modificaron los datos correctamente: Nombre:${req.body.nombre} Apellido:${req.body.apellido} Alias:${req.body.alias}`
		)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

// DELETE /personas/:id para borrar una persona existente
app.delete('/api/personas/:id', async (req, res) => {
	try {
		let query = 'SELECT * from libros WHERE id_persona = ?'
		let respuesta = await qy(query, [req.params.id])

		if (respuesta.length > 0) {
			throw new Error(
				'No se puede eliminar la persona dado que posee libros prestados.'
			)
		}
		query = 'DELETE FROM persona WHERE id = ?'
		respuesta = await qy(query, [req.params.id])
		console.log(`La persona se elimino correctamente`)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//Libros

//GET /libros para devolver todos los libros
app.get('/api/libros', async (req, res) => {
	try {
		const query = 'SELECT * FROM libros'
		const respuesta = await qy(query)
		res.send({ respuesta: respuesta })
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//POST /libros para guardar un libro nuevo
app.post('/api/libros', async (req, res) => {
	try {
		if (!req.body.nombre || !req.body.id_genero) {
			throw new Error('Nombre y genero son campos obligatorios')
		}
		let query = 'SELECT * FROM libros WHERE nombre = ?'
		let respuesta = await qy(query, [req.body.nombre])

		if (respuesta.length > 0) {
			throw new Error('Ya existe un libro con ese nombre')
		}

		if (req.body.id_persona) {
			const quer = 'SELECT nombre,apellido,mail,alias FROM persona WHERE id = ?'
			const respuest = await qy(quer, [req.body.id_persona])
			if (respuest.length < 1) {
				throw new Error(
					'La persona no existe no podemos prestarle el libro deje el campo nulo para acomodarlo en el inventario o ingrese la persona correcta'
				)
			}
		}

		const categoria = 'SELECT * FROM genero WHERE id = ?'
		const respuestaCategoria = await qy(categoria, [req.body.id_genero])

		const nombre = req.body.nombre.toUpperCase()
		const descripcion = req.body.descripcion.toUpperCase()
		const id_genero = req.body.id_genero.toUpperCase()
		const id_persona = req.body.id_persona.toUpperCase()

		if (respuestaCategoria.length < 1) {
			throw new Error('Genero inexistente')
		}

		query =
			'INSERT INTO libros (nombre, descripcion, id_genero, id_persona) VALUE (?,?,?,?)'
		respuesta = await qy(query, [nombre, descripcion, id_genero, id_persona])
		res.send({ respuesta: respuesta })
		console.log(`Se registro correctamente el libro ${req.body.nombre}`)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//GET /libros/:id para devolver un solo libro
app.get('/api/libros/:id', async (req, res) => {
	try {
		let query =
			'SELECT nombre, descripcion, id_genero, id_persona FROM libros WHERE id = ?'
		let respuesta = await qy(query, [req.params.id])

		if (respuesta.length === 0) {
			throw new Error('No existe un libro con ese id')
		}

		query =
			'SELECT id, nombre, descripcion, id_genero, id_persona FROM libros WHERE id = ?'
		respuesta = await qy(query, [req.params.id])
		console.log(respuesta)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//PUT /libros/:id' para modificar la descripción de un libro existente
app.put('/api/libros/:id', async (req, res) => {
	try {
		if (req.body.nombre || req.body.id_genero || req.body.id_persona) {
			throw new Error('Solo se puede modificar la descripcion del libro')
		}

		const descripcion = req.body.descripcion.toUpperCase()

		let query = 'UPDATE libros SET descripcion = ? WHERE id = ?'
		let respuesta = await qy(query, [descripcion, req.params.id])
		console.log(respuesta)

		console.log(`Se modificaron correctamente los datos del libro`)
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//PUT /libros/prestar/:id para prestar un libro
app.put('/api/libros/prestar/:id', async (req, res) => {
	try {
		if (!req.body.id_persona) {
			throw new Error(
				'Es obligatorio indicar el id de la persona para poder prestarle el libro.'
			)
		}

		const libro = 'SELECT * FROM libros WHERE id = ?'
		const respuestaLibro = await qy(libro, [req.params.id])
		if (respuestaLibro.length < 1) {
			throw new Error(
				'El libro que quieres prestar no esta dentro de nuestra biblioteca'
			)
		}

		const persona = 'SELECT * FROM persona WHERE id = ?'
		const respuestaPersona = await qy(persona, [req.params.id])
		if (respuestaPersona.length < 1) {
			throw new Error('La persona no existe no podemos prestarle el libro')
		}

		let query = 'SELECT * FROM libros WHERE id = ? AND id_persona IS NULL'
		let respuesta = await qy(query, [req.params.id, req.body.id_persona])

		if (respuesta.length > 0) {
			query = `UPDATE libros SET id_persona = ? WHERE id = ?`
			respuesta = await qy(query, [req.body.id_persona, req.params.id])
			console.log('Se presto el libro correctamente')
		} else {
			throw new Error(
				'El libro se encuentra prestado, debe aguardar su devolucion'
			)
		}
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//PUT /libros/devolver/:id para devolver un libro
app.put('/api/libros/devolver/:id', async (req, res) => {
	try {
		const libro = 'SELECT * FROM libros WHERE id = ?'
		const respuestaLibro = await qy(libro, [req.params.id])
		if (respuestaLibro.length < 1) {
			throw new Error('Ese libro no existe')
		}

		let query = 'SELECT * FROM libros WHERE id = ? AND id_persona IS NOT NULL'
		let respuesta = await qy(query, [req.params.id])

		if (respuesta.length > 0) {
			query = `UPDATE libros SET id_persona = null WHERE id = ?`
			respuesta = await qy(query, [req.params.id])
			console.log('Se devolvio el libro correctamente a la biblioteca')
		} else {
			throw new Error('El libro no se encuentra prestado en este momento.')
		}
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//DELETE /libros/:id para borrar libro existente
app.delete('/api/libros/:id', async (req, res) => {
	try {
		const libro = 'SELECT * FROM libros WHERE id = ?'
		const respuestaLibro = await qy(libro, [req.params.id])
		if (respuestaLibro.length < 1) {
			throw new Error('Ese libro no existe')
		}

		let query = 'SELECT * FROM libros WHERE id = ? AND id_persona IS NOT NULL'
		let respuesta = await qy(query, [req.params.id])

		console.log(respuesta.length)

		if (respuesta.length > 0) {
			throw new Error('El libro se encuentra prestado no podemos eliminarlo')
		} else {
			query = 'DELETE FROM libros WHERE id = ?'
			respuesta = await qy(query, [req.params.id])
			console.log(`El libro fue eliminado correctamente.`)
		}
	} catch (e) {
		console.error(e.message)
		res.status(413).send(e.message)
	}
})

//Servidor
app.listen(port, () => {
	console.log('La aplicación esta corriendo en el puerto:', port)
})
