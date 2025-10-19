---
layout: article
title: 실전 문제 연습
permalink: /notes/kr/info-processing-technician/quiz-practice
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: 정보처리기능사 실기 실전 문제 연습 - 다양한 유형의 문제를 풀어보세요.
keywords: "정보처리기능사, 실기, 문제풀이, 연습문제, C언어, 네트워크, 데이터베이스, 운영체제"
---

<script src="/assets/js/quiz.js"></script>

<style>
    .quiz-container {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        background-color: #f9f9f9;
    }
    .quiz-container:hover {
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .quiz-number {
        display: inline-block;
        background-color: #203BB0;
        color: white;
        padding: 5px 12px;
        border-radius: 15px;
        margin-right: 10px;
        font-size: 0.9em;
    }
    .tag-filter-container {
        background-color: #f0f4f8;
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
    }
    .tag-filter-btn {
        display: inline-block;
        padding: 8px 16px;
        margin: 5px;
        border: 2px solid #203BB0;
        background-color: white;
        color: #203BB0;
        border-radius: 20px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
    }
    .tag-filter-btn:hover {
        background-color: #e8f4f8;
        transform: translateY(-2px);
    }
    .tag-filter-btn.active {
        background-color: #203BB0;
        color: white;
    }
    #filter-stats {
        margin-top: 15px;
        font-size: 1.1em;
        color: #203BB0;
    }
</style>

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=%EC%8B%A4%EC%A0%84%20%EB%AC%B8%EC%A0%9C%20%EC%97%B0%EC%8A%B5&reversal=false&textBg=false)

정보처리기능사 실기 시험에 나올 수 있는 다양한 유형의 문제들을 연습해보세요! 💪

## 과목별 필터링

<div class="tag-filter-container">
    <div style="margin-bottom: 10px; font-weight: bold; color: #203BB0;">📚 과목 선택:</div>
    <button class="tag-filter-btn active" data-tag="" onclick="filterQuizByTag('')">전체</button>
    <button class="tag-filter-btn" data-tag="C언어" onclick="filterQuizByTag('C언어')">C언어</button>
    <button class="tag-filter-btn" data-tag="네트워크 기초 활용" onclick="filterQuizByTag('네트워크 기초 활용')">네트워크 기초 활용</button>
    <button class="tag-filter-btn" data-tag="데이터베이스 기초 활용" onclick="filterQuizByTag('데이터베이스 기초 활용')">데이터베이스 기초 활용</button>
    <button class="tag-filter-btn" data-tag="운영체제 기초 활용" onclick="filterQuizByTag('운영체제 기초 활용')">운영체제 기초 활용</button>
    <div id="filter-stats"></div>
</div>

## 문제 풀이

<div class="quiz-number">문제 1</div><strong>C언어: 실행 결과를 쓰시오.</strong>

{% capture code_block %}
<div class="quiz-code" style="margin-bottom: 15px;">
    <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto;"><code>#include &lt;stdio.h&gt;

int main() {
    int x = 5;
    int y = 10;
    int z = 20;
    int sum = 0;
    x += y;
    y -= x;
    z %= y;
    sum = x + y + z;
    printf("%d", sum);
}</code></pre>
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-1"
   question=""
   code_html=code_block
   answer="10"
   tags="C언어"
%}

---

<div class="quiz-number">문제 2</div><strong>네트워크 토폴로지</strong>

{% capture choices_block %}
<div class="quiz-choices" style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-left: 3px solid #203BB0;">
    <strong>보기</strong><br>
    ㉠ 버스(Bus)형<br>
    ㉡ 스타(Star)형<br>
    ㉢ 링(Ring)형<br>
    ㉣ 트리(Tree)형<br>
    ㉤ 메시(Mesh)형
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-2"
   question="시스템 내의 다른 모든 사이트들과 직접 연결된 구조로, 기본 비용은 높으나 통신비용이 적게 들고 신뢰성이 높으며, 많은 양의 데이터 통신에 유리하고, 통신 회선의 총 경로가 가장 길게 소요되는 토폴로지는?"
   choices_html=choices_block
   answer="㉤|메시|Mesh"
   tags="네트워크 기초 활용"
