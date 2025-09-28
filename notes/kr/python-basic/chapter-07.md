---
layout: article
title: 7. 튜플과 세트
permalink: /notes/kr/python-basic/chapter-07
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 기초 과정 강의 노트, 튜플과 세트 개념과 활용 방법을 다룹니다.
keywords: "Python, 변수, 자료형, 기초 과정, 데이터 처리, 프로그래밍, 튜플, 세트, 라이브러리"
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

튜플과 세트는 <span class="blue-text">파이썬의 마지막 기본 자료구조</span>로, 각각 고유한 특징과 활용 분야를 가지고 있습니다.  
튜플은 <span class="blue-text">불변성(immutable)</span>을 특징으로 하며, 세트는 <span class="blue-text">중복을 허용하지 않는 집합</span> 개념을 구현한 자료구조입니다.

## 1. 튜플 📦

지금까지 파이썬에서 제공하는 중요한 자료구조를 살펴봤습니다.  
이제 튜플과 집합을 마지막으로 파이썬 자료구조 학습을 마무리합니다.

### 튜플이란?

튜플은 <span class="blue-text">리스트와 유사한 형태</span>의 자료구조입니다.  
리스트와 마찬가지로 <span class="blue-text">순서가 있는 데이터의 집합</span>이지만, 리스트와 달리 튜플은 <span class="blue-text">불변(immutable)</span>이라는 특징을 가집니다.  
즉, 튜플을 한 번 생성된 후에는 <span class="red-text">요소의 값을 변경하거나 삭제할 수 없습니다</span>.

### 튜플의 기본 형태

```python
변수명 = (요소1, 요소2, 요소3, ...)
```

가시적으로 눈에 띄는 차이점은 <span class="yellow-code">괄호의 종류</span>입니다.  
리스트는 대괄호 `[]`로 표현되는 반면, 튜플은 <span class="blue-text">소괄호 `()`</span>를 사용하여 표현합니다.

```python
# 리스트와 튜플 비교
my_list = [1, 2, 3, 4, 5]      # 리스트 (대괄호)
my_tuple = (1, 2, 3, 4, 5)     # 튜플 (소괄호)

print(type(my_list))   # <class 'list'>
print(type(my_tuple))  # <class 'tuple'>
```

### 튜플의 요소

튜플에 담긴 각 항목을 <span class="blue-text">하나의 요소</span>라고 부릅니다.  
모든 요소는 <span class="blue-text">고유한 인덱스</span>를 가지고 있으며, 특정 요소를 사용하기 위해서는 <span class="yellow-code">대괄호 `[]`</span>를 사용하여 접근합니다.

```python
# 튜플 생성 및 요소 접근
fruits = ("사과", "바나나", "오렌지", "포도")

print(fruits[0])    # 사과
print(fruits[1])    # 바나나
print(fruits[-1])   # 포도 (마지막 요소)
print(len(fruits))  # 4 (튜플의 길이)
```

### 튜플의 불변성

지금까지 살펴본 내용만으로는 튜플과 리스트가 별반 다르지 않아 보입니다.  
하지만 두 가지 데이터 구조는 <span class="blue-text">불변성</span>이라는 핵심적인 차이점을 가지고 있습니다.

```python
# 리스트는 수정 가능 (mutable)
my_list = [1, 2, 3, 4, 5]
my_list[0] = 10  # 수정 가능
my_list.append(6)  # 추가 가능
print(my_list)  # [10, 2, 3, 4, 5, 6]

# 튜플은 수정 불가능 (immutable)
my_tuple = (1, 2, 3, 4, 5)
# my_tuple[0] = 10  # TypeError: 'tuple' object does not support item assignment
# my_tuple.append(6)  # AttributeError: 'tuple' object has no attribute 'append'
```

> ⚠️ **주의**: 튜플은 <span class="red-text">한 번 생성되면 수정할 수 없습니다</span>! 요소를 변경하거나 추가하려고 하면 에러가 발생합니다! 🛡️

### 튜플 슬라이싱

튜플도 리스트와 마찬가지로 <span class="yellow-code">슬라이싱</span>을 사용할 수 있습니다.

