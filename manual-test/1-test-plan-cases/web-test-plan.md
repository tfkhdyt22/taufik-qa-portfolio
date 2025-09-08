# Test Plan – Demo Web Shop (Web Application) Test Cases Included

## 1. Introduction
This Test Plan describes the test approach, scope of testing activities for the **Demo Web Shop** (http://demowebshop.tricentis.com).  
Goal: ensure that functionality is working as expected, critical defects are identified, and risks are minimized before release.

## 2. Objectives
- Validate end to end workflows: login, product search, add to cart & checkout.
- To ensure UI is functional and consistent across major browsers.
- Detect defects early and Report them clearly.
- Apply **risk-based testing** to focus on high business impact areas.

## 3. Scope
### In Scope
- Functional testing (login, registration, search, cart, checkout).
- UI/UX validation (navigation, input validation, error messages).
- Compatibility testing (Only on Chrome, Firefox).
- Exploratory testing.

### Out of Scope
- Real payment gateway integrations.

## 4. Test Strategy
- **Levels:** System, UAT.
- **Types:** Functional, UI/UX, Compatibility, Risk-based, Exploratory.
- **Techniques:** Equivalence Partitioning, Boundary Value Analysis, Decision Table.
- **Execution:** Manual testing first.

## 5. Test Environment
- **Environment:** Staging, Preview, Prod.
- **Browsers:** Chrome, Firefox.
- **Test Data:** Dummy accounts, product catalog from demo site.

## 6. Deliverables
- Test Cases.
- Bug Reports.
- Test Execution Reports.
- Final Test Summary Report.

## 7. Risk Analysis
### Identified Risks
1. **Login/Registration failure** → blocks user to access.  
2. **Add to Cart or Checkout errors** → revenue loss, major user frustration.  
3. **Cross-browser issues** → poor experience.  
4. **Weak input validation** → risk of invalid data or security issues.  

### Risk Prioritization
| Feature              | Risk Level | Test Priority |
|----------------------|------------|---------------|
| Login & Registration | High       | P1 |
| Add to Cart          | High       | P1 |
| Checkout             | High       | P1 |
| Search & Filter      | Medium     | P2 |
| UI Layout            | Medium     | P2 |
| Newsletter Signup    | Low        | P3 |

## 8. Exit Criteria
- 100% of **P1 test cases** executed and passed.
- No open Critical defects; <10% open overall defects.
- Test Summary Report reviewed & approved.

### Test Case Link
https://docs.google.com/spreadsheets/d/1OKZ2X5gOGFlhkh_qHw0x9GTzEiYc3LvJ6jH5c3lkdSU/edit?usp=sharing


