---
layout: article
title: 5. 자바 컬렉션 프레임워크 기초
permalink: /notes/kr/java-deep-dive/chapter-05
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Java 심화 과정 강의 노트, 컬렉션 프레임워크 기본 개념과 List, Set 컬렉션을 다룹니다.
keywords: "Java, 컬렉션 프레임워크, 제네릭, List, Set, 데이터 구조"
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

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Java%20DeepDive&reversal=false&textBg=false)

## 1. 컬렉션 프레임워크란?

<figure>
    <img src="/notes/assets/java-deep-dive/chapter-05-01.png" width="70%" alt="컬렉션 프레임워크"/>
    <figcaption>컬렉션 프레임워크</figcaption>
</figure>

자바에서 제공하는 <span class="blue-text">데이터 구조</span>를 표준화한 클래스들의 모음입니다.  
배열의 한계점을 해결하고, 효율적인 데이터 관리 기능을 제공합니다.

| 인터페이스 | 설명                              | 데이터 중복 | 순서 유지 | 키/값 구조         | 대표 구현 클래스           |
|------------|-----------------------------------|-------------|-----------|--------------------|---------------------------|
| List       | 순서가 있는 집합                   | O           | O         | 값만               | ArrayList, LinkedList     |
| Set        | 순서를 유지하지 않는 집합           | X           | X         | 값만               | HashSet, LinkedHashSet, TreeSet |
| Map        | 키와 값의 쌍으로 이루어진 집합      | 값: O<br>키: X | X        | 키-값 쌍           | HashMap, LinkedHashMap, TreeMap |

- **List**: 인덱스로 요소에 접근 가능, 데이터의 중복 허용, 입력 순서 유지  
- **Set**: 데이터의 중복 불가, 순서 보장 X(단, LinkedHashSet은 입력 순서 유지, TreeSet은 정렬)  
- **Map**: 키와 값의 쌍, 키는 중복 불가, 값은 중복 가능, 순서 보장 X(단, LinkedHashMap은 입력 순서 유지, TreeMap은 정렬)  


### 배열의 한계점
```java
// 기존 배열의 문제점
String[] names = new String[3];  // 크기가 고정됨
names[0] = "ALLDAY_PROJECT";
names[1] = "BTS";
// names[2] = "BLACKPINK";  // 배열이 가득 참
// names[3] = "AESPA";  // ArrayIndexOutOfBoundsException 발생!
```

**문제점:**
- <span class="red-text">크기가 고정</span>되어 있어 유연하지 않음
- 데이터 추가/삭제 시 복잡한 로직 필요
- 기본적인 데이터 관리 기능 부족

### 컬렉션 프레임워크의 등장
Java는 이러한 문제를 해결하기 위해 `java.util` 패키지에 다양한 데이터 구조를 제공합니다.

```java
// 컬렉션을 사용한 해결책
ArrayList<String> names = new ArrayList<>();
names.add("ALLDAY_PROJECT");
names.add("BTS");
names.add("BLACKPINK");
names.add("AESPA");  // <span class="green-text">자동으로 크기 확장!</span>
```

## 2. 제네릭(Generic) 이해하기

### 제네릭이 필요한 이유
제네릭이 없던 시절의 문제점:

```java
// Object 타입을 사용한 경우
public class DataList {
    private Object[] data;
    
    public void add(Object value) {
        data[size++] = value;
    }
    
    public Object get(int index) {
        return data[index];  // <span class="red-text">타입 캐스팅 필요!</span>
    }
}

// 사용할 때
DataList list = new DataList();
list.add("문자");
list.add(123);
list.add(45.67);

String str = (String) list.get(0);  // 강제 타입 변환
Integer num = (Integer) list.get(1); // 강제 타입 변환
// <span class="red-text">잘못된 타입 변환 시 ClassCastException 발생!</span>
```

### 제네릭을 사용한 해결책
```java
// 제네릭을 사용한 경우
public class DataList<T> {
    private Object[] data;
    
    public void add(T value) {
        data[size++] = value;
    }
    
    public T get(int index) {
        return (T) data[index];  // <span class="green-text">안전한 타입 변환</span>
    }
}

// 사용할 때
DataList<String> stringList = new DataList<>();
stringList.add("문자열만 저장 가능");
// stringList.add(123);  // <span class="green-text">컴파일 에러! 타입 안전성 보장</span>

String str = stringList.get(0);  // <span class="green-text">타입 변환 불필요</span>
```

