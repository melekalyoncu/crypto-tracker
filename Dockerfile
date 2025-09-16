# --- 1) Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Bağımlılıklar
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* .npmrc* ./ 
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
  else npm i; fi

# Kaynak kodu kopyala ve build al
COPY . .
# Vite prod build
RUN npm run build

# --- 2) Runtime stage (Nginx)
FROM nginx:alpine AS runtime
# SPA yönlendirme için custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Statik çıktıyı kopyala
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
