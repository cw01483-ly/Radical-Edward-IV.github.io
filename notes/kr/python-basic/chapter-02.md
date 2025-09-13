---
layout: article
title: 2. 연산자
permalink: /notes/kr/python-basic/chapter-02
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 기초 과정 강의 노트, 연산자 개념과 활용 방법을 다룹니다.
keywords: "Python, 연산자, 기초 과정, 데이터 처리, 프로그래밍"
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

연산자는 수학적 계산과 데이터 처리를 수행하기 위해 사용하는 <span class="blue-text">기호 또는 기호 조합</span>입니다.  
예를 들어 덧셈할 때 사용하는 <span class="yellow-code">+</span> 기호가 대표적인 연산자입니다.  
연산자를 사용하면 숫자 연산을 물론 변수 조작, 논리 비교 등 다양한 작업을 수행할 수 있습니다.  
연산에서 사용되는 항목의 개수에 따라 <span class="blue-text">단항, 이항, 삼항 연산자</span>로 구분할 수 있으며, 사용 목적에 따라 <span class="blue-text">산술, 대입, 관계, 논리 연산자</span>로 구분할 수도 있습니다.

<figure>
    <img src="/notes/assets/python-basic/chapter-02-01.png" width="70%" alt="연산자 종류 예시">
    <figcaption>연산자 종류 예시</figcaption>
</figure>

## 연산자 종류 📊

| 연산자 종류 | 설명 | 예시 |
|------------|------|------|
| <span class="blue-text">산술 연산자</span> | 수학적 계산을 수행 | `+`, `-`, `*`, `/`, `//`, `%`, `**` |
| <span class="blue-text">대입 연산자</span> | 변수에 값을 할당 | `=`, `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=` |
| <span class="blue-text">비교 연산자</span> | 두 값을 비교하여 참/거짓 판별 | `>`, `<`, `>=`, `<=`, `==`, `!=` |
| <span class="blue-text">논리 연산자</span> | 논리적 연산을 수행 | `and`, `or`, `not` |
| <span class="blue-text">부호 연산자</span> | 숫자의 부호를 변경 | `+`, `-` |
| <span class="blue-text">조건 연산자</span> | 조건에 따라 결과 선택 | `조건식 if 참값 else 거짓값` |

## 1. Python 연산자 🐍

### 산술 연산자 🔢
산술 연산자는 프로그래밍에서 기본적인 수학적 계산을 수행하는 역할을 합니다. 주요 산술 연산자에는 사칙 연산자와 몫과 나머지 연산자, 그리고 거듭제곱 연산자가 있습니다.

```python
num1 = 100
num2 = 3

# 덧셈
print(num1 + num2)  # 103

# 뺄셈
print(num1 - num2)  # 97

# 곱셈
print(num1 * num2)  # 300

# 나눗셈 (실수 결과)
print(num1 / num2)  # 33.333333333333336

# 몫 (정수 나눗셈)
print(num1 // num2)  # 33

# 나머지
print(num1 % num2)  # 1

# 거듭제곱
print(num1 ** num2)  # 1000000
```

> 💡 **팁**: <span class="yellow-code">/</span> 연산자는 항상 실수 결과를 반환하고, <span class="yellow-code">//</span> 연산자는 정수 몫을 반환합니다! 🔍

#### 문제 1 - 산술 연산자 계산하기 (기초) 🎯
> 아래 코드의 주석을 참고하여, 산술 연산을 사용해 계산해보세요.

