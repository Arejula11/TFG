# Build Stage
FROM node:18 AS build

WORKDIR /client

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build the app
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:1.27

# Copy the build output from the build stage to Nginx's default directory
COPY --from=build /client/dist /usr/share/nginx/html

# Expose the port and run Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
