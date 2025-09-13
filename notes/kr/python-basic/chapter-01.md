---
layout: article
title: 1. 변수와 자료형
permalink: /notes/kr/python-basic/chapter-01
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 기초 과정 강의 노트, 변수와 자료형 개념과 활용 방법을 다룹니다.
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

컴퓨터는 프로그램 실행 과정에서 필요한 데이터를 <span class="blue-text">메모리</span>라는 임시 저장 공간에 저장합니다.  
개발자는 프로그램을 만들고 실행하는 데 필요한 값들을 메모리에 미리 저장해 두었다가 필요할 때마다 꺼내 씁니다.  
메모리에 데이터를 저장하기 위해 할당 받은 공간을 <span class="blue-text">변수</span>라고 부릅니다.  
변수는 마치 데이터를 담을 수 있는 <span class="blue-text">상자</span>와 같습니다.

<figure>
    <img src="/notes/assets/python-basic/chapter-01-01.png" width="50%" alt="변수와 자료형 예시">
    <figcaption>변수와 자료형 예시</figcaption>
</figure>

## 1. 주석과 실행문 📝
주석은 코드에 설명이나 필요한 정보 등을 기록하여 사람이 이해하기 쉽게 도와주는 기능으로 프로그램 실행에는 전혀 영향을 미치지 않습니다.  
복잡한 코드를 이해하기 쉽게 하여 개발자들이 코드를 공유하거나 유지 보수할 때 유용하게 사용됩니다.

### 한 줄 주석 💬
```python
# 한 줄 주석
print("Hello Python")
```

### 여러 줄 주석 📄
```python
'''
여러 줄 주석은
작은따옴표로 감싸서 작성할 수 있습니다.
'''

"""
또는 큰따옴표로 감싸서
작성할 수도 있습니다.
"""
```

> 💡 **팁**: <span class="blue-text">실행문</span>은 프로그램이 실제로 동작하면서 각종 작업을 수행하는 코드입니다. 개발자가 컴퓨터에 내리는 명령이라고 할 수 있어요! 🚀

## 2. 변수 사용하기 📦
프로그램에서 변수를 사용하려면 먼저 변수를 저장할 메모리에 공간을 확보해야 합니다. 이를 <span class="blue-text">변수를 선언한다</span>라고 표현합니다.

```python
age = 20
```

변수에 데이터를 저장할 때는 <span class="yellow-code">대입 연산자(=)</span>를 사용합니다.  
대입 연산자를 기준으로 오른쪽 데이터를 왼쪽 상자에 담는다라고 상상하면 이해가 쉬워집니다.

### 변수명 정하기 ✏️
- 영문, 한글, 숫자를 사용
- 대소문자 구분
- 변수명의 첫 글자는 <span class="red-text">숫자로 시작 불가</span>
- 언더바를 제외한 <span class="red-text">특수문자는 사용 불가</span>
- <span class="red-text">파이썬 예약어는 사용 불가</span>

#### 📝 사용 가능한 변수명 체크하기
다음 중 사용 가능한 변수명을 모두 선택하세요:

- <input type="checkbox"> `my_name`
- <input type="checkbox"> `2nd_place`
- <input type="checkbox"> `user@email`
- <input type="checkbox"> `if`
- <input type="checkbox"> `_private`
- <input type="checkbox"> `total_count`

> 💡 **팁**: 파이썬 예약어는 `if`, `for`, `while`, `def`, `class` 등이 있습니다. 이런 단어들은 변수명으로 사용할 수 없어요! ⚠️

### 변수명 표기법 🐍
파이썬에서 변수명을 작성할 때는 보통 <span class="blue-text">스네이크 케이스 표기법</span>을 사용합니다.  
스네이크 케이스 표기법은 단어를 모두 소문자로 작성하고 단어 사이에 언더바를 사용하여 구분하는 방식입니다.

```python
first_name = "지민"
last_name = "김"
user_age = 25
```

