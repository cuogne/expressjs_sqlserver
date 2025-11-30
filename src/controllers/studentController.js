const db = require('../config/configDatabase');

async function getAllStudents(req, res) {
    try {
        // query database
        // api/students?search=...&gender=...
        // const result = await db.query('SELECT * FROM Student WHERE (@search IS NULL OR HoTen LIKE CONCAT(\'%\', @search, \'%\')) AND (@gender IS NULL OR GioiTinh = @gender)', {
        //     search: req.query.search || null,
        //     gender: req.query.gender || null

        // api/students?search=...&gender=...
        let query = `SELECT * FROM Student`;
        const params = {};
        const conditions = [];

        if (req.query.search) {
            conditions.push('HoTen LIKE @search');
            params.search = `%${req.query.search}%`;
        }

        if (req.query.gender) {
            conditions.push('GioiTinh = @gender');
            params.gender = req.query.gender;
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const result = await db.query(query, params);

        res.status(200).json({
            data: result.recordset,
            count: result.recordset.length
        });
    } catch (error) {
        console.error('Error fetching students: ', error);
        res.status(500).json({ error: 'Error fetching students' });
    }
}

module.exports = {
    getAllStudents,
};