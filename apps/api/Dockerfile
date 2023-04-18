FROM node:18
 
WORKDIR /usr/src/app

COPY . .

RUN npm install -w api --quiet

RUN npm run build -w api

EXPOSE 3000
 
CMD ["node", "apps/api/dist/apps/api/src/main"]