### 변수에 데이터 입력하고 사용하기 🎯
이제 우리는 데이터를 변수에 담아두고, 데이터의 값이 필요할 때마다 직접 데이터를 사용하는 대신 변수의 이름을 불러서 그 값을 사용합니다.

```python
# 아이돌 프로필 정보를 변수에 저장해보자! 🎤
name = '민지'
age = 20
address = '''우편번호 12345
서울특별시 강남구'''
boyfriend = None  # 아직 없음 😅
height = 168.3

# 변수에 저장된 값들을 출력해보자
print(name)        # NewJeans 민지
print(age)         # 20
print(address)     # 우편번호 12345
                   # 서울특별시 강남구
print(boyfriend)   # None
print(height)      # 168.3
```

#### 문제 1 - 변수 값 바꾸기 (기초) 🎯
> 아래 코드의 주석을 참고하여, 변수들의 값을 원하는 대로 바꿔보세요.

```python
# 아이돌 프로필 정보
name = '민지'
age = 20
height = 168.3
favorite_color = '보라색'

print("변경 전:", name, age, height, favorite_color)

# TODO: 변수들의 값을 다른 값으로 바꿔보세요
# name = '다른 아이돌 이름'
# age = 다른 나이
# height = 다른 키
# favorite_color = '다른 색상'

print("변경 후:", name, age, height, favorite_color)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 아이돌 프로필 정보
  name = '민지'
  age = 20
  height = 168.3
  favorite_color = '보라색'

  print("변경 전:", name, age, height, favorite_color)

  # 변수들의 값을 다른 값으로 바꿔보세요
  name = '덱스'
  age = 30
  height = 178.6
  favorite_color = '파란색'

  print("변경 후:", name, age, height, favorite_color)
  </code></pre>
</details>

#### 문제 2 - 변수 스위칭하기 (중급) 🔄
> 아래 코드의 주석을 참고하여, 두 변수의 값을 서로 바꿔보세요.

```python
# 두 개의 변수
a = '사과'
b = '바나나'

print("스위칭 전:", a, b)  # 사과 바나나

# TODO: a와 b의 값을 서로 바꿔보세요
# 힌트: 임시 변수를 사용하거나, 파이썬의 특별한 문법을 사용할 수 있어요

print("스위칭 후:", a, b)  # 바나나 사과
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 두 개의 변수
  a = '사과'
  b = '바나나'

  print("스위칭 전:", a, b)  # 사과 바나나

  # 방법 1: 임시 변수 사용
  temp = a
  a = b
  b = temp

  # 방법 2: 파이썬의 특별한 문법 (더 간단!)
  # a, b = b, a

  print("스위칭 후:", a, b)  # 바나나 사과
  </code></pre>
</details>

## 3. 자료형 🗂️

파이썬에서 <span class="blue-text">자료형(Data Type)</span>은 변수에 저장할 수 있는 데이터의 종류를 나타냅니다.  
파이썬은 <span class="yellow-code">동적 타입 언어</span>이므로 변수를 선언할 때 자료형을 명시하지 않아도 자동으로 판단합니다.

### 주요 자료형 📊
- <span class="blue-text">숫자형</span>: 정수(`int`), 실수(`float`)
- <span class="blue-text">문자열</span>: 텍스트 데이터(`str`)
- <span class="blue-text">불린형</span>: 참/거짓 값(`bool`)
- <span class="blue-text">None</span>: 빈 값(`NoneType`)

> 💡 **팁**: <span class="yellow-code">type()</span> 함수를 사용하면 변수의 자료형을 확인할 수 있어요! 🔍  
> 예: `print(type(age))` → `<class 'int'>`

### 숫자형 🔢
숫자형은 수를 나타내는 자료형으로, 정수(`int`), 실수(`float`) 두 가지가 있습니다.

