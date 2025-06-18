import { CSVLink } from "react-csv"
import { HomeButtonAdmin } from "../Components/HomeButtonAdmin"
import { useContext, useRef, useState } from "react";
import { getGraph } from "../utils/getGraph";
import { useNavigate } from "react-router-dom";
import { parseGraphNodes } from "../utils/parseGraph";
import { NewViaContext } from "../Context/NewViaContext";
import toast from "react-hot-toast";


export const AdminSubmitCsv = () => {
    const headers = [
        { label: "NHC", key: "id" },
        { label: "Actividad", key: "actividad" },
        {label: "Fecha", key: "fecha" },
        {label: "Recursos", key: "recurso" }
    ];
    const [isLoading, setIsLoading] = useState(false);
    const data = [];
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const navigate = useNavigate();
    const { addNodos, addGraph } = useContext(NewViaContext);

    const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedFileName(file.name);
    } else {
        setSelectedFileName("");
    }
    };

    const handleButtonClick = async () => {
        setIsLoading(true);
        const file = fileInputRef.current?.files?.[0];

        if (!file) {
            console.warn("No file selected");
            return;
        }
        try {
            const response = await getGraph(file); 
            if (response.status === 201) {
                const data = response.data;
                const nodes = parseGraphNodes(data.graph);
                addNodos(nodes);
                addGraph(data.graph);
                navigate("/admin/newViaClinica/grafo");
            } 
            setIsLoading(false);
        } catch (error) {
            const data = error.response;
            console.error("Error al generar el grafo:", error);
            if (error.status === 400 && data.data.message === 'Petri net has deadlocks') {
                toast.error("Red de Petri con bloqueos detectados. Por favor, revisa el archivo CSV y vuelve a intentarlo.");
            } else if (error.status === 400 && data.data.message === 'Error processing the file') {
                toast.error("Error al procesar el archivo CSV. Asegúrate de que el formato es correcto y vuelve a intentarlo.");
            } else {
                toast.error("Error al generar el grafo. Por favor, revisa el archivo CSV y vuelve a intentarlo.");
            }
            setIsLoading(false);
        }
    };


  return  !isLoading ? ( 
     <div className="w-full h-full flex flex-col items-center align-middle justify-center">
            <HomeButtonAdmin />
            <h2 className="text-blueGreen text-7xl font-semibold mb-6">Nueva Vía Clínica</h2>
            <p className="text-blueGreen text-xl font-semibold mt-3">Sube un archivo CSV con los datos de la vía clínica</p>
            <p className="text-blueGreen text-xl font-semibold mt-3">Recuerda que el CSV debe tener las siguientes columnas: nombre, descripcion, etapa, orden</p>
            <p className="text-blueGreen text-xl font-semibold mt-3">Puedes descargar un ejemplo de CSV <CSVLink
                            data={data}
                            filename={"ejemplo.csv"}
                            enclosingCharacter={``}
                            separator={";"}
                            className=" text-blueGreen font-extrabold  hover:underline transition"
                            headers={headers}
                            aria-label="Descargar ejemplo datos de la vía clínica"
                        >
                            aquí</CSVLink> para que puedas ver el formato correcto</p>
            <p className="text-blueGreen text-xl font-semibold mt-3">Una vez subido el CSV, se generará un grafo con la vía clínica</p>
            <p className="text-blueGreen text-xl font-semibold mt-3">Después deberás asignar las tareas a las fases, establecer su tipo y definir las posibles etiquetas de la vía</p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-5 mb-5">
                <label className="flex items-center gap-3 cursor-pointer bg-gray-100 border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition">
                    <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    />
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v16h16V4H4zm8 4v8m0 0l-3-3m3 3l3-3" />
                    </svg>
                    <span className="text-gray-700 font-medium">
                    {selectedFileName ? selectedFileName : "Seleccionar archivo CSV"}
                    </span>
                </label>

                <button
                    className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg opacity-90 hover:opacity-100 transition"
                    onClick={handleButtonClick}
                >
                    Subir CSV
                </button>
            </div>
        </div>
  ) : (
    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
          <img src={"/logo.svg"} alt="Logo" />
          <h1 className="text-blueGreen text-7xl font-semibold">Cargando...</h1>
          <h2 className="text-blueGreen text-3xl font-semibold mt-4">Generando el grafo...</h2>
          <p className="text-blueGreen text-xl font-semibold mt-3">Esto puede tardar unos segundos, por favor espera...</p>
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-orangeSalud"></div>
      </div>
  )
}
