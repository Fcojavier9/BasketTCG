# Etapa de construcción de la aplicación frontend
FROM node as builder

ENV NODE_VERSION 20.11.1

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app
COPY ./ /app

ENV NODE_OPTIONS=--max-old-space-size=8192
RUN npm install
RUN npm install react-router-dom
RUN npm run build

# Instala Vite de forma global
RUN npm install -g vite

# Instala @rollup/rollup para construcción
RUN npm install @rollup/rollup

#Instala la libreria Mui(https://mui.com)
RUN npm install @mui/material @emotion/react @emotion/styled

# Comando para iniciar la aplicación Vite (solo para desarrollo)
CMD ["npm", "run", "dev"]

# Etapa de producción: copia los archivos de construcción al contenedor NGINX
FROM nginx

# Copia los archivos de construcción desde el contenedor de construcción
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf