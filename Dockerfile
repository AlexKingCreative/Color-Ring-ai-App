# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Accept build arguments
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG GEMINI_API_KEY
ARG VITE_STRIPE_PUBLISHABLE_KEY
ARG STRIPE_SECRET_KEY
ARG VITE_STRIPE_PRICE_ID

# Set as environment variables for the build
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY
ENV VITE_STRIPE_PUBLISHABLE_KEY=$VITE_STRIPE_PUBLISHABLE_KEY
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV VITE_STRIPE_PRICE_ID=$VITE_STRIPE_PRICE_ID

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install
# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration if you have one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Update nginx to listen on port 8080
RUN sed -i 's/listen\s*80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
