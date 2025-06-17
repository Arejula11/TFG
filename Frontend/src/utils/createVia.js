import { Global } from "../global/globalUrl";

async function createVia(viaData) {
    
    const token = localStorage.getItem('token');
    try {
        
        const response = await fetch(Global.url+"/vias", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(viaData)
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



export { createVia };