```python
# 기본 변수
a = 20
b = 6

print("=== 산술 연산자 연습 ===")

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. a와 b의 합계 계산하기
# sum_result = 

# 2. a와 b의 차이 계산하기
# diff_result = 

# 3. a를 b로 나눈 몫 계산하기
# quotient = 

# 4. a를 b로 나눈 나머지 계산하기
# remainder = 

# 5. a의 b제곱 계산하기
# power = 

print("계산 결과:")
# print("합계:", sum_result)
# print("차이:", diff_result)
# print("몫:", quotient)
# print("나머지:", remainder)
# print("제곱:", power)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 기본 변수
  a = 20
  b = 6

  print("=== 산술 연산자 연습 ===")

  # 1. a와 b의 합계 계산하기
  sum_result = a + b

  # 2. a와 b의 차이 계산하기
  diff_result = a - b

  # 3. a를 b로 나눈 몫 계산하기
  quotient = a // b

  # 4. a를 b로 나눈 나머지 계산하기
  remainder = a % b

  # 5. a의 b제곱 계산하기
  power = a ** b

  print("계산 결과:")
  print("합계:", sum_result)      # 26
  print("차이:", diff_result)     # 14
  print("몫:", quotient)          # 3
  print("나머지:", remainder)     # 2
  print("제곱:", power)           # 64000000
  </code></pre>
</details>

### 대입 연산자 📦
대입 연산자는 변수에 값을 할당하는 데 사용하는 연산자입니다. 마치 상자에 물건을 담는 것처럼, 변수라는 상자에 값이라는 물건을 담아 저장할 수 있습니다.

```python
num1 = 100  # 기본 대입 연산자
```

#### 복합 대입 연산자 🔄
복합 대입 연산자는 우리가 편하게 사용할 수 있도록 연산자를 줄여 놓은 것입니다. 기존에 다음과 같이 `x = x + 3`이라는 식을 사용하여 x 값을 증가시켰습니다.  
복합 대입 연산자를 사용하면 다음과 같이 단순하게 표현할 수 있습니다.

```python
x = 1
x += 3  # x = x + 3과 동일
print(x)  # 4
```

| 연산자 | 연산 내용 | 예시 |
|--------|-----------|------|
| <span class="yellow-code">+=</span> | 왼쪽 피연산자에 오른쪽 피연산자를 더한 결과값을 대입 | `x += 3` → `x = x + 3` |
| <span class="yellow-code">-=</span> | 왼쪽 피연산자에서 오른쪽 피연산자를 뺀 결과값을 대입 | `x -= 3` → `x = x - 3` |
| <span class="yellow-code">*=</span> | 왼쪽 피연산자에 오른쪽 피연산자를 곱한 결과값을 대입 | `x *= 3` → `x = x * 3` |
| <span class="yellow-code">/=</span> | 왼쪽 피연산자를 오른쪽 피연산자로 나눈 결과값을 대입 | `x /= 3` → `x = x / 3` |
| <span class="yellow-code">//=</span> | 왼쪽 피연산자를 오른쪽 피연산자로 나눈 몫을 대입 | `x //= 3` → `x = x // 3` |
| <span class="yellow-code">%=</span> | 왼쪽 피연산자를 오른쪽 피연산자로 나눈 나머지를 대입 | `x %= 3` → `x = x % 3` |
| <span class="yellow-code">**=</span> | 왼쪽 피연산자를 오른쪽 피연산자만큼 거듭제곱한 결과값을 대입 | `x **= 3` → `x = x ** 3` |

#### 문제 2 - 복합 대입 연산자 사용하기 (기초) 🎯
> 아래 코드의 주석을 참고하여, 복합 대입 연산자를 사용해 변수 값을 변경해보세요.

