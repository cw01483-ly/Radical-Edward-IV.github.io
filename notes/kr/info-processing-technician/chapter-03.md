---
layout: article
title: 3. 네트워크 기초 활용 
permalink: /notes/kr/info-processing-technician/chapter-03
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: 정보처리기능사 실기 강의 노트, 네트워크 기초 활용 개념과 활용 방법을 다룹니다.
keywords: "정보처리기능사, 실기, 네트워크 기초 활용, 데이터 처리, 프로그래밍"
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

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EB%8A%A5%EC%82%AC&reversal=false&textBg=false)

## 1. 네트워크 / 인터넷 :star::star::star:

### 네트워크(Network)의 개념
네트워크는 <span class="blue-text">두 대 이상의 컴퓨터를 전화선이나 케이블 등으로 연결하여 자원을 공유</span>하는 것을 말한다.

#### 네트워크의 분류 `근광`{:.success}
* <span class="blue-text">근거리 통신망(LAN; Local Area Network)</span>: 제한된 지역 내에서 고속 데이터 전송
* <span class="blue-text">광대역 통신망(WAN; Wide Area Network)</span>: 넓은 지역에 걸친 네트워크 연결

### 인터넷(Internet)의 개요
인터넷이란 <span class="blue-text">TCP/IP 프로토콜을 기반으로 하여 전 세계 수많은 컴퓨터와 네트워크들이 연결된 광범위한 통신망</span>이다.

#### 인터넷의 특징 `미유모네백`{:.success}
* <span class="blue-text">미국 국방성의 ARPANET</span>에서 시작
* <span class="blue-text">유닉스 운영체제</span> 기반
* <span class="blue-text">모든 컴퓨터는 고유한 IP 주소</span>를 가짐
* <span class="blue-text">네트워크 장비</span>: 브리지, 라우터, 게이트웨이
* <span class="blue-text">백본(Backbone)</span>: 인터넷의 주가 되는 기간망

## 2. IP 주소 체계 :star::star::star:

### IP 주소(Internet Protocol Address)
IP 주소는 <span class="blue-text">인터넷에 연결된 모든 컴퓨터 자원을 구분하기 위한 고유 주소</span>이다.

#### IPv4 주소 구조
* <span class="blue-text">32비트</span>로 구성 (8비트씩 4부분)
* <span class="blue-text">숫자로 표현</span> (예: 192.168.1.1)
* <span class="blue-text">네트워크 부분과 호스트 부분</span>으로 구분

#### IP 주소 클래스 `ABCDE`{:.success}

| 클래스 | 사용 용도 | 시작 주소 | 서브넷 마스크 | 설명 |
|--------|-----------|-----------|---------------|------|
| <span class="blue-text">A Class</span> | 국가나 대형 통신망 | 0 ~ 127 | 255.0.0.0 | 대규모 네트워크 |
| <span class="blue-text">B Class</span> | 중대형 통신망 | 128 ~ 191 | 255.255.0.0 | 중규모 네트워크 |
| <span class="blue-text">C Class</span> | 소규모 통신망 | 192 ~ 223 | 255.255.255.0 | 소규모 네트워크 |
| <span class="blue-text">D Class</span> | 멀티캐스트 | 224 ~ 239 | - | 멀티캐스트 용도 |
| <span class="blue-text">E Class</span> | 실험적 주소 | 240 ~ 255 | - | 실험용, 공용되지 않음 |

### IPv6 (Internet Protocol version 6)
IPv6은 <span class="blue-text">IPv4의 주소 부족 문제를 해결하기 위해 개발</span>된 차세대 IP 주소 체계이다.

#### IPv6의 특징 `빠호인주융실`{:.success}
* <span class="blue-text">빠른 자료 전송</span>: IPv4에 비해 전송 속도 향상
* <span class="blue-text">호환성</span>: IPv4와의 호환성 뛰어남
* <span class="blue-text">인증성, 기밀성, 데이터 무결성</span> 지원
* <span class="blue-text">주소의 확장성, 융통성, 연동성</span> 뛰어남
* <span class="blue-text">실시간 흐름 제어</span>로 향상된 멀티미디어 기능
* <span class="blue-text">Traffic Class, Flow Label</span>을 이용한 등급별 서비스

