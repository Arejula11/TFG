import { Radio, RadioGroup } from "@heroui/react"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { postNewPatientData } from "../utils/newPatient"




export const NewPacient = () => {

  let response;


  const navigate = useNavigate()

  const [nombre, setNombre] = useState('');
  const [numeroHistoria, setNumeroHistoria] = useState('');
  const [sexo, setSexo] = useState('true'); // Default value



  //Función para enviar el formulario
  const onSubmitForm = async (e) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page
    if (!nombre || !numeroHistoria  || !sexo) {
      alert("Por favor, llene los campos obligatorios");
      return;
    }else if (numeroHistoria.length !== 6) {
      alert("Por favor, ingrese un número de historia válido");
      return;
    }

    

      response = await postNewPatientData({nombre, numeroHistoria, sexo});
    
    
    // console.log("response en jsx",response);
    if (!response.ok) {
      alert("Ha ocurrido un error al guardar los datos");
      return;
    }
    
    // setVia({
    //   //viaplanifiacion
    // verificardocs : null,
    // consentimientoinformado : null,
    // planificar : null,
    // verificaranestesia : null,
    // verificarmedicacion : null,
    // solicitarmaterial : null,
    // solicitudtejidos : null,
    // revisionconsentimiento : null,
    // actualizacionpruebas : null,
    // solicitarpruebas : null,
    // evaluar : null,

    // //viaingreso
    // verificardocumentacion : null,
    // valoracionanestesia : null,
    // verificarconsentimientoinformado : null,
    // valorarprocesospatologicos : null,
    // atencioninfecciones : null,
    // realizarestudioanalitico : null,
    // planificaciontecnica : null,
    // pautarprofilaxis : null,
    // pautarprofilaxisheparina : null,
    // pautarmedicacion : null,
    // senalarlado : null,
    // duchaprevia : null,
    // rasuradoprevio : null,
    // premedicacion : null, //varchar(15)

    // //viaquirofano
    // preparacionenfermeria : null,
    // acompanardosis : null,
    // realizarchecklist : null,
    // infiltracioncapsular : null,
    // acidotranexamico : null,
    // bloqueoperiferico : null,

    // //viapostcirugia
    // pautaranalgesia : null,
    // pautarprofilaxispost : null,
    // reiniciodieta : null,
    // reiniciotromboprofilaxis : null,
    // solicitaranalitica : null,
    // solicitarrx : null,
    // realizarprotocolo : null,
    // pautarrecomendaciones : null,

    // //viaprimerdia
    // verificarcontroles : null,
    // retirarfluidoterapia : null,
    // retirarredones : null,
    // comprobarquimioprofilaxis : null,
    // comprobarrx : null,
    // comprobardiuresis : null,
    // comprobartolerancia : null,
    // levantarcama : null,
    // pautarejercicios : null,
    // vigilanciadrenajes1 : null,
    // vigilanciadiuresis1 : null,
    // vigilanciatrofismo1 : null,
    // retiradadrenajes : null,
    // solicitarhc : null,
    // controlcura : null,

    // //viasegundodia
    // vigilanciadrenajes2 : null,
    // vigilanciadiuresis2 : null,
    // vigilanciatrofismo2 : null,
    // retiradadrenajes2 : null,
    // revisioncura : null,
    // autorizarpasos : null,
    // prescripcionortoprotesica : null,
    // disponibilidadsuplemento : null,
    // evaluaralta : null,
    // medicacionalta : null,
    // analgesia : null,
    // tromboprofilaxis : null,
    // citaconsultas : null,
    // rx : null,
    // bajalaboral : null,
    // ambulancia : null,
    // });

    navigate(`/paciente/info/${numeroHistoria}`);

  };

  return (
    <div className="w-full h-full flex flex-col items-center align-middle justify-center">
      <h1 className="text-blueGreen text-5xl font-semibold">Nuevo paciente</h1>
      <form className="w-1/3 h-5/8 bg-[#F3F4F6] bg-opacity-20 border-2 border-blueGreen rounded-sm p-5 mt-5 flex flex-col" onSubmit={onSubmitForm}>
        <label className="block text-blueGreen font-bold">Nombre</label>
        <input className="w-full h-10 bg-black bg-opacity-5 border-2 border-blueGreen rounded-sm p-2" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        
        <label className="block text-blueGreen font-bold mt-2">Número de historia</label>
        <input className="w-full h-10 bg-black bg-opacity-5 border-2 border-blueGreen rounded-sm p-2" type="number" value={numeroHistoria} onChange={(e) => setNumeroHistoria(e.target.value)} />
        
        
        <label className="block text-blueGreen font-bold mt-2">Sexo</label>
        <RadioGroup name="sexo" value={sexo} onValueChange={setSexo} className="p-2">
          <Radio value="true" color="primary" size="lg">Masculino</Radio>
          <Radio value="false" color="primary" size="lg">Femenino</Radio>
        </RadioGroup>        
        
        <button className="bg-blueGreen text-white font-bold px-5 py-2 rounded-sm mt-5 opacity-90 hover:opacity-100 w-[40%] self-center" type="submit">Guardar</button>
      </form>
    
    
    </div>
  )
}
