# AESP - AI Enhanced Study Platform

Chào mừng đến với **AESP**, một nền tảng học tập trực tuyến hiện đại được xây dựng dựa trên kiến trúc **Microservices**, tích hợp trí tuệ nhân tạo (AI) để hỗ trợ phân tích giọng nói và chatbot học tập.

## 🚀 Tính năng chính

* **Đa vai trò người dùng:** Hỗ trợ Admin, Mentor (Giảng viên) và Learner (Học viên).
* **Quản lý khóa học:** Tạo, chỉnh sửa và theo dõi tiến độ học tập.
* **AI Integration:**
    * Phân tích giọng nói (Speech Analysis) hỗ trợ luyện phát âm.
    * Chatbot hỗ trợ học tập thông minh.
* **Thanh toán:** Tích hợp hệ thống thanh toán khóa học.
* **Microservices:** Hệ thống backend được chia nhỏ để dễ dàng mở rộng và bảo trì.

## 🏗 Kiến trúc hệ thống

Dự án bao gồm các thành phần chính sau:

### 1. Frontend (`aesp-frontend`)
* **Công nghệ:** React, Vite.
* **Giao diện:** Dashboard riêng biệt cho từng loại người dùng.

### 2. Backend (`aesp-backend`)
Hệ thống backend vận hành qua một **API Gateway** và kết nối tới các service con:

* **Gateway Service:** Cổng giao tiếp chính, điều hướng request (Node.js/Express).
* **User Service:** Quản lý xác thực (Auth), hồ sơ người dùng (Python/Flask).
* **AI Service:** Xử lý các tác vụ AI như Speech Analysis (Python).
* **Learning Service:** Quản lý khóa học, bài học và tiến độ (Node.js/Express + MongoDB).
* **Payment Service:** Xử lý giao dịch thanh toán (Node.js/Express).

---

## 🛠 Yêu cầu cài đặt

Trước khi bắt đầu, hãy đảm bảo máy tính của bạn đã cài đặt:

* [Node.js](https://nodejs.org/) (v16 trở lên)
* [Python](https://www.python.org/) (v3.9 trở lên)
* [Docker & Docker Compose](https://www.docker.com/) (Khuyên dùng để chạy toàn bộ hệ thống nhanh nhất)
* MongoDB & MySQL (Nếu chạy thủ công không qua Docker)

---

## 🏃‍♂️ Hướng dẫn chạy dự án

### Cách 1: Sử dụng Docker (Khuyên dùng)
Vì dự án có file `docker-compose.yml`, bạn có thể khởi chạy toàn bộ hệ thống (Frontend, các Backend Services và Database) chỉ với một lệnh:

1.  Mở terminal tại thư mục gốc của dự án.
2.  Chạy lệnh:
    ```bash
    docker-compose up --build
    ```
3.  Truy cập trang web tại: `http://localhost:5173` (hoặc port được cấu hình trong docker).

### Cách 2: Chạy thủ công từng Service

Nếu bạn muốn chạy môi trường dev cho từng phần:

#### 1. Frontend
```bash
cd aesp-frontend
npm install
npm run dev
### 2. Backend Gateway
cd aesp-backend/gateway
npm install
npm start
### 3. Backend Learning Service & Payment Service
(Tương tự như Gateway)
cd aesp-backend/learning-service
npm install
npm start
### 4. Backend User Service & AI Service (Python)
cd aesp-backend/user-service
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
