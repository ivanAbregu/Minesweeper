FROM python:3.8
MAINTAINER Ivan Abregu
ENV PYTHONUNBUFFERED 1

COPY . /code
WORKDIR /code

# ENV PYTHONPATH=${PYTHONPATH}:${PWD}
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev
