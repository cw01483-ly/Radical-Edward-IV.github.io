---
layout: article
title: 1. 다형성과 타입 캐스팅
permalink: /notes/kr/java-deep-dive/chapter-01
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Java 심화 과정 강의 노트, 다형성과 타입 캐스팅 개념과 활용 방법을 다룹니다.
keywords: "Java, 다형성, 타입 캐스팅, 심화 과정, 데이터 처리, 프로그래밍"
---

<style>
    /* 색상 활용 규칙
      빨강: 주의, 경고, 위험 (덮어쓰기, 에러 등)
      파랑: 핵심 개념, 주요 기능 (모드, with 구문 등)
      초록: 안전한 대안, 긍정적 결과 (추가 모드, 정답 보기 등)
      노랑: 코드 요소 (함수명, 메서드명 등)
    */
    .red-text { color: #D53C41; font-weight: bold; }
    .blue-text { color: #203BB0; font-weight: bold; }
    .green-text { color: #448F52; font-weight: bold; }
    .yellow-code { color: #BD8739; font-weight: bold; }
</style>

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Java%20DeepDive&reversal=false&textBg=false)

>자바의 객체 지향 프로그래밍 핵심은 **클래스**입니다.  
>그 중에서 **생성자(Constructor)와 상속(Inheritance)**은 반드시 이해해야 하는 중요한 개념입니다.

## 1. 생성자(Constructor)

### 생성자 개념
<span class="blue-text">객체 생성 시 호출</span>되는 특별한 메서드이며, 주요 특징은 다음과 같습니다.
* <span class="blue-text">클래스 이름과 동일</span>
* <span class="blue-text">반환 타입 없음</span>
* <code class="yellow-code">new</code> 키워드와 함께 호출
* 생성자를 작성하지 않으면 컴파일러가 <span class="green-text">기본 생성자를 자동으로 제공</span>

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

### this와 this()
* <code class="yellow-code">this</code>: <span class="blue-text">현재 객체(자기 자신)</span>를 가리키는 참조 변수
* <code class="yellow-code">this()</code>: <span class="blue-text">같은 클래스의 다른 생성자</span>를 호출

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

## 2. 상속
<span class="blue-text">부모 클래스</span>의 필드와 메서드를 <span class="blue-text">자식 클래스</span>가 물려받는 것을 의미하며, 다음과 같은 장점이 있습니다.
* <span class="green-text">코드 재사용성 향상</span>
* <span class="green-text">중복 제거</span>

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

### 문제 1: Person 클래스 생성자와 필드 초기화
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

## 3. 오버라이딩(Overriding)
<span class="blue-text">부모 클래스의 메서드를 자식 클래스에서 재정의</span>하는 것을 말하며, 아래 규칙을 따라야 합니다.
* 메서드의 <span class="blue-text">이름, 매개변수, 반환 타입이 동일</span>해야 합니다.
* 접근 제한자는 <span class="blue-text">같거나 더 넓은 범위</span>로만 변경 가능합니다.
  - <span class="green-text">`default` → `public` (O)</span>
  - <span class="red-text">`public` → `private` (X)</span>

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

## 4. Super 키워드
<code class="yellow-code">super</code>는 <span class="blue-text">부모 클래스의 멤버를 참조</span>할 때 사용하는 키워드입니다.

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

## 5. 접근제한자
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

## 6. final 클래스와 final 메서드
* <code class="yellow-code">final class</code>: <span class="blue-text">상속 불가</span>
* <code class="yellow-code">final method</code>: <span class="blue-text">오버라이딩 불가</span>
* <span class="red-text">생성자에는 `final`을 사용할 수 없습니다.</span>

```java
final class Car {}  // 더 이상 상속 불가

class Phone {
    final void call() {
        System.out.println("전화 걸기");
    }
}
```

### 문제 2. 생성자 오버로딩
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

### 문제 3. 오버라이딩과 다형성
> 부모 클래스 `Post`에 share() 메서드를 정의하고, 자식 클래스 `ImagePost`와 `VideoPost`에서 오버라이딩하세요.  
> 각각 “이미지 공유”, “비디오 공유”를 출력하세요.
> 
> **조건 및 힌트**
> 1. extends 키워드를 사용해 상속하세요.
> 2. `@Override` 애노테이션을 붙여주세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
    class Post {
        void share() {
            System.out.println("게시물 공유");
        }
    }

    class ImagePost extends Post {
        @Override
        void share() {
            System.out.println("이미지 공유");
        }
    }

    class VideoPost extends Post {
        @Override
        void share() {
            System.out.println("비디오 공유");
        }
    }

    public class Main {
        public static void main(String[] args) {
            Post p1 = new ImagePost();
            Post p2 = new VideoPost();
            p1.share();  // 이미지 공유
            p2.share();  // 비디오 공유
        }
    }
  </code></pre>
</details>

### 문제 4. super 키워드로 부모 필드 접근하기
> Parent 클래스의 value 필드를 Child 클래스에서 출력하도록 하세요.   
> super 키워드를 사용해야 합니다.
> 
> **조건 및 힌트**
> 1. `super`는 부모 클래스의 필드나 메서드에 접근할 때 사용합니다.
> 2. Child 클래스 안에서 `super.value`를 출력하세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
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

## 7. 타입 변환
<figure>
<img src="/notes/assets/java-deep-dive/chapter-01-01.jpg" width="650px;" alt="Java Object Type Casting">
<figcaption>https://www.geeksforgeeks.org/java/class-type-casting-in-java/</figcaption>
</figure>

타입 변환은 한 타입을 다른 타입으로 변환하는 것입니다. 자바의 클래스 타입 변환은 상속 관계에서 이루어지며, 두 가지 종류가 있습니다.

### 자동 타입 변환 (업캐스팅, Upcasting)
<span class="blue-text">자식 객체를 부모 타입으로 변환</span>하는 것을 말하며, 별도의 캐스팅 연산자 없이 자동으로 이루어집니다.
* `부모클래스 변수 = new 자식클래스();`
* `부모클래스 변수 = 자식객체;`

부모 타입으로 변환된 경우, <span class="red-text">부모 클래스의 멤버만 접근 가능</span>합니다.
단, 자식이 <span class="blue-text">오버라이딩한 메서드</span>는 자식의 메서드가 호출됩니다.

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
<span class="blue-text">부모 타입으로 변환된 객체를 다시 자식 타입으로 변환</span>하는 것을 말하며, <span class="blue-text">자식 클래스의 멤버에 접근</span>하기 위해 사용됩니다.
* 일회성 변환: `((자식클래스) 부모타입참조).자식메서드();`
* 변수 저장 후 사용: `자식클래스 변수 = (자식클래스) 부모타입참조;`

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

### 문제 5: 기본 타입 변환 연습
> `Account`(계좌) 클래스를 만들고, 이를 상속받는 `SavingsAccount`(저축예금) 클래스를 정의하세요.  
> `SavingsAccount` 객체를 생성하여 `Account` 타입으로 자동 변환(업캐스팅)한 뒤, 다시 `SavingsAccount` 타입으로 강제 변환(다운캐스팅)하여 저축예금에만 있는 메서드를 호출해보세요.
>
> **조건 및 힌트**
> 1. `Account` 클래스에는 `showBalance()` 메서드를, `SavingsAccount` 클래스에는 `addInterest()` 메서드를 추가하세요.
> 2. `instanceof` 연산자를 사용하여 안전하게 다운캐스팅을 시도하세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
    class Account {
        int balance = 10000;
        void showBalance() {
            System.out.println("잔액: " + balance + "원");
        }
    }

    class SavingsAccount extends Account {
        void addInterest() {
            System.out.println("이자가 추가되었습니다!");
        }
    }

    public class Main {
        public static void main(String[] args) {
            // 1. SavingsAccount 객체를 Account 타입으로 업캐스팅
            Account acc = new SavingsAccount();
            acc.showBalance(); // Account의 메서드 호출 가능

            // 2. instanceof로 타입 확인 후 안전하게 다운캐스팅
            if (acc instanceof SavingsAccount) {
                SavingsAccount sa = (SavingsAccount) acc;
                sa.addInterest(); // SavingsAccount 고유의 메서드 호출
            }
        }
    }
  </code></pre>
</details>

### 문제 6: 다형성을 활용한 객체 관리
> 다양한 상품(`Product`)을 관리하는 쇼핑몰 프로그램을 만드세요. `Product`를 부모 클래스로 하고, `Book`과 `Clothing`을 자식 클래스로 정의하세요.
> `Product` 타입의 배열에 `Book`과 `Clothing` 객체를 함께 저장하고, 반복문을 통해 각 상품의 정보를 출력하세요.
>
> **조건 및 힌트**
> 1. `Product`에는 `showInfo()` 메서드를 정의하고, 각 자식 클래스에서 이를 오버라이딩하세요.
> 2. `Book`에는 `readSample()` 메서드를, `Clothing`에는 `checkSize()` 메서드를 추가하세요.
> 3. 반복문 내에서 `instanceof`를 사용해 객체 타입을 확인하고, 다운캐스팅하여 각 클래스 고유의 메서드를 호출하세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
    class Product {
        public void showInfo() {
            System.out.println("상품 정보를 표시합니다.");
        }
    }

    class Book extends Product {
        @Override
        public void showInfo() {
            System.out.println("책 정보를 표시합니다.");
        }

        public void readSample() {
            System.out.println("책 샘플을 읽어봅니다.");
        }
    }

    class Clothing extends Product {
        @Override
        public void showInfo() {
            System.out.println("의류 정보를 표시합니다.");
        }

        public void checkSize() {
            System.out.println("의류 사이즈를 확인합니다.");
        }
    }

    public class Main {
        public static void main(String[] args) {
            Product[] products = { new Book(), new Clothing() };

            for (Product p : products) {
                p.showInfo(); // 오버라이딩된 메서드 실행

                if (p instanceof Book) {
                    Book book = (Book) p;
                    book.readSample();
                } else if (p instanceof Clothing) {
                    Clothing clothing = (Clothing) p;
                    clothing.checkSize();
                }
            }
        }
    }
  </code></pre>
</details>

## 8. 다형성
다형성(Polymorphism)은 객체 지향 프로그래밍의 핵심 특징 중 하나로, <span class="blue-text">하나의 타입(부모)으로 다양한 형태의 객체(자식)를 다룰 수 있는 능력</span>을 의미합니다.

앞서 학습한 타입 변환을 통해, 동일한 메서드를 호출하더라도 실제 참조하는 객체가 무엇인지에 따라 실행 결과가 달라집니다.

### 사용 사례
예를 들어, `Employee`(직원)라는 부모 클래스를 상속받는 여러 자식 클래스가 있을 때, `Employee` 타입 하나만으로 다양한 직급의 객체를 관리할 수 있습니다.
* `Manager` 객체는 보고 기능을 수행
* `Engineer` 객체는 개발 기능을 수행
* `Intern` 객체는 보조 기능을 수행

이처럼 **하나의 부모 타입 참조 변수로 다양한 자식 객체를 유연하게 처리할 수 있는 것**이 다형성의 대표적인 활용 사례입니다.
