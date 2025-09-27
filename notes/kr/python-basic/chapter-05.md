---
layout: article
title: 5. 리스트
permalink: /notes/kr/python-basic/chapter-05
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 기초 과정 강의 노트, 리스트 개념과 활용 방법을 다룹니다.
keywords: "Python, 변수, 자료형, 기초 과정, 데이터 처리, 프로그래밍, 리스트"
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

리스트는 <span class="blue-text">여러 개의 데이터를 하나의 변수에 저장하고 관리</span>할 수 있는 자료구조입니다.  
파이썬은 개발자가 편리하게 사용할 수 있도록 다양한 자료구조를 제공하며, 그 중에서도 <span class="blue-text">리스트가 가장 많이 사용</span>됩니다.  
일상 생활에서 사용하는 목록과 비슷한 개념으로, 프로그래밍에서 데이터를 효율적으로 처리할 수 있게 해줍니다.

## 리스트 기본 개념 📋

### 리스트란?

리스트는 <span class="blue-text">대괄호([])를 사용하여 감싸고 그 안에 저장할 데이터를 쉼표로 구분</span>하여 만듭니다.  
파이썬의 리스트는 다른 프로그래밍 언어와 달리 <span class="blue-text">다양한 자료형을 혼합하여 저장</span>할 수 있습니다.

```python
# 기본 리스트 예제
num = 7                    # 단일 변수
nums = [0, 1, 2, 3]       # 숫자 리스트

# 다양한 자료형 리스트
numbers = [1, 2, 3, 4, 5]                    # 숫자 리스트
letters = ['a', 'b', 'c', 'd']               # 문자 리스트
booleans = [True, False, True]                # 논리값 리스트
names = ['김철수', '이영희', '박민수']         # 문자열 리스트

# 혼합 자료형 리스트 (파이썬만의 특징!)
mixed = [1, 'hello', True, 3.14, 'world']
```

> 💡 **팁**: 파이썬 리스트는 <span class="blue-text">다양한 자료형을 자유롭게 혼합</span>하여 저장할 수 있어 매우 유연합니다! 🎯

## 1. 리스트 요소와 인덱싱 🔢

### 리스트 요소

리스트에 들어가는 항목을 <span class="blue-text">요소(element)</span> 또는 <span class="blue-text">엘리먼트</span>라고 부릅니다.  
실제 프로그래밍에서는 리스트의 각 요소를 하나씩 다루는 경우가 많습니다.

### 인덱스 개념

리스트의 특정 요소에 접근하기 위해서는 <span class="blue-text">위치를 사용</span>합니다.  
이 위치를 파악하기 위해 사용하는 번호를 <span class="blue-text">인덱스</span>라고 부르며, <span class="red-text">0부터 시작</span>합니다.

리스트의 각 요소는 고유한 번호를 가집니다. 이를 <span class="blue-text">인덱스</span>라고 합니다. 파이썬에서는 숫자를 0부터 세기 때문에 인덱스는 항상 0부터 시작합니다.

| 요소 | 오애순 | 양관식 | 부상길 | 염병철 |
|------|--------|--------|--------|--------|
| 양수 인덱스 | 0 | 1 | 2 | 3 |
| 음수 인덱스 | -4 | -3 | -2 | -1 |

우리는 이 <span class="yellow-code">인덱스 값</span>을 사용하여 리스트에서 특정 요소를 추출할 수 있습니다.

```python
# 인덱스 사용 예제
names = ['오애오', '양관식', '부상길', '염병철']

# 양수 인덱스 (0부터 시작)
first_name = names[0]    # '방탄소년단'
second_name = names[1]   # '아이유'
third_name = names[2]    # '트와이스'
last_name = names[3]     # '뉴진스'

# 음수 인덱스 (뒤에서부터 시작)
last_name = names[-1]    # '뉴진스' (마지막 요소)
second_last = names[-2]  # '트와이스'
first_name = names[-4]   # '방탄소년단' (첫 번째 요소)

print(f"첫 번째: {first_name}")
print(f"마지막: {last_name}")
```

> ⚠️ **주의**: 인덱스는 <span class="red-text">0부터 시작</span>하므로, 리스트의 길이가 n이면 유효한 인덱스는 0부터 n-1까지입니다! 🔍

