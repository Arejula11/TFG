import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { updateVia } from '../utils/updateVia';
import { ViaContext } from '../Context/ViaContext';


export const Header = ({ Title }) => {
  const { user } = useContext(UserContext);
  const { via } = useContext(ViaContext);
  

  const navigate = useNavigate();
  
  const handleSave = () => {
    // alert('Guardado');
    // eliminar en el localStorage
    const id_operacion = user.operation.id;
    const tareas = [...via.planificacion, ...via.ingreso, ...via.quirofano, ...via.postCirugia, ...via.primerDia, ...via.segundoDia, ...via.postOperatorio];

   const params = {
      idOperacion : id_operacion,
      tareas: tareas,
    }
    updateVia(params)
    localStorage.removeItem("user");
    localStorage.removeItem("via");
    localStorage.removeItem("tareas");

    navigate("/");

  }

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

  return (
    <div className="w-full flex flex-row justify-between items-center">
        {/* Columna de Información del Paciente */}
        <div className="w-1/3 ">
          <div className='flex flex-col  border-1 w-max h-max align-middle ml-14 p-5 rounded-sm'>
            <h3 className="text-md font-semibold inline-block ">Número: {user.numero}</h3>
            <h3 className="text-md font-semibold inline-block ">Nombre: {user.nombre}</h3>
            <h3 className="text-md font-semibold inline-block ">Operación: {user.operation.operationName}</h3>
            <h3 className="text-md font-semibold inline-block ">Fecha: {formatDate(user.operation.fecha)}</h3>
            <h3 className="text-md font-semibold inline-block ">Edad: {user.operation.edad}</h3>
            <h3 className="text-md font-semibold inline-block ">Indice masa: {user.operation.indice}</h3>
            <h3 className="text-md font-semibold inline-block ">Etiqueta: {user.operation.etiqueta}</h3>
          </div>
        </div>
        
        {/* Columna de Título */}
        <div className="w-1/3 flex justify-center">
            <h1 className="text-blueGreen text-5xl font-semibold">{Title}</h1>
        </div>
        
        {/* Columna de Botón */}
        <div className="w-1/3 flex justify-end">
            <button className="bg-blueGreen text-white font-semibold px-4 py-2 rounded-lg h-14 mr-14" onClick={handleSave}>
                Guardar
            </button>
        </div>
    </div>
  );
};

Header.propTypes = {
  Title: PropTypes.string.isRequired,
};
