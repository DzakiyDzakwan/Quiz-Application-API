# Quiz Application API

Quiz Application API merupakan sebuah RESTful API yang dirancang untuk memudahkan pembuatan aplikasi kuis interaktif. API ini menyediakan berbagai fitur untuk mengelola kuis, pertanyaan dan jawaban sehingga frontend developer dapat fokus pada desain dan pengalaman pengguna aplikasi.

Project ini juga dibuat untuk memenuhi tugas Backend Project program Studi Independen Kampus Merdeka [Sanber Foundation](https://sanberfoundation.org/)

# Tech Stack

Project ini dikembangkan menggunakan [ExpressJS](https://expressjs.com/) sebagai framework utama. Beserta beberapa package / library pendukung lainnya seperti :

| Library                                                                     | Fungsi                                                                                                                                                |
| :-------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mysql2](https://sidorares.github.io/node-mysql2/docs)                      | Sebagai koneksi database: Membantu menghubungkan API ke database MySQL untuk menyimpan dan mengambil data kuis, pertanyaan, jawaban, dan penilaian.   |
| [jsonwebtoken](https://jwt.io/)                                             | Sebagai autentikasi pengguna: Membantu memverifikasi identitas pengguna dan memberikan akses ke API berdasarkan peran mereka.                         |
| [express-validator](https://github.com/express-validator/express-validator) | Sebagai validasi request: Membantu memvalidasi input pengguna untuk memastikan data yang dimasukkan akurat dan lengkap.                               |
| [moment](https://momentjs.com/)                                             | Sebagai manipulasi tanggal dan waktu: Membantu memformat tanggal dan waktu dengan benar, menghitung durasi kuis, dan melacak waktu penyelesaian kuis. |

# Installation

1. Clone Project
   ```bash
   https://github.com/Fullstack-Javascript-Sanber-Foundation/backend_project_DzakiyDzakwan.git
   ```
2. Masuk ke Direktori

   ```bash
   cd backend_project_DzakiyDzakwan
   ```

3. Export Database dari folder `/databases/sanber-backend-project.sql`

4. Kemudian install package

   ```bash
   npm installl
   ```

5. Ubah file `.env.example` menjadi `.env`, lalu sesuaikan bagian berikut dengan database yang digunakan
   ```
   MYSQL_HOST=127.0.0.1
   MYSQL_PORT=3306
   MYSQL_USER=root
   MYSQL_PASSWORD=
   MYSQL_DB_NAME=sanber-backend-project
   ```
6. Kemudian seed data dummy menggunakan perintah

   ```bash
   node seed
   ```

7. Jalankan server api
   ```bash
   npm run dev
   ```

# Features

1. Autentikasi
2. Role Base Acces Controller ( RBAC )
3. Pengelolaan Kuis
4. Pengelolaan Pertanyaan Kuis
5. Pengelolaan Jawaban Pertanyaan Kuis
6. Pengelolaan Peserta Kuis

# Contact Me

- Email : [dzakcart@gmail.com](dzakcart@gmail.com)
- Linkedin : [Dzakiy Dzakwan](https://www.linkedin.com/in/dzakiydzakwan/)
- Github : [Dzakiy Dzakwan](https://github.com/DzakiyDzakwan)
