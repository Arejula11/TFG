import { useNavigate } from "react-router-dom"
import { ButtonMedico } from "../Components/ButtonMedico";

export const AdminHome = () => {
  const navigate = useNavigate();
  
  const handleClickNewUser = () => {
    navigate("/admin/newUser")
  }

  const handleClickAdd = () => {
    navigate("/admin/addDoctor")
  }

  const handleClickLogOut = () => {
    localStorage.clear();
    navigate("/login")
  }

  const handleClickVias = () => {
    navigate("/admin/viasClinicas")
  }

  return (

    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
      <ButtonMedico />
    <img src={"logo.svg"} alt="Logo" />
    <h1 className="text-blueGreen text-7xl font-semibold mt-3">Bienvenido al sistema</h1>
    <div className="flex flex-col gap-2">
      <button id="newUser" className="bg-blueGreen text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" onClick={handleClickNewUser}>Nuevo Usuario</button>
      <button id="addDoctor" className="bg-blueGreen text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" onClick={handleClickAdd}>Añadir médico a paciente</button>
      <button id="excel" className="bg-blueGreen text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" onClick={handleClickVias}>Vías Clínicas</button>
      <button id="logout" className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" onClick={handleClickLogOut}>Cerrar sesión</button>
    </div>

  </div>
  )
}
