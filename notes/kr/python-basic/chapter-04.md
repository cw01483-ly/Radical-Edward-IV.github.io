---
layout: article
title: 4. 반복문
permalink: /notes/kr/python-basic/chapter-04
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 기초 과정 강의 노트, 반복문 개념과 활용 방법을 다룹니다.
keywords: "Python, 변수, 자료형, 기초 과정, 데이터 처리, 프로그래밍"
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

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Python%20Basic&reversal=false&textBg=false)

반복문은 <span class="blue-text">같은 작업을 여러 번 반복</span>해야 할 때 사용하는 제어 구조입니다.  
프로그래밍에서 반복문을 사용하면 코드를 간결하게 작성할 수 있고, 효율성을 높일 수 있습니다.  
Python에서는 <span class="blue-text">while문과 for문</span> 두 가지 반복문을 제공하며, 각각 고유한 특징과 용도가 있습니다.

<figure>
    <img src="/notes/assets/python-basic/chapter-04-01.png" width="70%" alt="반복문 종류 예시">
    <figcaption>반복문 종류 예시</figcaption>
</figure>

## 반복문 종류 🔄

| 반복문 종류 | 설명 | 사용 시기 |
|------------|------|-----------|
| <span class="blue-text">while문</span> | 조건이 참인 동안 반복 실행 | 반복 횟수를 미리 알 수 없는 경우 |
| <span class="blue-text">for문</span> | 특정 범위나 컬렉션을 순회하며 반복 | 반복 횟수를 미리 알 수 있는 경우 |

## 1. while문 🔁

while문은 <span class="blue-text">조건이 참인 동안 지속적으로 코드 블록을 반복 실행</span>하는 구문입니다. 반복 횟수를 미리 알 수 없는 경우나 조건에 따라 반복을 수행해야 하는 경우에 유용합니다.

### while문의 기본 구조

```python
while 조건식:
    조건식이 참이면 실행되는 코드
```

> 💡 **팁**: while문은 조건문과 유사하지만, <span class="blue-text">조건이 참인 동안 계속 반복</span>한다는 점이 다릅니다! 🔍

### 기본 while문 예제

```python
# 예제 1: 0부터 2까지 출력
count = 0

while count < 3:
    print(count)
    count = count + 1

# 실행 결과:
# 0
# 1
# 2
```

#### 문제 1 - while문 기본 사용하기 (기초) 🎯
> 아래 코드의 주석을 참고하여, while문을 사용해 1부터 5까지 출력해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. 변수 초기화
# num = 

# 2. while문으로 1부터 5까지 출력
# while 
#     print(num)
#     num += 1

print("완료!")
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 1. 변수 초기화
  num = 1

  # 2. while문으로 1부터 5까지 출력
  while num <= 5:
      print(num)
      num += 1

  print("완료!")
  # 실행 결과:
  # 1
  # 2
  # 3
  # 4
  # 5
  # 완료!
  </code></pre>
</details>

### while문 활용 예제

```python
# 예제 2: 아이스크림 구매 시뮬레이션
money = 5000
count = 0

while money >= 3000:
    print("아이스크림을 사 먹었습니다.")
    money -= 1000
    count += 1
    print("아이스크림을", count, "번 사 먹었습니다.")

print("돈이 부족해서 더 이상 구매할 수 없습니다.")
```

### 무한 루프 ⚠️

while문에서 조건이 항상 참이 되면 <span class="red-text">무한 루프</span>가 발생할 수 있습니다. 무한 루프는 프로그램이 계속 실행되어 시스템에 부담을 줄 수 있으므로 주의해야 합니다.

```python
# 무한 루프 예제 (주의!)
count = 0

while count < 3:
    print(count)
    # count += 1  # 이 줄이 없으면 무한 루프 발생!

# 올바른 코드
count = 0

while count < 3:
    print(count)
    count += 1  # 반드시 조건을 변경하는 코드 필요!
```

> ⚠️ **주의**: 무한 루프를 중단하려면 <span class="yellow-code">Ctrl + C</span>를 누르거나 IDE의 중단 버튼을 사용하세요! 🛑

### break와 continue 문

while문 내에서 반복을 제어할 수 있는 특별한 키워드들이 있습니다.

#### break 문
- <span class="blue-text">while문을 강제로 종료</span>합니다.
- break문을 만나면 즉시 while문을 벗어나 다음 코드로 이동합니다.

