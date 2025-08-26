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

파이썬에서 객체지향 프로그래밍을 이해하려면 먼저 '클래스'와 '객체'라는 두 가지 핵심 개념을 알아야 합니다.

*   <span class="blue-text">**클래스(Class)**</span>: 객체를 만들기 위한 **설계도** 또는 **틀**입니다. 예를 들어, '학생(Student)'이라는 클래스를 만들면, 이 클래스는 학생이 어떤 데이터(상태)와 어떤 기능(행동)을 가질지 정의합니다.
*   <span class="blue-text">**객체(Object)**</span>: 클래스라는 설계도를 바탕으로 실제로 만들어진 **실체**입니다. '학생' 클래스를 이용해 '철수', '영희'와 같은 각각의 학생 객체(또는 **인스턴스**)를 만들 수 있습니다.

### 객체의 상태(State)와 행동(Behavior)

- **상태(State)**: 객체가 가지고 있는 데이터, 즉 속성을 의미합니다. 예를 들어 사용자(User) 객체의 경우 `아이디`, `이메일`, `가입일` 등이 상태에 해당합니다.
- **행동(Behavior)**: 객체가 할 수 있는 동작, 즉 메서드를 의미합니다. 사용자 객체는 `로그인하기`, `비밀번호 변경하기`, `프로필 수정하기`와 같은 행동을 가질 수 있습니다.

## 2. 클래스 만들고 사용하기

파이썬에서는 `class` 키워드를 사용해 클래스를 정의합니다.

```python
class 클래스명:
  클래스 변수
  생성자
  메서드
```

```python
# '사용자'라는 개념을 표현하는 User 클래스(설계도)를 만듭니다.
class User:
    # 클래스에 소속된 함수를 '메서드'라고 부릅니다.
    # 메서드의 첫 번째 매개변수는 항상 'self'여야 합니다.
    def introduce(self):
        print("안녕하세요, 저는 사용자입니다.")

# User 클래스를 이용해 u1이라는 객체(실체)를 만듭니다. (인스턴스화)
u1 = User()

# u1 객체의 메서드를 호출합니다.
u1.introduce() # 출력: 안녕하세요, 저는 사용자입니다.
```

### `self`는 대체 뭔가요?

<code class="yellow-code">self</code>는 **객체 자기 자신**을 가리키는 특별한 약속입니다. 메서드가 호출될 때 "누가 이 메서드를 호출했는가?"에 대한 정보를 담고 있죠. `p1.introduce()`가 실행될 때, 파이썬은 내부적으로 `Person.introduce(p1)`처럼 `p1` 객체를 첫 번째 인자로 넘겨줍니다. `self` 덕분에 각 객체는 자신만의 데이터를 가질 수 있게 됩니다.

## 3. 생성자 `__init__`: 객체의 탄생

객체가 처음 만들어질 때, 이름이나 나이처럼 각자 다른 초기값을 설정해주고 싶을 때가 많습니다. 이때 사용하는 특별한 메서드가 바로 <span class="blue-text">생성자(Constructor)</span>인 <code class="yellow-code">__init__</code>입니다.

<code class="yellow-code">__init__</code> 메서드는 객체가 생성되는 시점에 **자동으로 딱 한 번 호출**됩니다.

```python
class User:
    # 객체가 생성될 때 이름(name)을 받아 초기화합니다.
    def __init__(self, name):
        # self.name은 이 객체에 소속된 변수(인스턴스 변수)가 됩니다.
        self.name = name
        print(f"{self.name}님이 태어났습니다!")

    def introduce(self):
        # self.name을 이용해 자기 이름을 소개합니다.
        print(f"안녕하세요, 제 이름은 {self.name}입니다.")

# User 객체를 만들 때 'name' 값을 전달해야 합니다.
user1 = User("Kim") # 출력: 철수님이 태어났습니다!
user2 = User("Park") # 출력: 영희님이 태어났습니다!

user1.introduce() # 출력: 안녕하세요, 제 이름은 철수입니다.
user2.introduce() # 출력: 안녕하세요, 제 이름은 영희입니다.
```

## 4. 소멸자 `__del__`: 객체의 마지막 순간

객체가 메모리에서 제거될 때 자동으로 호출되는 특별한 메서드가 바로 <span class="blue-text">소멸자(Destructor)</span>인 <code class="yellow-code">__del__</code>입니다.

<code class="yellow-code">__del__</code> 메서드는 객체가 더 이상 사용되지 않을 때 **자동으로 호출**되어 정리 작업을 수행할 수 있습니다.

