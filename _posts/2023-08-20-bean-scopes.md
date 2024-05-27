---
title: 🫘 빈 스코프 (Bean Scopes in Spring)
key: 20230820
tags: Spring Bean @Bean @Scope
excerpt: Spring 프레임워크에서 빈의 생명주기를 관리하는 빈 스코프에 대해 설명합니다. 싱글톤, 프로토타입, 요청, 세션, 애플리케이션, 웹소켓 스코프의 차이점과 사용 방법을 다룹니다. 
keywords: "Spring, 빈 스코프, Singleton, Prototype, Request, Session, Application, WebSocket, IoC 컨테이너, 빈 생명주기"
---

## 1. Overview

스프링 프레임워크의 빈 스코프란 IoC 컨테이너 내에 정의된 빈의 생명주기를 관리하기 위한 용도로 사용된다.

## 2. Bean Life Cycle

스프링 컨테이너 시작   
👉 빈 생성   
👉 DI   
👉 커스텀 초기화 메소드(`@PostConstructor`)    
👉 빈 사용   
👉 커스텀 소멸 메소드(`@PreDestroy`)

## 3. 6 Types of Scopes

스프링 프레임워크 최신 버전에서는 6가지의 빈 스코프가 정의되어 있다.

* **Singleton Scope:** 컨테이너는 싱글톤 스코프로 정의된 빈을 단일 인스턴스로 생성한다. 그리고 모든 요청에 동일한 오브젝트를 반환한다. 싱글톤 스코프를 가진 빈이 상태 정보를 저장할 경우 문제가 발생할 수 있다. 저장할 공간이 하나인데 서로 덮어쓰고 읽으면 위험하다. 그러므로 무상태(stateless) 방식으로 설계해야 한다. 개발자가 달리 설정을 하지 않을 경우 빈은 싱글톤 스코프(default)를 가진다.

```java
// Java 설정
// 설정 정보 활용
@Configuration
public class AppConfiguration {
    @Bean
    @Scope(“singleton”)
    public MyBean getMyBean() {
        return new MyBean();
    }
}
// ComponentScan 활용
@Component
@Scope(“singleton”)
public class MyBean {
    ...
}

// xml 설정
<bean id=“myBean” class=“org.bean.scope.MyBean” scope=“singleton” />
```

* **Prototype Scope:** 프로토타입 스코프로 정의된 빈은 컨테이너로부터 요청될 때마다 다른 인스턴스로 반환된다. 싱글톤 스코프로 정의된 빈 내부에 주입되는 스프링 빈이 프로토타입일 경우 문제가 발생할 수 있다. 프로토타입의 스코프를 가지는 빈은 요청마다 생성될 것이라 기대하지만 싱글톤 빈과 함께 사용할 경우 계속 유지되며 예상과 다른 결과를 만들어 낸다.

* **Web Aware Scopes**

    - **Request Scope:** 웹 요청이 들어오고 나갈 때까지 유지된다. Request 스코프 빈을 정의할 때는 *proxyMode* 어트리뷰트를 꼭 추가해야 한다. 스프링 애플리케이션이 구동될 때 싱글톤 빈은 생성 후 초기화 및 의존 관계 설정 작업이 진행되지만, request 스코프 빈후 사용자의 요청이 와야만 생성되기 때문이다.

    ```java
    @Bean
    @Scope(value = “request”, proxyMode = ScopedProxyMode.TARGET_CLASS)
    public MyBean requestScopedBean() {
        return new MyBean();
    }

    @Bean
    @RequestScope
    public MyBean requestScopedBean() {
        return new MyBean();
    }
    ```

    - **Session Scope:** 세션이 살아있을 때까지 유지된다. Request Scope와 동일하게 프록시를 사용해야 오류가 발생하지 않는다.

    - **Application Scope:** 서블릿 컨텍스트와 라이프 사이클을 함께 한다.

    - **WebSocket Scope:** 웹소켓과 동일한 라이프 사이클을 가진다.

<br>
<br>
<span style="color: grey; font-weight: 700;">References</span>   
[https://catsbi.oopy.io](https://catsbi.oopy.io/3a9e3492-f511-483d-bc65-183bb0c166b3)   
[https://www.baeldung.com](https://www.baeldung.com/spring-bean-scopes)