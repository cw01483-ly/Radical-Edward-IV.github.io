---
layout: article
title: 4. 자바 기본 API 클래스 활용법
permalink: /notes/kr/java-deep-dive/chapter-04
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

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Java%20DeepDive&reversal=false&textBg=false)

## 1. 기본 API 클래스
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