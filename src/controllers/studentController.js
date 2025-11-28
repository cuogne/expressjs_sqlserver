const db = require('../config/configDatabase');

async function getAllStudents(req, res) {
    try {
        // query database
        const result = await db.query('SELECT * FROM Student');

        res.status(200).json({
            "data": result.recordset,
            "count": result.recordset.length,
            "msg": "Lấy danh sách toàn bộ sinh viên thành công"
        });

    } catch (error) {
        console.error('Error fetching students: ', error);

        res.status(500).json({
            "msg": "Lỗi server khi lấy danh sách toàn bộ sinh viên"
        });
    }
}

async function getMaleStudents(req, res) {
    try {
        // query database
        const result = await db.query("select * from Student st where st.GioiTinh = 'Nam'");

        res.status(200).json({
            "data": result.recordset,
            "count": result.recordset.length,
            "msg": "Lấy danh sách sinh viên nam thành công"
        });

    } catch (error) {
        console.error('Error fetching students: ', error);

        res.status(500).json({
            "msg": "Lỗi server khi lấy danh sách sinh viên"
        });
    }
}

module.exports = {
    getAllStudents,
    getMaleStudents
};