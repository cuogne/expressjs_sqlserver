# Hướng dẫn sử dụng PostgreSQL với SQLTools trong VSCode

## 📦 Bước 1: Cài đặt Extensions

### 1.1. Cài SQLTools (Extension chính)
1. Mở VSCode
2. Nhấn `Cmd+Shift+X` (macOS) hoặc `Ctrl+Shift+X` (Windows/Linux) để mở Extensions
3. Tìm kiếm: **"SQLTools"**
4. Chọn extension **"SQLTools"** (by Matheus Teixeira)
5. Click **"Install"**

### 1.2. Cài SQLTools PostgreSQL/Cockroach Driver
1. Vẫn trong Extensions, tìm kiếm: **"SQLTools PostgreSQL/Cockroach"**
2. Chọn extension **"SQLTools PostgreSQL/Cockroach Driver"** (by Matheus Teixeira)
3. Click **"Install"**
4. **Quan trọng**: Sau khi cài xong, reload VSCode (nhấn `Cmd+R` hoặc `Ctrl+R`)

---

## 🔧 Bước 2: Tạo Database (Nếu chưa có)

### 2.1. Mở Terminal trong VSCode
- Nhấn `` Ctrl+` `` (backtick) hoặc `View → Terminal`

### 2.2. Kết nối PostgreSQL
```bash
# Cách 1: Dùng psql trực tiếp (nếu đã cài PostgreSQL)
psql postgres

# Cách 2: Dùng script của PostgreSQL (macOS)
/Library/PostgreSQL/18/scripts/runpsql.sh
```

### 2.3. Tạo Database
Trong psql, chạy các lệnh sau:
```sql
-- Tạo database
CREATE DATABASE test_backend;

-- Kiểm tra database đã tạo
\l

-- Thoát psql
\q
```

```sql
# Kết nối vào PostgreSQL
psql -U postgres

# Chuyển sang database mặc định
\c postgres

# Ngắt kết nối
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'test_backend'
  AND pid <> pg_backend_pid();

# Xóa database
DROP DATABASE test_backend;

# Tạo lại database
CREATE DATABASE test_backend;

# Kiểm tra
\l

# Kết nối vào database mới
\c test_backend

