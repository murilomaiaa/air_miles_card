FROM node:16

WORKDIR /home/root/api

# Copy package.json and yarn.lock to container
COPY package.json yarn.lock ./

RUN npm config set unsafe-perm true

# set user root
USER root

# Install dependencies
RUN yarn

COPY --chown=root:root . .

RUN yarn build

COPY --chown=root:root .env .

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3333

CMD [ "yarn", "start" ]
