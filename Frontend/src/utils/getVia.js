import { Global } from "../global/globalUrl";

async function getVia(id) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(Global.url+"/operacion/getOperacion/"+id,  {
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

async function getAllVias() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(Global.url+"/vias",  {
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


async function getViaName(id) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(Global.url+"/vias/"+id, {
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


const   getViaData = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(Global.url+"/data/"+id, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export { getVia, getAllVias, getViaName, getViaData };