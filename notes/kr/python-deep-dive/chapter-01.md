---
layout: article
title: 1. 파일 입출력
permalink: /notes/kr/python-deep-dive/chapter-01
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 심화 과정 강의 노트, 파일 입출력 개념과 활용 방법을 다룹니다.
keywords: "Python, 파일 입출력, 심화 과정, 데이터 처리, 프로그래밍"
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

>파이썬은 여러 분야에서 쓰입니다. 특히 <span class="blue-bold">데이터 분석에 강합니다.</span>
>왜냐하면 파이썬에는 <span class="blue-bold">데이터를 다루기 좋은 도구(라이브러리와 함수)가 이미 준비</span>되어 있고, 문법도 자연스러운 문장처럼 읽히기 때문입니다. 또한 <span class="blue-bold">파일 입출력도 쉽게 할 수 있습니다.</span>
>
>  * <strong>입력(Input) = 파일에서 데이터를 읽어오기</strong>
>  * <strong>출력(Output) = 파일에 데이터를 저장하기</strong>    
>
><span class="red-bold">즉, 프로그램이 “노트”처럼 파일을 열고 → 내용을 읽거나 → 새로운 내용을 쓰는 과정입니다.</span>
>

<figure>
<img src="/notes/assets/python-deep-dive/chapter-01-01.png" width="50%;" alt="Python 파일 입출력" />
</figure>

## 1. 파일 열기
파일에 내용을 저장하거나 불러오기 위해서는 먼저 <strong>파일을 열어야 합니다.</strong>    
파이썬에서는 `open(파일명, 모드)` 함수를 사용하여 파일을 엽니다.

<a href="/notes/assets/python-deep-dive/chapter01.zip" download>예제 파일 다운로드</a>

``` python
# memo.txt를 읽기 모드로 열겠다는 코드입니다.
file = open("memo.txt", "r")
```

<table>
  <colgroup>
    <col width="25%" />
    <col width="25%" />
    <col width="50%" />
  </colgroup>
  <tr align="center" style="background-color: #ddd;">
    <th>모드</th>
    <th>기능</th>
    <th>설명</th>
  </tr>
  <tr>
    <td>r</td>
    <td>읽기(read) 모드</td>
    <td>파일을 읽기 모드로 엽니다.</td>
  </tr>
  <tr>
    <td>w</td>
    <td>쓰기(write) 모드</td>
    <td>파일을 쓰기 모드로 엽니다. <span class="red-bold">기존 파일 내용은 덮여쓰여집니다.</span></td>
  </tr>
  <tr>
    <td>r</td>
    <td>추가(append) 모드</td>
    <td>파일을 추가 모드로 엽니다. <span class="red-bold">기존 파일 내용을 유지한 채 내용을 추가합니다.</span></td>
  </tr>
</table>

### 파일을 열 때 발생할 수 있는 오류
  * <span class="red-bold">FileNotFoundError</span>: 지정한 경로에 파일이 없을 때 발생 (`open('없는파일.txt', 'r')`)
  * <span class="red-bold">PermissionError</span>: 읽기 전용 파일이거나 권한이 없는 위치에 쓰려고 할 때 발생 (`open('C:/Windows/system.ini', 'w')`)
  * <span class="red-bold">IsADirectoryError</span>: 파일이 아니라 폴더 경로를 열려고 할 때 발생 (`open('C:/Users', 'w')`)
  * <span class="red-bold">ValueError: invalid mode</span>: 모드 문자열이 잘못되었을 때 발생 (`open('test.txt', 'wr')`)

## 2. 파일 읽기
파이썬에서 **읽기 모드(`r`)**로 파일을 열면, 그 안의 내용을 읽어올 수 있는 메서드들이 있습니다.

1. `파일객체.read()`: 파일 전체 내용을 한 번에 읽음
2. `파일객체.readline()`: 파일에서 한 줄만 읽음
3. `파일객체.readlines()`: 파일 전체를 읽어서 리스트(줄 단위)로 반위

```python
f = open('memo1.txt', 'r')
all = f.read()
print('read():')
print(all)

f = open('memo1.txt', 'r')
line = f.readline()
print('readline():')
print(line)

f = open('memo1.txt', 'r')
lines = f.readlines()
print('readlines():')
print(lines)
```

