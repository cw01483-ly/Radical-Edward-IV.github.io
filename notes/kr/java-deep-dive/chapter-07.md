---
layout: article
title: 7. 프로세스와 스레드
permalink: /notes/kr/java-deep-dive/chapter-07
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Java 심화 과정 강의 노트, 프로세스와 스레드, 생성·실행 모델, 동기화, 상태 전이, wait/notify 패턴, 실습 템플릿을 다룹니다.
keywords: "Java, Thread, Runnable, 동기화, synchronized, wait, notify, 상태, 멀티스레딩"
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

## 1. 프로세스와 스레드
* <span class="blue-text">프로그램</span>: 디스크에 저장된 실행 전 코드 집합.
* <span class="blue-text">프로세스</span>: 프로그램이 메모리에 적재되어 실행 중인 인스턴스. 주소 공간(코드/데이터/힙/스택)과 시스템 자원 보유. 서로 <span class="red-text">격리</span>.
* <span class="blue-text">스레드</span>: 프로세스 내부의 실행 흐름 단위. 스레드들은 <span class="yellow-code">코드/데이터/힙</span>을 공유하고 각자 <span class="yellow-code">스택</span>을 가짐.   
하나의 프로세스에는 최소 1개의 메인 스레드가 존재.

‼️ 멀티태스킹은 다중 프로세스와 다중 스레드로 구현된다.   
‼️ 스레드는 공유 자원 접근 시 경쟁 상태가 발생할 수 있으므로 동기화가 필요하다.

### 예시: 현재 스레드 조회
```
public class ThreadNameDemo {
    public static void main(String[] args) {
        String threadName = Thread.currentThread().getName();
        System.out.println("현재 스레드 이름: " + threadName); // 보통 "main"
    }
}
```

TOOODOOO ### 문제 1 - 스레드 기본 사용법 (기초)
TOOODOOO 목표: 현재 스레드 이름 출력 후, 사용자 정의 스레드 1개 생성·시작.
TOOODOOO 
TOOODOOO 가이드: `Thread.currentThread()`, `new Thread(Runnable)`, `start()`.
TOOODOOO 
TOOODOOO ```
TOOODOOO public class Exercise01 {
TOOODOOO     public static void main(String[] args) {
TOOODOOO         // TODO: 현재 스레드 이름 출력
TOOODOOO 
TOOODOOO         // TODO: Runnable 구현으로 새 스레드 생성
TOOODOOO 
TOOODOOO         // TODO: Thread로 감싸서 시작
TOOODOOO     }
TOOODOOO }
TOOODOOO ```

## 2. 스레드 생성과 실행

### 2.1 <span class="yellow-code">Thread</span> 클래스 상속

* `run()`에 작업을 구현하고, `start()`로 <span class="blue-text">새 실행 흐름</span>을 시작한다.
* `run()`을 직접 호출하면 <span class="red-text">동기 실행</span>이 된다.

```
class MyThread extends Thread {
    @Override
    public void run() {
        int sum = 0;
        for (int i = 0; i < 10; i++) sum += (i + 1);
        System.out.println("sum = " + sum);
        String name = Thread.currentThread().getName();
        System.out.println("현재 스레드 이름: " + name);
    }
}

public class ThreadExtDemo {
    public static void main(String[] args) {
        MyThread th = new MyThread();
        th.start();
    }
}
```

### 2.2 <span class="yellow-code">Runnable</span> 구현
* 자바는 다중 상속 불가. 이미 부모 클래스를 상속 중이면 <span class="yellow-code">Runnable</span>을 구현한다.
* 실제 스케줄링은 `Thread`가 담당. 실행 코드는 `Runnable`이 제공.

```
class CalcTask implements Runnable {
    @Override
    public void run() {
        System.out.println("작업 실행: " + Thread.currentThread().getName());
    }
}

public class RunnableDemo {
    public static void main(String[] args) {
        Runnable task = new CalcTask();
        Thread th = new Thread(task); // Runnable을 Thread에 주입
        th.start();
    }
}
```

### 2.3 익명 클래스와 람다
* `Runnable`은 함수형 인터페이스.
* 람다로 간결하게 표현 가능.

```
public class LambdaDemo {
    public static void main(String[] args) {
        Runnable white = () -> {
            for (int i = 0; i < 3; i++) {
                System.out.println("백기 올려");
            }
        };
        Thread whiteFlag = new Thread(white);
        whiteFlag.start();
    }
}
```

### 2.4 스레드에 이름 부여
디폴트는 `Thread-n`. `setName()`으로 명시적 이름 부여.

```
class MyTask extends Thread {
    public MyTask() {
        setName("myTask-1");
    }

    public void run() {
        System.out.println(getName());
    }
}

public class NameDemo {
    public static void main(String[] args) {
        Runnable r = () -> System.out.println(Thread.currentThread().getName());
        Thread th = new Thread(r);
        th.setName("thread-blue");
        th.start();
    }
}
```

