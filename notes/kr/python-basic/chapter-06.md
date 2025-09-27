---
layout: article
title: 6. 딕셔너리
permalink: /notes/kr/python-basic/chapter-06
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 기초 과정 강의 노트, 딕셔너리 개념과 활용 방법을 다룹니다.
keywords: "Python, 변수, 자료형, 기초 과정, 데이터 처리, 프로그래밍, 딕셔너리"
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

딕셔너리는 <span class="blue-text">키(key)와 값(value)의 쌍으로 이루어진 자료형</span>으로 정보를 효율적으로 관리하는 데 매우 유용합니다.  
파이썬에서 빼놓을 수 없는 중요한 자료구조 중 하나로, <span class="blue-text">사전을 사용할 때 단어를 통해 의미를 찾는 것처럼</span> key 값을 통해 value 값을 찾는 데 특화되어 있습니다.

## 딕셔너리 기본 개념 📚

### 딕셔너리란?

딕셔너리는 <span class="blue-text">중괄호({})로 감싸고 key와 value를 콜론(:)으로 구분</span>하여 표현합니다.  
각 쌍은 쉼표로 구분하며, 사전에서 단어를 찾으면 그 의미를 알 수 있듯이 딕셔너리에서도 key를 통해 value를 찾아낼 수 있습니다.

```python
# 기본 딕셔너리 예제
person = {
    "name": "양관식",
    "age": 30,
    "phone": "010-1234-5678",
    "subject": ["국어", "체육"]
}

# 다양한 자료형이 혼합된 딕셔너리
student_info = {
    "name": "김철수",
    "age": 20,
    "grades": [85, 92, 78],
    "is_passed": True,
    "address": {
        "city": "서울",
        "district": "강남구"
    }
}
```

> 💡 **팁**: 딕셔너리는 <span class="blue-text">key를 통해 빠르게 데이터에 접근</span>할 수 있어 매우 효율적입니다! 🚀

## 1. 딕셔너리 요소와 접근 🔑

### 딕셔너리 요소

딕셔너리에 포함된 항목들을 <span class="blue-text">키-값 쌍(pair)</span> 또는 <span class="blue-text">페어</span>라고 부릅니다.  
리스트에서는 인덱스를 사용하여 요소에 접근하지만, 딕셔너리는 <span class="blue-text">순서가 없는 자료구조</span>이므로 key 값을 사용하여 원하는 값에 접근합니다.

### 딕셔너리 접근 방법

```python
# 딕셔너리 생성
person = {
    "name": "양관식",
    "age": 30,
    "phone": "010-1234-5678",
    "subject": ["국어", "체육"]
}

# key를 사용한 값 접근
print(person["name"])      # 양관식
print(person["age"])      # 30
print(person["subject"])  # ['국어', '체육']

# 딕셔너리 전체 출력
print(person)  # {'name': '양관식', 'age': 30, 'phone': '010-1234-5678', 'subject': ['국어', '체육']}
```

### KeyError 예외 처리

딕셔너리에 존재하지 않는 key로 접근하려고 하면 <span class="red-text">KeyError</span>가 발생합니다.

```python
person = {"name": "양관식", "age": 30}

# 존재하지 않는 key 접근 시 에러 발생
# print(person["height"])  # KeyError: 'height'

# 안전한 접근 방법
if "height" in person:
    print(person["height"])
else:
    print("키가 존재하지 않습니다.")

# get() 메서드 사용 (기본값 반환)
height = person.get("height", "정보 없음")
print(height)  # 정보 없음
```

> ⚠️ **주의**: 딕셔너리에 존재하지 않는 key로 접근하면 <span class="red-text">KeyError</span>가 발생합니다! 안전한 접근을 위해 <span class="yellow-code">get()</span> 메서드를 사용하세요! 🛡️

#### 문제 1 - 딕셔너리 접근 연습 (기초) 🎯
> 아래 코드의 주석을 참고하여, 딕셔너리 접근을 연습해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
student = {
    "name": "이영희",
    "age": 22,
    "major": "컴퓨터공학",
    "grades": [85, 92, 78, 96]
}

# 1. 학생 이름 출력
# name = 
# print("학생 이름:", name)

# 2. 전공 출력
# major = 
# print("전공:", major)

# 3. 성적 리스트 출력
# grades = 
# print("성적:", grades)

