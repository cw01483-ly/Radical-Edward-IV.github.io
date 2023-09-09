---
title: ☕️ 함수형 인터페이스(Functional Interface)
key: 20230909
tags: Java @FunctionalInterface
---

## 1. Functional Interface (함수형 인터페이스)

맵고 짠 건 아무래도… 몸에 안좋으니 ***Sam***삼한 인터페이스로 먹어봅시다.

***SAM***(Single Abstract Method)을 만족하는 인터페이스는 함수형 인터페이스입니다. 함수형 인터페이스는 Lamdba식으로 표현할 수 있어 코드를 간결성을 높여주고 지연 연산을 통해 성능 향상을 기대할 수 있습니다.

함수형 인터페이스를 작성할 때는 가급적 인터페이스 선언부에 ***@FunctionalInterface*** 애노테이션을 함께 써주는 것이 좋습니다. 애노테이션을 사용하여 얻을 수 있는 이점은 1) 인터페이스의 사용 목적을 분명히 하며 2) 애노테이션의 조건을 만족시키지 않을 경우 컴파일 에러를 발생시켜 개발자의 실수를 줄여줍니다.

## 2. Functional Interface의 종류
### 2.1 Consumer

`Consumer` 계열의 인터페이스는 Parameter는 있고 return 값은 없습니다. `accept` 추상 메소드를 정의하고 있습니다.

| 인터페이스 이름   | 설명                                          | 추상 메소드                    |
| ----------------- | --------------------------------------------- | ------------------------------ |
| Consumer<T>       | T 타입 전달인자를 받아 사용합니다.            | void accept(T t)               |
| BiConsumer<T, U>  | T와 U 타입 전달인자를 받아 사용합니다.        | void accept(T t, U u)          |
| DoubleConsumer    | double 타입을 전달인자로 받아 사용합니다.     | void accept(double value)      |
| IntConsumer       | int 타입을 전달인자로 받아 사용합니다.        | void accept(int value)         |
| LongConsumer      | long 타입을 전달인자로 받아 사용합니다.       | void accept(long value)        |
| ObjDoubleConsumer | T와 double 타입을 전달인자로 받아 사용합니다. | void accept(T t, double value) |
| ObjIntConsumer    | T와 int 타입을 전달인자로 받아 사용합니다.    | void accept(T t, int value)    |
| ObjLongConsumer   | T와 long 타입을 전달인자로 받아 사용합니다.   | void accept(T t, long value)   |

```java
// void Stream.forEach(Consumer<? super T> action)
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
numbers.stream().forEach(System.out::println);
```

### 2.2 Supplier

`Supplier` 계열의 인터페이스는 Parameter는 없고 return 값은 있습니다. `getXXX` 추상 메소드를 정의하고 있습니다.

| 인터페이스 이름 | 설명                       | 추상 메소드            |
| --------------- | -------------------------- | ---------------------- |
| Supplier        | T 타입을 반환합니다.       | T get()                |
| BooleanSupplier | boolean 타입을 반환합니다. | boolean getAsBoolean() |
| DoubleSupplier  | double 타입을 반환합니다.  | double getAsDouble()   |
| IntSupplier     | int 타입을 반환합니다.     | int getAsInt()         |
| LongSupplier    | long 타입을 반환합니다.    | long getAsLong()       |

```java
// static <T> Stream<T> Stream.generate(Supplier<? extends T> s)
final String hello = "Hello, Supplier";
Stream.generate(() -> hello)
        .limit(3)
        .forEach(System.out::println);
```

### 2.3 Function

`Function` 계열의 인터페이스는 Parameter와 return 값 둘 다 있습니다. 타입 변환 목적으로 사용하며, `applyXXX` 추상 메소드를 정의하고 있습니다.

| 인터페이스 이름 | 설명 | 추상 메소드 |
| --- | --- | --- |
| Function<T, R> | T 타입을 전달인자로 받아 R 타입으로 변환합니다. | R apply(T t) |
| BiFunction<T, U, R> | T와 U 타입을 전달인자로 받아 R 타입으로 변환합니다. | R apply(T t, U u) |
| DoubleFunction | double 타입을 전달인자로 받아 R 타입으로 변환합니다. | R apply(double value) |
| IntFunction | int 타입을 전달인자로 받아 R 타입으로 변환합니다. | R apply(int value) |
| IntToDoubleFunction / IntToLongFunction | int 타입을 전달인자로 받아 double/long 타입으로 변환합니다. | double applyAsDouble(int value) / long applyAsLong(int value) |
| LongToDoubleFunction / LongToIntFunction | long 타입을 전달인자로 받아 double/int 타입으로 변환합니다. | double applyAsDouble(long value) / int applyAsInt(long value) |
| ToDoubleBiFunction<T, U> | T와 U 타입을 전달인자로 받아 double 타입으로 변환합니다. | double applyAsDouble(T t, U u) |
| ToDoubleFunction | T 타입을 전달인자로 받아 double 타입으로 변환합니다. | double applyAsDouble(T t) |
| ToIntBiFunction<T, U> | T와 U 타입을 전달인자로 받아 int 타입으로 변환합니다. | int applyAsInt(T t, U u) |
| ToIntFunction | T타입을 전달인자로 받아 int 타입으로 변환합니다. | int applyAsInt(T t) |
| ToLongBiFunction<T, U> | T와 U 타입을 전달인자로 받아 long 타입으로 변환합니다. | long applyAsLong(T t, U u) |
| ToLongFunction | T 타입을 전달인자로 받아 long 타입으로 변환합니다. | long applyAsLong(T t) |