### 문자열도 리스트의 한 종류

문자열의 글자 하나하나를 사용하고 싶을 때도 인덱스를 이용할 수 있습니다.

```python
# 문자열 인덱싱
word = "Python"
print(word[0])    # 'P'
print(word[1])    # 'y'
print(word[-1])   # 'n'
print(word[-2])   # 'o'
```

#### 문제 1 - 리스트 인덱싱 연습 (기초) 🎯
> 아래 코드의 주석을 참고하여, 리스트 인덱싱을 연습해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
fruits = ['사과', '바나나', '오렌지', '포도', '딸기']

# 1. 첫 번째 과일 출력
# first_fruit = 
# print("첫 번째 과일:", first_fruit)

# 2. 마지막 과일 출력 (음수 인덱스 사용)
# last_fruit = 
# print("마지막 과일:", last_fruit)

# 3. 세 번째 과일 출력
# third_fruit = 
# print("세 번째 과일:", third_fruit)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  fruits = ['사과', '바나나', '오렌지', '포도', '딸기']

  # 1. 첫 번째 과일 출력
  first_fruit = fruits[0]
  print("첫 번째 과일:", first_fruit)

  # 2. 마지막 과일 출력 (음수 인덱스 사용)
  last_fruit = fruits[-1]
  print("마지막 과일:", last_fruit)

  # 3. 세 번째 과일 출력
  third_fruit = fruits[2]
  print("세 번째 과일:", third_fruit)

  # 실행 결과:
  # 첫 번째 과일: 사과
  # 마지막 과일: 딸기
  # 세 번째 과일: 오렌지
  </code></pre>
</details>

## 2. 리스트 슬라이싱 ✂️

문자열 슬라이싱과 마찬가지로 리스트도 인덱싱을 사용하여 <span class="blue-text">원하는 범위의 요소만 추출</span>하여 새로운 리스트를 만들거나 수정할 수 있습니다.  
이 과정을 <span class="blue-text">슬라이싱</span>이라고 합니다.

### 슬라이싱 기본 구조

```python
리스트[start:stop:step]
```

- <span class="yellow-code">start</span>: 시작 인덱스 (포함)
- <span class="yellow-code">stop</span>: 종료 인덱스 (제외)
- <span class="yellow-code">step</span>: 간격 (생략 시 1)

### 슬라이싱 예제

```python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 기본 슬라이싱
print(numbers[2:5])      # [2, 3, 4] (2부터 5 미만)
print(numbers[:3])       # [0, 1, 2] (처음부터 3 미만)
print(numbers[7:])       # [7, 8, 9] (7부터 끝까지)
print(numbers[:])        # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] (전체)

# 간격을 사용한 슬라이싱
print(numbers[::2])      # [0, 2, 4, 6, 8] (2씩 건너뛰기)
print(numbers[1::2])     # [1, 3, 5, 7, 9] (1부터 2씩 건너뛰기)
print(numbers[::-1])     # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (역순)

# 음수 인덱스 슬라이싱
print(numbers[-3:])      # [7, 8, 9] (뒤에서 3개)
print(numbers[:-2])      # [0, 1, 2, 3, 4, 5, 6, 7] (뒤에서 2개 제외)
```

> 💡 **팁**: 슬라이싱 시 <span class="green-text">범위를 초과해도 예외가 발생하지 않습니다</span>! 인덱스 접근과 달리 안전합니다! 🛡️

#### 문제 2 - 리스트 슬라이싱 연습 (기초) 🎯
> 아래 코드의 주석을 참고하여, 슬라이싱을 연습해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
colors = ['빨강', '주황', '노랑', '초록', '파랑', '남색', '보라']

# 1. 처음 3개 색상 출력
# first_three = 
# print("처음 3개:", first_three)

# 2. 마지막 2개 색상 출력
# last_two = 
# print("마지막 2개:", last_two)

# 3. 2번째부터 5번째까지 출력
# middle_colors = 
# print("중간 색상들:", middle_colors)

