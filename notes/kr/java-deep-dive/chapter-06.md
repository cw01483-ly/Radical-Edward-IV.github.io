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

### 문제 1 - 학생 성적 관리 시스템 (기초)
> 학생들의 이름과 성적을 입력받아 TreeMap을 사용하여 성적 순으로 정렬하고, 동일한 성적의 학생들을 그룹화하여 출력하라.
>
> **조건 및 힌트**
> 1. TreeMap을 사용하여 자동 정렬 구현.
> 2. Map<Integer, List<String>> 구조로 성적별 학생 그룹화.
> 3. Scanner를 사용하여 콘솔 입력 처리.
> 4. "종료" 입력 시 프로그램 종료.
> 5. 예: 입력 "김철수:85, 이영희:92, 박민수:85" → 출력 "85점: 김철수, 박민수 / 92점: 이영희".
                
<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-java">
    import java.util.*;
    import java.util.Scanner;

    public class GradeManager {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            Map<Integer, List<String>> gradeMap = new TreeMap<>();
            
            System.out.println("학생 이름과 성적을 입력하세요 (형식: 이름:성적, 종료하려면 '종료' 입력):");
            
            while (true) {
                String input = sc.nextLine().trim();
                if (input.equals("종료")) break;
                
                String[] parts = input.split(":");
                if (parts.length == 2) {
                    String name = parts[0].trim();
                    int grade = Integer.parseInt(parts[1].trim());
                    
                    // 성적별로 학생 그룹화
                    gradeMap.computeIfAbsent(grade, k -> new ArrayList<>()).add(name);
                }
            }
            
            System.out.println("\n=== 성적별 학생 그룹화 ===");
            for (Map.Entry<Integer, List<String>> entry : gradeMap.entrySet()) {
                int grade = entry.getKey();
                List<String> students = entry.getValue();
                System.out.printf("%d점: %s\n", grade, String.join(", ", students));
            }
            
            sc.close();
        }
    }
  </code></pre>
</details>

### 문제 2 - SNS 친구 추천 시스템 (중급)
> 사용자와 친구 관계를 저장하고, 공통 친구가 많은 사용자를 찾아 친구 추천 점수를 계산하여 출력하라.
>
> **조건 및 힌트**
> 1. HashMap과 HashSet을 조합하여 친구 관계 저장.
> 2. 공통 친구 수를 계산하는 메서드 구현.
> 3. 친구 추천 점수 = 공통 친구 수 × 10.
> 4. 추천 점수 순으로 정렬하여 출력.
> 5. 예: 김철수의 친구: [이영희, 박민수], 이영희의 친구: [김철수, 박민수, 최지영] → 박민수 추천점수: 20점.
                
<details>
  <summary><span class="green-text">정답 보기</span></summary>

  <pre><code class="language-java">
    import java.util.*;
    import java.util.Scanner;

    public class FriendRecommender {
        private Map<String, Set<String>> friendMap = new HashMap<>();
        
        public void addFriendship(String user1, String user2) {
            friendMap.computeIfAbsent(user1, k -> new HashSet<>()).add(user2);
            friendMap.computeIfAbsent(user2, k -> new HashSet<>()).add(user1);
        }
        
        public int getCommonFriends(String user1, String user2) {
            Set<String> friends1 = friendMap.getOrDefault(user1, new HashSet<>());
            Set<String> friends2 = friendMap.getOrDefault(user2, new HashSet<>());
            
            Set<String> common = new HashSet<>(friends1);
            common.retainAll(friends2);
            return common.size();
        }
        
        public Map<String, Integer> getRecommendations(String targetUser) {
            Map<String, Integer> recommendations = new HashMap<>();
            Set<String> targetFriends = friendMap.getOrDefault(targetUser, new HashSet<>());
            
            for (String user : friendMap.keySet()) {
                if (!user.equals(targetUser) && !targetFriends.contains(user)) {
                    int score = getCommonFriends(targetUser, user) * 10;
                    if (score > 0) {
                        recommendations.put(user, score);
                    }
                }
            }
            
            return recommendations;
        }
        
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            FriendRecommender recommender = new FriendRecommender();
            
            System.out.println("친구 관계를 입력하세요 (형식: 사용자1 사용자2, 종료하려면 '종료' 입력):");
            
            while (true) {
                String input = sc.nextLine().trim();
                if (input.equals("종료")) break;
                
                String[] users = input.split("\\s+");
                if (users.length == 2) {
                    recommender.addFriendship(users[0], users[1]);
                }
            }
            
            System.out.print("추천을 받을 사용자를 입력하세요: ");
            String targetUser = sc.nextLine().trim();
            
            Map<String, Integer> recommendations = recommender.getRecommendations(targetUser);
            
            System.out.println("\n=== 친구 추천 목록 ===");
            if (recommendations.isEmpty()) {
                System.out.println("추천할 친구가 없습니다.");
            } else {
                recommendations.entrySet().stream()
                    .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                    .forEach(entry -> System.out.printf("%s: %d점\n", entry.getKey(), entry.getValue()));
            }
            
            sc.close();
        }
    }
  </code></pre>
</details>

### 문제 3 - 온라인 쇼핑몰 주문 관리 시스템 (고급)
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
        private Map<String, Order> orderMap = new HashMap<>();
        private Map<String, List<Order>> customerOrderMap = new HashMap<>();
        
        public void addOrder(Order order) {
            orderMap.put(order.getOrderId(), order);
            
            // 고객별 주문 내역 집계
            customerOrderMap.computeIfAbsent(order.getCustomerId(), k -> new ArrayList<>())
                          .add(order);
        }
        
        public Order getOrder(String orderId) {
            return orderMap.get(orderId);
        }
        
        public List<Order> getCustomerOrders(String customerId) {
            return customerOrderMap.getOrDefault(customerId, new ArrayList<>());
        }
        
        public Map<String, Long> getStatusStatistics() {
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
            Map<String, Long> statusStats = manager.getStatusStatistics();
            statusStats.forEach((status, count) -> 
                System.out.printf("%s: %d건\n", status, count));
            
            System.out.println("\n=== 고객별 주문 내역 ===");
            for (String customerId : Arrays.asList("CUST001", "CUST002", "CUST003")) {
                List<Order> orders = manager.getCustomerOrders(customerId);
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

### 메모리 누수 방지
```java
// 잘못된 예시
Map<String, Object> cache = new HashMap<>();
// ... 많은 데이터 추가 ...
// cache.clear(); // <span class="red-text">clear() 호출하지 않음</span>

// 올바른 해결법
Map<String, Object> cache = new WeakHashMap<>();  // <span class="green-text">약한 참조 사용</span>
// 또는
cache.clear();  // <span class="green-text">명시적으로 정리</span>
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