# 4. 나이를 안전하게 접근 (get() 메서드 사용)
# age = 
# print("나이:", age)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  student = {
      "name": "이영희",
      "age": 22,
      "major": "컴퓨터공학",
      "grades": [85, 92, 78, 96]
  }

  # 1. 학생 이름 출력
  name = student["name"]
  print("학생 이름:", name)

  # 2. 전공 출력
  major = student["major"]
  print("전공:", major)

  # 3. 성적 리스트 출력
  grades = student["grades"]
  print("성적:", grades)

  # 4. 나이를 안전하게 접근 (get() 메서드 사용)
  age = student.get("age", "정보 없음")
  print("나이:", age)

  # 실행 결과:
  # 학생 이름: 이영희
  # 전공: 컴퓨터공학
  # 성적: [85, 92, 78, 96]
  # 나이: 22
  </code></pre>
</details>

## 2. 딕셔너리 연산 🔧

딕셔너리는 다양한 연산을 지원하여 딕셔너리를 자유롭게 조작하고 데이터를 활용할 수 있습니다.

### 빈 딕셔너리 생성

가장 기본적인 딕셔너리 연산은 빈 딕셔너리를 생성하는 것입니다.

```python
# 빈 딕셔너리 생성 방법
empty_dict1 = {}
empty_dict2 = dict()

print(empty_dict1)  # {}
print(empty_dict2)  # {}
print(type(empty_dict1))  # <class 'dict'>
```

### key-value 쌍 추가

딕셔너리에 key-value 쌍을 추가하는 방법은 매우 간단합니다.

```python
# 빈 딕셔너리에 요소 추가
person = {}

person["name"] = "양관식"
person["age"] = 30
person["phone"] = "010-1234-5678"

print(person)  # {'name': '양관식', 'age': 30, 'phone': '010-1234-5678'}

# 기존 딕셔너리에 새로운 요소 추가
person["email"] = "yang@example.com"
person["city"] = "서울"

print(person)  # {'name': '양관식', 'age': 30, 'phone': '010-1234-5678', 'email': 'yang@example.com', 'city': '서울'}
```

### key-value 쌍 삭제

딕셔너리에서 특정 key-value 쌍을 삭제하려면 <span class="yellow-code">del</span> 키워드를 사용합니다.

```python
person = {
    "name": "양관식",
    "age": 30,
    "phone": "010-1234-5678",
    "email": "yang@example.com"
}

print("삭제 전:", person)

# 특정 key 삭제
del person["email"]
print("email 삭제 후:", person)

# 여러 key 삭제
del person["phone"], person["age"]
print("phone, age 삭제 후:", person)
```

### 딕셔너리 전체 삭제

딕셔너리에서 모든 key-value 쌍을 삭제하려면 <span class="yellow-code">clear()</span> 메서드를 사용합니다.

```python
person = {
    "name": "양관식",
    "age": 30,
    "phone": "010-1234-5678"
}

print("clear() 전:", person)  # {'name': '양관식', 'age': 30, 'phone': '010-1234-5678'}

person.clear()
print("clear() 후:", person)  # {}
```

#### 문제 2 - 딕셔너리 연산 연습 (중급) 🎯
> 아래 코드의 주석을 참고하여, 딕셔너리 연산을 연습해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
shopping_cart = {}

# 1. 빈 딕셔너리에 상품 추가
# shopping_cart["사과"] = 3
# shopping_cart["바나나"] = 5
# shopping_cart["오렌지"] = 2

# print("장바구니:", shopping_cart)

# 2. 사과 개수를 5개로 수정
# shopping_cart["사과"] = 

# print("사과 개수 수정 후:", shopping_cart)

# 3. 바나나 삭제
# del 

# print("바나나 삭제 후:", shopping_cart)

# 4. 장바구니 비우기
# shopping_cart.

# print("장바구니 비운 후:", shopping_cart)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  shopping_cart = {}

  # 1. 빈 딕셔너리에 상품 추가
  shopping_cart["사과"] = 3
  shopping_cart["바나나"] = 5
  shopping_cart["오렌지"] = 2

  print("장바구니:", shopping_cart)

  # 2. 사과 개수를 5개로 수정
  shopping_cart["사과"] = 5

  print("사과 개수 수정 후:", shopping_cart)

  # 3. 바나나 삭제
  del shopping_cart["바나나"]

  print("바나나 삭제 후:", shopping_cart)

  # 4. 장바구니 비우기
  shopping_cart.clear()

  print("장바구니 비운 후:", shopping_cart)

  # 실행 결과:
  # 장바구니: {'사과': 3, '바나나': 5, '오렌지': 2}
  # 사과 개수 수정 후: {'사과': 5, '바나나': 5, '오렌지': 2}
  # 바나나 삭제 후: {'사과': 5, '오렌지': 2}
  # 장바구니 비운 후: {}
  </code></pre>
