---
layout: article
title: 8. 함수
permalink: /notes/kr/python-basic/chapter-08
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 기초 과정 강의 노트, 함수 개념과 활용 방법을 다룹니다.
keywords: "Python, 함수, 매개변수, return, 콜백, 람다, 기초 과정, 프로그래밍"
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

함수는 <span class="blue-text">코드의 재사용성과 가독성을 높이는 핵심 도구</span>입니다.  
반복적인 코드를 제거하고, 복잡한 프로그램을 작은 단위로 나누어 관리할 수 있게 해줍니다.  
파이썬에서는 <span class="blue-text">매개변수, return, 콜백, 람다</span> 등 다양한 함수 기능을 제공합니다.

## 1. 함수 📦
### 함수란?

함수는 <span class="blue-text">특정 작업을 수행하는 코드 블록</span>을 의미합니다.  
함수를 사용하면 다음과 같은 장점을 얻을 수 있습니다:

- <span class="blue-text">반복적인 코드 제거</span> 및 재사용성 향상
- <span class="blue-text">코드의 가독성</span> 및 유지보수 향상  
- <span class="blue-text">오류 추적</span> 및 디버깅 용이

### 함수의 기본 형태

```python
def 함수이름():
    코드1
    코드2
    ...
```

### 실습 예제 1: 기본 함수 만들기

```python
def hello(name):
    print("안녕하세요.")
    print(f"제 이름은 {name}입니다.")
    print("만나서 반갑습니다.")

# 함수 호출
hello("변우석")
hello("차은우")
hello("배수지")
```

#### 문제 1 - 나만의 인사 함수 (기초) 🎯

다음 요구사항을 만족하는 `introduce()` 함수를 작성하고 호출 결과를 확인하라.

- 이름과 취미를 매개변수로 받아 인사 문장을 2줄 출력
- f-string을 사용해 가독성 있게 출력

```python
def introduce(name, hobby):
    # TODO: 여기에 코드를 작성하세요
    # 1) "안녕하세요, 저는 [name]입니다." 출력
    # 2) "제 취미는 [hobby]입니다." 출력
    pass

# 함수 호출 예시
introduce("지민", "농구")
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  
  <pre><code class="language-python">
  def introduce(name, hobby):
      print(f"안녕하세요, 저는 {name}입니다.")
      print(f"제 취미는 {hobby}입니다.")

  introduce("지민", "농구")
  </code></pre>
</details>

### 함수의 들여쓰기
파이썬에서는 함수 내부의 코드를 구분하기 위해 <span class="blue-text">들여쓰기</span>를 사용합니다.

- <span class="yellow-code">4칸 들여쓰기</span> (권장)
- <span class="yellow-code">1번 탭</span> 사용

```python
def greet():
    print("안녕하세요!")  # 4칸 들여쓰기
    print("반갑습니다!")  # 4칸 들여쓰기
```

```python
# 오류 발생
def greet():
    print("안녕하세요!")
  print("반갑습니다!")
```

> 💡 **팁**: 들여쓰기는 <span class="red-text">일관성</span>이 중요합니다! 한 파일 내에서는 같은 방식으로 들여쓰기를 사용하세요! 🎯

## 2. 매개변수와 return 🔄
### 매개변수

파이썬에서 함수는 코드를 재사용하고 깔끔하게 정리하는 강력한 도구입니다.  
하지만 기본적인 함수만으로는 다양한 상황에 맞춰 사용하기에는 다소 제약적일 수 있습니다.  
이때 <span class="blue-text">매개변수</span>라는 마법 도구가 등장합니다.

```python
def 함수이름(매개변수1, 매개변수2, ...):
    코드1
    코드2
    ...
```

### 실습 예제 2: 매개변수 활용하기

```python
def calculate_area(length, width):
    area = length * width
    print(f"가로 {length}, 세로 {width}인 직사각형의 넓이는 {area}입니다.")

# 함수 호출
calculate_area(5, 3)    # 가로 5, 세로 3
calculate_area(10, 7)   # 가로 10, 세로 7
calculate_area(4, 4)    # 가로 4, 세로 4 (정사각형)
```

#### 문제 2 - 온도 변환 (기초) 🎯

섭씨 온도를 화씨 온도로 변환하는 `c_to_f(celsius)` 함수를 작성하라.  
공식: F = C × 9/5 + 32

```python
def c_to_f(celsius):
    # TODO: 변환 값 반환
    pass

print(c_to_f(0))    # 32.0
print(c_to_f(25))   # 77.0
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  
  <pre><code class="language-python">
  def c_to_f(celsius):
      return celsius * 9/5 + 32

  print(c_to_f(0))
  print(c_to_f(25))
  </code></pre>
</details>

### return

