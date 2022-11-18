import React from "react";
import { Card, CardHeader,CardBody } from "reactstrap";

import NuevoRegistro from "./NuevoRegistro";
import Detalle from "./Detalle";

export const Formulario = () => {
    return (
        <>
        <div className="my-4 justify-content-center d-flex align-items-center">
            <Card className="col-md-2 shadow-lg">
                <CardHeader className="text-center bg-dark text-light">Insertar Registro</CardHeader>
                <CardBody><NuevoRegistro/></CardBody>
            </Card>
        </div>

        <div className="my-4 justify-content-center d-flex align-items-center p-2">
            <Card className="col-md-4 shadow-lg">
                <CardHeader className="text-center bg-dark text-light">Registros</CardHeader>
                <CardBody><Detalle/></CardBody>
                
            </Card>
            
        </div>
        </>
    )
}

export default Formulario;