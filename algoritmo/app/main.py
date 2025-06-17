from fastapi import FastAPI, File, UploadFile
import subprocess
import os
import shutil
import re

app = FastAPI()

UPLOAD_FOLDER = "/tmp/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def read_root():
    return {"message": "Microservicio de algoritmo funcionando correctamente 🚀"}


@app.post("/run-algorithm")
async def run_algorithm(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Guarda el archivo temporalmente
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Ejecuta tu script Python con el archivo como argumento
    try:
        result = subprocess.run(
            ["python", "app/algoritmo.py", file_path],
            capture_output=True,
            text=True,
            check=True
        )
        output = result.stdout

        # Limpia el archivo temporal
        os.remove(file_path)
        # Devuelve el resultado del algoritmo procesado para obtener el grafo
        with open("grafo", "r") as graph_file:
            cleaned_graph = graph_file.read()
            lines = cleaned_graph.splitlines()
            cleaned_lines = [line for line in lines if not line.strip().startswith("//")]
            cleaned_graph = "\n".join(cleaned_lines)
        with open("PetriNet.lola", "r") as petri_file:
            petri_net = petri_file.read()
        # cleaned_graph = re.sub(r'\s+', ' ', cleaned_graph).strip()
        # petri_net = re.sub(r'\s+', ' ', petri_net).strip()


    except subprocess.CalledProcessError as e:
        return {"error": e.stderr}
    return {"result": cleaned_graph, "petri_net": petri_net}
