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

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Python%20DeepDive&reversal=false&textBg=false)

> 파이썬은 데이터를 다루는 데 아주 강력한 도구예요.   
> 우리는 지금까지 터미널을 통해서 값을 입력 받거나 출력 하는 방식을 사용했어요.
> 데이터를 다루려면 '파일'에서 정보를 가져오거나(<span class="blue-text">입력</span>), 파일에 새로운 정보를 저장하는(<span class="blue-text">출력</span>) 방법을 알아야 합니다.
>
> * **입력(Input)**: 파일에서 데이터를 프로그램으로 읽어오기
> * **출력(Output)**: 프로그램의 데이터를 파일에 저장하기
>
> <span class="blue-text">프로그램이 노트를 펴서 내용을 읽거나, 새로운 내용을 쓰는 과정</span>이라고 생각하면 쉬워요!

## 1. 파일 열고 닫기: `open()` 과 `with`

파일을 읽거나 쓰려면, 가장 먼저 <span class="blue-text">파일을 열어야</span> 합니다.   
파이썬에서는 <code class="yellow-code">open()</code> 함수를 사용해요.

<code class="yellow-code">open("파일이름", "모드")</code>

'모드'는 파일을 어떤 목적으로 열지 알려주는 신호와 같아요.

| 모드 | 기능 | 설명 |
| :--: | :--- | :--- |
| <span class="blue-text">r</span> | 읽기 (read) | 파일의 내용을 읽기만 할 때 사용해요. |
| <span class="blue-text">w</span> | 쓰기 (write) | 파일에 내용을 쓸 때 사용해요. <br /><span class="red-text">기존 내용은 모두 사라지고 새로 써져요.</span> |
| <span class="blue-text">a</span> | 추가 (append) | 파일의 맨 끝에 새로운 내용을 추가해요. <br /><span class="green-text">기존 내용이 안전하게 유지돼요.</span> |

#### 💡 가장 안전하고 편한 방법: `with`

파일 작업이 끝나면 반드시 `close()`로 닫아줘야 해요. 하지만 깜빡하기 쉽죠.  
<span class="blue-text">`with` 구문을 사용하면 작업이 끝났을 때 파이썬이 알아서 파일을 닫아줘서 아주 편리하고 안전</span>하답니다.   
되도록이록 항상 `with`를 사용하세요!

```python
# 'with' 블록이 끝나면 memo.txt 파일은 자동으로 닫힙니다.
with open("memo.txt", "w") as file:
    file.write("with 구문을 사용하면 정말 편해요!")
```
<details>
  <summary>파일을 열 때 흔히 만나는 오류들</summary>
  <ul>
    <li><span class="red-text">FileNotFoundError</span>: 파일이 존재하지 않을 때 발생해요.</li>
    <li><span class="red-text">PermissionError</span>: 파일에 접근할 권한이 없을 때 발생해요.</li>
    <li><span class="red-text">IsADirectoryError</span>: 파일이 아니라 폴더(디렉토리)를 열려고 할 때 발생해요.</li>
  </ul>
</details>

## 2. 파일 내용 읽기
파일을 <span class="blue-text">'r' 모드</span>로 열면 내용을 읽을 수 있어요.

* <code class="yellow-code">read()</code>: 파일 전체 내용을 하나의 문자열로 통째로 읽어와요.
* <code class="yellow-code">readlines()</code>: 파일의 모든 줄을 각각의 문자열로 만들어 리스트에 담아줘요.
* <code class="yellow-code">readline()</code>: 파일에서 딱 한 줄만 읽어와요.

```python
# memo.txt 파일에 아래 내용이 저장되어 있다고 상상해보세요!
# 첫 번째 줄입니다.
# 두 번째 줄입니다.

with open('memo.txt', 'r') as f:
    # 1. read()로 전체 읽기
    content = f.read()
    print("--- read() 결과 ---")
    print(content)

with open('memo.txt', 'r') as f:
    # 2. readlines()로 한 줄씩 리스트에 담아 읽기
    lines = f.readlines()
    print("--- readlines() 결과 ---")
    print(lines) 
    # 결과: ['첫 번째 줄입니다.\n', '두 번째 줄입니다.']
```

