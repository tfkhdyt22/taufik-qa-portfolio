# 📂 Security Test Plan with k6

---

## 1. Authentication & Authorization  
API must ensure that only valid users can log in, tokens are enforced, and brute force attacks are prevented.

| ID          | Test Case                      | Risk / Goal                  | Expected Result                | Test Data                               | Steps                                                                 |
| ----------- | ------------------------------ | ----------------------------- | ------------------------------ | --------------------------------------- | --------------------------------------------------------------------- |
| SEC-AUTH-01 | Valid login                    | Ensure valid creds accepted   | 200 OK + token/session         | `{ "username": "mor_2314", "password": "83r5^_" }` | 1. Send POST /auth/login with valid data.<br>2. Verify 200 + token.   |
| SEC-AUTH-02 | Wrong password (1x)            | No sensitive error exposure   | 401 Unauthorized               | `{ "username": "mor_2314", "password": "wrong" }`  | 1. Send login with wrong password.<br>2. Verify 401 clean response.   |
| SEC-AUTH-03 | Brute force (20x fail)         | Prevent brute force           | 429 / account lock             | Loop 20 wrong passwords                 | 1. Attempt 20 logins.<br>2. Verify lockout or rate limit.              |
| SEC-AUTH-04 | Expired token                  | Reject old tokens             | 401 Unauthorized               | Expired JWT                             | 1. Use expired token for /user/profile.<br>2. Verify 401.             |
| SEC-AUTH-05 | No token                       | Block anonymous access        | 401 Unauthorized               | None                                    | 1. GET /user/profile without token.<br>2. Verify 401.                 |
| SEC-AUTH-06 | Token of another user          | Prevent privilege escalation  | 403 Forbidden                  | Token from user A                       | 1. User A tries access user B data.<br>2. Verify 403.                 |

---

## 2. Session Management  
Ensure sessions cannot be reused, hijacked, or abused.

| ID          | Test Case             | Goal / Risk              | Expected Result         | Steps                                                                 |
| ----------- | --------------------- | ------------------------ | ----------------------- | --------------------------------------------------------------------- |
| SEC-SESS-01 | Logout reuse          | Prevent token reuse      | 401 Unauthorized        | Login → logout → use old token → expect 401.                          |
| SEC-SESS-02 | Idle timeout          | Auto-expire session      | 401 Unauthorized        | Login → idle 15m → access API → expect expired session.               |
| SEC-SESS-03 | Multi-device login    | Check session policy     | Allowed / forced logout | Login device A → login device B → observe session handling.           |

---

## 3. Input Validation & Injection  
Validate inputs to prevent injection attacks.

| ID         | Test Case              | Risk / Goal              | Expected Result       | Steps                                                              |
| ---------- | ---------------------- | ------------------------ | --------------------- | ------------------------------------------------------------------ |
| SEC-INJ-01 | SQL Injection          | Prevent DB injection     | 400 Bad Request       | Input `' OR 1=1--` in login → must fail.                           |
| SEC-INJ-02 | XSS Payload            | Prevent script exec      | Input sanitized       | Submit `<script>alert(1)</script>` → ensure not executed.           |
| SEC-INJ-03 | Path Traversal         | Block file access        | 403 Forbidden         | Request `../../etc/passwd` in file API → must reject.               |
| SEC-INJ-04 | Large Payload (>1MB)   | Prevent DoS              | 413 Payload Too Large | POST 1MB JSON → expect 413.                                        |

---

## 4. API Security  
Verify APIs are hardened and not misused.

| ID         | Test Case              | Risk / Goal                 | Expected Result            | Steps                                                       |
| ---------- | ---------------------- | --------------------------- | -------------------------- | ----------------------------------------------------------- |
| SEC-API-01 | Rate limiting          | Prevent DoS/bruteforce      | 429 Too Many Requests      | 100 GET /products in 1s → some must be rejected.             |
| SEC-API-02 | Method tampering       | Block illegal methods       | 405 Method Not Allowed     | Change GET → PUT on /products → must reject.                 |
| SEC-API-03 | Invalid Content-Type   | Reject malformed data       | 415 Unsupported Media Type | POST JSON without header → must reject.                      |
| SEC-API-04 | Sensitive data leak    | Prevent info disclosure     | Clean response             | Trigger error → must not expose password/stack trace.        |

---

## 5. Data Protection  
Ensure sensitive data is protected at all times.

| ID          | Test Case           | Goal / Risk              | Expected Result   | Steps                                       |
| ----------- | ------------------- | ------------------------ | ----------------- | ------------------------------------------- |
| SEC-DATA-01 | Password storage    | Prevent plaintext storage| Hash only         | Inspect DB → must store only hashed values. |
| SEC-DATA-02 | JWT secret strength | Prevent token forgery    | Strong signature  | Analyze JWT → must not be guessable.        |
| SEC-DATA-03 | HTTPS enforced      | Prevent HTTP access      | 301 redirect      | Access http:// → must redirect to HTTPS.    |

---

## 6. Business Logic Abuse  
Prevent logical bypasses and abuse of workflows.

| ID         | Test Case         | Risk / Goal             | Expected Result   | Steps                                             |
| ---------- | ----------------- | ----------------------- | ----------------- | ------------------------------------------------- |
| SEC-BIZ-01 | Negative price    | Prevent manipulation    | 400 Bad Request   | Add item with price -100 → must fail.             |
| SEC-BIZ-02 | Expired coupon    | Prevent invalid use     | 400 Bad Request   | Checkout with expired coupon → must fail.         |
| SEC-BIZ-03 | Empty cart        | Validate checkout logic | 400 Bad Request   | Checkout empty cart → must fail.                  |
| SEC-BIZ-04 | Change order ID   | Prevent fraud           | 403 Forbidden     | User A tries to pay order of user B → must reject.|
