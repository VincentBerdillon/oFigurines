const client = require("./database");

const dataMapper = {

  getAllFigurines : async () => {
    const sql = 'SELECT * FROM "figurine"';
    const figurines = await client.query(sql);
    return figurines.rows;
  },

  getAllFigurinesNames : async () => {
    const sql = 'SELECT name FROM "figurine"';
    const figurinesNames = await client.query(sql);
    return figurinesNames.rows;
  },

  getAllNotes : async () => {
    const sql = `SELECT figurine_id, ROUND(AVG(note)) as note FROM review GROUP BY figurine_id`;
    const allnotes = await client.query(sql);
    return allnotes.rows;
  },

  getOneFigurine : async (id) => {
    const sql = 'SELECT * FROM "figurine" WHERE id=$1';
    const figurine = await client.query(sql, [id]);
    return figurine.rows[0];
  },

  getAllReviews : async (id) => {
    const sql = 'SELECT * FROM "review" WHERE figurine_id=$1';
    const review = await client.query(sql, [id]);
    return review.rows;
  },

  getNote : async (figurineId) => {
    const sqlQuery = `SELECT figurine_id, ROUND(AVG(note)) as note FROM review WHERE figurine_id = $1 GROUP BY figurine_id`;
    const note = await client.query(sqlQuery, [figurineId]);
    return note.rows[0];
  },

  getCategoryNumber : async () => {
    const sql = `SELECT category, COUNT(name) AS number FROM figurine GROUP BY category ORDER BY number`
    const catNumber = await client.query(sql);
    return catNumber.rows;
  },

  getFigurinesByCategory : async (category) => {
    const sql = `SELECT * FROM figurine WHERE category = $1`;
    const figCategory = await client.query(sql, [category]);
    return figCategory.rows;
  },

  insertFigurine : async (figObj) => {
    const {name, description, size, price, category} = figObj;
    const sql = `INSERT INTO figurine ("name", "description", "size", "price", "category") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const figurine = await client.query(sql, [name, description, size, price, category]);
    return figurine.rows[0];
  },

  deleteFigurineFromDB : async (figName) => {
    const name = figName.name;
    const sql = `DELETE FROM figurine WHERE name = $1 RETURNING*`;
    const figurines = await client.query(sql, [name]);
    return figurines.rows;
  },

};

module.exports = dataMapper;
