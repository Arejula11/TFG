/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { UserContext } from "./UserContext"


export const UserProvider = ({children}) => {

  //Datos básicos del usuario
  const [user, setUser] = useState({
    numero: '',
    nombre: '',
    operation: {}
  });

   // Leer del localStorage
   useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    // console.log(storedUser);
    if (storedUser) {
        setUser(storedUser);
    }
    }, []);

    // Guardar en el localStorage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider>
  )
}
