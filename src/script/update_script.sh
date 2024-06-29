#!/bin/bash

GREEN='\033[0;32m'
ROJO="\033[;31m"
BLUE='\033[0;34m'
CLEAR="\033[0m"

echo
echo "--------------------------------------------------"
echo -e "${BLUE} Inicio de actualización. ${CLEAR}"
echo

#? Cargar solo las variables específicas del archivo .env
# export $(grep -E '^(DB_HOST|DB_NAME|DB_USER|DB_PASSWORD)=' .env | xargs)

#* Cargar solo las variables específicas del archivo .env
# set -a
# source .env
# set +a

#? Cambiar directorio a la raíz del proyecto
cd "$(dirname "$0")/../../"

#? Ejecutar docker-compose down para detener y eliminar contenedores viejos
echo -e "${GREEN}   Detendiendo contenedores para actualizar... ${CLEAR}"
docker-compose down

#? Pull de la última imagen
echo -e "${GREEN}   Descargando imagen actualizada... ${CLEAR}"
docker-compose pull

#? Ejecutar docker-compose up en modo desapegado
echo -e "${GREEN}   Ejecutando actualización... ${CLEAR}"
docker-compose up -d


echo
echo -e "${BLUE} App actualizada con exito. ${CLEAR}"
echo "--------------------------------------------------"

#? El script tiene que tener permisos de ejecucion: chmod +x /path/to/your/update_script.sh