이제 함수는 매개변수를 통해 하나의 기능을 다양한 값에 적용하여 수행할 수 있습니다.  
하지만 더 나아가 함수 내에서 계산한 결과를 함수 외부에서 사용하고 싶다면?

```python
def 함수이름(매개변수1, 매개변수2, ...):
    코드1
    코드2
    ...
    return 함수밖으로전달하고싶은값
```

### 실습 예제 3: return 활용하기

```python
def add_numbers(a, b):
    result = a + b
    return result

def multiply_numbers(a, b):
    return a * b  # 바로 return도 가능

# 함수 호출 및 결과 사용
sum_result = add_numbers(10, 20)
product_result = multiply_numbers(5, 6)

print(f"덧셈 결과: {sum_result}")      # 덧셈 결과: 30
print(f"곱셈 결과: {product_result}")  # 곱셈 결과: 30

# 결과를 다른 계산에 활용
final_result = sum_result + product_result
print(f"최종 결과: {final_result}")   # 최종 결과: 60
```

#### 문제 3 - 할인 가격 계산 (중급) 🎯

정가와 할인율(%)을 받아 최종 판매가를 반환하는 `discount(price, rate)` 함수를 작성하라.

```python
def discount(price, rate):
    # TODO: 계산 결과 반환 (소수 첫째자리까지 반올림 권장)
    pass

print(discount(10000, 25))  # 7500.0
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  
  <pre><code class="language-python">
  def discount(price, rate):
      final = price * (1 - rate/100)
      return round(final, 1)

  print(discount(10000, 25))
  </code></pre>
</details>

> 💡 **팁**: <span class="blue-text">return</span>은 함수의 실행을 종료하고 값을 반환합니다! return 이후의 코드는 실행되지 않습니다! 🎯

## 3. 콜백 함수 🔄

### 콜백 함수란?

지금까지 함수의 매개변수와 return 값을 통해 다양한 자료형을 활용하는 방법을 살펴봤습니다.  
이번에는 <span class="blue-text">콜백 함수</span>라는 개념을 소개하여 함수 활용의 폭을 더욱 넓혀보겠습니다.

콜백 함수는 파이썬에서 제공하는 강력한 기능으로 <span class="blue-text">함수를 매개변수로 전달하여 필요할 때 호출</span>이 가능한 개념입니다.

### 실습 예제 4: 계산기 만들기

```python
def calculator(a, b, operation):
    """계산기 함수 - 콜백 함수 사용"""
    print(f"{a}와 {b}를 계산합니다.")
    result = operation(a, b)
    print(f"결과: {result}")
    return result

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b != 0:
        return a / b
    else:
        return "0으로 나눌 수 없습니다."

# 함수 호출
calculator(10, 5, add)        # 덧셈
calculator(10, 5, subtract)    # 뺄셈
calculator(10, 5, multiply)    # 곱셈
calculator(10, 5, divide)     # 나눗셈
```

#### 문제 4 - 콜백 로그 (중급) 🎯

계산 결과를 출력한 뒤 추가로 "계산 완료"를 출력하는 `log_callback`을 만들어 콜백으로 전달하라.

```python
def log_callback(result):
    # TODO: 결과와 함께 로그 출력
    pass

def run_with_log(a, b, operation, logger):
    value = operation(a, b)
    logger(value)

run_with_log(7, 3, add, log_callback)  # "결과: 10", "계산 완료" 형태 출력
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  
  <pre><code class="language-python">
  def log_callback(result):
      print(f"결과: {result}")
      print("계산 완료")

  def run_with_log(a, b, operation, logger):
      value = operation(a, b)
      logger(value)

  run_with_log(7, 3, add, log_callback)
  </code></pre>
</details>

### 콜백 함수의 활용

콜백 함수는 다양한 상황에서 활용 가능합니다.  
특히 <span class="blue-text">비동기적인 작업을 처리할 때</span> 매우 유용하게 사용됩니다.

### 실습 예제 5: 타이머 콜백

```python
import time

def timer(pause_second, callback):
    print("타이머가 시작됩니다.")
    print(f"{pause_second}초 뒤에 요청하신 함수가 호출됩니다.")
    
    time.sleep(pause_second)
    callback()
    print("타이머가 종료됩니다.")

def morning_alarm():
    print("🌅 아침 알람이 울렸습니다!")
    print("일어나서 운동하세요!")

def study_reminder():
    print("📚 공부 시간입니다!")
    print("파이썬 공부를 시작하세요!")

# 함수 호출
timer(3, morning_alarm)    # 3초 후 알람
timer(2, study_reminder)   # 2초 후 공부 알림
```

### 실전 콜백 예제: 이벤트 처리

