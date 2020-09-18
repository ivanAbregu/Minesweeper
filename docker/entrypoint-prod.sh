#!/usr/bin/env bash
./manage.py migrate 
./manage.py collectstatic --noinput

echo "[run] runserver with django"
gunicorn web.wsgi:application --bind 0.0.0.0:8000 --log-level=info --timeout=500