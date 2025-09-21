---
layout: article
title: 1. 데이터베이스 기초 활용 
permalink: /notes/kr/info-processing-technician/chapter-02
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: 정보처리기능사 실기 강의 노트, 데이터베이스 기초 활용 개념과 활용 방법을 다룹니다.
keywords: "정보처리기능사, 실기, 데이터베이스 기초 활용, 데이터 처리, 프로그래밍"
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

## 1. 데이터베이스의 개념 :star::star::star:
### 데이터베이스(Database) `통저운공`{:.success}
* 통합된 데이터(Integrated Data): 중복이 최소화된 데이터의 집합
* 저장된 데이터(Stored Data): 컴퓨터가 접근할 수 있는 매체에 저장된 데이터
* 운영 데이터(Operational Data): 현재 운영 중인 데이터
* 공용 데이터(Common Data): 여러 사용자 또는 응용 시스템들이 공유하는 데이터

### 데이터베이스 설계 `요개논물구`{:.success}
1. 요구 조건 분석: 어떤 데이터가 필요한지, 무엇을 해야 하는지 정리
2. 개념적 설계: 필요한 정보를 그림(도식)으로 쉽게 표현
3. 논리적 설계: 사용할 데이터베이스에 맞게 구조를 구체적으로 설계
4. 물리적 설계: 실제 저장 방식과 성능을 고려해 데이터 저장 방법 결정
5. 구현: 데이터베이스를 실제로 만들고 사용할 수 있게 준비

### 스키마(Schema)
* 외부 스키마(External Schema): 사용자 관점, 각 사용자가 보는 스키마
* 개념 스키마(Conceptual Schema): 통합 관점, 조직 전체의 데이터베이스
* 내부 스키마(Internal Schema): 물리적 관점, 실질적인 데이터의 저장 구조

### 데이터베이스 사용자
* 데이터베이스 관리자(DBA; DataBase)
    - 스키마를 정의, 생성, 삭제
    - 저장 구조 및 접근 방법 정의
    - 보안 및 접근 권한 정책 관리
    - 장애 예비 조치와 회복에 대한 전략 수립
    - 무결성을 위한 제약조건
    - 데이터 사전 구성
    - 성능 향상을 위해 데이터베이스 재구성
* 응용 프로그래머: 데이터베이스