```python
# 초기값
score = 100
level = 1

print("=== 복합 대입 연산자 연습 ===")
print("초기값 - 점수:", score, "레벨:", level)

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. score에 50을 더하기 (복합 대입 연산자 사용)
# score 

# 2. score에서 20 빼기 (복합 대입 연산자 사용)
# score 

# 3. score를 2로 나누기 (복합 대입 연산자 사용)
# score 

# 4. level에 1 더하기 (복합 대입 연산자 사용)
# level 

# 5. level을 3제곱하기 (복합 대입 연산자 사용)
# level 

print("최종값 - 점수:", score, "레벨:", level)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 초기값
  score = 100
  level = 1

  print("=== 복합 대입 연산자 연습 ===")
  print("초기값 - 점수:", score, "레벨:", level)

  # 1. score에 50을 더하기 (복합 대입 연산자 사용)
  score += 50

  # 2. score에서 20 빼기 (복합 대입 연산자 사용)
  score -= 20

  # 3. score를 2로 나누기 (복합 대입 연산자 사용)
  score /= 2

  # 4. level에 1 더하기 (복합 대입 연산자 사용)
  level += 1

  # 5. level을 3제곱하기 (복합 대입 연산자 사용)
  level **= 3

  print("최종값 - 점수:", score, "레벨:", level)
  # 최종값 - 점수: 65.0 레벨: 8
  </code></pre>
</details>

### 비교 연산자 ⚖️
비교 연산자는 두 개의 값을 비교하여 그 결과가 참(True)인지 거짓(False)인지 판별하는 연산자로, <span class="blue-text">관계 연산자</span>라고도 부릅니다.

| 연산자 | 의미 | 예시 | 결과 |
|--------|------|------|------|
| <span class="yellow-code">></span> | 왼쪽 값이 오른쪽 값보다 크다 | `5 > 3` | `True` |
| <span class="yellow-code"><</span> | 왼쪽 값이 오른쪽 값보다 작다 | `5 < 3` | `False` |
| <span class="yellow-code">>=</span> | 왼쪽 값이 오른쪽 값보다 크거나 같다 | `5 >= 5` | `True` |
| <span class="yellow-code"><=</span> | 왼쪽 값이 오른쪽 값보다 작거나 같다 | `5 <= 3` | `False` |
| <span class="yellow-code">==</span> | 왼쪽 값과 오른쪽 값이 같다 | `5 == 5` | `True` |
| <span class="yellow-code">!=</span> | 왼쪽 값과 오른쪽 값이 다르다 | `5 != 3` | `True` |

```python
# 숫자 비교
print(10 > 5)    # True
print(10 < 5)    # False
print(10 == 10)  # True
print(10 != 5)   # True

# 문자열 비교 (사전순으로 비교)
print("apple" < "banana")  # True
print("apple" == "apple")  # True

# 논리값 비교
print(True == True)        # True
print(True == "True")      # False (자료형이 다름)

# 변수와 값 비교
age = 20
print(age >= 18)  # True
print(age == 20)  # True
```

> 💡 **팁**: 문자열 비교는 <span class="blue-text">사전순(알파벳 순)</span>으로 이루어집니다. 대소문자도 구분하므로 주의하세요! 🔤

#### 문제 3 - 비교 연산자 사용하기 (기초) 🎯
> 아래 코드의 주석을 참고하여, 비교 연산자를 사용해 결과를 예측해보세요.

```python
# 기본 변수
x = 15
y = 10
z = 15

print("=== 비교 연산자 연습 ===")
print("x =", x, "y =", y, "z =", z)

# TODO: 아래 주석을 참고하여 결과를 예측해보세요
# 1. x가 y보다 큰가?
# result1 = x > y
# print("x > y:", result1)

# 2. x가 z와 같은가?
# result2 = x == z
# print("x == z:", result2)

# 3. y가 x보다 작거나 같은가?
# result3 = y <= x
# print("y <= x:", result3)

# 4. x가 y와 다른가?
# result4 = x != y
# print("x != y:", result4)

# 5. x가 10보다 크고 20보다 작은가?
# result5 = x > 10 and x < 20
# print("10 < x < 20:", result5)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 기본 변수
  x = 15
  y = 10
  z = 15

  print("=== 비교 연산자 연습 ===")
  print("x =", x, "y =", y, "z =", z)

  # 1. x가 y보다 큰가?
  result1 = x > y
  print("x > y:", result1)  # True

  # 2. x가 z와 같은가?
  result2 = x == z
  print("x == z:", result2)  # True

  # 3. y가 x보다 작거나 같은가?
  result3 = y <= x
  print("y <= x:", result3)  # True

  # 4. x가 y와 다른가?
  result4 = x != y
  print("x != y:", result4)  # True

  # 5. x가 10보다 크고 20보다 작은가?
  result5 = x > 10 and x < 20
  print("10 < x < 20:", result5)  # True
  </code></pre>
</details>

### 논리 연산자 🧠
논리 연산자는 논리적인 연산을 수행하여 참인지 거짓인지를 판단하는 연산자입니다. 두 개 이상의 논리값을 조합하여 새로운 논리값을 만들 수 있습니다.

