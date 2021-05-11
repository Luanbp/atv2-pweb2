FROM node:12

RUN \
  sed -i 's/# \(.*multiverse$\)/\1/g' /etc/apt/sources.list && \
  apt-get update -y && \
  apt-get install -y build-essential

WORKDIR /home/node/app

COPY . .

RUN npm install

CMD npm run start > log.txt || tail -f /dev/null