```python
# break 예제
count = 0

while count < 10:
    print(count)
    count += 1
    
    if count == 5:
        break  # 5에서 루프 종료

print("루프 종료")
# 실행 결과: 0 1 2 3 4 루프 종료
```

#### continue 문
- <span class="blue-text">현재 반복을 건너뛰고 다음 반복으로 이동</span>합니다.
- while문의 처음 조건문으로 돌아갑니다.

```python
# continue 예제 (369 게임)
num = 0

while num < 20:
    num += 1
    
    if num % 3 == 0:  # 3의 배수인 경우
        print("짝", end=" ")
        continue  # 다음 반복으로 이동
    
    print(num, end=" ")

# 실행 결과: 1 2 짝 4 5 짝 7 8 짝 10 11 짝 13 14 짝 16 17 짝 19 20
```

#### 문제 2 - break와 continue 사용하기 (중급) 🎯
> 아래 코드의 주석을 참고하여, break와 continue를 사용해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1부터 20까지 출력하되, 3의 배수는 "짝"으로 출력하고, 17에서 중단

# num = 0
# while num < 20:
#     num += 1
#     
#     # 3의 배수인 경우 "짝" 출력하고 다음 반복으로
#     if num % 3 == 0:
#         print("짝", end=" ")
#         continue
#     
#     # 17인 경우 루프 중단
#     if num == 17:
#         break
#     
#     print(num, end=" ")
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  num = 0
  while num < 20:
      num += 1
      
      # 3의 배수인 경우 "짝" 출력하고 다음 반복으로
      if num % 3 == 0:
          print("짝", end=" ")
          continue
      
      # 17인 경우 루프 중단
      if num == 17:
          break
      
      print(num, end=" ")

  # 실행 결과: 1 2 짝 4 5 짝 7 8 짝 10 11 짝 13 14 짝 16
  </code></pre>
</details>

### 중첩 while문

while문 안에 또 다른 while문을 사용할 수 있습니다. 이를 <span class="blue-text">중첩 while문</span>이라고 합니다.

```python
# 중첩 while문 예제 (5일간 3시간씩 수업)
day = 1

while day <= 5:
    hour = 1
    print(f"{day}일차 시작")
    
    while hour <= 3:
        print(f"{day}일차 {hour}교시입니다")
        hour += 1
    
    day += 1
    print()

# 실행 결과:
# 1일차 시작
# 1일차 1교시입니다
# 1일차 2교시입니다
# 1일차 3교시입니다
# 
# 2일차 시작
# 2일차 1교시입니다
# ...
```

## 2. for문 🔄

for문은 <span class="blue-text">반복 횟수를 미리 알 수 있는 경우</span>에 사용하는 반복문입니다. 리스트, 문자열, range() 함수 등과 함께 사용하여 간결하고 효율적인 코드를 작성할 수 있습니다.

### for문의 기본 구조

```python
for 변수 in 리스트:
    코드1
    코드2
    ...
```

### 기본 for문 예제

```python
# 예제 1: 리스트 순회
numbers = [1, 2, 3, 4, 5]

for n in numbers:
    print(n)

# 실행 결과:
# 1
# 2
# 3
# 4
# 5
```

```python
# 예제 2: 문자열 순회
for ch in 'Hello':
    print(ch)

# 실행 결과:
# H
# e
# l
# l
# o
```

```python
# 예제 3: 문자열 리스트 순회
names = ["jennie", "hani", "kelly"]

for name in names:
    print("안녕하세요, 제 이름은", name, "입니다.")
    print("만나서 반갑습니다.")

# 실행 결과:
# 안녕하세요, 제 이름은 jennie 입니다.
# 만나서 반갑습니다.
# 안녕하세요, 제 이름은 hani 입니다.
# 만나서 반갑습니다.
# 안녕하세요, 제 이름은 kelly 입니다.
# 만나서 반갑습니다.
```

### range() 함수 📊

range() 함수는 <span class="blue-text">연속된 정수 시퀀스를 생성</span>하는 내장 함수입니다. for문과 함께 사용하면 반복 횟수를 쉽게 제어할 수 있습니다.

#### range() 함수의 기본 형태

```python
range(시작, 종료)  # 시작부터 종료-1까지
range(종료)        # 0부터 종료-1까지 (시작값 생략 시 0)
range(시작, 종료, 간격)  # 시작부터 종료-1까지 간격만큼
```

```python
# range() 함수 예제
print(list(range(1, 7)))  # [1, 2, 3, 4, 5, 6]
print(list(range(2, 5)))  # [2, 3, 4]
print(list(range(4, 8)))  # [4, 5, 6, 7]
print(list(range(5)))     # [0, 1, 2, 3, 4]
```

