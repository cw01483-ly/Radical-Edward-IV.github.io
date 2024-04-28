---
title: 👨‍💻 인덱스 기본 원리
key: 20240323
tags: DBMS
---

<style>
    .blue-bold {
        color: #203BB0;
        font-weight: 900;
    }
    .red-bold {
        color: #D53C41;
        font-weight: 900;
    }
    .green-bold {
        color: #448F52;
        font-weight: 900;
    }
    .yello-bold {
        color: #BD8739;
        font-weight: 900;
    }
    .text-underline {
        text-decoration: underline;
    }
</style>

## 1. 인덱스 기본 원리

### 1.1 인덱스 구조

인덱스는 <span class="blue-bold">검색 속도를 향상</span>시키기 위해 사용하는 데이터 구조입니다.   
우리가 책에서 어떤 내용을 찾고 싶을 때 책 뒤에 실린 <span class="blue-bold">색인(단어 + 페이지)</span>을 이용하게 됩니다.   
참고로 책의 내용을 순서대로 표시한 목차와 색인은 다른 개념입니다.

<img src="/images/sqlp-certifications/sqlp-certification-01.gif" width="500px;" alt="책의 인덱스" />

인덱스는 단어 + 페이지로 구성된 색인처럼 <span class="red-bold">KEY + ROWID</span> 구성되어 있으며 <span class="red-bold">정렬</span>되어 있는 구조입니다.   
(<span class="blue-bold">테이블 데이터</span>는 <span class="blue-bold">Free Block</span>에 들어가므로 정렬 상태가 유지되지 않습니다.)

> 🔑 <span class="blue-bold text-underline">AAAR5K</span><span class="red-bold text-underline">AAF</span><span class="green-bold text-underline">AAAADN</span><span class="yello-bold">AAX</span>   
> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue-bold text-underline">Data-Obj</span><span class="red-bold text-underline">File</span><span class="green-bold text-underline">Block</span><span class="yello-bold">Row</span>   
> &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue-bold text-underline">D</span><span class="red-bold text-underline">B</span><span class="green-bold text-underline">A</span><span class="blue-bold text-underline">(</span><span class="red-bold text-underline">D</span><span class="green-bold text-underline">a</span><span class="blue-bold text-underline">t</span><span class="red-bold text-underline">a</span><span class="green-bold text-underline"> </span><span class="blue-bold text-underline">B</span><span class="red-bold text-underline">l</span><span class="green-bold text-underline">o</span><span class="blue-bold text-underline">c</span><span class="red-bold text-underline">k</span><span class="green-bold text-underline"> </span><span class="blue-bold text-underline">A</span><span class="red-bold text-underline">d</span><span class="green-bold text-underline">d</span><span class="blue-bold text-underline">r</span><span class="red-bold text-underline">e</span><span class="green-bold text-underline">s</span><span class="blue-bold text-underline">s</span><span class="red-bold text-underline">)</span> <span class="yello-bold">Location</span>


<img src="/images/sqlp-certifications/sqlp-certification-02.jpeg" width="750px;" alt="SQLP 자격 시험" />

<span class="red-bold">ROWID</span>는 <span class="red-bold">물리적인 주소</span>로 테이블 블록에 접근하는 좋은 수단이 됩니다.

<img src="/images/sqlp-certifications/sqlp-certification-03.jpeg" width="750px;" alt="SQLP 자격 시험" />

아래 표를 보시면 <span class="blue-bold">데이터 건수는 동일</span>하지만 평균 Row <span class="blue-bold">용량</span> 및 테이블 용량, <span class="blue-bold">블록 수</span>에서 <span class="blue-bold">많은 차이</span>를 보이고 있습니다.   
테이블과 비교했을 때 인덱스는 Key + RowID 만을 저장하기 때문에 하나의 블록(8K)에 더 많은 데이터를 담을 수 있습니다.

|               | 테이블 | 인덱스(Leaf Node) |
| ------------- | ------ | ----------------- |
| 데이터 건수   | 10억건 | 10억건            |
| 평균 Row 용량 | 1,024  | 25                |
| 테이블 용량   | 1TB    | 25GB              |
| 블록 수       | 1억    | 3백만             |

