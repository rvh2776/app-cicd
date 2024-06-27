#!/bin/bash

echo "Actualizando app..."

#? Cargar solo las variables específicas del archivo .env
# export $(grep -E '^(DB_HOST|DB_NAME|DB_USER|DB_PASSWORD)=' .env | xargs)

#* Cargar solo las variables específicas del archivo .env
# set -a
# source .env
# set +a

#? Llamo a setup.sh para crear la red-docker y volume si es que no existen.
# ./setup.sh


# # Nombre del contenedor
# CONTAINER_NAME=my_app_container

# # Nombre de la imagen Docker
# IMAGE_NAME=myusername/nest-demo:latest

# # Pull de la última imagen
# docker pull $IMAGE_NAME

# # Parar y eliminar el contenedor actual
# docker stop $CONTAINER_NAME
# docker rm $CONTAINER_NAME

# # Correr un nuevo contenedor con la nueva imagen
# docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME


echo "App actualizada con exito"
#? El script tiene que tener permisos de ejecucion: chmod +x /path/to/your/update_script.sh