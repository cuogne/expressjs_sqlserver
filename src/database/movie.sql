drop table if exists movie;

create table movie (
    idMovie serial primary key,
    title varchar(255) not null,
    description text,
    released_date date,
    image varchar(500),
    duration_minutes int check (duration_minutes > 0),
    genre varchar(100),
    trailer varchar(500)
);

insert into movie (title, description, released_date, image, duration_minutes, genre, trailer) values 
('CỤC VÀNG CỦA NGOẠI (T13)', 'Lấy cảm hứng từ những ký ức tuổi thơ ngọt ngào, \"Cục Vàng Của Ngoại\" mang đến câu chuyện ấm áp về tình bà cháu trong một xóm nhỏ chan chứa nghĩa tình.\r\nBà Hậu – người phụ nữ cả đời tần tảo, nay trở thành chỗ dựa duy nhất của cháu ngoại khi con gái bỏ đi. Dẫu cuộc sống còn nhiều nhọc nhằn, tình thương bà dành cho cháu vẫn luôn trọn vẹn. Với bà, cháu là \"cục vàng\" – niềm vui, niềm an ủi và cũng là lẽ sống của đời mình.\r\nBộ phim nhẹ nhàng dẫn khán giả trở lại những khoảnh khắc quen thuộc nơi xóm nhỏ: nụ cười hồn nhiên của cháu, vòng tay chở che của bà và sự đùm bọc từ hàng xóm láng giềng. Tất cả cùng hòa thành một bức tranh đời thường ấm áp, gợi nhắc về tuổi thơ bình yên và tình người mộc mạc, chân thành', '2025-10-18', 'https://api-website.cinestar.com.vn/media/wysiwyg/Posters/10-2025/cuc-vang-cua-ngoai-poster.jpg', 119, 'Gia đình, Tâm Lý', 'https://youtu.be/adOwxsPorl8'),

('TEE YOD: QUỶ ĂN TẠNG PHẦN 3 (T16)', 'Yak và gia đình phải đối mặt với nỗi kinh hoàng mới khi “Yee” – cô em út – đột ngột mất tích bí ẩn. Yak buộc phải cùng Yos, Yod và Papan lên đường đến “Bong Sa Noh Bian” – khu rừng ma ám – để cứu Yee trước khi những linh hồn tà ác một lần nữa bị đánh thức.', '2025-10-18', 'https://api-website.cinestar.com.vn/media/wysiwyg/Posters/10-2025/tee-yod-sneak.jpg', 104, 'Kinh Dị', 'https://youtu.be/u4bDk2jfGKo');

select * from movie;