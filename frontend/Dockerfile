FROM node as builder

ENV NODE_VERSION 20.11.1

WORKDIR /app
COPY ./ /app

ENV NODE_OPTIONS=--max-old-space-size=8192
RUN npm install
RUN npm run build

FROM nginx
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf