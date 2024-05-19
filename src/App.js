
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Paginas/auth/Login';
import Registro from './Paginas/auth/Registro';
import Home from './Paginas/Home';
import MostrarClientes from './Paginas/Modulos/MostrarClientes';
import MostrarServicios from './Paginas/Modulos/MostrarServicios';
import AgregarClientes from './Paginas/Modulos/AgregarClientes';
import EditarClientes from './Paginas/Modulos/EditarClientes';
import AgregarServicios from './Paginas/Modulos/AgregarServicio';
import EditarServicio from './Paginas/Modulos/EditarServicio';

function App() {
  return (
    <div className="App">
      <Fragment>
      <Router>
        <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/Registro" exact element={<Registro />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/clientes" exact element={<MostrarClientes />} />
      <Route path="/servicios" exact element={<MostrarServicios />} />
      <Route path="/clientes/agregar" exact element={<AgregarClientes />} />
      <Route path="/clientes/editar/:idclientes" exact element={<EditarClientes />} />
      <Route path="/servicios/agregar" exact element={<AgregarServicios />} />
      <Route path="/servicios/editar/:idclientes" exact element={<EditarServicio />} />
  
        </Routes>
      </Router>
      </Fragment>
    </div>
  );
}

export default App;
