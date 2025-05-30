# Chatbot Trợ Lý Lịch Sử Việt Nam

Chatbot này được tích hợp vào trang web Lịch Sử Việt Nam để cung cấp thông tin về lịch sử Việt Nam thông qua Google Gemini API.

## Tính năng

- Trả lời các câu hỏi về lịch sử Việt Nam
- Cung cấp thông tin về các triều đại, nhân vật lịch sử
- Giới thiệu về các di tích lịch sử, bảo tàng
- Hỗ trợ tra cứu và học tập

## Cài đặt

### Backend

1. Cài đặt các dependencies:
   ```bash
   cd VietNam-History-BE
   npm install axios
   ```

2. Tạo file `.env` trong thư mục `VietNam-History-BE` với nội dung:
   ```
   PORT=3001
   MONGO_DB=mongodb://localhost:27017/vietnam-history
   JWT_SECRET=vietnam-history-secret
   GEMINI_API_KEY=AIzaSyBCMnBzmrxDbV--WttfdzxHKjx6nFUH-Ik
   ```

### Frontend

1. Tạo file `.env` trong thư mục `VietNam-History-FE` với nội dung:
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   ```

2. Cài đặt các dependencies (nếu chưa có):
   ```bash
   cd VietNam-History-FE
   npm install react-icons
   ```

## Sử dụng

1. Khởi động backend:
   ```bash
   cd VietNam-History-BE
   npm start
   ```

2. Khởi động frontend:
   ```bash
   cd VietNam-History-FE
   npm start
   ```

3. Truy cập trang web tại `http://localhost:3000`

4. Chatbot sẽ xuất hiện ở góc dưới bên phải của trang web. Nhấn vào biểu tượng robot để mở chatbot và bắt đầu trò chuyện.

## Tùy chỉnh

### Thay đổi prompt

Để thay đổi prompt cho chatbot, chỉnh sửa biến `prompt` trong file `VietNam-History-BE/src/controllers/ChatbotController.js`.

### Thay đổi giao diện

Để thay đổi giao diện chatbot, chỉnh sửa file CSS tại `VietNam-History-FE/src/components/Chatbot/ChatbotComponent.css`.

## Lưu ý

- Chatbot sử dụng Google Gemini API để xử lý các câu hỏi và phản hồi.
- Cần có kết nối internet để chatbot hoạt động.
- API key có thể hết hạn hoặc bị giới hạn số lượng request, vui lòng kiểm tra nếu chatbot không hoạt động.