%}

---

<div class="quiz-number">문제 3</div><strong>데이터베이스 용어</strong>

{% capture choices_block3 %}
<div class="quiz-choices" style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-left: 3px solid #203BB0;">
    <strong>보기</strong><br>
    ㉠ 도메인<br>
    ㉡ 차수<br>
    ㉢ 카디널리티<br>
    ㉣ 튜플<br>
    ㉤ 속성<br>
    ㉥ 릴레이션<br>
    ㉦ 관계<br>
    ㉧ 스키마
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-3-1"
   question="관계형 데이터 모델에서 (①)은(는) 데이터베이스를 구성하는 가장 작은 논리 단위로서 개체의 특성을 기술하며 파일 구조 상의 데이터 항목 또는 데이터 필드에 해당한다. ①에 해당하는 용어는?"
   choices_html=choices_block3
   answer="㉤|속성"
   tags="데이터베이스 기초 활용"
%}

{% include quiz-text.html
   id="quiz-3-2"
   question="그리고 (②)은(는) 각 데이터 개체집합 구성 요소 사이의 대응성을 나타낸다. ②에 해당하는 용어는?"
   choices_html=choices_block3
   answer="㉦|관계"
   tags="데이터베이스 기초 활용"
%}

---

<div class="quiz-number">문제 4</div><strong>UNIX 명령어</strong>

{% include quiz-text.html
   id="quiz-4"
   question="현재 디렉토리 내의 파일 목록을 확인하는 명령어는?"
   answer="ls"
   tags="운영체제 기초 활용"
%}

---

<div class="quiz-number">문제 5</div><strong>IPv4의 주소체계 비트 수</strong>

{% include quiz-text.html
   id="quiz-5"
   question="IPv4의 주소체계는 몇 비트로 구성되어 있는가?"
   answer="32"
   placeholder="숫자만 입력하세요"
   tags="네트워크 기초 활용"
%}

---

<div class="quiz-number">문제 6</div><strong>데이터베이스 모델</strong>

{% include quiz-text.html
   id="quiz-6"
   question="계층형 트리 구조를 확장한 형태로 네트워크로 데이터베이스 구조를 표현하며, 하나의 자노드(child node)가 다수 개의 부노드(parent node)를 가질 수 있는 데이터베이스 모델은?"
   answer="NDBMS|Network DBMS|네트워크형 DBMS|망형 DBMS"
   tags="데이터베이스 기초 활용"
%}

---

<div class="quiz-number">문제 7</div><strong>운영체제 시스템 유형</strong>

{% capture choices_block7 %}
<div class="quiz-choices" style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-left: 3px solid #203BB0;">
    <strong>보기</strong><br>
    ㉠ 일괄처리 시스템<br>
    ㉡ 다중 처리 시스템<br>
    ㉢ 실시간 처리 시스템<br>
    ㉣ 시분할 시스템<br>
    ㉤ 분산 처리 시스템
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-7"
   question="프로세서 스케줄링과 다중 프로그래밍을 사용해 각 사용자에게 컴퓨터를 시간적으로 분할하여 나누어주는 개념의 시스템은?"
   choices_html=choices_block7
   answer="㉣|시분할|시분할 시스템"
   tags="운영체제 기초 활용"
%}

---

<div class="quiz-number">문제 8</div><strong>네트워크 프로토콜</strong>

