# Use the official Node.js 18 image as a base
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the API server will listen
ENV PORT=3000
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]

# docker build -t nikhildhawan/my-api-image:v1 .
# docker push nikhildhawan/my-api-image:latest