#### 정수형(int) 🔢
<span class="blue-text">정수형</span>은 소수점이 없는 숫자를 저장하는 자료형입니다.  
양의 정수, 음의 정수, 0을 모두 포함하며, 프로그래밍에서는 <span class="yellow-code">int</span>라고 표기합니다.

```python
num1 = 10
num2 = -5
num3 = 0

print(num1)  # 10
print(num2)  # -5
print(num1 + num2)  # 5

num4 = num1 + num2
print(num4)  # 5

print(type(num1))  # <class 'int'>
```

> 💡 **팁**: <span class="yellow-code">int()</span> 함수를 이용하면 다른 자료형의 값을 정수형 데이터로 변환할 수 있습니다. 🔄
> 예: `int(3.14)` → `3`, `int('10')` → `10`, `int(True)` → `1`

#### 실수형(float) 📈
<span class="blue-text">실수형</span>은 소수점이 있는 숫자를 저장하는 자료형입니다.  
양의 실수, 음의 실수, 0을 모두 포함하며, 프로그래밍에서는 <span class="yellow-code">float</span>라고 표기합니다.

```python
num1 = 3.14
num2 = -2.71

print(num1)  # 3.14
print(num1 + num2)  # 0.43

# 실수와 정수를 함께 연산하면 결과는 항상 실수형이 됩니다.
print(3.0 - 3)  # 0.14
```

#### 복소수형 🧮
실수와 달리, <span class="blue-text">복소수형</span>은 실수와 허수(i)를 포함하는 숫자를 나타냅니다. 실수부와 허수부는 다음과 같이 표현할 수 있습니다.

```python
z = 3 + 4j  # 3은 실수부, 4는 허수부, j는 허수 단위
```

복소수형은 파이썬이 제공하는 특별한 자료형으로 다른 프로그래밍 언어에서는 익숙하지 않은 자료형입니다. 주로 <span class="blue-text">공학이나 물리학</span>에서 사용됩니다. 🔬

### 불 자료형 ✅
#### 논리형(bool)
논리형은 논리값을 저장할 수 있는 자료형으로 <span class="green-text">True</span> 또는 <span class="red-text">False</span>의 두 가지 값만 가질 수 있습니다. 남녀 성별, 찬반 투표, 존재 여부, 포함 유무 등과 같이 오직 두 가지 선택 사항으로 판단되는 상황에 사용됩니다.

```python
like_python = True
like_python = False
```

개발자가 직접 <span class="green-text">True</span>/<span class="red-text">False</span> 값을 변수에 대입하는 방법도 있지만, 하나의 논리 연산의 결과를 변수에 대입할 수도 있습니다.

```python
x = 100
y = 90

result = x > y

print(result)  # True
```

불 자료형은 <span class="blue-text">논리 연산</span>을 수행하거나 <span class="blue-text">조건문</span>을 제어하는 데 효과적으로 사용 가능합니다.

```python
bool(0)     # False
bool('')    # False
bool([])    # False
```

> 💡 **팁**: <span class="yellow-code">bool()</span> 함수는 빈 값들(0, 빈 문자열, 빈 리스트 등)을 <span class="red-text">False</span>로, 그 외의 값들을 <span class="green-text">True</span>로 변환합니다! 🔄

### 문자열 📝
문자열은 텍스트를 표현하는 데 사용됩니다. 여러 문자가 연결된 하나의 열을 말합니다. 작은따옴표나 큰따옴표로 둘러싸서 표현되지만, 삼중 따옴표를 사용하는 방법도 있습니다.

#### 문자열 생성 🏗️
1. **큰따옴표와 작은따옴표로 문자열 만들기**
```python
name = "Kim"
name = 'Lee'
```

2. **삼중 따옴표로 문자열 만들기**
```python
# 여러 줄 문자열
text = """안녕하세요.
파이썬을 배우고 있습니다.
문자열을 다루는 방법을 학습 중입니다."""

# 또는
text = '''여러 줄 문자열은
삼중 따옴표로 만들 수 있습니다.'''
```

