# App para crear despliegues CI/CD.


#### Crear backup de la base de datos, que esta en un volume de docker.

```
docker exec -t <container_name> pg_dumpall -c -U <db_user> > backup.sql
```

<br>
* En construcción.

<br>
<font color='lime'><p align="center">Rafael V.H.</p></font>