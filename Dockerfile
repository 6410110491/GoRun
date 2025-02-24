FROM node:18-alpine as build
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build/. /usr/share/nginx/html


ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN echo "REACT_APP_API_URL=${REACT_APP_API_URL}" > .env


EXPOSE 80:443

CMD ["nginx", "-g", "daemon off;"]