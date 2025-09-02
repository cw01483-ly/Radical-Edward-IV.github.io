---
layout: article
title: 6. 자바 컬렉션 프레임워크 심화
permalink: /notes/kr/java-deep-dive/chapter-06
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Java 심화 과정 강의 노트, Map 컬렉션, Iterator, 실무 활용 예제, 성능 비교 및 선택 가이드를 다룹니다.
keywords: "Java, Map 컬렉션, Iterator, 실무 활용, 성능 최적화, 컬렉션 선택"
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

## 1. Map 컬렉션

### Map의 특징
- **키(Key)와 값(Value)의 쌍으로 데이터 저장**
- **키는 중복 불가, 값은 중복 가능**
- **순서 보장하지 않음**

### HashMap
```java
Map<String, String> seasonMap = new HashMap<>();
seasonMap.put("spring", "봄");
seasonMap.put("summer", "여름");
seasonMap.put("autumn", "가을");
seasonMap.put("winter", "겨울");

// 값 조회
String season = seasonMap.get("spring");  // "봄" 반환

// 키 존재 여부 확인
boolean hasKey = seasonMap.containsKey("spring");  // true

// 값 존재 여부 확인
boolean hasValue = seasonMap.containsValue("봄");  // true

// 데이터 삭제
seasonMap.remove("winter");
```

### 문제 1 - Map 기본 사용법 (기초)
> 아래 코드의 주석을 참고하여, Map에 데이터를 추가하고 값을 조회하는 코드를 완성하세요.

```java
Map<Integer, String> fruitMap = new HashMap<>();

// TODO: 1-"사과", 2-"바나나", 3-"오렌지"를 추가하세요. (put)

// TODO: 키 2에 해당하는 값을 조회하여 변수 value에 저장하세요. (get)

// TODO: 키 3에 해당하는 값을 조회하여 변수 value에 저장하세요. (getOrDefault)

// 추가 연습: 키 4가 존재하는지 확인하세요. (containsKey)

// 추가 연습: 값 "바나나"가 존재하는지 확인하세요. (containsValue)

// 추가 연습: 키 2의 값을 삭제하세요. (remove)

// 추가 연습: Map이 비어있는지 확인하세요. (isEmpty)

// 추가 연습: Map의 모든 키와 값을 출력하세요. (keySet, values, entrySet)
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  Map&lt;Integer, String&gt; fruitMap = new HashMap<>();

  // TODO: 1-"사과", 2-"바나나", 3-"오렌지"를 추가하세요. (put)
  fruitMap.put(1, "사과");
  fruitMap.put(2, "바나나");
  fruitMap.put(3, "오렌지");

  // TODO: 키 2에 해당하는 값을 조회하여 변수 value에 저장하세요. (get)
  String value = fruitMap.get(2);
  System.out.println(value);
  System.out.println(value);

  // TODO: 키 3에 해당하는 값을 조회하여 변수 value에 저장하세요. (getOrDefault)
  value = fruitMap.getOrDefault(3, "없음");
  System.out.println(value);

  // TODO: 키 3에 해당하는 값을 조회하여 변수 value에 저장하세요. (getOrDefault)
  System.out.println(value);

  // 추가 연습: 키 4가 존재하는지 확인하세요. (containsKey)
  System.out.println("키 4 존재 여부: " + fruitMap.containsKey(4));

  // 추가 연습: 값 "바나나"가 존재하는지 확인하세요. (containsValue)
  boolean hasBanana = fruitMap.containsValue("바나나");
  System.out.println("키 4 존재 여부: " + hasKey4);

  // 추가 연습: 값 "바나나"가 존재하는지 확인하세요. (containsValue)
  System.out.println("바나나 존재 여부: " + hasBanana);

  // 추가 연습: 키 2의 값을 삭제하세요. (remove)
  fruitMap.remove(2);
  System.out.println("키 2 삭제 후: " + fruitMap);

  // 추가 연습: Map이 비어있는지 확인하세요. (isEmpty)
  System.out.println("비어있는가? " + fruitMap.isEmpty());

  // 추가 연습: Map의 모든 키와 값을 출력하세요. (keySet, values, entrySet)
  System.out.println("모든 키: " + fruitMap.keySet());
  System.out.println("모든 값: " + fruitMap.values());
  for (Map.Entry<Integer, String> entry : fruitMap.entrySet()) {
    System.out.println(entry.getKey() + " => " + entry.getValue());
  }
  </code></pre>
</details>

### TreeMap (정렬된 Map)
```java
Map<String, Integer> scoreMap = new TreeMap<>();
scoreMap.put("김철수", 85);
scoreMap.put("이영희", 92);
scoreMap.put("박민수", 78);

