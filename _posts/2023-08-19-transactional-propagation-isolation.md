---
title: 🍃 트랜잭션 전파 속성, 격리수준 (in Spring @Transactional)
key: 20230819
tags: Spring 트랜잭션 @Transactional
excerpt: Spring의 @Transactional 애노테이션을 이용한 트랜잭션 전파 속성과 격리 수준 설정에 대해 설명합니다.
keywords: "트랜잭션, Spring, @Transactional, 전파 속성, 격리 수준, 데이터 일관성"
---

## 1. @Transactional

@Transactional 어노테이션은 특정 method에 트랜잭션을 적용할 수 있게 합니다. 그리고 트랜잭션 전파 속성, 격리 수준, timeout, read-only, rollback conditions을 설정할 수 있도록 합니다.

### 1.1 @Transactional 동작 방식

스프링은 트랜잭션 경계설정과 같은 부가기능을 적용하기 위해 Proxy를 생성하거나 바이트 코드 조작과 같은 복잡한 기술을 이용합니다.

### 1.2 @Transactional 사용법

interface, class의 선언부 또는 method 선언부에 직접 해당 어노테이션을 사용할 수 있습니다.

interface, class의 선언부에 사용될 경우 public method에 트랜잭션이 적용되며, private 또는 protected method에 직접 @Transactional 어노테이션을 설정하더라도 스프링은 이를 무시합니다.

일반적으로 `@Transactional` 어노테이션을 interface 선언부에 설정하는 것은 권장되지 않습니다. 그러나 Spring Data Repository Interface(`@Repository`)로 설정된 interface에서는 사용할 수 있습니다.

```java
@Transactional
public interface UserService {
	void add(User user);
}
```

## 2. 트랜잭션 전파(Transaction Propagation)
### 2.1 트랜잭션이란?

