const axios = require('axios');

const API_URL = 'http://localhost:3000/';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tYnJlIjoiTWFyaW8gTG9wZXoiLCJyb2xlIjpmYWxzZSwiaWF0IjoxNzM5MTIyNzI4LCJleHAiOjE3NzA2ODAzMjh9.6iChvWpqIxuXnPFSgOHMHX28xywbs7UCzgQGqabAnlE";


const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL+ "user/createUser", userData);
        // console.log('User created:', response.data);
    } catch (error) {
        console.error('Error creating user:', error.response?.data || error.message);
    }
};



const createFase = async (faseData) => {
    try {
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.post(API_URL+ "fases", faseData, config);
        // console.log('Task created:', response.data);
    } catch (error) {
        console.error('Error creating fase:', error.response?.data || error.message);
    }
}


const createTask = async (taskData) => {
    try {
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.post(API_URL+ "tareas", taskData, config);
        // console.log('Task created:', response.data);
    } catch (error) {
        console.error('Error creating task:', error.response?.data || error.message, taskData);
    }
};

const createEtiqueta = async (etiquetaData) => {
    try {
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await axios.post(API_URL+ "etiquetas", etiquetaData, config);
        // console.log('Etiqueta created:', response.data);
    } catch (error) {
        console.error('Error creating etiqueta:', error.response?.data || error.message);
    }
}



///User objects
//-----------------------------------------------------------------
const userData = {
    nombre: 'admin',
    username: 'admin',
    password: 'admin',
    esadmin: true
};

const userData2 = {
    nombre: 'Miguel Aréjula',
    username: 'marejula',
    password: 'marejula',
    esadmin: false
};



//Fases objects
//-----------------------------------------------------------------
const planifiacionRodilla = {
    "nombre": "Planificación",
    "idvia": 1,
}
const planifiacionCadera = {
    "nombre": "Planificación",
    "idvia": 2,
}
const ingresoRodilla = {
    "nombre": "Ingreso",
    "idvia": 1,
}
const ingresoCadera = {
    "nombre": "Ingreso",
    "idvia": 2,
}
const quirofanoRodilla = {
    "nombre": "Quirófano",
    "idvia": 1,
}
const quirofanoCadera = {
    "nombre": "Quirófano",
    "idvia": 2,
}
const postCirRodilla = {
    "nombre": "Post-cirugía",
    "idvia": 1,
}
const postCirCadera = {
    "nombre": "Post-cirugía",
    "idvia": 2,
}
const primerDiaRodilla = {
    "nombre": "Primer Día",
    "idvia": 1,
}
const primerDiaCadera = {
    "nombre": "Primer Día",
    "idvia": 2,
}
const segundoDiaRodilla = {
    "nombre": "Segundo Día",
    "idvia": 1,
}
const segundoDiaCadera = {
    "nombre": "Segundo Día",
    "idvia": 2,
}
const postoperatorioRodilla = {
    "nombre": "Post-operatorio",
    "idvia": 1,
}
const postoperatorioDiaCadera = {
    "nombre": "Post-operatorio",
    "idvia": 2,
}