| 연산자 | 의미 | 설명 |
|--------|------|------|
| <span class="yellow-code">and</span> | 논리곱(AND) | 연산자를 기준으로 왼쪽과 오른쪽 값이 모두 True일 때만 True를 반환하고 나머지는 모두 False를 반환합니다. |
| <span class="yellow-code">or</span> | 논리합(OR) | 연산자를 기준으로 왼쪽과 오른쪽 값 중 하나라도 True이면 True를 반환하고, 둘 다 False일 때만 False를 반환합니다. |
| <span class="yellow-code">not</span> | 논리부정(NOT) | 연산자 뒤에 오는 논리값을 반대로 바꿉니다. True는 False로, False는 True로 변환합니다. |

#### 논리 연산자 진리표 📊

| A | B | A and B | A or B | not A |
|---|---|---------|--------|-------|
| <span class="green-text">True</span> | <span class="green-text">True</span> | <span class="green-text">True</span> | <span class="green-text">True</span> | <span class="red-text">False</span> |
| <span class="green-text">True</span> | <span class="red-text">False</span> | <span class="red-text">False</span> | <span class="green-text">True</span> | <span class="red-text">False</span> |
| <span class="red-text">False</span> | <span class="green-text">True</span> | <span class="red-text">False</span> | <span class="green-text">True</span> | <span class="green-text">True</span> |
| <span class="red-text">False</span> | <span class="red-text">False</span> | <span class="red-text">False</span> | <span class="red-text">False</span> | <span class="green-text">True</span> |

```python
# 논리 연산자 예제
age = 20
has_license = True
is_weekend = False

# and 연산자 - 모든 조건이 참이어야 참
can_drive = age >= 18 and has_license
print("운전 가능:", can_drive)  # True

# or 연산자 - 하나라도 참이면 참
can_rest = is_weekend or age < 18
print("휴식 가능:", can_rest)  # False

# not 연산자 - 논리값을 반대로
is_weekday = not is_weekend
print("평일인가:", is_weekday)  # True

# 복합 논리 연산
complex_condition = (age >= 18 and has_license) or is_weekend
print("복합 조건:", complex_condition)  # True
```

> 💡 **팁**: <span class="yellow-code">and</span> 대신 <span class="yellow-code">&</span>를, <span class="yellow-code">or</span> 대신 <span class="yellow-code">|</span>를 사용할 수도 있지만, 일반적으로는 <span class="blue-text">and, or, not</span>을 사용하는 것이 더 읽기 쉽습니다! 🔍

#### 문제 4 - 논리 연산자 사용하기 (중급) 🎯
> 아래 코드의 주석을 참고하여, 논리 연산자를 사용해 조건을 판단해보세요.

```python
# 기본 정보
age = 25
has_job = True
has_car = False
is_weekend = True

print("=== 논리 연산자 연습 ===")
print("나이:", age, "직업 있음:", has_job, "차 있음:", has_car, "주말:", is_weekend)

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. 성인이고 직업이 있는가?
# adult_with_job = 

# 2. 차가 있거나 주말인가?
# can_travel = 

# 3. 직업이 없고 주말이 아닌가?
# no_job_weekday = 

# 4. 성인이 아니거나 차가 없는가?
# not_adult_or_no_car = 

# 5. (성인이고 직업이 있음) 또는 (주말이고 차가 있음)인가?
# complex_condition = 

print("조건 판단 결과:")
# print("성인이고 직업 있음:", adult_with_job)
# print("차 있거나 주말:", can_travel)
# print("직업 없고 평일:", no_job_weekday)
# print("미성년자이거나 차 없음:", not_adult_or_no_car)
# print("복합 조건:", complex_condition)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 기본 정보
  age = 25
  has_job = True
  has_car = False
  is_weekend = True

  print("=== 논리 연산자 연습 ===")
  print("나이:", age, "직업 있음:", has_job, "차 있음:", has_car, "주말:", is_weekend)

  # 1. 성인이고 직업이 있는가?
  adult_with_job = age >= 18 and has_job

  # 2. 차가 있거나 주말인가?
  can_travel = has_car or is_weekend

  # 3. 직업이 없고 주말이 아닌가?
  no_job_weekday = not has_job and not is_weekend

  # 4. 성인이 아니거나 차가 없는가?
  not_adult_or_no_car = age < 18 or not has_car

  # 5. (성인이고 직업이 있음) 또는 (주말이고 차가 있음)인가?
  complex_condition = (age >= 18 and has_job) or (is_weekend and has_car)

  print("조건 판단 결과:")
  print("성인이고 직업 있음:", adult_with_job)      # True
  print("차 있거나 주말:", can_travel)              # True
  print("직업 없고 평일:", no_job_weekday)          # False
  print("미성년자이거나 차 없음:", not_adult_or_no_car)  # True
  print("복합 조건:", complex_condition)            # True
  </code></pre>
</details>

### 부호 연산자 ➕➖
논리 연산자의 <span class="yellow-code">not</span>이 뒤에 따라오는 논리값을 반대로 바꿀 수 있는 것처럼, <span class="blue-text">부호 연산자</span>는 숫자의 부호를 바꿉니다.

```python
x = 10
print(x)    # 10

