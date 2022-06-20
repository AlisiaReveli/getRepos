# get the base node image
FROM node:16 as builder

# set the working dir for container
WORKDIR /client-side

# copy the json file first
COPY package.json .

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# build the folder
CMD [ "npm", "run", "start" ]