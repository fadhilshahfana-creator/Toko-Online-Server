/*import pool from './db.js';

async function testProducts() {
try {
const kategori = await pool.query('SELECT * FROM categories');
const produk = await pool.query('SELECT * FROM products');

console.log('Jumlah Kategori:', kategori.rows.length);
console.table(kategori.rows);

console.log('Jumlah Produk:', produk.rows.length);
console.table(produk.rows);

} catch (error) {
console.error('Gagal membaca tabel.');
console.error(error.message);
} finally {
await pool.end();
}
}
testProducts();
*/

/*const pool = require('./db');

async function testConnection() {
    try {
        const result = await pool.query(
            'SELECT current_database() AS database_name'
        );

        console.log('Koneksi database berhasil.');
        console.log('Database:', result.rows[0].database_name);
    } catch (error) {
        console.error('Koneksi database gagal.');
        console.error(error.message);
    } finally {
        await pool.end();
    }
}
testConnection();
*/

const pool = require('./db');

async function testProducts() {
    try {
        const result = await pool.query(
            'SELECT * FROM products LIMIT 3'
        );

        console.log('Jumlah data yang ditampilkan:', result.rows.length);
        console.table(result.rows);
    } catch (error) {
        console.error('Gagal membaca tabel products.');
        console.error(error.message);
    } finally {
        await pool.end();
    }
}
testProducts();