# 음수로 변경
x = -x
print(x)    # -10

# 다시 양수로 변경
x = +x
print(x)    # -10 (양수 부호는 값에 영향 없음)

# 논리값에도 부호 연산자 적용 가능
is_True = True
print(-is_True)  # -1 (True는 1로 변환되어 -1이 됨)
print(+is_True)  # 1 (True는 1로 변환됨)
```

> 💡 **팁**: <span class="yellow-code">+</span> 부호 연산자는 값에 영향을 주지 않지만, <span class="yellow-code">-</span> 부호 연산자는 값을 반대로 바꿉니다! 🔄

#### 문제 5 - 부호 연산자 사용하기 (기초) 🎯
> 아래 코드의 주석을 참고하여, 부호 연산자를 사용해 값을 변경해보세요.

```python
# 기본 변수
num1 = 15
num2 = -8
is_positive = True

print("=== 부호 연산자 연습 ===")
print("초기값 - num1:", num1, "num2:", num2, "is_positive:", is_positive)

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. num1의 부호를 바꿔보세요
# num1 = 

# 2. num2의 부호를 바꿔보세요
# num2 = 

# 3. is_positive의 부호를 바꿔보세요
# is_positive = 

print("변경 후 - num1:", num1, "num2:", num2, "is_positive:", is_positive)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 기본 변수
  num1 = 15
  num2 = -8
  is_positive = True

  print("=== 부호 연산자 연습 ===")
  print("초기값 - num1:", num1, "num2:", num2, "is_positive:", is_positive)

  # 1. num1의 부호를 바꿔보세요
  num1 = -num1

  # 2. num2의 부호를 바꿔보세요
  num2 = -num2

  # 3. is_positive의 부호를 바꿔보세요
  is_positive = -is_positive

  print("변경 후 - num1:", num1, "num2:", num2, "is_positive:", is_positive)
  # 변경 후 - num1: -15 num2: 8 is_positive: -1
  </code></pre>
</details>

### 조건 연산자 ❓
조건 연산자는 조건에 따라 결과를 선택할 수 있는 연산자입니다. 간결한 표현으로 프로그램의 흐름을 제어할 수 있어 유용합니다.

**기본 구조**: `피연산자1 if 조건식 else 피연산자2`

```python
# 기본 예제
age = 20
status = "성인" if age >= 18 else "미성년자"
print(status)  # 성인

# 숫자 비교
score = 85
grade = "A" if score >= 90 else "B" if score >= 80 else "C"
print(grade)  # B

# 문자열 비교
name = "Alice"
greeting = "안녕하세요!" if name == "Alice" else "안녕!"
print(greeting)  # 안녕하세요!

# 논리 연산과 함께 사용
is_weekend = True
message = "주말이에요!" if is_weekend else "평일이에요!"
print(message)  # 주말이에요!
```

> 💡 **팁**: 조건 연산자는 <span class="blue-text">삼항 연산자</span>라고도 불리며, 간단한 조건문을 한 줄로 표현할 때 유용합니다! 🎯

#### 문제 6 - 조건 연산자 사용하기 (중급) 🎯
> 아래 코드의 주석을 참고하여, 조건 연산자를 사용해 결과를 선택해보세요.

