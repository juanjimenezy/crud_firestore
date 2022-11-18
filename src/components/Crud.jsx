import React from 'react';
import { Container, Table, Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from 'reactstrap';
import { obtenerDatos, eliminarDatos, guardarDatos, editarDato } from '../firebase/services';

function Crud() {

    const [lista, setLista] = React.useState([]);
    const [registro, setRegistro] = React.useState({ id: "", nombre: "", apellido: "" });
    const [regEdit, setRegEdit] = React.useState({ id: "", nombre: "", apellido: "" });
    const [actualizar, setActualizar] = React.useState(false);

    React.useEffect(() => {
        getDatos();
    }, []);


    const getDatos = async () => {
        const regs = await obtenerDatos();
        setLista(regs);
    };

    const eliminarDato = async (id) => {
        eliminarDatos(id);
        getDatos();
    };

    const handleChange = (e) => {
        if(actualizar) setRegEdit({ ...regEdit, [e.target.name]: e.target.value, });
        else setRegistro({ ...registro, [e.target.name]: e.target.value, });
    };

    const guardarDato = async (e) => {
        e.preventDefault();
        guardarDatos(registro);
        getDatos();
        limpiar();
    };

    const editarElemento = async (e) => {
        e.preventDefault();
        editarDato(regEdit);
        limpiar();
        actualizarShowHide();
        getDatos();

    };

    const actualizarShowHide = (dato) => {
        setActualizar(!actualizar);
        if (dato) {
            setRegEdit({ id: dato.id, nombre: dato.nombre, apellido: dato.apellido });
        }
    }

    const limpiar = () => {
        setRegistro({ id: "", nombre: "", apellido: "" });
        setRegEdit({ id: "", nombre: "", apellido: "" });
    };



    return (
        <>
            <div className="my-4 justify-content-center d-flex align-items-center">
                <Card className="col-md-2 shadow-lg">
                    <CardHeader className="text-center bg-dark text-light">Insertar Registro</CardHeader>
                    <CardBody>
                        <Container>
                            <div className='text-center'>
                                <form onSubmit={guardarDato}>
                                    <input type="text" placeholder="Nombre" name="nombre" id="nombre" className="form-control" onChange={handleChange} value={registro.nombre} pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}" required />
                                    <input type="text" placeholder="Apellido" name="apellido" id="apellido" className="form-control my-1" onChange={handleChange} value={registro.apellido} pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}" required />
                                    <input type="submit" value="Registrar" className='btn btn-success my-1' />
                                </form>
                            </div>
                        </Container>
                    </CardBody>
                </Card>
            </div>

            {/* detalle */}
            <div className="my-4 justify-content-center d-flex align-items-center p-2">
                <Card className="col-md-4 shadow-lg">
                    <CardHeader className="text-center bg-dark text-light">Registros</CardHeader>
                    <CardBody>
                        <div className='my-2 text-center'>
                            <Container>
                                <div className='my-5 text-center'>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {lista.map((dato, key) => (
                                                <tr key={key}>
                                                    <td>{dato.nombre}</td>
                                                    <td>{dato.apellido}</td>
                                                    <td><Button className="btn-sm" color='secondary' onClick={() => actualizarShowHide(dato)}><i className="bi bi-pencil-square"></i></Button>
                                                        {" "}
                                                        <Button className="btn-sm" color='danger' onClick={() => eliminarDato(dato.id)}><i className="bi bi-trash"></i></Button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Container>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Modal-Actualizar */}
            <Modal isOpen={actualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Nombre: </label>
                        <input className="form-control" name="nombre" type="text" onChange={handleChange} value={regEdit.nombre} required />
                    </FormGroup>

                    <FormGroup>
                        <label>Apellido:</label>
                        <input className="form-control" name="apellido" type="text" onChange={handleChange} value={regEdit.apellido} required />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="success" onClick={editarElemento} ><i className="bi bi-check-lg"></i></Button>
                    <Button color="danger" onClick={() => actualizarShowHide(null)}><i className="bi bi-backspace-reverse"></i></Button>
                </ModalFooter>

            </Modal>
        </>
    );

}



export default Crud;