</details>

## 3. 딕셔너리 메서드 🛠️

파이썬의 딕셔너리는 다양한 작업을 수행하는 데 도움이 되는 여러 메서드를 제공합니다.

### keys() 메서드

<span class="yellow-code">keys()</span> 메서드는 딕셔너리의 모든 key 값들을 <span class="blue-text">dict_keys</span> 형태로 반환합니다.

```python
person = {
    "name": "양관식",
    "age": 30,
    "phone": "010-1234-5678",
    "city": "서울"
}

# keys() 메서드 사용
keys = person.keys()
print(keys)        # dict_keys(['name', 'age', 'phone', 'city'])
print(type(keys))  # <class 'dict_keys'>

# for문과 함께 사용
for key in person.keys():
    print(f"{key}: {person[key]}")

# 리스트로 변환
keys_list = list(person.keys())
print(keys_list)  # ['name', 'age', 'phone', 'city']
```

> 💡 **팁**: <span class="yellow-code">dict_keys</span>는 성능 향상을 위해 리스트가 아닌 특별한 형태로 반환됩니다! 리스트로 변환하려면 <span class="yellow-code">list()</span> 함수를 사용하세요! 🔄

### values() 메서드

<span class="yellow-code">values()</span> 메서드는 딕셔너리의 모든 value 값들을 <span class="blue-text">dict_values</span> 형태로 반환합니다.

```python
person = {
    "name": "양관식",
    "age": 30,
    "phone": "010-1234-5678",
    "city": "서울"
}

# values() 메서드 사용
values = person.values()
print(values)        # dict_values(['양관식', 30, '010-1234-5678', '서울'])
print(type(values))  # <class 'dict_values'>

# for문과 함께 사용
for value in person.values():
    print(value)

# 리스트로 변환 후 처리
values_list = list(person.values())
print(values_list)  # ['양관식', 30, '010-1234-5678', '서울']
```

### items() 메서드

<span class="yellow-code">items()</span> 메서드는 딕셔너리의 key와 value를 하나의 쌍으로 묶어 <span class="blue-text">dict_items</span> 형태로 반환합니다.

```python
person = {
    "name": "양관식",
    "age": 30,
    "phone": "010-1234-5678"
}

# items() 메서드 사용
items = person.items()
print(items)        # dict_items([('name', '양관식'), ('age', 30), ('phone', '010-1234-5678')])
print(type(items))  # <class 'dict_items'>

# for문과 함께 사용 (가장 많이 사용)
for key, value in person.items():
    print(f"{key}: {value}")

# 리스트로 변환 후 처리
items_list = list(person.items())
print(items_list)  # [('name', '양관식'), ('age', 30), ('phone', '010-1234-5678')]
```

### 딕셔너리 정렬: sorted()

딕셔너리 요소들을 key 값을 기준으로 정렬하려면 <span class="yellow-code">sorted()</span> 함수를 사용합니다.

```python
scores = {
    "김철수": 85,
    "이영희": 92,
    "박민수": 78,
    "최지영": 96
}

# key 기준으로 정렬
sorted_by_key = sorted(scores.items())
print("key 기준 정렬:", sorted_by_key)
# [('김철수', 85), ('박민수', 78), ('이영희', 92), ('최지영', 96)]

# value 기준으로 정렬 (오름차순)
sorted_by_value = sorted(scores.items(), key=lambda x: x[1])
print("value 기준 오름차순:", sorted_by_value)
# [('박민수', 78), ('김철수', 85), ('이영희', 92), ('최지영', 96)]

# value 기준으로 정렬 (내림차순)
sorted_by_value_desc = sorted(scores.items(), key=lambda x: x[1], reverse=True)
print("value 기준 내림차순:", sorted_by_value_desc)
# [('최지영', 96), ('이영희', 92), ('김철수', 85), ('박민수', 78)]
```

> 💡 **팁**: <span class="yellow-code">items()</span> 메서드는 딕셔너리를 순회할 때 가장 많이 사용되는 메서드입니다! key와 value를 동시에 얻을 수 있어 매우 유용합니다! 🎯

#### 문제 3 - 딕셔너리 메서드 연습 (중급) 🎯
> 아래 코드의 주석을 참고하여, 딕셔너리 메서드를 사용해보세요.

