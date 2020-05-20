FROM node:13-alpine3.11 as builder

RUN apk update && apk add --no-cache
RUN apk add make
WORKDIR /app

COPY . /app
RUN make build 
RUN make publish

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]