const viaRodilla = 0;
const viaCadera = 7;
//Tareas objects
//-----------------------------------------------------------------
const tareasPlanificacionRodilla = [
    {
        "descripcion": "Verificar documentación completa en historia clínica electrónica (HCE)",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"   
    },
    {
        "descripcion": "Consentimiento informado",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Planficar fecha de la intervención y revisión por anestesia",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar que ha sido valorada por anestesia y posibles incidencias",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar medicación habitual del paciente y comorbilidades",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar pruebas complementarias y/o interconsultas interservicio",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Evaluar hemograma y pautar si procede de prevención de transfusión",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar material",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitud de banco de tejidos si procede",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Revisión de consentimiento informado",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Actualización de pruebas complementarias si procede: Rx de control",
        "id_fase": viaRodilla + 1,
        "tipo": "booleano"
    }
]
const tareasIngresoRodilla = [
    {
        "descripcion": "Verificar documentación completa HCE",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar que ha sido valorado por anestesia",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar si tiene consentimiento informado",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Valorar la existencia de procesos patológicos intercurrentes durante su periodo de liste de espera quirúrgica (LEQ) (incluidas nuevas alergias)",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Atención especial ante infecciones urinarias en las 4-6 semanas previas",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Realizar si procede estudio analítico urgente",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Planificación y comprobación de la técnica quirúrgica y material",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar profilaxis antibiótica",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar profilaxis con heparina de bajo peso molecular (HBPM)",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar o suspender si es necesario otra medicación, especificar",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Señalar marcar el lado que se va a intervenir (rotulador indeleble)",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "El paciente se duchará antes de la IQ",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Rasurado previo a IQ",
        "id_fase": viaRodilla + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Premedicación",
        "id_fase": viaRodilla + 2,
        "tipo": "opciones",
        "opciones": [
            "Profilaxis AB",
            "HBPM",
            "Modificar TTo"
        ]
    }
]
const tareasQuirofanoRodilla = [
    {
        "descripcion": "Comprobar preparación por enfermería en ante quirófano",
        "id_fase": viaRodilla + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar que se acompaña la dosis correspondiente de profilaxis AB",
        "id_fase": viaRodilla + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Realizar Checklist (comprobar la correcta identificación del paciente, lado de la cirugía, consentimientos informados, disposición de medios materiales y personales)",
        "id_fase": viaRodilla + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Infiltración capsular",
        "id_fase": viaRodilla + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Ácido tranexámico",
        "id_fase": viaRodilla + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Bloqueo periférico",
        "id_fase": viaRodilla + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Implante fémur",
        "id_fase": viaRodilla + 3,
        "tipo": "numerico" 
    },
    {
        "descripcion": "Implante tibia",
        "id_fase": viaRodilla + 3,
        "tipo": "numerico" 
    },
    {
        "descripcion": "PE",
        "id_fase": viaRodilla + 3,
        "tipo": "opciones",
        "opciones": [
            "PS",
            "UC",
            "CR",
            "CPS",
            "CK",
            "Bisagra"
        ]
    },
    {
        "descripcion": "Vástago",
        "id_fase": viaRodilla + 3,
        "tipo": "numerico"
    },
    {
        "descripcion": "Inserto",
        "id_fase": viaRodilla + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Cotilo",
        "id_fase": viaRodilla + 3,
        "tipo": "booleano"
    }
]
const tareasPostCirRodilla = [
    {
        "descripcion": "Pautar analgesia",
        "id_fase": viaRodilla + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar profilaxis antibiótica postoperatoria",
        "id_fase": viaRodilla + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Reinicio de dieta",
        "id_fase": viaRodilla + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Reinicio de tromboprofilaxis",
        "id_fase": viaRodilla + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar analítica de control",
        "id_fase": viaRodilla + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar Rx de control",
        "id_fase": viaRodilla + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Realizar protocolo quirúrgico",
        "id_fase": viaRodilla + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar recomendaciones de cirujano en HCE",
        "id_fase": viaRodilla + 4,
        "tipo": "booleano"
    }
]
const tareasPrimerDiaRodilla = [
    {
        "descripcion": "Control de cura",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de diuresis",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de trofismo distal",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de drenajes",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Retirada de drenajes",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar controles analíticos",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Retirar fluidoterapia si procede",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Retirar redones",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar protocolo de quimioprofilaxis",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar Rx control",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar diuresis",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar tolerancia oral",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Levantar cama y sentar en silla alta (no sillón)",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar ejercicios isométricos y de movilidad",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar HC a RHB si procede",
        "id_fase": viaRodilla + 5,
        "tipo": "booleano"
    }
]
const tareasSegundoDiaRodilla = [
    {
        "descripcion": "Realizar revisión cura de la herida",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de diuresis",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de trofismo distal",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de drenajes",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Retirada de drenajes",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Autorizar primeros pasos con bastones ingleses/andador",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Prescripción ortoprotésica si procede",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar disponibilidad del suplemento para WC",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Evaluar alta hospitalaria",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Tratamiento al alta",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Analgesia",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Tromboprofilaxis",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitud de cita en consultas externas",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitud de Rx si procede",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Baja laboral",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitud de ambulancia",
        "id_fase": viaRodilla + 6,
        "tipo": "booleano"
    }
]
const tareasPostoperatorioRodilla = [
    {
        "descripcion": "Alineación",
        "id_fase": viaRodilla + 7,
        "tipo": "opciones",
        "opciones": [
            "Buena",
            "Varo",
            "Valgo"
        ]
    },
    {
        "descripcion": "Estabilidad",
        "id_fase": viaRodilla + 7,
        "tipo": "opciones",
        "opciones": [
            "Buena",
            "Inestable en flexión",
            "Inestable en extensión"
        ]
    },
    {
        "descripcion": "Dolorosa",
        "id_fase": viaRodilla + 7,
        "tipo": "booleano"
    },
    {
        "descripcion": "Rango de movimiento",
        "id_fase": viaRodilla + 7,
        "tipo": "opciones",
        "opciones": [
            "<0-90º",
            "0-90º",
            ">0-90º"
        ]
    },
    {
        "descripcion": "Movilización",
        "id_fase": viaRodilla + 7,
        "tipo": "booleano"
    },
    {
        "descripcion": "Movilización",
        "id_fase": viaRodilla + 7,
        "tipo": "opciones",
        "opciones": [
            "Séptica",
            "Aseptica"
        ]
    },
    {
        "descripcion": "Reintervención",
        "id_fase": viaRodilla + 7,
        "tipo": "booleano"
    }
]


