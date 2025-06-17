import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';

export const DataDoctor = () => {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();


  const manejarGenerarPDF = () => {
    const doc = new jsPDF();

    doc.text('Usuario: ' + data.usuario, 20, 20);
    doc.text('Contraseña: ' + data.usuario, 20, 30);
    

    const nameFile = data.usuario + '.pdf';
    doc.save(nameFile);
  };

  const volverInicio = () => {
    navigate("/adminHome");
  };

  return (
    <>
    <button className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-4 ml-4 -mb-4 opacity-90 hover:opacity-100" onClick={volverInicio}>Inicio</button>
    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
    <h2 className="text-blueGreen text-5xl mt-3">El usuario se ha creado correctamente,</h2>
      <h2 className="text-blueGreen text-5xl "> sus credenciales son:</h2>
    <p className="text-black text-xl mt-3">Usuario: {data.usuario}</p>
    <p className="text-black text-xl ">Contraseña: {data.usuario}</p>
    <button className="bg-orangeSalud text-white font-bold px-5 py-2 rounded-lg mt-2 opacity-90 hover:opacity-100" onClick={manejarGenerarPDF}>Generar PDF</button>
  </div>
  </>
  )
}