# 4. 역순으로 출력
# reversed_colors = 
# print("역순:", reversed_colors)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  colors = ['빨강', '주황', '노랑', '초록', '파랑', '남색', '보라']

  # 1. 처음 3개 색상 출력
  first_three = colors[:3]
  print("처음 3개:", first_three)

  # 2. 마지막 2개 색상 출력
  last_two = colors[-2:]
  print("마지막 2개:", last_two)

  # 3. 2번째부터 5번째까지 출력
  middle_colors = colors[1:5]
  print("중간 색상들:", middle_colors)

  # 4. 역순으로 출력
  reversed_colors = colors[::-1]
  print("역순:", reversed_colors)

  # 실행 결과:
  # 처음 3개: ['빨강', '주황', '노랑']
  # 마지막 2개: ['남색', '보라']
  # 중간 색상들: ['주황', '노랑', '초록', '파랑']
  # 역순: ['보라', '남색', '파랑', '초록', '노랑', '주황', '빨강']
  </code></pre>
</details>

## 3. 리스트 연산 🔗

파이썬의 리스트는 <span class="blue-text">리스트 간의 다양한 연산도 간단한 연산자로 수행</span>할 수 있도록 지원합니다.  
마치 숫자 연산처럼 리스트를 간단한 연산자를 통해 결합하거나 비교할 수 있습니다.

### 리스트 결합

여러 개의 리스트를 하나의 리스트로 합쳐 새로운 리스트를 만드는 연산입니다.

#### + 연산자 사용

```python
# + 연산자로 리스트 결합
list1 = ["A", "B", "C"]
list2 = ["D", "E"]
list3 = ["F", "G", "H"]

# 두 리스트 결합
combined = list1 + list2
print(combined)  # ['A', 'B', 'C', 'D', 'E']

# 여러 리스트 결합
all_lists = list1 + list2 + list3
print(all_lists)  # ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
```

#### extend() 메서드 사용

```python
# extend() 메서드로 리스트 결합
list1 = ["A", "B", "C"]
list2 = ["D", "E"]

print("extend() 전:", list1)  # ['A', 'B', 'C']
list1.extend(list2)
print("extend() 후:", list1)  # ['A', 'B', 'C', 'D', 'E']
```

> 💡 **차이점**: <span class="blue-text">+ 연산자</span>는 새로운 리스트를 생성하지만, <span class="blue-text">extend() 메서드</span>는 기존 리스트를 수정합니다! 🔄

### 리스트 반복

하나의 리스트를 여러 번 반복하여 결합하고 싶은 경우 사용합니다.

```python
# * 연산자로 리스트 반복
base_list = ["Hello", "World"]
repeated = base_list * 3
print(repeated)  # ['Hello', 'World', 'Hello', 'World', 'Hello', 'World']

# + 연산자로 반복 (비효율적)
manual_repeat = base_list + base_list + base_list
print(manual_repeat)  # ['Hello', 'World', 'Hello', 'World', 'Hello', 'World']
```

## 4. 리스트 메서드 🛠️

파이썬의 리스트는 단순한 연산뿐만 아니라, 개발자가 리스트를 더욱 효율적으로 활용할 수 있도록 <span class="blue-text">다양한 메서드</span>를 제공합니다.

### 리스트 추가: append(), insert()

#### append() 메서드

리스트의 <span class="blue-text">마지막에 새로운 요소를 추가</span>합니다.

```python
# append() 메서드 예제
fruits = ['사과', '바나나']
print("추가 전:", fruits)  # ['사과', '바나나']

fruits.append('오렌지')
print("추가 후:", fruits)  # ['사과', '바나나', '오렌지']

fruits.append('포도')
print("최종:", fruits)  # ['사과', '바나나', '오렌지', '포도']
```

#### insert() 메서드

<span class="blue-text">원하는 특정 위치에 자유롭게 요소를 삽입</span>할 수 있습니다.

```python
# insert() 메서드 예제
fruits = ['사과', '바나나', '포도']
print("삽입 전:", fruits)  # ['사과', '바나나', '포도']

# 1번 인덱스에 '오렌지' 삽입
fruits.insert(1, '오렌지')
print("삽입 후:", fruits)  # ['사과', '오렌지', '바나나', '포도']

# 맨 앞에 삽입
fruits.insert(0, '딸기')
print("맨 앞 삽입:", fruits)  # ['딸기', '사과', '오렌지', '바나나', '포도']
```