### 2.5 멀티 스레드 시작 순서 예시
* 시작 순서는 <span class="red-text">비결정적</span>.
* 두 스레드를 시작해 관찰.

```
public class MultiStartDemo {
    public static void main(String[] args) {
        Runnable blue = () -> System.out.println("청기 올려");
        Runnable white = () -> System.out.println("백기 올려");

        Thread blueFlag = new Thread(blue, "blue-flag");
        Thread whiteFlag = new Thread(white, "white-flag");

        blueFlag.start();
        whiteFlag.start();
    }
}
```

TOOODOOO ### 연습 템플릿 2
TOOODOOO 목표: `Thread` 상속 방식과 `Runnable` 방식 각각으로 1~5 출력 스레드 구현 후 동시에 실행.
TOOODOOO 
TOOODOOO 가이드: `sleep(10)`을 넣어 출력 interleave 관찰.
TOOODOOO 
TOOODOOO """
TOOODOOO public class Exercise02 {
TOOODOOO // TODO: Thread 상속 클래스 정의
TOOODOOO 
TOOODOOO public static void main(String[] args) throws Exception {
TOOODOOO     // TODO: 상속 기반 스레드 시작
TOOODOOO     // TODO: Runnable 기반 스레드 시작
TOOODOOO }
TOOODOOO 
TOOODOOO 
TOOODOOO }
TOOODOOO """

## 3. 스레드 동기화

### 3.0 경쟁 상태 데모

공유 자원을 락 없이 갱신하면 누락·덮어쓰기가 발생한다.

"""
class Bank {
private int balance = 0;
public void deposit(int amount) {
// 의도: balance += amount;
int cur = balance; // 읽기
cur = cur + amount; // 계산
balance = cur; // 쓰기
}
public int getBalance() { return balance; }
}

public class RaceDemo {
public static void main(String[] args) throws InterruptedException {
Bank bank = new Bank();
Runnable r = () -> {
for (int i = 0; i < 10000; i++) bank.deposit(1);
};
Thread t1 = new Thread(r);
Thread t2 = new Thread(r);
t1.start(); t2.start();
t1.join(); t2.join();
System.out.println("기대 20000, 실제 " + bank.getBalance()); // 종종 20000 미만
}
}
"""

### 3.1 메서드 동기화

`synchronized` 메서드는 인스턴스 단위 락을 사용. 한 번에 하나의 스레드만 진입.

"""
class SafeBankA {
private int balance = 0;

public synchronized void deposit(int amount) {
    balance += amount; // 임계 영역
}
public synchronized int getBalance() { return balance; }


}
"""

### 3.2 블록 동기화

넓은 메서드 대신 필요한 최소 영역만 동기화. 병렬성 향상.

"""
class SafeBankB {
private int balance = 0;
private final Object lock = new Object();

public void deposit(int amount) {
    // 기타 비임계 로직...
    synchronized (lock) {
        balance += amount; // 임계 영역
    }
    // 기타 비임계 로직...
}
public int getBalance() {
    synchronized (lock) { return balance; }
}


}
"""

### 연습 템플릿 3

목표: 위 `RaceDemo`를 메서드 동기화 버전과 블록 동기화 버전으로 각각 수정해 `20000` 보장.

가이드: `synchronized` 키워드 비교.

"""
public class Exercise03 {
// TODO: SafeBankA 구현 (메서드 동기화)
// TODO: SafeBankB 구현 (블록 동기화)
// TODO: 각 구현으로 2개 스레드 1만 회 입금 테스트
}
"""

## 4. 스레드 상태와 전이

### 4.1 상태 표

상태	상수	설명
생성	NEW	`new Thread()`로 생성. `start()` 전
대기/실행 가능	RUNNABLE	러닝 또는 러너블 큐 대기
일시정지	WAITING	타 스레드 신호를 무기한 대기(`wait()`, `join()` 등)
일시정지(시간지정)	TIMED_WAITING	제한 시간 대기(`sleep(ms)`, `wait(ms)` 등)
일시정지(블로킹)	BLOCKED	모니터 락 획득 대기
종료	TERMINATED	`run()` 완료 또는 예외 종료

### 4.2 `sleep`: 시간 지연

현재 스레드를 `TIMED_WAITING`으로 전이. 락은 유지하지 않는다.

"""
public class SleepDemo {
public static void main(String[] args) throws InterruptedException {
System.out.println("A");
Thread.sleep(500); // 0.5s 대기
System.out.println("B");
}
}
"""

### 4.3 `wait()` / `notify()`: 조건 대기와 신호

<span class="blue-text">모니터 락</span>이 걸린 동기화 블록/메서드 내부에서만 호출 가능.

`wait()`: 현재 스레드가 락을 <span class="green-text">반납</span>하고 조건 대기.

