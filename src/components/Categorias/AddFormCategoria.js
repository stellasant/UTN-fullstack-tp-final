import React, { useState } from 'react';
import axios from 'axios';


const AddFormCategoria = () => {

    const [nuevaCategoria, setNuevaCategoria] = useState({
    "nombre": ""
    })



    async function handleChange(e){
        setNuevaCategoria({
            ...nuevaCategoria,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async () =>{
        const respuesta = await axios.post("http://localhost:3001/api/categorias", nuevaCategoria)
        .then(res => console.log(respuesta))
        .catch((e) =>{
            console.log(e)
        })
    }


    return(
    <div>
        <h3>Agrega una nueva Categoria</h3>
        <form onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input 
            type='text'
            name='nombre'
            placeholder='Ingrese el nombre'
            onChange={handleChange}
            value={nuevaCategoria.nombre}
            />
            <button type='submit'>Agregar Categoria</button>
        </form>
    </div>
    )
}

export default AddFormCategoria