인덱스는 <span class="red-bold">B*Tree</span>(Root - Branch - Leaf) 구조로 설계되어 있어 비교적 적은 탐색(수직적 탐색 - 수평적 스캔 - 테이블 랜덤 엑세스)으로 조건을 만족하는 데이터를 검색할 수 있습니다.

<img src="/images/sqlp-certifications/sqlp-certification-04.jpeg" width="750px;" alt="SQLP 자격 시험" />

<img src="/images/sqlp-certifications/sqlp-certification-05.jpeg" width="750px;" alt="SQLP 자격 시험" />

<img src="/images/sqlp-certifications/sqlp-certification-06.jpeg" width="750px;" alt="SQLP 자격 시험" />

<img src="/images/sqlp-certifications/sqlp-certification-07.jpeg" width="750px;" alt="SQLP 자격 시험" />

대량의 데이터를 빠르게 조회할 수 있도록 하는 인덱스에는 <span class="red-bold">손익분기점</span>(10%)이 존재합니다.   
읽어야 하는 데이터의 양이 일정 수준을 넘어서는 순간 테이블 전체를 스캔하는 것보다 느려집니다.

(지금은 단순하게 계산하지만 실제로는 앞으로 배우게 될 <span class="red-bold">Clustering Factor</span>를 함께 고려해야 함)

| 데이터의 양     | Table Full Scan | 수직적 탐색 | 수평적 스캔 | 테이블 R.A  | 합계        |
| --------------- | --------------- | ----------- | ----------- | ----------- | ----------- |
| 1 ~ 10          | 100,000,000     | 3           | 1           | 10          | 14          |
| 1 ~ 100,000,000 | 100,000,000     | 3           | 300,000     | 100,000,000 | 100,300,003 |

⭐️⭐️⭐️ <span class="red-bold">인덱스 사용이 불가능</span> 하거나 <span class="red-bold">Index Range Scan이 불가능</span>한 경우

- 인덱스 선두 컬럼의 가공 (`WHERE SUBSTR(C1, 3) = '930426’`)
- NULL 검색 (`WHERE C1 IS NULL`, 인덱스 구성 컬럼 중 하나라도 NULL이 아니라면 사용 가능)
- 묵시적 형변환 (`WHERE C1 = 10`, C1 컬럼은 CHAR 타입, 단 LIKE는 숫자 → 문자)
- 부정 검색 (`WHERE C1 <> 10`)

### 1.2 다양한 인덱스 스캔 방식

<img src="/images/sqlp-certifications/sqlp-certification-08.jpeg" width="750px;" alt="SQLP 자격 시험" />

- <span class="red-bold">Index Range Scan</span>

B*Tree 인덱스의 가장 일반적인 형태의 탐색 흐름입니다.   
루트에서 리프까지 수직적 탐색을 하고 필요한 범위까지 수평적 스캔을 하는 방식입니다.   
<i>항상 빠른 속도를 보장하지 않으며, 수평적 스캔 범위와 Table Random Access를 횟수를 줄여 성능을 개선</i>할 수 있습니다.   
Index를 Range Scan 하려면, <span class="red-bold">인덱스를 구성하는 선두 컬럼을 가공하지 않은 상태로 조건절에 사용</span>해야 합니다.
Index Range Scan을 유도하는 힌트는 없으며 *index 힌트*를 사용합니다.

<img src="/images/sqlp-certifications/sqlp-certification-09.jpeg" width="750px;" alt="SQLP 자격 시험" />

- <span class="red-bold">Index Full Scan</span>

