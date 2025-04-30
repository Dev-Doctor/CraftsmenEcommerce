# syntax=docker/dockerfile:1

FROM postgres:17.4
WORKDIR /usr/local/app

COPY scripts/create_database.sql ./
RUN psql -f create_database.sql

# copia ed esegui i file per populare il database