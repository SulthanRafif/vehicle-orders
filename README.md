# Sistem Pemesanan Mobil Perusahaan

- versi php: 8.0.2
- Framework Backend: Laravel 8.80.0
- Database: MySQL 5.7.33
- Framework FrontEnd: ReactJS 17.0.2


## Cara Install

- Unduh aplikasi ini
- Install xampp dan composer
- Jalankan server MySQL 
- Buat database baru dengan nama: ` pemesanan_kendaraan`
- Copy file `.env.example` dan ubah nama file menjadi `.env`
- Ubah konfigurasi yang ada di file `.env` dengan mengubah isi dari variabel `DB_DATABASE` menjadi ` pemesanan_kendaraan`
- Variabel `DB_USERNAME`, `DB_PASSWORD` menyesuaikan Database MySQL yang ada di lokal anda
- Buka terminal dan masuk ke folder aplikasi 
- Run `$ composer install`
- Run `$ npm install`
- Run `$ php artisan key:generate`
- Run `$ php artisan optimize`
- Run `$ php artisan migrate --seed`
- Run `$ php artisan serve` untuk akses aplikasi
- Buka browser dan ketik url ini: `http://localhost:8000`
- Login sebagai role admin: `admin@admin.com` dan password `password`
- Login sebagai role penyetuju_satu: `penyetuju_satu@mail.com` dan password `password`
- Login sebagai role penyetuju_dua: `penyetuju_dua@mail.com` dan password `password`