> 💡 **팁**: 문자열 내에 따옴표가 사용되는 경우, 서로 다른 종류의 따옴표를 사용하거나 이스케이프 문자를 활용할 수 있습니다.
> 예: `"He said 'Hello' to me."`, `'He said "Hello" to me.'`, `"He said \"Hello\" to me."`

#### 문자열 연산 ⚙️

파이썬은 문자열을 조작하고 변형할 수 있는 다양한 연산을 제공합니다. 문자열을 합치거나 반복하며 특정 부분을 추출하거나 검색하는 등의 연산들이 가능합니다.

**문자열 합치기** 🔗
```python
first_name = "배"
last_name = "수지"
age = 32

# + 연산자로 문자열 합치기
full_name = first_name + last_name
print(full_name)  # 배수지

# 공백을 포함한 합치기
full_name_with_space = first_name + " " + last_name
print(full_name_with_space)  # 배 수지

# 문자열과 숫자 합치기 (문자열로 변환 필요)
introduction = "안녕하세요, 저는 " + full_name + "이고, 나이는 " + str(age) + "세입니다."
print(introduction)  # 안녕하세요, 저는 배수지이고, 나이는 32세입니다.
```

**문자열 반복하기** 🔄

```python
# * 연산자로 문자열 반복
cheer = "파이팅! "
excited_cheer = cheer * 3
print(excited_cheer)  # 파이팅! 파이팅! 파이팅!

# 구분선 만들기
line = "-" * 20
print(line)  # --------------------
```

> 💡 **팁**: 문자열에서는 나눗셈 연산(/)을 사용할 수 없습니다. 문자열은 나눗셈이 의미가 없기 때문입니다. ⚠️
> 예: `"Hello" / 2` → <span class="red-text">오류 발생</span>

### 문자열 인덱싱 🎯

문자열의 각 문자는 고유한 번호를 가집니다. 이를 <span class="blue-text">인덱스</span>라고 합니다. 파이썬에서는 숫자를 0부터 세기 때문에 인덱스는 항상 0부터 시작합니다.

| 문자 | H | E | L | L | O |
|------|---|---|---|---|---|
| 인덱스 | 0 | 1 | 2 | 3 | 4 |

우리는 이 <span class="yellow-code">인덱스 값</span>을 사용하여 문자열에서 특정 문자를 추출할 수 있습니다.

```python
word = "HELLO"

# 첫 번째 문자 (인덱스 0)
first_char = word[0]
print(first_char)  # H

# 세 번째 문자 (인덱스 2)
third_char = word[2]
print(third_char)  # L

# 마지막 문자 (인덱스 4)
last_char = word[4]
print(last_char)  # O

# 음수 인덱스 사용 (뒤에서부터 세기)
last_char_negative = word[-1]
print(last_char_negative)  # O

second_last = word[-2]
print(second_last)  # L
```

#### 문제 3 - 문자열 연산하기 (기초) 🔤
> 아래 코드의 주석을 참고하여, 문자열 연산을 사용해 완성해보세요.