// TreeMap은 키를 기준으로 자동 정렬됨
for (Map.Entry<String, Integer> entry : scoreMap.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
// 출력: 김철수: 85, 박민수: 78, 이영희: 92 (가나다순)
```

### LinkedHashMap (순서 보장 Map)
```java
Map<String, String> orderMap = new LinkedHashMap<>();
orderMap.put("첫번째", "사과");
orderMap.put("두번째", "바나나");
orderMap.put("세번째", "오렌지");

// LinkedHashMap은 삽입 순서를 보장
for (String key : orderMap.keySet()) {
    System.out.println(key + ": " + orderMap.get(key));
}
// 출력: 첫번째: 사과, 두번째: 바나나, 세번째: 오렌지
```

## 2. Iterator와 순회

### Iterator란?
Iterator는 컬렉션의 요소들을 순차적으로 접근할 수 있게 해주는 인터페이스입니다. 컬렉션의 내부 구조를 알지 못해도 안전하게 데이터를 순회할 수 있습니다.

**Iterator의 주요 메서드:**
- `hasNext()`: 다음 요소가 있는지 확인
- `next()`: 다음 요소를 반환하고 커서를 이동
- `remove()`: 현재 커서가 가리키는 요소를 안전하게 제거

### Iterator 사용법
```java
List<String> fruits = Arrays.asList("사과", "바나나", "오렌지");
Iterator<String> iterator = fruits.iterator();

while (iterator.hasNext()) {
    String fruit = iterator.next();
    System.out.println(fruit);
}
```

### Iterator의 장점
```java
List<String> list = new ArrayList<>();
list.add("사과");
list.add("바나나");
list.add("오렌지");

// Iterator를 사용한 안전한 삭제
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String fruit = iterator.next();
    if (fruit.equals("바나나")) {
        iterator.remove();  // <span class="green-text">안전한 삭제</span>
    }
}
```

**Iterator 사용의 장점:**
- <span class="green-text">순회 중 안전한 삭제 가능</span>
- 컬렉션의 내부 구조에 독립적
- 일관된 순회 방식 제공

### 문제 2 - Iterator 기본 사용법 (기초)
> 아래 코드의 주석을 참고하여, Iterator를 사용하여 컬렉션을 순회하고 요소를 조작하는 코드를 완성하세요.

```java
import java.util.*;

public class IteratorPractice {
    public static void main(String[] args) {
        List<String> fruitList = new ArrayList<>();
        fruitList.add("사과");
        fruitList.add("바나나");
        fruitList.add("오렌지");
        fruitList.add("포도");
        fruitList.add("키위");
        
        System.out.println("=== Iterator를 사용한 순회 ===");

        // TODO: List에서 Iterator를 생성하세요. (iterator())

        // TODO: Iterator를 사용하여 모든 요소를 출력하세요. (hasNext, next)

        // TODO: Iterator를 다시 생성하세요. (iterator())

        // TODO: Iterator를 다시 생성하세요. (iterator())

        // TODO: Iterator를 사용하여 "키위"를 삭제하세요. (remove)

        // TODO: 최종 결과를 출력하세요.
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
        // TODO: List에서 Iterator를 생성하세요. (iterator())
        Iterator&lt;String&gt; iterator = fruitList.iterator();
        
        // TODO: Iterator를 사용하여 모든 요소를 출력하세요. (hasNext, next)
        System.out.println("원본 리스트:");
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println(fruit);
        }
        
        // TODO: Iterator를 다시 생성하세요. (iterator())
        iterator = fruitList.iterator();
        
