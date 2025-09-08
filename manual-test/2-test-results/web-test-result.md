# Test Results & Bug Report – Demo Web Shop (Web Application)

## 1. Test Execution Summary
- **Application Under Test (AUT):** Demo Web Shop v1.5.2 (Build 2025-08-30)  
- **Test Cycle:** Sprint 1
- **Test Environment:**  
  - Google Chrome
  - Staging 
- **Test Data:** Dummy accounts, sample products, test credit card  
- **Testing Date:** 2025-09-03  
- **QA:** Taufik 

---

## 2. Detailed Test Results
| TC ID  | Scenario                          | Status   | Comments |
|--------|-----------------------------------|----------|----------|
| F-001  | User Login – Valid credentials    | ✅ Pass  | User successfully Login |
| F-002  | User Login – Invalid password     | ✅ Pass  | Error message displayed correctly |
| F-003  | Registration – Existing email     | ❌ Fail  | System allowed duplicate registration |
| F-004  | Registration – New valid account  | ✅ Pass  | Account successfully created |
| F-005  | Add to Cart – Single item         | ❌ Fail  | Cart did not update in UI, only DB updated |
| F-006  | Cart – Remove item                | ✅ Pass  | Item removed correctly |
| F-007  | Checkout – Expired CC number      | ❌ Fail  | Payment accepted despite expired card |
| F-008  | Checkout – Valid payment          | ✅ Pass  | Payment processed, order confirmed |
| F-009  | Search – Valid keyword            | ✅ Pass  | Relevant products displayed |
| F-010  | Search – Invalid keyword          | ✅ Pass  | “No results found” shown |
| F-011  | UI – Homepage layout in Chrome    | ✅ Pass  | Responsive layout works |
| F-012  | Compatibility – Firefox           | ✅ Pass  | Same behavior as Chrome |
| F-013  | Newsletter – Valid email          | ✅ Pass  | Subscribed successfully |
| F-014  | Newsletter – Invalid email        | ✅ Pass  | Validation error shown |

---

## 3. Bug Reports

### [Registration] Duplicate User Account Creation
- **Bug ID:** WEB-001  
- **Version:** v1.5.2  
- **Severity:** High  
- **Priority:** P1  
- **Related Test Case:** F-003  
- **Environment:** Chrome, Staging
- **Precondition:** Valid account already exists with email `user@test.com`  
- **Steps to Reproduce:**  
  1. Navigate to *Register* page  
  2. Enter `user@test.com` with valid password and details  
  3. Submit registration form  
- **Expected Result:** System prevents registration with message “Email already registered”  
- **Actual Result:** New account created successfully with duplicate email  
- **Impact:** Data integrity risk, potential account takeover issues  
- **Evidence:** attachment
- **Status:** Open  

---

### [Cart] Item Not Reflected in Cart Summary
- **Bug ID:** WEB-002  
- **Version:** v1.5.2  
- **Severity:** High  
- **Priority:** P1  
- **Related Test Case:** F-005  
- **Environment:** Firefox, Staging 
- **Precondition:** User is logged in with empty cart  
- **Steps to Reproduce:**  
  1. Search for “Laptop”  
  2. Click *Add to Cart*  
  3. Check cart summary in top-right widget  
- **Expected Result:** Cart updates to show “1 item”  
- **Actual Result:** Cart remains empty in UI, but product stored in DB  
- **Impact:** Checkout flow blocked, critical UX issue  
- **Evidence:** attachment
- **Status:** Open  

---

### [Checkout] Expired Credit Card Accepted
- **Bug ID:** WEB-003  
- **Version:** v1.5.2  
- **Severity:** Critical  
- **Priority:** P1  
- **Related Test Case:** F-007  
- **Environment:** Chrome, Staging 
- **Precondition:** Valid logged-in user, product in cart  
- **Steps to Reproduce:**  
  1. Proceed to checkout  
  2. Enter CC number `4111-1111-1111-1111`, Expiry: `01/22`  
  3. Submit payment  
- **Expected Result:** Payment declined with error message “Card expired”  
- **Actual Result:** Payment accepted, order placed successfully  
- **Impact:** Financial risk
- **Evidence:** Attachment 
- **Status:** Open  
