const db = require("../config/db.config");

exports.getUser = async (req, res) => {
  let sql = `SELECT * FROM USER WHERE name = ?`;
  let [data, _] = await db.execute(sql, [req.params.username]);
  res.json(data);
};
