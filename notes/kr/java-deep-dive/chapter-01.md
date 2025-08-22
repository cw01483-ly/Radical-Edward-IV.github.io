---
layout: article
title: 1. 다형성과 인터페이스
permalink: /notes/kr/java-deep-dive/chapter-01
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Java 심화 과정 강의 노트, 다형성 개념과 인터페이스 활용 방법을 다룹니다.
keywords: "Java, 다형성, 인터페이스, 심화 과정, 데이터 처리, 프로그래밍"
---

<style>
    img {

    }
    .blue-bold {
        color: #203BB0;
        font-weight: 900;
    }
    .red-bold {
        color: #D53C41;
        font-weight: 900;
    }
    .green-bold {
        color: #448F52;
        font-weight: 900;
    }
    .yellow-bold {
        color: #BD8739;
        font-weight: 900;
    }
    .text-underline {
        text-decoration: underline;
    }
</style>

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Java%20DeepDive&reversal=false&textBg=false)

>자바의 객체 지향 프로그래밍 핵심은 **클래스**입니다.  
>그 중에서 **생성자(Constructor)와 상속(Inheritance)**은 반드시 이해해야 하는 중요한 개념입니다.

---

## 1. 생성자(Constructor)

### 생성자 개념
객체 생성 시 호출되는 특별한 메서드입니다.   
**클래스 이름과 동일**하며 **반환 타입 없음** `new` 키워드와 함께 호출됩니다.   
클래스에 생성자를 작성하지 않으면 **컴파일러가 기본 생성자 제공**합니다.

```java
public class Hello {
    int message;
    // 기본 생성자
    Hello() {
    }
}
```

### 생성자 오버로딩
매개변수의 개수와 타입이 다른 생성자를 여러 개 선언 가능합니다.   
이를 생성자 오버로딩이라고 합니다.

```java
class Person {
    String name;
    int age;

    Person() {}

    Person(String name) { this.name = name; }

    Person(String name, int age) { 
        this(name); // this()로 다른 생성자 호출
        this.age = age; 
    }

    // 생성자으 매개변수 이름이 직관적이지 않다.
    // Person(String a, int b) {
    //     name = a;
    //     age = b;
    // }
}
```

## 2. this와 this()
* this: 현재 객체 자기 자신 참조
* this(): 같은 클래스의 다른 생성자 호출

```java
class Student {
    String name;
    int score;

    Student(String name) {
        this.name = name;
    }

    Student(String name, int score) {
        this(name);   // 다른 생성자 호출
        this.score = score;
    }
}
```

## 3. 상속
부모 클래스의 필드와 메서드를 자식 클래스가 물려받는 것을 말합니다.   
코드 재사용성 향상과 중복 제거 효과가 있습니다.

```java
class A {
    void hello() { System.out.println("Hello"); }
}

class B extends A {
    void hi() { System.out.println("Hi"); }
}

B b = new B();
b.hello(); // 부모 메서드 사용 가능
```

### 문제 1
> `Person` 클래스를 작성하고, 이름과 나이를 입력받아 필드를 초기화하는 생성자를 만들어 보세요.   
> 생성된 객체의 이름과 나이를 출력하세요.
>
> **조건 및 힌트**
> 1. 생성자는 클래스 이름과 같아야 합니다.
> 2. this 키워드를 사용하여 필드를 초기화하세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-python">
  class Person {
      String name;
      int age;

      Person(String name, int age) {
          this.name = name;
          this.age = age;
      }
  }

  public class Main {
      public static void main(String[] args) {
          Person p = new Person("홍길동", 25);
          System.out.println("이름: " + p.name);
          System.out.println("나이: " + p.age);
      }
  }
  </code></pre>
</details>

## 4. 오버라이딩(Overriding)
부모 클래스의 메서드를 자식 클래스에서 재정의합니다.   

* 이름, 매개변수, 반환타입이 동일해야 합니다.
* 접근 제한자는 같거나 더 넓게만 변경 가능합니다.   
`default` → `public` 🙆‍♂️, `public` → `private` 🙅‍♀️

