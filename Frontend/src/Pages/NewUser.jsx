import { useNavigate } from "react-router-dom";
import { Global } from "../global/globalUrl";
import useForm from "../hooks/useForm"
import { useState } from "react";
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin";


export const NewUser = () => {
    const {form,changed} = useForm({})
    let navigate = useNavigate();
    const [error, setError] = useState(false);

    const createUser = async(e) => {
        e.preventDefault();

        let {name} = form;

        const userName = name.split(' ').map((word, index) => index === 0 ? word[0] : word).join('').toLowerCase();

        const user = {
            nombre: name,
            username: userName,
            password: userName
        }
        const data = await fetch(Global.url+"/user/createUser", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type":"application/json"
            }
        })
        const response = await data.json();
        if(data.status == 200 && data.ok){
            navigate("/admin/data", { state: response.user })
        }else{
            setError(true);
        }
    }
        
  return (
    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
        <HomeButtonAdmin />
        <h2 className="text-blueGreen text-7xl font-semibold mt-3">Nuevo usuario</h2>

        <form className='form-login flex flex-col' onSubmit={createUser}>
            <label className="text-blueGreen text-xl font-semibold mt-3">Nombre:</label>
            <input type="text" name="name" placeholder="Nombre" onChange={changed} className="border-blueGreen border-1 rounded-lg p-2 w-[300px]" />
            <button type="submit" className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100">Crear usuario</button>
            {error ?
              <label style={{"color": "red", "fontWeight": "bolder"}}>Ha surgido un problema, vuelva a intentarlo</label>
              :null
            }
        </form>
     
  </div>
  )
}
