import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from '../../archivoAPI/APIInvoke';
import swal from 'sweetalert';


const Login = () => {

     //para redireccionar de un componente a otro
     const navigate = useNavigate();

     //definimos el estado inicial de las variables
     const [usuario, setUsuario] = useState({
         email: '',
         password: ''
     });
 
     const { email, password } = usuario;
 
     const onChange = (e) => {
         setUsuario({
             ...usuario,
             [e.target.name]: e.target.value
         })
     }
 
     useEffect(() => {
         document.getElementById("email").focus();
     }, [])
 
     const iniciarSesion = async () => {
         if (password.length < 10) {
             const msg = "el password debe contener minimo 10 caracteres";
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
             const data = {
                 email: usuario.email,
                 password: usuario.password
             }
             const response = await APIInvoke.invokePOST(`/api/auth`, data);
             const mensaje = response.msg;
 
             if (mensaje === 'El usuario no existe' || mensaje === "contraseña no valida") {
                 const msg = "No fue posible iniciar la sesión verifique los datos ingresados.";
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
                 
                 const jwt = response.token;
 
                
                 localStorage.setItem('token', jwt);
 
                 
                 navigate("/home");
             }
         }
     }
 
     const onSubmit = (e) => {
        e.preventDefault();
         iniciarSesion();
     }
 
    

    return (
      
        <div className="hold-transition login-page">
        <div className="login-box">
            <div className="login-logo">
                <Link to={"#"}><b>Iniciar</b> Sesión</Link>
            </div>
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Bienvenido, ingrese sus credenciales.</p>

                    <form onSubmit={onSubmit}>
                        <div className="input-group mb-3">
                            <input type="email"
                                className="form-control"
                                placeholder="Email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope" />
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                        </div>

                        <div className="social-auth-links text-center mb-3">
                            <button type='submit' className="btn btn-block btn-primary">
                                Ingresar
                            </button>
                            <Link to={"/Registro"} className="btn btn-block btn-danger">
                                Crear Cuenta
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );

    
}

export default Login;