```python
def process_data(data, success_callback, error_callback):
    """데이터 처리 함수"""
    try:
        # 데이터 처리 시뮬레이션
        if len(data) > 0:
            processed = [x * 2 for x in data]
            success_callback(processed)
        else:
            error_callback("데이터가 비어있습니다.")
    except Exception as e:
        error_callback(f"처리 중 오류 발생: {e}")

def on_success(result):
    print(f"✅ 처리 성공: {result}")

def on_error(message):
    print(f"❌ 오류 발생: {message}")

# 사용 예제
data1 = [1, 2, 3, 4, 5]
data2 = []

process_data(data1, on_success, on_error)  # 성공 케이스
process_data(data2, on_success, on_error)  # 오류 케이스
```

> 💡 **팁**: 콜백 함수는 <span class="blue-text">이벤트 처리, 비동기 프로그래밍, 디자인 패턴</span> 등에서 매우 유용합니다! 🎯

## 4. 람다 함수 ⚡
### 람다 함수란?

람다 함수는 <span class="blue-text">일반 함수를 좀 더 간결하게 표현하는 방법</span>으로 익명 함수라고도 불립니다.  
특정 범위 내에서만 사용되거나 호출되는 횟수가 한 번인 경우에 매우 유용합니다.

```python
lambda 매개변수1, 매개변수2, ...: 함수내부코드
```

### 실습 예제 6: 람다 함수 기본 사용법

```python
# 일반 함수
def square(x):
    return x * x

# 람다 함수
square_lambda = lambda x: x * x

# 결과 비교
print(square(5))           # 25
print(square_lambda(5))    # 25

# 더 간단한 사용법
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x * x, numbers))
print(squared)  # [1, 4, 9, 16, 25]
```

### 실습 예제 7: 필터링과 정렬

```python
numbers = list(range(20))

# 짝수만 필터링
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print("짝수:", even_numbers)

# 홀수만 필터링
odd_numbers = list(filter(lambda x: x % 2 == 1, numbers))
print("홀수:", odd_numbers)

# 5보다 큰 수만 필터링
big_numbers = list(filter(lambda x: x > 5, numbers))
print("5보다 큰 수:", big_numbers)
```

#### 문제 5 - 람다로 길이 합 (기초) 🎯

문자열 리스트의 전체 길이 합을 구하라. `map`과 `lambda`를 사용하라.

```python
words = ["파이썬", "람다", "함수", "콜백"]
# TODO: 총 길이 출력 (예: 8)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  
  <pre><code class="language-python">
  words = ["파이썬", "람다", "함수", "콜백"]
  total_len = sum(map(lambda s: len(s), words))
  print(total_len)
  </code></pre>
</details>

### 실습 예제 8: 정렬과 변환

```python
students = [
    {"name": "김철수", "score": 85},
    {"name": "이영희", "score": 92},
    {"name": "박민수", "score": 78},
    {"name": "최지영", "score": 96}
]

# 점수로 정렬 (내림차순)
sorted_by_score = sorted(students, key=lambda x: x["score"], reverse=True)
print("점수 순 정렬:")
for student in sorted_by_score:
    print(f"{student['name']}: {student['score']}점")

# 이름으로 정렬
sorted_by_name = sorted(students, key=lambda x: x["name"])
print("\n이름 순 정렬:")
for student in sorted_by_name:
    print(f"{student['name']}: {student['score']}점")
```

### 실습 예제 9: 복잡한 람다 활용

```python
# 여러 매개변수를 가진 람다
calculator = {
    "add": lambda x, y: x + y,
    "subtract": lambda x, y: x - y,
    "multiply": lambda x, y: x * y,
    "divide": lambda x, y: x / y if y != 0 else "0으로 나눌 수 없음"
}

# 사용 예제
a, b = 10, 5
print(f"{a} + {b} = {calculator['add'](a, b)}")
print(f"{a} - {b} = {calculator['subtract'](a, b)}")
print(f"{a} * {b} = {calculator['multiply'](a, b)}")
print(f"{a} / {b} = {calculator['divide'](a, b)}")

# 문자열 처리
words = ["python", "programming", "lambda", "function"]
capitalized = list(map(lambda word: word.upper(), words))
print("대문자 변환:", capitalized)

