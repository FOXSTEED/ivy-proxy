FROM node:8.9.4
RUN mkdir -p /app/proxy
WORKDIR /app/proxy
COPY . /app/proxy
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]