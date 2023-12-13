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
FROM node:20-alpine AS runner

ENV TZ=Asia/Tokyo
ENV NODE_ENV=production
WORKDIR /opt/app

COPY --from=deps /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/build ./build
COPY --from=build /opt/app/.env .
COPY --from=build /opt/app/application-settings.json .

ENTRYPOINT ["node", "build/main.js"]