> 💡 **팁**: <span class="yellow-code">append()</span>는 마지막에만 추가 가능하지만, <span class="yellow-code">insert()</span>는 원하는 위치에 자유롭게 삽입할 수 있습니다! 🎯

#### 문제 3 - 리스트 추가 연습 (중급) 🎯
> 아래 코드의 주석을 참고하여, append()와 insert()를 사용해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
shopping_list = ['우유', '빵']

# 1. append()로 '계란' 추가

# 2. insert()로 '사과'를 맨 앞에 추가

# 3. insert()로 '치즈'를 2번째 위치에 추가

# print("최종 쇼핑 리스트:", shopping_list)
# 예상 결과: ['사과', '우유', '치즈', '빵', '계란']
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  shopping_list = ['우유', '빵']

  # 1. append()로 '계란' 추가
  shopping_list.append('계란')

  # 2. insert()로 '사과'를 맨 앞에 추가
  shopping_list.insert(0, '사과')

  # 3. insert()로 '치즈'를 2번째 위치에 추가
  shopping_list.insert(2, '치즈')

  print("최종 쇼핑 리스트:", shopping_list)
  # 실행 결과: ['사과', '우유', '치즈', '빵', '계란']
  </code></pre>
</details>

### 리스트 삭제: remove(), pop()

리스트 요소를 삭제하는 방법에는 두 가지가 있습니다.

#### remove() 메서드

<span class="blue-text">특정 값을 가진 요소를 삭제</span>합니다.

```python
# remove() 메서드 예제
fruits = ['사과', '바나나', '오렌지', '바나나']
print("삭제 전:", fruits)  # ['사과', '바나나', '오렌지', '바나나']

fruits.remove('바나나')
print("삭제 후:", fruits)  # ['사과', '오렌지', '바나나'] (첫 번째 '바나나'만 삭제)

# 존재하지 않는 값 삭제 시도 (에러 발생)
# fruits.remove('포도')  # ValueError: list.remove(x): x not in list
```

> ⚠️ **주의**: <span class="red-text">동일한 값이 여러 개 있어도 처음 발견된 하나만 삭제</span>됩니다! 삭제할 값이 없으면 예외가 발생합니다! 🚨

#### pop() 메서드

<span class="blue-text">특정 위치에 있는 요소를 삭제하고 그 값을 반환</span>합니다.

```python
# pop() 메서드 예제
fruits = ['사과', '바나나', '오렌지', '포도']
print("삭제 전:", fruits)  # ['사과', '바나나', '오렌지', '포도']

# 특정 위치 삭제
removed = fruits.pop(1)
print(f"삭제된 요소: {removed}")  # 삭제된 요소: 바나나
print("삭제 후:", fruits)  # ['사과', '오렌지', '포도']

# 매개변수 없이 사용 (마지막 요소 삭제)
last_item = fruits.pop()
print(f"마지막 요소: {last_item}")  # 마지막 요소: 포도
print("최종:", fruits)  # ['사과', '오렌지']
```

> 💡 **차이점**: <span class="yellow-code">remove()</span>는 값을 기준으로 삭제하고 반환값이 없지만, <span class="yellow-code">pop()</span>은 인덱스를 기준으로 삭제하고 삭제된 값을 반환합니다! 🔄

### 리스트 길이 확인: len()

리스트의 길이를 확인하는 데 사용하는 함수입니다.

```python
# len() 함수 예제
fruits = ['사과', '바나나', '오렌지']
print(f"리스트 길이: {len(fruits)}")  # 리스트 길이: 3

# 빈 리스트
empty_list = []
print(f"빈 리스트 길이: {len(empty_list)}")  # 빈 리스트 길이: 0

# 리스트 순회와 함께 사용
for i in range(len(fruits)):
    print(f"{i+1}번째 과일: {fruits[i]}")
```

### 리스트 정렬: sort(), sorted()

데이터를 분석하거나 활용하기 위해서는 정렬된 상태로 유지하는 것이 중요합니다.

#### sort() 메서드

리스트를 <span class="blue-text">자동으로 정렬하여 원본 리스트를 변경</span>합니다.

