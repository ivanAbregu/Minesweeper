#!/usr/bin/env bash
./manage.py migrate 
echo "[run] runserver with django"
./manage.py runserver 0:80
