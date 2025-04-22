---
title: SSH Server Hardening
published: 2025-04-22
description: 'OpenSSH server best security practices'
image: 'https://miro.medium.com/v2/resize:fit:480/format:webp/0*MG0AskbElj0880O1'
tags: [Security, Server]
category: 'English'
draft: false 
lang: 'en'
---

> *Cover image source*: [*Source*](https://unsplash.com/photos/cable-network-M5tzZtFCOfs)

SSH is like that one reliable friend you trust with your house keys. It's the backbone of remote access in the UNIX world. Whether you're managing a fleet of servers or babysitting a single VPS, chances are you’re relying on OpenSSH to get the job done.

But here's the thing — out of the box, OpenSSH isn't a locked-down fortress. It's more like a sturdy but unlocked door. Misconfigured or neglected, it can become a huge liability. And in today’s threat landscape, assuming your SSH server isn’t a target is dangerously naive.

This guide dives into 14 of the best practices I’ve collected over the months — from hard lessons, late-night learn (yep), and too many logs to count.

Let’s sharpen your SSH server — the right way.

### 1. Disable Root Login

Never let the root user log in via SSH. It’s the digital equivalent of leaving your master key under the doormat.

In your /etc/ssh/sshd_config:
```bash
sudo nano /etc/ssh/sshd_config

# change 
PermitRootLogin yes
# to
PermitRootLogin no
```

If root access is necessary, use sudo from a less privileged account. This adds traceability and a layer of defense.

### 2. Use a Modern Key Type

RSA has been around forever, but it’s showing its age. Prefer ED25519 — it’s faster, smaller, and more secure.
```bash
ssh-keygen -t ed25519 -f ~/.ssh/xxx

# after that, copy pub key to server
ssh-copy-id ~/.ssh/xxx.pub admin@ip.server -p 22
```

If you’re stuck with RSA, at least use a 4096-bit key.
```bash
ssh-keygen -t rsa -b 4096
```

### 3. Use SSH Key Authentication Only

Passwords are easy to guess, phish, or brute-force. SSH keys, on the other hand, are practically unbreakable if handled correctly.

Set like this in /etc/ssh/sshd_config
```bash
sudo nano /etc/ssh/sshd_config

# to this
PasswordAuthentication no
# and this
PubkeyAuthentication yes
```

Keep your private key safe and consider using a passphrase. Trust me, you don’t want that key floating around in plaintext.

### 4. Change the Default SSH Port

Security by obscurity isn’t real security, but it does reduce noise. Port 22 is a magnet for bots. Change in your /etc/ssh/sshd_config:
```bash
sudo nano /etc/ssh/sshd_config

# change from
Port 22
# to
Port 6001
```

Pick any unused high port. This won’t stop a determined attacker, but it helps your logs breathe easier.

### 5. Disable Agent Forwarding

If you don’t need it — kill it.
```bash
AllowAgentForwarding no
```

Agent forwarding can leak credentials if a compromised host is in the middle.

### 6. Set Idle Timeout Intervals

Kill idle sessions automatically. No one likes lingering connections from three days ago.
```bash
ClientAliveInterval 300
ClientAliveCountMax 0
```

This logs users out after 5 minutes of inactivity.

### 7. Limit User Logins

Don’t let everyone and their cat SSH into your server. Control who can log in.
```bash
AllowUsers adminuser deploy
```

A single line in sshd_config can block dozens of attack vectors.

### 8. Disable SSH for Specific Users or Groups

Rather than whitelisting with AllowUsers, sometimes it’s cleaner to blacklist:
```bash
DenyUsers test guest
```

Especially useful when dealing with prebuilt systems that come with “legacy” accounts you’re not ready to delete yet.

### 9. Enable StrictModes

This one’s subtle but critical. It checks permissions on key files.
```bash
trictModes yes
```

If someone sets 777 on their .ssh folder, SSH will refuse to log in. It’s your server saving users from themselves.

### 10. Disable X11 Forwarding

Unless you’re running GUI apps remotely (which you probably aren’t), disable this.
```bash
X11Forwarding no
```

It closes one more potential door without affecting normal SSH usage.

### 11. Enforce SSH Protocol 2 Only

Protocol 1 is old, insecure, and should be extinct.
```bash
Protocol 2
```

It’s 2025. No reason to support prehistoric protocols.

### 12. Use TCP Wrappers or Firewall Rules

Not every battle is fought inside OpenSSH. iptables, ufw, or even basic TCP wrappers (/etc/hosts.allow / hosts.deny) can block access before SSH even sees it.

Example using ufw:
```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw tcp logging on

sudo ufw allow 6001/tcp
# or 
sudo ufw allow from 192.168.1.0/24 to any port 6001
```

Only allow what you need. Keep the rest out.

### 13. Use Fail2Ban or Equivalent

Even with keys, brute-force attacks still hit your door. Tools like Fail2Ban scan logs and block IPs with too many failed attempts.
```bash
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 5
bantime = 600
findtime = 600
```

Install it, enable the SSH jail, and sleep a little easier.

### 14. Regularly Audit Your SSH Config

Last but not least — review your settings. SSH updates evolve, threat landscapes shift, and your server usage may change too.

Set a reminder to check:

- sshd_config
- Authorized keys
- User list
- Log files
- Package updates

> Security isn't a one-and-done deal — it’s a routine.

---

Hardening OpenSSH isn’t rocket science. It’s discipline. Most breaches don’t happen because the attacker is smarter — they happen because someone got lazy or assumed, “no one would bother with this box.”

Don’t be that person. The best time to secure your SSH server was yesterday. The second best time is now.

Security is about layers — not just the flashy ones. By applying these 14 best practices, you're building depth into your defenses. Even if one layer cracks, others still stand.

So:
> Audit. Harden. Monitor. Repeat.

You’ve got the blueprint. The rest is just maintenance.