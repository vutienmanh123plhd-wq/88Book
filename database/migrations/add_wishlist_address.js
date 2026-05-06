import pool from "../../backend/config/database.js";

const migrate = async () => {
  try {
    console.log("Creating user_addresses and wishlists tables...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_addresses (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        label VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        street TEXT NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zip_code VARCHAR(50) NOT NULL,
        country VARCHAR(100) NOT NULL,
        is_default BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log("✅ Table user_addresses created or already exists.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS wishlists (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        book_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
        UNIQUE (user_id, book_id)
      );
    `);
    console.log("✅ Table wishlists created or already exists.");

  } catch (error) {
    console.error("❌ Error running migration:", error);
  } finally {
    process.exit(0);
  }
};

migrate();
