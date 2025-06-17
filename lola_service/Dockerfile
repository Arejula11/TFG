FROM ubuntu:latest
# Instala dependencias
RUN apt-get update && apt-get install -y \
    build-essential \
    wget \
    python3 \
    python3-pip \
    tar \
    gzip \
    gcc-9 \
    g++-9 \
    python3.12-venv \
    && rm -rf /var/lib/apt/lists/*

# Usa gcc-9 y g++-9 como predeterminados
RUN update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-9 100 && \
    update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-9 100


# Instala LoLA
WORKDIR /opt

ENV LOLA_VERSION=2.0
ENV LOLA_URL=https://theo.informatik.uni-rostock.de/storages/uni-rostock/Alle_IEF/Inf_THEO/images/tools_daten/lola-2.0.tar.gz

RUN wget ${LOLA_URL} && \
    tar -xzf lola-${LOLA_VERSION}.tar.gz && \
    cd lola-${LOLA_VERSION} && \
    ./configure && \
    make && \
    make install

# Copia el código FastAPI
WORKDIR /app
COPY ./app /app/app
RUN chmod +x /app/app/analyze.sh
COPY requirements.txt /app
RUN python3 -m venv /app/venv && \
    /app/venv/bin/pip install --no-cache-dir -r requirements.txt

# Expone el puerto
EXPOSE 8001

# Comando de arranque
# ...existing code...

# Comando de arranque
CMD ["/app/venv/bin/uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
