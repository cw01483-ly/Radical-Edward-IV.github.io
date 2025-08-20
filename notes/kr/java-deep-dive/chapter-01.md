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

## 8. 