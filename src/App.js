import React from 'react';
import { db } from "./firebase/config";
import { obtenerDatos, eliminarDatos,guardarDatos } from './firebase/services';

function App() {

  const [lista, setLista] = React.useState([]);
  const [registro, setRegistro] = React.useState({ id: "", nombre: "", apellido: "" });

  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    getDatos();
  }, []);


  const getDatos = async () => {
    const regs = await obtenerDatos();
    setLista(regs);
  };

  const eliminarDato = async (id) => {
    await eliminarDatos(id);
    getDatos();
  };

  const handleChange = (e) => {
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value,
    });
  };

  const editar = async (element) => {
    setModoEdicion(true);
    setRegistro({ id: element.id, nombre: element.nombre, apellido: element.apellido });
    console.log(registro);
  };


  const guardarDato = async (e) => {
    e.preventDefault();
    if (!registro.nombre.trim()) {
      alert('No se encuentran valores para el campo nombre');
      return;
    }

    if (!registro.apellido.trim()) {
      alert('No se encuentran valores para el campo apellido');
      return;
    }

    try {
      const nuevoUsuario = { nombre: registro.nombre, apellido: registro.apellido };
      const dato = await guardarDatos(nuevoUsuario);
      setLista([...lista,{ id: dato.id, ...nuevoUsuario }]);
    } catch (error) {
      console.log(error);
    }
    setRegistro({ id: "", nombre: "", apellido: "" });
  };

  const editarElemento = async (e) => {
    e.preventDefault()

    if (!registro.nombre.trim()) {
      alert('No se encuentran valores para el campo nombre');
      return;
    }
    
    if (!registro.apellido.trim()) {
      alert('No se encuentran valores para el campo apellido');
      return;
    }

    try {
      await db.collection('usuarios').doc(registro.id).update({ nombre: registro.nombre, apellido: registro.apellido })
      const listaEditada = lista.map(
        (elemento) => elemento.id === registro.id ?
          { id: registro.id, nombre: registro.nombre, apellido: registro.apellido } : elemento
      )
      setLista(listaEditada)
      setModoEdicion(false)
      setRegistro({ id: "", nombre: "", apellido: "" });
      setError(null)
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">{modoEdicion ? 'Edicion de usuario' : 'Registro de usuarios.'}</h1>
            {
              error ? (alert({ error })) : null

            }

            <form onSubmit={modoEdicion ? editarElemento : guardarDato}>
              <input type="text" placeholder="Nombre" name="nombre" id="nombre" className="form-control" onChange={handleChange} value={registro.nombre} />
              <input type="text" placeholder="Apellido" name="apellido" id="apellido" className="form-control" onChange={handleChange} value={registro.apellido} />
              {
                modoEdicion ? <input type="submit" value="Editar" /> :
                  <input type="submit" value="Registrar" />
              }
            </form>
          </div>
        </div>


      </div>
      <div><ul>
        {
          lista.map((element, index) => (

            <li key={element.id}>{element.nombre} {element.apellido} <button onClick={() => editar(element)}>Editar</button>  <button onClick={() => eliminarDato(element.id)}>Eliminar</button></li>

          ))
        }


      </ul></div>
    </>
  );
}

export default App;