```python
# TODO: 아래 주석을 참고하여 코드를 완성해보세요
student_scores = {
    "김철수": 85,
    "이영희": 92,
    "박민수": 78,
    "최지영": 96,
    "정수진": 88
}

# 1. 모든 학생 이름 출력 (keys() 사용)
# names = 
# print("학생 이름들:", names)

# 2. 모든 점수 출력 (values() 사용)
# scores = 
# print("점수들:", scores)

# 3. 학생별 점수 출력 (items() 사용)
# print("학생별 점수:")
# for 

# 4. 점수 기준으로 내림차순 정렬
# sorted_scores = 
# print("점수 내림차순:", sorted_scores)
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  student_scores = {
      "김철수": 85,
      "이영희": 92,
      "박민수": 78,
      "최지영": 96,
      "정수진": 88
  }

  # 1. 모든 학생 이름 출력 (keys() 사용)
  names = list(student_scores.keys())
  print("학생 이름들:", names)

  # 2. 모든 점수 출력 (values() 사용)
  scores = list(student_scores.values())
  print("점수들:", scores)

  # 3. 학생별 점수 출력 (items() 사용)
  print("학생별 점수:")
  for name, score in student_scores.items():
      print(f"{name}: {score}점")

  # 4. 점수 기준으로 내림차순 정렬
  sorted_scores = sorted(student_scores.items(), key=lambda x: x[1], reverse=True)
  print("점수 내림차순:", sorted_scores)

  # 실행 결과:
  # 학생 이름들: ['김철수', '이영희', '박민수', '최지영', '정수진']
  # 점수들: [85, 92, 78, 96, 88]
  # 학생별 점수:
  # 김철수: 85점
  # 이영희: 92점
  # 박민수: 78점
  # 최지영: 96점
  # 정수진: 88점
  # 점수 내림차순: [('최지영', 96), ('이영희', 92), ('정수진', 88), ('김철수', 85), ('박민수', 78)]
  </code></pre>
</details>

## 4. 실전 예제 🚀

### 예제 1: 학생 성적 관리 시스템

```python
# 학생 성적 관리 시스템
students = {
    "김철수": {"국어": 85, "영어": 92, "수학": 78},
    "이영희": {"국어": 96, "영어": 88, "수학": 95},
    "박민수": {"국어": 78, "영어": 85, "수학": 82}
}

def calculate_average(scores):
    return sum(scores.values()) / len(scores)

def show_student_info():
    for name, subjects in students.items():
        avg = calculate_average(subjects)
        print(f"{name}: 평균 {avg:.1f}점")
        for subject, score in subjects.items():
            print(f"  {subject}: {score}점")
        print()

show_student_info()
```

### 예제 2: 쇼핑몰 장바구니

```python
# 쇼핑몰 장바구니 시스템
cart = {}

def add_to_cart(item, quantity, price):
    if item in cart:
        cart[item]["quantity"] += quantity
    else:
        cart[item] = {"quantity": quantity, "price": price}
    print(f"{item} {quantity}개가 장바구니에 추가되었습니다.")

def remove_from_cart(item):
    if item in cart:
        del cart[item]
        print(f"{item}이(가) 장바구니에서 삭제되었습니다.")
    else:
        print(f"{item}이(가) 장바구니에 없습니다.")

def show_cart():
    total = 0
    print("=== 장바구니 ===")
    for item, info in cart.items():
        subtotal = info["quantity"] * info["price"]
        total += subtotal
        print(f"{item}: {info['quantity']}개 × {info['price']}원 = {subtotal}원")
    print(f"총 금액: {total}원")

# 사용 예제
add_to_cart("사과", 3, 2000)
add_to_cart("바나나", 5, 1500)
add_to_cart("사과", 2, 2000)  # 기존 상품 추가
show_cart()
```

### 예제 3: 단어 빈도 분석

```python
# 텍스트에서 단어 빈도 분석
text = "python is great python is powerful python is easy"
words = text.split()

word_count = {}
for word in words:
    word_count[word] = word_count.get(word, 0) + 1

print("단어 빈도:")
for word, count in sorted(word_count.items(), key=lambda x: x[1], reverse=True):
    print(f"{word}: {count}번")
```

## 5. 주의사항 및 팁 ⚠️

### 딕셔너리 사용 시 주의사항

1. **KeyError 방지**: 존재하지 않는 key로 접근할 때는 <span class="yellow-code">get()</span> 메서드를 사용하세요.
2. **Key의 불변성**: 딕셔너리의 key는 불변 객체(문자열, 숫자, 튜플)만 사용할 수 있습니다.
3. **순서 보장**: Python 3.7+에서는 딕셔너리가 삽입 순서를 보장합니다.

### 성능 최적화 팁

```python
# 비효율적인 코드
if "key" in my_dict:
    value = my_dict["key"]
else:
    value = "default"

