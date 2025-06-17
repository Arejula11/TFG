# Etapa de construcción
FROM node:18 AS build

WORKDIR /client

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y compilar la app
COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:1.27

# Copiar archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos generados por Vite al directorio de Nginx
COPY --from=build /client/dist /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
