---
layout: article
title: 4. 예외 처리
permalink: /notes/kr/python-deep-dive/chapter-04
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 초급 과정 강의 노트, 예외의 개념과 try-except, finally, raise, 사용자 정의 예외 활용 방법을 다룹니다.
keywords: "Python, 예외 처리, Exception, try-except, raise, 사용자 정의 예외"
---

<style>
    /* 색상 규칙
      빨강: 주의, 경고, 위험 (에러, 치명적 상황)
      파랑: 핵심 개념, 주요 키워드 (클래스, 문법 요소)
      초록: 안전, 좋은 습관, 정답 보기
      노랑: 코드 요소 (함수명, 변수명 등)
    */
    .red-text { color: #D53C41; font-weight: bold; }
    .blue-text { color: #203BB0; font-weight: bold; }
    .green-text { color: #448F52; font-weight: bold; }
    .yellow-code { color: #BD8739; font-weight: bold; }
</style>

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Python%20DeepDive&reversal=false&textBg=false)

## 1. 예외란?
프로그램 실행 도중 발생하는 <span class="blue-text">예상치 못한 상황</span>을 말합니다.  
- <span class="red-text">에러(Error)</span>: 시스템 레벨 문제 (메모리 부족, 심각한 버그 등)  
- <span class="blue-text">예외(Exception)</span>: 사용자의 잘못된 입력, 파일 없음 등 코드 실행 중 처리 가능한 문제  

```python
# ZeroDivisionError 예시
print(7 / 0)
```
실행하면 <span class="red-text">ZeroDivisionError</span>가 발생합니다.


## 2. 대표적인 예외 클래스
- <span class="blue-text">BaseException</span>: 최상위 예외 클래스  
- Exception: 대부분 예외의 부모  
- ArithmeticError, AttributeError, EOFError, FileNotFoundError, IndexError, NameError, SyntaxError, TypeError, ValueError 등  

```python
num1 = int(input("첫 번째 정수를 입력하세요: "))
num2 = int(input("두 번째 정수를 입력하세요: "))
print("결과:", num1 / num2)
```
문자 입력 시 <span class="red-text">ValueError</span>, 0 입력 시 <span class="red-text">ZeroDivisionError</span> 발생.

## 3. 예외 처리 문법

### try-except
```python
try:
    num = int(input("정수를 입력하세요: "))
    print(10 / num)
except ArithmeticError:
    print("산술 연산 오류!")
except ValueError:
    print("잘못된 입력값입니다.")
```

### try-except [as 변수]
```python
try:
    lst = [1,2,3]
    print(lst[5])
except IndexError as e:
    print("예외 메시지:", e)
```

### try-finally
```python
try:
    f = open("test.txt", "w")
    f.write("Hello")
except IOError as e:
    print("파일 오류:", e)
finally:
    f.close()
    print("파일 닫기 완료:", f.closed)
```

### try-except-else
```python
try:
    num = int(input("숫자 입력: "))
except ValueError:
    print("숫자가 아닙니다.")
else:
    print("정상 입력:", num)
```

### 연습 문제 1 - 숫자 입력 검증
> 사용자에게 숫자를 입력받아 100을 나눈 결과를 출력하세요.   
> 만약 숫자가 아닌 값을 입력하면 <span class="red-text">ValueError</span>를 처리하여 "숫자만 입력 가능합니다."라는 메시지를 출력하세요.   
> 0을 입력하면 <span class="red-text">ZeroDivisionError</span>를 처리하여 "0으로는 나눌 수 없습니다."라는 메시지를 출력하세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    try:
      num = int(input("숫자 입력: "))
      print("100 /", num, "=", 100 / num)
    except ValueError:
      print("숫자만 입력 가능합니다.")
    except ZeroDivisionError:
      print("0으로는 나눌 수 없습니다.")
  </code></pre>
</details>

## 4. 커스텀 예외

### raise (강제로 예외 발생)
```python
age = int(input("나이를 입력하세요: "))
if age < 0 or age > 150:
    raise Exception("나이는 0 이상 150 이하로 입력해야 합니다.")
```

### 사용자 정의 예외 클래스
```python
class AgeError(Exception):
    def __init__(self):
        super().__init__("사람의 나이는 0이상 200 미만으로 입력해 주세요.")

try:
    age = int(input("나이: "))
    if age < 0 or age >= 200:
        raise AgeError()
    print("입력한 나이:", age)
except AgeError as e:
    print("예외 발생:", e)
```

## 5. 단계별 실습 문제

### 문제 1 - 은행 입금 (기초)
> 사용자에게 입금 금액을 입력받아 출력하세요.  
> 단, 음수이면 <span class="red-text">Exception 예외를 발생</span>시키고 메시지를 출력하세요.  

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    amount = int(input("입금 금액: "))
    if amount < 0:
        raise Exception("음수 금액은 허용되지 않습니다.")
    print("입금 완료:", amount, "원")
  </code></pre>
</details>

### 문제 2 - SNS 글쓰기 (기초)
> 글을 입력받아 출력하세요.  
> 글자 수가 100자를 초과하면 <span class="red-text">Exception 예외를 발생</span>시키세요.  

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    post = input("글 입력: ")
    if len(post) > 100:
        raise Exception("100자를 초과했습니다.")
    print("게시 성공:", post)
  </code></pre>
</details>

### 문제 3 - 쇼핑몰 주문 (중급)
> 재고 5개가 있는 상품을 주문받으세요.  
> 주문 수량이 재고를 초과하면 <span class="red-text">Exception 예외 처리</span>하세요.  

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    stock = 5
    try:
        qty = int(input("주문 수량: "))
        if qty > stock:
            raise Exception("재고 부족: 남은 수량은 " + str(stock))
        print("주문 완료:", qty, "개")
    except Exception as e:
        print("주문 실패:", e)
  </code></pre>
</details>


### 문제 4 - 로그인 검증 (중급)
> 아이디와 비밀번호를 입력받아 검증하세요.  
> 아이디 또는 비밀번호가 틀리면 <span class="red-text">Exception 예외를 발생</span>시키세요.  

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    USER = "admin"
    PWD = "1234"  
    try:
        uid = input("아이디: ")
        pw = input("비밀번호: ")
        if uid != USER or pw != PWD:
            raise Exception("로그인 실패")
        print("로그인 성공!")
    except Exception as e:
        print(e)
  </code></pre>
</details>


### 문제 5 - 사용자 정의 예외 (심화)
> 음수를 입력하면 <span class="blue-text">NegativeNumberError</span>라는 사용자 정의 예외를 발생시키세요.  

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    class NegativeNumberError(Exception):
        def __init__(self):
            super().__init__("음수는 허용되지 않습니다.")  
    try:
        num = int(input("숫자 입력: "))
        if num < 0:
            raise NegativeNumberError()
        print("입력된 숫자:", num)
    except NegativeNumberError as e:
        print("예외 발생:", e)
  </code></pre>
</details>
