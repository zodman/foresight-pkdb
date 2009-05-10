#!/bin/bash
# se hacen cambios en el modelo y se aplican
if [ -d $1 ]; then
    python manage.py sqlreset $1 > sql
    python manage.py dbshell  < sql
    echo ejecutando drop create tabla: $1
    rm -f sql
else
    echo aplicacion:$1 no encontrada
fi
