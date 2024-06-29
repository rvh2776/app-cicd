#!/bin/bash

GREEN='\033[0;32m'
ROJO="\033[;31m"
BLUE='\033[0;34m'
CLEAR="\033[0m"

echo -e "-----------------------------------------------------"
echo -e "${BLUE} Inicio de configuración de entorno. ${CLEAR}"
echo

# #* Cargar solo las variables específicas del archivo .env
set -a
source .env
set +a

# Nombre del volumen y la red
VOLUME=$VOLUME_NAME
NETWORK=$NETWORK_NAME
FILE="src/script/update_script.sh"

#Verificar si el volumen existe
if [ $(docker volume ls -q -f name=${VOLUME}) ]; then
  echo -e "${GREEN}   El volumen: ${VOLUME} ya existe. ${CLEAR}"
else
  echo -e "${GREEN}   El volumen ${VOLUME} no existe, creándolo... ${CLEAR}"
  docker volume create ${VOLUME}
  echo
fi

# Verificar si la red existe
if [ $(docker network ls -q -f name=${NETWORK}) ]; then
  echo -e "${GREEN}   La red: ${NETWORK} ya existe. ${CLEAR}"
else
  echo -e "${GREEN}   La red ${NETWORK} no existe, creándola... ${CLEAR}"
  docker network create ${NETWORK}
fi

if [ -x "$FILE" ]; then
    echo -e "${GREEN}   update_script.sh ya tiene permisos de ejecución. ${CLEAR}"
else
    echo -e "${GREEN}   Seteando permisos de ejecución: update_script ${CLEAR}"
    chmod +x "$FILE"
fi

# echo -e "${GREEN}   Seteando permisos de ejecución: update_script ${CLEAR}"
# chmod +x update_script.sh

echo
echo -e "${BLUE} Setup finalizado con éxito. ${CLEAR}"
echo -e "-----------------------------------------------------"



