---
title: 👨‍💻 Oracle Call(호출) 종류
key: 20240526
tags: DBMS
excerpt: 오라클 데이터베이스에서 SQL 문장을 실행할 때 발생하는 주요 Call(호출) 종류와 각 Call의 역할을 설명합니다. Parse Call, Bind Call, Define Call, Execute Call, Fetch Call, Close Call의 과정과 예시를 통해 SQL 실행 흐름을 이해할 수 있습니다.
keywords: "오라클, Oracle, 데이터베이스, SQL, Parse Call, Bind Call, Define Call, Execute Call, Fetch Call, Close Call, SQL 실행 계획, 바인드 변수, 커서, 데이터베이스 자원 해제"
---

# 오라클 데이터베이스 Call(호출)

## 주요 Call 종류

1. Parse Call
2. Bind Call
3. Define Call
4. Execute Call
5. Fetch Call
6. Close Call

## **1. Parse Call**

**Parse Call**은 SQL 문장을 실행하기 전에 해당 문장을 분석하고 실행 계획을 수립하는 과정입니다. 이 과정은 SQL 문장이 처음 제출될 때와 바인드 변수 값이 변경될 때 발생합니다.

### **Parse Call의 과정**

1. **SQL 문장 수신**:
    - 클라이언트가 SQL 문장을 제출합니다.
2. **문장 분석**:
    - 데이터베이스 서버는 SQL 문장을 파싱하고 구문을 분석합니다.
3. **실행 계획 수립**:
    - 옵티마이저가 SQL 문장의 최적 실행 계획을 수립합니다.
4. **파싱된 문장 캐싱**:
    - 파싱된 문장과 실행 계획은 공유 풀(Shared Pool)에 캐싱되어 재사용될 수 있습니다.

### **예시**

```sql
SELECT employee_id, last_name, salary
FROM employees
WHERE department_id = 30;
```

이 **`SELECT`** 문장이 처음 제출될 때 Parse Call이 발생하여 문장이 분석되고 실행 계획이 수립됩니다.

## **2. Bind Call**

**Bind Call**은 SQL 문장에서 사용하는 바인드 변수에 값을 할당하는 과정입니다. 이는 성능 최적화와 보안 측면에서 중요한 역할을 합니다.

### **Bind Call의 과정**

1. **바인드 변수 설정**:
    - 클라이언트가 바인드 변수에 값을 할당합니다.
2. **서버로 전달**:
    - 바인드 변수 값이 서버로 전달됩니다.
3. **변수 값 사용**:
    - 실행 계획에서 바인드 변수 값을 사용하여 SQL 문장을 실행합니다.

### **예시**

```sql
sqlCopy code
-- 바인드 변수 사용 예시
SELECT employee_id, last_name, salary
FROM employees
WHERE department_id = :dept_id;

-- 바인드 변수 할당
EXEC SQL BIND :dept_id = 30;

```

여기서 **`:dept_id`**는 바인드 변수이며, Bind Call을 통해 값이 할당됩니다.

## **3. Define Call**

**Define Call**은 SELECT 문장에서 결과를 저장할 변수를 정의하는 과정입니다. 이는 Fetch Call을 통해 결과를 가져오기 전에 수행됩니다.

### **Define Call의 과정**

- **결과 변수 정의**: 클라이언트가 SELECT 문장의 결과를 저장할 변수를 정의합니다.

### **예시**

```sql
sqlCopy code
-- 클라이언트 애플리케이션에서
EXEC SQL DECLARE :result_var CURSOR FOR
SELECT employee_id, last_name, salary
FROM employees
WHERE department_id = :dept_id;

```

여기서 **`:result_var`**는 Define Call을 통해 정의된 결과 변수입니다.

## **4. Execute Call**

**Execute Call**은 이미 설명한 바와 같이 SQL 문장을 실행하는 과정입니다.

## **5. Fetch Call**

**Fetch Call**은 SELECT 문장의 결과 데이터를 클라이언트로 가져오는 과정입니다.

## **6. Close Call**

**Close Call**은 SQL 문장 실행 후, 사용한 자원을 해제하고 세션을 종료하는 과정입니다. 이는 커서와 같은 데이터베이스 객체를 닫는 데 사용됩니다.

### **Close Call의 과정**

1. **커서 닫기**:
    - 사용한 커서를 닫아 자원을 해제합니다.
2. **세션 정리**:
    - SQL 문장 실행과 관련된 모든 자원을 해제하고 세션을 정리합니다.

### **예시**

```sql
sqlCopy code
-- 커서 닫기 예시
EXEC SQL CLOSE cursor_name;

```

이 명령은 이전에 열린 커서를 닫고 자원을 해제합니다.

## 예제 시나리오

예시 시나리오: 직원 정보 조회

```sql
-- SQL 문장 준비
DECLARE
   dept_id NUMBER := 30;
   CURSOR emp_cursor IS
   SELECT employee_id, last_name, salary
   FROM employees
   WHERE department_id = :dept_id;
BEGIN
   OPEN emp_cursor;
   LOOP
      FETCH emp_cursor INTO emp_rec;
      EXIT WHEN emp_cursor%NOTFOUND;
      DBMS_OUTPUT.PUT_LINE(emp_rec.employee_id || ' ' || emp_rec.last_name || ' ' || emp_rec.salary);
   END LOOP;
   CLOSE emp_cursor;
END;
```

1. **Parse Call**:
    - SQL 문장 **`SELECT employee_id, last_name, salary FROM employees WHERE department_id = :dept_id`**가 파싱됩니다.
2. **Bind Call**:
    - **`:dept_id`** 바인드 변수에 값 **`30`**이 할당됩니다.
3. **Define Call**:
    - **`emp_rec`** 레코드 변수가 SQL 문장의 결과를 저장할 변수로 정의됩니다.
4. **Execute Call**:
    - SQL 문장이 실행되고 결과 집합이 생성됩니다.
5. **Fetch Call**:
    - 결과 집합에서 데이터를 가져와 **`emp_rec`** 변수에 저장합니다.
    - 루프를 통해 여러 번 Fetch Call이 수행됩니다.
6. **Close Call**:
    - SQL 문장 실행 후, 사용한 자원을 해제하고 세션을 정리하는 단계입니다.

이 예시는 오라클 데이터베이스에서 SQL 문장이 처리되는 전체 과정을 보여줍니다. 각 호출(Call)은 특정 단계에서 수행되며, 전체 프로세스의 일환으로 서로 연관되어 작동합니다.