```python
# sort() 메서드 예제
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
print("정렬 전:", numbers)  # [3, 1, 4, 1, 5, 9, 2, 6]

numbers.sort()
print("오름차순 정렬:", numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# 내림차순 정렬
numbers.sort(reverse=True)
print("내림차순 정렬:", numbers)  # [9, 6, 5, 4, 3, 2, 1, 1]
```

#### sorted() 함수

<span class="blue-text">새로운 정렬된 리스트를 반환</span>하며, 원본 리스트는 변경되지 않습니다.

```python
# sorted() 함수 예제
original = [3, 1, 4, 1, 5, 9, 2, 6]
print("원본:", original)  # [3, 1, 4, 1, 5, 9, 2, 6]

# 오름차순 정렬
ascending = sorted(original)
print("오름차순:", ascending)  # [1, 1, 2, 3, 4, 5, 6, 9]
print("원본 유지:", original)  # [3, 1, 4, 1, 5, 9, 2, 6]

# 내림차순 정렬
descending = sorted(original, reverse=True)
print("내림차순:", descending)  # [9, 6, 5, 4, 3, 2, 1, 1]
```

### 리스트 반전: reverse()

리스트의 요소 순서를 반전시켜 원본 리스트를 변경합니다.

```python
# reverse() 메서드 예제
numbers = [1, 2, 3, 4, 5]
print("반전 전:", numbers)  # [1, 2, 3, 4, 5]

numbers.reverse()
print("반전 후:", numbers)  # [5, 4, 3, 2, 1]
```

### 요소 존재 확인: in 키워드

리스트에 특정 값이 존재하는지 확인하는 데 사용합니다.

```python
# in 키워드 예제
fruits = ['사과', '바나나', '오렌지']

# 요소 존재 확인
print('사과' in fruits)    # True
print('포도' in fruits)    # False

# not in 사용
print('포도' not in fruits)  # True
print('사과' not in fruits)  # False

# 조건문과 함께 사용
if '바나나' in fruits:
    print("바나나가 있습니다!")
else:
    print("바나나가 없습니다.")
```

### 리스트를 문자열로 변환: join()

리스트의 요소들을 하나의 문자열로 연결합니다.

```python
# join() 메서드 예제
words = ['Hello', 'World', 'Python']
sentence = ' '.join(words)
print(sentence)  # Hello World Python

# 다른 구분자 사용
fruits = ['사과', '바나나', '오렌지']
fruit_string = ', '.join(fruits)
print(fruit_string)  # 사과, 바나나, 오렌지

# 빈 문자열로 연결
letters = ['P', 'y', 't', 'h', 'o', 'n']
word = ''.join(letters)
print(word)  # Python
```

## 5. 실전 예제 🚀

### 예제 1: 학생 성적 관리

```python
# 학생 성적 리스트
scores = [85, 92, 78, 96, 88, 73, 91, 87]

# 성적 통계 계산
total = sum(scores)
average = total / len(scores)
highest = max(scores)
lowest = min(scores)

print(f"총점: {total}")
print(f"평균: {average:.2f}")
print(f"최고점: {highest}")
print(f"최저점: {lowest}")

# 90점 이상 학생 수
high_scores = [score for score in scores if score >= 90]
print(f"90점 이상 학생 수: {len(high_scores)}")
```

### 예제 2: 쇼핑 리스트 관리

```python
# 쇼핑 리스트 관리 시스템
shopping_list = []

def add_item(item):
    shopping_list.append(item)
    print(f"'{item}'이(가) 추가되었습니다.")

def remove_item(item):
    if item in shopping_list:
        shopping_list.remove(item)
        print(f"'{item}'이(가) 삭제되었습니다.")
    else:
        print(f"'{item}'이(가) 리스트에 없습니다.")

def show_list():
    if shopping_list:
        print("현재 쇼핑 리스트:")
        for i, item in enumerate(shopping_list, 1):
            print(f"{i}. {item}")
    else:
        print("쇼핑 리스트가 비어있습니다.")

# 사용 예제
add_item("우유")
add_item("빵")
add_item("계란")
show_list()

remove_item("빵")
show_list()
```

### 예제 3: 숫자 게임

