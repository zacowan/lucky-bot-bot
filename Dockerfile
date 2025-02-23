# Use an official Node.js runtime as a parent image
FROM node:22

# Install pnpm globally
RUN corepack enable && corepack enable pnpm

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application
COPY . .

# Set NODE_ENV to production
ENV NODE_ENV=production

# Install dependencies
RUN pnpm install

# Expose the port that the server will run on
ARG PORT=5432
ENV PORT=$PORT
EXPOSE $PORT

# Build the application
RUN pnpm run build

# Start the application
CMD ["pnpm", "run", "start"]