```python
numbers = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

# 기본 슬라이싱
print(numbers[2:5])    # (3, 4, 5)
print(numbers[:3])     # (1, 2, 3)
print(numbers[7:])     # (8, 9, 10)

# 간격을 두고 슬라이싱
print(numbers[::2])    # (1, 3, 5, 7, 9)
print(numbers[1::3])   # (2, 5, 8)
```

### 튜플 IndexError

존재하지 않는 인덱스로 접근하려고 하면 <span class="red-text">IndexError</span>가 발생합니다.

```python
fruits = ("사과", "바나나", "오렌지")

# 존재하지 않는 인덱스 접근 시 에러 발생
# print(fruits[5])  # IndexError: tuple index out of range

# 안전한 접근 방법
if len(fruits) > 5:
    print(fruits[5])
else:
    print("인덱스가 범위를 벗어났습니다.")
```

> ⚠️ **주의**: 튜플의 인덱스는 <span class="red-text">0부터 시작</span>하며, <span class="red-text">튜플의 길이보다 큰 인덱스로 접근하면 IndexError</span>가 발생합니다! 🛡️

## 2. 튜플의 메서드 🛠️

파이썬은 튜플에도 다양한 데이터 구조에 유용한 메서드를 제공합니다.  
개발자는 튜플을 유연하게 활용할 수 있도록 지원하며, 튜플은 리스트와 공통으로 사용할 수 있는 메서드들이 많아 익숙한 방식으로 다룰 수 있습니다.

### count() 메서드

<span class="yellow-code">count()</span> 메서드는 <span class="blue-text">튜플에서 특정 값이 몇 번 나타나는지</span>를 반환합니다.

```python
튜플.count(찾고자 하는 값)
```

```python
# count() 메서드 사용 예제
numbers = (1, 2, 3, 2, 4, 2, 5, 2)

print(numbers.count(2))    # 4 (2가 4번 나타남)
print(numbers.count(1))    # 1 (1이 1번 나타남)
print(numbers.count(6))    # 0 (6이 0번 나타남)

# 문자열 튜플에서의 사용
fruits = ("사과", "바나나", "사과", "오렌지", "사과")
print(fruits.count("사과"))  # 3
print(fruits.count("포도"))  # 0
```

### index() 메서드

<span class="yellow-code">index()</span> 메서드는 <span class="blue-text">튜플에서 특정 값이 처음 나타나는 위치의 인덱스</span>를 반환합니다.

```python
튜플.index(찾고자 하는 값)
```

```python
# index() 메서드 사용 예제
fruits = ("사과", "바나나", "오렌지", "포도", "바나나")

print(fruits.index("바나나"))  # 1 (첫 번째 바나나의 인덱스)
print(fruits.index("사과"))    # 0 (사과의 인덱스)
print(fruits.index("포도"))    # 3 (포도의 인덱스)

# 존재하지 않는 값 검색 시 에러 발생
# print(fruits.index("체리"))  # ValueError: tuple.index(x): x not in tuple

# 안전한 검색 방법
if "체리" in fruits:
    print(fruits.index("체리"))
else:
    print("체리가 없습니다.")
```

> 💡 **팁**: <span class="yellow-code">index()</span> 메서드는 <span class="blue-text">첫 번째로 나타나는 위치</span>만 반환합니다! 모든 위치를 찾으려면 반복문을 사용하세요! 🔍

## 3. 튜플의 활용 🚀

튜플은 메서드 외에도 다양한 기능을 통해 여러 가지 작업을 수행할 수 있습니다.  
그중 하나가 바로 <span class="blue-text">두 변수의 값을 간편하게 교환하는 기능</span>입니다.

### 데이터 교환

튜플은 각 요소를 직접 수정할 수는 없지만, <span class="blue-text">두 튜플을 활용하여 간접적으로 튜플 요소의 값을 교환</span>할 수 있습니다.

```python
# 일반적인 변수 교환 방법
x = 10
y = 20

# 임시 변수 사용
temp = x
x = y
y = temp
print(f"x: {x}, y: {y}")  # x: 20, y: 10

# 튜플을 이용한 간편한 교환
x = 10
y = 20

(x, y) = (y, x)  # 또는 x, y = y, x
print(f"x: {x}, y: {y}")  # x: 20, y: 10

# 여러 변수 동시 교환
a, b, c = 1, 2, 3
a, b, c = c, a, b
print(f"a: {a}, b: {b}, c: {c}")  # a: 3, b: 1, c: 2
```