const tareasPanificacionCadera = [
    {
        "descripcion": "Verificar documentación completa en historia clínica electrónica (HCE)",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"   
    },
    {
        "descripcion": "Consentimiento informado",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Planficar fecha de la intervención y revisión por anestesia",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar que ha sido valorada por anestesia y posibles incidencias",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar medicación habitual del paciente y comorbilidades",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar pruebas complementarias y/o interconsultas interservicio",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Evaluar hemograma y pautar si procede de prevención de transfusión",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar material",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitud de banco de tejidos si procede",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Revisión de consentimiento informado",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    },
    {
        "descripcion": "Actualización de pruebas complementarias si procede: Rx de control",
        "id_fase": viaCadera + 1,
        "tipo": "booleano"
    }
]
const tareasIngresoCadera = [
    {
        "descripcion": "Verificar documentación completa HCE",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar que ha sido valorado por anestesia",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar si tiene consentimiento informado",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Valorar la existencia de procesos patológicos intercurrentes durante su periodo de liste de espera quirúrgica (LEQ) (incluidas nuevas alergias)",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Atención especial ante infecciones urinarias en las 4-6 semanas previas",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Realizar si procede estudio analítico urgente",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Planificación y comprobación de la técnica quirúrgica y material",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar profilaxis antibiótica",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar profilaxis con heparina de bajo peso molecular (HBPM)",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar o suspender si es necesario otra medicación, especificar",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Señalar marcar el lado que se va a intervenir (rotulador indeleble)",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "El paciente se duchará antes de la IQ",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Rasurado previo a IQ",
        "id_fase": viaCadera + 2,
        "tipo": "booleano"
    },
    {
        "descripcion": "Premedicación",
        "id_fase": viaCadera + 2,
        "tipo": "opciones",
        "opciones": [
            "Profilaxis AB",
            "HBPM",
            "Modificar TTo"
        ]
    }
]
const tareasQuirofanoCadera = [
    {
        "descripcion": "Comprobar preparación por enfermería en ante quirófano",
        "id_fase": viaCadera + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar que se acompaña la dosis correspondiente de profilaxis AB",
        "id_fase": viaCadera + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Realizar Checklist (comprobar la correcta identificación del paciente, lado de la cirugía, consentimientos informados, disposición de medios materiales y personales)",
        "id_fase": viaCadera + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Infiltración capsular",
        "id_fase": viaCadera + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Ácido tranexámico",
        "id_fase": viaCadera + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Bloqueo periférico",
        "id_fase": viaCadera + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Implante fémur",
        "id_fase": viaCadera + 3,
        "tipo": "numerico" 
    },
    {
        "descripcion": "Implante tibia",
        "id_fase": viaCadera + 3,
        "tipo": "numerico" 
    },
    {
        "descripcion": "PE",
        "id_fase": viaCadera + 3,
        "tipo": "opciones",
        "opciones": [
            "PS",
            "UC",
            "CR",
            "CPS",
            "CK",
            "Bisagra"
        ]
    },
    {
        "descripcion": "Vástago",
        "id_fase": viaCadera + 3,
        "tipo": "numerico"
    },
    {
        "descripcion": "Inserto",
        "id_fase": viaCadera + 3,
        "tipo": "booleano"
    },
    {
        "descripcion": "Cotilo",
        "id_fase": viaCadera + 3,
        "tipo": "booleano"
    }
]
const tareasPostCirCadera = [
    {
        "descripcion": "Pautar analgesia",
        "id_fase": viaCadera + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar profilaxis antibiótica postoperatoria",
        "id_fase": viaCadera + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Reinicio de dieta",
        "id_fase": viaCadera + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Reinicio de tromboprofilaxis",
        "id_fase": viaCadera + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar analítica de control",
        "id_fase": viaCadera + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar Rx de control",
        "id_fase": viaCadera + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Realizar protocolo quirúrgico",
        "id_fase": viaCadera + 4,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar recomendaciones de cirujano en HCE",
        "id_fase": viaCadera + 4,
        "tipo": "booleano"
    }
]
const tareasPrimerDiaCadera = [
    {
        "descripcion": "Control de cura",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de diuresis",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de trofismo distal",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de drenajes",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Retirada de drenajes",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Verificar controles analíticos",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Retirar fluidoterapia si procede",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Retirar redones",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar protocolo de quimioprofilaxis",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar Rx control",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar diuresis",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar tolerancia oral",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Levantar cama y sentar en silla alta (no sillón)",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Pautar ejercicios isométricos y de movilidad",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitar HC a RHB si procede",
        "id_fase": viaCadera + 5,
        "tipo": "booleano"
    }
]
const tareasSegundoDiaCadera = [
    {
        "descripcion": "Realizar revisión cura de la herida",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de diuresis",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de trofismo distal",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Vigilancia de drenajes",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Retirada de drenajes",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Autorizar primeros pasos con bastones ingleses/andador",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Prescripción ortoprotésica si procede",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Comprobar disponibilidad del suplemento para WC",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Evaluar alta hospitalaria",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Tratamiento al alta",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Analgesia",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Tromboprofilaxis",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitud de cita en consultas externas",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitud de Rx si procede",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Baja laboral",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    },
    {
        "descripcion": "Solicitud de ambulancia",
        "id_fase": viaCadera + 6,
        "tipo": "booleano"
    }
]
const tareasPostoperatorioCadera = [
    {
        "descripcion": "Alineación",
        "id_fase": viaCadera + 7,
        "tipo": "opciones",
        "opciones": [
            "Buena",
            "Varo",
            "Valgo"
        ]
    },
    {
        "descripcion": "Estabilidad",
        "id_fase": viaCadera + 7,
        "tipo": "opciones",
        "opciones": [
            "Buena",
            "Inestable en flexión",
            "Inestable en extensión"
        ]
    },
    {
        "descripcion": "Dolorosa",
        "id_fase": viaCadera + 7,
        "tipo": "booleano"
    },
    {
        "descripcion": "Rango de movimiento",
        "id_fase": viaCadera + 7,
        "tipo": "opciones",
        "opciones": [
            "<0-90º",
            "0-90º",
            ">0-90º"
        ]
    },
    {
        "descripcion": "Movilización",
        "id_fase": viaCadera + 7,
        "tipo": "booleano"
    },
    {
        "descripcion": "Movilización",
        "id_fase": viaCadera + 7,
        "tipo": "opciones",
        "opciones": [
            "Séptica",
            "Aseptica"
        ]
    },
    {
        "descripcion": "Reintervención",
        "id_fase": viaCadera + 7,
        "tipo": "booleano"
    }
]