# 조건부 처리
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
processed = list(map(lambda x: x * 2 if x % 2 == 0 else x, numbers))
print("짝수만 2배:", processed)
```

> 💡 **팁**: 람다 함수는 <span class="blue-text">간단한 연산</span>에만 사용하고, 복잡한 로직은 일반 함수를 사용하세요! 가독성이 더 중요합니다! 🎯

## 5. 연습 문제 🎯

### 문제 1: 기본 함수 만들기 (기초)
다음 요구사항을 만족하는 함수를 작성하세요:
1. 이름과 나이를 받아서 인사하는 함수
2. 반지름을 받아서 원의 넓이를 계산하는 함수
3. 두 수를 받아서 큰 수를 반환하는 함수

### 문제 2: 콜백 함수 활용 (중급)
다음 요구사항을 만족하는 프로그램을 작성하세요:
1. 학생들의 점수를 처리하는 함수
2. 성공/실패에 따른 다른 콜백 함수
3. 평균 점수 계산 및 등급 부여

### 문제 3: 람다 함수 활용 (고급)
다음 요구사항을 만족하는 프로그램을 작성하세요:
1. 숫자 리스트에서 특정 조건에 맞는 수들만 필터링
2. 문자열 리스트를 다양한 방식으로 정렬
3. 복잡한 데이터 구조에서 특정 값 추출

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 문제 1: 기본 함수 만들기
  def greet_person(name, age):
      print(f"안녕하세요! 저는 {name}이고, {age}세입니다.")
  
  def circle_area(radius):
      import math
      return math.pi * radius * radius
  
  def get_max(a, b):
      return a if a > b else b
  
  # 사용 예제
  greet_person("김철수", 25)
  print(f"반지름 5인 원의 넓이: {circle_area(5):.2f}")
  print(f"10과 20 중 큰 수: {get_max(10, 20)}")

  # 문제 2: 콜백 함수 활용
  def process_scores(scores, success_callback, error_callback):
      if not scores:
          error_callback("점수 데이터가 없습니다.")
          return
      
      try:
          average = sum(scores) / len(scores)
          if average >= 80:
              grade = "A"
          elif average >= 70:
              grade = "B"
          elif average >= 60:
              grade = "C"
          else:
              grade = "F"
          
          success_callback(average, grade)
      except Exception as e:
          error_callback(f"처리 중 오류: {e}")
  
  def on_success(avg, grade):
      print(f"✅ 평균: {avg:.2f}, 등급: {grade}")
  
  def on_error(message):
      print(f"❌ 오류: {message}")
  
  # 사용 예제
  scores1 = [85, 92, 78, 96, 88]
  scores2 = []
  
  process_scores(scores1, on_success, on_error)
  process_scores(scores2, on_success, on_error)

  # 문제 3: 람다 함수 활용
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
  # 조건에 맞는 수들 필터링
  even_squares = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, numbers)))
  print("짝수의 제곱:", even_squares)
  
  # 문자열 정렬
  words = ["python", "java", "javascript", "c++", "go"]
  sorted_by_length = sorted(words, key=lambda x: len(x))
  print("길이 순 정렬:", sorted_by_length)
  
  # 복잡한 데이터 구조에서 값 추출
  students = [
      {"name": "김철수", "subjects": {"math": 85, "english": 92}},
      {"name": "이영희", "subjects": {"math": 78, "english": 96}},
      {"name": "박민수", "subjects": {"math": 92, "english": 88}}
  ]
  
  math_scores = list(map(lambda s: s["subjects"]["math"], students))
  print("수학 점수들:", math_scores)
  </code></pre>
</details>

## 6. 주의사항 및 팁 ⚠️

### 함수 사용 시 주의사항

1. **함수명**: 의미 있는 이름을 사용하세요.
2. **매개변수**: 너무 많은 매개변수는 피하세요.
3. **return**: 명확한 반환값을 설정하세요.

### 콜백 함수 주의사항

1. **에러 처리**: 콜백 함수에서 예외 처리를 고려하세요.
2. **성능**: 너무 복잡한 콜백은 피하세요.
3. **가독성**: 콜백 체인이 길어지면 가독성이 떨어집니다.

### 람다 함수 주의사항

1. **간단한 로직만**: 복잡한 로직은 일반 함수를 사용하세요.
2. **가독성**: 람다가 너무 복잡하면 일반 함수가 더 좋습니다.
3. **디버깅**: 람다는 디버깅이 어려울 수 있습니다.

### 성능 최적화 팁

```python
# 효율적인 함수 호출
def efficient_calculation(data):
    return sum(x * 2 for x in data if x > 0)

# 메모이제이션 활용
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 2:
        return 1
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]
```

### 디버깅 팁

```python
# 함수 디버깅
def debug_function(x, y):
    print(f"입력값: x={x}, y={y}")
    result = x + y
    print(f"계산 결과: {result}")
    return result

# 람다 디버깅
debug_lambda = lambda x: print(f"값: {x}") or x * 2
```

> 💡 **팁**: 함수는 <span class="blue-text">코드의 재사용성과 가독성</span>을 높이는 핵심 도구입니다!  
> 적절한 함수 설계와 활용으로 더욱 효율적인 프로그램을 작성하세요! 🎯

---

함수는 파이썬 프로그래밍의 핵심 요소로, <span class="blue-text">코드의 재사용성과 가독성</span>을 크게 향상시킵니다.  
<span class="blue-text">매개변수, return, 콜백, 람다</span> 등 다양한 함수 기능을 잘 활용하면 더욱 효율적인 프로그램을 작성할 수 있습니다! 🚀