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
echo "-----------Superuser created-----------"

# echo "-----------Collecting static files-----------"
# /opt/venv/bin/python manage.py collectstatic --noinput
# echo "-----------Static files collected-----------"

echo "-----------Starting server-----------"
# /opt/venv/bin/daphne -b 0.0.0.0 -p 8000 backend.asgi:application
/opt/venv/bin/python manage.py runserver 0.0.0.0:8000