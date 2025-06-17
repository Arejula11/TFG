import {  useNavigate, useParams } from "react-router-dom";
import { getInfoPatient } from "../utils/getInfoPatient";
import { getOperations } from "../utils/getOperations";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getTareasOperation } from "../utils/getTareasOperation";
import { getEtiquetaById } from "../utils/getInfoEtiquetas";
import { getViaName } from "../utils/getVia";
import { ViaContext } from "../Context/ViaContext";
import { HomeButton } from "../Components/HomeButton";


export const InfoPatient = () => {
    //recive la informacion que le ha pasado la pagina anterior mediante la url
    const {id} = useParams();

    const [info, setInfo] = useState(null);
    const [operations, setOperations] = useState(null);
    const [loading, setLoading] = useState(true); // Estado para indicar carga

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { setViaTareas } = useContext(ViaContext);

    const handleClick =  async (number, nombre, operation) => {
        setUser({numero: String(number), nombre: String(nombre), operation: operation});
        const respone = await getTareasOperation(operation.id);
        if(respone){
            // response is { Planificacion: [], Ingreso: [], Quirófano: [], PostCirugia: [], PrimerDia: [], SegundoDia: [], PostOperatorio: [] }
            setViaTareas("planificacion", respone["Planificación"]);
            setViaTareas("ingreso", respone["Ingreso"]);
            setViaTareas("quirofano", respone["Quirófano"]);
            setViaTareas("postCirugia", respone["Post-cirugía"]);
            setViaTareas("primerDia", respone["Primer Día"]);
            setViaTareas("segundoDia", respone["Segundo Día"]);
            setViaTareas("postOperatorio", respone["Post-operatorio"]);
            // redirige a la pagina de planificacion de la operacion
            navigate(`/paciente/planificacion/${operation.id}`);   
        }
        
    }
    //las operaciones tienen una etiqueta, la cual se trata del id de la etiqueta que se le ha asignado a la operacion, por lo que al cargar la pagina, se hace una peticion a la base de datos para obtener la etiqueta y asi poder mostrarla en la pagina
    const getEtiqueta = async (id) => {
        try {
            const etiqueta = await getEtiquetaById(id);
            return etiqueta ? etiqueta.nombre : "Sin etiqueta";
        } catch (error) {
            console.error("Error al obtener la etiqueta:", error);
            return "Sin etiqueta";
        }
    }

    const getOperationName = async (idVia) => {
        try {
            const viaName = await getViaName(idVia);
            return viaName ? viaName.nombre : "Sin vía clínica";
        } catch (error) {
            console.error("Error al obtener el nombre de la vía clínica:", error);
            return "Sin vía clínica";
        }
    } 

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return; 

            try {
                const [fetchedInfo, fetchedOperations] = await Promise.all([
                    getInfoPatient(id),
                    getOperations(id)
                ]);
                setInfo(fetchedInfo);
                //invierto el orden del array para que las operaciones mas recientes aparezcan primero
                setOperations(fetchedOperations.reverse());
                //asigno la etiqueta a cada operacion
                const operationsWithEtiquetas = await Promise.all(
                    fetchedOperations.map(async (operation) => {
                        const etiqueta = await getEtiqueta(operation.etiqueta);
                        const operationName = await getOperationName(operation.idvia);
                        return { ...operation, operationName, etiqueta };
                    })
                );
                setOperations(operationsWithEtiquetas);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                setLoading(false); // Termina la carga
            }
        };

        fetchData();
    }, [id]);
    



const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

if (loading) {
    return (
        <div className="w-full h-full flex flex-col items-center align-middle justify-center">
            <img src={"logo.svg"} alt="Logo" />
            <h1 className="text-blueGreen text-7xl font-semibold">Cargando...</h1>
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-orangeSalud"></div>
        </div>
      )
}

return (
<div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-20">
    <HomeButton />
    <h1 className="text-blueGreen text-3xl font-semibold border-b pb-2 mb-4">Información del Paciente</h1>
    <div className="space-y-2">
        <p className="text-[#374151] text-lg font-medium">Número de historia: <span className="font-normal text-[#111827]">{info[0].numhist}</span></p>
        <p className="text-[#374151] text-lg font-medium">Nombre: <span className="font-normal text-[#111827]">{info[0].nombre}</span></p>
        <p className="text-gray-700 text-lg font-medium">Sexo: <span className="font-normal text-[#111827]">{info[0].sexo ? "Hombre" : "Mujer"}</span></p>
    </div>
    <div className="flex flex-row justify-between items-center mt-8 border-b">

    <h2 className="text-blueGreen text-2xl font-semibold  pb-2 mt-8">Operaciones</h2>
    <button className="bg-blueGreen text-white px-4 py-2 rounded-lg mt-4" onClick={() => navigate(`/paciente/crear/${info[0].numhist}`)}>Nueva operación</button>
    </div>
    <div className="mt-4">
        <ul className="space-y-4">
            {operations.map((operation) => (
                <li key={operation.id} className="p-4 bg-[#F3F4F6] rounded-lg shadow-sm hover:bg-[#E5E7EB] transition-colors" onClick={() => handleClick(info[0].numhist, info[0].nombre, operation)}>
                    
                    <p className="text-[#1F2937] text-lg font-medium">Operación: <span className="font-normal text-[#131922]">{operation.operationName}</span></p>
                    <p className="text-[#1F2937] text-lg font-medium">Fecha: <span className="font-normal text-[#111827]">{formatDate(operation.fecha)}</span></p>
                    <p className="text-[#1F2937] text-lg font-medium">Índice masa corporal: <span className="font-normal text-[#111827]">{operation.indice}</span></p>
                    <p className="text-[#1F2937] text-lg font-medium">Edad: <span className="font-normal text-[#111827]">{operation.edad}</span></p>
                    <p className="text-[#1F2937] text-lg font-medium">Etiqueta: <span className="font-normal text-[#111827]">{operation.etiqueta}</span></p>
                    
                </li>
            ))}
        </ul>
    </div>
</div>



        
        
);

}


