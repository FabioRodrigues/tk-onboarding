FROM python:3.7.7-alpine

ENV PYTHONUNBUFFERED 1
EXPOSE 8000
WORKDIR /app

COPY . /app
RUN apk add --update --no-cache

RUN pip install -r requirements.txt

# RUN apk del .tmp-build-deps
RUN apk add make

RUN make create-migrations && make migrate

ENTRYPOINT [ "make", "run" ]
