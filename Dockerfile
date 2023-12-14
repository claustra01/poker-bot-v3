FROM node:20-alpine AS deps

ENV TZ=Asia/Tokyo
ENV NODE_ENV=production
WORKDIR /opt/app

COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

#--------------------------------------------------
FROM node:20-alpine AS build

ENV TZ=Asia/Tokyo
WORKDIR /opt/app

COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

#--------------------------------------------------
FROM gcr.io/distroless/nodejs20-debian12:nonroot AS runner

ENV TZ=Asia/Tokyo
ENV NODE_ENV=production
WORKDIR /opt/app

COPY --from=deps --chown=nonroot:nonroot /opt/app/node_modules ./node_modules
COPY --from=build --chown=nonroot:nonroot /opt/app/build ./build
COPY --from=build --chown=nonroot:nonroot /opt/app/.env .

USER nonroot
ENTRYPOINT ["/nodejs/bin/node", "build/src/main.js"]
