FROM node:21-alpine3.18

WORKDIR /app
COPY . .

RUN ["npm", "i"]

EXPOSE 5005

ENTRYPOINT ["npm", "run", "dev"]