### 함수에서 여러 값 반환

튜플을 활용하면 <span class="blue-text">함수에서 여러 개의 값을 동시에 반환</span>할 수 있습니다.

```python
def get_name_and_age():
    name = "김철수"
    age = 25
    return name, age  # 튜플로 반환

# 함수 호출 및 값 받기
person_name, person_age = get_name_and_age()
print(f"이름: {person_name}, 나이: {person_age}")

# 또는 튜플 전체로 받기
person_info = get_name_and_age()
print(f"정보: {person_info}")  # ('김철수', 25)
```

> 💡 **팁**: 튜플을 이용한 변수 교환은 <span class="blue-text">코드를 간결하게</span> 만들어주고, <span class="blue-text">가독성을 향상</span>시킵니다! 🎯

## 4. 세트 🎯

파이썬은 리스트, 튜플, 딕셔너리와 같은 기본적인 자료구조 외에도 다양한 상황에 맞는 자료구조를 제공합니다.

### 세트란?

세트는 <span class="blue-text">순서가 없고, 중복된 값을 허용하지 않는 특별한 자료구조</span>입니다.  
<span class="blue-text">수학에서 배우는 집합 개념과 유사</span>합니다.

```python
변수명 = {요소1, 요소2, 요소3, ...}
```

세트는 <span class="blue-text">중괄호 `{}`</span>를 사용하여 표현합니다.  
세트를 생성하는 또 다른 방법으로는 <span class="yellow-code">set()</span> 메서드를 사용할 수 있습니다.

```python
set(세트로 바꾸고 싶은 다른 자료형)
```

```python
# 세트 생성 방법들
my_set1 = {1, 2, 3, 4, 5}           # 중괄호 사용
my_set2 = set([1, 2, 3, 4, 5])      # set() 함수 사용
my_set3 = set("hello")               # 문자열을 세트로 변환

print(my_set1)  # {1, 2, 3, 4, 5}
print(my_set2)  # {1, 2, 3, 4, 5}
print(my_set3)  # {'h', 'e', 'l', 'o'} (중복 제거됨)

# 빈 세트 생성
empty_set = set()  # {}는 빈 딕셔너리이므로 주의!
print(empty_set)   # set()
```

### 세트의 요소

앞서 설명했듯이, 세트는 아래와 같은 특징을 가집니다:
- <span class="blue-text">중복된 값을 허용하지 않음</span>
- <span class="blue-text">순서가 없음</span>

그렇다면 세트의 요소 하나하나에 직접 접근하고 싶다면 어떻게 할까요?  
먼저, 리스트나 튜플 같이 <span class="red-text">순서가 있는 자료형의 인덱싱을 먼저 사용</span>해봅시다.

```python
my_set = {1, 2, 3, 4, 5}

# 세트는 인덱싱이 불가능
# print(my_set[0])  # TypeError: 'set' object is not subscriptable
```

그렇다면 세트의 각 요소에 어떻게 접근할까요?  
<span class="blue-text">세트를 리스트나 튜플로 변환한 후 인덱싱을 사용하여 접근</span>할 수 있습니다.

```python
my_set = {1, 2, 3, 4, 5}

# 세트를 리스트로 변환 후 접근
my_list = list(my_set)
print(my_list[0])  # 1 (순서는 보장되지 않음)

# 세트를 튜플로 변환 후 접근
my_tuple = tuple(my_set)
print(my_tuple[0])  # 1 (순서는 보장되지 않음)

# for문을 이용한 순회
for element in my_set:
    print(element)
```

> ⚠️ **주의**: 세트는 <span class="red-text">순서가 없기 때문에</span> 인덱싱이 불가능합니다! 요소에 접근하려면 <span class="blue-text">리스트나 튜플로 변환</span>하거나 <span class="blue-text">for문을 사용</span>하세요! 🛡️

## 5. 세트의 연산 🔧

