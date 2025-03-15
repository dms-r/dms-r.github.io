---
author: Dimas
pubDatetime: 2025-02-03T17:30:00Z
title: Learn Access Control Vuln in Web Apps
featured: true
draft: true
tags:
  - cybersecurity
  - idor
description:
  Delve deeper into the technicalities of access control vulnerabilities in web apps.
---

// How to start: pnpm run dev

## Table of contents

## Introduction

Access control is a pivotal security mechanism in web applications, governing who or what can perform actions or access resources. This article delves into access control concepts, vulnerabilities, and mitigation strategies, building on insights from PortSwigger. It covers types of access controls, common weaknesses like privilege escalation, and practical prevention methods, enriched with technical examples and code snippets to illustrate key points.

## Analysis of Access Control Mechanisms

Access control in web applications hinges on authentication (verifying identity), session management (tracking requests), and authorization (permitting actions). The PortSwigger resource identifies three main types:

1. **Vertical Access Controls**: Restrict sensitive functionalities to specific roles, e.g., admin-only features.
2. **Horizontal Access Controls**: Limit resource access to the owning user, e.g., personal account data.
3. **Context-Dependent Access Controls**: Enforce restrictions based on application state, e.g., locking a shopping cart post-payment.

The interplay of business, organizational, and legal requirements complicates implementation, often leading to errors exploitable by attackers.

## Common Access Control Vulnerabilities

### Vertical Privilege Escalation

Vertical privilege escalation occurs when users access unauthorized functionalities. For example, an admin panel at `http://insecure-website.com/admin` might be exposed in `robots.txt` or brute-forced using tools like `dirb` with a wordlist:

```bash
dirb http://insecure-website.com /usr/share/wordlists/common.txt
```

Obfuscated URLs (e.g., `http://insecure-website.com/administrator-panel-yto556`) may leak via JavaScript:

```javascript
var isAdmin = false;
if (isAdmin) {
    document.getElementById("adminLink").innerHTML = "<a href='/administrator-panel-yto556'>Admin Panel</a>";
}
```

Attackers can inspect this client-side code to discover the URL, bypassing intended obscurity.

### Horizontal Privilege Escalation

This vulnerability allows access to another user’s resources. Consider a URL like `http://insecure-website.com/myaccount?id=123`. An attacker might tamper with the `id` parameter:

```http
GET /myaccount?id=456 HTTP/1.1
Host: insecure-website.com
```

If the server lacks validation, it returns user 456’s data. Even with GUIDs (e.g., `id=550e8400-e29b-41d4-a716-446655440000`), leakage in reviews or messages can expose valid IDs for exploitation.

### Parameter-Based Access Control Issues

Some applications store roles in manipulable locations, such as cookies:

```http
Cookie: role=user
```

An attacker could edit this to `role=admin` using a proxy like Burp Suite, then access restricted endpoints:

```http
GET /admin HTTP/1.1
Host: insecure-website.com
Cookie: role=admin
```

### Platform Misconfiguration

Misconfigured platforms may allow URL overrides via headers like `X-Original-URL`. An attacker could bypass restrictions:

```http
POST /public HTTP/1.1
Host: insecure-website.com
X-Original-URL: /admin/deleteUser
Content-Length: 0
```

If the backend honors this header without validation, it executes the admin action.

### Insecure Direct Object References (IDOR)

IDOR occurs when user input directly accesses objects. For example, a file download endpoint:

```http
GET /download?fileId=123 HTTP/1.1
Host: insecure-website.com
```

Changing `fileId=123` to `fileId=124` might retrieve another user’s file if no ownership check exists. A vulnerable PHP implementation might look like:

```php
$fileId = $_GET['fileId'];
echo file_get_contents("/files/$fileId.pdf");
```

### Multi-Step Process Flaws

In a multi-step admin update process (load form, submit changes, confirm), skipping to the confirmation step might work if unchecked:

```http
POST /admin/updateUser/confirm HTTP/1.1
Host: insecure-website.com
Content-Type: application/x-www-form-urlencoded

userId=456&newRole=admin
```

Without validating prior steps, the server processes this request.

### Referer-Based Access Control

Relying on the `Referer` header is flawed, as it’s forgeable:

```http
GET /admin/deleteUser HTTP/1.1
Host: insecure-website.com
Referer: http://insecure-website.com/admin
```

An attacker crafts this request using `curl`:

```bash
curl -H "Referer: http://insecure-website.com/admin" http://insecure-website.com/admin/deleteUser
```

## Interpretation and Implications

These examples reveal a reliance on client-side trust and inadequate server-side validation. Attackers exploit predictable patterns (e.g., sequential IDs) or misconfigurations (e.g., header overrides), often using tools like Burp Suite or custom scripts. The document’s labs underscore hands-on learning, while evolving frameworks (e.g., Spring’s trailing-slash behavior) necessitate ongoing vigilance.

## Prevention Strategies

A defense-in-depth approach mitigates these risks:

1. **Avoid Obfuscation Alone**: Hidden URLs are not secure without backend checks.
2. **Deny by Default**: Use a whitelist approach in code:

```php
$allowedRoles = ['admin'];
if (!in_array($userRole, $allowedRoles)) {
    http_response_code(403);
    exit("Access Denied");
}
```

3. **Unified Mechanism**: Centralize access control, e.g., in a middleware:

```javascript
// Express.js example
app.use((req, res, next) => {
    if (!req.user || !req.user.canAccess(req.path)) {
        return res.status(403).send("Forbidden");
    }
    next();
});
```

4. **Mandatory Declarations**: Define permissions explicitly:

```java
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/admin")
public String adminPanel() {
    return "admin";
}
```

5. **Audit and Test**: Use tools like Burp Scanner to identify leaks or bypasses.

---
## Conclusion

Access control vulnerabilities, from IDOR to privilege escalation, threaten web application integrity. Technical examples highlight how simple oversights—like unvalidated parameters or trusted headers—enable exploitation. By adopting robust, server-side controls and proactive testing, developers can fortify systems against such risks.

## Citation

- PortSwigger. "Access Control Vulnerabilities and Privilege Escalation." *PortSwigger Web Security Academy*, accessed March 3, 2025. Original content extracted via OCR from a multi-page document.

