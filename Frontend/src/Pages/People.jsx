import { ScrollShadow } from "@heroui/react";
import {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPatients } from "../utils/getPatients";


export const People = () => {

  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      let fetchedPatients = [];

      
        fetchedPatients = await getPatients();
     

      setPacientes(fetchedPatients);
    };

    fetchPatients();
  }, []);


const [input, setInput] = useState("")



  const onInputChange = ({target}) => {
    setInput(target.value)
  }

  var filteredData = pacientes.filter(item => {
    if(input === ""){
      return true;
    } else {
      return item.nombre.toLowerCase().includes(input.toLowerCase()) || item.numhist.toString().includes(input)
    }
  }
  );

  return (
    pacientes.length === 0 ? (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-blueGreen text-2xl">No hay pacientes guardados</p>
      </div>
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <h1 className="text-blueGreen text-5xl font-semibold">Pacientes</h1>

        {/* Input de búsqueda */}
        <input 
          className="w-1/3 h-10 bg-[#F3F4F6] bg-opacity-50 border-2 border-blueGreen rounded-md my-3 p-2 focus:outline-none focus:ring-2 focus:ring-blueGreen"
          type="text"
          placeholder="Buscar paciente"
          onChange={onInputChange}
          value={input}
        />

        {/* Lista con scroll */}
        <ScrollShadow size="0" className="w-[400px] h-[500px] bg-white/20 border-2 border-blueGreen rounded-md p-5 shadow-lg">
          <ul className="divide-y divide-[#E5E7EB]">
            {filteredData.map((paciente) => (
              <li key={paciente.numhist}>
                <Link className="flex flex-row items-center hover:bg-[#D1D5DB] transition-colors p-2 rounded-md" to={`/paciente/info/${paciente.numhist}`}>
                  <p className="mr-4 font-medium text-[#111827]">{paciente.nombre}</p>
                  <p className="text-[#6B7280]">{paciente.numhist}</p>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollShadow>
      </div>
    )
  )
}
