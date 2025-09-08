# Test Results & Bug Report – Demo Web Shop (Mobile Application – Android)

## 1. Test Execution Summary
- **Application Under Test (AUT):** Demo Web Shop Android v1.5.2 (Build 2025-08-30)  
- **Test Cycle:** Sprint 1 – Mobile QA  
- **Test Environment:**  
  - Android 12 (Samsung Galaxy S22 – SauceLabs)  
  - Android 13 (Pixel 7 – SauceLabs)  
  - Appium + SauceLabs for execution  
- **Test Data:** Dummy accounts, sample products, test credit card  
- **Execution Date:** 2025-09-03  
- **Tester:** Taufik H  

---

## 2. Detailed Test Results
| TC ID   | Scenario                                | Status | Comments |
|---------|-----------------------------------------|--------|----------|
| TC-M001 | Login with valid credentials            | ✅ Pass | Logged in successfully |
| TC-M002 | Login with invalid password             | ✅ Pass | Error shown correctly |
| TC-M003 | Login with empty fields                 | ✅ Pass | Validation message displayed |
| TC-M004 | Register new account (valid)            | ✅ Pass | Account created & redirected |
| TC-M005 | Register with weak password             | ✅ Pass | Error shown as expected |
| TC-M006 | Search by product name                  | ✅ Pass | Results shown |
| TC-M007 | Search with invalid characters          | ✅ Pass | Error message displayed |
| TC-M008 | Add product to cart                     | ❌ Fail | Item added but cart icon not updated |
| TC-M009 | Remove product from cart                | ✅ Pass | Product removed successfully |
| TC-M010 | Checkout with valid data                | ✅ Pass | Order confirmed |
| TC-M011 | Checkout with missing address           | ✅ Pass | Error validation displayed |
| TC-M012 | Checkout with expired credit card       | ❌ Fail | Payment accepted instead of rejected |
| TC-M013 | Homepage layout on Pixel 7              | ✅ Pass | Layout correct |
| TC-M014 | Product detail layout on Galaxy S22     | ✅ Pass | Layout correct |
| TC-M015 | Compatibility – Android 12              | ✅ Pass | App works fine |
| TC-M016 | Compatibility – Android 13              | ✅ Pass | App works fine |
| TC-M017 | Push notification received              | ✅ Pass | Notification appeared |
| TC-M018 | Push disabled at device level           | ✅ Pass | Notification blocked as expected |

---

## 3. Bug Reports

### [Cart-Mobile] Cart Icon Not Updating
- **Bug ID:** MOB-001  
- **Version:** v1.5.2  
- **Severity:** High  
- **Priority:** P1  
- **Related Test Case:** TC-M008  
- **Environment:** Pixel 7 (Android 13, SauceLabs)  
- **Precondition:** User logged in with empty cart  
- **Steps to Reproduce:**  
  1. Open any product page  
  2. Tap **Add to Cart**  
  3. Observe cart icon at top-right  
- **Expected Result:** Cart icon updates with item count “1”  
- **Actual Result:** Cart icon remains “0”, though DB shows item inserted  
- **Impact:** Misleads users, disrupts checkout flow  
- **Evidence:** Screenshot `mob-cart-icon.png`, API logs show `addToCart` success but UI not refreshed  
- **Status:** Open  

---

### [Checkout-Mobile] Expired Credit Card Accepted
- **Bug ID:** MOB-002  
- **Version:** v1.5.2  
- **Severity:** Critical  
- **Priority:** P1  
- **Related Test Case:** TC-M012  
- **Environment:** Galaxy S22 (Android 12, SauceLabs)  
- **Precondition:** User logged in with product in cart  
- **Steps to Reproduce:**  
  1. Proceed to checkout  
  2. Enter CC: `4111-1111-1111-1111`, Expiry: `01/22`  
  3. Confirm payment  
- **Expected Result:** Payment should be declined with error message “Card expired”  
- **Actual Result:** Payment accepted, order confirmed  
- **Impact:** Financial risk, PCI compliance issue  
- **Evidence:** Screenshot `mob-expired-cc.png`, payment service logs missing expiry validation  
- **Status:** Open  
