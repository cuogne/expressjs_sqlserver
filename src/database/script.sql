create database test_backend
go
use test_backend 
go 

if exists (select * from sys.databases where name = 'test_backend')
begin
    alter database test_backend set single_user with rollback immediate
    drop database test_backend
end
go

create table Student 
(
    MaSV char(5) primary key,
    HoTen nvarchar(50),
    GioiTinh nvarchar(3),
    TruongDaiHoc nvarchar(50),
    NgaySinh datetime
)

insert into Student values
('SV001', N'Nguyễn Văn Tèo', 'Nam', N'Khoa học tự nhiên', '2005-06-11'),
('SV002', N'Nguyễn Thị Bé Tư', N'Nữ', N'Bách Khoa', '2004-09-23'),
('SV003', N'Nguyễn Tấn Dũng', 'Nam', N'Kinh tế Luật', '2005-12-13')

select * from Student