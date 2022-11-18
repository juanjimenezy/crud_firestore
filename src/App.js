import React from 'react';
import { obtenerDatos, eliminarDatos,guardarDatos,editarDato } from './firebase/services';

function App() {

  const [lista, setLista] = React.useState([]);
  const [registro, setRegistro] = React.useState({ id: "", nombre: "", apellido: "" });

  const [modoEdicion, setModoEdicion] = React.useState(false)

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
    setRegistro({...registro,[e.target.name]: e.target.value,});
  };

  const editar = async (element) => {
    setModoEdicion(true);
    setRegistro({ id: element.id, nombre: element.nombre, apellido: element.apellido });
  };


  const guardarDato = async (e) => {
    e.preventDefault();
    const nuevoUsuario = { nombre: registro.nombre, apellido: registro.apellido };
    const dato = await guardarDatos(nuevoUsuario);
    setLista([...lista,{ id: dato.id, ...nuevoUsuario }]);
    limpiar();
  };

  const editarElemento = async (e) => {
    e.preventDefault();
    editarDato(registro);
    getDatos();

    setModoEdicion(false)
    limpiar();

  };

  const limpiar = () => {
    setRegistro({ id: "", nombre: "", apellido: "" });
  }
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">{modoEdicion ? 'Edicion de usuario' : 'Registro de usuarios.'}</h1>

            <form onSubmit={modoEdicion ? editarElemento : guardarDato}>
              <input type="text" placeholder="Nombre" name="nombre" id="nombre" className="form-control" onChange={handleChange} value={registro.nombre} pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}" required/>
              <input type="text" placeholder="Apellido" name="apellido" id="apellido" className="form-control" onChange={handleChange} value={registro.apellido} pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}" required/>
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