```java
class Computer {
    void powerOn() {
        System.out.println("전원 켜짐");
    }
}

class Mac extends Computer {
    // 애노테이션 권장!
    @Override
    void powerOn() {
        super.powerOn(); // 부모 메서드 호출
        System.out.println("Boot MacOSX");
    }
}
```

### 5. Super 키워드
부모 클래스의 필드나 메서드를 참조할 때 사용합니다.

```java
class Parent {
    int value = 10;
}

class Child extends Parent {
    void show() {
        System.out.println(super.value);
    }
}
```

## 6. 접근제한자
<table>
  <colgroup>
    <col width="30%" />
    <col width="70%" />
  </colgroup>
  <tr align="center" style="background-color: #ddd;">
    <th>제한자</th>
    <th>적용 범위</th>
  </tr>
  <tr>
    <td>public</td>
    <td>모든 클래스에서 접근 가능</td>
  </tr>
  <tr>
    <td>protected</td>
    <td>같은 패키지 + 자식 클래스</td>
  </tr>
  <tr>
    <td>default</td>
    <td>같은 패키지 내부</td>
  </tr>
  <tr>
    <td>private</td>
    <td>같은 클래스 내부</td>
  </tr>
</table>

## 7. final 클래스와 final 메서드
* final class: 상속 불가
* final method: 오버라이딩 불가
* **생성자에는 `final` 사용 불가**

```java
final class Car {}  // 더 이상 상속 불가

class Phone {
    final void call() {
        System.out.println("전화 걸기");
    }
}
```

### 문제 2
> Student 클래스를 작성하고, 기본 생성자와 이름만 받는 생성자, 이름과 점수를 모두 받는 생성자를 작성하세요.
> 생성자 오버로딩을 활용하세요.
> 
> **조건 및 힌트**
> 1. 생성자는 매개변수 개수와 타입을 달리할 수 있습니다.
> 2. this()를 이용해 생성자 간 호출을 해보세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-python">
    class Student {
        String name;
        int score;

        Student() {}

        Student(String name) {
            this.name = name;
        }

        Student(String name, int score) {
            this(name);       // 다른 생성자 호출
            this.score = score;
        }
    }

    public class Main {
        public static void main(String[] args) {
            Student s1 = new Student("철수");
            Student s2 = new Student("영희", 90);
            System.out.println(s1.name);
            System.out.println(s2.name + " - " + s2.score);
        }
    }
  </code></pre>
</details>

### 문제 3
> 부모 클래스 Animal에 sound() 메서드를 정의하고, 자식 클래스 Dog와 Cat에서 오버라이딩하세요.   
> 각각 “멍멍”, “야옹”을 출력하세요.
> 
> **조건 및 힌트**
> 1. extends 키워드를 사용해 상속하세요.
> 2. `@Override` 애노테이션을 붙여주세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-python">
    class Animal {
        void sound() {
            System.out.println("소리");
        }
    }

    class Dog extends Animal {
        @Override
        void sound() {
            System.out.println("멍멍");
        }
    }

    class Cat extends Animal {
        @Override
        void sound() {
            System.out.println("야옹");
        }
    }

    public class Main {
        public static void main(String[] args) {
            Animal a1 = new Dog();
            Animal a2 = new Cat();
            a1.sound();  // 멍멍
            a2.sound();  // 야옹
        }
    }
  </code></pre>
</details>

### 문제 4
> Parent 클래스의 value 필드를 Child 클래스에서 출력하도록 하세요.   
> super 키워드를 사용해야 합니다.
> 
> **조건 및 힌트**
> 1. `super`는 부모 클래스의 필드나 메서드에 접근할 때 사용합니다.
> 2. Child 클래스 안에서 `super.value`를 출력하세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-python">
    class Parent {
        int value = 100;
    }

    class Child extends Parent {
        void showValue() {
            System.out.println("부모 value = " + super.value);
        }
    }

    public class Main {
        public static void main(String[] args) {
            Child c = new Child();
            c.showValue();
        }
    }
  </code></pre>
