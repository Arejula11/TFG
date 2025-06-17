import { Global } from "../global/globalUrl";
//Función para enviar los datos en csv y obtener el grafo
async function getGraph(file) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(Global.url + "/vias/data", {
            method: "POST",
            body: formData,
            headers: {
            "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export { getGraph };