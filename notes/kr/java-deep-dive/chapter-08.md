---
layout: article
title: 8. 파일 입출력
permalink: /notes/kr/java-deep-dive/chapter-08
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Java 심화 과정 강의 노트, 파일 입출력 개념과 활용 방법을 다룹니다.
keywords: "Java, 파일 입출력, 심화 과정, 데이터 처리, 프로그래밍"
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

프로그램은 우체국처럼 데이터를 주고받습니다.   
외부에서 데이터를 받는 것이 **입력(Input)**, 내보내는 것이 **출력(Output)**입니다.   
이 둘을 합쳐 **입출력(I/O)**이라고 하며, 자바는 이를 쉽게 처리할 수 있는 다양한 도구를 제공합니다.   
특히 파일 입출력은 디스크의 파일과 데이터를 주고받는 작업으로, 자바에서는 '스트림(Stream)'을 통해 데이터를 읽고 씁니다.

### 입출력 스트림의 특징
자바의 **입출력 스트림(Stream)**은 <span class="blue-text">파이프</span>처럼 프로그램과 외부(파일, 네트워크 등)를 연결하는 <span class="blue-text">단방향 통로</span>입니다.

- <span class="blue-text">입력 스트림(InputStream)</span>: 외부 데이터를 프로그램 안으로 들여옴  
- <span class="blue-text">출력 스트림(OutputStream)</span>: 프로그램 데이터를 외부로 내보냄

> 스트림은 <span class="blue-text">우체통</span>과 <span class="blue-text">우편함</span>처럼, 편지를 넣는 쪽(출력)과 꺼내는 쪽(입력)이 <span class="red-text">완전히 분리</span>되어 있습니다.  
> 데이터를 읽으려면 입력 스트림, 쓰려면 출력 스트림을 <span class="red-text">각각 따로</span> 사용해야 합니다.

스트림은 <span class="yellow-code">FIFO</span> 방식으로 한 방향으로만 연속적으로 데이터가 흐르며, 파일·네트워크 등 다양한 입출력 대상을 <span class="green-text">동일한 방식</span>으로 처리할 수 있습니다.

<figure>
    <img src="/notes/assets/java-deep-dive/chapter-08-01.png" alt="입출력 스트림 예시">
    <figcaption>입출력 스트림 예시</figcaption>
</figure>

## 1. 입출력 스트림의 종류
자바의 기본적인 데이터 입출력은 <span class="yellow-code">java.io</span> 패키지에서 제공합니다.  
이 패키지에는 데이터를 읽고 쓰기 위한 다양한 <span class="blue-text">스트림(Stream)</span> 클래스가 준비되어 있습니다.

스트림의 종류는 <span class="blue-text">전달 방식</span>에 따라 크게 두 가지로 나눌 수 있습니다.  
마치 택배를 <span class="red-text">상자(바이트 단위)</span>로 보내거나, <span class="green-text">편지(문자 단위)</span>로 보내는 것과 비슷합니다.

<figure>
    <img src="/notes/assets/java-deep-dive/chapter-08-02.png" alt="입출력 스트림 예시">
    <figcaption>입출력 스트림 예시</figcaption>
</figure>

| 구분 | 설명 | 주요 클래스 예시 | 특징 및 용도 |
|------|------|------------------|--------------|
| <span class="blue-text">바이트 기반 스트림</span> | <span class="yellow-code">Byte</span> 단위로 파일을 읽고 출력 | <code>InputStream</code>, <code>OutputStream</code>, <code>FileInputStream</code>, <code>FileOutputStream</code> | 모든 타입의 데이터(이미지, 동영상, 텍스트 등) 처리 가능 |
| <span class="green-text">문자 기반 스트림</span>  | <span class="yellow-code">문자</span> 단위로 파일을 읽고 출력 | <code>Reader</code>, <code>Writer</code>, <code>FileReader</code>, <code>FileWriter</code> | 문자 데이터(텍스트 파일 등)만 처리 가능                |

