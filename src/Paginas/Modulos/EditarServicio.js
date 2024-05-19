import React, { useState, useEffect } from 'react';
import ContentHeader from '../../Componentes/ContentHeader';
import Footer from '../../Componentes/Footer';
import Navbar from '../../Componentes/Navbar';
import SidebarContainer from '../../Componentes/SidebarContaier';
import { useNavigate, useParams } from 'react-router-dom';
import APIInvoke from '../../archivoAPI/APIInvoke'
//import swal from 'sweetalert';



function EditarServicio() {
 
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [precio, setPrecio] = useState('')
    const [modalidad, setModalidad] = useState('')
 
    const navigate = useNavigate();
    const {id} = useParams();



    const modificarServicio=async (e) =>{
        e.preventDefault()
        await APIInvoke.invokePUT(`/api/servicios/${id}`,{
        nombre: nombre, tipo: tipo, precio:precio, modalidad: modalidad 
        })
        navigate('/servicios')
    }

useEffect(()=> {
    getServiciosById();
    //eslint-disable-next-line
},[]);


const getServiciosById = async ()=> {
    const res = await APIInvoke.invokeGET(`/api/servicios/${id}`)
    setNombre(res.nombre)
    setTipo(res.tipo)
    setPrecio(res.precio)
    setModalidad(res.modalidad)
  
}


  return (
    <div className='wrapper'>
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
        <div className='content-wrapper'>

            <ContentHeader
                titulo={"Edicion de Servicios"}
                breadCrumb1={"Listado de Servicios"}
                breadCrumb2={"Edicion"}
                ruta1={"/servicios"}
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

                        <form onSubmit={modificarServicio}>

                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor='nombres'>Nombre</label>
                                    <input type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        placeholder='ingrese el nombre del servicio'
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)} 
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
                                        onChange={(e) => setTipo(e.target.value)} 
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
                                        onChange={(e) => setPrecio(e.target.value)} 
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
                                    <label htmlFor='nombres'>modalidad</label>
                                    <input type="text"
                                        className="form-control"
                                        id="modalidad"
                                        name="modalidad"
                                        placeholder='ingrese la modalidad del servicio'
                                        value={modalidad}
                                        onChange={(e) => setModalidad(e.target.value)} 
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
                                  Editar Servicio
                                </button>
                            
                            </div>
                        </form>
                    </div>
              </div>                    
         </section >
            
            
            </div>
            <Footer></Footer>
            </div>
  )
}

export default EditarServicio