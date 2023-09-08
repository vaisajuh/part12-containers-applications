FROM node:20

ENV REACT_APP_BACKEND_URL=http://localhost:3000/

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN  npm run build

RUN CI=true npm test

RUN npm install -g serve

CMD ["serve", "build"]
