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
* <span class="blue-text">프로그램</span>: 실행 전, 디스크에 저장된 코드의 집합입니다.

* <span class="blue-text">프로세스</span>: 프로그램이 메모리에 적재되어 실행 중인 인스턴스입니다.  
  각 프로세스는 고유의 주소 공간(코드, 데이터, 힙, 스택)과 시스템 자원을 가지며, 서로 <span class="red-text">격리</span>되어 있습니다.

* <span class="blue-text">스레드</span>: 프로세스 내부에서 실행 흐름을 담당하는 단위입니다.  
  스레드들은 <span class="yellow-code">코드</span>, <span class="yellow-code">데이터</span>, <span class="yellow-code">힙</span> 영역을 공유하고, 각자 독립적인 <span class="yellow-code">스택</span>을 가집니다.  
  하나의 프로세스에는 최소 1개의 메인 스레드가 존재합니다.

우리는 길을 걷으며 통화하고 식사를 하며 동시에 여러 가지 일을 수행하고 있습니다.  
이렇게 동시에 여러 가지 일을 할 수 있는 것은 비단 사람뿐만 아닙니다.

‼️ 멀티태스킹은 여러 프로세스 또는 여러 스레드를 통해 구현됩니다.  
‼️ 스레드는 공유 자원에 접근할 때 경쟁 상태가 발생할 수 있으므로, 반드시 동기화가 필요합니다.

<figure>
    <img src="/notes/assets/java-deep-dive/chapter-07-01.png" width="70%" alt="컬렉션 프레임워크"/>
    <figcaption>프로세스와 스레드</figcaption>
</figure>

### 예시: 현재 스레드 조회
```java
public class ThreadNameDemo {
    public static void main(String[] args) {
        String threadName = Thread.currentThread().getName();
        System.out.println("현재 스레드 이름: " + threadName); // 보통 "main"
    }
}
```

## 2. 스레드 생성과 실행
### 2.1 <span class="yellow-code">Thread</span> 클래스 상속

* `run()`에 작업을 구현하고, `start()`로 <span class="blue-text">새 실행 흐름</span>을 시작한다.
* `run()`을 직접 호출하면 <span class="red-text">동기 실행</span>이 된다.

```java
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
* **다중 상속 제약**: 자바는 다중 상속을 지원하지 않습니다.  
  이미 다른 클래스를 상속받고 있다면 <span class="yellow-code">Thread</span>를 상속할 수 없으므로, <span class="yellow-code">Runnable</span> 인터페이스를 구현해야 합니다.

* **역할 분리**: 
  - <span class="blue-text">Thread</span>: 실제 스레드 생성, 스케줄링, 생명주기 관리 담당
  - <span class="blue-text">Runnable</span>: 실행할 작업의 로직만 정의 (실행 코드 제공)
  
* **장점**: 작업 로직과 스레드 관리가 분리되어 코드의 재사용성과 유연성이 향상됩니다.

```java
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
* **함수형 인터페이스**: `Runnable`은 `run()` 메서드 하나만을 가지는 함수형 인터페이스입니다.
* **람다식 활용**: 
  - 기존의 익명 클래스 대신 람다식으로 간결하게 표현 가능
  - 코드의 가독성과 작성 편의성이 크게 향상됩니다
  - 함수형 프로그래밍 패러다임을 활용한 현대적인 스타일

```java
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
* **기본 이름**: 스레드 생성 시 자동으로 `Thread-0`, `Thread-1`, `Thread-2`... 형태로 이름이 부여됩니다.
* **명시적 이름 설정**: `setName()` 메서드로 의미 있는 이름을 부여할 수 있습니다.
  - 디버깅 시 스레드 구분이 용이해집니다
  - 로그 분석 시 어떤 작업을 수행하는 스레드인지 쉽게 파악 가능합니다

```java
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
* **비결정적 실행**: 스레드의 시작 순서는 <span class="red-text">비결정적(Non-deterministic)</span>입니다.
  - JVM과 OS의 스케줄링에 따라 실행 순서가 달라질 수 있습니다
  - `start()` 메서드 호출 순서와 실제 실행 순서는 다를 수 있습니다
  - 멀티코어 환경에서는 진정한 병렬 실행이 가능합니다