**제네릭 타입 변수:**
- `<T>`: Type (일반적인 타입)
- `<E>`: Element (컬렉션의 요소)
- `<K>`: Key (맵의 키)
- `<V>`: Value (맵의 값)
- `<N>`: Number (숫자 타입)

### 제네릭의 선언
```java
// 클래스 제네릭
public class Box<T> {
    private T content;
    
    public void set(T content) { this.content = content; }
    public T get() { return content; }
}

// 인터페이스 제네릭
public interface Container<E> {
    void add(E element);
    E get(int index);
}

// 메서드 제네릭
public <T> void printArray(T[] array) {
    for (T item : array) {
        System.out.println(item);
    }
}

// 사용 예시
Box<String> stringBox = new Box<>();
Box<Integer> intBox = new Box<>();
```

## 3. List 컬렉션

### List의 특징
- **순서가 있는 데이터 집합**
- **중복 데이터 허용**
- **인덱스로 접근 가능**

### ArrayList vs LinkedList

#### ArrayList

```java
List<String> arrayList = new ArrayList<>();
arrayList.add("첫 번째");
arrayList.add("두 번째");
arrayList.add("세 번째");
```

**특징:**
- 배열 기반으로 구현
- 연속된 메모리 공간 사용
- <span class="green-text">인덱스 접근이 빠름 (O(1))</span>
- <span class="red-text">중간 삽입/삭제 시 느림 (O(n))</span>

**실제 활용 예시:**  
- 게시판 글 목록(글이 등록된 순서대로 보여줘야 할 때)
- 장바구니 상품 리스트(담은 순서대로 출력)
- 최근 본 상품 목록(순서대로 저장)
- 순위표, 대기열 등 순서가 중요한 데이터 관리

#### LinkedList
```java
List<String> linkedList = new LinkedList<>();
linkedList.add("첫 번째");
linkedList.add("두 번째");
linkedList.add("세 번째");
```

**특징:**
- 노드 기반으로 구현
- 각 노드가 다음 노드를 참조
- <span class="green-text">중간 삽입/삭제가 빠름 (O(1))</span>
- <span class="red-text">인덱스 접근이 느림 (O(n))</span>

**실제 활용 예시:**  
- 실시간 채팅 메시지 관리(메시지 삽입/삭제가 빈번할 때)
- Undo/Redo 기능(이전/다음 작업을 빠르게 이동)
- 프린터 작업 대기열(작업 추가/삭제가 자주 발생)
- 음악 재생 목록(곡 순서 변경, 삽입/삭제가 많은 경우)

### List 주요 메서드
```java
List<String> list = new ArrayList<>();

// 데이터 추가
list.add("사과");           // 맨 뒤에 추가
list.add(1, "바나나");      // 특정 위치에 삽입

// 데이터 조회
String fruit = list.get(0); // 인덱스로 조회
int size = list.size();     // 크기 확인

// 데이터 수정
list.set(1, "오렌지");      // 특정 위치 값 변경

// 데이터 삭제
list.remove(0);             // 인덱스로 삭제
list.remove("바나나");       // 값으로 삭제
list.clear();               // 전체 삭제

// 데이터 검색
boolean exists = list.contains("사과"); // 포함 여부 확인
```

