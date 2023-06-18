# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./


# Update npm to the latest version
# RUN npm update -g npm
RUN npm cache clean --force
# RUN rm -rf node_modules

# Install project dependencies
RUN npm install -g npm@9.6.5
RUN npm install && npm install -g remix json-server tailwindcss concurrently@8.0.1
RUN npm install @tailwindcss/aspect-ratio --save-dev


# Copy the entire project to the working directory
COPY . .

# Build the Remix project
RUN npm run build

# Expose the port on which the Remix server will listen
EXPOSE 3000
ENV NODE_ENV=production

# Start the Remix server
CMD ["npm", "run", "start"]
