---
title: 🍃 Spring Security
key: 20231213
tags: Spring SpringSecurity
excerpt: Spring Security의 기본 설정과 사용법을 설명합니다. 의존성 추가, 설정 파일 구성, 인증과 인가 설정, 보안 기능을 소개합니다.
keywords: "Spring Security, 보안, 인증, 인가, Spring Boot, 의존성 설정, 보안 구성, 사용자 인증"
---

# 🏃‍♂️ Quick Start
## 1. 의존성 추가
### maven

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

### Gradle
```xml
implementation "org.springframework.boot:spring-boot-starter-security"
```

## 2. Hello Spring Security

classpath에 Spring Security를 추가하고 스프링 애플리케이션을 실행합니다.   
실행 후 콘솔을 보면 다음과 같은 출력을 확인할 수 있습니다.   
아래의 출력을 통해서 애플리케이션에 스프링 시큐리티가 적용된 것을 확인할 수 있습니다.

```bash
2023-10-11T16:15:34.331+09:00  WARN 1644 --- [  restartedMain] .s.s.UserDetailsServiceAutoConfiguration :

Using generated security password: 5451a8c2-a100-43ef-843c-7fb621b5c73b
```

터미널을 실행한 뒤 엔드포인트 URL에 대한 curl 명령어를 실행하면 다음과 같은 출력을 확인할 수 있습니다.

```bash
curl -i http://localhost:8080/hello
HTTP/1.1 401
Set-Cookie: JSESSIONID=AC7913E4BD60253DAC7D19E775107B7B; Path=/; HttpOnly
WWW-Authenticate: Basic realm="Realm"
...
```

스프링 시큐리티는 `401` 응답과 함께 접근을 거부하게 됩니다.   
웹 브라우저를 통해서 접속을 시도하게 되면 로그인 페이지가 표시됩니다.   
설정 정보를 작성하기 전이라 Default 설정이 적용되고 있습니다.   
모든 엔드포인트 URL에 요청할 경우 로그인 페이지로 리다이렉트합니다.   
Username에 ‘user’를 입력하고 Password에는 Console에서 Log로 확인한 password를 입력하여 접속할 수 있습니다.

<img src="/images/spring-security-01.png" width="700px;" alt="Spring Security Study">​

# Spring Security Guide

> 들어가기 전
스프링 시큐리티의 컨셉을 깊이 있게 이해하고 싶다면 공식 사이트의 문서를 참고하세요.   
본 글은 기본적인 API 서비스에 스프링 시큐리티 및 JWT 적용을 목적으로 합니다.
> 

[Spring Security :: Spring Security](https://docs.spring.io/spring-security/reference/index.html)

## 1. Architecture
### 전체 시나리오

1. 사용자는 회원가입(`/api/v1/auth/signup`)을 요청합니다.
2. 사용자는 가입한 계정을 이용하여 로그인(`/api/v1/signin`)합니다.
3. 계정 인증에 성공한 사용자는 자원(`/api/v1/resource`)에 접근하기 위한 요청(Request)을 서버에 보냅니다.

### 회원가입

1. 사용자는 서비스에 회원가입을 요청합니다. 사용자의 요청 정보를 기반으로 User 객체가 생성됩니다. 사용자의 암호는 `PasswordEncoder`에 의해서 암호화됩니다.
2. User 객체는 `UserRepository`를 통하여 Database에 저장됩니다.

### 로그인

<img src="/images/spring-security-02.png" width="700px;" alt="Spring Security Study">​

1. 사용자의 로그인 요청이 오면 `UsernamePasswordAuthenticationFilter`가 `Authentication` 타입인 `UsernamePasswordAuthenticationToken`을 생성합니다.
2. `AuthenticationManager`는 사용자 인증과 관련한 작업을 처리합니다. 사용자 인증을 위해 `UsernamePasswordAuthenticationToken`은 `AuthenticationManager`로 전달됩니다.
3. username 또는 password가 검증에 실패한다면 `RememberMeService.loginFail`과 `AuthenticationFailureHandler`가 호출됩니다. 사용자는 `403` 응답을 받게 됩니다.
4. 사용자 검증에 성공한다면 Database에서 사용자를 검색하게 됩니다. 만약 일치하는 사용자가 없다면 요청자에게 `403` 응답을 반환합니다. 2번 과정에서 사용자 인증을 시도했기 때문에 이 과정을 그렇게 중요하지 않습니다. 이후 검색된 사용자 정보를 `JwtTokenProvider`에 전달하여 JWT 생성을 요청합니다. 그리고 JWT가 JSON 응답에 캡슐화되어 사용자에게 반환됩니다.

### 자원 요청

1. 사용자가 자원에 대한 요청을 시도하게 되면, 해당 요청은 `JwtAuthenticationFilter`로 전달됩니다. `SecurityFilterChain`에 등록된 `JwtAuthenticationFilter`은 커스텀된 필터입니다.
2. 보호받고 있는 자원에 대한 요청에 JWT가 없을 경우 요청자에게 `403` 응답을 반환하게 됩니다.
3. JWT가 존재할 경우 Jwt로부터 사용자 ID(Subject)를 추출하기 위해 `JwtTokenProvider`가 호출됩니다. 사용자 ID가 정상적으로 추출되지 않을 경우 `403` 응답을 반환하게 됩니다.
4. 만약 사용자 ID가 추출되었다면, ID를 파라미터로 하여 `UserDetailService`를 구현한 `CustomUserDetailsService`의 `loadByUserId()`가 호출됩니다.
5. Database에 사용자 정보가 없다면, 요청자에게 `403` 응답을 반환하게 됩니다.
6. 인증 성공 시 사용자 정보는 `UsernamaPasswordAuthenticationToken`에 캡슐화되어 `SecurityContextHolder`에 저장됩니다.
7. 이후 스프링 시큐리티의 인가 프로세스가 시작됩니다. 인가 프로세스가 성공할 경우 사용자의 요청은 컨트롤러로 보내지며 비즈니스 로직이 처리됩니다.

> *`SecurityContextHolder`:* 인가된 사용자의 정보가 저장된 저장소입니다. 스프링 시큐리티는 인증 작업에 해당 정보를 사용합니다.
> 

## 2. Demonstration

<a href="https://github.com/Radical-Edward-IV/spring-security-study"><img src="/images/github.png" style="border: 1px solid grey;" width="80%" alt="Github"></a>

<br>
<br>
<span style="color: grey; font-weight: 700;">References</span>   
[https://spring.io/projects/spring-security](https://spring.io/projects/spring-security)   
[https://medium.com](https://medium.com/@truongbui95/jwt-authentication-and-authorization-with-spring-boot-3-and-spring-security-6-2f90f9337421)
