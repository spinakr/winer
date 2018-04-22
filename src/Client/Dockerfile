FROM node:9.11.1
ENV NPM_CONFIG_LOGLEVEL warn

COPY build app

WORKDIR app
RUN npm install -g serve

CMD serve -s .
EXPOSE 5000