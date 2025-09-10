# Performance Test Cases (Summary)

## 1. Load Test
- **Goal:** Verify system under normal expected load  
- **Load:** ~50 users for 1 minute  
- **Pass:** 95% responses < 500 ms, error rate < 1%  

---

## 2. Stress Test
- **Goal:** Find system breaking point under overload  
- **Load:** Gradually ramp 0 → 500 users  
- **Pass:** 95% responses < 800 ms, error rate < 5%, system recovers after  

---

## 3. Spike Test
- **Goal:** Check stability under sudden traffic surge  
- **Load:** Jump to 500 users instantly, hold 30s, drop to 50  
- **Pass:** ≤10% failures during spike, avg response < 1s  

---

## 4. Soak (Endurance) Test
- **Goal:** Detect long-term issues (leaks, degradation)  
- **Load:** 100 users for 2 hours  
- **Pass:** Stable response time, error rate < 1%, no rising CPU/memory trend  

---

## 5. Scalability Test
- **Goal:** Validate smooth scaling with growing users  
- **Load:** Step up 0 → 50 → 100 → 200 → 400  
- **Pass:** 95% responses < 700 ms, error rate < 2%, no crashes  
