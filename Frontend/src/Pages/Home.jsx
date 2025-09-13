
import { useNavigate } from "react-router-dom"
import { ButtonAdmin } from "../Components/ButtonAdmin"



export const Home = () => {


  const esAdmin = JSON.parse(localStorage.getItem("esAdmin"));

  const navigate = useNavigate()  
  
  const handleClickPacientes = () => {

    navigate("/pacientes")
  }
  const handleClickNew = () => {
    navigate("/nuevoPaciente")
  }
  // const handleClickExcel = () => {

  // }

  const handleClickLogOut = () => {
    localStorage.clear();
    navigate("/login")
  }

  const handleClickSettings = () => {
    navigate("/ajustes")
  }

  return (
    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
      {
        esAdmin && <ButtonAdmin />
      }
    <button id="settings"className="absolute top-4 right-4 bg-orangeSalud text-white px-4 py-2 rounded-md font-bold" onClick={handleClickSettings}>Ajustes</button>
      <img src={"logo.svg"} alt="Logo" />
      <h1 className="text-blueGreen text-7xl font-semibold mt-3">Bienvenido al sistema</h1>
      <div className="flex flex-col gap-2">
      
        <button id="pacientes" className="bg-blueGreen text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" onClick={handleClickPacientes}>Pacientes</button>
        <button id="new" className="bg-blueGreen text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" onClick={handleClickNew}>Nuevo paciente</button>
        {/* <button id="excel" className="bg-blueGreen text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" onClick={handleClickExcel}>Exportar a excel</button> */}
        <button id="logout" className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" onClick={handleClickLogOut}>Cerrar sesión</button>
      </div>

    </div>
  )
}