* **실험적 관찰**: 두 개의 스레드를 동시에 시작하여 실행 패턴을 관찰해보세요.
  - 매번 실행할 때마다 다른 결과가 나올 수 있습니다
  - 이는 멀티스레딩의 비결정적 특성을 보여주는 좋은 예시입니다

```java
public class MultiStartDemo {
    public static void main(String[] args) {
        Runnable blue = () -> {
            while (true) {
                System.out.println("청기 올려");
            }
        };
        Runnable white = () -> {
            while (true) {
                System.out.println("백기 올려");
            }
        };

        Thread blueFlag = new Thread(blue, "blue-flag");
        Thread whiteFlag = new Thread(white, "white-flag");

        blueFlag.start();
        whiteFlag.start();
    }
}
```

### 문제 1 - 스레드 기본 사용법 (기초)
> 아래 코드의 주석을 참고하여, 현재 스레드 이름을 출력하고 새로운 스레드를 생성하여 시작하는 코드를 완성하세요.

```java
public class Exercise01 {
    public static void main(String[] args) {
        // TODO: 현재 스레드 이름 출력 (Thread.currentThread().getName())
        
        // TODO: Runnable 구현으로 새 스레드 생성 (람다식 사용)
        
        // TODO: Thread로 감싸서 시작 (start() 메서드 사용)
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class Exercise01 {
      public static void main(String[] args) {
          // TODO: 현재 스레드 이름 출력 (Thread.currentThread().getName())
          System.out.println("현재 스레드: " + Thread.currentThread().getName());
          
          // TODO: Runnable 구현으로 새 스레드 생성 (람다식 사용)
          Runnable task = () -> {
              System.out.println("새 스레드: " + Thread.currentThread().getName());
          };
          
          // TODO: Thread로 감싸서 시작 (start() 메서드 사용)
          Thread newThread = new Thread(task);
          newThread.start();
      }
  }
  </code></pre>
</details>

### 문제 2 - Thread 상속 vs Runnable 구현 비교 (중급)
> `Thread` 상속 방식과 `Runnable` 구현 방식 각각으로 1~5를 출력하는 스레드를 만들고 동시에 실행해보세요.  
> `Thread.sleep(10)`을 사용하여 출력이 섞이는 현상을 관찰해보세요.

```java
public class Exercise02 {
    // TODO: Thread 상속 클래스 정의 (1~5 출력, sleep(10) 포함)
    static class NumberThread {}

