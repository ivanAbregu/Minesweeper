FROM python:3
MAINTAINER Ivan Abregu
ENV PYTHONUNBUFFERED 1
COPY . /app
RUN pip install -r /app/requirements.txt
WORKDIR /app

