#!/bin/bash

# Variables
CONTAINER_NAME="app-cicd_postgres-db_1"
DB_USER="rafael"
DB_TO_CONNECT="postgres"
BACKUP_FILE="/usr/src/app-cicd/src/script/backup.sql"

# Extraer los nombres de las bases de datos del archivo de respaldo
DB_NAMES=$(grep -oP '(?<=CREATE DATABASE )\w+' $BACKUP_FILE)

# Crear cada base de datos si no existe

for DB_NAME in $DB_NAMES; do
 echo "Creando base de datos: $DB_NAME"
 docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_TO_CONNECT -c "CREATE DATABASE $DB_NAME;" 2>/dev/null
done

# Restaurar el respaldo

cat $BACKUP_FILE | docker exec -i $CONTAINER_NAME psql -U $DB_USER -d $DB_TO_CONNECT

echo "Restauración de las bases de datos completada.

#? Para crear el backup de la base de datos.
#* docker exec -t <container_name> pg_dumpall -c -U <db_user> > backup.sql