# 효율적인 코드
value = my_dict.get("key", "default")

# 또는 더 간단하게
value = my_dict.setdefault("key", "default")
```

### 디버깅 팁

```python
# 딕셔너리 디버깅을 위한 print문 활용
person = {"name": "양관식", "age": 30}

print(f"딕셔너리 내용: {person}")
print(f"딕셔너리 길이: {len(person)}")
print(f"키 목록: {list(person.keys())}")
print(f"값 목록: {list(person.values())}")

# 각 항목 확인
for key, value in person.items():
    print(f"키: {key}, 값: {value}, 타입: {type(value)}")
```

> 💡 **팁**: 딕셔너리를 사용할 때는 <span class="blue-text">key의 고유성과 접근 효율성</span>을 고려하여 적절한 구조를 설계하세요! 복잡한 데이터는 중첩 딕셔너리를 활용하는 것이 좋습니다! 🎯

## 6. 연습 문제 🎯

### 문제 1: 딕셔너리 기본 조작 (기초)
다음 요구사항을 만족하는 프로그램을 작성하세요:
1. 빈 딕셔너리를 만들고 학생 정보 3명 추가
2. 특정 학생의 점수 수정
3. 가장 높은 점수를 받은 학생 찾기
4. 모든 학생의 평균 점수 계산

### 문제 2: 단어 빈도 분석 (중급)
주어진 텍스트에서 단어의 빈도를 분석하는 프로그램을 작성하세요:
1. 텍스트를 단어로 분리
2. 각 단어의 출현 횟수 계산
3. 빈도가 높은 순서대로 정렬하여 출력
4. 가장 많이 나온 단어와 그 빈도 출력

### 문제 3: 학생 관리 시스템 (고급)
학생 정보를 관리하는 시스템을 작성하세요:
1. 학생 추가, 삭제, 수정 기능
2. 과목별 평균 점수 계산
3. 성적 등급 계산 (A: 90+, B: 80+, C: 70+, D: 60+, F: 60미만)
4. 전체 학생의 성적 통계 출력

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 문제 1: 딕셔너리 기본 조작
  students = {}
  students["김철수"] = 85
  students["이영희"] = 92
  students["박민수"] = 78
  
  students["김철수"] = 90  # 점수 수정
  
  best_student = max(students.items(), key=lambda x: x[1])
  average = sum(students.values()) / len(students)
  
  print(f"최고점 학생: {best_student[0]} ({best_student[1]}점)")
  print(f"평균 점수: {average:.1f}")

  # 문제 2: 단어 빈도 분석
  text = "python is great python is powerful python is easy to learn"
  words = text.split()
  
  word_count = {}
  for word in words:
      word_count[word] = word_count.get(word, 0) + 1
  
  sorted_words = sorted(word_count.items(), key=lambda x: x[1], reverse=True)
  print("단어 빈도 (내림차순):")
  for word, count in sorted_words:
      print(f"{word}: {count}번")
  
  most_frequent = sorted_words[0]
  print(f"가장 많이 나온 단어: {most_frequent[0]} ({most_frequent[1]}번)")

  # 문제 3: 학생 관리 시스템
  class StudentManager:
      def __init__(self):
          self.students = {}
      
      def add_student(self, name, scores):
          self.students[name] = scores
      
      def remove_student(self, name):
          if name in self.students:
              del self.students[name]
              return True
          return False
      
      def calculate_grade(self, score):
          if score >= 90: return "A"
          elif score >= 80: return "B"
          elif score >= 70: return "C"
          elif score >= 60: return "D"
          else: return "F"
      
      def show_statistics(self):
          all_scores = []
          for name, scores in self.students.items():
              avg = sum(scores.values()) / len(scores)
              grade = self.calculate_grade(avg)
              print(f"{name}: 평균 {avg:.1f}점 ({grade}등급)")
              all_scores.extend(scores.values())
          
          if all_scores:
              print(f"전체 평균: {sum(all_scores)/len(all_scores):.1f}점")

  # 사용 예제
  manager = StudentManager()
  manager.add_student("김철수", {"국어": 85, "영어": 92, "수학": 78})
  manager.add_student("이영희", {"국어": 96, "영어": 88, "수학": 95})
  manager.show_statistics()
  </code></pre>
</details>

---

딕셔너리는 파이썬에서 가장 유용한 자료구조 중 하나입니다. key-value 쌍을 통해 데이터를 효율적으로 관리하고 접근할 수 있어, 실제 프로그래밍에서 매우 많이 사용됩니다. 다양한 예제를 통해 딕셔너리의 활용법을 익혀보세요! 🚀