> 바이트 스트림은 <span class="red-text">택배 상자</span>처럼 무엇이든 담아 보낼 수 있고,  
> 문자 스트림은 <span class="green-text">편지 봉투</span>처럼 오직 글자(문자)만 담아 보낼 수 있습니다.

## 2. 바이트 기반 스트림
### 2.1 InputStream의 주요 메서드
<figure>
    <img src="/notes/assets/java-deep-dive/chapter-08-03.png" alt="바이트 기반 스트림 예시">
    <figcaption>바이트 기반 스트림 예시</figcaption>
</figure>

| 메서드 | 설명 |
|--------|------|
| int read() | 1바이트씩 데이터를 읽어 반환.<br>더 이상 읽을 데이터가 없으면 -1 반환 |
| int read(byte[] b) | 주어진 바이트 배열에 데이터를 읽어 저장.<br>읽을 데이터가 없으면 -1 반환 |
| int read(byte[] b, int offset, int len) | 주어진 배열의 offset 위치부터 len 길이만큼 데이터를 읽어 저장 |
| int available() | 스트림에서 읽을 수 있는 남은 바이트 수 반환 |
| void close() | 스트림을 닫고 자원을 해제함 |

#### FileInputStream
<span class="blue-text">FileInputStream</span>은 파일에서 <span class="yellow-code">바이트 단위</span>로 자료를 읽어 들일 때 사용하는 스트림입니다.<br>   
즉, 텍스트 파일뿐만 아니라 이미지, 동영상 등 모든 파일을 바이트로 읽을 수 있습니다.   
파일을 읽으려면 아래와 같이 <code>new FileInputStream("경로/파일명")</code> 형태로 객체를 생성합니다.

**read() 메서드 사용 예시**
```java
InputStrea in = new FileInputStream("example.txt");
int data = in.read();
while (data != -1) {
    System.out.print((char) data);
    data = in.read();
}
in.close();
```

**read(byte[] b) 메서드 사용 예시**
```java
InputStream in = new FileInputStream("example.txt");
byte[] buffer = new byte[1024];
int bytesRead = in.read(buffer);
while (bytesRead != -1) {
    System.out.print(new String(buffer, 0, bytesRead));
    bytesRead = in.read(buffer);
}
in.close();
```

> 💡 **plus**  
> 바이트 기반 입력 스트림에서 <code>read()</code> 메서드로 한 바이트씩 읽어서 바로 <code>(char)</code>로 출력하면 한글 등 멀티바이트 문자가 <span class="red-text">깨질 수 있습니다</span>.  
> 그 이유는 <span class="blue-text">한글은 UTF-8에서 3바이트</span>로 표현되기 때문입니다.  
> <code>read()</code>는 1바이트씩 읽으므로, 한글 한 글자를 완전히 읽지 못하고 중간에 잘라서 출력하게 되어 <span class="red-text">문자 인코딩 오류</span>가 발생합니다.  
>  
> 따라서 <span class="green-text">여러 바이트를 한 번에 읽는 <code>read(byte[] buffer)</code> 방식</span>을 사용하고,  
> <code>new String(buffer, 0, bytesRead)</code>처럼 <span class="blue-text">문자열로 변환</span>해야 한글이 올바르게 출력됩니다.

### 2.2 OutputStream
<figure>
    <img src="/notes/assets/java-deep-dive/chapter-08-04.png" alt="바이트 기반 스트림 예시">
    <figcaption>바이트 기반 스트림 예시</figcaption>
</figure>

| 메서드 | 설명 |
|--------|------|
| void write(int b) | 1byte 씩 데이터를 출력 |
| void write(byte[] b) | 매개변수로 주어진 배열의 모든 바이트 출력 |
| void write(byte[] b, int offset, int len) | 매개변수로 주어진 배열에 정해진 범위만큼 읽어서 출력<br>시작 위치(offset), 길이(len) |
| void flush() | 출력 버퍼에 잔류하는 모든 내용 출력 |
| void close() | 스트림을 닫고 자원을 해제함 |

