---
layout: article
title: 2. 예외 처리 및 기본 API 클래스
permalink: /notes/kr/java-deep-dive/chapter-02
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Java 심화 과정 강의 노트, 예외 처리 개념과 기본 API 클래스 활용 방법을 다룹니다.
keywords: "Java, 예외 처리, 에러, Exception, try-catch, 사용자 정의 예외"
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

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Java%20Exception&reversal=false&textBg=false)

## 1. 에러와 예외
자바 프로그램 실행 중 발생하는 비정상적인 상황을 의미하며, 다음과 같이 두 종류로 나뉩니다.
* <span class="red-text">에러(Error)</span>: 메모리 부족, 스택 오버플로우와 같이 <span class="red-text">시스템 레벨에서 발생하는 심각한 문제</span>입니다. 개발자가 코드로 처리할 수 없습니다.
* <span class="blue-text">예외(Exception)</span>: 잘못된 값 입력, 파일 عدم وجود 등 <span class="blue-text">코드 실행 중 발생하는 문제</span>이며, 개발자가 <code class="yellow-code">try-catch</code> 등을 통해 대비할 수 있습니다.

자바는 이들을 <span class="blue-text">클래스</span>로 관리하며, 문제가 발생하면 해당 클래스의 객체가 생성되어 시스템에 전달됩니다.

## 2. 에러(Error)
시스템에 비정상적인 상황이 생겼을 때 발생하며, 개발자가 예측하거나 처리할 수 없는 문제입니다.

### 대표적인 에러
* <code class="yellow-code">OutOfMemoryError</code>: <span class="red-text">메모리가 부족</span>할 때 발생합니다.
* <code class="yellow-code">StackOverflowError</code>: <span class="red-text">무한 재귀 호출</span> 등으로 스택 메모리가 가득 찼을 때 발생합니다.

## 3. 예외(Exception)
<span class="blue-text">프로그램 실행 중 발생하는 문제</span>이며, 문법 오류가 아닌 운영 중에 발생하는 상황을 말합니다. 예외는 다음과 같이 나뉩니다.

|   구분    |              체크 예외(Checked)              | 비체크 예외(Unchecked)  |
|-----------|----------------------------------------------|-------------------------|
| 처리 여부 | <span class="red-text">반드시 `try-catch`나 `throws`로 처리</span> |     처리 강제 아님      |
| 확인 시점 |                 컴파일 단계                  |        실행 단계        |
| 대표 예외 |          `IOException`, `SQLException`           | `NullPointerException`, `ArithmeticException` |

### 예외 클래스 구조
<figure>
<img src="/notes/assets/java-deep-dive/exception-hierarchy.png" width="70%" alt="예외 클래스 구조"/>
<figcaption>https://www.geeksforgeeks.org/java/exceptions-in-java/</figcaption>
</figure>

- 최상위: <span class="blue-text">`Throwable`</span>
- 하위: `Error`, `Exception`
- `Exception`의 하위 → <span class="blue-text">`RuntimeException`</span>과 그 외(Checked Exception)로 나뉨

### 주요 실행 예외 (Unchecked)

#### 1) NullPointerException
* **원인**: `null` 값을 갖는 참조 변수로 객체 멤버에 접근 시도
* **상황**: 객체가 아직 생성되지 않았는데 사용하려 할 때
```java
public class Main {
    public static void main(String[] args) {
        String str = null;
        System.out.println(str.length()); // NullPointerException
    }
}
```

#### 2) NumberFormatException
* **원인**: 숫자로 변환할 수 없는 문자열을 숫자로 변환 시도
* **상황**: "123"은 가능하지만, "12a"는 불가능
```java
public class Main {
    public static void main(String[] args) {
        String data = "12a";
        int num = Integer.parseInt(data); // NumberFormatException
    }
}
```

