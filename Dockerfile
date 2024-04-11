FROM node:19-alpine
WORKDIR /app
COPY *.json /
COPY *.js /
COPY src /src/
COPY public /public/
COPY .env /
RUN npm install --force
RUN npm run build
EXPOSE 12300
ENTRYPOINT npm run prod