세트는 인덱스가 없는 자료구조이기 때문에 요소를 하나씩 꺼내 쓰기에는 다소 불편합니다.  
파이썬이 세트를 지원하는 가장 큰 이유는 <span class="blue-text">연산 수행</span>입니다.  
세트의 연산은 사칙 연산이 아닌 <span class="blue-text">집합 연산</span>이며, 파이썬에서는 <span class="blue-text">교집합, 합집합, 차집합</span> 등 3가지 기본적인 연산을 제공합니다.

### 세트의 교집합

교집합은 <span class="blue-text">두 세트에 공통으로 포함된 요소들</span>을 의미합니다.

```python
# 교집합 구하는 방법들
intersection_AandB = set_a.intersection(set_b)
intersection_AandB = set_a & set_b
```

```python
# 교집합 연산 예제
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# 방법 1: intersection() 메서드 사용
intersection1 = set_a.intersection(set_b)
print("교집합 (메서드):", intersection1)  # {4, 5}

# 방법 2: & 연산자 사용
intersection2 = set_a & set_b
print("교집합 (연산자):", intersection2)  # {4, 5}

# 여러 세트의 교집합
set_c = {4, 5, 9, 10}
intersection3 = set_a.intersection(set_b, set_c)
print("세 개 세트 교집합:", intersection3)  # {4, 5}
```

### 세트의 합집합

합집합은 <span class="blue-text">두 세트의 모든 요소들을 합친 것</span>을 의미합니다. (중복은 자동으로 제거됨)

```python
# 합집합 구하는 방법들
union_AandB = set_a.union(set_b)
union_AandB = set_a | set_b
```

```python
# 합집합 연산 예제
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# 방법 1: union() 메서드 사용
union1 = set_a.union(set_b)
print("합집합 (메서드):", union1)  # {1, 2, 3, 4, 5, 6, 7, 8}

# 방법 2: | 연산자 사용
union2 = set_a | set_b
print("합집합 (연산자):", union2)  # {1, 2, 3, 4, 5, 6, 7, 8}

# 여러 세트의 합집합
set_c = {9, 10, 11}
union3 = set_a.union(set_b, set_c)
print("세 개 세트 합집합:", union3)  # {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}
```

### 세트의 차집합

차집합은 <span class="blue-text">첫 번째 세트에는 있지만 두 번째 세트에는 없는 요소들</span>을 의미합니다.

```python
# 차집합 구하는 방법들
difference_AminusB = set_a.difference(set_b)
difference_AminusB = set_a - set_b
```

```python
# 차집합 연산 예제
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# 방법 1: difference() 메서드 사용
difference1 = set_a.difference(set_b)
print("차집합 A-B (메서드):", difference1)  # {1, 2, 3}

# 방법 2: - 연산자 사용
difference2 = set_a - set_b
print("차집합 A-B (연산자):", difference2)  # {1, 2, 3}

# 반대 차집합
difference3 = set_b - set_a
print("차집합 B-A:", difference3)  # {6, 7, 8}

# 여러 세트의 차집합
set_c = {3, 4, 9, 10}
difference4 = set_a.difference(set_b, set_c)
print("A-(B∪C):", difference4)  # {1, 2}
```

> 💡 **팁**: 세트 연산은 <span class="blue-text">데이터 분석과 중복 제거</span>에 매우 유용합니다! 특히 <span class="yellow-code">교집합</span>은 공통 요소를 찾을 때, <span class="yellow-code">차집합</span>은 고유한 요소를 찾을 때 사용하세요! 🎯

## 6. 세트의 메서드 🛠️

세트는 다양한 연산뿐만 아니라 다양한 메서드를 제공하여 데이터 처리의 효율성을 높여줍니다.  
지금부터는 세트의 요소를 추가하거나 제거하는 데 사용되는 주요 메서드를 살펴봅니다.

### 요소 추가하기

#### add() 메서드

<span class="yellow-code">add()</span> 메서드는 <span class="blue-text">세트에 단일 요소를 추가</span>합니다.

```python
my_set.add(추가할_요소)
```

```python
# add() 메서드 사용 예제
fruits = {"사과", "바나나"}

fruits.add("오렌지")
print(fruits)  # {'사과', '바나나', '오렌지'}

fruits.add("사과")  # 중복 요소 추가 시도 (변화 없음)
print(fruits)  # {'사과', '바나나', '오렌지'}

# 숫자 세트에 요소 추가
numbers = {1, 2, 3}
numbers.add(4)
print(numbers)  # {1, 2, 3, 4}
```

