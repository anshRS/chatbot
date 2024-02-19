#!/bin/bash

APP_PORT=${PORT:-8000}

echo "-----------Waiting for postgres-----------"
sleep 5
echo "-----------PostgreSQL started-----------"

echo "-----------Migrating database-----------"
/opt/venv/bin/python manage.py makemigrations --noinput
/opt/venv/bin/python manage.py migrate --noinput
echo "-----------Database migrated-----------"

echo "-----------Creating superuser-----------"
/opt/venv/bin/python manage.py superuser || true

echo "-----------Starting server-----------"
/opt/venv/bin/python manage.py runserver 0.0.0.0:8000