        // TODO: Iterator를 사용하여 "바나나"를 찾아서 "바나나(노란색)"으로 변경하세요. (set)
        int index = 0;
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            if (fruit.equals("바나나")) {
                fruitList.set(index, "바나나(노란색)");
                break;
            }
            index++;
        }
        
        // TODO: Iterator를 다시 생성하세요. (iterator())
        iterator = fruitList.iterator();
        
        // TODO: Iterator를 사용하여 "키위"를 삭제하세요. (remove)
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            if (fruit.equals("키위")) {
                iterator.remove();
                break;
            }
        }
        
        // TODO: 최종 결과를 출력하세요.
        System.out.println("\n수정된 리스트:");
        iterator = fruitList.iterator();
        while (iterator.hasNext()) {
            System.out.println(iterator.next());
        }
  </code></pre>
</details>

### 향상된 for문 (for-each)
```java
List<String> fruits = Arrays.asList("사과", "바나나", "오렌지");

for (String fruit : fruits) {
    System.out.println(fruit);
}
```

**참고:** 향상된 for문은 내부적으로 Iterator를 사용합니다.

**for-each의 제한사항:**
- <span class="red-text">순회 중 컬렉션 수정 불가</span>
- <span class="red-text">인덱스 정보 접근 불가</span>
- <span class="red-text">역순 순회 불가</span>

### ListIterator (양방향 순회)
```java
List<String> fruits = new ArrayList<>();
fruits.add("사과");
fruits.add("바나나");
fruits.add("오렌지");

ListIterator<String> listIterator = fruits.listIterator();

// 정방향 순회
while (listIterator.hasNext()) {
    String fruit = listIterator.next();
    System.out.println("정방향: " + fruit);
}

// 역방향 순회
while (listIterator.hasPrevious()) {
    String fruit = listIterator.previous();
    System.out.println("역방향: " + fruit);
}

// 특정 위치에서 시작
ListIterator<String> startIterator = fruits.listIterator(1);  // 인덱스 1부터 시작
```

**ListIterator의 추가 기능:**
- `hasPrevious()`: 이전 요소 존재 여부
- `previous()`: 이전 요소 반환
- `nextIndex()`: 다음 요소의 인덱스
- `previousIndex()`: 이전 요소의 인덱스
- `set(E e)`: 현재 요소를 다른 요소로 교체
- `add(E e)`: 현재 위치에 새 요소 추가

### Map 순회 방법
```java
Map<String, Integer> ageMap = new HashMap<>();
ageMap.put("김철수", 25);
ageMap.put("이영희", 30);
ageMap.put("박민수", 28);

// 방법 1: keySet() 사용
for (String name : ageMap.keySet()) {
    System.out.println(name + ": " + ageMap.get(name));
}

// 방법 2: values() 사용
for (Integer age : ageMap.values()) {
    System.out.println("나이: " + age);
}

// 방법 3: entrySet() 사용 (권장)
for (Map.Entry<String, Integer> entry : ageMap.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

## 3. 실무 활용 예제

### 은행 계좌 관리 시스템
```java
public class BankAccount {
    private String accountNumber;
    private String ownerName;
    private double balance;
    
    // 생성자, getter, setter 생략
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        BankAccount that = (BankAccount) obj;
        return Objects.equals(accountNumber, that.accountNumber);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(accountNumber);
    }
}

// 계좌 관리
Set<BankAccount> accounts = new HashSet<>();
Map<String, BankAccount> accountMap = new HashMap<>();

// 계좌 추가
BankAccount account1 = new BankAccount("123-456", "ALLDAY_PROJECT", 1000000);
accounts.add(account1);
accountMap.put("123-456", account1);

// 계좌 검색
BankAccount found = accountMap.get("123-456");
```

### 쇼핑몰 장바구니 시스템
```java
public class CartItem {
    private Product product;
    private int quantity;
    
    // 생성자, getter, setter 생략
}

public class ShoppingCart {
    private List<CartItem> items = new ArrayList<>();
    
    public void addItem(Product product, int quantity) {
        // 이미 있는 상품인지 확인
        for (CartItem item : items) {
            if (item.getProduct().equals(product)) {
                item.setQuantity(item.getQuantity() + quantity);
                return;
            }
        }
        
        // 새로운 상품 추가
        items.add(new CartItem(product, quantity));
    }
    
