---
layout: article
title: 3. 클래스와 객체지향 프로그래밍
permalink: /notes/kr/python-deep-dive/chapter-03
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 심화 과정 강의 노트, 클래스와 객체를 사용한 객체지향 프로그래밍의 기초를 다룹니다.
keywords: "Python, Class, Object, OOP, __init__, self, Inheritance, 클래스, 객체, 상속"
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

>현실 세계의 모든 것을 '객체'로 보고, 그 객체들의 상호작용으로 프로그램을 만드는 방식을 <span class="blue-text">객체지향 프로그래밍(Object-Oriented Programming, OOP)</span>이라고 해요.   
>데이터를 단순히 변수에 담는 것을 넘어, 관련된 데이터와 행동(함수)을 하나로 묶어 관리하는 아주 강력한 방법이죠.

---

## 1. 클래스와 객체: 개념 이해하기

가장 먼저 알아야 할 두 가지 핵심 개념은 '클래스'와 '객체'입니다.

*   <span class="blue-text">**클래스(Class)**</span>: 객체를 만들기 위한 **설계도** 또는 **틀**이에요. 예를 들어 '붕어빵 틀'이 바로 클래스입니다. 클래스는 객체가 어떤 데이터(속성)와 어떤 행동(메서드)을 가질지 정의합니다.
*   <span class="blue-text">**객체(Object)**</span>: 클래스라는 설계도로 만들어 낸 **실체**입니다. '붕어빵 틀'로 찍어낸 '팥 붕어빵', '슈크림 붕어빵'이 각각의 객체(또는 **인스턴스**)가 되는 거죠.

> 💡 **클래스(설계도)**로 **객체(실체)**를 만드는 과정을 **인스턴스화**(instantiation)라고 부릅니다.

<figure>
<img src="/notes/assets/python-deep-dive/chapter-03-01.png" width="70%" alt="예외 클래스 구조"/>
</figure>

## 2. 클래스 만들고 사용하기

파이썬에서는 `class` 키워드를 사용해 클래스를 정의합니다.

```python
# '사람'이라는 개념을 표현하는 Person 클래스(설계도)를 만듭니다.
class Person:
    # 클래스에 소속된 함수를 '메서드'라고 부릅니다.
    # 메서드의 첫 번째 매개변수는 항상 'self'여야 합니다.
    def introduce(self):
        print("안녕하세요, 저는 사람입니다.")

# Person 클래스를 이용해 p1이라는 객체(실체)를 만듭니다. (인스턴스화)
p1 = Person()

# p1 객체의 메서드를 호출합니다.
p1.introduce() # 출력: 안녕하세요, 저는 사람입니다.
```

### `self`는 대체 뭔가요?

<code class="yellow-code">self</code>는 **객체 자기 자신**을 가리키는 특별한 약속입니다. 메서드가 호출될 때 "누가 이 메서드를 호출했는가?"에 대한 정보를 담고 있죠. `p1.introduce()`가 실행될 때, 파이썬은 내부적으로 `Person.introduce(p1)`처럼 `p1` 객체를 첫 번째 인자로 넘겨줍니다. `self` 덕분에 각 객체는 자신만의 데이터를 가질 수 있게 됩니다.

## 3. 생성자 `__init__`: 객체의 탄생

객체가 처음 만들어질 때, 이름이나 나이처럼 각자 다른 초기값을 설정해주고 싶을 때가 많습니다. 이때 사용하는 특별한 메서드가 바로 <span class="blue-text">생성자(Constructor)</span>인 <code class="yellow-code">__init__</code>입니다.

<code class="yellow-code">__init__</code> 메서드는 객체가 생성되는 시점에 **자동으로 딱 한 번 호출**됩니다.

```python
class Person:
    # 객체가 생성될 때 이름(name)을 받아 초기화합니다.
    def __init__(self, name):
        # self.name은 이 객체에 소속된 변수(인스턴스 변수)가 됩니다.
        self.name = name
        print(f"{self.name}님이 태어났습니다!")

    def introduce(self):
        # self.name을 이용해 자기 이름을 소개합니다.
        print(f"안녕하세요, 제 이름은 {self.name}입니다.")

# Person 객체를 만들 때 'name' 값을 전달해야 합니다.
person1 = Person("철수") # 출력: 철수님이 태어났습니다!
person2 = Person("영희") # 출력: 영희님이 태어났습니다!

person1.introduce() # 출력: 안녕하세요, 제 이름은 철수입니다.
person2.introduce() # 출력: 안녕하세요, 제 이름은 영희입니다.
```

## 4. 상속: 설계도 물려받기

<span class="blue-text">상속(Inheritance)</span>은 기존 클래스(부모)의 모든 기능(메서드, 속성)을 그대로 물려받아 새로운 클래스(자식)를 만드는 방법입니다. 코드의 재사용성을 극대화할 수 있죠.

