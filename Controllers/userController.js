const client = require('./dbConnect');
const jwt = require('jsonwebtoken');

exports.Adminlogin = async (req, res) => {
    const { user_name, password ,site_id} = req.body;
    try {
        const query = 'SELECT * FROM users WHERE user_name = $1 AND password = $2 AND site_id = $3';
        const values = [user_name, password,site_id];
        const { rows } = await client.query(query, values);
        console.log(rows);
        if (rows.length > 0) {
            const existingAdmin = rows[0];
            const token = jwt.sign({ userId: existingAdmin.user_id }, "superkey2255");
            const query = 'UPDATE  users SET token = $4 WHERE  user_name = $1 AND password = $2 AND site_id = $3';
            const values = [user_name, password,site_id,token];
            const { results } = await client.query(query, values);
            res.status(200).json({ existingAdmin, token });
        } else {
            res.status(404).json('Invalid email or password');
        }
    } catch (err) {
        res.status(401).json(`Login request failed due to ${err}`);
    }
};
