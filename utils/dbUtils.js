import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

export const checkDatabase = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const tables = await conn.query('SHOW TABLES');
    if (tables.length === 0) {
      // create tables
      await conn.query(`
        CREATE TABLE config (
          config_item VARCHAR(50) PRIMARY KEY,
          config_value VARCHAR(255)
        );
      `);
      await conn.query(`
        CREATE TABLE users (
          username VARCHAR(50) PRIMARY KEY,
          password_hash VARCHAR(255)
        );
      `);
    }
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const getConfig = async () => {
  let conn;

  try {
    await checkDatabase();
  } catch (err) {
    throw err;
  }

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT config_item, config_value FROM config');
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const setConfigItem = async (item, value) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO config (config_item, config_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE config_value = ?', [item, value, value]);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const lookupUser = async (username) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT username, password_hash FROM users WHERE username = ?', [username]);
    return rows[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

export const countUsers = async () => {
  let conn;

  try {
    conn = await pool.getConnection();
    const rows = await conn.query({ sql: 'SELECT COUNT(*) as numusers FROM users', bigIntAsNumber: true});
    return rows[0].numusers;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

export const addUser = async (username, password_hash) => {
  let conn;

  try {
    conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, password_hash]);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
}
