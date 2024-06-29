#!/bin/bash

# Variables
CONTAINER_NAME="app-cicd_postgres-db_1"
DB_USER="rafael"
BACKUP_FILE="backup.sql"

# Extraer los nombres de las bases de datos del archivo de respaldo
DB_NAMES=$(grep -oP '(?<=CREATE DATABASE )\w+' $BACKUP_FILE)

# Crear cada base de datos si no existe
for DB_NAME in $DB_NAMES; do
  echo "Creando base de datos: $DB_NAME"
  docker exec -i $CONTAINER_NAME psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"
done

# Restaurar el respaldo
cat $BACKUP_FILE | docker exec -i $CONTAINER_NAME psql -U $DB_USER

echo "Restauración de las bases de datos completada."