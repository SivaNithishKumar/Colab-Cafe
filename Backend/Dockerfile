FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 5000

CMD ["npm", "start"]