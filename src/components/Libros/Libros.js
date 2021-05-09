import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Libros = () => {

    
    const [listalibros, setListaLibros] = useState([]);
    
    const [personaprestar, setPersonaPrestar] = useState([]);
    const [libroprestar, setLibroPrestar] = useState([])
    const [selectpersona, setselectPersona] = useState(false);

    const [personaAPrestar, setpersonaAPrestar] = useState({});

    const [formlibro, setFormlibro] = useState(false);
    const [categorias, setCategorias] = useState([])
    const [newlibro, setNewlibro] = useState({
        "nombre": "",
        "descripcion": "",
        "id_genero": ""
    })



    
    
    const TraerLibros = async () => {
        try{
        const respuestaPersonas = await axios.get("http://localhost:3001/api/personas")
        const respuestaLibros = await axios.get("http://localhost:3001/api/libros")
        const respuestaCategoria = await axios.get("http://localhost:3001/api/categorias")
        setCategorias(respuestaCategoria.data.respuesta);

        const newListado = respuestaLibros.data.respuesta.map(unLibro => {
        const personaAsociada = respuestaPersonas.data.respuesta.find(unaPersona => unaPersona.id == unLibro.id_persona)
        unLibro.persona = personaAsociada
        return unLibro;
        })

        const newListadoAll = newListado.map(unLibro => {
        const categoriaAsociada = respuestaCategoria.data.respuesta.find(unaCategoria => unaCategoria.id == unLibro.id_genero)
        unLibro.categoria = categoriaAsociada;

        return unLibro;
        })
        setListaLibros(newListadoAll);
        }
        catch(e){
            console.log(e);
        }
    }

    
    useEffect(() => {
        TraerLibros();
    }, [])


    
    const handleDevolver = async (id) => {
        try{
            await axios.put(`http://localhost:3001/api/libros/devolver/${id}`)
        }
        catch(e) {
            console.log(e);
        }
    };


    
    const handlePrestar = async (id) => {
        try{
            const libro = await axios.get(`http://localhost:3001/api/libros/${id}`)
            setLibroPrestar(libro.data.respuesta);
            const persona = await axios.get("http://localhost:3001/api/personas")
            setPersonaPrestar(persona.data.respuesta);
            setselectPersona(true);
        }
        catch(e){
            console.log(e)
        }
    };


    const handleChangePrestar = (e) =>{
        setpersonaAPrestar({"id_persona": e.target.value})
    };


    const handleSubmitPrestar = () => {
    const respuesta = axios.put(`http://localhost:3001/api/libros/prestar/${libroprestar[0].id}`, personaAPrestar)
    .then(res => console.log(res))
    .catch(e => console.log(e))
    };



    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:3001/api/libros/${id}`)
        }
        catch(e){
            console.log(e)
        }
    };



    const handleChangeNew = (e) => {
        setNewlibro({
            ...newlibro,
            [e.target.name]: e.target.value
        });
    }

    
    const handleSubmitNew = async () => {
        const respuesta = await axios.post("http://localhost:3001/api/libros", newlibro)
        .then(res => console.log(res))
        .catch(e => console.log(e))
        
    }


    return (
        <div>
            <h1 >Libros:</h1>
            <button onClick={() => setFormlibro(true)}>Agregar un Libro</button>
            {formlibro && 
            <form onSubmit={handleSubmitNew}>
                <label>Nombre</label>
                <input 
                type="text"
                name="nombre"
                placeholder="Ingresa el nombre"
                value={newlibro.nombre}
                onChange={handleChangeNew}
                />
                <label>Descripcion</label>
                <textarea 
                name="descripcion"
                value={newlibro.descripcion}
                onChange={handleChangeNew}
                >
                </textarea>
                    <select 
                    name="id_genero"
                    onChange={handleChangeNew}
                    >
                        {categorias.map(unaCategoria => (
                        <option key={unaCategoria.id} value={unaCategoria.id}>{unaCategoria.nombre}</option>
                        ))}
                    </select>
                <button type="submit">Agregar Libro</button>
            </form>
            }
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Genero</th>
                        <th>Prestado?</th>
                        <th>Acciones</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listalibros && listalibros.map(unLibro =>(
                        <tr key={unLibro.id}>
                            <td>{unLibro.nombre}</td>
                            <td>{unLibro.descripcion}</td>
                            <td>{unLibro.categoria.nombre}</td> 
                            {unLibro.persona ? <td>{unLibro.persona.nombre} {unLibro.persona.apellido}</td> : <td>No</td>}
                            <td>
                            <button onClick={() => handleDevolver(unLibro.id)}>Devolver</button>
                            <button onClick={() => handlePrestar(unLibro.id)}>Prestar</button>
                            <button onClick={() => handleDelete(unLibro.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectpersona && 
            <form>
                <h4>Prestar a:</h4>
                <select onChange={handleChangePrestar}>
                    {personaprestar.map(unaPersona => (
                        <option key={unaPersona.id} value={unaPersona.id}>{unaPersona.nombre}</option>
                    ))}
                </select>
                <button onClick={handleSubmitPrestar}>Prestar Libro</button>
            </form>
            }
        </div>
    )
}

export default Libros