    public double getTotalPrice() {
        return items.stream()
                   .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                   .sum();
    }
}
```

### 온라인 쇼핑몰 재고 관리 시스템
```java
public class InventoryManager {
    private Map<String, Integer> stockMap = new HashMap<>();
    private Map<String, Set<String>> categoryMap = new HashMap<>();
    
    public void addProduct(String productCode, String category, int quantity) {
        stockMap.put(productCode, quantity);
        
        // 카테고리별 상품 관리
        categoryMap.computeIfAbsent(category, k -> new HashSet<>())
                  .add(productCode);
    }
    
    public List<String> getLowStockProducts(int threshold) {
        return stockMap.entrySet().stream()
                      .filter(entry -> entry.getValue() < threshold)
                      .map(Map.Entry::getKey)
                      .collect(Collectors.toList());
    }
    
    public Map<String, Integer> getCategoryStockSummary() {
        Map<String, Integer> summary = new HashMap<>();
        
        for (Map.Entry<String, Set<String>> entry : categoryMap.entrySet()) {
            String category = entry.getKey();
            int totalStock = entry.getValue().stream()
                                .mapToInt(productCode -> stockMap.getOrDefault(productCode, 0))
                                .sum();
            summary.put(category, totalStock);
        }
        
        return summary;
    }
}
```

## 4. 성능 비교 및 선택 가이드

### ArrayList vs LinkedList 성능 비교
```java
// 데이터 추가 (연속)
ArrayList<Integer> arrayList = new ArrayList<>();
LinkedList<Integer> linkedList = new LinkedList<>();

long startTime = System.nanoTime();
for (int i = 0; i < 1000000; i++) {
    arrayList.add(i);
}
long endTime = System.nanoTime();
System.out.println("ArrayList 추가 시간: " + (endTime - startTime));

startTime = System.nanoTime();
for (int i = 0; i < 1000000; i++) {
    linkedList.add(i);
}
endTime = System.nanoTime();
System.out.println("LinkedList 추가 시간: " + (endTime - startTime));
```

**성능 결과:**
- **ArrayList**: <span class="green-text">연속 추가 빠름, 중간 삽입/삭제 느림</span>
- **LinkedList**: <span class="green-text">연속 추가 느림, 중간 삽입/삭제 빠름</span>

### HashMap vs TreeMap vs LinkedHashMap 성능 비교
```java
// 데이터 검색 성능 테스트
Map<String, Integer> hashMap = new HashMap<>();
Map<String, Integer> treeMap = new TreeMap<>();
Map<String, Integer> linkedHashMap = new LinkedHashMap<>();

// 100만 개 데이터 추가
for (int i = 0; i < 1000000; i++) {
    String key = "key" + i;
    hashMap.put(key, i);
    treeMap.put(key, i);
    linkedHashMap.put(key, i);
}

// 검색 성능 측정
String searchKey = "key500000";

long startTime = System.nanoTime();
Integer value1 = hashMap.get(searchKey);
long endTime = System.nanoTime();
System.out.println("HashMap 검색 시간: " + (endTime - startTime));

startTime = System.nanoTime();
Integer value2 = treeMap.get(searchKey);
endTime = System.nanoTime();
System.out.println("TreeMap 검색 시간: " + (endTime - startTime));

startTime = System.nanoTime();
Integer value3 = linkedHashMap.get(searchKey);
endTime = System.nanoTime();
System.out.println("LinkedHashMap 검색 시간: " + (endTime - startTime));
```

**성능 결과:**
- **HashMap**: <span class="green-text">가장 빠른 검색 (O(1) 평균)</span>
- **TreeMap**: <span class="yellow-code">정렬된 검색 (O(log n))</span>
- **LinkedHashMap**: <span class="yellow-code">순서 보장 (O(1) 평균)</span>

### 컬렉션 선택 기준

| 상황 | 추천 컬렉션 | 이유 |
|------|-------------|------|
| 순서가 중요하고 중복 허용 | ArrayList | 빠른 접근, 메모리 효율적 |
| 중간 삽입/삭제가 빈번 | LinkedList | 노드 연결만 변경 |
| 중복을 허용하지 않음 | HashSet | 빠른 검색, 메모리 효율적 |
| 순서 보장이 필요한 Set | LinkedHashSet | HashSet + 순서 보장 |
| 키-값 쌍 저장 | HashMap | 빠른 검색, 일반적인 용도 |
| 정렬된 키-값 쌍 | TreeMap | 자동 정렬, 범위 검색 |
| 순서 보장이 필요한 Map | LinkedHashMap | HashMap + 순서 보장 |

## 5. 단계별 실습 문제

### 문제 3 - 주문 관리 시스템 (기초)
> 아래 코드의 주석을 참고하여, HashMap을 사용하여 주문 정보를 관리하는 코드를 완성하세요.

```java
import java.util.*;

