import { Global } from "../global/globalUrl";

async function updateVia(params) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${Global.url}/operacion/updateEstado`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
}


const updateNameVia = async (viaId, newName) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${Global.url}/vias/${viaId}/name`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre: newName })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
};

export { updateVia, updateNameVia };