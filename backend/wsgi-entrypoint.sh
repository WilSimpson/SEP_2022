#!/bin/sh

until ./manage.py migrate
do
    echo "Waiting on migrations..."
    sleep 2
done

./manage.py collectstatic --noinput
gunicorn ethicsAdventure.wsgi --bind 0.0.0:8000 --workers 4 --threads 4