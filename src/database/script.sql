create database test_backend
go
use test_backend 
go 

use tempdb
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
    GioiTinh nvarchar(7),
    TruongDaiHoc nvarchar(50),
    NgaySinh datetime
)

insert into Student values
('SV001', N'Nguyễn Văn Tèo', 'Male', N'Khoa học tự nhiên', '2005-06-11'),
('SV002', N'Nguyễn Thị Bé Tư', 'Female', N'Bách Khoa', '2004-09-23'),
('SV003', N'Nguyễn Tấn Dũng', 'Male', N'Kinh tế Luật', '2005-12-13'),
('SV004', N'Nguyễn Văn X', 'Male', N'UIT', '2005-09-08')

select * from Student