{% capture choices_block8 %}
<div class="quiz-choices" style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-left: 3px solid #203BB0;">
    <strong>프로토콜 설명</strong><br><br>
    <strong>1.</strong> 네트워크의 정보 전송을 제어하는 프로토콜로, 인터넷을 이루는 핵심 프로토콜이며 인터넷 IETF의 RFC 793에 기술되어 있다. 논리적인 1:1 가상 회선을 지원하여 해당 경로로만 데이터가 전달되도록 한다. 대표적인 서비스로는 FTP 등이 있다.<br><br>
    <strong>2.</strong> 네트워크에서 세션을 설정하지 않고 정보를 전송하는 비연결형 서비스를 제공하는 프로토콜로, 고속전송이 필요한 환경에 유용하다. 다만 흐름 제어, 에러 처리를 하지 않아 신뢰성 있는 데이터 전송에는 부적합하다. 대표적인 서비스로는 TFTP 등이 있다.
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-8"
   question="위 설명에 해당하는 프로토콜을 순서대로 작성하시오."
   choices_html=choices_block8
   answer="1. TCP, 2. UDP|TCP, UDP"
   placeholder="예: 1. TCP, 2. UDP"
   tags="네트워크 기초 활용"
%}

---

<div class="quiz-number">문제 9</div><strong>C언어: 출력 결과를 쓰시오.</strong>

{% capture code_block9 %}
<div class="quiz-code" style="margin-bottom: 15px;">
    <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto;"><code>#include &lt;stdio.h&gt;

int main() {
    int i=0, j=0;
    int n=0;
    for (i=0; j&lt;5; j++) {
        if (i==j || (i+j)==4) {
            n++;
        }
    }
    printf("%d", n);
}</code></pre>
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-9"
   question=""
   code_html=code_block9
   answer="9"
   tags="C언어"
%}

---

<div class="quiz-number">문제 10</div><strong>Windows 명령어</strong>

{% capture choices_block10 %}
<div class="quiz-choices" style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-left: 3px solid #203BB0;">
    <strong>단축키</strong><br>
    [Windows Key] + ( )<br><br>
    <strong>보기</strong><br>
    A   B   D   E   R   T   U   V
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-10"
   question="실행 창을 여는 단축키는?"
   choices_html=choices_block10
   answer="R|r"
   placeholder="알파벳 한 글자 입력"
   tags="운영체제 기초 활용"
%}

---

<div class="quiz-number">문제 11</div><strong>데이터베이스 용어</strong>

{% include quiz-text.html
   id="quiz-11"
   question="하나의 애트리뷰트가 취할 수 있는 같은 타입의 원자(Atomic) 값들의 집합으로, 실제 애트리뷰트 값이 나타낼 때 그 값의 합법 여부를 시스템이 검사하는데에도 이용하는 것은 무엇인지 쓰시오."
   answer="도메인|Domain"
   tags="데이터베이스 기초 활용"
%}

---

<div class="quiz-number">문제 12</div><strong>OSI 7계층</strong>

{% capture choices_block12 %}
<div class="quiz-choices" style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-left: 3px solid #203BB0;">
    <strong>설명하는 특징</strong><br><br>
    • 두 개의 인접한 개방 시스템들 간에 신뢰성 있고 효율적인 정보 전송을 할 수 있도록 시스템 간 연결 설정과 유지 및 종료를 담당한다.<br>
    • 송신 측과 수신 측의 속도 차이 해결을 위한 제어 기능을 한다.<br>
    • 프레임의 시작과 끝을 구분하기 위한 프레임의 동기화 기능을 한다.<br>
    • 오류의 검출과 회복을 위한 오류 제어 기능을 한다.<br>
    • 프레임의 순서적 전송을 위한 순서 제어 기능을 한다.
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-12"
   question="위 설명에 해당하는 OSI 7계층을 쓰시오."
   choices_html=choices_block12
   answer="데이터 링크 계층|Data Link Layer|데이터링크계층"
   tags="네트워크 기초 활용"
%}

---

<div class="quiz-number">문제 13</div><strong>사용자 인터페이스</strong>

