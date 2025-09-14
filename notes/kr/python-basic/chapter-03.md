---
layout: article
title: 3. 조건문
permalink: /notes/kr/python-basic/chapter-03
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 기초 과정 강의 노트, 조건문 개념과 활용 방법을 다룹니다.
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

## 1. 조건문 🎯
조건문은 프로그래밍에서 특정 조건에 따라 프로그램의 흐름을 제어하는 구문을 말합니다.  
이를 통해 우리는 여러 가지 요인들을 기반으로 사용자의 입력이나 시스템의 상태에 따라 프로그램의 동작을 다르게 설정할 수 있습니다.

<!-- 시간에 따라 기상하는 그림 다이어그램 -->
<figure>
    <img src="/notes/assets/python-basic/chapter-03-01.png" width="70%" alt="조건문 흐름도">
    <figcaption>조건문 흐름도</figcaption>
</figure>

## 2. if 문 🔍
파이썬에서 사용하는 조건문은 <span class="yellow-code">if</span>, <span class="yellow-code">else</span>, <span class="yellow-code">elif</span> 등의 키워드를 사용합니다.  
그중에서도 가장 기본이 되는 <span class="blue-text">if 문</span>부터 시작하겠습니다.

```python
if 조건식:
    실행할 코드
```

<!-- if문 다이어그램 -->
<figure>
    <img src="/notes/assets/python-basic/chapter-03-02.png" width="30%" alt="if문 구조">
    <figcaption>if문 구조</figcaption>
</figure>

조건식이 <span class="green-text">참</span>이면, 코드를 실행하겠다는 의미입니다.

> 💡 **팁**: 파이썬은 <span class="red-text">들여쓰기</span>가 중요한 언어입니다! 조건문 안의 코드는 반드시 들여쓰기를 해야 합니다. 🐍

```python
# 기본 if문 예제
if 7 > 1:
    print("7은 1보다 큽니다.")

# 변수 활용 예제
age = 20
if age >= 18:
    print("성인입니다.")

# 문자열 비교 예제
name = "Alice"
if name == "Alice":
    print("안녕하세요, Alice님!")

# 불린값 활용 예제
is_student = True
if is_student:
    print("학생 할인이 적용됩니다.")

# 숫자 범위 확인 예제
score = 85
if score >= 80:
    print("우수한 성적입니다!")
```

#### 문제 1 - if문 사용하기 (기초) 🎯
> 아래 코드의 주석을 참고하여, if문을 사용해 조건을 확인해보세요.

```python
# 기본 변수
temperature = 25
is_sunny = True
age = 17

print("=== if문 연습 ===")
print("온도:", temperature, "맑음:", is_sunny, "나이:", age)

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. 온도가 20도 이상이면 "따뜻한 날씨입니다" 출력
if True:
    pass

# 2. 맑은 날이면 "야외 활동하기 좋은 날입니다" 출력
if True:
    pass

# 3. 나이가 18세 이상이면 "성인입니다" 출력
if True:
    pass

# 4. 온도가 30도 이상이면 "더운 날씨입니다" 출력
if True:
    pass
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 기본 변수
  temperature = 25
  is_sunny = True
  age = 17

  print("=== if문 연습 ===")
  print("온도:", temperature, "맑음:", is_sunny, "나이:", age)

  # 1. 온도가 20도 이상이면 "따뜻한 날씨입니다" 출력
  if temperature >= 20:
      print("따뜻한 날씨입니다")

  # 2. 맑은 날이면 "야외 활동하기 좋은 날입니다" 출력
  if is_sunny:
      print("야외 활동하기 좋은 날입니다")

  # 3. 나이가 18세 이상이면 "성인입니다" 출력
  if age >= 18:
      print("성인입니다")

  # 4. 온도가 30도 이상이면 "더운 날씨입니다" 출력
  if temperature >= 30:
      print("더운 날씨입니다")
  </code></pre>
</details>

## 3. if-else 문 ⚖️
if문은 조건식이 참일 때만 원하는 코드를 실행할 수 있습니다.  
하지만 실제 코딩에서는 조건이 거짓일 때도 고려해야 하는 경우가 많습니다.  
그렇다면 조건이 거짓일 때 실행하고 싶은 코드가 있다면 어떻게 흐름을 제어할까요?  
이러한 문제를 해결하기 위해 <span class="blue-text">else문</span>을 사용합니다.  
else문은 if문이 거짓일 때, 즉 <span class="red-text">False</span>일 때 실행되는 코드입니다.

```python
if 조건식:
    참일 때 실행할 코드
else:
    거짓일 때 실행할 코드
```

<!-- if-else문 다이어그램 -->
<figure>
    <img src="/notes/assets/python-basic/chapter-03-03.png" width="30%" alt="if-else문 구조">
    <figcaption>if-else문 구조</figcaption>
</figure>

```python
# 기본 if-else문 예제
age = 17
if age >= 18:
    print("성인입니다.")
else:
    print("미성년자입니다.")

# 점수에 따른 등급 판정
score = 75
if score >= 80:
    print("우수한 성적입니다!")
else:
    print("더 열심히 공부하세요.")

# 날씨에 따른 활동 추천
is_rainy = False
if is_rainy:
    print("우산을 챙기세요.")
