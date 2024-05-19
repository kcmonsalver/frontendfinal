import React, { useState, useEffect } from 'react';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContaier';
import { useNavigate } from 'react-router-dom';
import APIInvoke from '../../archivoAPI/APIInvoke'
import swal from 'sweetalert';

const AgregarServicios = () => {

    const navigate = useNavigate();

    const [servicios, setServicios] = useState({

        nombre: '',
        tipo: '',
        precio: '',
        modalidad: ''

    });

    const { nombre, tipo, precio, modalidad } = servicios

    useEffect(() => {
        document.getElementById("nombre").focus();
    }, [])

    const onChange = (e) => {
        setServicios({
            ...servicios,
            [e.target.name]: e.target.value
        })
    }

    const crearServicio = async () => {

        const data = {
        nombre: servicios.nombre,
        tipo: servicios.tipo,
        precio: servicios.precio,
        modalidad: servicios.modalidad
            
        }

        const response = await APIInvoke.invokePOST('/api/servicios', data);
        const idServicios = response._id;

        if (idServicios === '') {
            const msg = "hubo un error al agregar un servicio";
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
        } else {

            navigate("/servicios");

            const msg = "El servicio fue creado con exito";
            swal({
                title: 'Informacion',
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
            setServicios({
                nombre: '',
                tipo: '',
                precio: '',
                modalidad: ''
                

            });
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearServicio();
    }

    return (  
    
    <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
        <div className='content-wrapper'>

            <ContentHeader
                titulo={"Creacion de servicios"}
                breadCrumb1={"Listado de servicios"}
                breadCrumb2={"Creacion"}
                ruta1={"/servicios/agregar"}
            />
      
       
            <section className="content">
                <div className="card">
                    <div className="card-header">
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

                        <form onSubmit={onSubmit}>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Nombre</label>
                                    <input type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        placeholder='ingrese el nombre del servicio'
                                        value={nombre}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Tipo</label>
                                    <input type="text"
                                        className="form-control"
                                        id="tipo"
                                        name="tipo"
                                        placeholder='ingrese el tipo del servicio'
                                        value={tipo}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Precio</label>
                                    <input type="text"
                                        className="form-control"
                                        id="precio"
                                        name="precio"
                                        placeholder='ingrese el precio del servicio'
                                        value={precio}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Modalidad</label>
                                    <input type="text"
                                        className="form-control"
                                        id="modalidad"
                                        name="modalidad"
                                        placeholder='ingrese la modalidad del servicio'
                                        value={modalidad}
                                        onChange={onChange}
                                        required
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                          
                            <div className="card-footer">
                               <button type='submit' className="btn btn-primary">
                                  Agregar Servicio
                                </button>
                            
                            </div>
                        </form>
                    </div>
              </div>                    
         </section >
      
         </div>
         <Footer></Footer>
    </div >

    );
}

export default AgregarServicios