## 3. 파일에 내용 쓰기
파일에 글자를 쓰려면 <span class="blue-text">'w' 모드</span>나 <span class="blue-text">'a' 모드</span>로 열어야 해요.

* <code class="yellow-code">w</code> 모드 (덮어쓰기): <span class="red-text">파일의 모든 내용을 지우고</span> 처음부터 새로 써요.
* <code class="yellow-code">a</code> 모드 (이어쓰기): <span class="green-text">기존 내용 맨 끝에</span> 새로운 내용을 추가해요.

```python
# "w" 모드: 기존 내용을 모두 지우고 새로 쓰기
with open("memo.txt", "w") as f:
    f.write("이 내용만 남을 거예요.\n")

# "a" 모드: 기존 내용에 이어서 추가하기
with open("memo.txt", "a") as f:
    f.write("이 내용은 뒤에 추가돼요.\n")
```

## 4. 사용자에게 직접 입력받기: `input()`
파일뿐만 아니라 사용자에게 직접 키보드로 입력을 받을 수도 있어요. 이때는 <code class="yellow-code">input()</code> 함수를 사용해요.

<code class="yellow-code">input()</code>으로 받은 값은 <span class="red-text">항상 문자열(string) 타입</span>이에요.

만약 숫자로 사용하고 싶다면 <code class="yellow-code">int()</code>를 이용해 숫자로 변환해줘야 합니다.

```python
name = input("이름을 입력하세요: ")
print(f"안녕하세요, {name}님!")

# input()은 문자열을 반환하므로, 숫자로 바꿔줘야(형 변환) 계산이 가능해요.
age_str = input("나이를 입력하세요: ")
age_int = int(age_str) 
print(f"내년에는 {age_int + 1}살이 되시는군요!")
```

## 5. 종합 연습문제
<a href="/notes/assets/python-deep-dive/chapter01.zip" download>예제 파일 다운로드</a>

### 문제 1
> memo1.txt 파일을 한 줄씩 읽어서 화면에 출력하세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <p>파일 객체는 for문과 함께 사용하면 한 줄씩 자동으로 읽어올 수 있어 매우 편리합니다.</p>
  <pre><code class="language-python">
    with open('memo1.txt', 'r') as f:
      for line in f:
        print(line.strip()) # .strip()은 줄 끝의 불필요한 공백이나 줄바꿈 문자를 제거합니다.
  </code></pre>
</details>

### 문제 2
> hello.txt 파일에서 "Python"이라는 단어가 포함된 줄만 찾아서 출력하세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    with open("hello.txt", "r") as f:
      for line in f:
        if "Python" in line:
          print(line.strip())
  </code></pre>
</details>

### 문제 3
scores.txt 파일에는 이름,점수 형식으로 데이터가 저장되어 있습니다. 각 학생의 점수를 출력하고, 총점과 평균 점수를 계산하여 마지막에 출력하세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    total_score = 0
    student_count = 0

    with open("scores.txt", "r") as f:
      for line in f:
        name, score_str = line.strip().split(",")
        score = int(score_str) # 쉼표로 분리한 점수(문자열)를 숫자로 변환

    print(f"{name} 학생 점수: {score}")

    total_score += score
    student_count += 1
    average = total_score / student_count
    print(f"\n총점: {total_score}")
    print(f"평균: {average}")
  </code></pre>
</details>

### 문제 4
사용자에게 '과목 점수' 형식으로 입력을 받아 딕셔너리에 저장하고, 사용자가 "exit"를 입력하면 파일(my_scores.txt)에 그 내용을 저장하는 프로그램을 만드세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    scores = {}

    while True:
      data = input("과목과 점수를 입력하세요 (예: 국어 90, 종료: exit): ")

    if data == "exit":
      break

    subject, score = data.split()
    scores[subject] = int(score)

    print("\n입력된 점수:", scores)

    파일에 딕셔너리 내용 저장하기
    with open("my_scores.txt", "w") as f:
      for subject, score in scores.items():
        f.write(f"{subject},{score}\n")

    print("my_scores.txt 파일이 생성되었습니다.")
  </code></pre>
</details>