// LATIHAN 1
/*console.log('Halo, kita akan belajar membuat server menggunakan Express ');
*/

// LATIHAN 2
/*import express from 'express';

const app = express();
const port = 3000;
const host = 'localhost';

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
*/

// LATIHAN 3
/*import express from 'express';
import routes from './routes.js';

const app = express();
const port = 3000;
const host = 'localhost';

app.use ('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});
*/

//LATIHAN 4
/*import express from 'express';

const app = express();
const port = 3000;
const host = 'localhost';

//Middleware untuk parsing JSON body
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.send(`Welcome ${username}!`);
})

app.listen(port, () => {
  console.log(`Server running at http://${host}:3000`);
});
*/

//LATIHAN 5
/*import express from 'express';
const app = express();

app.get('/', (req, res) => {
  const { name, location } = req.query;
  res.send(`Hello, ${name} from ${location}`);
});

app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});*/

/*import express from 'express';
import routes from './routes.js';

const app = express();

app.use('/', routes);
/*app.get('/users{/:username}', (req, res) => {
  const { username = 'stranger' } = req.params;
  res.send(`Hello, ${username}!`);
});*/ // LATIHAN 6

/*const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
*/

// API COMMONJS
const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

//latihan 9
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err)
    return res.status(400).json({ message: 'Data produk tidak valid' });
  next();
})
const HOST = 'localhost'
const PORT = 3000;

// ||============||
// || API PRODUK ||
// ||============||  
// MENGAMBIL SELURUH PRODUK
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY product_id'
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Gagal mengambil seluruh produk:', error.message);

    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data produk'
    });
  }
});

// MENGAMBIL SATU PRODUK BERDASARKAN ID
app.get('/api/products/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'ID produk harus berupa bilangan bulat positif'
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE product_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Produk tidak ditemukan'
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Gagal mengambil produk:', error.message);

    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data produk'
    });
  }
});

// MENAMBAH PRODUK BARU
app.post('/api/products', async (req, res) => {
  const { product_name, product_desc, stock, price, category_id } = req.body;

  if (!product_name || price == null || (stock != null && stock < 0) || price <= 0) {
    return res.status(400).json({
      message: 'Data produk tidak valid'
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products
      (product_name, product_desc, stock, price, category_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [
        product_name.trim(),
        product_desc ? product_desc.trim() : null,
        stock ?? 0,
        price,
        category_id
      ]
    );

    res.status(201).json({
      message: 'Produk berhasil ditambahkan',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Gagal menambahkan produk:', error.message);

    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan produk'
    });
  }
});

// UPDATE DATA PRODUK SESUAI ID
app.put('/api/products/:id', async (req, res) => {
  const product_id = Number(req.params.id);
  const { product_name, product_desc, stock, price, category_id } = req.body;
 
  if (!Number.isSafeInteger(product_id) || product_id <= 0) {
    return res.status(400).json({
      message: 'ID produk tidak valid'
    });
  }
  
  try {
    const result = await pool.query(
      `UPDATE products
      SET product_name = $1,
      product_desc = $2,
      stock = $3,
      price = $4,
      category_id = $5
      WHERE product_id = $6
      RETURNING *`,
      [
        product_name.trim(),
        product_desc ? product_desc.trim() : null,
        stock ?? 0,
        price,
        category_id,
        product_id
      ]
    );
   
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Produk tidak ditemukan'
      });
    }
    
    res.status(200).json({
      message: 'Produk berhasil diperbarui',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Gagal memperbarui produk:', error.message);
   
    res.status(500).json({
      message: 'Terjadi kesalahan saat memperbarui produk'
    });
  }
});

// DELETE PRODUK
app.delete('/api/products/:id', async (req, res) => {
  const product_id = Number(req.params.id);

  if (!Number.isSafeInteger(product_id) || product_id <= 0) {
    return res.status(400).json({
      message: 'ID produk tidak valid'
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM products WHERE product_id = $1',
      [product_id]
    );

    // ini kuncinya
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Produk tidak ditemukan'
      });
    }

    res.status(200).json({
      message: 'Produk berhasil dihapus'
    });
  } catch (error) {
    console.error('Gagal menghapus produk:', error.message);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus produk'
    });
  }
});

//  ||==============||
//  || API KATEGORI ||
//  ||==============||
// MENGAMBIL SELURUH KATEGORI
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY category_id'
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Gagal mengambil seluruh kategori:', error.message);

    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data kategori'
    });
  }
});

// MENGAMBIL SATU KATEGORI BERDASARKAN ID
app.get('/api/categories/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return res.status(400).json({
      message: 'ID kategori harus berupa bilangan bulat positif'
    });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM categories WHERE category_id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Kategori tidak ditemukan'
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Gagal mengambil kategori:', error.message);

    res.status(500).json({
      message: 'Terjadi kesalahan saat mengambil data kategori'
    });
  }
});

// MENAMBAHKAN KATEGORI BARU
app.post('/api/categories', async (req, res) => {
  const { category_name, category_desc } = req.body;

  if (!category_name || category_name.trim() === '') {
    return res.status(400).json({
      message: 'Data kategori tidak valid'
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO categories
      (category_name, category_desc)
      VALUES ($1, $2)
      RETURNING *`,
      [
        category_name.trim(),
        category_desc ? category_desc.trim() : null
      ]
    );

    res.status(201).json({
      message: 'Kategori berhasil ditambahkan',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Gagal menambahkan kategori:', error.message);

    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan kategori'
    });
  }
});

// UPDATE DATA KATEGORI BERDASARKAN ID
app.put('/api/categories/:id', async (req, res) => {
  const category_id = Number(req.params.id);
  const { category_name, category_desc} = req.body;
 
  if (!Number.isSafeInteger(category_id) || category_id <= 0) {
    return res.status(400).json({
      message: 'ID kategori tidak valid'
    });
  }
  
  try {
    const result = await pool.query(
      `UPDATE categories
      SET category_name = $1,
          category_desc = $2
      WHERE category_id = $3
      RETURNING *`,
      [
        category_name.trim(),
        category_desc ? category_desc.trim() : null,
        category_id
      ]
    );
   
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Kategori tidak ditemukan'
      });
    }
    
    res.status(200).json({
      message: 'Kategori berhasil diperbarui',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Gagal memperbarui kategori:', error.message);
   
    res.status(500).json({
      message: 'Terjadi kesalahan saat memperbarui kategori'
    });
  }
});

// DELETE KATEGORI
app.delete('/api/categories/:id', async (req, res) => {
  const category_id = Number(req.params.id);

  if (!Number.isSafeInteger(category_id) || category_id <= 0) {
    return res.status(400).json({
      message: 'ID kategori tidak valid'
    });
  }

  try {
    const result = await pool.query(
      'DELETE FROM categories WHERE category_id = $1',
      [category_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Kategori tidak ditemukan'
      });
    }

    res.status(200).json({
      message: 'Kategori berhasil dihapsu'
    });
  } catch (error) {
    console.error('Gagal menghapus kategori:', error.message);

    if (error.code === '23503') {
      return res.status(409).json({
        message: 'Kategori tidak dapat dihapus karena masih digunakan oleh produk'
      });
    }

    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus kategori'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://${HOST}:${PORT}`);
});