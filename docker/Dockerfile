FROM python:3.8
MAINTAINER Ivan Abregu
ENV PYTHONUNBUFFERED 1

COPY . /code
WORKDIR /code

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry config installer.parallel false
RUN poetry install --without dev