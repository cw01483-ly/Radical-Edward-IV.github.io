---
layout: article
title: 10. 기본 SQL 작성하기
permalink: /notes/kr/info-processing-technician/chapter-10
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: 정보처리기능사 실기 강의 노트, SQL의 개념과 분류, DDL/DML/DCL 명령어 및 데이터 정의와 조작 방법을 다룹니다.
keywords: "정보처리기능사, 실기, SQL, DDL, DML, DCL, 데이터베이스, CREATE, SELECT, INSERT, UPDATE, DELETE"
---

<style>
    /* 색상 활용 규칙
      빨강: 주의, 경고, 위험 (삭제, 제약 등)
      파랑: 핵심 개념, 주요 기능 (SQL 명령어, 키워드 등)
      초록: 안전한 대안, 긍정적 결과 (성공, 완료 등)
      노랑: 코드 요소 (명령어, 속성명 등)
    */
    .red-text { color: #D53C41; font-weight: bold; }
    .blue-text { color: #203BB0; font-weight: bold; }
    .green-text { color: #448F52; font-weight: bold; }
    .yellow-code { color: #BD8739; font-weight: bold; }
</style>

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EA%B8%B0%EB%8A%A5%EC%82%AC&reversal=false&textBg=false)

SQL은 관계형 데이터베이스의 표준 질의 언어로, <span class="blue-text">데이터 정의(DDL)</span>, <span class="blue-text">데이터 조작(DML)</span>, <span class="blue-text">데이터 제어(DCL)</span> 기능을 모두 갖추고 있습니다.
각 명령어의 역할과 구문을 정확히 이해하여 데이터베이스를 효과적으로 관리할 수 있어야 합니다!

## 1. SQL의 개념 :star::star:

> 💡 **전문가의 조언**: SQL은 데이터 정의, 조작, 제어 기능을 모두 갖춘 관계형 데이터베이스의 표준 언어입니다. 각 분류(DDL, DML, DCL)의 명령어와 기능을 명확히 구분하여 암기해야 합니다.

### SQL(Structured Query Language)의 개요

SQL은 관계형 데이터베이스를 관리하기 위한 표준 질의 언어입니다.

- **1974년 IBM 연구소**에서 개발한 **SEQUEL**에서 유래
- IBM 외 많은 회사에서 관계형 데이터베이스(RDB)를 지원하는 언어로 채택
- **관계대수**와 **관계해석**을 기초로 한 혼합 데이터 언어
- 질의의 효율성과 가능성뿐만 아니라 <span class="blue-text">데이터 구조의 정의, 데이터 조작, 데이터 제어 기능</span>을 모두 제공

### SQL의 분류

SQL은 사용 용도에 따라 다음과 같이 <span class="blue-text">DDL(데이터 정의어)</span>, <span class="blue-text">DML(데이터 조작어)</span>, <span class="blue-text">DCL(데이터 제어어)</span>로 구분됩니다.

#### DDL(Data Definition Language, 데이터 정의어)

DDL은 SCHEMA, DOMAIN, TABLE, VIEW, INDEX를 정의하거나 변경 또는 삭제할 때 사용하는 언어입니다.

- <span class="green-text">데이터베이스 관리자</span>나 <span class="green-text">데이터베이스 설계자</span>가 사용

| 명령어 | 기능 |
|--------|------|
| <span class="yellow-code">CREATE</span> | SCHEMA, DOMAIN, TABLE, VIEW, INDEX를 정의한다. |
| <span class="yellow-code">ALTER</span> | TABLE에 대한 정의를 변경하는 데 사용한다. |
| <span class="yellow-code">DROP</span> | SCHEMA, DOMAIN, TABLE, VIEW, INDEX를 삭제한다. |

#### DML(Data Manipulation Language, 데이터 조작어)

DML은 데이터베이스 사용자가 응용 프로그램이나 질의어를 통하여 저장된 데이터를 실질적으로 처리하는 데 사용하는 언어입니다.

- 데이터베이스 사용자와 데이터베이스 관리 시스템 간의 <span class="blue-text">인터페이스를 제공</span>

| 명령어 | 기능 |
|--------|------|
| <span class="yellow-code">SELECT</span> | 테이블에서 조건에 맞는 튜플을 검색한다. |
| <span class="yellow-code">INSERT</span> | 테이블에 새로운 튜플을 삽입한다. |
| <span class="yellow-code">DELETE</span> | 테이블에서 조건에 맞는 튜플을 삭제한다. |
| <span class="yellow-code">UPDATE</span> | 테이블에서 조건에 맞는 튜플의 내용을 변경한다. |

#### DCL(Data Control Language, 데이터 제어어)

DCL은 데이터의 보안, 무결성, 회복, 병행 수행 제어 등을 정의하는 데 사용되는 언어입니다.

- <span class="green-text">데이터베이스 관리자</span>가 데이터 관리를 목적으로 사용

| 명령어 | 기능 |
|--------|------|
| <span class="yellow-code">COMMIT</span> | 명령에 의해 수행된 결과를 실제 물리적 디스크로 저장하고, 데이터베이스 조작 작업이 정상적으로 완료되었음을 관리자에게 알려준다. |
| <span class="yellow-code">ROLLBACK</span> | 데이터베이스 조작 작업이 비정상적으로 종료되었을 때 원래의 상태로 복구한다. |
| <span class="yellow-code">GRANT</span> | 데이터베이스 사용자에게 사용 권한을 부여한다. |
| <span class="yellow-code">REVOKE</span> | 데이터베이스 사용자의 사용 권한을 취소한다. |

## 2. DDL :star::star::star:

> 💡 **전문가의 조언**: DDL 구문을 모두 외울 필요는 없습니다. 각 명령어의 역할을 숙지하고, 구문을 보면 무엇을 의미하는지 이해할 수 있을 정도로 학습하세요.

### DDL(Data Definition Language, 데이터 정의어)의 개념

- DDL은 <span class="blue-text">DB 구조, 데이터 형식, 접근 방식</span> 등 DB를 구축하거나 수정할 목적으로 사용하는 언어
- DDL 번역 결과는 <span class="blue-text">데이터 사전(Data Dictionary)</span>이라는 특별한 파일에 여러 개의 테이블로 저장됨
- DDL에는 CREATE SCHEMA, CREATE DOMAIN, CREATE TABLE, CREATE VIEW, CREATE INDEX, ALTER TABLE, DROP 등이 있음

### CREATE SCHEMA

CREATE SCHEMA는 스키마를 정의하는 명령문입니다.

#### 표기 형식

```sql
CREATE SCHEMA 스키마명 AUTHORIZATION 사용자_id;
```

- 스키마의 식별을 위해 스키마 이름과 소유권자나 허가권자를 정의

#### 예제

*소유권자의 사용자 ID가 '홍길동'인 스키마 '대학교'를 정의하는 SQL문*

```sql
CREATE SCHEMA 대학교 AUTHORIZATION 홍길동;
```

### CREATE DOMAIN

CREATE DOMAIN은 도메인을 정의하는 명령문입니다.

#### 표기 형식

```sql
CREATE DOMAIN 도메인명 [AS] 데이터_타입
    [DEFAULT 기본값]
    [CONSTRAINT 제약조건명 CHECK (범위값)];
```

- **데이터 타입**: SQL에서 지원하는 데이터 타입
- **기본값**: 데이터를 입력하지 않았을 때 자동으로 입력되는 값
- 임의의 속성에서 취할 수 있는 값의 범위가 SQL에서 지원하는 전체 데이터 값의 일부일 때 도메인으로 정의
- 정의된 도메인명은 일반적인 데이터 타입처럼 사용 가능

#### 예제

*'성별'을 '남' 또는 '여'와 같이 정해진 1개의 문자로 표현되는 도메인 SEX를 정의하는 SQL문*

```sql
CREATE DOMAIN SEX CHAR(1)
    DEFAULT '남'
    CONSTRAINT VALID-SEX CHECK(VALUE IN ('남','여'));
```

### SQL에서 지원하는 기본 데이터 타입

| 데이터 타입 | 설명 |
|------------|------|
| <span class="blue-text">정수(Integer)</span> | • INTEGER (4Byte 정수)<br/>• SMALLINT (2Byte 정수) |
| <span class="blue-text">실수(Float)</span> | • FLOAT<br/>• REAL<br/>• DOUBLE PRECISION |
| <span class="blue-text">형식화 숫자</span> | DEC(길이, 소수) - 전체 자리수, 소수부 자리수 지정 |
| <span class="blue-text">고정길이 문자</span> | • CHAR(n)<br/>• CHARACTER(n)<br/>※ n: 문자수 |
| <span class="blue-text">가변길이 문자</span> | • VARCHAR(n)<br/>• CHARACTER VARYING(n)<br/>※ n: 최대 문자수 |
| <span class="blue-text">고정길이 비트열</span> | BIT(n) |
| <span class="blue-text">가변길이 비트열</span> | VARBIT(n) |
| <span class="blue-text">날짜</span> | DATE |
| <span class="blue-text">시간</span> | TIME |

### CREATE TABLE

CREATE TABLE은 테이블을 정의하는 명령문입니다.

#### 표기 형식

```sql
CREATE TABLE 테이블명
(속성명 데이터_타입 [DEFAULT 기본값] [NOT NULL], …
 [, PRIMARY KEY(기본키_속성명, …)]
 [, UNIQUE(대체키_속성명, …)]
 [, FOREIGN KEY(외래키_속성명, …)
     REFERENCES 참조테이블명(기본키_속성명, …)]
 [, CONSTRAINT 제약조건명 [CHECK (조건식) …]]);
```

#### 구성 요소 설명

| 요소 | 설명 |
|------|------|
| **속성 정의** | 기본 테이블에 포함될 모든 속성에 대하여 속성명과 데이터 타입, 기본값, NOT NULL 여부를 지정 |
| <span class="yellow-code">PRIMARY KEY</span> | 기본키로 사용할 속성 또는 속성의 집합을 지정 |
| <span class="yellow-code">UNIQUE</span> | 대체키로 사용할 속성 또는 속성의 집합을 지정<br/>중복된 값을 가질 수 없음 |
| <span class="yellow-code">FOREIGN KEY ~ REFERENCES</span> | 참조할 다른 테이블과 그 테이블을 참조할 때 사용할 외래키 속성을 지정<br/>외래키 지정 시 참조 무결성의 CASCADE 법칙이 적용됨 |
| <span class="yellow-code">CONSTRAINT</span> | 제약 조건의 이름을 지정<br/>이름이 필요 없으면 CHECK절만 사용 |
| <span class="yellow-code">CHECK</span> | 속성 값에 대한 제약 조건을 정의 |

#### 예제

*'이름', '학번', '전공', '성별', '생년월일'로 구성된 '학생' 테이블을 정의하시오.*

```sql
CREATE TABLE 학생
(이름 VARCHAR(15) NOT NULL,
 학번 CHAR(8),
 전공 CHAR(5),
 성별 SEX,
 생년월일 DATE,
 PRIMARY KEY(학번),
 FOREIGN KEY(전공)
   REFERENCES 학과(학과코드),
 CHECK(성별 = '남'));
```

### CREATE VIEW

CREATE VIEW는 뷰(View)를 정의하는 명령문입니다.

#### 표기 형식

```sql
CREATE VIEW 뷰명[(속성명, 속성명, …)]
AS SELECT문;
```

#### 특징

- SELECT문을 서브 쿼리로 사용하여 SELECT문의 결과로서 뷰를 생성
- 서브 쿼리인 SELECT문에는 <span class="red-text">UNION이나 ORDER BY절을 사용할 수 없음</span>
- 속성명을 기술하지 않으면 SELECT문의 속성명이 자동으로 사용됨

#### 예제

*(고객) 테이블에서 '주소'가 '안산시'인 고객들의 '성명'과 '전화번호'를 '안산고객'이라는 뷰로 정의하시오.*

```sql
CREATE VIEW 안산고객(성명, 전화번호)
AS SELECT 성명, 전화번호
FROM 고객
WHERE 주소 = '안산시';
```

### CREATE INDEX

CREATE INDEX는 인덱스를 정의하는 명령문입니다.

#### 표기 형식

```sql
CREATE [UNIQUE] INDEX 인덱스명
ON 테이블명(속성명 [ASC | DESC] [, 속성명 [ASC | DESC]])
[CLUSTER];
```

#### 옵션 설명

| 옵션 | 설명 |
|------|------|
| <span class="yellow-code">UNIQUE</span> | • 사용된 경우: 중복 값이 없는 고유한 특성을 갖는 인덱스 생성<br/>• 생략된 경우: 중복 값을 허용하는 인덱스 생성 |
| <span class="yellow-code">ASC / DESC</span> | • ASC: 오름차순 정렬<br/>• DESC: 내림차순 정렬<br/>• 생략 시: 오름차순으로 정렬 |
| <span class="yellow-code">CLUSTER</span> | 사용하면 인덱스가 클러스터드 인덱스로 설정됨 |

#### 예제

*(고객) 테이블에서 UNIQUE한 특성을 갖는 '고객번호' 속성에 대해 내림차순으로 정렬하여 '고객번호_idx'라는 이름으로 인덱스를 정의하시오.*

```sql
CREATE UNIQUE INDEX 고객번호_idx
ON 고객(고객번호 DESC);
```

### ALTER TABLE

ALTER TABLE은 테이블에 대한 정의를 변경하는 명령문입니다.

#### 표기 형식

```sql
ALTER TABLE 테이블명 ADD 속성명 데이터_타입;
ALTER TABLE 테이블명 ALTER 속성명 데이터_타입;
ALTER TABLE 테이블명 DROP COLUMN 속성명 [CASCADE];
```

#### 명령어 설명

| 명령어 | 기능 |
|--------|------|
| <span class="yellow-code">ADD</span> | 새로운 속성(열)을 추가할 때 사용 |
| <span class="yellow-code">ALTER</span> | 특정 속성의 데이터 타입이나 크기를 변경할 때 사용 |
| <span class="yellow-code">DROP COLUMN</span> | 특정 속성을 삭제할 때 사용 |

### DROP

DROP은 스키마, 도메인, 기본 테이블, 뷰 테이블, 인덱스, 제약 조건 등을 제거하는 명령문입니다.

#### 표기 형식

```sql
DROP SCHEMA 스키마명 [CASCADE | RESTRICT];
DROP DOMAIN 도메인명 [CASCADE | RESTRICT];
DROP TABLE 테이블명 [CASCADE | RESTRICT];
DROP VIEW 뷰명 [CASCADE | RESTRICT];
DROP INDEX 인덱스명 [CASCADE | RESTRICT];
DROP CONSTRAINT 제약조건명;
```

#### 옵션 설명

| 옵션 | 설명 |
|------|------|
| <span class="yellow-code">CASCADE</span> | 제거할 요소를 참조하는 다른 모든 개체를 함께 제거<br/>주 테이블의 데이터 제거 시 각 외래키와 관계를 맺고 있는 모든 데이터를 제거하는 참조 무결성 제약 조건 설정 |
| <span class="yellow-code">RESTRICT</span> | 다른 개체가 제거할 요소를 참조 중일 때는 제거를 취소 |

#### 예제

*(학생) 테이블을 제거하고, (학생) 테이블을 참조하는 모든 데이터를 함께 제거하시오.*

```sql
DROP TABLE 학생 CASCADE;
```

## 3. DCL :star::star:

> 💡 **전문가의 조언**: DCL은 트랜잭션 제어와 권한 관리를 담당합니다. 특히 COMMIT과 ROLLBACK의 차이, 그리고 SAVEPOINT의 활용을 명확히 이해해야 합니다.

### COMMIT

트랜잭션이 성공적으로 끝나면 데이터베이스가 새로운 일관성(Consistency) 상태를 가지기 위해 변경된 모든 내용을 데이터베이스에 반영해야 하는데, 이때 사용하는 명령이 <span class="blue-text">COMMIT</span>입니다.

#### 특징

- <span class="green-text">COMMIT 명령을 실행하지 않아도</span> DML문이 성공적으로 완료되면 자동으로 COMMIT됨
- DML이 실패하면 자동으로 ROLLBACK되도록 <span class="blue-text">Auto Commit 기능</span>을 설정할 수 있음

### ROLLBACK

ROLLBACK은 아직 COMMIT되지 않은 변경된 모든 내용들을 취소하고 데이터베이스를 이전 상태로 되돌리는 명령입니다.

#### 목적

- 트랜잭션 전체가 성공적으로 끝나지 못하면 일부 변경된 내용만 데이터베이스에 반영되는 <span class="red-text">비일관성(Inconsistency) 상태</span>를 가질 수 있음
- 일부만 완료된 트랜잭션은 롤백(Rollback)되어야 함

### SAVEPOINT

SAVEPOINT는 트랜잭션 내에 ROLLBACK 할 위치인 저장점을 지정하는 명령입니다.

#### 특징

- 저장점을 지정할 때는 이름을 부여
- ROLLBACK 시 지정된 저장점까지의 트랜잭션 처리 내용이 취소됨

## 4. DML :star::star::star:

> 💡 **전문가의 조언**: DML은 실제 데이터를 다루는 가장 중요한 명령어입니다. INSERT, SELECT, UPDATE, DELETE의 구문과 사용법을 정확히 숙지해야 합니다.

### DML(Data Manipulation Language, 데이터 조작어)의 개념

DML(데이터 조작어)은 데이터베이스 사용자가 응용 프로그램이나 질의어를 통해 저장된 데이터를 실질적으로 관리하는 데 사용되는 언어입니다.

- 데이터베이스 사용자와 데이터베이스 관리 시스템 간의 <span class="blue-text">인터페이스를 제공</span>

| 명령문 | 기능 |
|--------|------|
| <span class="yellow-code">SELECT</span> | 테이블에서 튜플을 검색한다. |
| <span class="yellow-code">INSERT</span> | 테이블에 새로운 튜플을 삽입한다. |
| <span class="yellow-code">DELETE</span> | 테이블에서 튜플을 삭제한다. |
| <span class="yellow-code">UPDATE</span> | 테이블에서 튜플의 내용을 갱신한다. |

### 삽입문(INSERT INTO~)

삽입문은 기본 테이블에 새로운 튜플을 삽입할 때 사용합니다.

#### 표기 형식

```sql
INSERT INTO 테이블명(속성명1, 속성명2, …)
VALUES (데이터1, 데이터2, …);
```

#### 특징

- 대응하는 속성과 데이터는 <span class="blue-text">개수와 데이터 유형이 일치</span>해야 함
- 기본 테이블의 모든 속성을 사용할 때는 속성명을 생략할 수 있음
- SELECT문을 사용하여 다른 테이블의 검색 결과를 삽입할 수 있음

#### 예제 테이블: (사원)

| 이름 | 부서 | 생일 | 주소 | 기본급 |
|------|------|------|------|--------|
| 홍길동 | 기획 | 04/05/61 | 망원동 | 120 |
| 황진이 | 인터넷 | 01/09/69 | 성산동 | 80 |
| 김선달 | 편집 | 07/21/75 | 연희동 | 90 |
| 성춘향 | 편집 | 10/22/73 | 망원동 | 100 |
| 장길산 | 편집 | 03/11/67 | 상암동 | 120 |
| 일지매 | 기획 | 04/12/79 | 합정동 | 110 |
| 강호동 | 인터넷 | 12/11/80 | 망원동 | 90 |

#### 예제 1

*(사원) 테이블에 (이름 = 홍승현, 부서 = 인터넷)을 삽입하시오.*

```sql
INSERT INTO 사원(이름, 부서) VALUES ('홍승현', '인터넷');
```

#### 예제 2

*(사원) 테이블에 (장보고, 기획, 05/03/73, 홍제동, 90)을 삽입하시오.*

```sql
INSERT INTO 사원 VALUES ('장보고', '기획', '05/03/73', '홍제동', 90);
```

#### 예제 3

*(사원) 테이블에 있는 편집부의 모든 튜플을 편집부원(이름, 생일, 주소, 기본급) 테이블에 삽입하시오.*

```sql
INSERT INTO 편집부원(이름, 생일, 주소, 기본급)
SELECT 이름, 생일, 주소, 기본급
FROM 사원
WHERE 부서 = '편집';
```

### 삭제문(DELETE FROM~)

삭제문은 기본 테이블에 있는 튜플들 중에서 특정 튜플(행)을 삭제할 때 사용합니다.

#### 표기 형식

```sql
DELETE
FROM 테이블명
[WHERE 조건];
```

#### 특징

- 모든 레코드를 삭제할 때는 WHERE절을 생략
- 모든 레코드를 삭제하더라도 <span class="green-text">테이블 구조는 남아 있음</span>
- 디스크에서 테이블을 완전히 제거하는 <span class="red-text">DROP과는 다름</span>

#### 예제 1

*(사원) 테이블에서 "임꺽정"에 대한 튜플을 삭제하시오.*

```sql
DELETE
FROM 사원
WHERE 이름 = '임꺽정';
```

#### 예제 2

*(사원) 테이블에서 "인터넷" 부서에 대한 모든 튜플을 삭제하시오.*

```sql
DELETE
FROM 사원
WHERE 부서 = '인터넷';
```

#### 예제 3

*(사원) 테이블의 모든 레코드를 삭제하시오.*

```sql
DELETE
FROM 사원;
```

### 갱신문(UPDATE~ SET~)

갱신문은 기본 테이블에 있는 튜플들 중에서 특정 튜플의 내용을 변경할 때 사용합니다.

#### 표기 형식

```sql
UPDATE 테이블명
SET 속성명 = 데이터, 속성명 = 데이터, ...
[WHERE 조건];
```

#### 예제 1

*(사원) 테이블에서 "홍길동"의 '주소'를 "수색동"으로 수정하시오.*

```sql
UPDATE 사원
SET 주소 = '수색동'
WHERE 이름 = '홍길동';
```

#### 예제 2

*(사원) 테이블에서 "황진이"의 '부서'를 '기획부'로 변경하고 '기본급'을 5만 원 인상시키시오.*

```sql
UPDATE 사원
SET 부서 = '기획', 기본급 = 기본급 + 5
WHERE 이름 = '황진이';
```

---

## 핵심 요약 정리

### SQL의 3가지 분류

| 분류 | 명령어 | 사용자 |
|------|--------|--------|
| <span class="blue-text">DDL</span><br/>(데이터 정의어) | CREATE, ALTER, DROP | DB 관리자, DB 설계자 |
| <span class="blue-text">DML</span><br/>(데이터 조작어) | SELECT, INSERT, DELETE, UPDATE | DB 사용자 |
| <span class="blue-text">DCL</span><br/>(데이터 제어어) | COMMIT, ROLLBACK, GRANT, REVOKE | DB 관리자 |

### DDL 주요 명령어

```
CREATE: 생성
    ↓
ALTER: 변경
    ↓
DROP: 삭제
```

### DML 주요 명령어

```
INSERT: 삽입
    ↓
SELECT: 검색
    ↓
UPDATE: 갱신
    ↓
DELETE: 삭제
```

### DROP vs DELETE 비교

| 구분 | DROP | DELETE |
|------|------|--------|
| **분류** | DDL | DML |
| **기능** | 테이블 구조 자체를 삭제 | 테이블의 데이터만 삭제 |
| **결과** | 테이블이 완전히 제거됨 | 테이블 구조는 유지됨 |
| **ROLLBACK** | 불가능 | 가능 (COMMIT 전) |

> 💡 **전문가의 조언**: SQL은 데이터베이스 관리의 핵심 도구입니다. DDL로 구조를 정의하고, DML로 데이터를 조작하며, DCL로 보안과 무결성을 제어하는 전체 흐름을 이해하는 것이 중요합니다!