> **데이터베이스 트랜잭션**(Database Transaction)은 데이터베이스 관리 시스템 또는 유사한 시스템에서 상호작용의 단위이다. 여기서 유사한 시스템이란 트랜잭션이 성공과 실패가 분명하고 상호 독립적이며, 일관되고 믿을 수 있는 시스템을 의미한다.
> 
> 
> 이론적으로 데이터베이스 시스템은 각각의 트랜잭션에 대해 원자성(Atomicity), 일관성(Consistency), 독립성(Isolation), 영구성(Durability)을 보장한다. 이 성질을 첫글자를 따 [ACID](https://ko.wikipedia.org/wiki/ACID)라 부른다. 그러나, 실제로는 성능향상을 위해 이런 특성들이 종종 완화되곤 한다.
> 
> 어떤 시스템들에서는 트랜잭션들은 논리적 작업 단위(LUW, Logical Units of Work)로 불린다. [위키백과]

### 2.2 트랜잭션 전파란?

트랜잭션 경계에서 이미 진행 중인 트랜잭션의 유무에 따라 어떻게 동작할 것인가를 결정하는 방식입니다. 스프링은 전파 속성을 참조하여 트랜잭션을 시작하고 일시 중지합니다.

### 2.3 트랜잭션 전파 속성

* **PROPAGATION_REQUIRED(`DefaultTransactionDefinition`):** default 전파 속성이며 가장 많이 사용됩니다. 부모 트랜잭션이 없으면 새로 시작하고, 있으면 참여합니다.   
코드를 진행하던 중에 예외가 발생한다면, 진행 사항이 모두 Rollback 됩니다.
    
    ```java
    @Transactional(propagation = Propagation.REQUIRED)
    public void requiredMethod(String s) {
        ...
    }
    
    @Transaction
    public void requiredMethod(String s) {
        ...
    }
    ```
    
* **PROPAGATION_SUPPORTS:** 부모 트랜잭션이 있으면 참여하고, 없으면 트랜잭션 없이 동작합니다.
    
    ```java
    @Transaction(propagation = Propagation.SUPPORTS)
    public void supportsMethod(String s) {
        ...
    }
    ```
    
* **PROPAGATION_MANDATORY:** 부모 트랜잭션이 있으면 참여하고, 없으면 예외를 발생시킵니다.
    
    ```java
    @Transactional(propagation = Propagation.MANDATORY)
    public void mandatoryMethod(String s) {
        ...
    }
    ```
    
* **PROPAGATION_NEVER:** 트랜잭션을 허용하지 않으며, 부모 트랜잭션이 있으면 예외를 발생시킵니다.
    
    ```java
    @Transactional(propagation = Propagation.NEVER)
    public void neverMethod(String s) {
        ...
    }
    ```
    
* **PROPAGATION_NOT_SUPPORTED:** 트랜잭션이 있으면, 먼저 스프링은 트랜잭션을 일시 중지합니다. 그리고 트랜잭션 없이 비즈니스 로직을 실행합니다.
    
    ```java
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    public void notSupportedMethod(String user) { 
        ...
    }
    ```
    
* **PROPAGATION_REQUIRES_NEW:** 항상 새로운 트랜잭션을 시작합니다. 코드를 진행하던 중에 예외가 발생(Rollback)하더라도 각각의 트랜잭션에 영향을 주지 않습니다.
    
    ```java
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void requiresNewMethod(String user) { 
        ...
    }
    ```
    
* **PROPAGATION_NESTED:** 부모 트랜잭션이 있으면, 먼저 Savepoint를 표시하고 중첩 트랜잭션을 시작합니다. 중첩 트랜잭션에서 Rollback이 발생하면 Savepoint로 돌아갑니다. 그리고 부모 트랜잭션이 Commit 될 때 함께 Commit 됩니다. 만약 트랜잭션이 없으면 PROPAGATION_REQUIRED처럼 동작합니다.
    
    ```java
    @Transactional(propagation = Propagation.NESTED)
    public void nestedMethod(String user) { 
        ...
    }
    ```
    

## 3. 격리수준 (Transaction Isolation)

서버 환경에서는 많은 수의 트랜잭션이 진행될 수 있습니다. 각각의 트랜잭션을 독립적으로 순서대로 처리하면 좋겠지만, 성능이 크게 떨어집니다. 따라서 적절한 격리수준을 설정하여 가능한 많은 트랜잭션을 동시에 처리하면서도 문제가 발생하지 않도록 해야합니다. 격리수준은 기본적으로 DB에 설정되어 있지만 JDBC 드라이버나 DataSource에서 다시 설정할 수 있습니다.

### 3.1 격리수준에 따라 발생할 수 있는 Side Effects (데이터 부정합)

* **Dirty read:** 진행하고 있는 트랜잭션의 커밋되지 않은 변경을 조회할 수 있는 문제입니다.

* **Nonrepeatable read:** 같은 데이터를 여러 번 조회했을 때 다른 결과가 조회되는 문제입니다. 동시에 진행되는 트랜잭션이 동일한 Row를 Update & Commit 할 때 발생합니다.

* **Phantom read:** 특정 범위를 조회하는 쿼리를 다시 실행할 때 결과 Row 수가 달라지는 문제입니다. 다른 트랜잭션이 해당 범위에 속하는 행을 추가 또는 제거하고 Commit 할 때 발생합니다.

### 3.2 격리수준의 종류

* **READ_UNCOMMITTED:** 가장 낮은 레벨의 격리수준입니다. Commit 되지 않은 변경을 다른 트랜잭션이 조회할 수 있도록 허용합니다. 데이터 부정합 발생 위험이 높지만 성능이 가장 우수합니다. Oracle, Postgres에서 지원하지 않습니다.
    
    ```java
    @Transactional(isolation = Isolation.READ_UNCOMMITTED)
    public void log(String m) {
        ...
    }
    ```
    
    - **발생할 수 있는 Side Effects:**
        + Dirty read
        + Non-Repeatable read
        + Phantom read

* **READ_COMMITTED:** Second Level 격리수준입니다. Commit 된 데이터만 조회할 수 있으며, Dirty read가 발생하지 않습니다. Postgres, SQL Server, Oracle에서 default 격리수준입니다.
    
    ```java
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public void log(String m) {
        ...
    }
    ```
    
    - **발생할 수 있는 Side Effects:**
        + Nonrepeatable read
        + Phantom read

* **REPEATABLE_READ:** Third Level 격리수준입니다. 트랜잭션이 시작되지 전에 커밋된 데이터만 접근할 수 있습니다. Dirty read, Non-Repeatable read가 발생하지 않습니다. MySQL에서 default 격리수준이며, Oracle에서 지원하지 않습니다.
    
    ```java
    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public void log(String m) {
        ...
    }
    ```
    
    - **발생할 수 있는 Side Effects:**
        + Phantom read

* **SERIALIZABLE:** 가장 엄격한 격리수준입니다. 트랜잭션을 순차적으로 처리합니다. 어떠한 데이터 부정합도 발생하지 않지만, 동시 처리 성능이 매우 떨어집니다.
    
    ```java
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void log(String m) {
        ...
    }
    ```

## 4. 제한시간

트랜잭션을 수행하는 데 제한시간을 설정할 수 있습니다. PROPAGATION_REQUIRED나 PROPAGATION_REQUIRES_NEW와 함께 사용할 때 의미가 있습니다.

## 5. 읽기전용 (Read Only)

읽기전용으로 설정할 경우 트랜잭션 내에서 데이터를 조작하는 시도를 막을 수 있습니다.

<br>
<br>
<span style="color: grey; font-weight: 700;">References</span>   
[https://www.baeldung.com](https://www.baeldung.com/spring-transactional-propagation-isolation)