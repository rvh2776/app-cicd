#!/bin/bash

GREEN='\033[0;32m'
ROJO="\033[;31m"
BLUE='\033[0;34m'
CLEAR="\033[0m"

echo
echo "-----------------------------------------------------------------------------------------------"
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
echo -e "${GREEN}   Deteniendo contenedores para actualizar... ${CLEAR}"
docker-compose down

#? Pull de la última imagen
echo -e "${GREEN}   Descargando imagen actualizada... ${CLEAR}"
docker-compose pull

#? Ejecutar docker-compose up en modo desapegado
echo -e "${GREEN}   Ejecutando actualización... ${CLEAR}"
docker-compose up -d

#? Eliminar imágenes anteriores
echo -e "${GREEN}   Eliminando imágen anterior... ${CLEAR}"
echo
docker image prune -f
untagged: rvh2776/pm4-back@sha256:2c75d267c824f4faacdd6b677b5ba10609df499f33fd0b49a6d8691aacae59a7
echo
echo -e "${BLUE} App actualizada con exito. ${CLEAR}"
echo "-----------------------------------------------------------------------------------------------"

#? El script tiene que tener permisos de ejecucion: chmod +x /path/to/your/update_script.sh