#### range() 함수를 활용한 for문

```python
# 예제 1: 1부터 5까지의 합 구하기
sum = 0

for n in range(1, 6):
    sum += n

print(sum)  # 15

# 예제 2: 1부터 99까지의 합 구하기
sum = 0

for num in range(1, 100):
    sum += num

print(sum)  # 4950
```

#### 문제 3 - range() 함수 사용하기 (기초) 🎯
> 아래 코드의 주석을 참고하여, range() 함수를 사용해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. 1부터 10까지 출력
# for i in range(1, 11):
#     print(i)

# 2. 0부터 9까지 출력
# for i in range(10):
#     print(i)

# 3. 2부터 20까지 짝수만 출력
# for i in range(2, 21, 2):
#     print(i)

# 4. 10부터 1까지 역순으로 출력
# for i in range(10, 0, -1):
#     print(i)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 1. 1부터 10까지 출력
  for i in range(1, 11):
      print(i)

  # 2. 0부터 9까지 출력
  for i in range(10):
      print(i)

  # 3. 2부터 20까지 짝수만 출력
  for i in range(2, 21, 2):
      print(i)

  # 4. 10부터 1까지 역순으로 출력
  for i in range(10, 0, -1):
      print(i)
  </code></pre>
</details>

### 중첩 for문 (구구단) 🧮

for문을 중첩하여 사용하면 <span class="blue-text">2차원적인 반복 작업</span>을 수행할 수 있습니다. 구구단 출력이 대표적인 예입니다.

```python
# 구구단 2단 출력
for n in range(1, 10):
    print("2 X", n, "=", 2 * n)

# 실행 결과:
# 2 X 1 = 2
# 2 X 2 = 4
# 2 X 3 = 6
# 2 X 4 = 8
# 2 X 5 = 10
# 2 X 6 = 12
# 2 X 7 = 14
# 2 X 8 = 16
# 2 X 9 = 18
```

```python
# 중첩 for문으로 전체 구구단 출력
for m in range(2, 10):        # 2단부터 9단까지
    for n in range(1, 10):    # 1부터 9까지
        print(m, "X", n, "=", m * n)
    print()  # 단 사이에 빈 줄 추가

# 실행 결과:
# 2 X 1 = 2
# 2 X 2 = 4
# ...
# 2 X 9 = 18
# 
# 3 X 1 = 3
# 3 X 2 = 6
# ...
# 9 X 9 = 81
```

#### 문제 4 - 중첩 for문으로 구구단 만들기 (중급) 🎯
> 아래 코드의 주석을 참고하여, 중첩 for문을 사용해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. 3단만 출력하기
# for n in range(1, 10):
#     print("3 X", n, "=", 3 * n)

# 2. 5단부터 7단까지 출력하기
# for m in range(5, 8):
#     print(f"=== {m}단 ===")
#     for n in range(1, 10):
#         print(f"{m} X {n} = {m * n}")
#     print()

# 3. 역순 구구단 (9단부터 2단까지)
# for m in range(9, 1, -1):
#     print(f"=== {m}단 ===")
#     for n in range(1, 10):
#         print(f"{m} X {n} = {m * n}")
#     print()
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 1. 3단만 출력하기
  for n in range(1, 10):
      print("3 X", n, "=", 3 * n)

  # 2. 5단부터 7단까지 출력하기
  for m in range(5, 8):
      print(f"=== {m}단 ===")
      for n in range(1, 10):
          print(f"{m} X {n} = {m * n}")
      print()

  # 3. 역순 구구단 (9단부터 2단까지)
  for m in range(9, 1, -1):
      print(f"=== {m}단 ===")
      for n in range(1, 10):
          print(f"{m} X {n} = {m * n}")
      print()
  </code></pre>
</details>

## 3. 반복문 비교 및 선택 가이드 🎯

| 상황 | 권장 반복문 | 이유 |
|------|------------|------|
| 반복 횟수를 모를 때 | <span class="blue-text">while문</span> | 조건에 따라 반복 여부 결정 |
| 반복 횟수를 알 때 | <span class="blue-text">for문</span> | 간결하고 안전한 코드 |
| 리스트/문자열 순회 | <span class="blue-text">for문</span> | Python의 관용적 표현 |
| 사용자 입력 처리 | <span class="blue-text">while문</span> | 입력 유효성 검사에 적합 |

### 반복문 선택 가이드

