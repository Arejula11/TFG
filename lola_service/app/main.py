from fastapi import FastAPI, Body
from fastapi.responses import PlainTextResponse
import subprocess
import os
import uuid

app = FastAPI()

@app.post("/analyze", response_class=PlainTextResponse)
async def analyze_lola(model_text: str = Body(..., embed=True)):
    temp_path = f"/tmp/{uuid.uuid4()}.lola"

    # Guardar el modelo en un archivo temporal
    with open(temp_path, "w") as f:
        f.write(model_text)

    try:
        script_path = os.path.join(os.path.dirname(__file__), "analyze.sh")
        result = subprocess.run([script_path, temp_path], capture_output=True, text=True, timeout=10)
        output = result.stdout + result.stderr
    except Exception as e:
        output = f"Execution failed: {e}"

    # os.remove(temp_path)
    return output
