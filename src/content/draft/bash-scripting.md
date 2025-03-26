---
author: Dimas
pubDatetime: 2025-03-19T09:40:00Z
title: Guide Bash Scripting on Linux
featured: false
draft: true
tags:
  - linux
  - automation
  - bash
  - text
description:
  Berisikan panduan teknis singkat tentang automisasi, lebih khususnya bash scripting.
---

## Table of contents

Automasi sistem sangat penting dalam administrasi Linux untuk meningkatkan efisiensi, mengurangi kesalahan manusia, dan menghemat waktu dalam menjalankan tugas berulang. Ada dua bahasa utama yang sering digunakan untuk automasi di Linux:  

1. **Bash Scripting** – Cocok untuk tugas sistem sederhana dan otomatisasi command line.  
2. **Python Scripting** – Lebih fleksibel, cocok untuk automasi yang lebih kompleks dan integrasi dengan API.  

---

## **1️⃣ Bash Scripting**  
Bash (Bourne Again Shell) adalah shell default di banyak distribusi Linux dan mendukung scripting untuk menjalankan serangkaian perintah secara otomatis.  

### **🔹 Struktur Dasar Bash Script**  
Bash script adalah file teks yang berisi perintah Linux yang dieksekusi secara berurutan.  

📌 **Membuat Bash Script Sederhana**  
1️⃣ **Buat file baru:**  
```bash
nano script.sh
```
2️⃣ **Tambahkan kode berikut:**  
```bash
#!/bin/bash
echo "Hello, ini adalah script Bash pertama saya!"
```
3️⃣ **Beri izin eksekusi dan jalankan:**  
```bash
chmod +x script.sh
./script.sh
```

**Penjelasan:**  
- `#!/bin/bash` → Menentukan bahwa script ini dijalankan dengan Bash.  
- `echo` → Perintah untuk mencetak teks ke terminal.  

---

### **🔹 Variabel dalam Bash**  
📌 **Mendeklarasikan variabel**  
```bash
nama="Linux Admin"
echo "Selamat datang, $nama!"
```
📌 **Membaca input dari pengguna**  
```bash
echo "Masukkan nama Anda:"
read nama
echo "Halo, $nama!"
```

---

### **🔹 Conditional Statement (`if` dalam Bash)**  
Digunakan untuk membuat keputusan berdasarkan kondisi tertentu.  

📌 **Contoh: Cek apakah file ada atau tidak**  
```bash
#!/bin/bash
file="/etc/passwd"

if [ -f "$file" ]; then
    echo "File $file ditemukan!"
else
    echo "File $file tidak ditemukan!"
fi
```

- `[ -f "$file" ]` → Mengecek apakah file ada.  
- `then` → Menjalankan perintah jika kondisi benar.  
- `else` → Menjalankan perintah jika kondisi salah.  

---

### **🔹 Looping dalam Bash (`for`, `while`)**  
Digunakan untuk mengulang perintah dalam jumlah tertentu.  

📌 **Contoh: Loop mencetak angka 1-5**  
```bash
for i in {1..5}; do
    echo "Angka ke-$i"
done
```

📌 **Contoh: Loop membaca isi file baris per baris**  
```bash
while read line; do
    echo "Isi baris: $line"
done < file.txt
```

---

### **🔹 Automasi dengan Cron Job**  
Cron Job digunakan untuk menjalankan script secara otomatis pada waktu tertentu.  

📌 **Buka crontab editor:**  
```bash
crontab -e
```
📌 **Tambahkan jadwal eksekusi script:**  
```bash
0 2 * * * /home/user/backup.sh
```
**Penjelasan:**  
- `0 2 * * *` → Menjalankan script setiap hari pukul 02:00.  
- `/home/user/backup.sh` → Path script yang akan dijalankan.  

---

## **2️⃣ Python Scripting**  
Python sering digunakan untuk **automasi lebih kompleks** seperti manajemen sistem, monitoring server, dan pemrosesan data.  

### **🔹 Struktur Dasar Python Script**  
1️⃣ **Buat file Python baru:**  
```bash
nano script.py
```
2️⃣ **Tambahkan kode berikut:**  
```python
#!/usr/bin/python3
print("Hello, ini adalah script Python pertama saya!")
```
3️⃣ **Jalankan script:**  
```bash
python3 script.py
```

---

### **🔹 Automasi dengan Python**  
📌 **Contoh: Cek penggunaan disk dan kirim email jika hampir penuh**  
```python
import shutil

total, used, free = shutil.disk_usage("/")

if free < 2 * 10**9:  # Jika free space kurang dari 2GB
    print("WARNING: Disk space hampir penuh!")
```

📌 **Contoh: Download file dari internet**  
```python
import requests

url = "https://example.com/file.txt"
response = requests.get(url)

with open("downloaded_file.txt", "wb") as file:
    file.write(response.content)

print("File berhasil didownload!")
```

---

## **3️⃣ Kapan Gunakan Bash vs Python?**
| **Kriteria** | **Gunakan Bash** | **Gunakan Python** |
|-------------|-----------------|-----------------|
| Automasi tugas sistem sederhana | ✅ | ❌ |
| Menjalankan perintah Linux | ✅ | ✅ |
| Automasi kompleks & pengolahan data | ❌ | ✅ |
| Integrasi dengan API/web scraping | ❌ | ✅ |
| Kebutuhan manipulasi string yang kompleks | ❌ | ✅ |

🔹 **Gunakan Bash** untuk **task sederhana** seperti backup, monitoring log, atau konfigurasi server.  
🔹 **Gunakan Python** untuk **task kompleks** seperti analisis data, web automation, dan API integration.  

---

## **Kesimpulan & Best Practice**  
✅ **Gunakan Bash** untuk task ringan & administrasi sistem sehari-hari.  
✅ **Gunakan Python** untuk automasi yang lebih kompleks.  
✅ **Selalu beri izin eksekusi (`chmod +x script.sh`) sebelum menjalankan script Bash.**  
✅ **Gunakan Cron Job untuk menjalankan script secara otomatis.**  