> 예를 들어, '학생'은 '사람'의 특징을 모두 가지면서도 '공부한다'는 추가적인 행동을 할 수 있습니다.

```python
# Person 클래스는 부모 클래스가 됩니다.
class Person:
    def __init__(self, name):
        self.name = name
    def introduce(self):
        print(f"제 이름은 {self.name}입니다.")

# Person 클래스를 상속받는 Student 클래스(자식)를 정의합니다.
class Student(Person):
    # 자식 클래스만의 새로운 메서드를 추가할 수 있습니다.
    def study(self):
        print(f"{self.name} 학생은 공부를 합니다.")

# Student 객체를 만듭니다.
s1 = Student("민준")

# 부모 클래스(Person)의 메서드를 그대로 사용할 수 있습니다.
s1.introduce() # 출력: 제 이름은 민준입니다.

# 자식 클래스(Student)에만 있는 메서드도 사용할 수 있습니다.
s1.study()     # 출력: 민준 학생은 공부를 합니다.
```

## 5. 종합 연습문제

### 문제 1 (기초): 나만의 강아지 만들기
> `Dog` 클래스를 만드세요.
> 1. `__init__` 메서드에서 `name`과 `breed`(품종)을 받아 초기화하세요.
> 2. `bark` 메서드를 만들어 호출하면 "{이름}(이)가 멍멍! 짖습니다."라고 출력하게 하세요.
> 3. "뽀삐", "말티즈"를 가진 `Dog` 객체를 만들어 `bark` 메서드를 호출해보세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    class Dog:
        def __init__(self, name, breed):
            self.name = name
            self.breed = breed
        
        def bark(self):
            print(f"{self.name}(이)가 멍멍! 짖습니다.")

    my_dog = Dog("뽀삐", "말티즈")
    my_dog.bark()
  </code></pre>
</details>

### 문제 2 (중급): 은행 계좌 관리하기
> `BankAccount` 클래스를 만드세요.
> 1. `__init__`에서 `owner_name`(예금주)과 `balance`(잔액)을 초기화하세요. `balance`의 기본값은 0입니다.
> 2. `deposit`(입금) 메서드를 만들어 금액을 인자로 받아 `balance`에 더하고, "입금 후 잔액: {잔액}원"을 출력하세요.
> 3. `withdraw`(출금) 메서드를 만들어 금액을 인자로 받아 `balance`에서 빼고, "출금 후 잔액: {잔액}원"을 출력하세요.
> 4. **(도전)** `withdraw` 시 출금하려는 금액이 잔액보다 많으면 "잔액이 부족합니다."를 출력하고 출금을 막아보세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    class BankAccount:
        def __init__(self, owner_name, balance=0):
            self.owner_name = owner_name
            self.balance = balance
        
        def deposit(self, amount):
            self.balance += amount
            print(f"입금 후 잔액: {self.balance}원")

        def withdraw(self, amount):
            if amount > self.balance:
                print("잔액이 부족합니다.")
            else:
                self.balance -= amount
                print(f"출금 후 잔액: {self.balance}원")

    account = BankAccount("홍길동", 10000)
    account.deposit(5000)
    account.withdraw(3000)
    account.withdraw(15000)
  </code></pre>
</details>

### 문제 3 (응용): 상속으로 아이템 확장하기
> `Item` 클래스와 이를 상속받는 `Book` 클래스를 만드세요.
> 1. `Item` 클래스는 `__init__`에서 `name`과 `price`를 받습니다. `info` 메서드는 "이름: {name}, 가격: {price}원"을 출력합니다.
> 2. `Book` 클래스는 `Item`을 상속받습니다.
> 3. `Book`의 `__init__`에서는 `name`, `price` 외에 `author`(저자)도 추가로 받습니다. (부모의 `__init__`을 호출하는 방법을 생각해보세요: `super().__init__(...)`)
> 4. `Book`의 `info` 메서드를 **오버라이딩**(재정의)하여 "책이름: {name}, 저자: {author}, 가격: {price}원"을 출력하게 만드세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    class Item:
        def __init__(self, name, price):
            self.name = name
            self.price = price
        
        def info(self):
            print(f"이름: {self.name}, 가격: {self.price}원")

    class Book(Item):
        def __init__(self, name, price, author):
            super().__init__(name, price) # 부모 클래스의 __init__ 호출
            self.author = author
        
        # 부모의 info 메서드를 재정의 (오버라이딩)
        def info(self):
            print(f"책이름: {self.name}, 저자: {self.author}, 가격: {self.price}원")

    book = Book("파이썬 정복", 25000, "김파이")
    book.info()
  </code></pre>
</details>

