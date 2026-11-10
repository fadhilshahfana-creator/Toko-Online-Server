1. Dasar Server dan Routing Express (server.js & routes.js)
   
   a. Latihan 1 - 3: Pengenalan pembuatan server HTTP sederhana dan pemisahan modul rute (Modular Routing) menggunakan Express Router.

   b. Latihan 4: Penanganan Request Body dengan format JSON
   
   c. Latihan 5 - 6: Ekstraksi Query Parameters (req.query) dan URL Parameters (req.params) untuk penanganan input dinamis dari URL.

3. Integritas Database PostgreSQL (db.js & test-db.js)
   
   a. Konfigurasi pool: Menghubungkan aplikasi Node.js ke PostgreSQL menggunakan modul pg dan variabel lingkungan .env.
   
   b. Pengujian database: Skrip pengujian terpisah untuk memverifikasi status koneksi dan menjalankan query dasar ke database.

4. API Utama (server.js)
   Mekanisme CRUD lengkap yang terhubung ke database TokoOnline:

   API Produk

   GET /api/products — Mengambil seluruh daftar produk.

   GET /api/products/:id — Mengambil detail produk berdasarkan ID (dilengkapi validasi angka).

   POST /api/products — Menambahkan produk baru.

   PUT /api/products/:id — Memperbarui data produk berdasarkan ID.

   DELETE /api/products/:id — Menghapus data produk.

   API Kategori

   GET /api/categories — Mengambil seluruh daftar kategori.

   GET /api/categories/:id — Mengambil detail kategori berdasarkan ID.

   POST /api/categories — Menambahkan kategori baru.

   PUT /api/categories/:id — Memperbarui data kategori berdasarkan ID.

   DELETE /api/categories/:id — Menghapus kategori (dilengkapi penanganan error Foreign Key Constraint jika kategori masih digunakan oleh produk).
   