# Thoát
\q
```

---

## 🔌 Bước 3: Kết nối Database trong SQLTools

### 3.1. Mở SQLTools Sidebar
1. Nhìn vào **sidebar bên trái** của VSCode
2. Tìm icon **SQLTools** (biểu tượng database/plug)
3. Click vào icon đó

### 3.2. Thêm Connection mới
1. Trong SQLTools sidebar, click vào icon **"+"** (Add New Connection)
   - Hoặc nhấn `Cmd+Shift+P` / `Ctrl+Shift+P`
   - Gõ: **"SQLTools: Add New Connection"**
   - Chọn **"PostgreSQL"** hoặc **"CockroachDB"**

### 3.3. Điền thông tin Connection

Một form sẽ hiện ra, điền các thông tin sau:

#### **Connection Name** (Tên kết nối - tùy chọn)
```
Local PostgreSQL
```
- Đây là tên hiển thị, bạn đặt tên gì cũng được
- Ví dụ: `My Local DB`, `Development`, `test_backend`, etc.

#### **Server Address** (Địa chỉ server)
```
localhost
```
- Nếu PostgreSQL chạy trên máy local: `localhost`
- Nếu chạy trên server khác: nhập IP hoặc domain

#### **Server Port** (Cổng kết nối)
```
5432
```
- Port mặc định của PostgreSQL là `5432`
- Nếu bạn đổi port thì điền port đó

#### **Database** (Tên database)
```
test_backend
```
- Tên database bạn muốn kết nối
- Phải là database đã tồn tại (đã tạo ở Bước 2)

#### **Username** (Tên người dùng)
```
postgres
```
- Username mặc định thường là `postgres`
- Hoặc username bạn đã tạo khi cài PostgreSQL
- Trên macOS, thường là username của máy bạn

#### **Password** (Mật khẩu)
```
[password của bạn]
```
- Password bạn đã set khi cài PostgreSQL
- Nếu chưa set password, có thể để trống (không khuyến khích)

#### **Connection Timeout** (Thời gian chờ - tùy chọn)
```
30
```
- Thời gian chờ kết nối (giây)
- Mặc định: `30` giây
- Có thể để mặc định

#### **Connection Retry Attempts** (Số lần thử lại - tùy chọn)
```
3
```
- Số lần thử kết nối lại nếu lỗi
- Mặc định: `3` lần
- Có thể để mặc định

#### **Connection Retry Delay** (Thời gian chờ giữa các lần thử - tùy chọn)
```
1000
```
- Thời gian chờ (milliseconds) giữa các lần thử lại
- Mặc định: `1000` ms (1 giây)
- Có thể để mặc định

#### **Use SSL** (Dùng SSL - tùy chọn)
```
false
```
- Bật SSL cho kết nối
- Local development: `false`
- Production: `true`

#### **SSL Mode** (Chế độ SSL - chỉ hiện khi Use SSL = true)
```
prefer
```
- Các tùy chọn: `disable`, `allow`, `prefer`, `require`, `verify-ca`, `verify-full`
- Local: thường dùng `prefer` hoặc `disable`

#### **Save Password** (Lưu mật khẩu)
```
✓ (tick vào)
```
- **Khuyến khích**: Tick vào để không phải nhập lại password mỗi lần
- Nếu không tick, mỗi lần kết nối sẽ hỏi password

### 3.4. Lưu Connection
1. Sau khi điền xong, click **"Test Connection"** để kiểm tra
2. Nếu hiện **"Connection successful!"** → Click **"Save Connection"**
3. Nếu lỗi, kiểm tra lại:
   - PostgreSQL đã chạy chưa? (`brew services list` để kiểm tra)
   - Database đã tạo chưa?
   - Username/Password đúng chưa?
   - Port có đúng không?

---

## 📝 Bước 4: Chạy Script SQL

### 4.1. Mở file SQL
1. Mở file `src/database/script.sql` trong VSCode

### 4.2. Chọn Connection
1. Ở **SQLTools sidebar** (bên trái), bạn sẽ thấy connection vừa tạo
2. Click vào connection đó để **activate** (connection sẽ được highlight)
3. Bạn có thể thấy database `test_backend` và các tables bên trong

### 4.3. Chạy Query
Có 3 cách để chạy query:

#### **Cách 1: Chạy Query đã chọn (Khuyên dùng)**
1. **Chọn** (highlight) đoạn SQL muốn chạy trong file
2. Nhấn `Cmd+E` (macOS) hoặc `Ctrl+E` (Windows/Linux)
   - Hoặc click chuột phải → **"Run Selected Query"**
   - Hoặc dùng Command Palette: `Cmd+Shift+P` → "SQLTools: Run Selected Query"

#### **Cách 2: Chạy toàn bộ file**
1. Mở file `.sql`
2. Nhấn `Cmd+Shift+P` / `Ctrl+Shift+P`
3. Gõ: **"SQLTools: Run Current Query"**
4. Hoặc click chuột phải → **"Run Current Query"**

#### **Cách 3: Chạy từng câu lệnh**
1. Đặt cursor vào câu lệnh SQL
2. Nhấn `Cmd+E` / `Ctrl+E`
3. SQLTools sẽ tự động chạy câu lệnh tại vị trí cursor

### 4.4. Xem kết quả
- Kết quả sẽ hiển thị ở **tab mới** bên dưới editor
- Có thể:
  - Xem dữ liệu dạng bảng
  - Export ra CSV, JSON
  - Copy kết quả
  - Xem execution time

---

## 🎯 Bước 5: Quản lý Database với SQLTools

### 5.1. Xem cấu trúc Database
1. Trong **SQLTools sidebar**, mở rộng connection
2. Bạn sẽ thấy:
   - **Databases** → `test_backend`
   - **Schemas** → `public` (mặc định)
   - **Tables** → `Student` (sau khi chạy script)
   - **Views**, **Functions**, **Procedures**, etc.

### 5.2. Xem cấu trúc Table
1. Click vào table `Student`
2. Bạn sẽ thấy:
   - **Columns**: Danh sách các cột, kiểu dữ liệu
   - **Indexes**: Các indexes
   - **Foreign Keys**: Khóa ngoại (nếu có)
   - **Triggers**: Triggers (nếu có)

### 5.3. Xem dữ liệu trong Table
1. Click chuột phải vào table `Student`
2. Chọn **"Show Table Records"**
3. Hoặc chọn **"Generate SELECT Query"** để tạo query SELECT

### 5.4. Tạo Query mới
1. Nhấn `Cmd+Shift+P` / `Ctrl+Shift+P`
2. Gõ: **"SQLTools: New Query"**
3. Một file `.sql` mới sẽ được tạo
4. Viết query và chạy như Bước 4

---

## 📋 Các lệnh hữu ích trong Command Palette

Nhấn `Cmd+Shift+P` / `Ctrl+Shift+P` và gõ:

- **SQLTools: Add New Connection** - Thêm kết nối mới
- **SQLTools: Run Selected Query** - Chạy query đã chọn
- **SQLTools: Run Current Query** - Chạy query tại vị trí cursor
- **SQLTools: New Query** - Tạo query mới
- **SQLTools: Show Output Channel** - Xem log/errors
- **SQLTools: Focus on Results View** - Focus vào tab kết quả
- **SQLTools: Refresh Tree** - Refresh sidebar

---

## 🔍 Troubleshooting (Xử lý lỗi)

### Lỗi: "Connection refused" hoặc "Cannot connect"
**Nguyên nhân**: PostgreSQL chưa chạy
**Giải pháp**:
```bash
# Kiểm tra PostgreSQL có chạy không
brew services list

