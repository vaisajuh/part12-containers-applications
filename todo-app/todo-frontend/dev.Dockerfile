FROM node:20

ENV REACT_APP_BACKEND_URL=http://localhost:3000/

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "start"]