#### update() 메서드

<span class="yellow-code">update()</span> 메서드는 <span class="blue-text">세트에 여러 요소를 한 번에 추가</span>합니다.

```python
my_set.update(추가할_요소들)
```

```python
# update() 메서드 사용 예제
fruits = {"사과", "바나나"}

# 리스트로 여러 요소 추가
fruits.update(["오렌지", "포도", "체리"])
print(fruits)  # {'사과', '바나나', '오렌지', '포도', '체리'}

# 튜플로 여러 요소 추가
fruits.update(("키위", "딸기"))
print(fruits)  # {'사과', '바나나', '오렌지', '포도', '체리', '키위', '딸기'}

# 다른 세트와 합치기
more_fruits = {"망고", "파인애플"}
fruits.update(more_fruits)
print(fruits)  # {'사과', '바나나', '오렌지', '포도', '체리', '키위', '딸기', '망고', '파인애플'}
```

### 요소 삭제하기

#### remove() 메서드

<span class="yellow-code">remove()</span> 메서드는 <span class="blue-text">세트에서 특정 요소를 삭제</span>합니다.  
<span class="red-text">요소가 없으면 KeyError가 발생</span>합니다.

```python
my_set.remove(삭제할_요소)
```

```python
# remove() 메서드 사용 예제
fruits = {"사과", "바나나", "오렌지", "포도"}

fruits.remove("바나나")
print(fruits)  # {'사과', '오렌지', '포도'}

# 존재하지 않는 요소 삭제 시 에러 발생
# fruits.remove("체리")  # KeyError: '체리'

# 안전한 삭제 방법
if "체리" in fruits:
    fruits.remove("체리")
else:
    print("체리가 세트에 없습니다.")
```

#### discard() 메서드

<span class="yellow-code">discard()</span> 메서드는 <span class="blue-text">세트에서 특정 요소를 삭제</span>합니다.  
<span class="green-text">요소가 없어도 에러가 발생하지 않습니다</span>.

```python
my_set.discard(삭제할_요소)
```

```python
# discard() 메서드 사용 예제
fruits = {"사과", "바나나", "오렌지", "포도"}

fruits.discard("바나나")
print(fruits)  # {'사과', '오렌지', '포도'}

# 존재하지 않는 요소 삭제 시도 (에러 없음)
fruits.discard("체리")
print(fruits)  # {'사과', '오렌지', '포도'} (변화 없음)
```

#### pop() 메서드

<span class="yellow-code">pop()</span> 메서드는 <span class="blue-text">세트에서 임의의 요소를 삭제하고 반환</span>합니다.

```python
removed_element = my_set.pop()
```

```python
# pop() 메서드 사용 예제
fruits = {"사과", "바나나", "오렌지", "포도"}

removed = fruits.pop()
print(f"삭제된 요소: {removed}")  # 임의의 요소 (예: '사과')
print(f"남은 세트: {fruits}")     # {'바나나', '오렌지', '포도'}

# 빈 세트에서 pop() 호출 시 에러 발생
empty_set = set()
# empty_set.pop()  # KeyError: 'pop from an empty set'
```

#### clear() 메서드

<span class="yellow-code">clear()</span> 메서드는 <span class="blue-text">세트의 모든 요소를 삭제</span>합니다.

```python
my_set.clear()
```

```python
# clear() 메서드 사용 예제
fruits = {"사과", "바나나", "오렌지", "포도"}

print("clear() 전:", fruits)  # {'사과', '바나나', '오렌지', '포도'}
fruits.clear()
print("clear() 후:", fruits)  # set()
```

> 💡 **팁**: <span class="yellow-code">remove()</span>와 <span class="yellow-code">discard()</span>의 차이점을 기억하세요!  
> - <span class="red-text">remove()</span>: 요소가 없으면 에러 발생  
> - <span class="green-text">discard()</span>: 요소가 없어도 에러 없음  
> 안전한 코드를 원한다면 <span class="yellow-code">discard()</span>를 사용하세요! 🛡️

## 7. 실전 예제 🚀

### 예제 1: 학생 취미 관리 시스템

