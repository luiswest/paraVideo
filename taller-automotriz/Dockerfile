# Stage 1: Build the Angular app
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with NGINX
FROM nginx:alpine
# Replace 'your-app-name' with the actual folder name in dist/
COPY --from=build /app/dist/your-app-name/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