```python
# while문이 적합한 경우
user_input = ""
while user_input != "quit":
    user_input = input("명령을 입력하세요 (quit로 종료): ")
    print(f"입력한 명령: {user_input}")

# for문이 적합한 경우
fruits = ["사과", "바나나", "오렌지"]
for fruit in fruits:
    print(f"과일: {fruit}")

# range()와 for문이 적합한 경우
for i in range(1, 11):
    print(f"숫자: {i}")
```

## 4. 실전 예제 🚀

### 예제 1: 숫자 맞추기 게임

```python
import random

# 1부터 100까지의 랜덤한 숫자 생성
secret_number = random.randint(1, 100)
attempts = 0

print("1부터 100까지의 숫자를 맞춰보세요!")

while True:
    guess = int(input("숫자를 입력하세요: "))
    attempts += 1
    
    if guess == secret_number:
        print(f"축하합니다! {attempts}번 만에 맞췄습니다!")
        break
    elif guess < secret_number:
        print("더 큰 숫자입니다.")
    else:
        print("더 작은 숫자입니다.")
```

### 예제 2: 성적 관리 시스템

```python
# 학생들의 성적 리스트
scores = [85, 92, 78, 96, 88, 73, 91, 87]

# 성적 통계 계산
total = 0
count = 0
high_scores = []

for score in scores:
    total += score
    count += 1
    
    if score >= 90:
        high_scores.append(score)

average = total / count

print(f"총 학생 수: {count}")
print(f"평균 점수: {average:.2f}")
print(f"90점 이상 학생 수: {len(high_scores)}")
print(f"90점 이상 점수들: {high_scores}")
```

### 예제 3: 피보나치 수열

```python
# 피보나치 수열의 첫 10개 항 출력
a, b = 0, 1
count = 0

print("피보나치 수열 (첫 10개 항):")

while count < 10:
    print(a, end=" ")
    a, b = b, a + b
    count += 1

print()  # 줄바꿈
```

## 5. 주의사항 및 팁 ⚠️

### 반복문 사용 시 주의사항

1. **무한 루프 방지**: while문에서는 반드시 조건을 변경하는 코드를 포함해야 합니다.
2. **인덴테이션**: 반복문 내부의 코드는 반드시 들여쓰기를 해야 합니다.
3. **변수 초기화**: 반복문에서 사용하는 변수는 적절히 초기화해야 합니다.

### 성능 최적화 팁

```python
# 비효율적인 코드
numbers = [1, 2, 3, 4, 5]
for i in range(len(numbers)):
    print(numbers[i])

# 효율적인 코드
numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number)
```

### 디버깅 팁

```python
# 반복문 디버깅을 위한 print문 활용
for i in range(5):
    print(f"반복 {i+1}번째")  # 현재 반복 횟수 확인
    # 실제 작업 코드
    result = i * 2
    print(f"결과: {result}")  # 중간 결과 확인
```

> 💡 **팁**: 반복문을 사용할 때는 <span class="blue-text">코드의 가독성과 효율성</span>을 고려하여 적절한 반복문을 선택하세요! 복잡한 로직은 작은 단위로 나누어 구현하는 것이 좋습니다! 🎯

## 6. 연습 문제 🎯

### 문제 1: 별 찍기 (기초)
다음과 같은 패턴을 출력하는 프로그램을 작성하세요.

```
*
**
***
****
*****
```

### 문제 2: 구구단 표 (중급)
전체 구구단을 표 형태로 예쁘게 출력하는 프로그램을 작성하세요.

### 문제 3: 소수 찾기 (고급)
1부터 100까지의 소수를 모두 찾아 출력하는 프로그램을 작성하세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 문제 1: 별 찍기
  for i in range(1, 6):
      print("*" * i)

  # 문제 2: 구구단 표
  for i in range(2, 10):
      print(f"=== {i}단 ===")
      for j in range(1, 10):
          print(f"{i} X {j} = {i*j:2d}")
      print()

  # 문제 3: 소수 찾기
  for num in range(2, 101):
      is_prime = True
      for i in range(2, int(num**0.5) + 1):
          if num % i == 0:
              is_prime = False
              break
      if is_prime:
          print(num, end=" ")
  print()
  </code></pre>
</details>

---

반복문은 프로그래밍의 핵심 개념 중 하나입니다. while문과 for문의 특징을 이해하고 적절히 활용하면, 복잡한 작업도 간단하고 효율적으로 처리할 수 있습니다. 다양한 예제를 통해 연습해보세요! 🚀