#### IPv6 주소 구조
* <span class="blue-text">128비트</span>로 구성 (16비트씩 8부분)
* <span class="blue-text">16진수로 표현</span>하고 콜론으로 구분
* 예: 2001:0db8:85a3:0000:0000:8a2e:0370:7334

#### IPv6 주소 체계 `유멀애`{:.success}

| 주소 유형 | 설명 | 특징 |
|-----------|------|------|
| <span class="blue-text">유니캐스트(Unicast)</span> | 단일 송신자와 단일 수신자 간의 통신 | 1:1 통신 |
| <span class="blue-text">멀티캐스트(Multicast)</span> | 단일 송신자와 다중 수신자 간의 통신 | 1:N 통신 |
| <span class="blue-text">애니캐스트(Anycast)</span> | 단일 송신자와 가장 가까이 있는 단일 수신자 간의 통신 | 최단 경로 통신 |

### 도메인 네임(Domain Name)
도메인 네임은 <span class="blue-text">숫자로 된 IP 주소를 사람이 이해하기 쉬운 문자 형태로 표현</span>한 것이다.

#### 도메인 네임 구조
```
www.my-company.co.kr
│   │         │  │
│   │         │  └─ 국가 도메인 (.kr)
│   │         └──── 기관 종류 (.co)
│   └─────────────── 기관 이름 (my-company)
└─────────────────── 호스트 이름 (www)
```

| 구성 요소 | 설명 | 예시 |
|-----------|------|------|
| <span class="blue-text">호스트 컴퓨터 이름</span> | 서버의 역할을 나타냄 | www, ftp, mail |
| <span class="blue-text">소속 기관 이름</span> | 조직이나 회사명 | my-company, google |
| <span class="blue-text">소속 기관 종류</span> | 조직의 성격 | .com, .org, .edu, .co |
| <span class="blue-text">소속 국가</span> | 국가 코드 | .kr, .us, .jp |

> 💡 **팁**: <span class="blue-text">우측으로 갈수록 상위 도메인</span>을 의미하며, DNS(Domain Name System)를 통해 IP 주소로 변환됩니다! 🌐

## 3. OSI 참조 모델 :star::star::star:

### OSI(Open System Interconnection) 참조 모델의 개요
OSI 참조 모델은 <span class="blue-text">다른 시스템 간의 원활한 통신을 위해 ISO(국제표준화기구)에서 제안한 통신 규약(Protocol)</span>이다.

#### OSI 모델의 특징 `개개`{:.success}
* <span class="blue-text">개방형 시스템</span> 간의 데이터 통신 시 필요한 장비 및 처리 방법을 7단계로 표준화
* <span class="blue-text">계층별 분리</span>: 1~3계층(하위), 4~7계층(상위)

<figure>
<img src="/notes/assets/info-processing-technician/chapter-03-01.png" width="80%" alt="OSI 참조 모델 7계층">
<figcaption>OSI 참조 모델 7계층 구조</figcaption>
</figure>

### OSI 참조 모델 계층별 특징 `물데네전세표응`{:.success}

