FROM node:22.14.0-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.14.0-alpine3.21
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
