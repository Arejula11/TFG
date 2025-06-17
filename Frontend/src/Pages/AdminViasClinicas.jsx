import { useEffect, useState } from "react";
import { getAllVias } from "../utils/getVia";
import { ViaSearch } from "../Components/ViaSearch";
import { useNavigate } from "react-router-dom";
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin";


export const AdminViasClinicas = () => {

    const [vias, setVias] = useState([]);
    const navigate = useNavigate();

    const onButtonInputChange = (via) => {
        navigate(`/admin/viaClinica/${via.id}`, {
            state: {
                via: via
            }
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            getAllVias().then((response) => {
                if (response) {
                    
                    setVias(response);
                }
            });
        }
        fetchData();
    }
    , []);

  return (
    vias.length === 0 ? (
      <div className="w-full h-full flex items-center justify-center">
        <HomeButtonAdmin />
        <p className="text-blueGreen text-2xl">No hay vias guardadas</p>
      </div>
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center gap-6">
        <HomeButtonAdmin />
        <h1 className="text-blueGreen text-5xl font-semibold">Vías Clínicas</h1>
        <div className=" h-[80%] w-full flex flex-col items-center mb-5">
            <ViaSearch
            vias={vias}
            buttonInputChange={onButtonInputChange}
            />
            <button
            className="bg-orangeSalud w-[20%]  text-white font-bold px-5 py-2 rounded-lg opacity-90 hover:opacity-100"
            onClick={() => navigate("/admin/newVia")}
            >
            Crear nueva vía clínica
            </button>
        </div>
      </div>
    )
  )
    
}
