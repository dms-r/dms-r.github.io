---
author: Dimas
pubDatetime: 2025-03-19T09:25:00Z
title: Guide User & Access Management on Linux
featured: true
draft: true
tags:
  - linux
  - security
  - text
description:
  Berisikan panduan teknis singkat tentang cara mengatur user dan aksesnya.
---

## Table of contents

**User & Access Management** adalah salah satu aspek penting dalam administrasi Linux yang bertujuan untuk:  
✅ Mengontrol siapa saja yang bisa masuk ke sistem.  
✅ Mengatur hak akses terhadap file dan direktori.  
✅ Menentukan hak istimewa (privilege) bagi pengguna tertentu.  

Terdapat **3 komponen utama** dalam manajemen user & akses di Linux:  
1. **Manajemen Akun** (User & Group)  
2. **Manajemen Permission** (chmod, chown)  
3. **Manajemen Hak Istimewa** (sudo)  

---

## **1️⃣ Manajemen Akun (User & Group)**
Di Linux, pengguna (user) dan grup (group) digunakan untuk mengatur akses terhadap file dan sistem.  

### **🔹 Jenis User di Linux**  
1️⃣ **Root User** → Superuser dengan akses penuh ke sistem.  
2️⃣ **Regular User** → Pengguna biasa dengan hak terbatas.  
3️⃣ **System User** → Akun khusus untuk layanan sistem (misalnya `www-data` untuk Apache).  

### **🔹 Perintah Dasar Manajemen User**
📌 **Membuat User Baru**  
```bash
sudo useradd -m -s /bin/bash nama_user
```
- `-m` → Membuat home directory (`/home/nama_user`).  
- `-s /bin/bash` → Menetapkan shell default.  

📌 **Mengatur Password User**  
```bash
sudo passwd nama_user
```

📌 **Menghapus User**  
```bash
sudo userdel -r nama_user
```
- `-r` → Menghapus home directory user.  

---

### **🔹 Manajemen Group**
Group digunakan untuk mengelompokkan user agar memiliki hak akses yang sama.  

📌 **Membuat Group Baru**  
```bash
sudo groupadd nama_group
```

📌 **Menambahkan User ke Group**  
```bash
sudo usermod -aG nama_group nama_user
```
- `-aG` → Menambahkan user ke group tanpa menghapus grup sebelumnya.  

📌 **Melihat Group dari User**  
```bash
groups nama_user
```

📌 **Menghapus User dari Group**  
```bash
sudo gpasswd -d nama_user nama_group
```

---

## **2️⃣ Manajemen Permission (chmod, chown)**
**Permission (izin akses)** menentukan siapa yang dapat membaca, menulis, atau mengeksekusi file/direktori di Linux.  

### **🔹 Struktur Permission di Linux**  
Gunakan perintah `ls -l` untuk melihat permission file/direktori:  
```bash
ls -l /etc/passwd
```
Contoh output:  
```
-rw-r--r--  1 root root 2345 Mar 18 10:00 /etc/passwd
```
- **`-rw-r--r--`** → Mode permission.  
- **`1 root root`** → Pemilik dan grup file.  
- **`2345`** → Ukuran file dalam byte.  
- **`Mar 18 10:00`** → Waktu terakhir diubah.  
- **`/etc/passwd`** → Nama file.  

### **🔹 Format Permission**
```
r (read)  = 4   → Bisa membaca file/direktori  
w (write) = 2   → Bisa mengubah file/direktori  
x (execute) = 1 → Bisa mengeksekusi file/direktori  
```
Misalnya, `-rw-r--r--` memiliki arti:  
- **Pemilik (user)**: Bisa membaca & menulis (`rw-`).  
- **Grup**: Hanya bisa membaca (`r--`).  
- **Orang lain (other)**: Hanya bisa membaca (`r--`).  

---

### **🔹 Mengubah Permission dengan `chmod`**  
📌 **Mengatur izin menggunakan angka (Numeric Mode)**  
Formatnya: `chmod [nilai] nama_file`  
```bash
chmod 755 script.sh
```
Artinya:  
- **7 (`rwx`)** → Pemilik bisa baca, tulis, eksekusi.  
- **5 (`r-x`)** → Grup bisa baca & eksekusi.  
- **5 (`r-x`)** → Orang lain bisa baca & eksekusi.  

📌 **Mengatur izin menggunakan simbol (Symbolic Mode)**  
Formatnya: `chmod [siapa]+/-[izin] nama_file`  
```bash
chmod u+x script.sh  # Memberi izin eksekusi ke pemilik
chmod g-w file.txt    # Menghapus izin tulis dari grup
chmod o+r file.txt    # Memberi izin baca ke orang lain
```

---

### **🔹 Mengubah Pemilik File dengan `chown`**  
📌 **Mengganti pemilik file**  
```bash
sudo chown user1 file.txt
```
📌 **Mengganti pemilik & grup**  
```bash
sudo chown user1:group1 file.txt
```
📌 **Mengubah kepemilikan seluruh folder**  
```bash
sudo chown -R user1:group1 /var/www/
```
- `-R` → Mengubah kepemilikan semua file di dalam folder.  

---

## **3️⃣ Manajemen Hak Istimewa (sudo)**
Superuser (root) memiliki akses penuh ke sistem. Untuk user biasa, akses root bisa diberikan menggunakan `sudo`.  

📌 **Menambahkan User ke Sudoers**  
```bash
sudo usermod -aG sudo nama_user
```

📌 **Edit file sudoers untuk izin lebih spesifik**  
```bash
sudo visudo
```
Tambahkan aturan:  
```
nama_user ALL=(ALL) NOPASSWD:ALL
```
→ User dapat menjalankan semua perintah tanpa perlu memasukkan password.  

📌 **Menjalankan perintah dengan sudo**  
```bash
sudo apt update
```

---

## **Kesimpulan & Best Practice**
✅ **User & Group Management**  
- Gunakan **group** untuk mengatur akses bersama.  
- **Nonaktifkan user yang tidak aktif** dengan `passwd -l nama_user`.  

✅ **Permission & Ownership**  
- Beri **izin yang paling minimum** yang dibutuhkan (Prinsip **Least Privilege**).  
- Hindari menggunakan `chmod 777` karena terlalu permisif.  

✅ **sudo & Privilege Management**  
- **Jangan login langsung sebagai root**, gunakan `sudo`.  
- **Gunakan sudoers dengan bijak**, batasi user yang bisa menjalankan perintah root.  