Index Full Scan은 수직적 탐색 없이 Leaf 블록을 처음부터 끝까지 탐색(<span class="red-bold">수평적 스캔</span>)합니다.   
<span class="red-bold">조건절에 인덱스 구성 컬럼은 있으나 선두 컬럼이 아닌 경우 옵티마이저의 판단에 따라</span> Full Scan하게 됩니다.   
옵티마이저는 인덱스 선두 컬럼이 조건절에 없다면 Table Full Scan을 고려합니다.   
테이블 용량이 커 부담이 클 경우 인덱스를 활용하는 방법을 고려하게 됩니다.   
<span class="blue-bold">최종 결과 값이 적을 경우 Index Full Scan이 효율적</span>입니다.   
<span class="blue-bold">최종 결과 값이 많을 경우 Table Full Scan이 효율적</span>입니다.   
Index Full Scan을 유도하는 힌트는 없으며 *index 힌트*를 사용합니다.

<img src="/images/sqlp-certifications/sqlp-certification-10.jpeg" width="750px;" alt="SQLP 자격 시험" />

- <span class="red-bold">Index Unique Scan</span>

Index Unique Scan은 <span class="red-bold">수직적 탐색</span>으로만 데이터를 찾습니다.   
<span class="red-bold">Unique 인덱스를 equal(’=’) 조건으로 검색</span>해야 합니다.   
유일한 값을 가진 인덱스를 검색할 때 사용되며, 범위 조건에는 적합하지 않습니다.   
범위 조건(BETWEEN, >, <, LIKE)으로 검색할 경우 Index Range Scan을 사용하게 됩니다.   
Index Unique Scan을 유도하는 힌트는 없으며 *index 힌트*를 사용합니다.

<img src="/images/sqlp-certifications/sqlp-certification-10.jpeg" width="750px;" alt="SQLP 자격 시험" />

- <span class="red-bold">Index Skip Scan</span>

Index Skip Scan은 조건절에 빠진 <span class="red-bold">인덱스 선두 컬럼의 Distinct가 낮고 후행 컬럼의 Distinct가 높을 때 유용</span>한 Scan 방식입니다.   
<span class="red-bold">인덱스 선행 컬럼의 조회 조건이 BETWEEN, LIKE, 부등호 일 때도 사용</span>할 수 있습니다.   
Index Skip Scan은 Leaf 노드를 스캔하다가 Skip이 필요한 경우 Root로 다시 올라가 탐색하지 않습니다. 일정 Branch 노드까지 거슬러 올라갔다가 스캔이 필요한 Leaf 노드까지 내려오는 방식으로 동작합니다. 그렇기 때문에 <span class="red-bold">CR(Consistent Mode Block Read)로 잡히지 않습니다.</span>   
*index_ss 힌트*를 사용하여 Index Skip Scan을 유도하며 *no_index_ss 힌트*를 사용하여 방지합니다.

<img src="/images/sqlp-certifications/sqlp-certification-11.jpeg" width="750px;" alt="SQLP 자격 시험" />

- <span class="red-bold">Index Fast Full Scan</span>

*Index Fast Full Scan은 Index Full Scan보다 빠른 방식입니다.*   
그 이유는 논리적인 인덱스 트리 구로를 따르지 않고 인덱스 세그먼트 전체를 Multi-Block I/O 방식으로 스캔하기 때문입니다.   
db_file_multiblock_read_count 파라미터 지정 값 만큼 한 번에 읽어들입니다. (extent 크기 초과 ❌)   
대게 OS의 I/O 단위는 1MB입니다. 8k 블록 128개가 모이면 1MB가 됩니다. 이러한 이유로 파라미터 값을 128로 지정하는 것이 일반적입니다.   
리프 노드의 연결 리스트를 무시하고 읽기 때문에 <span class="red-bold">결과 집합이 인덱스 키 순서대로 정렬(X)</span>되지 않습니다.   
쿼리에 사용한 컬럼이 모두 인덱스에 포함되어 있어야 합니다.   
*index_ffs힌트*를 사용하여 Index Fast Full Scan을 유도할 수 있습니다.

<img src="/images/sqlp-certifications/sqlp-certification-12.jpeg" width="750px;" alt="SQLP 자격 시험" />

- <span class="red-bold">Index Range Scan Descending</span>

<img src="/images/sqlp-certifications/sqlp-certification-13.jpeg" width="750px;" alt="SQLP 자격 시험" />

### 인덱스 사용의 제약사항
추후 업데이트

### 인덱스 사용의 장단점
추후 업데이트
