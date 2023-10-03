FROM node:18.16.0-alpine as base

# Add package file
COPY package.json ./
COPY package-lock.json ./

# Install deps
RUN npm install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Build dist
RUN yarn build

# Start production image build
FROM node:18.16.0-alpine

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

# Copy static files
COPY src/public dist/src/public

# Expose port 3001
EXPOSE 3001
CMD ["dist/src/server.js"]