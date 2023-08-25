---
title: 🍃 JPA Entity 상태
key: 20230810
tags: Spring JPA ORM
---

<img src="/images/jpa-entity-state.png" width="700px;" alt="JPA Entity 상태 변화" />

### 1. New(Transient) state
새롭게 생성된 오브젝트 또는 JPA Persistence Context와 연결된 적이 없는 오브젝트입니다.   
오브젝트 데이터는 Database에 저장되지 않습니다.

```java
Employee employee = new Employee("Edward");
```

### 2. Persistent(JPA managed) state
Persistence Context와 연결된 오브젝트입니다.   
해당 상태의 오브젝트에 대한 모든 변경 사항은 Database로 자동 전파(Propagated)됩니다.

```java
EntityManager entityManager = entityManagerFactory.createEntityManager();
EntityTransaction tx = entityManager.getTransaction();
tx.begin();
entityManager.persist(employee);
Lone persistedId = employee.getId();
// entityManager.find(Employee.class, persistedId);
tx.commit();
entityManager.close();
```

### 3. Detached(unmanaged) state
Persistence Context가 close(`entityManager.close();`)되면 Detached 상태가 됩니다.   
Detached 오브젝트의 변화는 더 이상 자동으로 전파되지 않습니다.   
변화를 다시 전파하려면 merge(`employee = entityManager.merge(employee);`)를 이용해야 합니다.

### 4. Removed object state
Database에서 오브젝트를 제거합니다.   
오직 Persistent 오브젝트만 제거할 수 있습니다.

```java
employee = entityManager.find(Employee.class, persistedId);
entityManager.remove(employee);
```

<br>
<br>
<span style="color: grey; font-weight: 700;">References</span>   
[https://it-ist.tistory.com/m/171](https://it-ist.tistory.com/m/171)