```python
# 학생들의 취미를 관리하는 시스템
students_hobbies = {
    "김철수": {"축구", "영화감상", "독서"},
    "이영희": {"음악", "요리", "독서"},
    "박민수": {"축구", "게임", "영화감상"},
    "최지영": {"음악", "요리", "게임"}
}

def find_common_hobbies():
    """모든 학생이 공통으로 가지고 있는 취미 찾기"""
    all_hobbies = set.intersection(*students_hobbies.values())
    return all_hobbies

def find_unique_hobbies(student_name):
    """특정 학생만의 고유한 취미 찾기"""
    if student_name not in students_hobbies:
        return set()
    
    student_hobbies = students_hobbies[student_name]
    other_hobbies = set()
    for name, hobbies in students_hobbies.items():
        if name != student_name:
            other_hobbies.update(hobbies)
    
    return student_hobbies - other_hobbies

def recommend_friends(student_name):
    """취미가 비슷한 친구 추천"""
    if student_name not in students_hobbies:
        return []
    
    student_hobbies = students_hobbies[student_name]
    recommendations = []
    
    for name, hobbies in students_hobbies.items():
        if name != student_name:
            common_count = len(student_hobbies & hobbies)
            if common_count > 0:
                recommendations.append((name, common_count))
    
    return sorted(recommendations, key=lambda x: x[1], reverse=True)

# 사용 예제
print("공통 취미:", find_common_hobbies())
print("김철수의 고유 취미:", find_unique_hobbies("김철수"))
print("김철수와 비슷한 취미를 가진 친구:", recommend_friends("김철수"))
```

### 예제 2: 중복 제거 및 데이터 정리

```python
# 중복이 포함된 데이터를 정리하는 시스템
def clean_data(data_list):
    """리스트에서 중복을 제거하고 정렬된 리스트 반환"""
    unique_data = list(set(data_list))
    return sorted(unique_data)

def find_duplicates(data_list):
    """중복된 요소들 찾기"""
    seen = set()
    duplicates = set()
    
    for item in data_list:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    
    return list(duplicates)

# 사용 예제
scores = [85, 92, 78, 85, 96, 92, 78, 88, 85]
print("원본 데이터:", scores)
print("중복 제거 후:", clean_data(scores))
print("중복된 점수:", find_duplicates(scores))
```

### 예제 3: 튜플을 활용한 좌표 시스템

```python
# 2D 좌표를 관리하는 시스템
class Point:
    def __init__(self, x, y):
        self.coords = (x, y)
    
    def __str__(self):
        return f"Point({self.coords[0]}, {self.coords[1]})"
    
    def distance_from_origin(self):
        """원점으로부터의 거리 계산"""
        x, y = self.coords
        return (x**2 + y**2)**0.5
    
    def move(self, dx, dy):
        """좌표 이동 (새로운 튜플 반환)"""
        new_x = self.coords[0] + dx
        new_y = self.coords[1] + dy
        return Point(new_x, new_y)

# 사용 예제
point1 = Point(3, 4)
print(f"원점: {point1}")
print(f"원점으로부터의 거리: {point1.distance_from_origin():.2f}")

point2 = point1.move(2, -1)
print(f"이동 후: {point2}")
```

## 8. 연습 문제 🎯

### 문제 1: 튜플 기본 조작 (기초)
다음 요구사항을 만족하는 프로그램을 작성하세요:
1. 학생들의 성적을 튜플로 저장
2. 평균 점수 계산
3. 최고점과 최저점 찾기
4. 성적을 내림차순으로 정렬

### 문제 2: 세트 연산 활용 (중급)
두 반의 학생 명단이 주어졌을 때:
1. 두 반에 모두 있는 학생 찾기
2. 한 반에만 있는 학생들 찾기
3. 전체 학생 수 계산

