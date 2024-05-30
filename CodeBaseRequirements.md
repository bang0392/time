# Code Base FE Angular *(Deadline: 18/10)*

## Thành viên

* Quân NM
* Đạt BT
* Minh TC
* Bằng NC

## Yêu cầu

### Routing

#### Mục tiêu

Xây dựng cấu trúc routing cho ứng dụng để quản lý và hiển thị các view khác nhau một cách hiệu quả.

#### Yêu cầu chi tiết

* Phải có ít nhất các route sau: Trang login, Trang register, Trang dashboard, Trang profile.
* Sử dụng lazy loading để tải các module một cách hiệu quả.
* Đảm bảo rằng người dùng chỉ có thể truy cập các trang nhất định sau khi đã đăng nhập (trừ login, register).

### Xác Thực JWT

#### Mục tiêu

Triển khai xác thực người dùng sử dụng JSON Web Token (JWT).

#### Yêu cầu chi tiết

* Cấu hình và triển khai Interceptor để thêm token vào headers của request.
* Xử lý và lưu trữ token JWT nhận được từ server sau khi người dùng đăng nhập.
* Xử lý trường hợp token hết hạn.

### Kiểm Soát Ngoại Lệ

#### Mục tiêu

Xây dựng một lớp chung để xử lý ngoại lệ khi gọi API.

#### Yêu cầu chi tiết

* Xây dựng service để xử lý ngoại lệ, bao gồm log lỗi và thông báo cho người dùng.
* Sử dụng Interceptor để bắt và xử lý ngoại lệ.

### Tích Hợp Đăng Ký/Đăng Nhập bằng Tài Khoản Google

#### Mục tiêu

Cho phép người dùng đăng ký và đăng nhập vào ứng dụng sử dụng tài khoản Google của họ.

#### Yêu cầu chi tiết

* Integrate SDK hoặc API cung cấp bởi Google để thực hiện chức năng này.
* Lưu trữ thông tin người dùng sau khi họ đăng nhập thành công.
* Cung cấp tùy chọn đăng xuất cho người dùng.

### Các Yêu Cầu Khác

* **Kiến Trúc**: Cần tuân thủ các nguyên tắc kiến trúc tốt, chia thành các module và components để dễ dàng quản lý và mở rộng.
* **Testing**: Thực hiện Unit Test.
* **Styling và UI**: Sử dụng Bootstrap để style cho ứng dụng, đảm bảo giao diện thân thiện với người dùng và tương thích trên các thiết bị khác nhau.
