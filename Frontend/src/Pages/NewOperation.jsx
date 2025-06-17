import { useNavigate, useParams } from "react-router-dom";
import { getInfoPatient } from "../utils/getInfoPatient";
import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@heroui/react";
import { newOperation } from "../utils/newOperation";
import { getInfoEtiquetas } from "../utils/getInfoEtiquetas";
import { getAllVias } from "../utils/getVia";
import { ViaSearch } from "../Components/ViaSearch";

export const NewOperation = () => {
  const { id } = useParams();

  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [viaSelected, setViaSelected] = useState(null);
  const [indice, setIndice] = useState("");
  const [edad, setEdad] = useState("");
  const fecha = new Date();
  const [etiqueta, setEtiqueta] = useState("");
  const [etiquetasDB, setEtiquetasDB] = useState([]);
  const [etiquetasLoading, setEtiquetasLoading] = useState(false);
  const [vias, setVias] = useState([]);

  const navigate = useNavigate();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!viaSelected || !indice || !edad || !etiqueta) {
      alert("Por favor, llene los campos obligatorios");
      return;
    }
    setSubmitting(true);
    try {
      const operation = {
        indice,
        edad,
        fecha,
        etiqueta,
        idvia: viaSelected.id,
        numhist: id,
      };
      const response = await newOperation(operation);
      if (!response.ok) {
        alert("Ha ocurrido un error al guardar los datos");
        return;
      }
      navigate(`/paciente/info/${id}`);
    } catch (err) {
      alert("Error al guardar la operación");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [fetchedInfo, fetchedVias] = await Promise.all([
          getInfoPatient(id),
          getAllVias(),
        ]);
        setInfo(fetchedInfo);
        setVias(fetchedVias);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchEtiquetas = async () => {
      if (!viaSelected || !viaSelected.id) {
        setEtiquetasDB([]);
        return;
      }
      setEtiquetasLoading(true);
      try {
        const etiquetas = await getInfoEtiquetas(viaSelected.id);
        setEtiquetasDB(etiquetas);
      } catch (error) {
        setEtiquetasDB([]);
        console.error("Error al obtener etiquetas:", error);
      } finally {
        setEtiquetasLoading(false);
      }
    };
    fetchEtiquetas();
  }, [viaSelected]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  const patient = info?.[0];

  return (
    <div className="w-full max-w-[80%] mx-auto p-6 bg-white shadow-lg rounded-xl mt-20">
      <h1 className="text-blueGreen text-3xl font-semibold border-b pb-2 mb-4">
        Información del Paciente
      </h1>
      <div className="space-y-2">
        <p className="text-[#374151] text-lg font-medium">
          Número de historia:{" "}
          <span className="font-normal text-[#111827]">{patient?.numhist || "-"}</span>
        </p>
        <p className="text-[#374151] text-lg font-medium">
          Nombre:{" "}
          <span className="font-normal text-[#111827]">{patient?.nombre || "-"}</span>
        </p>
        <p className="text-gray-700 text-lg font-medium">
          Sexo:{" "}
          <span className="font-normal text-[#111827]">
            {patient?.sexo === undefined
              ? "-"
              : patient.sexo
              ? "Hombre"
              : "Mujer"}
          </span>
        </p>
      </div>

      <h2 className="text-blueGreen text-2xl font-semibold border-b pb-2 mt-8">
        Nueva operación
      </h2>

      <div className="mt-4">
        <form onSubmit={onSubmitForm} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
                {/* BMI & Age */}
                <div className="border border-blueGreen p-4 rounded-md">
                <label className="block text-blueGreen font-semibold mb-2">Indice masa corporal</label>
                <input
                    type="number"
                    min="0"
                    required
                    value={indice}
                    onChange={(e) => setIndice(e.target.value)}
                    className="w-full p-2 border border-blueGreen rounded-md mb-4"
                />

                <label className="block text-blueGreen font-semibold mb-2">Edad</label>
                <input
                    type="number"
                    min="0"
                    required
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    className="w-full p-2 border border-blueGreen rounded-md"
                />
                </div>
                {/* Via Seleccionada */}
                <div className="border border-blueGreen p-4 rounded-md">
                    <label className="block text-blueGreen font-semibold mb-2">Vía seleccionada</label>
                    <input
                        value={viaSelected ? viaSelected.nombre : ""}
                        className="w-full p-2 border border-blueGreen rounded-md mt-2"
                        placeholder="Vía seleccionada"
                        readOnly
                        disabled
                        name="viaSelected"
                    />
                </div>

                {/* Etiquetas */}
                <div className="border border-blueGreen p-4 rounded-md">
                <label className="block text-blueGreen font-semibold mb-2">Etiquetas</label>
                {etiquetasLoading ? (
                    <p className="text-gray-500">Cargando etiquetas...</p>
                ) : etiquetasDB.length > 0 ? (
                    <RadioGroup
                    name="etiqueta"
                    value={etiqueta}
                    onValueChange={setEtiqueta}
                    className="space-y-2"
                    >
                    {etiquetasDB.map((et) => (
                        <Radio key={et.id} value={et.id} color="primary" size="lg">
                        {et.nombre}
                        </Radio>
                    ))}
                    </RadioGroup>
                ) : (
                    <input
                    disabled
                    className="w-full p-2 border border-blueGreen rounded-md bg-gray-100"
                    placeholder="Seleccione una vía primero"
                    />
                )}
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="h-full">
                <div className="border border-blueGreen p-4 rounded-md h-full">
                <label className="block text-blueGreen font-semibold">Buscar vía</label>
                <ViaSearch vias={vias} buttonInputChange={setViaSelected} />
                <input
                    type="hidden"
                    value={viaSelected ? viaSelected.id : ""}
                    name="idvia"
                />
                </div>
            </div>

            {/* Submit Button - Full Width Below */}
            <div className="col-span-full text-center mt-6">
                <button
                type="submit"
                disabled={submitting}
                className="bg-blueGreen text-white font-semibold py-2 px-6 rounded-md hover:opacity-90 disabled:opacity-50"
                >
                {submitting ? "Guardando..." : "Guardar"}
                </button>
            </div>
        </form>

      </div>
    </div>
  );
};