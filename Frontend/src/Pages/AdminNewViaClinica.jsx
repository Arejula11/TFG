import { useNavigate } from "react-router-dom";
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin"
import useForm from "../hooks/useForm";
import { useContext } from "react";
import { NewViaContext } from "../Context/NewViaContext";


export const AdminNewViaClinica = () => {
  const navigate = useNavigate();
  const { form, changed } = useForm({});
  const { changeName } = useContext(NewViaContext);

  const createVia = async (e) => {
    e.preventDefault();
    let { name } = form;
    changeName(name);
    navigate("/admin/newViaClinica/datos");
  }

  return (
    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
            <HomeButtonAdmin />
            <h2 className="text-blueGreen text-7xl font-semibold mb-6">Nueva Vía Clínica</h2>
    
            <form className='form-login flex flex-col' onSubmit={createVia}>
                <label className="text-blueGreen text-xl font-semibold mt-3">Nombre de la vía clínica:</label>
                <input type="text" name="name" placeholder="Nombre" onChange={changed} className="border-blueGreen border-1 rounded-lg p-2 w-[300px]" />
                <button type="submit" className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-5 opacity-90 hover:opacity-100">Siguiente</button>
            </form>
         
      </div>
  )
}