`notify()` 또는 `notifyAll()`: 대기 스레드에 신호. 락은 호출 스레드가 블록을 <span class="green-text">빠져나갈 때</span> 해제.

### 생산자-소비자 미니 예제
"""
class Storage {
private int stock = 0;
private final int CAP = 10;

public synchronized void produce(int n) throws InterruptedException {
    while (stock + n > CAP) { // 가득 찼으면 대기
        wait();
    }
    stock += n;
    System.out.println("[생산] +" + n + " -> " + stock);
    notifyAll(); // 소비자 깨우기
}

public synchronized void consume(int n) throws InterruptedException {
    while (stock < n) { // 재고 없으면 대기
        System.out.println("===짐 없음 대기===");
        wait();
        System.out.println("===대기 해제===");
    }
    stock -= n;
    System.out.println("[소비] -" + n + " -> " + stock);
    notifyAll(); // 생산자 깨우기
}


}

public class WaitNotifyDemo {
public static void main(String[] args) {
Storage s = new Storage();

    Thread producer = new Thread(() -> {
        try {
            for (int i = 0; i < 5; i++) s.produce(3);
        } catch (InterruptedException ignored) {}
    }, "producer");

    Thread consumer = new Thread(() -> {
        try {
            for (int i = 0; i < 5; i++) s.consume(2);
        } catch (InterruptedException ignored) {}
    }, "consumer");

    producer.start();
    consumer.start();
}


}
"""

<span class="red-text">주의</span>

`wait/notify`는 <span class="yellow-code">synchronized</span> 없이 호출하면 `IllegalMonitorStateException`.

`if` 대신 <span class="green-text">while</span>로 조건을 검사해 <span class="red-text">spurious wakeup</span> 방지.

다수 스레드라면 `notifyAll()`이 안전.

### 연습 템플릿 4

목표: 버퍼 용량 5인 큐를 만들고 생산자 1, 소비자 2 구성. `while` 조건·`notifyAll` 사용.
"""
public class Exercise04 {
// TODO: BoundedBuffer 구현 (offer/take 동기화, 용량 5)
// TODO: 생산자 1, 소비자 2 스레드 생성
}
"""

## 5. 실전 체크리스트

공유 가변 상태를 최소화. 가능하면 <span class="green-text">불변 객체</span> 또는 <span class="green-text">스레드 한정</span>.

꼭 필요한 최소 영역만 <span class="yellow-code">synchronized</span>.

조건 대기는 `while` 루프 + `notifyAll()`.

스레드 이름을 부여해 로깅 가독성 확보.

`run()` 직접 호출 금지. 항상 `start()`.

## 6. 종합 문제

### 문제 1 — 합계 계산기(기초)

두 스레드가 1~1,000,000의 합을 절반씩 나눠 계산. 메인 스레드가 결과를 합산해 검증.

포인트: `join()`로 종료 대기.

"""
public class SumHalf {
public static void main(String[] args) throws Exception {
// TODO: t1은 1500_000, t2는 500_0011_000_000 합산
// TODO: 각 결과를 메인에서 합쳐 정답 출력
}
}
"""

### 문제 2 — 안전한 계좌(중급)

2개의 출금 스레드가 동시에 `withdraw(1)`를 10,000회 실행. 초기 잔액 10,000. 음수 잔액이 발생하지 않도록 수정.

포인트: 임계 영역 최소화.

"""
class Account {
// TODO: balance, withdraw 동기화
}
public class SafeWithdraw {
public static void main(String[] args) throws Exception {
// TODO
}
}
"""

### 문제 3 — 생산자-소비자 확장(중급)

용량 3, 생산자 2, 소비자 2. 각자 랜덤 생산/소비. 일정 시간 후 종료.

포인트: `while` 조건, `interrupt()` 처리.

"""
public class PCAdvanced {
// TODO
}
"""

### 문제 4 — 이름과 로깅(기초)

스레드 이름을 `worker-1..N`으로 부여하고 시작/종료 시점을 로깅.

포인트: `Thread.currentThread().getName()`.

"""
public class NamedWorkers {
// TODO
}
"""

## 7. 자주 발생하는 오류와 해결

<span class="red-text">ConcurrentModificationException</span>: 순회 중 컬렉션 수정. `Iterator.remove()` 사용.

<span class="red-text">IllegalMonitorStateException</span>: `wait/notify`를 동기화 블록 밖에서 호출.

<span class="red-text">Deadlock</span>: 상호 잠금. 락 획득 순서 통일, 타임아웃 락 사용 고려.

<span class="red-text">Visibility 문제</span>: 스레드 간 가시성. `volatile` 또는 동기화로 해결.

## 부록: 익명 클래스 간단 예시
"""
public class AnonymousDemo {
interface Greeter { void greet(); }

public static void main(String[] args) {
    Greeter g = new Greeter() {
        @Override
        public void greet() {
            System.out.println("Hello");
        }
    };
    g.greet();
}


}
"""