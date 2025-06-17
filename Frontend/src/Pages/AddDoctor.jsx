import { useNavigate } from "react-router-dom";
import { Global } from "../global/globalUrl";
import useForm from "../hooks/useForm"
import { useState } from "react";
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin";


export const AddDoctor = () => {

  const {form,changed} = useForm({})
  let navigate = useNavigate();
  const [error, setError] = useState(false);

  const addDoctorPacient = async(e) => {
    e.preventDefault();

    let {usuarioMedico, numHist} = form;
    const token = localStorage.getItem('token');
    

    const data = await fetch(Global.url+"/user/addPatient", {
      method: "POST",
      body: JSON.stringify({ usuarioMedico, numHist }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    if(data.status == 200 && data.ok){
        navigate("/adminHome")
    }else{
        setError(true);
    }
}


  return (
    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
      <HomeButtonAdmin />
      <h2 className="text-blueGreen text-7xl font-semibold mt-3">Añadir médico a paciente</h2>

      <form className='form-login flex flex-col' onSubmit={addDoctorPacient}>
          <label className="text-blueGreen text-xl font-semibold mt-3">Usuario del médico:</label>
          <input type="text" name="usuarioMedico" placeholder="Usuario" onChange={changed} className="border-blueGreen border-1 rounded-lg p-2 w-[300px]" />
          <label className="text-blueGreen text-xl font-semibold mt-3">Número de historia del paciente:</label>
          <input type="text" name="numHist" placeholder="Número historia" onChange={changed} className="border-blueGreen border-1 rounded-lg p-2 w-[300px]" />
          <button type="submit" className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100">Añadir</button>
          {error ?
            <label style={{"color": "red", "fontWeight": "bolder"}}>Ha surgido un problema, vuelva a intentarlo</label>
            :null
          }
      </form>
  
  </div>
  )
}
