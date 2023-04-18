# Stage 1
FROM node:18 as build

ENV VITE_API_URL=/api

WORKDIR /app

COPY . .

RUN npm install -w client --quiet

RUN npm run build -w client

# Stage 2
FROM nginx:1.23.2-alpine

WORKDIR /nginx/

COPY --from=build /app/apps/client/.env /app/apps/client/.env
COPY --from=build /app/apps/client/dist /app/apps/client/dist

# Update the configuration files for nginx 
RUN rm /etc/nginx/conf.d/default.conf
COPY apps/client/nginx/default.conf /etc/nginx/conf.d

CMD nginx -g 'daemon off;'