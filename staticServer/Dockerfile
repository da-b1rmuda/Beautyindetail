FROM node:21-alpine3.18

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 5010

ENTRYPOINT ["npm", "run", "dev"]