```python
class User:
    def __init__(self, name):
        self.name = name
        print(f"{self.name}님이 태어났습니다!")
    
    def __del__(self):
        print(f"{self.name}님이 세상을 떠났습니다...")
    
    def introduce(self):
        print(f"안녕하세요, 제 이름은 {self.name}입니다.")

# 객체 생성
user1 = User("김철수")
user1.introduce()

# 객체를 명시적으로 삭제하거나 참조가 사라지면 __del__ 호출
del user1  # 출력: 김철수님이 세상을 떠났습니다...

# 또는 변수에 다른 값을 할당해도 __del__ 호출
user2 = User("이영희")
user2 = None  # 출력: 이영희님이 세상을 떠났습니다...
```

### 소멸자의 특징

- **자동 호출**: 객체의 참조 카운트가 0이 되면 자동으로 호출됩니다
- **정리 작업**: 파일 닫기, 네트워크 연결 해제 등 정리 작업에 유용합니다
- **예측 불가능**: 언제 호출될지 정확히 예측하기 어렵습니다
- **가비지 컬렉션**: 파이썬의 가비지 컬렉터가 관리합니다

> **주의**: 소멸자에 너무 복잡한 로직을 넣으면 안 됩니다. 단순한 정리 작업만 수행하는 것이 좋습니다.

## 5. 클래스 변수: 모든 객체가 공유하는 데이터

클래스 변수는 해당 클래스로 생성된 **모든 객체가 공유**하는 변수입니다. 인스턴스 변수(`self.변수명`)와 달리 클래스 변수는 클래스 내에서 직접 정의됩니다.

```python
class User:
    # 클래스 변수: 모든 User 객체가 공유
    user_count = 0
    species = "인간"
    
    def __init__(self, name):
        self.name = name  # 인스턴스 변수: 각 객체마다 다른 값
        User.user_count += 1  # 클래스 변수 증가
        print(f"{self.name}님이 생성되었습니다. (전체 사용자: {User.user_count}명)")
    
    def introduce(self):
        print(f"안녕하세요, 저는 {self.name}입니다. ({self.species})")
    
    @classmethod
    def get_user_count(cls):
        return cls.user_count

# 객체 생성
user1 = User("Kim")  # 출력: Kim님이 생성되었습니다. (전체 사용자: 1명)
user2 = User("Park")  # 출력: Park님이 생성되었습니다. (전체 사용자: 2명)

# 클래스 변수 접근
print(f"전체 사용자 수: {User.user_count}")  # 출력: 전체 사용자 수: 2
print(f"사용자 종족: {User.species}")        # 출력: 사용자 종족: 인간

# 클래스 메서드 호출
print(f"현재 사용자 수: {User.get_user_count()}")  # 출력: 현재 사용자 수: 2
```

### 클래스 변수 vs 인스턴스 변수

| 구분 | 클래스 변수 | 인스턴스 변수 |
|------|-------------|---------------|
| **정의 위치** | 클래스 내부 | `__init__` 메서드 내부 |
| **접근 방법** | `클래스명.변수명` | `self.변수명` |
| **공유 범위** | 모든 객체가 공유 | 각 객체마다 독립적 |
| **용도** | 전체 통계, 설정값 | 개별 객체의 상태 |

## 6. 상속: 설계도 물려받기

<span class="blue-text">상속(Inheritance)</span>은 기존 클래스(부모)의 모든 기능(메서드, 속성)을 그대로 물려받아 새로운 클래스(자식)를 만드는 방법입니다. 코드의 재사용성을 극대화할 수 있죠.

> 예를 들어, '학생'은 '사람'의 특징을 모두 가지면서도 '공부한다'는 추가적인 행동을 할 수 있습니다.

```python
# User 클래스는 부모 클래스가 됩니다.
class User:
    def __init__(self, name):
        self.name = name
    def introduce(self):
        print(f"제 이름은 {self.name}입니다.")

# User 클래스를 상속받는 Student 클래스(자식)를 정의합니다.
class Student(User):
    # 자식 클래스만의 새로운 메서드를 추가할 수 있습니다.
    def study(self):
        print(f"{self.name} 학생은 공부를 합니다.")

# Student 객체를 만듭니다.
s1 = Student("민준")

# 부모 클래스(User)의 메서드를 그대로 사용할 수 있습니다.
s1.introduce() # 출력: 제 이름은 민준입니다.

# 자식 클래스(Student)에만 있는 메서드도 사용할 수 있습니다.
s1.study()     # 출력: 민준 학생은 공부를 합니다.

### super() 함수: 부모 클래스 메서드 호출하기

자식 클래스에서 부모 클래스의 메서드를 호출할 때는 <code class="yellow-code">super()</code> 함수를 사용합니다. 특히 `__init__` 메서드에서 부모의 초기화를 먼저 수행하고 싶을 때 유용합니다.

```python
class Animal:
    def __init__(self, name, species):
        self.name = name
        self.species = species
        print(f"{self.name} ({self.species})이(가) 태어났습니다!")
    
    def make_sound(self):
        print("동물이 소리를 냅니다.")