else:
    print("야외 활동을 즐기세요!")

# 짝수/홀수 판별
number = 7
if number % 2 == 0:
    print("짝수입니다.")
else:
    print("홀수입니다.")
```

#### 문제 2 - if-else문 사용하기 (기초) 🎯
> 아래 코드의 주석을 참고하여, if-else문을 사용해 조건을 판단해보세요.

```python
# 기본 변수
temperature = 15
has_umbrella = False
score = 85

print("=== if-else문 연습 ===")
print("온도:", temperature, "우산 있음:", has_umbrella, "점수:", score)

# TODO: 아래 주석을 참고하여 코드를 완성해보세요
# 1. 온도가 20도 이상이면 "따뜻함", 아니면 "추움" 출력

# 2. 우산이 있으면 "비 올 때도 안전", 아니면 "우산 챙기세요" 출력

# 3. 점수가 80점 이상이면 "합격", 아니면 "불합격" 출력
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  # 기본 변수
  temperature = 15
  has_umbrella = False
  score = 85

  print("=== if-else문 연습 ===")
  print("온도:", temperature, "우산 있음:", has_umbrella, "점수:", score)

  # 1. 온도가 20도 이상이면 "따뜻함", 아니면 "추움" 출력
  if temperature >= 20:
      print("따뜻함")
  else:
      print("추움")

  # 2. 우산이 있으면 "비 올 때도 안전", 아니면 "우산 챙기세요" 출력
  if has_umbrella:
      print("비 올 때도 안전")
  else:
      print("우산 챙기세요")

  # 3. 점수가 80점 이상이면 "합격", 아니면 "불합격" 출력
  if score >= 80:
      print("합격")
  else:
      print("불합격")
  </code></pre>
</details>

## 4. elif 문 🔄
여러 조건을 순차적으로 확인해야 할 때는 <span class="blue-text">elif문</span>을 사용합니다.  
elif는 "else if"의 줄임말로, 이전 조건이 거짓일 때 다음 조건을 확인합니다.

```python
if 조건1:
    조건1이 참일 때 실행할 코드
elif 조건2:
    조건1이 거짓이고 조건2가 참일 때 실행할 코드
elif 조건3:
    조건1, 2가 거짓이고 조건3이 참일 때 실행할 코드
else:
    모든 조건이 거짓일 때 실행할 코드
```

<!-- elif문 다이어그램 -->
<figure>
    <img src="/notes/assets/python-basic/chapter-03-04.png" width="40%" alt="elif문 구조">
    <figcaption>elif문 구조</figcaption>
</figure>

```python
# 점수에 따른 등급 판정
score = 85
if score >= 90:
    print("A등급입니다!")
elif score >= 80:
    print("B등급입니다!")
elif score >= 70:
    print("C등급입니다!")
elif score >= 60:
    print("D등급입니다!")
else:
    print("F등급입니다. 다시 도전하세요!")

# 나이에 따른 요금 계산
age = 25
if age < 8:
    print("무료입니다.")
elif age < 18:
    print("청소년 요금: 5000원")
elif age < 65:
    print("성인 요금: 10000원")
else:
    print("경로 요금: 7000원")

# 사용자 입력 받기
name = input("이름을 입력하세요: ")
if name == "Alice":
    print("안녕하세요, Alice님!")
elif name == "Bob":
    print("안녕하세요, Bob님!")
elif name == "Charlie":
    print("안녕하세요, Charlie님!")
else:
    print(f"안녕하세요, {name}님!")
```

#### 문제 3 - elif문 사용하기 (중급) 🎯
> 아래 코드의 주석을 참고하여, elif문을 사용해 여러 조건을 판단해보세요.

```python
print("=== 성적 등급 판정 시스템 ===")
score = int(input("점수를 입력하세요 (0-100): "))

# TODO: 점수에 따라 등급을 판정하는 elif문 작성

print("\n=== 나이별 요금 계산 ===")
age = int(input("나이를 입력하세요: "))

# TODO: 나이에 따라 요금을 계산하는 elif문 작성
```

<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-python">
  print("=== 성적 등급 판정 시스템 ===")
  score = int(input("점수를 입력하세요 (0-100): "))

  # 1. 점수에 따라 등급을 판정하는 elif문 작성
  if score >= 90:
      print("A등급입니다!")
  elif score >= 80:
      print("B등급입니다!")
  elif score >= 70:
      print("C등급입니다!")
  elif score >= 60:
      print("D등급입니다!")
  else:
      print("F등급입니다. 다시 도전하세요!")

  print("\n=== 나이별 요금 계산 ===")
  age = int(input("나이를 입력하세요: "))

  # 나이에 따라 요금을 계산하는 elif문 작성
  if age < 8:
      print("무료입니다.")
  elif age < 18:
      print("청소년 요금: 5000원")
  elif age < 65:
      print("성인 요금: 10000원")
  else:
      print("경로 요금: 7000원")
  </code></pre>
</details>

> 💡 **팁**: <span class="yellow-code">input()</span> 함수는 사용자로부터 입력을 받는 함수입니다.  
> 입력받은 값은 항상 문자열이므로, 숫자로 사용하려면 <span class="yellow-code">int()</span>나 <span class="yellow-code">float()</span>로 변환해야 합니다! 🔢