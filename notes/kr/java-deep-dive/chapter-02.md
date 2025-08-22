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

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Java%20Exception&reversal=false&textBg=false)

## 1. 에러와 예외
자바 프로그램을 실행하다 보면 갑자기 종료되거나, 예기치 못한 오류 메시지가 발생하기도 합니다.  

- **에러(Error)**: 개발자가 제어할 수 없는 시스템 오류 → 프로그램 종료  
- **예외(Exception)**: 프로그램 실행 중 발생하는 오류 → 개발자가 처리 가능  

자바는 이들을 <span class="blue-bold">클래스</span>로 관리합니다. 문제가 발생하면 해당 예외 클래스의 객체가 생성되어 전달됩니다.


## 2. 에러
시스템에 비정상적인 상황이 생겼을 때 발생합니다.  
개발자가 **예측하거나 처리할 수 없음**. 치명적일 수 있습니다.

### 대표적인 에러 예시
- <span class="red-bold">OutOfMemoryError</span> : 메모리 부족  
- <span class="red-bold">IOError</span> : 입출력 처리 불가  
- <span class="red-bold">StackOverFlowError</span> : 무한 재귀 호출 등으로 스택 메모리 초과  

## 3. 예외
예외란 <span class="blue-bold">프로그램 실행 중</span> 발생하는 문제입니다.  
문법적으로는 문제가 없지만 운영 시 발생합니다.

|   구분    |              체크 예외(Checked)              | 비체크 예외(Unchecked)  |
|-----------|----------------------------------------------|-------------------------|
| 처리 여부 | <span class="yellow-bold">반드시 처리</span> |     처리 강제 아님      |
| 확인 시점 |                 컴파일 단계                  |        실행 단계        |
| 대표 예외 |          IOException, SQLException           | NullPointerException, ArithmeticException |

### 예외 클래스 구조
<figure>
<img src="/notes/assets/java-deep-dive/exception-hierarchy.png" width="70%" alt="예외 클래스 구조"/>
<figcaption>https://www.geeksforgeeks.org/java/exceptions-in-java/</figcaption>
</figure>

- 최상위: <span class="blue-bold">Throwable</span>  
- 하위: Error, Exception  
- Exception → Checked / Unchecked 로 나뉨  

### 주요 실행 예외 (Unchecked)

#### 1) NullPointerException
객체가 생성되지 않은 상태에서 접근할 때 발생  
```java
public class Main {
    public static void main(String[] args) {
        String str = null;
        System.out.println(str.length()); // NullPointerException
    }
}

#### 2) NumberFormatException
잘못된 문자열을 숫자로 변환할 때 발생
```java
public class Main {
    public static void main(String[] args) {
        String data = "12a";
        int num = Integer.parseInt(data); // NumberFormatException
    }
}
```

#### 3) ArrayIndexOutOfBoundsException
배열 인덱스를 초과할 때 발생
```java
public class Main {
    public static void main(String[] args) {
        int[] arr = {1,2,3};
        System.out.println(arr[3]); // ArrayIndexOutOfBoundsException
    }
}
```

## 4. 예외 처리 문법
### 예외 처리 과정
1.	코드 실행 중 예외 발생 → JVM에 알림
2.	JVM은 예외 분석 후 해당 예외 클래스 객체 생성
3.	생성된 예외를 발생한 지점으로 전달
4.	처리하지 않으면 프로그램 비정상 종료

### try - catch 구문
```java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("0으로 나눌 수 없습니다.");
} catch (Exception e) {
    System.out.println("기타 예외 처리");
}
// Exception을 모든 catch문 위에 두면 안됨!
```

### finally
예외 발생 여부와 상관없이 반드시 실행되는 블록.   
파일 닫기, DB 연결 종료, 외부 자원 해제 등에 사용.
```java
try {
    System.out.println("작업 실행");
} catch (Exception e) {
    System.out.println("예외 처리");
} finally {
    System.out.println("자원 해제");
}
```

## 5. 예외 던지기
메서드 내부에서 직접 처리하지 않고 호출한 곳으로 책임을 미룸.

```java
public void readFile(String path) throws IOException {
    FileReader fr = new FileReader(path);
}
```

### 예외 발생시키키
개발자가 의도적으로 예외를 발생시킬 수도 있습니다.
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
자바 기본 제공 예외 외에도 직접 예외 클래스를 만들 수 있습니다.   
실제 서비스에서는 도메인 로직에 맞는 예외를 정의합니다.

#### 사례 예시
1.	은행 시스템 – 출금 금액이 잔액보다 큰 경우 InsufficientBalanceException
2.	쇼핑몰 시스템 – 재고 부족 시 OutOfStockException
3.	예약 시스템 – 예약 불가 시간대에 요청 시 InvalidBookingException

#### 체크 예외
```java
public class InsufficientBalanceException extends Exception {
    public InsufficientBalanceException(String msg) {
        super(msg);
    }
}
```

#### 비체크 예외
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

  <pre><code class="language-python">
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

  <pre><code class="language-python">
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