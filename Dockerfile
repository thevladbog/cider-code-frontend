FROM node:22.14.0-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

ARG VITE_FRONTEND_URL
ENV VITE_FRONTEND_URL=$VITE_FRONTEND_URL

ARG LOCAL_FRONTEND
ENV LOCAL_FRONTEND=$LOCAL_FRONTEND

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG CONFIG_API_PROXY_URL
ENV CONFIG_API_PROXY_URL=$CONFIG_API_PROXY_URL

RUN npm run build

FROM node:22.14.0-alpine3.21
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]
