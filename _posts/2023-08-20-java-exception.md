---
title: 🛑 예외의 종류와 특징 (Exception)
key: 20230820
tags: Java Exception
excerpt: Java의 다양한 예외 종류와 특징, 그리고 예외 처리 방법을 설명합니다.
keywords: "Java, 예외, Exception, 오류 처리, 체크 예외, 언체크 예외, 예외 처리 방법"
---

## 1. Error

java.lang.Error 클래스의 서브클래스로 시스템에 비정상적인 상황이 발생했을 때 사용된다.   
주로 자바 VM에서 발생시키며 대응할 수 없다. <sub><i>e.g. OutOfMemoryError, ThreadDeath</i></sub>

## 2. Exception

java.lang.Exception 클래스와 그 서브클래스로 코드 레벨에서 예외상황이 발생했을 때 사용된다.   
Exception Class는 다시 체크 예외와 언체크 예외로 나뉜다.

### 2.1 체크 예외

Exception 클래스의 서브클래스이면서 RuntimeException을 상속하지 않은 클래스이다.   
체크 예외가 발생할 수 있는 메소드를 사용하는 경우 반드시 예외처리 코드(try~catch, throws)를 작성해야 한다.

### 2.2 언체크 예외

Exception 클래스의 서브클래스이면서 RuntimeException을 상속한 클래스이다.   
자바는 RuntimeException과 그 서브클래스를 💎특별하게 취급한다.   
주로 프로그램 오류로 발생하며 명시적인 예외처리를 강제하지 않는다.   
명시적으로 예외처리 코드를 작성해도 상관없다. <sub><i>e.g. NullPointException, IllegalArgumentException</i></sub>

## 3. 예외처리 방법

### 3.1 예외 복구

```java
int maxAttempts = MAXIMUM_ATTEMPTS;
while(maxAttempts—- > 0) {
    try {
        // 예외 발생 가능 코드…
        return;
    } catch(Exception e) {
        // 로그 출력 및 정해진 시간만큼 대기
    } finally {
        // 리소스 반납 및 정리
    }
}
```

### 3.2 예외 회피

1. **호출한 쪽으로 던지기🤾**
```java
public void add() throw SQLException {
    // JDBC API
}
```
2. **로그를 남기고 호출한 쪽으로 던지기🤾‍♀️**
```java
public void add() throw SQLException {
    try {
        // JDBC API
    } catch(SQLException e) {
        // 로그 출력
        throw e;
    }
}
```

### 3.3 예외 전환

1. 예외 전환 기능을 가진 메소드
```java
public void add(User user) throws DuplicateUserIdException, SQLException {
    try {
    // JDBC를 이용해 사용자의 정보를 DB에 추가하는 로직
    } catch(SQLException e) {
        if(e.getErrorCode == MysqlErrorNumbers.ER_DUP_ENTRY)
            throw DuplicateUserIdException();
        else
            throw e;
    }
}
```

    * 중첩 예외1
    ```java
    catch(Exception e) {
        // …
        throw DuplicateUserIdException(e);
    ```

    * 중첩 예외2
    ```java
    catch(Exception e) {
        // …
        throw DuplicateUserIdException().initCause(e);
    ```