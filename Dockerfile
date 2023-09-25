# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18-alpine

# Set the working directory.
WORKDIR /app

# Copy the package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm i

# Copy the rest of the application code.
COPY . .
# Overide env
RUN cp /app/.env.docker /app/.env

# Setup db
RUN npm run db:migrate

# Build the Next.js application.
RUN npm run build

# Expose the default Next.js port.
EXPOSE 3000

# Start the Next.js application.
CMD ["sh", "start.sh"]
