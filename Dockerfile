FROM node:14.19.1

ENV TZ=Europe/Paris

# Create App directory
WORKDIR /opt/app

# Bundle App source.
COPY . .

RUN npm install

# Set App Environment
ENV NODE_ENV=production

EXPOSE 3000

CMD [ "npm", "run", "start-prod" ]