#### FileOutputStream
<span class="blue-text">FileOutputStream</span>은 파일에 <span class="yellow-code">바이트 단위</span>로 자료를 출력할 때 사용하는 스트림입니다.<br>
즉, 텍스트 파일뿐만 아니라 이미지, 동영상 등 모든 파일을 바이트로 출력할 수 있습니다.

파일을 출력하려면 아래와 같이 <code>new FileOutputStream("경로/파일명", 이어쓰기 옵션)</code> 형태로 객체를 생성합니다.

**write(int b) 메서드 사용 예시**
```java
OutputStream out = new FileOutputStream("example.txt", false);
out.write('H');
out.write('E');
out.write('L');
out.write('L');
out.write('O');
out.write('!');
out.close();
```

**write(byte[] b) 메서드 사용 예시**
```java
OutputStream out = new FileOutputStream("example.txt", false);
byte[] data = "Hello, World!".getBytes();
out.write(data);
out.close();
```

### 문제 1 - 파일 읽기/쓰기 기본 (기초)
> 아래 코드의 주석을 참고하여, 파일에 문자열을 저장하고 다시 읽어오는 코드를 완성하세요.

```java
public class FileBasicDemo {
    public static void main(String[] args) {
        try {
            // TODO: "Hello, Java!" 문자열을 "output.txt" 파일에 저장
            
            // TODO: "output.txt" 파일에서 내용을 읽어와서 출력
            
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // TODO: 스트림 닫기
        }
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class FileBasicDemo {
      public static void main(String[] args) {
          try {
              // "Hello, Java!" 문자열을 "output.txt" 파일에 저장
              FileWriter writer = new FileWriter("output.txt");
              writer.write("Hello, Java!");
              
              // "output.txt" 파일에서 내용을 읽어와서 출력
              FileReader reader = new FileReader("output.txt");
              int ch;
              while ((ch = reader.read()) != -1) {
                  System.out.print((char) ch);
              }
              
          } catch (IOException e) {
              e.printStackTrace();
          } finally {
              // TODO: 스트림 닫기
              if (writer != null) writer.close();
              if (reader != null) reader.close();
          }
      }
  }
  </code></pre>
</details>

### 문제 2 - 파일 복사 프로그램 (중급)
> 원본 파일을 복사본으로 만드는 프로그램을 작성하세요. 버퍼를 사용하여 효율적으로 처리하세요.

```java
public class FileCopyDemo {
    public static void main(String[] args) {
        String sourceFile = "source.txt";
        String targetFile = "copy.txt";
        
        try {
            // TODO: FileInputStream과 FileOutputStream 생성
            
            // TODO: 1024바이트 버퍼를 사용하여 파일 복사
            
            // TODO: 스트림 닫기

            System.out.println("파일 복사 완료!");
        } catch (IOException e) {
            System.out.println("파일 복사 중 오류 발생: " + e.getMessage());
        } finally {
            // TODO: 스트림 닫기
        }
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class FileCopyDemo {
      public static void main(String[] args) {
          String sourceFile = "source.txt";
          String targetFile = "copy.txt";
          
          try {
              // FileInputStream과 FileOutputStream 생성
              FileInputStream fis = new FileInputStream(sourceFile);
              FileOutputStream fos = new FileOutputStream(targetFile);

              // 1024바이트 버퍼를 사용하여 파일 복사
              byte[] buffer = new byte[1024];
              int bytesRead;
              while ((bytesRead = fis.read(buffer)) != -1) {
                  fos.write(buffer, 0, bytesRead);
              }
              
              System.out.println("파일 복사 완료!");
          } catch (IOException e) {
              System.out.println("파일 복사 중 오류 발생: " + e.getMessage());
          } finally {
              // TODO: 스트림 닫기
              if (fis != null) fis.close();
              if (fos != null) fos.close();
          }
      }
  }
  </code></pre>
</details>