```python
# 파일을 자동으로 닫아주는 문법
with open('memo1.txt', 'r') as f:
  all = f.read()
  print('read():')
  print(all)
```

### 문제 1
> `memo1.txt` 파일에는 여러 줄의 문장이 저장되어 있습니다.  
> 이 파일을 한 줄씩 읽어서 화면에 출력하세요.
>
> **조건 및 힌트**
> 1. `readline()` 메서드를 사용하세요.  
> 2. 더 이상 읽을 줄이 없으면 `""`(빈 문자열)이 반환됩니다.  

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <strong>방법 1 — `readline()` 사용</strong>
  <pre><code class="language-python">
  with open('memo1.txt', 'r') as f:
    line = f.readline()
    while line:
      print(line.strip())
      line = f.readline()
  </code></pre>

  <strong>방법 2 — for 사용</strong>
  <pre><code class="language-python">
  with open ('memo1.txt', 'r') as f:
    for line in f:
      print(line)
  </code></pre>
</details>

## 3. 파일 쓰기
파일에 새로운 내용을 기록하려면 **쓰기 모드(`w`)** 또는 **추가 모드(`a`)**로 열어야 합니다.  

- `w` 모드: 기존 내용을 **모두 지우고** 새로 작성  
- `a` 모드: 기존 내용을 **유지한 채** 뒤에 이어서 작성  

```python
# w 모드 예시 — 기존 내용을 덮어쓰기
with open("memo.txt", "w", encoding="utf-8") as f:
    f.write("첫 번째 줄\n")
    f.write("두 번째 줄\n")

# a 모드 예시 — 기존 파일에 내용 추가
with open("memo.txt", "a", encoding="utf-8") as f:
    f.write("세 번째 줄 (추가)\n")
```

## 4. 파일 닫기
파일 작업이 끝나면 반드시 **파일을 닫아야 합니다.**  
파일을 닫지 않으면 다음과 같은 문제가 생길 수 있습니다.

- 메모리와 같은 시스템 자원이 불필요하게 점유됩니다.  
- 파일이 다른 프로그램에서 사용되지 못할 수 있습니다.  
- 데이터가 완전히 저장되지 않아 손상될 위험이 있습니다.  

```python
# 파일을 열었지만 닫지 않은 경우
f = open("memo.txt", "w", encoding="utf-8")
f.write("파일 닫기 실습 중입니다.")
# f.close()가 없다면, 내용이 저장되지 않을 수도 있음
```

### 안전한 방법: with 구문
파이썬에서는 with 구문을 사용하면 블록이 끝날 때 자동으로 close()가 실행됩니다.

```python
with open("memo.txt", "w", encoding="utf-8") as f:
    f.write("이 문장은 자동으로 저장되고 파일은 닫힙니다.")
```

### 문제 2
> `hello.txt` 파일에는 여러 줄의 문장이 저장되어 있습니다.   
> 이 중에서 “Python”이라는 단어가 들어 있는 줄만 출력하세요.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-python">
  with open("memo.txt", "r", encoding="utf-8") as f:
    for line in f:
        if "Python" in line:
            print(line.strip())
  </code></pre>
</details>

### 문제 3
> `scores.txt` 파일의 내용은 다음과 같습니다.   
> 필릭스,83   
> 연준,60   
> ...   
> 파일을 읽어와서 각 학생의 점수를 출력하고, 총점과 평균 점수를 계산하여 마지막에 출력하세요.
>
> **힌트**
> `line.split(",")`로 이름과 점수를 분리하고, `int()`로 점수를 정수로 바꿉니다.

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-python">
  총점 = 0
  학생수 = 0

  with open("scores.txt", "r", encoding="utf-8") as f:
      for line in f:
          이름, 점수 = line.strip().split(",")
          점수 = int(점수)
          print(f"{이름} 학생 점수: {점수}")
          총점 += 점수
          학생수 += 1

  평균 = 총점 / 학생수
  print("총점:", 총점)
  print("평균:", 평균)
  </code></pre>
</details>