```python
# 기본 변수
temperature = 25
is_sunny = True
time = 14

print("=== 조건 연산자 연습 ===")
print("온도:", temperature, "맑음:", is_sunny, "시간:", time)

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. 온도가 20도 이상이면 "따뜻함", 아니면 "추움"으로 설정
# weather_feeling = 

# 2. 맑고 온도가 25도 이상이면 "해변가기 좋음", 아니면 "실내 활동"으로 설정
# activity = 

# 3. 시간이 12시 이후면 "오후", 아니면 "오전"으로 설정
# time_period = 

# 4. 온도가 30도 이상이거나 맑지 않으면 "에어컨 필요", 아니면 "선풍기면 충분"으로 설정
# cooling = 

print("결과:")
# print("날씨 느낌:", weather_feeling)
# print("추천 활동:", activity)
# print("시간대:", time_period)
# print("냉방 필요성:", cooling)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 기본 변수
  temperature = 25
  is_sunny = True
  time = 14

  print("=== 조건 연산자 연습 ===")
  print("온도:", temperature, "맑음:", is_sunny, "시간:", time)

  # 1. 온도가 20도 이상이면 "따뜻함", 아니면 "추움"으로 설정
  weather_feeling = "따뜻함" if temperature >= 20 else "추움"

  # 2. 맑고 온도가 25도 이상이면 "해변가기 좋음", 아니면 "실내 활동"으로 설정
  activity = "해변가기 좋음" if is_sunny and temperature >= 25 else "실내 활동"

  # 3. 시간이 12시 이후면 "오후", 아니면 "오전"으로 설정
  time_period = "오후" if time >= 12 else "오전"

  # 4. 온도가 30도 이상이거나 맑지 않으면 "에어컨 필요", 아니면 "선풍기면 충분"으로 설정
  cooling = "에어컨 필요" if temperature >= 30 or not is_sunny else "선풍기면 충분"

  print("결과:")
  print("날씨 느낌:", weather_feeling)      # 따뜻함
  print("추천 활동:", activity)             # 해변가기 좋음
  print("시간대:", time_period)             # 오후
  print("냉방 필요성:", cooling)            # 선풍기면 충분
  </code></pre>
</details>

## 2. 연산자의 우선순위 🎯

연산자를 두 개 이상 함께 사용할 때는 연산의 순서가 정해져 있습니다. 이 순서를 <span class="blue-text">연산자의 우선순위</span>라고 합니다. 우선순위에 따라 연산이 수행되고 그 결과가 달라지기 때문에, 개발자에게 연산의 순서는 매우 중요한 개념입니다.

### 연산자 우선순위 표 📊

| 우선순위 | 연산자 | 설명 | 결합 방향 |
|----------|--------|------|-----------|
| 1 (최고) | <span class="yellow-code">()</span> | 괄호 (그룹화) | → |
| 2 | <span class="yellow-code">**</span> | 거듭제곱 | ← |
| 3 | <span class="yellow-code">+x, -x</span> | 양수, 음수 (단항) | → |
| 4 | <span class="yellow-code">*, /, //, %</span> | 곱셈, 나눗셈, 몫, 나머지 | → |
| 5 | <span class="yellow-code">+, -</span> | 덧셈, 뺄셈 | → |
| 6 | <span class="yellow-code"><, <=, >, >=</span> | 비교 연산자 | → |
| 7 | <span class="yellow-code">==, !=</span> | 같음, 다름 | → |
| 8 | <span class="yellow-code">not</span> | 논리 부정 | → |
| 9 | <span class="yellow-code">and</span> | 논리곱 | → |
| 10 | <span class="yellow-code">or</span> | 논리합 | → |
| 11 (최저) | <span class="yellow-code">=, +=, -=, *=, /=, //=, %=, **=</span> | 대입 연산자 | ← |

### 최우선 연산자 괄호 🎯
복잡한 연산을 수행할 때는 우선순위를 한눈에 파악하기 어려울 수 있습니다. 따라서 먼저 처리해야 할 연산을 <span class="blue-text">소괄호</span>로 묶어서 우선순위를 가시적으로 표시하는 것이 좋습니다. 괄호 안에 있는 연산은 최우선 순위로, 다른 연산자보다 먼저 처리됩니다.

```python
# 괄호 없이
result1 = 2 + 3 * 4
print(result1)  # 14 (3 * 4 = 12, 2 + 12 = 14)

# 괄호 사용
result2 = (2 + 3) * 4
print(result2)  # 20 ((2 + 3) = 5, 5 * 4 = 20)

