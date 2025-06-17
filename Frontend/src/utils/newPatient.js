import { Global } from "../global/globalUrl";

async function postNewPatientData(patientData) {
    

    const user = {
        "nombre": patientData.nombre,
        "numhist": patientData.numeroHistoria,
        "sexo": patientData.sexo,
    }
    const token = localStorage.getItem('token');
    try {
        
        const response = await fetch(Global.url+"/patient/addPatient", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(user)
        });
        // console.log("primera respuesta:",response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // const data = await response.json();
        // console.log("segunda respuesta:",data);
        return response;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


async function postNewPatientDataNoIndex(patientData) {
    if(patientData.viaPaciente === "cadera"){
        patientData.viaPaciente = "2";
    }else{
        patientData.viaPaciente = "1";
    }
    const user = {
        "nombre": patientData.nombre,
        "numhist": patientData.numeroHistoria,
        "edad": patientData.edad,
        "sexo": patientData.sexo,
        "indice": patientData.indiceMasaCorporal,
        "operacion": patientData.viaPaciente
    }

    try {
        const response = await fetch(Global.url+"/patient/addPatientNoIndex", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        // console.log("primera respuesta:",response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // const data = await response.json();
        // console.log("segunda respuesta:",data);
        return response;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export { postNewPatientData, postNewPatientDataNoIndex };