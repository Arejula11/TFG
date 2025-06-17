import useForm from '../hooks/useForm'
import { useNavigate } from "react-router-dom"
import {  useState } from 'react'
import { Global } from '../global/globalUrl'






export const Login = () => {

  const {form,changed} = useForm({})
  // const [saved, setSaved] = useState("not_sended")
  let navigate = useNavigate()
  const [error, setError] = useState(false)


  const loginUser = async(e) => {
    e.preventDefault();

    const username = form.username;
    // const password = bcrypt.hashSync(form.password);
    const password = form.password; 
    // console.log(username, password)
    const request = await fetch(Global.url+"/login", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type":"application/json"
      }
    })

    const data = await request.json()

    // console.log(data) 

    if(data.token){
      // setSaved("login")
      localStorage.setItem("token", data.token);
      localStorage.setItem("esAdmin", JSON.stringify(data.esAdmin));


      //Check if the user is admin
      if(data.esAdmin === false){
        navigate("/")
      }else{
        navigate("/adminHome")
      }

    }else{

        setError(true);
    }

  }



  return (
    <div className="w-full h-full flex flex-col items-center align-middle justify-center" >
      <img src={"logo.svg"} alt="Logo" />
      <form className='form-login flex flex-col' onSubmit={loginUser}>
        <label className="text-blueGreen text-xl font-semibold mt-3">Usuario</label>
        <input type='text' name='username' onChange={changed} className="border-blueGreen border-1 rounded-lg p-2 w-[300px]"></input>
        <label className="text-blueGreen text-xl font-semibold mt-3">Contraseña</label>
        <input type='password' name='password' onChange={changed}  className="border-blueGreen border-1 rounded-lg p-2 w-[300px]"></input>
        <button type='submit' className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100" >Iniciar Sesion</button>
        {error ?
          <label style={{"color": "red", "fontWeight": "bolder"}}>El usuario o la contraseña son incorrectos</label>
          :null
        }
      </form>
      
    </div>
  )
}

