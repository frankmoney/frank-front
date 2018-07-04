FROM mhart/alpine-node:9

RUN mkdir -p /var/app
WORKDIR /var/app

COPY .yarnrc .npmrc package.json yarn.lock /var/app/
RUN yarn install --production

COPY . /var/app

ENV PORT 80
EXPOSE 80

CMD [ "npm", "start" ]
