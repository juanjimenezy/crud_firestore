import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { Button, Container } from "reactstrap";
import { addRegistro } from '../features/registrosSlice';
import { v4 as uuid } from "uuid";

function NuevoRegistro() {

    const [registro, setRegistro] = React.useState({ id: "", nombre: "", apellido: "" });
    const [insertar, setInsertar] = React.useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setRegistro({
            ...registro,
            [e.target.name]: e.target.value,
        });
    };

    const fInsertar = async() => {
        console.log("insertar:");
        console.log(registro.nombre);


        if (!registro.nombre.trim()) {
            window.alert('Campo nombre vacio.')
            return;
        }

        if (!registro.apellido.trim()) {
            window.alert('Campo apellido vacio.')
            return;
        }
        
        dispatch(addRegistro({ ...registro, id: uuid() }));
        setRegistro({ id: "", nombre: "", apellido: "" });
        setInsertar(!insertar);
    }

    return (
        <>
        <Container>
            <div className='text-center'>
                {/* <label>Nombre:</label> */}
                <input className="form-control" name="nombre" type="text" onChange={handleChange} value={registro.nombre} placeholder="Nombre" />

                {/* <label>Apellido:</label> */}
                <input className="form-control my-1" name="apellido" type="text" onChange={handleChange} value={registro.apellido} placeholder="Apellido"/>
                <div className="my-1">
                    <Button color="success" onClick={() => fInsertar()}><i className="bi bi-person-plus"></i></Button>
                </div>
            </div>
        </Container>
        </>
    )
}

export default NuevoRegistro;