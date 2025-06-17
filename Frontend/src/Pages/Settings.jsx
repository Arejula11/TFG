import { useNavigate } from "react-router-dom";
import { Global } from "../global/globalUrl";
import useForm from "../hooks/useForm"
import { useState } from "react";


export const Settings = () => {
    const {form,changed} = useForm({})
    let navigate = useNavigate();
    const [error, setError] = useState(false);
  
    const changePassword = async(e) => {
      e.preventDefault();
  
      let {password} = form;
      const token = localStorage.getItem('token');
      
  
      const data = await fetch(Global.url+"/user/updatePassword", {
        method: "PUT",
        body: JSON.stringify({ password }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
  
      if(data.status == 200 && data.ok){
          navigate("/")
      }else{
          setError(true);
      }
  }
  
  
    return (
      <div className="w-full h-full flex flex-col items-center align-middle justify-center">
      <h2 className="text-blueGreen text-7xl font-semibold mt-3">Cambiar contraseña</h2>
  
          <form className='form-login flex flex-col' onSubmit={changePassword}>
              
              <label className="text-blueGreen text-xl font-semibold mt-3">Nueva contraseña:</label>
              <input type="password" name="password" placeholder="contraseña" onChange={changed} className="border-blueGreen border-1 rounded-lg p-2 w-[300px]" />
              <button type="submit" className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100">Cambiar contraseña</button>
              {error ?
                <label style={{"color": "red", "fontWeight": "bolder"}}>Ha surgido un problema, vuelva a intentarlo</label>
                :null
              }
          </form>
       
       
  
  
    </div>
    )
  }