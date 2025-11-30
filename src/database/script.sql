DROP DATABASE IF EXISTS test_backend;

CREATE DATABASE test_backend;

DROP TABLE IF EXISTS Student CASCADE;

CREATE TABLE Student (
    MaSV CHAR(5) PRIMARY KEY,
    HoTen VARCHAR(50),
    GioiTinh VARCHAR(7),
    TruongDaiHoc VARCHAR(50),
    NgaySinh DATE
);

INSERT INTO Student VALUES
('SV001', 'Nguyễn Văn Tèo', 'Male', 'Khoa học tự nhiên', '2005-06-11'),
('SV002', 'Nguyễn Thị Bé Tư', 'Female', 'Bách Khoa', '2004-09-23'),
('SV003', 'Nguyễn Tấn Dũng', 'Male', 'Kinh tế Luật', '2005-12-13'),
('SV004', 'Nguyễn Văn X', 'Male', 'UIT', '2005-09-08');

SELECT * FROM Student;