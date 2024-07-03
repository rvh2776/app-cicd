
# APP-CICD

### Aplicación para Despliegues Automatizados (CI/CD) desde Docker Hub.

<p>
Esta aplicación está diseñada para facilitar despliegues continuos (CI/CD) desde Docker Hub.<br>
Se encarga de activar la actualización de la aplicación configurada para el despliegue.<br>
Cada vez que se actualice la rama principal (main) del repositorio de GitHub asociado, la aplicación se actualizará automáticamente.<br> 
Además, se encarga de ejecutar los contenedores necesarios para servir la aplicación dockerizada,<br>
garantizando que siempre se esté utilizando la versión más reciente.
</p>
<hr>
<br>
<br>

#### Crear backup de la base de datos, que esta en un volume de docker.

```
docker exec -t <container_name> pg_dumpall -c -U <db_user> > backup.sql
```

<br>
* En construcción.

<br>
<font color='lime'><p align="center">Rafael V.H.</p></font>