public class OrderManager {
    private Map<String, Order> orderMap = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        OrderManager manager = new OrderManager();
        
        System.out.println("주문 정보를 입력하세요 (형식: 주문번호,고객ID,상태,금액, 종료하려면 '종료' 입력):");
        
        // TODO: Scanner를 사용하여 주문 정보를 입력받으세요. (nextLine)
        
        // TODO: "종료"를 입력받으면 입력을 멈추세요. (equals)
        
        // TODO: 입력받은 문자열을 ","로 분리하세요. (split)
        
        // TODO: 주문 정보를 Map에 저장하세요. (put)
        
        // TODO: 모든 주문 정보를 출력하세요. (entrySet)
        
        sc.close();
    }
    
    // TODO: 주문을 추가하는 메서드를 구현하세요. (put)
    public void addOrder(Order order) {
        
    }
}

// TODO: Order 클래스를 구현하세요. (생성자, getter 메서드)
class Order {
    private String orderId;
    private String customerId;
    private String status;
    private double amount;
    
    // TODO: 생성자를 구현하세요.
    
    // TODO: getter 메서드들을 구현하세요.
    
    // TODO: toString 메서드를 구현하세요.
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
        // TODO: Scanner를 사용하여 주문 정보를 입력받으세요. (nextLine)
        while (true) {
            String input = sc.nextLine().trim();
            if (input.equals("종료")) break;
            
            // TODO: 입력받은 문자열을 ","로 분리하세요. (split)
            String[] parts = input.split(",");
            if (parts.length == 4) {
                String orderId = parts[0].trim();
                String customerId = parts[1].trim();
                String status = parts[2].trim();
                double amount = Double.parseDouble(parts[3].trim());
                
                // TODO: 주문 정보를 Map에 저장하세요. (put)
                Order order = new Order(orderId, customerId, status, amount);
                manager.addOrder(order);
            }
        }
        
        // TODO: 모든 주문 정보를 출력하세요. (entrySet)
        System.out.println("\n=== 모든 주문 정보 ===");
        for (Map.Entry&lt;String, Order&gt; entry : manager.orderMap.entrySet()) {
            System.out.println(entry.getValue());
        }
  </code></pre>
</details>

<details>
  <summary><span class="green-bold">메서드 및 클래스 구현 정답</span></summary>

  <pre><code class="language-java">
    // TODO: 주문을 추가하는 메서드를 구현하세요. (put)
    public void addOrder(Order order) {
        orderMap.put(order.getOrderId(), order);
    }

    // TODO: Order 클래스를 구현하세요. (생성자, getter 메서드)
    class Order {
        private String orderId;
        private String customerId;
        private String status;
        private double amount;
        
        // TODO: 생성자를 구현하세요.
        public Order(String orderId, String customerId, String status, double amount) {
            this.orderId = orderId;
            this.customerId = customerId;
            this.status = status;
            this.amount = amount;
        }
        
        // TODO: getter 메서드들을 구현하세요.
        public String getOrderId() { return orderId; }
        public String getCustomerId() { return customerId; }
        public String getStatus() { return status; }
        public double getAmount() { return amount; }
        
