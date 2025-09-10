# 📂 Security Test Plan with k6

## 🔹 1. Authentication & Authorization

### Background

API harus memastikan hanya user sah yang bisa login, token valid dipakai, dan brute force login dicegah.

### Test Cases

| ID          | Test Case                                    | Goal / Risk                        | Expected Result                | Test Data                                             | Steps                                                                                                       |
| ----------- | -------------------------------------------- | ---------------------------------- | ------------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| SEC-AUTH-01 | Valid login with correct username & password | Pastikan kredensial valid diterima | 200 OK + token/session         | `{ "username": "mor_2314", "password": "83r5^_" }`    | 1. Kirim request POST /auth/login dengan data valid.<br>2. Verifikasi response 200 & token ada.             |
| SEC-AUTH-02 | Login with wrong password (1x)               | Jangan bocorkan detail error       | 401 Unauthorized               | `{ "username": "mor_2314", "password": "wrongpass" }` | 1. Kirim request POST /auth/login dengan password salah.<br>2. Pastikan response 401 tanpa detail internal. |
| SEC-AUTH-03 | Brute force login (20x salah)                | Cegah brute force / lockout        | 429 Too Many Requests / Locked | Loop 20x wrong pass                                   | 1. Kirim 20 request login dengan password salah.<br>2. Pastikan rate limit/lockout aktif.                   |
| SEC-AUTH-04 | Login with expired token                     | Tolak token basi                   | 401 Unauthorized               | JWT kadaluarsa                                        | 1. Gunakan token lama/expired untuk akses /user/profile.<br>2. Pastikan response 401.                       |
| SEC-AUTH-05 | Access protected API tanpa token             | Jangan izinkan anonymous           | 401 Unauthorized               | No token                                              | 1. Panggil GET /user/profile tanpa token.<br>2. Verifikasi response 401.                                    |
| SEC-AUTH-06 | Access protected API pakai token user lain   | Cegah privilege escalation         | 403 Forbidden                  | Token berbeda                                         | 1. Login user A, lalu akses data user B.<br>2. Verifikasi response 403.                                     |

---

## 🔹 2. Session Management

| ID          | Test Case                    | Goal / Risk                 | Expected Result         | Steps                                                                                                                             |
| ----------- | ---------------------------- | --------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| SEC-SESS-01 | Logout lalu pakai token lama | Cegah reuse session         | 401 Unauthorized        | 1. Login dan simpan token.<br>2. Logout.<br>3. Gunakan token lama ke endpoint protected.<br>4. Pastikan 401.                      |
| SEC-SESS-02 | Idle timeout                 | Auto logout setelah X menit | 401 Unauthorized        | 1. Login user.<br>2. Diamkan session (misal 15 menit).<br>3. Akses endpoint lagi.<br>4. Pastikan session expired.                 |
| SEC-SESS-03 | Multi-device login           | Cek aturan session          | Allowed / Forced logout | 1. Login dari device A.<br>2. Login device B dengan akun sama.<br>3. Verifikasi apakah session lama di-force logout atau allowed. |

---

## 🔹 3. Input Validation & Injection

| ID         | Test Case                         | Goal / Risk              | Expected Result       | Steps                                                                               |
| ---------- | --------------------------------- | ------------------------ | --------------------- | ----------------------------------------------------------------------------------- |
| SEC-INJ-01 | SQL Injection (' OR 1=1--)        | Jangan bisa inject query | 400 Bad Request       | 1. Kirim payload `' OR 1=1--` di field login.<br>2. Pastikan tidak bypass login.    |
| SEC-INJ-02 | XSS (<script>alert(1)</script>)   | Cegah eksekusi script    | Escaped/sanitized     | 1. Input XSS payload di form/comment.<br>2. Render UI, pastikan script tidak jalan. |
| SEC-INJ-03 | Path traversal (../../etc/passwd) | Batasi file access       | 400 / 403 Forbidden   | 1. Akses API download file dengan `../../etc/passwd`.<br>2. Pastikan ditolak.       |
| SEC-INJ-04 | Large payload (1MB JSON)          | Cegah DoS                | 413 Payload Too Large | 1. Kirim body JSON sangat besar (>1MB).<br>2. Pastikan server reject dengan 413.    |

---

## 🔹 4. API Security

| ID         | Test Case                    | Goal / Risk                      | Expected Result            | Steps                                                                                         |
| ---------- | ---------------------------- | -------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------- |
| SEC-API-01 | Rate limiting (100 req/s)    | Hindari DoS brute force          | 429 Too Many Requests      | 1. Kirim 100 request GET /products dalam 1 detik.<br>2. Pastikan beberapa ditolak dengan 429. |
| SEC-API-02 | HTTP method tampering        | Jangan izinkan metode ilegal     | 405 Method Not Allowed     | 1. Ubah GET → PUT pada endpoint /products.<br>2. Verifikasi 405.                              |
| SEC-API-03 | Missing/Invalid Content-Type | Tolak data corrupt               | 415 Unsupported Media Type | 1. POST data JSON tapi tanpa header `Content-Type: application/json`.<br>2. Pastikan 415.     |
| SEC-API-04 | Sensitive data exposure      | Jangan leak password/stack trace | Response clean             | 1. Trigger error API.<br>2. Pastikan response tidak expose stack trace/password.              |

---

## 🔹 5. Data Protection

| ID          | Test Case          | Goal / Risk                | Expected Result | Steps                                                                             |
| ----------- | ------------------ | -------------------------- | --------------- | --------------------------------------------------------------------------------- |
| SEC-DATA-01 | Password plaintext | Jangan simpan raw password | Hash only       | 1. Cek DB user (opsional penetration test).<br>2. Pastikan hash, bukan plaintext. |
| SEC-DATA-02 | Weak JWT secret    | Cegah forgery              | Strong secret   | 1. Analisa struktur JWT.<br>2. Pastikan signature tidak mudah ditebak.            |
| SEC-DATA-03 | HTTPS enforced     | Jangan allow HTTP          | 301 redirect    | 1. Akses API pakai http\://<br>2. Pastikan redirect/block.                        |

---

## 🔹 6. Business Logic Abuse

| ID         | Test Case           | Goal / Risk         | Expected Result | Steps                                                            |
| ---------- | ------------------- | ------------------- | --------------- | ---------------------------------------------------------------- |
| SEC-BIZ-01 | Negative price      | Cegah manipulasi    | 400 Bad Request | 1. Tambah item dengan price -100.<br>2. Pastikan gagal.          |
| SEC-BIZ-02 | Expired coupon      | Jangan bisa dipakai | 400 Bad Request | 1. Checkout dengan kode kupon expired.<br>2. Pastikan gagal.     |
| SEC-BIZ-03 | Checkout empty cart | Validasi logic      | 400 Bad Request | 1. Checkout dengan cart kosong.<br>2. Pastikan gagal.            |
| SEC-BIZ-04 | Change order ID     | Cegah fraud         | 403 Forbidden   | 1. User A coba bayar order milik user B.<br>2. Pastikan ditolak. |
