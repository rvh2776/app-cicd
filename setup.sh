#!/bin/bash

echo "Ejecutando script: setup"
echo

# #* Cargar solo las variables específicas del archivo .env
set -a
source .env
set +a

# Nombre del volumen y la red
VOLUME=$VOLUME_NAME
NETWORK=$NETWORK_NAME

#Verificar si el volumen existe
if [ $(docker volume ls -q -f name=${VOLUME}) ]; then
  echo "El volumen: ${VOLUME} ya existe."
else
  echo "El volumen ${VOLUME} no existe, creándolo..."
  docker volume create ${VOLUME}
  echo
fi

# Verificar si la red existe
if [ $(docker network ls -q -f name=${NETWORK}) ]; then
  echo "La red: ${NETWORK} ya existe."
  echo
else
  echo "La red ${NETWORK} no existe, creándola..."
  docker network create ${NETWORK}
  echo
fi

echo "Seteando permisos de ejecución: update_script"
chmod +x update_script.sh

echo
echo "Setup finalizado con éxito"