        // TODO: toString 메서드를 구현하세요.
        @Override
        public String toString() {
            return String.format("주문번호: %s, 고객: %s, 상태: %s, 금액: %.0f원", 
                            orderId, customerId, status, amount);
        }
    }
  </code></pre>
</details>

### 문제 4 - 친구 관계 관리 (기초)
> 아래 코드의 주석을 참고하여, HashMap과 HashSet을 사용하여 친구 관계를 관리하는 코드를 완성하세요.

```java
import java.util.*;

public class FriendManager {
    private Map<String, Set<String>> friendMap = new HashMap<>();
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        FriendManager manager = new FriendManager();
        
        System.out.println("친구 관계를 입력하세요 (형식: 사용자1 사용자2, 종료하려면 '종료' 입력):");
        
        // TODO: Scanner를 사용하여 친구 관계를 입력받으세요. (nextLine)
        
        // TODO: "종료"를 입력받으면 입력을 멈추세요. (equals)
        
        // TODO: 입력받은 문자열을 공백으로 분리하세요. (split)
        
        // TODO: 친구 관계를 Map에 저장하세요. (computeIfAbsent, add)
        
        // TODO: 모든 사용자의 친구 목록을 출력하세요. (entrySet)
        
        sc.close();
    }
    
    // TODO: 친구 관계를 추가하는 메서드를 구현하세요. (computeIfAbsent, add)
    public void addFriendship(String user1, String user2) {
        
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
        // TODO: Scanner를 사용하여 친구 관계를 입력받으세요. (nextLine)
        while (true) {
            String input = sc.nextLine().trim();
            if (input.equals("종료")) break;
            
            // TODO: 입력받은 문자열을 공백으로 분리하세요. (split)
            String[] users = input.split("\\s+");
            if (users.length == 2) {
                // TODO: 친구 관계를 Map에 저장하세요. (computeIfAbsent, add)
                manager.addFriendship(users[0], users[1]);
            }
        }
        
        // TODO: 모든 사용자의 친구 목록을 출력하세요. (entrySet)
        System.out.println("\n=== 친구 관계 목록 ===");
        for (Map.Entry&lt;String, Set&lt;String&gt;&gt; entry : manager.friendMap.entrySet()) {
            String user = entry.getKey();
            Set&lt;String&gt; friends = entry.getValue();
            System.out.printf("%s의 친구: %s\n", user, String.join(", ", friends));
        }
  </code></pre>
</details>

<details>
  <summary><span class="green-bold">메서드 구현 정답</span></summary>

  <pre><code class="language-java">
    // TODO: 친구 관계를 추가하는 메서드를 구현하세요. (computeIfAbsent, add)
    public void addFriendship(String user1, String user2) {
        friendMap.computeIfAbsent(user1, k -> new HashSet&lt;String&gt;()).add(user2);
        friendMap.computeIfAbsent(user2, k -> new HashSet&lt;String&gt;()).add(user1);
    }
  </code></pre>
</details>

### 문제 5 - 온라인 쇼핑몰 주문 관리 시스템 (고급)
> 주문 번호별 주문 정보를 관리하고, 고객별 주문 내역을 집계하며, 주문 상태별 통계를 출력하라.
>
> **조건 및 힌트**
> 1. HashMap을 사용하여 주문 번호별 주문 정보 관리.
> 2. 고객별 주문 내역을 List로 집계.
> 3. 주문 상태별 통계 계산 및 출력.
> 4. Stream API를 활용한 데이터 처리.
> 5. 예: 주문상태별 통계 - "주문완료: 5건, 배송중: 3건, 배송완료: 2건".
                
<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-java">
    import java.util.*;
    import java.util.stream.Collectors;

    public class Order {
        private String orderId;
        private String customerId;
        private String status;
        private double amount;
        
        public Order(String orderId, String customerId, String status, double amount) {
            this.orderId = orderId;
            this.customerId = customerId;
            this.status = status;
            this.amount = amount;
        }
        
        // Getters
        public String getOrderId() { return orderId; }
        public String getCustomerId() { return customerId; }
        public String getStatus() { return status; }
        public double getAmount() { return amount; }
        
        @Override
        public String toString() {
            return String.format("주문번호: %s, 고객: %s, 상태: %s, 금액: %.0f원", 
                               orderId, customerId, status, amount);
        }
    }

    public class OrderManager {
        private Map&lt;String, Order&gt; orderMap = new HashMap<>();
        private Map&lt;String, List&lt;Order&gt;&gt; customerOrderMap = new HashMap<>();
        
        public void addOrder(Order order) {
            orderMap.put(order.getOrderId(), order);
            
            // 고객별 주문 내역 집계
            customerOrderMap.computeIfAbsent(order.getCustomerId(), k -> new ArrayList<>())
                          .add(order);
        }
        
        public Order getOrder(String orderId) {
            return orderMap.get(orderId);
        }
        
        public List&lt;Order&gt; getCustomerOrders(String customerId) {
            return customerOrderMap.getOrDefault(customerId, new ArrayList<>());
        }
        
        public Map&lt;String, Long&gt; getStatusStatistics() {
            return orderMap.values().stream()
                .collect(Collectors.groupingBy(Order::getStatus, Collectors.counting()));
        }
        
        public double getTotalRevenue() {
            return orderMap.values().stream()
                .mapToDouble(Order::getAmount)
                .sum();
        }
        
        public static void main(String[] args) {
            OrderManager manager = new OrderManager();
            
            // 샘플 주문 데이터 추가
            manager.addOrder(new Order("ORD001", "CUST001", "주문완료", 50000));
            manager.addOrder(new Order("ORD002", "CUST001", "배송중", 30000));
            manager.addOrder(new Order("ORD003", "CUST002", "주문완료", 75000));
            manager.addOrder(new Order("ORD004", "CUST003", "배송완료", 45000));
            manager.addOrder(new Order("ORD005", "CUST001", "주문완료", 25000));
            
            System.out.println("=== 주문 상태별 통계 ===");
            Map&lt;String, Long&gt; statusStats = manager.getStatusStatistics();
            statusStats.forEach((status, count) -> 
                System.out.printf("%s: %d건\n", status, count));
            
            System.out.println("\n=== 고객별 주문 내역 ===");
            for (String customerId : Arrays.asList("CUST001", "CUST002", "CUST003")) {
                List&lt;Order&gt; orders = manager.getCustomerOrders(customerId);
                System.out.printf("\n고객 %s의 주문 내역:\n", customerId);
                orders.forEach(order -> System.out.println("  " + order));
            }
            
            System.out.printf("\n=== 총 매출액: %.0f원 ===\n", manager.getTotalRevenue());
        }
    }
  </code></pre>
</details>

## 6. 자주 발생하는 오류와 해결법

### ConcurrentModificationException
```java
// 잘못된 예시
Map<String, String> map = new HashMap<>();
map.put("A", "사과");
map.put("B", "바나나");

for (String key : map.keySet()) {
    if (key.equals("B")) {
        map.remove(key);  // <span class="red-text">ConcurrentModificationException 발생!</span>
    }
}

// 올바른 해결법
Iterator<Map.Entry<String, String>> iterator = map.entrySet().iterator();
while (iterator.hasNext()) {
    Map.Entry<String, String> entry = iterator.next();
    if (entry.getKey().equals("B")) {
        iterator.remove();  // <span class="green-text">안전한 삭제</span>
    }
}
```

### NullPointerException
```java
// 잘못된 예시
Map<String, String> map = new HashMap<>();
String value = map.get("존재하지 않는 키");  // null 반환
System.out.println(value.length());  // <span class="red-text">NullPointerException 발생!</span>

// 올바른 해결법
String value = map.get("존재하지 않는 키");
if (value != null) {
    System.out.println(value.length());
}

// 또는 기본값 사용
String value = map.getOrDefault("존재하지 않는 키", "기본값");
System.out.println(value.length());
```

## 7. 고급 활용 기법

### Stream API와 컬렉션 조합
```java
List<String> names = Arrays.asList("김철수", "이영희", "박민수", "최지영");

// 필터링과 정렬
List<String> filteredNames = names.stream()
    .filter(name -> name.length() >= 3)
    .sorted()
    .collect(Collectors.toList());

// 그룹핑
Map<Integer, List<String>> nameLengthMap = names.stream()
    .collect(Collectors.groupingBy(String::length));

// 통계
IntSummaryStatistics stats = names.stream()
    .mapToInt(String::length)
    .summaryStatistics();
```

### 커스텀 컬렉션 구현
```java
public class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;
    
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);  // accessOrder = true
        this.capacity = capacity;
    }
    
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }
}

// 사용 예시
LRUCache<String, String> cache = new LRUCache<>(3);
cache.put("A", "사과");
cache.put("B", "바나나");
cache.put("C", "오렌지");
cache.get("A");  // A를 가장 최근에 사용한 항목으로 만듦
cache.put("D", "포도");  // B가 제거됨 (가장 오래된 항목)
```