const etiquetas = [
    {
    "nombre": "Artoplastia primera derecha",
    "idvia": 1
    },
    {
        "nombre": "Artoplastia primera derecha",
        "idvia": 2
    },
    {
    "nombre": "Artoplastia primera izquierda",
    "idvia": 1
    },
    {
        "nombre": "Artoplastia primera izquierda",
        "idvia": 2
    },
    {
    "nombre": "Artoplastia de recambio derecha",
    "idvia": 1
    },
    {
        "nombre": "Artoplastia de recambio derecha",
        "idvia": 2
    },
    {
    "nombre": "Artoplastia de recambio izquierda",
    "idvia": 1
    },
    {
        "nombre": "Artoplastia de recambio izquierda",
        "idvia": 2
    }
]

// Función para ejecutar las funciones en orden
async function poblarBaseDeDatos() {
    try {
      // Crear usuarios
      await createUser(userData);
      await createUser(userData2);
  
      // Crear fases (en orden)
      await createFase(planifiacionRodilla);
      await createFase(ingresoRodilla);
      await createFase(quirofanoRodilla);
      await createFase(postCirRodilla);
      await createFase(primerDiaRodilla);
      await createFase(segundoDiaRodilla);
      await createFase(postoperatorioRodilla);
      await createFase(planifiacionCadera);
      await createFase(ingresoCadera);
      await createFase(quirofanoCadera);
      await createFase(postCirCadera);
      await createFase(primerDiaCadera);
      await createFase(segundoDiaCadera);
      await createFase(postoperatorioDiaCadera);
  
      // Crear tareas (en orden)
      for (const tarea of tareasPlanificacionRodilla) {
        await createTask(tarea);
      }
      for (const tarea of tareasIngresoRodilla) {
        await createTask(tarea);
      }
      for (const tarea of tareasQuirofanoRodilla) {
        await createTask(tarea);
      }
      for (const tarea of tareasPostCirRodilla) {
        await createTask(tarea);
      }
      for (const tarea of tareasPrimerDiaRodilla) {
        await createTask(tarea);
      }
      for (const tarea of tareasSegundoDiaRodilla) {
        await createTask(tarea);
      }
      for (const tarea of tareasPostoperatorioRodilla) {
        await createTask(tarea);
      }
      for (const tarea of tareasPanificacionCadera) {
        await createTask(tarea);
      }
      for (const tarea of tareasIngresoCadera) {
        await createTask(tarea);
      }
      for (const tarea of tareasQuirofanoCadera) {
        await createTask(tarea);
      }
      for (const tarea of tareasPostCirCadera) {
        await createTask(tarea);
      }
      for (const tarea of tareasPrimerDiaCadera) {
        await createTask(tarea);
      }
      for (const tarea of tareasSegundoDiaCadera) {
        await createTask(tarea);
      }
      for (const tarea of tareasPostoperatorioCadera) {
        await createTask(tarea);
      }
    // Crear etiquetas
    for (const etiqueta of etiquetas) {
        await createEtiqueta(etiqueta);
    }
      console.log('Base de datos poblada exitosamente.');
    } catch (error) {
      console.error('Error al poblar la base de datos:', error);
    }
  }
  
  // Llamar a la función principal
  poblarBaseDeDatos();
  