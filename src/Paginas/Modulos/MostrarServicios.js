import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContaier';
import APIInvoke from '../../archivoAPI/APIInvoke';
import swal from 'sweetalert';

const MostrarServicios = () => {

    const [servicios, setServicios] = useState([]);

    const getServicios = async () => {
        const response = await APIInvoke.invokeGET(`/api/servicios`);
        
        setServicios(response);
    }

    useEffect(() => {
        getServicios();
    }, [])

    const eliminarServicios = async (e, idServicios) => {
        e.preventDefault();
        const response = await APIInvoke.invokeDELETE(`/api/servicios/${idServicios}`);

        if (response.msg === 'servicio eliminado') {
            const msg = "El servicio fue borrado correctamente.";
            swal({
                title: 'Información',
                text: msg,
                icon: 'success',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-primary',
                        closeModal: true
                    }
                }
            });
            getServicios();
        } else {


            
            const msg = "El servicio no fue borrado correctamente.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }

    }

    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">

                <ContentHeader
                    titulo={"Listado de Servicios"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Servicios"}
                    ruta1={"/home"}
                />

                <section className="content">

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title"><Link to={"/servicios/agregar"} className="btn btn-block btn-primary btn-sm">
                                Crear Servicio</Link></h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        
                                        <th style={{ width: '25%' }}>Nombres Servicio</th>
                                        <th style={{ width: '25%' }}>Tipo</th>
                                        <th style={{ width: '25%' }}>Precio</th>
                                        <th style={{ width: '25%' }}>Modalidad</th>
                                  
                                    </tr>
                                </thead>
                                <tbody>
                                {servicios.map( (servicios, index) => (
                                <tr key = {index}>
                                    <td> {servicios.nombre} </td>
                                    <td> {servicios.tipo} </td>
                                    <td> {servicios.precio} </td>
                                    <td> {servicios.modalidad} </td>
                                    
                                    <td>
                                                        
                                                        <Link to={`/servicios/editar/${servicios._id}`} className="btn btn-sm btn-primary">Editar</Link>
                                                        <button onClick={(e) => eliminarServicios(e, servicios._id)} className="btn btn-sm btn-danger">Borrar</button>
                                                    </td>
                                                </tr>
                                      ))}

                                </tbody>
                            </table>

                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MostrarServicios;