{% include quiz-text.html
   id="quiz-13"
   question="키보드로 명령어를 직접 입력하지 않고, 마우스로 아이콘이나 메뉴를 선택하여 모든 작업을 수행하는 방식의 인터페이스를 무엇이라고 하는지 영문 약어로 쓰시오."
   answer="GUI"
   placeholder="영문 약어 입력"
   tags="운영체제 기초 활용"
%}

---

<div class="quiz-number">문제 14</div><strong>Java: 출력 결과를 쓰시오.</strong>

{% capture code_block14 %}
<div class="quiz-code" style="margin-bottom: 15px;">
    <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto;"><code>public class Test {
    public static void main(String[] args) {
        Otest ot = new Otest();
        ot.cat();
        ot.cat("4");
    }
}

class Otest {
    void cat() {
        System.out.print("1234");
    }

    void cat(int c) {
        System.out.print(++c);
    }

    void cat(String c) {
        System.out.print("문자");
    }
}</code></pre>
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-14"
   question=""
   code_html=code_block14
   answer="1234문자"
   tags="C언어"
%}

---

<div class="quiz-number">문제 15</div><strong>네트워크 관리 프로토콜</strong>

{% capture choices_block15 %}
<div class="quiz-choices" style="margin-bottom: 15px; padding: 10px; background-color: #fff; border-left: 3px solid #203BB0;">
    <strong>보기</strong><br>
    ㉠ TCP<br>
    ㉡ HTTP<br>
    ㉢ SGMP<br>
    ㉣ SNMP<br>
    ㉤ UDP
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-15"
   question="TCP/IP의 네트워크 관리 프로토콜로, 라우터나 허브 등 네트워크 기기의 네트워크 정보를 네트워크 관리 시스템에 보내는데 사용되는 표준 통신 규약을 보기에서 찾아 기호로 쓰시오."
   choices_html=choices_block15
   answer="㉣|SNMP"
   tags="네트워크 기초 활용"
%}

---

<div class="quiz-number">문제 16</div><strong>C언어: 출력 결과를 쓰시오.</strong>

{% capture code_block16 %}
<div class="quiz-code" style="margin-bottom: 15px;">
    <pre style="background-color: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto;"><code>#include &lt;stdio.h&gt;
#define N 100

main() {
    int i = 1;
    int cnt = 0;
    while (i &lt;= N) {
        if ((i % 3) == 0 &amp;&amp; (i % 7) == 0) {
            cnt++;
            printf("%d*%d*", cnt, i);
        }
        i++;
    }
}</code></pre>
</div>
{% endcapture %}

{% include quiz-text.html
   id="quiz-16"
   question=""
   code_html=code_block16
   answer="1*21*2*42*3*63*4*84*"
   tags="C언어"
%}

---

<div class="quiz-number">문제 17</div><strong>Windows 단축키</strong>

{% include quiz-text.html
   id="quiz-17"
   question="Windows 10/11에서 윈도우 화면을 잠그도록 하는 단축키를 쓰시오."
   answer="Window Key + L|Win + L|Windows + L|window + l|win + l|windows + l"
   placeholder="예: Win + L"
   tags="운영체제 기초 활용"
%}

---

## 학습 팁 💡

<div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <strong>📚 효과적인 문제 풀이 방법</strong>
    <ul>
        <li><strong>코드 문제</strong>: 한 줄씩 실행 흐름을 따라가며 변수 값의 변화를 추적하세요</li>
        <li><strong>용어 문제</strong>: 키워드를 중심으로 개념의 핵심 특징을 파악하세요</li>
        <li><strong>선택형 문제</strong>: 각 보기의 특징을 비교하며 소거법을 활용하세요</li>
        <li><strong>명령어 문제</strong>: 자주 사용되는 명령어는 반복 학습으로 암기하세요</li>
    </ul>
</div>

> 💪 **연습이 실력을 만듭니다!** 틀린 문제는 다시 한 번 복습하고, 관련 개념을 정리해보세요.
