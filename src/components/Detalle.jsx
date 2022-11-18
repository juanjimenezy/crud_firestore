import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, FormGroup,ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { editRegistro,deleteRegistro } from "../features/registrosSlice";
import { db } from "../firebase/config";




function Detalle() {
    //const registros = useSelector((state) => state.registros);
    const [registro, setRegistro] = React.useState({id: "", nombre: "", apellido: ""});
    const [actualizar, setActualizar] = React.useState(false);
    const dispatch = useDispatch();
    const [registros, setRegistros] = React.useState([]);

    React.useEffect(() => {
        const obtenerDatos = async () => {
          try {
            const data = await db.collection('usuarios').get();
            //console.log(data.docs)
            const arrayData = data.docs.map((documento) => ({id: documento.id, ...documento.data().registro }));
            //console.log(arrayData);
            setRegistros(arrayData);

          } catch (err) {
            console.log(err);
          }
        }
    
        obtenerDatos()
    
      }, [])



    const handleDelete = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas a " + dato.nombre);
        if (opcion === true) {
            dispatch(deleteRegistro(dato.id));
            setRegistro({id: "", nombre: "", apellido: ""});
        }
    };

    const handleChange = (e) => {
        setRegistro({
          ...registro,
          [e.target.name]: e.target.value,
        });
      };

    const actualizarShowHide = (dato) => {
        setActualizar(!actualizar);
        console.log(dato);

        if(dato){
            setRegistro({id: dato.id, nombre: dato.nombre, apellido: dato.apellido});
        }
    };

    const editar = () => {

        if(!registro.nombre.trim()){
            window.alert('Campo nombre vacio.')
            return;
        }

        if(!registro.apellido.trim()){
            window.alert('Campo apellido vacio.')
            return;
        }

        dispatch(editRegistro({ ...registro, id: registro.id }));
        setActualizar(!actualizar);
    }

    return (
        <>
            <div className='my-2 text-center'>
                <Container>
                    <div className='my-5 text-center'>
                        <Table>
                            <thead>
                                <tr>
                                    {/* <th>Id</th> */}
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {registros.map((dato, key) => (
                                    <tr key={key}>
                                        {/* <td>{dato.id}</td> */}
                                        <td>{dato.nombre}</td>
                                        <td>{dato.apellido}</td>
                                        <td><Button className="btn-sm" color='secondary' onClick={() => actualizarShowHide(dato)}><i className="bi bi-pencil-square"></i></Button>
                                            {" "}
                                            <Button className="btn-sm" color='danger' onClick={() => handleDelete(dato)}><i className="bi bi-trash"></i></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal isOpen={actualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>Id:</label>
                        <input className="form-control" readOnly type="text" value={registro.id}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Nombre: </label>
                        <input className="form-control" name="nombre" type="text" onChange={handleChange} value={registro.nombre} required/>
                    </FormGroup>

                    <FormGroup>
                        <label>Apellido:</label>
                        <input className="form-control" name="apellido" type="text" onChange={handleChange} value={registro.apellido} required/>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                        <Button color="success" onClick={() => editar()} ><i className="bi bi-check-lg"></i></Button>
                        <Button color="danger" onClick={() => actualizarShowHide(null)}><i class="bi bi-backspace-reverse"></i></Button>
                </ModalFooter>
            </Modal>

        </>
    );
}



export default Detalle;