</details>

## 8. 타입 변환
<figure>
<img src="/notes/assets/java-deep-dive/chapter-01-01.jpg" width="650px;" alt="Java Object Type Casting">
<figcaption>https://www.geeksforgeeks.org/java/class-type-casting-in-java/</figcaption>
</figure>

타입 변환은 객체의 타입을 다른 타입으로 변환하는 것을 말합니다.   
자바에서는 크게 두 가지 경우가 있습니다.

1. **자료형(기본 타입) 변환**   
자동 형 변환, 강제 형 변환 (기초 강의에서 학습)
2. **클래스 객체 타입 변환**    
상속 관계에서 이루어지며, 변환 가능 범위는 제한적임

### 자동 타입 변환 (업캐스팅, Upcasting)
상속 관계에서 **자식 객체를 부모 타입으로 변환**하는 것입니다.

* `부모클래스 변수 = new 자식클래스();`
* `부모클래스 변수 = 자식객체;`

부모 부모 타입으로 변환된 경우, **부모 클래스 멤버만 접근 가능**합니다.   
단, 자식이 **오버라이딩한 메서드**는 자식 클래스의 메서드가 호출됩니다.

```java
class Parent {
    void print() {
        System.out.println("부모 출력");
    }
}

class Child extends Parent {
    void print() {   // 오버라이딩
        System.out.println("자식 출력");
    }
    void childOnly() {
        System.out.println("자식 전용 메서드");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();   // 자동 타입 변환 (업캐스팅)
        p.print();                // "자식 출력" (오버라이딩된 메서드 실행)
        // p.childOnly();         // 부모 타입이라 접근 불가
    }
}
```

### 강제 타입 변환 (다운캐스팅, Downcasting)
부모 타입으로 변환된 객체를 다시 자식 타입으로 변환하는 것입니다.   
이렇게 해야 자식 클래스 고유의 멤버에 접근 가능합니다.

* **일회성 반환:** `((자식클래스) 부모타입참조).자식메서드();`
* **변수에 저장:** `자식클래스 변수 = (자식클래스) 부모타입참조;`

```java
class Parent {
    void print() {
        System.out.println("부모 출력");
    }
}

class Child extends Parent {
    void print() {
        System.out.println("자식 출력");
    }
    void childOnly() {
        System.out.println("자식 전용 메서드");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();   // 업캐스팅
        p.print();                // "자식 출력"

        // 1) 일회성 다운캐스팅
        ((Child)p).childOnly();   // "자식 전용 메서드"

        // 2) 변수에 할당
        Child c = (Child)p;
        c.childOnly();            // "자식 전용 메서드"
    }
}
```

## 9. 다형성
다형성은 객체 지향 프로그래밍의 대표적인 특징 중 하나입니다.    
**하나의 타입(부모 타입)으로 다양한 객체(자식 클래스)를 사용**할 수 있는 것을 의미합니다.

앞서 학습한 타입 변환을 통해, 부모 클래스 하나로 여러 자식 객체들을 참조하여 사용할 수 있습니다.   
즉, 동일한 메서드 호출이라도 실제 어떤 객체가 할당되어 있는지에 따라 실행 결과가 달라집니다.

### 사용 사례
예를 들어, 회사의 Employee(직원) 라는 부모 클래스를 만들고, 이를 상속받는 Manager(관리자), Engineer(엔지니어), Intern(인턴) 클래스를 정의할 수 있습니다.   
프로그램에서는 Employee 타입의 리스트 하나만 선언해 두고, 그 안에 다양한 직급의 객체들을 저장할 수 있습니다.

* Manager 객체가 들어오면 보고 기능을 실행
* ngineer 객체가 들어오면 개발 기능을 실행
* ntern 객체가 들어오면 보조 기능을 실행

이처럼 **하나의 부모 타입(Employee) 참조 변수로 다양한 자식 객체들을 다룰 수 있는 것**이 다형성의 대표적인 활용 사례입니다.