```java
// <R> Stream<R> Stream.map(Function<? super T, ? extends R> mapper)
List<String> numbers = List.of("2", "3", "1");
numbers.stream().map(n -> Integer.valueOf(n))
        .sorted()
        .forEach(System.out::println);
```

### 2.4 Operator

`Operator` 계열의 인터페이스는 `Function` 계열과 동일하게 Parameter와 return 값이 있습니다. 값을 연산하기 위해서 사용하며, `applyXXX` 추상 메소드를 정의하고 있습니다.

| 인터페이스 이름 | 설명 | 추상 메소드 |
| --- | --- | --- |
| BinaryOperator | T 타입 두 개를 전달인자로 받아 연산하여 T 타입을 반환합니다. | T apply(T left, T right) |
| UnaryOperator | T 타입을 전달인자로 받아 연산하여 T 타입을 반환합니다. | T apply(T t) |
| DoubleBinaryOperator | double 타입 두 개를 전달인자로 받아 연산하여 double 타입을 반환합니다. | double applyAsDouble(double left, double right) |
| DoubleUnaryOperator | double 타입을 전달인자로 받아 연산하여 double 타입을 반환합니다. | double applyAsDouble(double operand) |
| IntBinaryOperator | int 타입 두 개를 전달인자로 받아 연산하여 int 타입을 반환합니다. | int applyAsInt(int left, int right) |
| IntUnaryOperator | int 타입을 전달인자로 받아 int 타입을 반환합니다. | int applyAsInt(int operand) |
| LongBinaryOperator | long 타입 두 개를 전달인자로 받아 연산하여 long 타입을 반환합니다. | long applyAsLong(long left, long right) |
| LongUnaryOperator | long 타입을 전달인자로 받아 long 타입을 반환합니다. | long applyAsLong(long operand) |

```java
// Optional<T> Stream.reduce(BinaryOperator<T> accumulator)
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
int sum = numbers.stream()
        .reduce((left, right) -> left + right)
        .get();
```

### 2.5 Predicate

Predicate 계열의 인터페이스는 Parameter와 boolean 타입 return 값이 있습니다. 전달인자를 검사하기 위해서 사용하며, test 추상 메소드를 정의하고 있습니다.

| 인터페이스 이름 | 설명 | 추상 메소드 |
| --- | --- | --- |
| Predicate | T 타입 전달인자를 받아 boolean 타입을 반환합니다. | boolean test(T t) |
| BiPredicate<T, U> | T와 U 타입 전달인자를 받아 boolean 타입을 반환합니다. | boolean test(T t, U u) |
| DoublePredicate | double 타입을 전달인자로 받아 boolean 타입을 반환합니다. | boolean test(double value) |
| IntPredicate | int 타입을 전달인자로 받아 boolean 타입을 반환합니다. | boolean test(int value) |
| LongPredicate | long 타입을 전달인자로 받아 boolean 타입을 반환합니다. | boolean test(long value) |

```java
// boolean Stream.allMatch(Predicate<? super T> predicate)
List<Integer> scores = List.of(87, 99, 72, 80, 95);
boolean result = scores.stream().allMatch(s -> 90 < s);
```

## 3. 사용자 정의 Functional Interface

💡 Java 표준 스팩에 포함된 유용한 함수형 인터페이스만 활용해도 개발하는 데 문제가 없어요!

함수형 인터페이스는 단일 추상 메소드로 구성되어야 합니다. 단일 추상 메소드 외에도 기본(default), 정적(static), Object 클래스의 메소드를 추가로 포함할 수 있습니다.

```java
@FunctionalInterface
public interface MyFunctionalInterface {
    void myMethod1();            // 추상 메소드
    default void myMethod2() {}; // 기본 메소드
    static void myMethod3() {};  // 정적 메소드
}

public class Foo {
    MyFunctionalInterface myFuncIf = () -> System.out.println("Hello, world!");
}
```

<br>
<br>
<span style="color: grey; font-weight: 700;">References</span>   
[https://www.baeldung.com](https://www.baeldung.com/java-8-functional-interfaces)   