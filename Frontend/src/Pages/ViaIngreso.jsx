import { useParams } from "react-router-dom";
import { NavBar } from "../Components/NavBar"
import { Header } from "../Components/Header";
import { Radio, RadioGroup } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { ViaContext } from "../Context/ViaContext";

export const ViaIngreso = () => {
  const { id } = useParams();
  const { via, setVia } = useContext(ViaContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center align-middle justify-center">
        <h1 className="text-blueGreen text-7xl font-semibold">Cargando...</h1>
      </div>
    );
  }

  // Si no hay datos de ingreso, muestra mensaje
  if (!via.ingreso || !Array.isArray(via.ingreso)) {
    return (
      <div className="w-full h-full flex flex-col items-center align-middle justify-center">
        <NavBar id={id} />
        <Header Title={"Ingreso"} />
        <h1 className="text-red-600 text-3xl font-semibold">No hay datos de ingreso</h1>
      </div>
    );
  }

  // Si los labels vienen en el objeto via.ingreso, por ejemplo via.ingreso[i].label
  // Si no, puedes mostrar el id o un texto genérico
  return (
    <div className="w-full h-full flex flex-col items-center align-middle">
      <NavBar id={id} />
      <Header Title={"Ingreso"} />
      <div className="mt-5 grid grid-cols-1 gap-7 ml-40 ">
        {via.ingreso.map((item, idx) => (
          <div key={item.id} className="grid grid-cols-2 p-2 gap-x-20">
            <label className="text-xl max-w-[600px]">
              {item.label || item.descripcion || `Pregunta ${idx + 1}`}
            </label>
            {item.tipo === "booleano" && (
              <RadioGroup
                name={`ingreso${item.id}`}
                orientation="horizontal"
                value={item.estado}
                onValueChange={value => {
                  setVia(prevVia => ({
                    ...prevVia,
                    ingreso: prevVia.ingreso.map((q, i) =>
                      i === idx ? { ...q, estado: value } : q
                    )
                  }))
                }}
              >
                <Radio value={true} size="lg">Sí</Radio>
                <Radio value={false} size="lg">No</Radio>
              </RadioGroup>
            )}
            {item.tipo === "opciones" && Array.isArray(item.opciones) && (
              <RadioGroup
                name={`ingreso${item.id}`}
                orientation="vertical"
                value={item.estado}
                onValueChange={value => {
                  setVia(prevVia => ({
                    ...prevVia,
                    ingreso: prevVia.ingreso.map((q, i) =>
                      i === idx ? { ...q, estado: value } : q
                    )
                  }))
                }}
              >
                {item.opciones.map(opcion => (
                  <Radio key={opcion.id} value={opcion.id} size="lg">{opcion.descripcion}</Radio>
                ))}
              </RadioGroup>
            )}
            {item.tipo === "numerico" && (
              <input
                type="number"
                className="border rounded px-2 py-1 mt-2 w-32"
                value={item.estado ?? ""}
                onChange={e => {
                  const value = e.target.value === "" ? null : Number(e.target.value);
                  setVia(prevVia => ({
                    ...prevVia,
                    ingreso: prevVia.ingreso.map((q, i) =>
                      i === idx ? { ...q, estado: value } : q
                    )
                  }))
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}