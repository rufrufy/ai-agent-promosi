# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Salin file package dan install dependensi
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Salin semua file project dan build
COPY . .
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy hasil build dan dependensi production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]
