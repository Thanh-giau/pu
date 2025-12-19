# File: aesp-project/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy file package để cài thư viện trước
COPY package*.json ./
RUN npm install

# Copy toàn bộ code vào
COPY . .

# Mở cổng mặc định của Vite
EXPOSE 5173

# Lệnh chạy (thêm --host để truy cập được từ bên ngoài container)
CMD ["npm", "run", "dev", "--", "--host"]