#### 3) ArrayIndexOutOfBoundsException
* **원인**: 배열의 접근 불가능한 인덱스 번호를 사용
* **상황**: 길이가 3인 배열(인덱스 0~2)에 `arr[3]`으로 접근할 때
```java
public class Main {
    public static void main(String[] args) {
        int[] arr = {1,2,3};
        System.out.println(arr[3]); // ArrayIndexOutOfBoundsException
    }
}
```

## 4. 예외 처리 문법
예외를 다루기 위한 자바의 문법입니다.

### try-catch 구문
* <code class="yellow-code">try</code>: <span class="blue-text">예외가 발생할 가능성이 있는 코드</span>를 감싸는 블록
* <code class="yellow-code">catch</code>: <span class="blue-text">특정 예외를 잡아 처리</span>하는 블록. `try` 블록 바로 뒤에 여러 개 작성 가능

```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("0으로 나눌 수 없습니다.");
} catch (Exception e) {
    System.out.println("기타 예외 처리");
}
// ❗ Exception은 모든 예외의 부모이므로, 다른 catch 구문보다 아래에 위치해야 합니다.
```

### finally
<span class="green-text">예외 발생 여부와 상관없이 항상 실행</span>되는 블록입니다. 주로 파일 닫기, 데이터베이스 연결 종료 등 <span class="green-text">자원 해제</span>를 위해 사용됩니다.
```java
try {
    System.out.println("작업 실행");
} catch (Exception e) {
    System.out.println("예외 처리");
} finally {
    System.out.println("자원 해제");
}
```

## 5. 예외 전가(던지기)
### `throws`: 예외 처리 미루기
메서드 내부에서 예외를 직접 처리하지 않고, <span class="blue-text">메서드를 호출한 곳으로 예외 처리를 떠넘기는</span> 방법입니다.
```java
public void readFile(String path) throws IOException {
    FileReader fr = new FileReader(path);
}
```

### `throw`: 예외 직접 발생시키기
개발자가 <span class="red-text">의도적으로 특정 예외를 발생</span>시켜야 할 때 사용합니다.
```java
public class Main {
    public static void main(String[] args) {
        try {
            throw new IllegalArgumentException("잘못된 값입니다!");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```
## 6. 사용자 정의 예외
자바가 기본으로 제공하는 예외 외에, <span class="blue-text">개발자가 직접 예외 클래스를 정의</span>하여 사용할 수 있습니다.
* **사용 이유**: 시스템의 특정 비즈니스 규칙을 명확하게 표현하기 위해 (예: 잔액 부족, 재고 없음)
* **만드는 법**: `Exception`(Checked) 또는 `RuntimeException`(Unchecked) 클래스를 상속받아 만듭니다.

#### 사례
* **은행 시스템**: 출금액이 잔액보다 클 경우 → `InsufficientBalanceException`
* **쇼핑몰 시스템**: 상품 재고가 부족할 경우 → `OutOfStockException`
* **예약 시스템**: 예약 불가능한 시간대에 요청할 경우 → `InvalidBookingException`

#### 체크 예외(Checked)로 만들기
```java
public class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String msg) {
        super(msg);
    }
}
```

#### 비체크 예외(Unchecked)로 만들기
```java
public class OutOfStockException extends RuntimeException {
    public OutOfStockException(String msg) {
        super(msg);
    }
}
```

### 문제 1 - 입력 검증과 예외 처리 (기초)
> 콘솔에서 나이 문자열을 입력받아 정수로 변환한 뒤, 음수면 예외로 처리하고 정상 값이면 “성인/미성년자”를 출력하라.
>
> **조건 및 힌트**
> 1. Integer.parseInt 사용. 
> 2. 음수 입력 시 IllegalArgumentException 직접 발생(throw).  
> 3. 잘못된 형식은 NumberFormatException 처리.
> 4. finally에서 “입력 종료” 로그 출력.
> 5. 예: 입력 17 → 미성년자, 입력 20 → 성인.
                