| 계층 | 계층명 | 주요 기능 | 표준 예시 | PDU |
|------|--------|-----------|-----------|-----|
| <span class="blue-text">7</span> | <span class="blue-text">응용 계층</span> | 사용자가 OS 환경에 접근할 수 있도록 서비스 제공 | HTTP, SMTP, POP3, FTP, TELNET | 데이터 |
| <span class="blue-text">6</span> | <span class="blue-text">표현 계층</span> | 데이터를 통신에 적당한 형태로 변환 | ASCII, EBCDIC, JPEG, MPEG | 데이터 |
| <span class="blue-text">5</span> | <span class="blue-text">세션 계층</span> | 통신 세션의 설정, 유지, 해제 | NetBIOS, RPC, SQL | 데이터 |
| <span class="blue-text">4</span> | <span class="blue-text">전송 계층</span> | 종단 시스템 간 투명한 데이터 전송 | TCP, UDP | 세그먼트 |
| <span class="blue-text">3</span> | <span class="blue-text">네트워크 계층</span> | 네트워크 연결 관리 및 데이터 교환 | IP, ARP, ICMP, IPX | 패킷 |
| <span class="blue-text">2</span> | <span class="blue-text">데이터 링크 계층</span> | 인접한 시스템 간 신뢰성 있는 정보 전송 | HDLC, LLC, LAPB | 프레임 |
| <span class="blue-text">1</span> | <span class="blue-text">물리 계층</span> | 전송에 필요한 기계적, 전기적 특성 규칙 | RS-232C, X.21 | 비트 |

#### 계층별 상세 설명

##### 물리 계층 (Physical Layer)
* <span class="blue-text">전송에 필요한 두 장치 간의 실제 접속과 절단</span> 등 기계적, 전기적, 기능적, 절차적 특성에 대한 규칙
* <span class="yellow-code">표준</span>: RS-232C, X.21 등
* <span class="yellow-code">PDU</span>: 비트(Bit)

##### 데이터 링크 계층 (Data Link Layer)
* <span class="blue-text">두 개의 인접한 개발 시스템들 간에 신뢰성 있고 효율적인 정보 전송</span>
* <span class="yellow-code">표준</span>: HDLC, ADCCP, LLC, LAPB, LAPD 등
* <span class="yellow-code">PDU</span>: 프레임(Frame)

##### 네트워크 계층 (Network Layer)
* <span class="blue-text">개방 시스템들 간의 네트워크 연결을 관리하는 기능과 데이터의 교환 및 중계 기능</span> 수행
* <span class="yellow-code">표준</span>: X.25, ARP, IPX, IP, ICMP 등
* <span class="yellow-code">PDU</span>: 패킷(Packet)

##### 전송 계층 (Transport Layer)
* <span class="blue-text">논리적 안정과 균일한 데이터 전송 서비스 제공</span>으로써 종단 시스템(End-to-End) 간에 투명한 데이터 전송 기능
* <span class="yellow-code">표준</span>: TCP, UDP 등
* <span class="yellow-code">PDU</span>: 세그먼트(Segment)

##### 세션 계층 (Session Layer)
* <span class="blue-text">통신 세션의 설정, 유지, 해제</span>를 담당
* <span class="yellow-code">표준</span>: NetBIOS, RPC, SQL 등
* <span class="yellow-code">PDU</span>: 데이터(Data)

##### 표현 계층 (Presentation Layer)
* <span class="blue-text">응용 계층으로부터 받은 데이터를 세션 계층에 보내기 전에 통신에 적당한 형태로 변환</span>
* <span class="blue-text">서로 다른 데이터 표현 형태를 갖는 시스템 간의 상호 접속</span>을 위해 필요
* <span class="yellow-code">표준</span>: ASCII, EBCDIC, JPEG, MPEG 등
* <span class="yellow-code">PDU</span>: 데이터(Data)

##### 응용 계층 (Application Layer)
* <span class="blue-text">사용자가 OS 환경에 접근할 수 있도록 서비스 제공</span>
* <span class="yellow-code">서비스</span>: HTTP, 전자 사서함(SMTP, POP3), 파일 전송(FTP), 원격 접속(TELNET) 등
* <span class="yellow-code">PDU</span>: 데이터(Data)

> 💡 **팁**: <span class="blue-text">PDU(Protocol Data Unit)</span>는 각 계층에서 처리하는 데이터의 단위를 의미합니다! 각 계층마다 다른 형태의 데이터를 다룹니다! 🔄