### 문제 3: 데이터 분석 시스템 (고급)
주어진 텍스트에서:
1. 중복된 단어 찾기
2. 고유한 단어 개수 계산
3. 가장 많이 나온 단어 찾기
4. 단어 빈도 분석

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 문제 1: 튜플 기본 조작
  scores = (85, 92, 78, 96, 88, 91, 87, 93)
  
  # 평균 점수 계산
  average = sum(scores) / len(scores)
  print(f"평균 점수: {average:.2f}")
  
  # 최고점과 최저점
  max_score = max(scores)
  min_score = min(scores)
  print(f"최고점: {max_score}, 최저점: {min_score}")
  
  # 내림차순 정렬
  sorted_scores = tuple(sorted(scores, reverse=True))
  print(f"내림차순 정렬: {sorted_scores}")

  # 문제 2: 세트 연산 활용
  class_a = {"김철수", "이영희", "박민수", "최지영", "정수진"}
  class_b = {"이영희", "박민수", "한소영", "김민지", "최지영"}
  
  # 두 반에 모두 있는 학생
  common_students = class_a & class_b
  print(f"공통 학생: {common_students}")
  
  # 한 반에만 있는 학생들
  only_a = class_a - class_b
  only_b = class_b - class_a
  print(f"A반에만 있는 학생: {only_a}")
  print(f"B반에만 있는 학생: {only_b}")
  
  # 전체 학생 수
  total_students = len(class_a | class_b)
  print(f"전체 학생 수: {total_students}")

  # 문제 3: 데이터 분석 시스템
  text = "python is great python is powerful python is easy to learn python"
  words = text.split()
  
  # 중복된 단어 찾기
  word_count = {}
  for word in words:
      word_count[word] = word_count.get(word, 0) + 1
  
  duplicates = [word for word, count in word_count.items() if count > 1]
  print(f"중복된 단어: {duplicates}")
  
  # 고유한 단어 개수
  unique_words = set(words)
  print(f"고유한 단어 개수: {len(unique_words)}")
  
  # 가장 많이 나온 단어
  most_frequent = max(word_count.items(), key=lambda x: x[1])
  print(f"가장 많이 나온 단어: {most_frequent[0]} ({most_frequent[1]}번)")
  
  # 단어 빈도 분석
  print("단어 빈도:")
  for word, count in sorted(word_count.items(), key=lambda x: x[1], reverse=True):
      print(f"  {word}: {count}번")
  </code></pre>
</details>

## 9. 주의사항 및 팁 ⚠️

### 튜플 사용 시 주의사항

1. **불변성**: 튜플은 한 번 생성되면 수정할 수 없습니다.
2. **단일 요소 튜플**: `(1)`은 튜플이 아닙니다. `(1,)`로 작성해야 합니다.
3. **메모리 효율성**: 튜플은 리스트보다 메모리를 적게 사용합니다.

### 세트 사용 시 주의사항

1. **순서 보장 안됨**: 세트는 순서가 없으므로 인덱싱이 불가능합니다.
2. **가변 객체 불가**: 세트의 요소는 불변 객체여야 합니다.
3. **빈 세트 생성**: `{}`는 딕셔너리이므로 `set()`을 사용하세요.

### 성능 최적화 팁

```python
# 효율적인 중복 제거
unique_items = list(set(original_list))

# 효율적인 교집합 찾기
common_elements = set1 & set2

# 효율적인 차집합 찾기
unique_to_first = set1 - set2
```

### 디버깅 팁

```python
# 튜플 디버깅
my_tuple = (1, 2, 3, 4, 5)
print(f"튜플 내용: {my_tuple}")
print(f"튜플 길이: {len(my_tuple)}")
print(f"튜플 타입: {type(my_tuple)}")

# 세트 디버깅
my_set = {1, 2, 3, 4, 5}
print(f"세트 내용: {my_set}")
print(f"세트 길이: {len(my_set)}")
print(f"세트 타입: {type(my_set)}")
```

> 💡 **팁**: 튜플과 세트는 <span class="blue-text">각각의 고유한 특징</span>을 잘 이해하고 적절한 상황에서 사용하세요!  
> 튜플은 <span class="blue-text">불변 데이터</span>에, 세트는 <span class="blue-text">중복 제거와 집합 연산</span>에 특화되어 있습니다! 🎯

---

튜플과 세트는 파이썬의 마지막 기본 자료구조로, 각각 고유한 특징과 활용 분야를 가지고 있습니다.  
튜플의 <span class="blue-text">불변성</span>과 세트의 <span class="blue-text">집합 연산</span>을 잘 활용하면 더욱 효율적인 프로그램을 작성할 수 있습니다! 🚀

