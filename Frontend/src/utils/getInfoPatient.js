import { Global } from "../global/globalUrl";

async function getInfoPatient(id) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(Global.url+"/patient/getOnePatient/"+id,  {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
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

export { getInfoPatient };