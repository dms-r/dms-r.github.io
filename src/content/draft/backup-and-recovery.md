---
author: Dimas
pubDatetime: 2025-03-19T10:20:00Z
title: Guide Backup & Disaster Recovery Linux
featured: false
draft: false
tags:
  - linux
  - automation
  - backup
  - text
description:
  Berisikan panduan teknis singkat tentang backup dan konfigurasinya.
---

## Table of contents

Backup dan Disaster Recovery (BDR) adalah strategi penting dalam administrasi sistem Linux untuk melindungi data dan memastikan layanan tetap berjalan meskipun terjadi kegagalan sistem.  

## **1. Strategi Backup & Disaster Recovery**  
💾 **Backup:** Salinan data untuk pemulihan jika terjadi kehilangan.  
🛑 **Disaster Recovery:** Rencana untuk memulihkan sistem jika terjadi kegagalan besar.  

### **📌 Jenis Backup:**  
1️⃣ **Full Backup** → Menyalin semua data. Lambat, tapi lengkap.  
2️⃣ **Incremental Backup** → Menyalin perubahan sejak backup terakhir. Lebih cepat, tapi pemulihan lebih lama.  
3️⃣ **Differential Backup** → Menyalin perubahan sejak full backup terakhir. Kompromi antara full & incremental.  

---

## **2. Konfigurasi `rsync` untuk Backup**  
`rsync` adalah tool di Linux yang digunakan untuk sinkronisasi file dan backup data.  

### **📌 Cara Kerja `rsync`**  
✅ **Sinkronisasi file secara efisien** – hanya meng-copy perubahan.  
✅ **Dapat digunakan untuk backup lokal maupun remote**.  

### **📌 Contoh Backup dengan `rsync`**  
📌 **Backup Direktori ke Hard Drive Eksternal**  
```bash
rsync -av --delete /home/user/ /mnt/backup/
```
**Penjelasan:**  
- `-a` → Archive mode (menjaga hak akses, timestamp, dsb).  
- `-v` → Verbose (menampilkan proses).  
- `--delete` → Menghapus file di backup jika sudah dihapus di sumber.  

📌 **Backup ke Server Remote dengan SSH**  
```bash
rsync -avz -e ssh /home/user/ user@remote-server:/backup/
```
**Penjelasan:**  
- `-z` → Mengompresi data saat transfer.  
- `-e ssh` → Menggunakan SSH untuk transfer yang aman.  

📌 **Menjadwalkan `rsync` dengan Cron Job**  
```bash
crontab -e
```
Tambahkan baris ini untuk backup setiap malam pukul 02:00:  
```bash
0 2 * * * rsync -av --delete /home/user/ /mnt/backup/
```

---

## **3. Snapshot untuk Backup Instan (LVM & Btrfs)**  
Snapshot adalah metode backup cepat yang menyimpan **salinan instan** dari data tanpa menyalin ulang seluruh isi disk.  

### **📌 Snapshot dengan LVM (Logical Volume Manager)**  
1️⃣ **Buat snapshot volume LVM**  
```bash
lvcreate -L1G -s -n snap_backup /dev/vg0/lv_data
```
2️⃣ **Mount snapshot untuk akses**  
```bash
mount /dev/vg0/snap_backup /mnt/snapshot
```
3️⃣ **Hapus snapshot setelah selesai**  
```bash
lvremove /dev/vg0/snap_backup
```

### **📌 Snapshot dengan Btrfs**  
Btrfs mendukung snapshot tanpa perlu LVM.  
1️⃣ **Buat snapshot**  
```bash
btrfs subvolume snapshot /data /backup/snapshot_$(date +%F)
```
2️⃣ **List snapshot yang ada**  
```bash
btrfs subvolume list /
```
3️⃣ **Restore snapshot**  
```bash
btrfs subvolume delete /data
btrfs subvolume snapshot /backup/snapshot_2024-03-19 /data
```

---

## **4. RAID (Redundant Array of Independent Disks)**
RAID digunakan untuk meningkatkan **keamanan dan performa** penyimpanan dengan mengombinasikan beberapa disk.  

### **📌 Tipe RAID Populer**  
| **RAID Level** | **Keunggulan** | **Kelemahan** |
|--------------|-------------|-------------|
| RAID 0 (Striping) | Kecepatan tinggi | Tidak ada redundansi |
| RAID 1 (Mirroring) | Redundansi penuh | Kapasitas disk efektif 50% |
| RAID 5 (Striping + Parity) | Kecepatan tinggi + fault tolerance | Butuh minimal 3 disk |
| RAID 10 (RAID 1+0) | Kecepatan tinggi + redundansi kuat | Butuh minimal 4 disk |

### **📌 Setup RAID 1 (Mirroring) dengan `mdadm`**  
📌 **Instal `mdadm`**  
```bash
sudo apt install mdadm
```
📌 **Buat RAID 1 dari dua disk (`/dev/sdb` dan `/dev/sdc`)**  
```bash
sudo mdadm --create --verbose /dev/md0 --level=1 --raid-devices=2 /dev/sdb /dev/sdc
```
📌 **Cek status RAID**  
```bash
cat /proc/mdstat
```
📌 **Simpan konfigurasi RAID**  
```bash
sudo mdadm --detail --scan >> /etc/mdadm/mdadm.conf
```
📌 **Format RAID dan mount**  
```bash
sudo mkfs.ext4 /dev/md0
sudo mount /dev/md0 /mnt/raid1
```

---

## **5. Failover System – High Availability (HA)**  
Failover system memastikan layanan tetap berjalan meskipun terjadi kegagalan server atau hardware.  

### **📌 Metode Failover System**  
✅ **Load Balancer (Nginx, HAProxy)** → Membagi lalu lintas ke beberapa server.  
✅ **Cluster Failover (Pacemaker, Corosync)** → Otomatis mengganti server jika satu mati.  
✅ **Virtual IP dengan Keepalived** → IP tetap tersedia meskipun server utama mati.  

### **📌 Contoh: Setup Load Balancer dengan HAProxy**  
📌 **Instal HAProxy**  
```bash
sudo apt install haproxy
```
📌 **Konfigurasi Load Balancer**  
Edit `/etc/haproxy/haproxy.cfg`  
```bash
frontend http_front
   bind *:80
   default_backend web_servers

backend web_servers
   balance roundrobin
   server web1 192.168.1.101:80 check
   server web2 192.168.1.102:80 check
```
📌 **Restart HAProxy**  
```bash
sudo systemctl restart haproxy
```

---

## **🔹 Kesimpulan & Best Practice**
✅ **Gunakan `rsync` untuk backup otomatis dengan cron job.**  
✅ **Gunakan snapshot (LVM/Btrfs) untuk backup instan tanpa downtime.**  
✅ **Konfigurasi RAID untuk meningkatkan keandalan penyimpanan data.**  
✅ **Implementasi failover system dengan Load Balancer atau HA Cluster.**  
