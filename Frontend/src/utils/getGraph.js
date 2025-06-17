import { Global } from "../global/globalUrl";
import axios from 'axios';

//Función para enviar los datos en csv y obtener el grafo
async function getGraph(file) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(
            Global.url + "/vias/data",
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );
        return response;
        
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error; // Re-throw the error to be handled by the calling function
    }
}

export { getGraph };