class Dog(Animal):
    def __init__(self, name, breed):
        # super()를 사용해 부모 클래스의 __init__ 호출
        super().__init__(name, "강아지")
        self.breed = breed  # 자식 클래스만의 추가 속성
        print(f"품종: {self.breed}")
    
    def make_sound(self):
        # 부모 클래스의 메서드를 오버라이딩
        print(f"{self.name}이(가) 멍멍! 짖습니다.")
    
    def fetch(self):
        print(f"{self.name}이(가) 공을 가져옵니다.")

# Dog 객체 생성
my_dog = Dog("뽀삐", "말티즈")
# 출력:
# 뽀삐 (강아지)이(가) 태어났습니다!
# 품종: 말티즈

my_dog.make_sound()  # 출력: 뽀삐이(가) 멍멍! 짖습니다.
my_dog.fetch()       # 출력: 뽀삐이(가) 공을 가져옵니다.
```

### super() 사용의 장점

- **코드 재사용**: 부모 클래스의 로직을 중복 작성하지 않아도 됩니다
- **유지보수성**: 부모 클래스가 변경되어도 자식 클래스에 자동으로 반영됩니다
- **일관성**: 부모와 자식 클래스 간의 일관된 초기화를 보장합니다

### 메서드 오버라이딩(Method Overriding)

<span class="blue-text">오버라이딩(Overriding)</span>은 부모 클래스의 메서드를 자식 클래스에서 **재정의**하는 것입니다. 자식 클래스는 부모의 메서드를 그대로 사용하거나, 완전히 새로운 로직으로 바꿀 수 있습니다.

```python
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
    
    def start_engine(self):
        print(f"{self.brand} {self.model}의 엔진이 시동됩니다.")
    
    def get_info(self):
        return f"브랜드: {self.brand}, 모델: {self.model}"

class Car(Vehicle):
    def __init__(self, brand, model, color):
        super().__init__(brand, model)
        self.color = color
    
    # 부모 클래스의 메서드를 완전히 재정의
    def start_engine(self):
        print(f"{self.color}색 {self.brand} {self.model}의 엔진이 부드럽게 시동됩니다!")
    
    # 부모 클래스의 메서드를 확장 (super() 사용)
    def get_info(self):
        parent_info = super().get_info()
        return f"{parent_info}, 색상: {self.color}"

class Motorcycle(Vehicle):
    def __init__(self, brand, model, engine_size):
        super().__init__(brand, model)
        self.engine_size = engine_size
    
    # 부모 클래스의 메서드를 완전히 다른 방식으로 재정의
    def start_engine(self):
        print(f"{self.brand} {self.model} ({self.engine_size}cc)의 엔진이 우렁차게 시동됩니다!")

# 객체 생성 및 테스트
car = Car("현대", "아반떼", "흰색")
motorcycle = Motorcycle("혼다", "CBR600RR", 600)

print("=== 차량 정보 ===")
print(car.get_info())        # 출력: 브랜드: 현대, 모델: 아반떼, 색상: 흰색
print(motorcycle.get_info()) # 출력: 브랜드: 혼다, 모델: CBR600RR

print("\n=== 엔진 시동 ===")
car.start_engine()        # 출력: 흰색 현대 아반떼의 엔진이 부드럽게 시동됩니다!
motorcycle.start_engine() # 출력: 혼다 CBR600RR (600cc)의 엔진이 우렁차게 시동됩니다!
```

### 오버라이딩의 특징

- **완전 재정의**: 부모 메서드를 완전히 새로운 로직으로 바꿀 수 있습니다
- **확장 가능**: `super()`를 사용해 부모 메서드의 기능을 확장할 수 있습니다
- **다형성**: 같은 메서드명이지만 객체마다 다른 동작을 합니다
- **유연성**: 자식 클래스의 특성에 맞게 메서드를 커스터마이징할 수 있습니다

## 7. 종합 연습문제

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

