# Test Plan – ChatGPT Web QA Testing (Test Cases Included)

## 1. Introduction
This Test Plan describes the test approach, scope, and strategy for testing **ChatGPT web**.  
**Goal:** Ensure ChatGPT provides accurate, relevant, and consistent responses while handling cases.

## 2. Objectives
- Validate end to end AI workflows: input → response → evaluation.  
- Ensure responses are correct.  
- Detect defects, inconsistencies, or unexpected outputs.  
- Apply **risk-based testing** for high-impact features.

## 3. Scope
### In Scope
- Functional testing of ChatGPT responses.  
- Edge case handling (random symbols, long input, irrelevant text).  
- Context handling for follow up questions.  
- UI/UX observation (responsiveness, error handling, usability).

### Out of Scope  
- External integrations (payment, API calls).  
- Performance/load testing.

## 4. Test Strategy
- **Levels:** Functional, Regression, UAT.  
- **Types:** Functional, Accuracy/Consistency, Robustness, UI/UX, Risk-based.  
- **Techniques:**  
  - Test datasets with known outputs (factual questions).  
  - Boundary testing (long input, unusual symbols).  
  - Contextual follow-up testing.  
- **Execution:** Manual testing via ChatGPT web interface.

## 5. Test Environment
- **Platform:** Web (Chrome).  
- **Account:** Free ChatGPT account for testing.  
- **Test Data:**  
  - Sample questions (greeting, factual, opinion).  
  - Edge case inputs (long strings, symbols, malformed sentences).  
  - Context sequences for conversation flow.  

## 6. Deliverables
- Test Cases.  
- Bug Reports.  
- Test Summary Report.  

## 7. Risk Analysis
### Identified Risks
1. **Incorrect or outdated answers** → misleading information.  
2. **Inconsistent responses** → unreliable AI behavior.  
3. **Failure on edge input** → crash or irrelevant output.  
4. **Poor UI/UX** → slow response, confusing interface.

### Risk Prioritization
| Feature               | Risk Level | Test Priority |
|-----------------------|------------|---------------|
| Factual Question Answering | High   | P1 |
| Context Handling / Follow-up | High | P1 |
| Greeting / Common Questions | Medium | P2 |
| Edge Input / Long Input | Medium | P2 |
| UI/UX & Responsiveness | Low    | P3 |

## 8. Exit Criteria
- 100% of **P1 test cases** executed and passed.  
- No open Critical defects; <10% open overall defects.  
- Test Summary Report reviewed & approved.  
- All edge cases and follow-up scenarios validated successfully.

### Test Case Link
https://docs.google.com/spreadsheets/d/1n70En0PJKVj5-u6Sc1XuMDb7lehSR7N8GjAXJ6DYeY8/edit?usp=sharing