# Khởi động PostgreSQL
brew services start postgresql@15
# hoặc
brew services start postgresql@18
```

### Lỗi: "Database does not exist"
**Nguyên nhân**: Database chưa được tạo
**Giải pháp**: Tạo database như Bước 2

### Lỗi: "Password authentication failed"
**Nguyên nhân**: Username/Password sai
**Giải pháp**:
1. Kiểm tra lại username (thường là `postgres` hoặc username máy bạn)
2. Reset password nếu cần:
   ```bash
   psql postgres
   ALTER USER postgres WITH PASSWORD 'new_password';
   ```

### Lỗi: "Port 5432 already in use"
**Nguyên nhân**: Port đã bị chiếm
**Giải pháp**: 
- Kiểm tra process đang dùng port: `lsof -i :5432`
- Hoặc đổi port trong connection settings

### Extension không hiện trong sidebar
**Giải pháp**:
1. Reload VSCode: `Cmd+R` / `Ctrl+R`
2. Kiểm tra extension đã cài đúng chưa
3. Cài lại cả 2 extensions: SQLTools + SQLTools PostgreSQL Driver

### Lỗi: "cannot drop the currently open database"
**Nguyên nhân**: Bạn đang cố xóa database mà bạn đang kết nối vào
**Giải pháp**:
1. **QUAN TRỌNG**: Trong PostgreSQL, bạn KHÔNG THỂ xóa database đang kết nối
2. Phải chuyển sang database khác trước (thường là `postgres`)
3. Cách làm:
   - Tạo 2 connections trong SQLTools:
     - **Connection 1**: Kết nối vào `postgres` database (để xóa/tạo database)
     - **Connection 2**: Kết nối vào `test_backend` database (để tạo bảng, insert data)
   - Khi muốn xóa `test_backend`:
     - Chọn Connection 1 (postgres)
     - Chạy: `DROP DATABASE IF EXISTS test_backend;`
   - Khi muốn tạo bảng trong `test_backend`:
     - Chọn Connection 2 (test_backend)
     - Chạy các lệnh CREATE TABLE, INSERT, etc.

---

## ⚠️ Quan trọng: Xóa Database trong PostgreSQL

### Vấn đề:
PostgreSQL **KHÔNG CHO PHÉP** xóa database mà bạn đang kết nối vào. Bạn phải chuyển sang database khác trước.

### Giải pháp:

#### **Cách 1: Dùng 2 Connections trong SQLTools** (Khuyên dùng)

1. **Tạo Connection 1 - Kết nối vào `postgres`**:
   - Connection Name: `PostgreSQL - postgres`
   - Database: `postgres`
   - Dùng để: Xóa/tạo database

2. **Tạo Connection 2 - Kết nối vào `test_backend`**:
   - Connection Name: `PostgreSQL - test_backend`
   - Database: `test_backend`
   - Dùng để: Tạo bảng, insert data, query

3. **Khi cần xóa database**:
   - Chọn Connection 1 (postgres)
   - Chạy: `DROP DATABASE IF EXISTS test_backend;`

4. **Khi cần tạo bảng**:
   - Chọn Connection 2 (test_backend)
   - Chạy các lệnh CREATE TABLE, INSERT, etc.

#### **Cách 2: Dùng file script riêng biệt**

Tôi đã tạo 2 file script riêng:
- **`01_create_database.sql`**: Chạy khi kết nối vào `postgres`
- **`02_create_tables.sql`**: Chạy khi kết nối vào `test_backend`

**Cách dùng**:
1. Tạo connection kết nối vào `postgres`
2. Mở file `01_create_database.sql`
3. Chọn connection `postgres` trong SQLTools sidebar
4. Chạy script (chọn code → `Cmd+E`)
5. Tạo connection mới kết nối vào `test_backend`
6. Mở file `02_create_tables.sql`
7. Chọn connection `test_backend` trong SQLTools sidebar
8. Chạy script

---

## 📝 Lưu ý khi viết SQL cho PostgreSQL

### Khác biệt so với SQL Server:

1. **Không có `GO`**
   - SQL Server: `GO` để phân tách batch
   - PostgreSQL: Chỉ cần `;` để kết thúc câu lệnh

2. **Không có `USE database`**
   - SQL Server: `USE database_name;`
   - PostgreSQL: Kết nối trực tiếp vào database khi tạo connection

3. **Kiểu dữ liệu khác nhau**:
   - `nvarchar` → `VARCHAR`
   - `datetime` → `DATE` hoặc `TIMESTAMP`
   - `char` → `CHAR` (giống nhau)
   - `int` → `INTEGER` hoặc `INT`

4. **Xóa database**:
   - SQL Server: Phức tạp hơn
   - PostgreSQL: `DROP DATABASE IF EXISTS database_name;`

5. **Xóa bảng**:
   - SQL Server: `DROP TABLE table_name;`
   - PostgreSQL: `DROP TABLE IF EXISTS table_name CASCADE;`

6. **String không cần `N'...'`**
   - SQL Server: `N'Nguyễn'` (Unicode)
   - PostgreSQL: `'Nguyễn'` (mặc định đã là UTF-8)

---

## 🚀 Quick Start Checklist

- [ ] Cài SQLTools extension
- [ ] Cài SQLTools PostgreSQL/Cockroach Driver
- [ ] Reload VSCode
- [ ] Tạo database `test_backend` trong psql
- [ ] Thêm connection trong SQLTools với đầy đủ thông tin
- [ ] Test connection thành công
- [ ] Mở file `src/database/script.sql`
- [ ] Chọn connection trong SQLTools sidebar
- [ ] Chạy script (chọn code → `Cmd+E`)
- [ ] Kiểm tra kết quả và dữ liệu trong table

---

## 💡 Tips & Tricks

1. **Lưu password**: Tick "Save Password" để không phải nhập lại
2. **Shortcut nhanh**: `Cmd+E` / `Ctrl+E` để chạy query
3. **Xem nhiều kết quả**: Mỗi query tạo một tab kết quả riêng
4. **Export dữ liệu**: Click chuột phải vào kết quả → Export to CSV/JSON
5. **Auto-complete**: SQLTools có IntelliSense, gõ tên table/column sẽ tự động gợi ý
6. **Format SQL**: Click chuột phải → "Format Document" để format code
7. **Xem execution plan**: Một số query có thể xem execution plan
8. **Multiple connections**: Có thể kết nối nhiều database cùng lúc

---

## 📚 Tài liệu tham khảo

- SQLTools Documentation: https://vscode-sqltools.mteixeira.dev/
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- SQLTools GitHub: https://github.com/mtxr/vscode-sqltools

---

**Chúc bạn code vui vẻ! 🎉**
