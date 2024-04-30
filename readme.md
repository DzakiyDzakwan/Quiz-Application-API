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

5. Ubah file `.env.example` menjadi `.env`, lalu sesuaikan bagian berikut sesuai dengan database yang digunakan
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

# Endpoints

## Autentikasi
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Mendaftarkan akun baru kedalam sistem | `http://localhost:3333/api/v1/auth/register` | `false`|
   | 2 | Masuk ke sistem dengan akun yang sudah terdaftar | `http://localhost:3333/api/v1/auth/login` | `false`|

## Pengelolaan Profile
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Melihat profil akun yang login | `` | `false`|
   | 2 | Memperbarui profil akun yang login | `` | `false`|
   | 3 | Melihat ruangan yang dimiliki akun yang login | `` | `false`|
   | 4 | Melihat kuis yang dibuat akun yang login | `` | `false`|
   | 5 | Melihat percobaan kuis yang sudah diselesaikan akun yang login | `` | `false`|
   | 6 | Menonaktifkan akun yang login | `` | `false`|

## Pengelolaan User
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Melihat seluruh user aktif yang ada didalam sistem | `` | `false`|
   | 2 | Melihat seluruh user inaktif yang ada didalam sistem | `` | `false`|
   | 3 | Melihat detail user berdasarkan id user yang dipilih | `` | `false`|
   | 4 | Menambahkan user baru | `` | `false`|
   | 5 | Memperbarui data user berdasarkan id user yang dipilih | `` | `false`|
   | 6 | Menonaktifkan user berdasarkan id user yang dipilih | `` | `false`|
   | 7 | Menghapus permanen user berdasarkan id user yang dipilih | `` | `false`|
   | 8 | Menambahkan role user | `` | `false`|
   | 9 | Menghapus role user | `` | `false`|
   | 10 | Menambahkan hak akses user | `` | `false`|
   | 11 | Menghapus hak akses user | ``|`false`|

## Pengelolaan Role
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Melihat seluruh role yang ada didalam sistem | `` | `false`|
   | 2 | Melihat detail role berdasarkan id role yang dipilih | `` | `false`|
   | 3 | Menambahkan role baru | `` | `false`|
   | 4 | Memperbarui data role berdasarkan id role yang dipilih | `` | `false`|
   | 5 | Menghapus permanen role berdasarkan id role yang dipilih | `` | `false`|
   | 6 | Menambahkan hak akses role | `` | `false`|
   | 7 | Menghapus hak akses role | ``|`false`|

## Pengelolaan Hak Akses
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Melihat seluruh hak akses yang ada didalam sistem | `` | `false`|
   | 2 | Melihat detail hak akses berdasarkan id hak akses yang dipilih | `` | `false`|
   | 3 | Menambahkan hak akses baru | `` | `false`|
   | 4 | Memperbarui data hak akses berdasarkan id hak akses yang dipilih | `` | `false`|
   | 5 | Menghapus permanen hak akses berdasarkan id hak akses yang dipilih | ``|`false`|

## Pengelolaan Ruangan
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Melihat seluruh ruangan yang ada didalam sistem | `` | `false`|
   | 2 | Melihat detail ruangan berdasarkan kode ruangan yang dipilih | `` | `false`|
   | 3 | Menambahkan ruangan baru | `` | `false`|
   | 4 | Memperbarui data ruangan berdasarkan kode ruangan yang dipilih | `` | `false`|
   | 5 | Menghapus permanen ruangan berdasarkan kode ruangan yang dipilih | `` | `false`|
   | 6 | Melihat seluruh kuis yang ada ada didalam ruangan berdasarkan kode ruangan yang dipilih | `` | `false`|

## Pengelolaan Peserta Ruangan
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Bergabung dengan ruangan berdasarkan kode ruangan yang dimasukan | `` | `false`|
   | 2 | Keluar ruangan berdasarkan kode ruangan yang dipilih | `` | `false`|
   | 3 | Keluar ruangan berdasarkan kode ruangan yang dipilih | `` | `false`|
   | 4 | Melihat Leaderboard peserta ruangan berdasarkan kode ruangan yang dipilih | `` | `false`|

## Pengelolaan Kuis
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Melihat seluruh kuis yang ada didalam sistem | `` | `false`|
   | 1 | Melihat seluruh kuis publik yang ada didalam sistem | `` | `false`|
   | 2 | Melihat detail kuis berdasarkan id kuis yang dipilih | `` | `false`|
   | 3 | Menambahkan kuis baru | `` | `false`|
   | 4 | Memperbarui data kuis berdasarkan id kuis yang dipilih | `` | `false`|
   | 5 | Menghapus permanen kuis berdasarkan id kuis yang dipilih | `` | `false`|
   | 6 | Menambahkan pertanyaan Kuis | `` | `false`|
   | 7 | Melihat seluruh percobaan yang dilakukan kuis berdasarkan id kuis yang dipilih | `` | `false`|
   | 8 | Melihat percobaan kuis akun yang login | `` | `false`|
   | 9 | Melihat Leaderboard kuis berdasarkan id kuis yang dipilih | `` | `false`|

## Pengelolaan Pertanyaan Kuis
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Memperbarui data pertanyaan berdasarkan id pertanyaan yang dipilih | `` | `false`|
   | 2 | Menghapus pertanyaan kuis | `` | `false`|

## Pengelolaan Jawaban Pertanyaan Kuis
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Memperbarui data jawaban pertanyaan berdasarkan id jawaban pertanyaan yang dipilih | `` | `false`|
   | 2 | Menghapus jawaban pertanyaan kuis | `` | `false`|

## Pengelolaan Percobaan Kuis
   | No | Deskripsi | Endpoint | auth |
   | :--| :---------| :--------| :----|
   | 1 | Melihat detail percobaan kuis berdasarkan id percobaan yang dipilih | `` | `false`|
   | 2 | Mulai mengerjakan kuis | `` | `false`|
   | 3 | Selesai mengerjakan kuis | ``|`false`|

# Contact Me

- Email : [dzakcart@gmail.com](dzakcart@gmail.com)
- Linkedin : [Dzakiy Dzakwan](https://www.linkedin.com/in/dzakiydzakwan/)
- Github : [Dzakiy Dzakwan](https://github.com/DzakiyDzakwan)