> 더 많은 List 메서드는 [공식 Java List API 문서](https://docs.oracle.com/javase/8/docs/api/java/util/List.html)에서 확인할 수 있습니다.

## 4. Set 컬렉션

### Set의 특징
- **순서가 없는 데이터 집합**
- **중복 데이터 허용하지 않음**
- **인덱스 접근 불가**

### HashSet
```java
Set<String> set = new HashSet<>();
set.add("사과");
set.add("바나나");
set.add("사과");  // <span class="red-text">중복이므로 저장되지 않음</span>
set.add("오렌지");

System.out.println(set.size());  // 3 출력
```

**특징:**
- 해시 테이블 기반으로 구현
- 가장 빠른 검색 성능 (O(1) 평균)
- 순서 보장하지 않음
- <span class="green-text">중복 제거에 최적화</span>

**실제 활용 예시:**
- 사용자 ID 중복 체크 (회원가입 시)
- 방문한 웹페이지 기록 (중복 방문 제거)
- 상품 태그 관리 (중복 태그 방지)
- 이메일 주소 중복 검증

**중복 판단 기준:**
1. `hashCode()` 값이 같은지 확인
2. `equals()` 메서드로 실제 값 비교

```java
public class Product {
    private String name;
    private int price;
    
    @Override
    public int hashCode() {
        return Objects.hash(name, price);
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Product product = (Product) obj;
        return price == product.price && Objects.equals(name, product.name);
    }
}
```

## 5. 단계별 실습 문제

### 문제 1 - 학생 명단 관리 (기초)
> 아래 코드의 주석을 참고하여, List에 데이터를 추가하고 Set을 사용하여 중복을 제거한 뒤 정렬하는 코드를 완성하세요.

```java
Scanner sc = new Scanner(System.in);
List<String> studentList = new ArrayList<>();
Set<String> studentSet = new HashSet<>();

System.out.println("학생 이름을 입력하세요 (종료하려면 '종료' 입력):");

// TODO: Scanner를 사용하여 학생 이름을 입력받고 List에 추가하세요. (add)

// TODO: "종료"를 입력받으면 입력을 멈추세요. (equals)

// TODO: List의 모든 이름을 Set에 추가하여 중복을 제거하세요. (addAll)

// TODO: Set을 List로 변환하세요. (new ArrayList<>)

// TODO: List를 오름차순으로 정렬하세요. (Collections.sort)

// TODO: 정렬된 결과를 출력하세요.

sc.close();
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>
  <pre><code class="language-java">
    // TODO: Scanner를 사용하여 학생 이름을 입력받고 List에 추가하세요. (add)
    while (true) {
        String name = sc.nextLine().trim();
        if (name.equals("종료")) break;
        studentList.add(name);
    }
    
    // TODO: "종료"를 입력받으면 입력을 멈추세요. (equals)
    // 위의 while 루프에서 처리됨
    
    // TODO: List의 모든 이름을 Set에 추가하여 중복을 제거하세요. (addAll)
    studentSet.addAll(studentList);
    
    // TODO: Set을 List로 변환하세요. (new ArrayList<>)
    List&lt;String&gt; uniqueStudentList = new ArrayList<>(studentSet);
    
    // TODO: List를 오름차순으로 정렬하세요. (Collections.sort)
    Collections.sort(uniqueStudentList);
    
    // TODO: 정렬된 결과를 출력하세요.
    System.out.println("\n=== 중복 제거 및 정렬된 학생 명단 ===");
    for (String student : uniqueStudentList) {
        System.out.println(student);
    }
    System.out.println("총 " + uniqueStudentList.size() + "명의 학생");
  </code></pre>
</details>

### 문제 2 - 상품 카테고리 관리 (기초)
> 아래 코드의 주석을 참고하여, Set과 Map을 사용하여 상품 카테고리를 관리하는 코드를 완성하세요.

```java
Scanner sc = new Scanner(System.in);
Set<String> categories = new HashSet<>();
Map<String, Integer> categoryCounts = new HashMap<>();

System.out.println("카테고리와 개수를 입력하세요 (형식: 카테고리:개수, 종료하려면 '종료' 입력):");

// TODO: Scanner를 사용하여 카테고리와 개수를 입력받으세요. (nextLine)

// TODO: "종료"를 입력받으면 입력을 멈추세요. (equals)

// TODO: 입력받은 문자열을 ":"로 분리하세요. (split)

// TODO: 카테고리를 Set에 추가하세요. (add)

// TODO: 카테고리별 개수를 Map에 저장하세요. (put, getOrDefault)

// TODO: 모든 카테고리와 개수를 출력하세요.

sc.close();
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
        // TODO: Scanner를 사용하여 카테고리와 개수를 입력받으세요. (nextLine)
        while (true) {
            String input = sc.nextLine().trim();
            if (input.equals("종료")) break;
            
            // TODO: 입력받은 문자열을 ":"로 분리하세요. (split)
            String[] parts = input.split(":");
            if (parts.length == 2) {
                String category = parts[0].trim();
                int count = Integer.parseInt(parts[1].trim());
                
                // TODO: 카테고리를 Set에 추가하세요. (add)
                categories.add(category);
                
                // TODO: 카테고리별 개수를 Map에 저장하세요. (put, getOrDefault)
                categoryCounts.put(category, categoryCounts.getOrDefault(category, 0) + count);
            }
        }
        
        // TODO: 모든 카테고리와 개수를 출력하세요.
        System.out.println("\n=== 카테고리별 상품 개수 ===");
        for (String category : categories) {
            System.out.println(category + ": " + categoryCounts.get(category) + "개");
        }
        System.out.println("총 " + categories.size() + "개 카테고리");
  </code></pre>
</details>

### 문제 3 - 컬렉션 성능 비교 (기초)
> 아래 코드의 주석을 참고하여, ArrayList와 LinkedList의 기본적인 성능 차이를 측정하는 코드를 완성하세요.

```java
ArrayList<Integer> arrayList = new ArrayList<>();
LinkedList<Integer> linkedList = new LinkedList<>();

int size = 10000;  // 난이도 낮춤: 1만 개로 감소

System.out.println("=== 컬렉션 성능 비교 테스트 ===\n");

// TODO: ArrayList에 1만 개 데이터를 추가하고 시간을 측정하세요. (add, System.nanoTime)

// TODO: LinkedList에 1만 개 데이터를 추가하고 시간을 측정하세요. (add, System.nanoTime)

// TODO: ArrayList의 중간에 100개 데이터를 삽입하고 시간을 측정하세요. (add(index, element))

// TODO: LinkedList의 중간에 100개 데이터를 삽입하고 시간을 측정하세요. (add(index, element))

// TODO: 측정된 시간을 출력하세요.

System.out.println("\n=== 성능 비교 결과 ===");
System.out.println("ArrayList와 LinkedList의 차이점을 확인해보세요!");
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>
  <pre><code class="language-java">
    // TODO: ArrayList에 1만 개 데이터를 추가하고 시간을 측정하세요. (add, System.nanoTime)
    long startTime = System.nanoTime();
    for (int i = 0; i < size; i++) {
        arrayList.add(i);
    }
    long arrayListAddTime = System.nanoTime() - startTime;
    
    // TODO: LinkedList에 1만 개 데이터를 추가하고 시간을 측정하세요. (add, System.nanoTime)
    startTime = System.nanoTime();
    for (int i = 0; i < size; i++) {
        linkedList.add(i);
    }
    long linkedListAddTime = System.nanoTime() - startTime;
    
    // TODO: ArrayList의 중간에 100개 데이터를 삽입하고 시간을 측정하세요. (add(index, element))
    startTime = System.nanoTime();
    for (int i = 0; i < 100; i++) {
        arrayList.add(size/2, i);
    }
    long arrayListInsertTime = System.nanoTime() - startTime;
    
    // TODO: LinkedList의 중간에 100개 데이터를 삽입하고 시간을 측정하세요. (add(index, element))
    startTime = System.nanoTime();
    for (int i = 0; i < 100; i++) {
        linkedList.add(size/2, i);
    }
    long linkedListInsertTime = System.nanoTime() - startTime;
    
    // TODO: 측정된 시간을 출력하세요.
    System.out.println("연속 추가 성능:");
    System.out.printf("ArrayList:  %8d ns\n", arrayListAddTime);
    System.out.printf("LinkedList: %8d ns\n", linkedListAddTime);
    System.out.println();
    
    System.out.println("중간 삽입 성능 (100회):");
    System.out.printf("ArrayList:  %8d ns\n", arrayListInsertTime);
    System.out.printf("LinkedList: %8d ns\n", linkedListInsertTime);

    System.out.println("결론:");
    System.out.println("- ArrayList: 연속 추가 빠름, 중간 삽입 느림");
    System.out.println("- LinkedList: 연속 추가 느림, 중간 삽입 빠름");
  </code></pre>
</details>

## 6. 자주 발생하는 오류와 해결법
### ConcurrentModificationException
```java
// 잘못된 예시
List<String> list = new ArrayList<>();
list.add("사과");
list.add("바나나");

for (String item : list) {
    if (item.equals("바나나")) {
        list.remove(item);  // <span class="red-text">ConcurrentModificationException 발생!</span>
    }
}

// 올바른 해결법
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String item = iterator.next();
    if (item.equals("바나나")) {
        iterator.remove();  // <span class="green-text">안전한 삭제</span>
    }
}
```

### NullPointerException
```java
// 잘못된 예시
List<String> list = new ArrayList<>();
list.add(null);
String item = list.get(0);
System.out.println(item.length());  // <span class="red-text">NullPointerException 발생!</span>

// 올바른 해결법
String item = list.get(0);
if (item != null) {
    System.out.println(item.length());
}
```