```python
import random

# 1부터 100까지의 랜덤한 숫자 10개 생성
numbers = [random.randint(1, 100) for _ in range(10)]
print(f"생성된 숫자들: {numbers}")

# 정렬
numbers.sort()
print(f"정렬된 숫자들: {numbers}")

# 짝수만 필터링
even_numbers = [num for num in numbers if num % 2 == 0]
print(f"짝수들: {even_numbers}")

# 평균 계산
average = sum(numbers) / len(numbers)
print(f"평균: {average:.2f}")
```

## 6. 주의사항 및 팁 ⚠️

### 리스트 사용 시 주의사항

1. **인덱스 범위**: 인덱스는 0부터 시작하며, 범위를 벗어나면 IndexError가 발생합니다.
2. **원본 변경**: 대부분의 메서드가 원본 리스트를 변경하므로 주의해야 합니다.
3. **메모리 효율성**: 큰 리스트의 경우 슬라이싱보다 인덱싱이 더 효율적입니다.

### 성능 최적화 팁

```python
# 비효율적인 코드
result = []
for i in range(len(numbers)):
    result.append(numbers[i] * 2)

# 효율적인 코드 (리스트 컴프리헨션)
result = [num * 2 for num in numbers]

# 또는 map() 함수 사용
result = list(map(lambda x: x * 2, numbers))
```

### 디버깅 팁

```python
# 리스트 디버깅을 위한 print문 활용
fruits = ['사과', '바나나', '오렌지']

for i, fruit in enumerate(fruits):
    print(f"인덱스 {i}: {fruit}")
    
# 리스트 상태 확인
print(f"리스트 길이: {len(fruits)}")
print(f"리스트 내용: {fruits}")
```

> 💡 **팁**: 리스트를 사용할 때는 <span class="blue-text">메모리 효율성과 가독성</span>을 고려하여 적절한 메서드를 선택하세요! 복잡한 작업은 작은 단위로 나누어 구현하는 것이 좋습니다! 🎯

## 7. 연습 문제 🎯

### 문제 1: 리스트 기본 조작 (기초)
다음 요구사항을 만족하는 프로그램을 작성하세요:
1. 빈 리스트를 만들고 5개의 과일 이름을 추가
2. 2번째 위치에 '딸기'를 삽입
3. 마지막 요소를 삭제하고 삭제된 요소 출력
4. 리스트를 정렬하여 출력

### 문제 2: 성적 분석 (중급)
학생들의 성적 리스트가 주어졌을 때:
1. 평균 점수 계산
2. 90점 이상인 학생 수 계산
3. 최고점과 최저점의 차이 계산
4. 성적을 내림차순으로 정렬하여 출력

### 문제 3: 리스트 변환 (고급)
문자열 리스트를 다음과 같이 변환하는 프로그램을 작성하세요:
1. 모든 문자열을 대문자로 변환
2. 문자열 길이가 5 이상인 것만 필터링
3. 필터링된 문자열들을 하나의 문자열로 연결 (공백으로 구분)

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 문제 1: 리스트 기본 조작
  fruits = []
  fruits.extend(['사과', '바나나', '오렌지', '포도', '수박'])
  fruits.insert(1, '딸기')
  removed = fruits.pop()
  print(f"삭제된 요소: {removed}")
  fruits.sort()
  print(f"정렬된 리스트: {fruits}")

  # 문제 2: 성적 분석
  scores = [85, 92, 78, 96, 88, 73, 91, 87]
  average = sum(scores) / len(scores)
  high_scores = len([s for s in scores if s >= 90])
  score_range = max(scores) - min(scores)
  sorted_scores = sorted(scores, reverse=True)
  
  print(f"평균: {average:.2f}")
  print(f"90점 이상: {high_scores}명")
  print(f"점수 범위: {score_range}")
  print(f"내림차순: {sorted_scores}")

  # 문제 3: 리스트 변환
  words = ['hello', 'world', 'python', 'programming', 'code']
  upper_words = [word.upper() for word in words]
  filtered_words = [word for word in upper_words if len(word) >= 5]
  result = ' '.join(filtered_words)
  print(f"결과: {result}")
  </code></pre>
</details>

---

리스트는 파이썬에서 가장 중요한 자료구조 중 하나입니다. 다양한 메서드와 연산을 활용하여 데이터를 효율적으로 관리하고 처리할 수 있습니다. 실습을 통해 리스트의 다양한 기능을 익혀보세요! 🚀