    public static void main(String[] args) throws Exception {
        // TODO: Thread 상속 방식으로 스레드 생성 및 시작
        
        // TODO: Runnable 구현 방식으로 스레드 생성 및 시작 (람다식 사용)
        
        // TODO: 두 스레드가 모두 완료될 때까지 대기
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class Exercise02 {
      // Thread 상속 클래스
      static class NumberThread extends Thread {
          @Override
          public void run() {
              for (int i = 1; i <= 5; i++) {
                  System.out.println("Thread 상속: " + i);
                  try {
                      Thread.sleep(10);
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
              }
          }
      }
      
      public static void main(String[] args) throws Exception {
          // Thread 상속 방식
          NumberThread thread1 = new NumberThread();
          thread1.start();
          
          // Runnable 구현 방식
          Thread thread2 = new Thread(() -> {
              for (int i = 1; i <= 5; i++) {
                  System.out.println("Runnable 구현: " + i);
                  try {
                      Thread.sleep(10);
                  } catch (InterruptedException e) {
                      e.printStackTrace();
                  }
              }
          });
          thread2.start();
          
          // 두 스레드 완료 대기
          thread1.join();
          thread2.join();
          
          System.out.println("모든 스레드 완료!");
      }
  }
  </code></pre>
</details>

## 3. 스레드 동기화
### 3.1 경쟁 상태 데모
* **경쟁 상태(Race Condition)**: 여러 스레드가 동시에 공유 자원에 접근할 때 발생하는 문제입니다.
* **데이터 손실**: 락 없이 공유 자원을 갱신하면 읽기-수정-쓰기 과정에서 값이 누락되거나 덮어써질 수 있습니다.
* **원자성 부족**: `balance += amount` 같은 연산은 원자적이지 않아 중간에 다른 스레드가 개입할 수 있습니다.

```java
class Bank {
    private int balance = 0;

    public void deposit(int amount) {
        balance += amount; // 원자적이지 않은 연산
    }

    public int getBalance() {
        return balance;
    }
}

class AddThread implements Runnable {
    private String name;
    private Bank bank;

    public AddThread(String name, Bank bank) {
        this.name = name;
        this.bank = bank;
    }

    @Override
    public void run() {
        try {
            for (int i = 0; i < 10; i++) {
                Thread.sleep(100); // 스레드 전환을 유도
                bank.deposit(1000);
                System.out.println(name + " 현재 잔고: " + bank.getBalance());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}

public class RaceDemo {
    public static void main(String[] args) throws InterruptedException {
        Bank bank = new Bank();
        
        Thread thread1 = new Thread(new AddThread("Thread-1", bank));
        Thread thread2 = new Thread(new AddThread("Thread-2", bank));
        
        thread1.start();
        thread2.start();
        
        thread1.join();
        thread2.join();
        
        System.out.println("최종 잔고: " + bank.getBalance()); // 예상: 20,000, 실제: 종종 20,000 미만
    }
}
```

### 3.2 메서드 동기화

* **`synchronized` 메서드**: 메서드 전체를 동기화하여 한 번에 하나의 스레드만 접근 가능합니다.
* **인스턴스 단위 락**: 같은 객체의 `synchronized` 메서드들은 모두 같은 락을 공유합니다.
* **임계 영역**: 동기화된 메서드 내부는 원자적으로 실행되는 안전한 영역입니다.

```java
class SafeBankA {
    private int balance = 0;

    public synchronized void deposit(int amount) {
        balance += amount; // 임계 영역 - 원자적 실행 보장
    }

    public synchronized int getBalance() {
        return balance; // 임계 영역 - 일관된 값 읽기 보장
    }
}
```

### 3.3 블록 동기화

* **세밀한 제어**: 메서드 전체가 아닌 필요한 최소 영역만 동기화합니다.
* **성능 향상**: 동기화 범위를 줄여 병렬성을 향상시킵니다.
* **유연성**: 메서드 내에서 일부만 동기화하거나 다른 객체를 락으로 사용할 수 있습니다.

```java
@Override
public void run() {
    synchronized (bank) {
        try {
            for (int i = 0; i < 1000; i++) {
                Thread.sleep(1); // 스레드 전환을 유도
                bank.deposit(1);
                System.out.println(name + " 현재 잔고: " + bank.getBalance());
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

### 문제 3 - 동기화 기법 비교 (중급)
> 메서드 동기화는 Bank 클래스에서, 블록 동기화는 AddThread에서 처리하는 방식으로 20000을 보장하세요.

```java
public class Exercise03 {
    // TODO: SafeBankA 구현 (메서드 동기화 - Bank에서 처리)
    
    // TODO: SafeAddThread 구현 (블록 동기화 - AddThread에서 처리)
    
    public static void main(String[] args) throws InterruptedException {
        // TODO: 각 방식으로 2개 스레드 10 회 입금 테스트
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class Exercise03 {
      // 메서드 동기화 - Bank 클래스에서 처리
      static class SafeBankA {
          private int balance = 0;
          
          public synchronized void deposit(int amount) {
              balance += amount;
          }
          
          public synchronized int getBalance() {
              return balance;
          }
      }
      
      // 블록 동기화 - AddThread에서 처리
      static class SafeAddThread implements Runnable {
          private String name;
          private Bank bank;
          
          public SafeAddThread(String name, Bank bank) {
              this.name = name;
              this.bank = bank;
          }
          
          @Override
          public void run() {
              try {
                  for (int i = 0; i < 10000; i++) {
                      Thread.sleep(1);
                      synchronized (bank) { // 블록 동기화
                          bank.deposit(1);
                          System.out.println(name + " 현재 잔고: " + bank.getBalance());
                      }
                  }
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
          }
      }
      
      public static void main(String[] args) throws InterruptedException {
          // 메서드 동기화 테스트
          SafeBankA bankA = new SafeBankA();
          Thread t1 = new Thread(new AddThread("Thread-1", bankA));
          Thread t2 = new Thread(new AddThread("Thread-2", bankA));
          
          t1.start(); t2.start();
          t1.join(); t2.join();
          System.out.println("메서드 동기화 결과: " + bankA.getBalance());
          
          // 블록 동기화 테스트
          Bank bankB = new Bank();
          Thread t3 = new Thread(new SafeAddThread("SafeThread-1", bankB));
          Thread t4 = new Thread(new SafeAddThread("SafeThread-2", bankB));
          
          t3.start(); t4.start();
          t3.join(); t4.join();
          System.out.println("블록 동기화 결과: " + bankB.getBalance());
      }
  }
  </code></pre>
</details>

## 4. 스레드 상태와 전이
### 4.1 상태표

| 상태 | 상수 | 설명 |
|------|------|------|
| 생성 | NEW | `new Thread()`로 생성. `start()` 전 |
| 대기/실행 가능 | RUNNABLE | 러닝 또는 러너블 큐 대기 |
| 일시정지 | WAITING | 타 스레드 신호를 무기한 대기(`wait()`, `join()` 등) |
| 일시정지(시간지정) | TIMED_WAITING | 제한 시간 대기(`sleep(ms)`, `wait(ms)` 등) |
| 일시정지(블로킹) | BLOCKED | 모니터 락 획득 대기 |
| 종료 | TERMINATED | `run()` 완료 또는 예외 종료 |

### 4.2 `sleep`: 시간 지연
* **상태 전이**: 현재 스레드를 `TIMED_WAITING` 상태로 전이시킵니다.
* **락 해제**: 스레드가 대기하는 동안 **락을 유지하지 않습니다**.
  - 다른 스레드가 동기화된 메서드나 블록에 접근할 수 있습니다
  - CPU 자원을 다른 스레드가 사용할 수 있습니다
* **자동 복귀**: 지정된 시간이 지나면 자동으로 `RUNNABLE` 상태로 돌아갑니다.

```java
public class SleepDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("A");
        Thread.sleep(500); // 0.5s 대기
        System.out.println("B");
    }
}
```

### 4.3 `wait()` / `notify()`: 조건 대기와 신호
* **호출 제한**: <span class="blue-text">모니터 락</span>이 걸린 동기화 블록/메서드 내부에서만 호출 가능합니다.
  - `synchronized` 블록이나 메서드 밖에서는 `IllegalMonitorStateException` 발생
  - 스레드가 해당 객체의 락을 보유하고 있을 때만 사용 가능

* **`wait()` 메서드**: 
  - 현재 스레드가 락을 <span class="green-text">반납</span>하고 `WAITING` 상태로 전이
  - 다른 스레드가 `notify()` 또는 `notifyAll()`을 호출할 때까지 대기
  - 깨어나면 다시 락을 획득한 후 실행 계속

* **`notify()` / `notifyAll()` 메서드**:
  - 대기 중인 스레드에게 신호를 보냅니다
  - `notify()`: 대기 중인 스레드 중 하나만 깨움 (선택은 JVM이 결정)
  - `notifyAll()`: 대기 중인 모든 스레드를 깨움
  - 락은 호출 스레드가 동기화 블록을 <span class="green-text">완전히 빠져나갈 때</span> 해제됩니다

### 4.4 생산자-소비자 미니 예제

<figure>
    <img src="/notes/assets/java-deep-dive/chapter-07-02.png" width="70%" alt="생산자-소비자 미니 예제"/>
    <figcaption>생산자-소비자 미니 예제</figcaption>
</figure>

```java
public class Worker {
    private int stackCount = 10;

    public synchronized void addStack(int stackCount) {
        this.stackCount += stackCount;

        if (this.stackCount > 10) {
            system.out.println("=====작업자 깨우기=====");
            notify();
        }
    }

    public synchronized void popStack(int leaveCount) {
        try {
            if (leaveCount > this.stackCount) {
                this.stackCount = 0;
            } else {
                this.stackCount -= leaveCount;
            }

            if (this.stackCount == 0) {
                system.out.println("=====작업자 대기=====");
                wait();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public int getStackCount() {
        return this.stackCount;
    }
}

public class AddStackThread extends Thread {
    private Worker worker;

    public AddStackThread(Worker worker) {
        this.worker = worker;
    }

    @Override
    public void run() {
        try {
            while (true) {
                Thread.sleep(1000);
                if (this.worker.getStackCount() == 10) {
                    system.out.println("=====짐 10개 추가=====")가
                    this.worker.addStack(10);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class PopStackThread extends Thread {
    private Worker worker;

    public PopStackThread(Worker worker) {
        this.worker = worker;
    }

    @Override
    public void run() {
        try {
            while (true) {
                Thread.sleep(1000);
                system.out.println("=====짐 5개 나르기=====");
                this.worker.popStack(5);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Worker worker = new Worker();
        AddStackThread addStackThread = new AddStackThread(worker);
        PopStackThread popStackThread = new PopStackThread(worker);
        addStackThread.start();
        popStackThread.start();
    }
}
```

<span class="red-text">주의</span>
* `wait/notify`는 <span class="yellow-code">synchronized</span> 없이 호출하면 `IllegalMonitorStateException`.
* `if` 대신 <span class="green-text">while</span>로 조건을 검사해 <span class="red-text">spurious wakeup</span> 방지.
* 다수 스레드라면 `notifyAll()`이 안전.

### 문제 4 - 생산자-소비자 패턴 (중급)
> 용량 5인 버퍼를 만들고 생산자 1명, 소비자 2명으로 구성하세요. while 조건과 notifyAll을 사용하세요.

```java
public class Exercise04 {
    static class BoundedBuffer {
        private final int[] buffer = new int[5]; // 용량 5인 버퍼
        private int count = 0; // 현재 저장된 아이템 수
        private int putIndex = 0; // 다음 저장 위치
        private int takeIndex = 0; // 다음 가져올 위치
        
        // TODO: offer 메서드 구현 (버퍼가 가득 찬 경우 대기)
        public synchronized void offer(int item) throws InterruptedException {
            // TODO: while 조건으로 버퍼가 가득 찬지 확인
            // TODO: wait() 호출
            // TODO: 아이템 저장 및 인덱스 업데이트
            // TODO: notifyAll() 호출
        }
        
        // TODO: take 메서드 구현 (버퍼가 비어있는 경우 대기)
        public synchronized int take() throws InterruptedException {
            // TODO: while 조건으로 버퍼가 비어있는지 확인
            // TODO: wait() 호출
            // TODO: 아이템 반환 및 인덱스 업데이트
            // TODO: notifyAll() 호출
            return 0; // 임시 반환값
        }
    }
    
    public static void main(String[] args) {
        BoundedBuffer buffer = new BoundedBuffer();
        
        // TODO: 생산자 스레드 생성 (1~10 숫자 생성)
        Thread producer = new Thread(() -> {
            try {
                for (int i = 1; i <= 10; i++) {
                    buffer.offer(i);
                    System.out.println("생산: " + i);
                    Thread.sleep(100);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        // TODO: 소비자 스레드 2개 생성
        Thread consumer1 = new Thread(() -> {
            try {
                while (true) {
                    int item = buffer.take();
                    System.out.println("소비자1: " + item);
                    Thread.sleep(150);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        Thread consumer2 = new Thread(() -> {
            try {
                while (true) {
                    int item = buffer.take();
                    System.out.println("소비자2: " + item);
                    Thread.sleep(200);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        // TODO: 모든 스레드 시작
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class Exercise04 {
      // TODO: BoundedBuffer 구현 (offer/take 동기화, 용량 5)
      static class BoundedBuffer {
          private final int[] buffer = new int[5];
          private int count = 0;
          private int putIndex = 0;
          private int takeIndex = 0;
          
          public synchronized void offer(int item) throws InterruptedException {
              while (count == buffer.length) {
                  wait();
              }
              buffer[putIndex] = item;
              putIndex = (putIndex + 1) % buffer.length;
              count++;
              notifyAll();
          }
          
          public synchronized int take() throws InterruptedException {
              while (count == 0) {
                  wait();
              }
              int item = buffer[takeIndex];
              takeIndex = (takeIndex + 1) % buffer.length;
              count--;
              notifyAll();
              return item;
          }
      }
      
      public static void main(String[] args) {
          // TODO: 생산자 1, 소비자 2 스레드 생성
          BoundedBuffer buffer = new BoundedBuffer();
          
          Thread producer = new Thread(() -> {
              try {
                  for (int i = 1; i <= 10; i++) {
                      buffer.offer(i);
                      System.out.println("생산: " + i);
                      Thread.sleep(100);
                  }
              } catch (InterruptedException e) {}
          });
          
          Thread consumer1 = new Thread(() -> {
              try {
                  for (int i = 0; i < 5; i++) {
                      int item = buffer.take();
                      System.out.println("소비자1: " + item);
                      Thread.sleep(150);
                  }
              } catch (InterruptedException e) {}
          });
          
          Thread consumer2 = new Thread(() -> {
              try {
                  for (int i = 0; i < 5; i++) {
                      int item = buffer.take();
                      System.out.println("소비자2: " + item);
                      Thread.sleep(150);
                  }
              } catch (InterruptedException e) {}
          });
          
          producer.start();
          consumer1.start();
          consumer2.start();
      }
  }
  </code></pre>
</details>

## 5. 실전 체크리스트
* **공유 상태 최소화**: 공유 가변 상태를 최소화하고, 가능하면 <span class="green-text">불변 객체</span> 또는 <span class="green-text">스레드 한정</span>을 사용하세요.
  - 불변 객체: `String`, `Integer` 등 한 번 생성되면 변경되지 않는 객체
  - 스레드 한정: 각 스레드가 독립적인 데이터를 가지도록 설계

* **동기화 범위 최소화**: 꼭 필요한 최소 영역만 <span class="yellow-code">synchronized</span>로 보호하세요.
  - 성능 향상: 동기화 범위가 작을수록 병렬성 증가
  - 데드락 방지: 락을 보유하는 시간을 최소화

* **안전한 조건 대기**: 조건 대기는 `while` 루프 + `notifyAll()` 패턴을 사용하세요.
  - `if` 대신 `while` 사용으로 spurious wakeup 방지
  - `notifyAll()` 사용으로 모든 대기 스레드에게 신호 전달

* **디버깅 지원**: 스레드 이름을 부여해 로깅 가독성을 확보하세요.
  - `Thread.currentThread().setName("Worker-1")` 또는 생성자에서 이름 설정
  - 로그에서 어떤 스레드에서 발생한 문제인지 쉽게 식별 가능

* **올바른 스레드 시작**: `run()` 직접 호출 금지. 항상 `start()`를 사용하세요.
  - `run()` 직접 호출: 동기 실행 (새 스레드 생성 안됨)
  - `start()` 호출: 비동기 실행 (새 스레드에서 실행)

## 6. 종합 문제

### 문제 1 - 기본 스레드 생성 (기초)
> 두 개의 스레드를 생성하여 각각 "Hello"와 "World"를 출력하세요.

```java
public class BasicThreadDemo {
    public static void main(String[] args) throws Exception {
        // TODO: "Hello"를 출력하는 스레드 생성
        Thread t1 = new Thread(() -> {
            System.out.println("Hello");
        });
        
        // TODO: "World"를 출력하는 스레드 생성
        Thread t2 = new Thread(() -> {
            System.out.println("World");
        });
        
        // TODO: 두 스레드 시작
        // TODO: 두 스레드 완료 대기
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class BasicThreadDemo {
      public static void main(String[] args) throws Exception {
          // "Hello"를 출력하는 스레드 생성
          Thread t1 = new Thread(() -> {
              System.out.println("Hello");
          });
          
          // "World"를 출력하는 스레드 생성
          Thread t2 = new Thread(() -> {
              System.out.println("World");
          });
          
          // 두 스레드 시작
          t1.start();
          t2.start();
          
          // 두 스레드 완료 대기
          t1.join();
          t2.join();
          
          System.out.println("모든 스레드 완료!");
      }
  }
  </code></pre>
</details>
### 문제 2 - 스레드 이름 설정 (기초)
> 두 개의 스레드를 "Worker-1", "Worker-2"로 이름을 설정하고 각각 1~5까지 숫자를 출력하세요.

```java
public class NamedThreadDemo {
    public static void main(String[] args) throws Exception {
        // TODO: "Worker-1" 스레드 생성 (1~5 출력)
        Thread worker1 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }, "Worker-1");
        
        // TODO: "Worker-2" 스레드 생성 (1~5 출력)
        Thread worker2 = new Thread(() -> {
            for (int i = 1; i <= 5; i++) {
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }, "Worker-2");
        
        // TODO: 두 스레드 시작 및 완료 대기
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class NamedThreadDemo {
      public static void main(String[] args) throws Exception {
          // "Worker-1" 스레드 생성 (1~5 출력)
          Thread worker1 = new Thread(() -> {
              for (int i = 1; i <= 5; i++) {
                  System.out.println(Thread.currentThread().getName() + ": " + i);
              }
          }, "Worker-1");
          
          // "Worker-2" 스레드 생성 (1~5 출력)
          Thread worker2 = new Thread(() -> {
              for (int i = 1; i <= 5; i++) {
                  System.out.println(Thread.currentThread().getName() + ": " + i);
              }
          }, "Worker-2");
          
          // 두 스레드 시작
          worker1.start();
          worker2.start();
          
          // 두 스레드 완료 대기
          worker1.join();
          worker2.join();
          
          System.out.println("모든 작업 완료!");
      }
  }
  </code></pre>
</details>
### 문제 3 - 간단한 동기화 (기초)
> 공유 변수 `counter`를 두 스레드가 각각 5번씩 증가시키는 프로그램을 만드세요. `synchronized`를 사용하여 동기화하세요.

```java
public class SimpleSyncDemo {
    private static int counter = 0;
    
    public static void main(String[] args) throws Exception {
        // TODO: counter를 5번 증가시키는 스레드 1
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                synchronized (SimpleSyncDemo.class) {
                    counter++;
                    System.out.println("스레드1: counter = " + counter);
                }
            }
        });
        
        // TODO: counter를 5번 증가시키는 스레드 2
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                synchronized (SimpleSyncDemo.class) {
                    counter++;
                    System.out.println("스레드2: counter = " + counter);
                }
            }
        });
        
        // TODO: 두 스레드 시작 및 완료 대기
        // TODO: 최종 counter 값 출력
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class SimpleSyncDemo {
      private static int counter = 0;
      
      public static void main(String[] args) throws Exception {
          // counter를 5번 증가시키는 스레드 1
          Thread t1 = new Thread(() -> {
              for (int i = 0; i < 5; i++) {
                  synchronized (SimpleSyncDemo.class) {
                      counter++;
                      System.out.println("스레드1: counter = " + counter);
                  }
              }
          });
          
          // counter를 5번 증가시키는 스레드 2
          Thread t2 = new Thread(() -> {
              for (int i = 0; i < 5; i++) {
                  synchronized (SimpleSyncDemo.class) {
                      counter++;
                      System.out.println("스레드2: counter = " + counter);
                  }
              }
          });
          
          // 두 스레드 시작
          t1.start();
          t2.start();
          
          // 두 스레드 완료 대기
          t1.join();
          t2.join();
          
          // 최종 counter 값 출력
          System.out.println("최종 counter 값: " + counter);
      }
  }
  </code></pre>
</details>
### 문제 4 - Thread.sleep() 사용 (기초)
> 세 개의 스레드가 각각 다른 간격으로 "작업 중..."을 출력하는 프로그램을 만드세요. `Thread.sleep()`을 사용하세요.

```java
public class SleepDemo {
    public static void main(String[] args) throws Exception {
        // TODO: 1초 간격으로 3번 출력하는 스레드
        Thread t1 = new Thread(() -> {
            try {
                for (int i = 1; i <= 3; i++) {
                    System.out.println("스레드1: 작업 " + i);
                    Thread.sleep(1000); // 1초 대기
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        // TODO: 2초 간격으로 3번 출력하는 스레드
        Thread t2 = new Thread(() -> {
            try {
                for (int i = 1; i <= 3; i++) {
                    System.out.println("스레드2: 작업 " + i);
                    Thread.sleep(2000); // 2초 대기
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        
        // TODO: 세 스레드 시작 및 완료 대기
    }
}
```

<details>
  <summary><span class="green-bold">정답 보기</span></summary>

  <pre><code class="language-java">
  public class SleepDemo {
      public static void main(String[] args) throws Exception {
          // 1초 간격으로 3번 출력하는 스레드
          Thread t1 = new Thread(() -> {
              try {
                  for (int i = 1; i <= 3; i++) {
                      System.out.println("스레드1: 작업 " + i);
                      Thread.sleep(1000); // 1초 대기
                  }
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
          });
          
          // 2초 간격으로 3번 출력하는 스레드
          Thread t2 = new Thread(() -> {
              try {
                  for (int i = 1; i <= 3; i++) {
                      System.out.println("스레드2: 작업 " + i);
                      Thread.sleep(2000); // 2초 대기
                  }
              } catch (InterruptedException e) {
                  e.printStackTrace();
              }
          });
          
          // 세 스레드 시작
          t1.start();
          t2.start();
          
          // 세 스레드 완료 대기
          t1.join();
          t2.join();
          
          System.out.println("모든 작업 완료!");
      }
  }
  </code></pre>
</details>

## 7. 자주 발생하는 오류와 해결
* <span class="red-text">ConcurrentModificationException</span>: 순회 중 컬렉션 수정. `Iterator.remove()` 사용.

* <span class="red-text">IllegalMonitorStateException</span>: `wait/notify`를 동기화 블록 밖에서 호출.

* <span class="red-text">Deadlock</span>: 상호 잠금. 락 획득 순서 통일, 타임아웃 락 사용 고려.

* <span class="red-text">Visibility 문제</span>: 스레드 간 가시성. `volatile` 또는 동기화로 해결.

## 부록: 익명 클래스 간단 예시
```java
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
```