# 복잡한 연산
result3 = (10 + 5) * 2 - 3 ** 2
print(result3)  # 21 ((10 + 5) = 15, 3 ** 2 = 9, 15 * 2 = 30, 30 - 9 = 21)
```

### 연산자의 결합 방향 🔄
파이썬에서 여러 개의 연산자가 함께 사용될 때는 연산 순서뿐만 아니라 <span class="blue-text">결합 방향</span>도 중요합니다. 연산자를 기준으로 결합 방향이 왼쪽에서 오른쪽으로 결합되는지, 오른쪽에서 왼쪽으로 결합되는지에 따라 결과값이 달라지기 때문입니다.

```python
# 결합 방향 예제
num1 = 200
num2 = 300

# 곱셈이 덧셈보다 우선순위가 높음
result1 = num1 * 2 + num2  # 200 * 2 + 300 = 400 + 300 = 700
print("result1:", result1)  # 700

# 괄호로 우선순위 변경
result2 = num1 * (2 + num2)  # 200 * (2 + 300) = 200 * 302 = 60400
print("result2:", result2)  # 60400

# 덧셈과 곱셈의 우선순위
result3 = num1 + 3 * num2  # 200 + 3 * 300 = 200 + 900 = 1100
print("result3:", result3)  # 1100

# 괄호로 우선순위 변경
result4 = (num1 + 3) * num2  # (200 + 3) * 300 = 203 * 300 = 60900
print("result4:", result4)  # 60900
```

#### 문제 7 - 연산자 우선순위 계산하기 (고급) 🎯
> 아래 코드의 연산 결과를 예측해보세요.

```python
# 기본 변수
age = 23
is_student = True

adult_price = 3000
child_price = 2000

print("=== 연산자 우선순위 연습 ===")
print("나이:", age, "학생:", is_student)
print("성인 가격:", adult_price, "어린이 가격:", child_price)

# 할인 조건 계산
discount = (age >= 20) and is_student
print("할인 적용:", discount)

# 최종 가격 계산
final_price = adult_price if age >= 20 else child_price
if discount:
    final_price = final_price * 0.8  # 20% 할인

print("최종 가격:", final_price)
```

#### 연산 순서 퀴즈 🧠
다음 연산의 결과를 선택하세요:

**문제 1**: `3 + 4 * 2`의 결과는?
- <input type="radio" name="quiz1" value="A"> A) 14
- <input type="radio" name="quiz1" value="B"> B) 11  
- <input type="radio" name="quiz1" value="C"> C) 10
- <input type="radio" name="quiz1" value="D"> D) 9

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  
  **정답: B) 11**
  
  계산 과정: `3 + 4 * 2` = `3 + 8` = `11`
  (곱셈이 덧셈보다 우선순위가 높음)
</details>

**문제 2**: `(10 - 2) * 3 + 4`의 결과는?
- <input type="radio" name="quiz2" value="A"> A) 28
- <input type="radio" name="quiz2" value="B"> B) 30
- <input type="radio" name="quiz2" value="C"> C) 32
- <input type="radio" name="quiz2" value="D"> D) 34

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  
  **정답: A) 28**
  
  계산 과정: `(10 - 2) * 3 + 4` = `8 * 3 + 4` = `24 + 4` = `28`
  (괄호 안의 뺄셈이 먼저, 그 다음 곱셈, 마지막에 덧셈)
</details>

**문제 3**: `2 ** 3 * 4 + 1`의 결과는?
- <input type="radio" name="quiz3" value="A"> A) 33
- <input type="radio" name="quiz3" value="B"> B) 35
- <input type="radio" name="quiz3" value="C"> C) 37
- <input type="radio" name="quiz3" value="D"> D) 39

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  
  **정답: A) 33**
  
  계산 과정: `2 ** 3 * 4 + 1` = `8 * 4 + 1` = `32 + 1` = `33`
  (거듭제곱이 곱셈보다 우선순위가 높음)
</details>

> 💡 **팁**: 연산자 우선순위가 복잡할 때는 <span class="blue-text">괄호를 적극 활용</span>하여 의도를 명확하게 표현하는 것이 좋습니다! 코드의 가독성도 높아지고 실수도 줄일 수 있어요! 🎯