<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
    import java.util.Scanner;

    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            try {
                String s = sc.nextLine();
                int age = Integer.parseInt(s);
                if (age < 0) throw new IllegalArgumentException("음수 나이");
                System.out.println(age >= 19 ? "성인" : "미성년자");
            } catch (NumberFormatException e) {
                System.out.println("숫자를 입력하세요.");
            } catch (IllegalArgumentException e) {
                System.out.println("유효하지 않은 값: " + e.getMessage());
            } finally {
                System.out.println("입력 종료");
                sc.close();
            }
        }
    }
  </code></pre>
</details>

<br>

---

## 7. 기본 API 클래스
자바에서 제공하는 API는 프로그램 개발에 자주 사용되는 클래스 및 인터페이스 모음을 말하며 **라이브러리**라고도 부릅니다.  
공식 문서는 아래 사이트에서 확인할 수 있습니다.  
👉 [Java SE API 공식 문서](https://docs.oracle.com/javase/8/docs/api/)  

### java.lang 패키지
`java.lang` 패키지는 자바 프로그램의 **기본 클래스**를 담고 있으며, <span class="green-text">import 선언 없이 바로 사용</span>할 수 있습니다.  

#### Object 클래스
모든 클래스의 최상위 클래스입니다. 자바의 모든 클래스는 <span class="blue-text">Object</span>를 자동으로 상속합니다.  

**주요 메서드**
- `protected Object clone()`: 객체 복사  
- `boolean equals(Object obj)`: 객체 동등 비교  
- `int hashCode()`: 객체 식별 해시값 반환  
- `String toString()`: 객체 문자열 표현  

**`equals()` 예제**
```java
public class Main {
    public static void main(String[] args) {
        String s1 = new String("hello");
        String s2 = new String("hello");

        System.out.println(s1 == s2);       // false (참조 비교)
        System.out.println(s1.equals(s2));  // true (값 비교)
    }
}
```

**`hashCode()` 예제**
```java
import java.util.HashSet;

class User {
    String name;
    User(String name) { this.name = name; }

    @Override
    public int hashCode() {
        return name.hashCode(); // 이름 기준 해시코드
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            return this.name.equals(((User)obj).name);
        }
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        HashSet<User> set = new HashSet<>();
        set.add(new User("철수"));
        set.add(new User("철수")); // 중복으로 취급됨
        System.out.println(set.size()); // 1
    }
}
```

**`toString()` 예제**
```java
// 예제 1
class Product {
    String name;
    int price;
    Product(String n, int p) { name=n; price=p; }

    @Override
    public String toString() {
        return name + " (" + price + "원)";
    }
}

public class Main {
    public static void main(String[] args) {
        Product p = new Product("노트북", 1500000);
        System.out.println(p); // 노트북 (1500000원)
    }
}
```
```java
// 예제 2
class Student {
    String name; int grade;
    Student(String n, int g) { name=n; grade=g; }

    @Override
    public String toString() {
        return "학생[" + name + ", " + grade + "학년]";
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("영희", 2);
        System.out.println(s); // 학생[영희, 2학년]
    }
}
```

#### String 클래스
불변(Immutable) 객체입니다. 문자열 조작 시 항상 새로운 문자열을 생성합니다.

**대표 메서드**
- `int length()`: 문자열 길이
- `char charAt(int index)`: 특정 인덱스 문자 반환
- `int indexOf(String s)`: 특정 문자/문자열 위치 반환
- `String replace(String a, String b)`: 문자열 치환
- `String substring(int begin)`: 부분 문자열 (끝까지)
- `String substring(int begin, int end)`: 부분 문자열

**예제**
```java
public class Main {
    public static void main(String[] args) {
        String str = "Java Programming";

        System.out.println(str.length());        // 16
        System.out.println(str.charAt(5));       // P
        System.out.println(str.indexOf("gram")); // 8
        System.out.println(str.replace("Java", "Python")); // Python Programming
        System.out.println(str.substring(5));    // Programming
        System.out.println(str.substring(0, 4)); // Java
    }
}
```

#### StringBuffer / StringBuilder
가변(Mutable) 문자열 클래스입니다.
- `StringBuffer`: 동기화 지원 (멀티스레드 안전)
- `StringBuilder`: 동기화 미지원 (단일 스레드 성능 ↑)

**주요 메서드**
- `append()`: 문자열 뒤에 추가
- `insert()`: 특정 위치에 삽입
- `delete()`: 특정 범위 문자 삭제
- `reverse()`: 문자열 뒤집기

**예제**
```java
public class Main {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" World");
        System.out.println(sb); // Hello World

        sb.insert(5, " Java");
        System.out.println(sb); // Hello Java World

        sb.delete(5, 10);
        System.out.println(sb); // Hello World

        sb.reverse();
        System.out.println(sb); // dlroW olleH
    }
}
```

#### Math 클래스
모든 메서드가 `static`으로 제공되는 수학 관련 클래스입니다.

**대표 메서드**
- `abs()`: 절댓값
- `ceil()`: 올림
- `floor()`: 내림
- `round()`: 반올림
- `max()`, `min()`: 최댓값, 최솟값
- `random()`: 0.0 이상 1.0 미만 난수

**예제**
```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Math.abs(-7));     // 7
        System.out.println(Math.ceil(7.3));   // 8.0
        System.out.println(Math.floor(7.9));  // 7.0
        System.out.println(Math.round(7.5));  // 8
        System.out.println(Math.max(3, 9));   // 9
        System.out.println(Math.random());    // 0.0 <= x < 1.0
    }
}
```

#### Wrapper 클래스
기본형(primitive type)을 객체로 감싸는 클래스입니다. (Auto Boxing / Unboxing 지원)

| 기본형 | Wrapper 클래스 |
| :--- | :--- |
| byte | Byte |
| short | Short |
| int | Integer |
| long | Long |
| float | Float |
| double | Double |
| char | Character |
| boolean | Boolean |

**예제**
```java
public class Main {
    public static void main(String[] args) {
        // Auto Boxing
        Integer num = 10; // int → Integer 자동 변환

        // Auto Unboxing
        int n = num; // Integer → int 자동 변환

        System.out.println(num + 5); // 15
    }
}
```

### java.util 패키지
프로그램 개발에 유용한 유틸리티 클래스들을 포함합니다. (컬렉션, 날짜, 랜덤 등)

#### Calendar 클래스
-	추상 클래스이므로 `getInstance()` 메서드로 인스턴스를 얻습니다.

**대표 상수**

| 상수 | 설명 |
| :--- | :--- |
| YEAR | 년 |
| MONTH | 월 (0부터 시작하므로 +1 필요) |
| DATE / DAY_OF_MONTH | 일 |
| DAY_OF_WEEK | 요일 (일요일=1, 토요일=7) |
| HOUR, MINUTE, SECOND | 시, 분, 초 |
| HOUR_OF_DAY | 24시간 형식 시 |

**예제 1: 현재 날짜 출력**
```java
import java.util.Calendar;
public class Main {
    public static void main(String[] args) {
        Calendar now = Calendar.getInstance();
        System.out.println(now.get(Calendar.YEAR) + "년");
        System.out.println((now.get(Calendar.MONTH)+1) + "월");
        System.out.println(now.get(Calendar.DATE) + "일");
    }
}
```

**예제 2: 요일 확인**
```java
import java.util.Calendar;

public class Main {
    public static void main(String[] args) {
        Calendar now = Calendar.getInstance();
        int day = now.get(Calendar.DAY_OF_WEEK);
        String[] week = {"일","월","화","수","목","금","토"};
        System.out.println("오늘은 " + week[day-1] + "요일");
    }
}
```

**예제 3: 특정 날짜 설정**
```java
import java.util.Calendar;

public class Main {
    public static void main(String[] args) {
        Calendar birth = Calendar.getInstance();
        birth.set(1995, Calendar.MAY, 10);
        System.out.println("생일: " + birth.getTime());
    }
}
```