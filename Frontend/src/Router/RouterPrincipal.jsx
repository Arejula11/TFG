import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../Pages/Home';
import { NotFound } from '../Pages/NotFound';
import { Loading } from '../Pages/Loading';
import { People } from '../Pages/People';
import { ViaIngreso } from '../Pages/ViaIngreso';
import { NewPacient } from '../Pages/NewPacient';
import { ViaPlanifiacion } from '../Pages/ViaPlanificacion';
import { ViaPostOper } from '../Pages/ViaPostOper';
import { ViaQuirofano } from '../Pages/ViaQuirofano';
import { ViaPostCirugia } from '../Pages/ViaPostCirugia';
import { ViaPrimerDia } from '../Pages/ViaPrimerDia';
import { ViaSegundoDia } from '../Pages/ViaSegundoDia';
import { UserProvider } from '../Context/UserProvider';
import { ViaProvider } from '../Context/ViaProvider';
import { Login } from '../Pages/Login';
import { AdminHome } from '../Pages/AdminHome';
import { NewUser } from '../Pages/NewUser';
import { AddDoctor } from '../Pages/AddDoctor';
import { DataDoctor } from '../Pages/DataDoctor';
import { Settings } from '../Pages/Settings';
import { InfoPatient } from '../Pages/InfoPatient';
import { NewOperation } from '../Pages/NewOperation';
import { LoadingData } from '../Pages/LoadingData';
import { AdminGraph } from '../Pages/AdminGraph';
import { AdminViasClinicas } from '../Pages/AdminViasClinicas';
import { AdminViaClinica } from '../Pages/AdminViaClinica';
import { AdminNewViaClinica } from '../Pages/AdminNewViaClinica';
import { NewViaProvider } from '../Context/NewViaProvider';
import { AdminSubmitCsv } from '../Pages/AdminSubmitCsv';
import { AdminAssign } from '../Pages/AdminAssign';
import { AdminEtiquetas } from '../Pages/AdminEtiquetas';
import { AdminConfirmarVia } from '../Pages/AdminConfirmarVia';
import { AdminViaClinicaConfirmar } from '../Pages/AdminViaClinicaConfirmar';




const RouterPrincipal = () => {


  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ children }) => {
    return !localStorage.getItem('token') ? <Navigate to="/login" /> : children;

  };


  // eslint-disable-next-line react/prop-types  
  const AdminRoute = ({ children }) => {
    //se obtiene del JWT el rol del usuario
    const auth = JSON.parse(localStorage.getItem('esAdmin'));
    if(!auth){
      return <Navigate to="/login" />
    }

    return !localStorage.getItem('token') ?
      <Navigate to="/login" />
    :
    auth.rol == "usuario" ? <Navigate to="/login" /> : children;
  }

  return (

     <UserProvider> 
      <ViaProvider>
        <NewViaProvider>
          <Router>
            <Routes>
              <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
              <Route path="/loading" element={<PrivateRoute><Loading/></PrivateRoute>} />
              <Route path="/pacientes" element={<PrivateRoute><People/></PrivateRoute>} />
              <Route path="/nuevoPaciente" element={<PrivateRoute><NewPacient /></PrivateRoute>} />
              <Route path="/paciente/info/:id" element={<PrivateRoute><InfoPatient /></PrivateRoute>} />
              <Route path="/paciente/crear/:id" element={<PrivateRoute><NewOperation /></PrivateRoute>} />
              <Route path="/paciente/planificacion/:id" element={<PrivateRoute><ViaPlanifiacion /></PrivateRoute>} />
              <Route path="/paciente/ingreso/:id" element={<PrivateRoute><ViaIngreso /></PrivateRoute>} />
              <Route path="/paciente/quirofano/:id" element={<PrivateRoute><ViaQuirofano /></PrivateRoute>} />
              <Route path="/paciente/postcirugia/:id" element={<PrivateRoute><ViaPostCirugia /></PrivateRoute>} />
              <Route path="/paciente/primerdia/:id" element={<PrivateRoute><ViaPrimerDia /></PrivateRoute>} />
              <Route path="/paciente/segundodia/:id" element={<PrivateRoute><ViaSegundoDia /></PrivateRoute>} />
              <Route path="/paciente/postoperatorio/:id" element={<PrivateRoute><ViaPostOper /></PrivateRoute>} />
              <Route path="/ajustes" element={<PrivateRoute><Settings/></PrivateRoute>} />
              <Route path="/cargandoData" element={<PrivateRoute><LoadingData/></PrivateRoute>} />

              <Route path="/login" element={<Login />} />
              <Route path="/adminHome" element={<AdminRoute><AdminHome/></AdminRoute>} />
              <Route path="/admin/newUser" element={<AdminRoute><NewUser/></AdminRoute>} />
              <Route path="/admin/addDoctor" element={<AdminRoute><AddDoctor/></AdminRoute>} />
              <Route path="/admin/data" element={<AdminRoute><DataDoctor/></AdminRoute>} />
              <Route path="/admin/viasClinicas" element={<AdminRoute><AdminViasClinicas/></AdminRoute>} />
              <Route path="/admin/viaClinica/:id" element={<AdminRoute><AdminViaClinica/></AdminRoute>} />
              <Route path="/admin/viaClinica/:id/confirmar" element={<AdminRoute><AdminViaClinicaConfirmar/></AdminRoute>} />
              <Route path="/admin/newVia" element={<AdminRoute><AdminNewViaClinica/></AdminRoute>} />
              <Route path="/admin/newViaClinica/datos" element={<AdminRoute><AdminSubmitCsv/></AdminRoute>} />
              <Route path="/admin/newViaClinica/grafo" element={<AdminRoute><AdminGraph/></AdminRoute>} />
              <Route path="/admin/newViaClinica/asignar" element={<AdminRoute><AdminAssign/></AdminRoute>} />
              <Route path="/admin/newViaClinica/etiquetas" element={<AdminRoute><AdminEtiquetas/></AdminRoute>} />
              <Route path="/admin/newViaClinica/confirmar" element={<AdminRoute><AdminConfirmarVia/></AdminRoute>} />
              


              <Route path="*" element={<NotFound />} />

              {/* Add more routes as needed */}
            </Routes>
          </Router>
        </NewViaProvider>
      </ViaProvider>
     </UserProvider> 
  );
}

export default RouterPrincipal;