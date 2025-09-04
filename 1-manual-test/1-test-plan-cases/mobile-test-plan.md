# Test Plan – Demo Web Shop (Android Application) Test Cases Included

## 1. Introduction
This Test Plan describes the test approach, scope, and strategy for testing the **Demo Web Shop Android App** via **Sauce Labs**.  
**Goal:** Ensure the mobile app works as expected across Android devices, critical defects are identified, and high risk areas are thoroughly tested before release.

## 2. Objectives
- Validate end to end workflows: login, product search, add to cart & checkout.  
- Ensure UI/UX is functional and consistent across Android devices.  
- Detect defects early and Report them clearly.  
- Apply **risk-based testing** to focus on high business impact areas.

## 3. Scope
### In Scope
- Functional testing: login, registration, search, cart, checkout.  
- UI/UX validation: navigation, responsiveness, input validation, error messages.  
- Compatibility testing on multiple Android devices.
- Exploratory testing for edge cases and usability.

### Out of Scope
- Real payment gateway integrations.  
- iOS app (covered in a separate plan).  
- Load/stress testing at scale.

## 4. Test Strategy
- **Levels:** System, UAT.  
- **Types:** Functional, UI/UX, Compatibility, Risk-based, Exploratory.  
- **Techniques:** Equivalence Partitioning, Boundary Value Analysis, Decision Table.  
- **Execution:** Manual testing initially; automation using Appium.  

## 5. Test Environment
- **Environment:** Staging, Preview, Prod.
- **OS:** Android 12, 13 (latest supported).  
- **App Version:** Latest APK.  
- **Tools:** Appium for automation.  
- **Test Data:** Dummy accounts, sample credit card info, demo product catalog.

## 6. Deliverables
- Test Cases.
- Bug Reports.
- Test Execution Reports.
- Final Test Summary Report.

## 7. Risk Analysis
### Identified Risks
1. **Login/Registration failure** → blocks user access.  
2. **Add to Cart or Checkout errors** → revenue loss, major frustration.  
3. **Device/OS incompatibility** → poor user experience.  
4. **Weak input validation** → risk of invalid data or security issues.

### Risk Prioritization
| Feature              | Risk Level | Test Priority |
|----------------------|------------|---------------|
| Login & Registration | High       | P1 |
| Add to Cart          | High       | P1 |
| Checkout             | High       | P1 |
| Search & Filter      | Medium     | P2 |
| UI Layout            | Medium     | P2 |
| Push Notifications   | Low        | P3 |

## 8. Exit Criteria
- 100% of **P1 test cases** executed and passed.  
- No open Critical defects; <10% open overall defects.  
- Test Summary Report reviewed & approved.  
- All targeted devices successfully tested.

### Test Case Link
https://docs.google.com/spreadsheets/d/1XC1Lxhdx7CdCU0LMrviFV2wUX_11zS62ghVEE4CDJII/edit?usp=sharing