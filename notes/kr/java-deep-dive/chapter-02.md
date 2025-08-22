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

### 문제 2 - 파일 로드·검증·부분 성공 처리 (중급)
> scores.csv를 읽어 이름,점수 형식만 수용하라. 한 줄이라도 형식 오류면 해당 줄만 건너뛰고 계속 처리하되, 처리 종료 후 오류 요약을 출력하라.   
> [예제 파일 다운로드](/notes/assets/java-deep-dive/scores.csv)
>
> **조건 및 힌트**
> 1. try-with-resources로 파일 열기. 
> 2. 정상 레코드만 합계와 평균 계산. 
> 3. 형식 오류는 InvalidLineException(사용자 정의, unchecked)로 캡슐화하여 수집.
> 4. 마지막에 “총 N줄 중 K줄 실패. 실패 라인 번호: …” 요약.
> 5. 파일 미존재는 친절한 메시지 출력.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
    import java.io.*;
    import java.nio.file.*;
    import java.util.*;

    class InvalidLineException extends RuntimeException {
        final int lineNo; final String raw;
        InvalidLineException(int lineNo, String raw, String msg) {
            super(msg); this.lineNo = lineNo; this.raw = raw;
        }
    }

    public class Main {
        public static void main(String[] args) {
            Path path = Paths.get("scores.csv");
            int total = 0, count = 0, lineNo = 0;
            List<InvalidLineException> errors = new ArrayList<>();

            try (BufferedReader br = Files.newBufferedReader(path)) {
                String line;
                while ((line = br.readLine()) != null) {
                    lineNo++;
                    try {
                        String[] parts = line.split(",");
                        if (parts.length != 2) throw new InvalidLineException(lineNo, line, "필드 수 오류");
                        String name = parts[0].trim();
                        int score = Integer.parseInt(parts[1].trim());
                        System.out.println(name + ": " + score);
                        total += score; count++;
                    } catch (NumberFormatException e) {
                        errors.add(new InvalidLineException(lineNo, line, "숫자 변환 실패"));
                    } catch (InvalidLineException e) {
                        errors.add(e);
                    }
                }
            } catch (NoSuchFileException e) {
                System.out.println("파일을 찾을 수 없습니다: " + path.toAbsolutePath());
                return;
            } catch (IOException e) {
                System.out.println("입출력 오류: " + e.getMessage());
                return;
            }

            if (count > 0) {
                System.out.println("총점=" + total + ", 평균=" + (total / (double)count));
            }
            if (!errors.isEmpty()) {
                System.out.print("총 " + (count + errors.size()) + "줄 중 " + errors.size() + "줄 실패. 실패 라인: ");
                System.out.println(errors.stream().map(ex -> String.valueOf(ex.lineNo)).reduce((a,b)->a+", "+b).orElse(""));
            }
        }
    }
  </code></pre>
</details>