```python
# 기본 정보
first_name = "황"
last_name = "현진"
age = 29
hobby = "게임"

print("=== 자기소개 만들기 ===")

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. first_name과 last_name을 합쳐서 full_name 만들기
# full_name = 

# 2. "안녕하세요, 저는 [full_name]입니다." 문장 만들기
# greeting = 

# 3. hobby를 3번 반복해서 excited_hobby 만들기
# excited_hobby = 

# 4. 나이를 문자열로 변환해서 "나이는 [age]세입니다." 문장 만들기
# age_info = 

print("완성된 자기소개:")
# print(greeting)
# print("나이는", age, "세입니다.")
# print("취미는", excited_hobby, "입니다!")
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 기본 정보
  first_name = "황"
  last_name = "현진"
  age = 29
  hobby = "게임"

  print("=== 자기소개 만들기 ===")

  # 1. first_name과 last_name을 합쳐서 full_name 만들기
  full_name = first_name + last_name

  # 2. "안녕하세요, 저는 [full_name]입니다." 문장 만들기
  greeting = "안녕하세요, 저는 " + full_name + "입니다."

  # 3. hobby를 3번 반복해서 excited_hobby 만들기
  excited_hobby = hobby * 3

  # 4. 나이를 문자열로 변환해서 "나이는 [age]세입니다." 문장 만들기
  age_info = "나이는 " + str(age) + "세입니다."

  print("완성된 자기소개:")
  print(greeting)
  print(age_info)
  print("취미는", excited_hobby, "입니다!")
  </code></pre>
</details>

#### 문제 4 - 문자열 인덱싱하기 (중급) 🎯
> 아래 코드의 주석을 참고하여, 문자열 인덱싱을 사용해 특정 문자를 추출해보세요.

```python
# 주어진 문자열
word = "PYTHON"
sentence = "Hello World"

print("=== 문자열 인덱싱 연습 ===")

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. word에서 첫 번째 문자 추출하기 (인덱스 0)
# first_char = 

# 2. word에서 마지막 문자 추출하기 (양수 인덱스 사용)
# last_char = 

# 3. word에서 마지막 문자 추출하기 (음수 인덱스 사용)
# last_char_negative = 

# 4. sentence에서 "W" 문자 추출하기
# w_char = 

# 5. sentence에서 "d" 문자 추출하기 (음수 인덱스 사용)
# d_char = 

print("추출된 문자들:")
# print("첫 번째 문자:", first_char)
# print("마지막 문자 (양수):", last_char)
# print("마지막 문자 (음수):", last_char_negative)
# print("W 문자:", w_char)
# print("d 문자:", d_char)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 주어진 문자열
  word = "PYTHON"
  sentence = "Hello World"

  print("=== 문자열 인덱싱 연습 ===")

  # 1. word에서 첫 번째 문자 추출하기 (인덱스 0)
  first_char = word[0]

  # 2. word에서 마지막 문자 추출하기 (양수 인덱스 사용)
  last_char = word[5]

  # 3. word에서 마지막 문자 추출하기 (음수 인덱스 사용)
  last_char_negative = word[-1]

  # 4. sentence에서 "W" 문자 추출하기
  w_char = sentence[6]

  # 5. sentence에서 "d" 문자 추출하기 (음수 인덱스 사용)
  d_char = sentence[-1]

  print("추출된 문자들:")
  print("첫 번째 문자:", first_char)
  print("마지막 문자 (양수):", last_char)
  print("마지막 문자 (음수):", last_char_negative)
  print("W 문자:", w_char)
  print("d 문자:", d_char)
  </code></pre>
</details>

### 문자열 슬라이싱 ✂️

인덱스를 사용하여 특정 문자를 추출할 수 있을 뿐만 아니라, 문자열의 일부를 원하는 만큼 잘라내는 것도 가능합니다.  
이를 <span class="blue-text">슬라이싱</span>이라고 합니다.  
슬라이싱은 한 문자 이상으로 구성된 단어나 문장을 추출할 때 유용합니다.

문자열 슬라이싱의 기본 구조는 다음과 같습니다.  
`문자열을 담은 변수명[start:stop:step]`

- <span class="blue-text">start</span>(시작 인덱스): 슬라이싱을 시작할 위치를 지정합니다. 이 값은 생략할 수 있으며, 기본 값은 0입니다.
- <span class="blue-text">stop</span>(종료 인덱스): 슬라이싱을 종료할 위치를 지정합니다. 이 값은 생략할 수 있으며, 기본 값은 문자열의 끝입니다.
- <span class="blue-text">step</span>(간격): 슬라이싱할 때 건너뛸 간격을 지정합니다. 이 값은 생략할 수 있으며, 기본 값은 1입니다.

| 문자 | I |   | L | o | v | e |   | P | y | t | h | o | n |
|------|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 인덱스 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |

```python
text = "I Love Python"

# 기본 슬라이싱 (start:stop)
substring1 = text[2:6]    # "Love"
print(substring1)         # Love

# 시작 인덱스 생략 (처음부터)
substring2 = text[:6]     # "I Love"
print(substring2)         # I Love

# 종료 인덱스 생략 (끝까지)
substring3 = text[7:]     # "Python"
print(substring3)         # Python

# 음수 인덱스 사용
substring4 = text[-6:]    # "Python"
print(substring4)         # Python

# step 사용 (간격으로 추출)
substring5 = text[::2]    # "ILv yhn"
print(substring5)         # ILv yhn

# 역순으로 추출
substring6 = text[::-1]   # "nohtyP evoL I"
print(substring6)         # nohtyP evoL I
```

> 💡 **팁**: 슬라이싱에서 <span class="yellow-code">stop</span> 인덱스는 포함되지 않습니다! 예를 들어 `text[2:6]`은 인덱스 2부터 5까지(6은 제외)를 추출합니다. 🎯

#### 문제 5 - 문자열 슬라이싱하기 (중급) 🎯
> 아래 코드의 주석을 참고하여, 문자열 슬라이싱을 사용해 특정 부분을 추출해보세요.

```python
# 주어진 문자열
sentence = "Hello World Python"
word = "Programming"

print("=== 문자열 슬라이싱 연습 ===")

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. sentence에서 "World" 추출하기
# world = 

# 2. sentence에서 "Python" 추출하기 (음수 인덱스 사용)
# python = 

# 3. word에서 "Program" 추출하기
# program = 

# 4. word에서 "ming" 추출하기 (음수 인덱스 사용)
# ming = 

# 5. word에서 홀수 번째 문자들만 추출하기 (step=2)
# odd_chars = 

print("추출된 문자열들:")
# print("World:", world)
# print("Python:", python)
# print("Program:", program)
# print("ming:", ming)
# print("홀수 번째 문자들:", odd_chars)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 주어진 문자열
  sentence = "Hello World Python"
  word = "Programming"

  print("=== 문자열 슬라이싱 연습 ===")

  # 1. sentence에서 "World" 추출하기
  world = sentence[6:11]

  # 2. sentence에서 "Python" 추출하기 (음수 인덱스 사용)
  python = sentence[-6:]

  # 3. word에서 "Program" 추출하기
  program = word[:7]

  # 4. word에서 "ming" 추출하기 (음수 인덱스 사용)
  ming = word[-4:]

  # 5. word에서 홀수 번째 문자들만 추출하기 (step=2)
  odd_chars = word[::2]

  print("추출된 문자열들:")
  print("World:", world)
  print("Python:", python)
  print("Program:", program)
  print("ming:", ming)
  print("홀수 번째 문자들:", odd_chars)
  </code></pre>
</details>

### 문자열 처리 유용한 함수 🛠️

#### 문자열 길이 📏

```python
text = "Hello World"
length = len(text)
print(length)  # 11

# 빈 문자열의 길이
empty = ""
print(len(empty))  # 0
```

> 💡 **팁**: <span class="yellow-code">len()</span> 함수는 문자열의 문자 개수를 반환합니다. 공백도 하나의 문자로 계산됩니다! 📊

#### 문자열을 대문자로 변환 🔤

```python
text = "hello world"
upper_text = text.upper()
print(upper_text)  # HELLO WORLD

# 원본은 변경되지 않음
print(text)  # hello world
```

#### 문자열을 소문자로 변환 📝

```python
text = "HELLO WORLD"
lower_text = text.lower()
print(lower_text)  # hello world

# 원본은 변경되지 않음
print(text)  # HELLO WORLD
```

> 💡 **팁**: <span class="yellow-code">upper()</span>와 <span class="yellow-code">lower()</span> 메서드는 원본 문자열을 변경하지 않고 새로운 문자열을 반환합니다! 🔄