---
title: 👨‍💻 I/O 튜닝의 핵심 원리
key: 20240602
tags: DBMS
excerpt: I/O 튜닝의 핵심 원리와 DBMS에서 Random Access 최소화, Sequential Access 선택도 튜닝, 인덱스 종류와 설계에 대한 심도 있는 설명을 제공합니다. Oracle의 IOT, SQL Server의 Cluster Index, B*Tree, 비트맵 인덱스, 함수기반 인덱스 및 리버스 인덱스를 다룹니다. 
keywords: "I/O 튜닝, DBMS, Random Access 최소화, Sequential Access 선택도, 인덱스 튜닝, Oracle IOT, SQL Server Cluster Index, B*Tree 인덱스, 비트맵 인덱스, 함수기반 인덱스, 리버스 인덱스, 인덱스 설계, 성능 튜닝"
---

<style>
    img {

    }
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

## 1. I/O 튜닝의 핵심 원리

### 💡 [Sequential Access 선택도 👆](#3-sequential-access-선택도-튜닝)
### 💡 [Random Access 발생량 👇](#2-ramdom-access-최소화-튜닝)

## 2. Ramdom Access 최소화 튜닝

### 2.1 인덱스에 컬럼 추가

```sql
--==============================
--          튜닝 전
--==============================
-- 인덱스: GENDER, SAL
WHERE EMP
  AND GENDER = :gender -- Man
  AND DNAME  = :dname  -- 10(Accounting)

--==============================
--          튜닝 후
--==============================
-- 인덱스: GENDER, SAL, DNAME
WHERE EMP
  AND GENDER = :gender -- Man
  AND DNAME  = :dname  -- 10(Accounting)
```

### 2.2 ️인덱스만 읽고 처리

SELECT 컬럼과 WHERE 컬럼이 모두 인덱스에 구성되어 있다면 인덱스만 읽어(<span class="red-bold">Index Only Scan</span>) 결과 집합을 가져올 수 있습니다.

<span class="red-bold">(답안으로 제출할 경우 감점 요인)</span>

### 2.3 IOT와 Cluster Index

Oracle의 <span class="red-bold">IOT</span>(Index Organized Table)는 Table Random Access가 발생하지 않도록 <span class="red-bold">인덱스 구조로 생성된 테이블</span>입니다.

<span class="blue-bold">1) 크기가 작고 NL Join으로 반복 Lookup하는 테이블 2) 폭이 좁고 긴 테이블 3) 넓은 범위를 주로 검색하는 테이블 4) 데이터 입력과 조회 패턴이 서로 다른 테이블에 활용</span>할 수 있습니다.

<table>
  <colgroup>
    <col width="50%" />
    <col width="50%" />
  </colgroup>
  <tr align="center">
    <th>장점</th>
    <th>단점</th>
  </tr>
  <tr>
    <td>C.F가 좋음</td>
    <td>잦은 DML 작업 시 인덱스 분할로 부하 발생</td>
  </tr>
  <tr>
    <td>Random Access 방식이 아닌 Sequential Access 방식으로 넓은 범위 검색 시 유리함</td>
    <td>Direct Path Insert 불가능</td>
  </tr>
  <tr>
    <td>PK 인덱스를 위한 별도의 세그먼트 생성이 불필요함</td>
    <td>-</td>
  </tr>
</table>

<figure>
<img src="/images/sqlp-certifications/sqlp-vertification-17.jpeg" width="70%;" alt="오라클의 IOT" />
<figcaption>https://slideplayer.com/</figcaption>
</figure>

SQL Server의 <span class="red-bold">Cluster Index</span>는 <span class="red-bold">키 값이 동일한 레코드들을 한 블록에 모이도록 저장</span>합니다.   
한 블록에 모두 담기 힘든 경우 새로운 블록을 할당하여 체인으로 연결합니다.   
Cluster Index는 넓은 범위 검색에 매우 유리(C.F 좋음)합니다.   
그러나 새로운 값이 자주 입력되거나, 수정이 자주 발생할 경우 부하가 극심할 수 있습니다.


<figure>
<img src="/images/sqlp-certifications/sqlp-vertification-18.png" width="100%;" alt="SQL Server의 클러스터 인덱스" />
<figcaption>https://www.sqlservercentral.com/</figcaption>
</figure>

## 3 Sequential Access 선택도 튜닝

> 1. <span class="red-bold">인덱스 매칭도:</span> 비교 연산자 종류와 컬럼 순서에 따른 <span class="red-bold">인덱스 레코드의 군집성</span>
> 1. <span class="red-bold">인덱스 매칭도: 인덱스 선행 컬럼이 등치(=) 조건이 아닐 경우</span> 발생하는 <span class="red-bold">비효율 (인덱스 매칭도)</span>
> 2. <span class="red-bold">BETWEEN 조건을 IN-LIST로 변경</span>했을 경우 <span class="red-bold">스캔 효율성</span>
> 3. <span class="red-bold">Index Skip Scan</span>을 이용한 비효율 해소
> 4. <span class="red-bold">범위 조건 남용</span>의 문제점
> 5. <span class="red-bold">동일 컬럼에 두 개의 범위 조건 사용 시 유의사항</span>
> 6. <span class="red-bold">BETWEEN</span>과 <span class="red-bold">LIKE 비교</span>
> 7. <span class="red-bold">선분 이력</span>의 인덱스 <span class="red-bold">스캔 효율</span>
> 8. <span class="red-bold">Access Predicate</span>와 <span class="red-bold">Filter Predicate</span>
> 9. <span class="red-bold">Index Fragmentation</span>

### 3.1 인덱스 매칭도
    
**결합 인덱스 우선 순위:** 사용 빈도, 등치 조건, 분포도, Sort 연산 대체   
WHERE 절에서 선두 컬럼부터 연속된 후행 컬럼에 대하여 <span class="red-bold">equal(=) 또는 IN 조건으로 비교</span>할 경우 매칭도는 높아지게 됩니다.   
<span class="red-bold">equal(=) 또는 IN 조건이 아닌 조건 이후는 무조건 Check 조건</span>이 됩니다.

<figure>
<img src="/images/sqlp-certifications/sqlp-vertification-19.jpeg" width="70%;" alt="인덱스 매칭도" />
<figcaption>WHERE GENDER = ‘M’ AND DNAME = 10</figcaption>
</figure>

<img src="/images/sqlp-certifications/sqlp-vertification-20.jpeg" width="100%;" alt="인덱스 매칭도" />

### 3.2 BETWEEN 조건을 IN-LIST로 변경했을 경우 스캔 효율성

**IN-LIST로 변경할 때의 주의사항**

1. IN-LIST 개수가 많지 않아야 합니다.   
2. 수직적 탐색이 IN-LIST 개수 만큼 발생하기 때문에 인덱스의 높이가 높으면 불리할 수 있습니다.

<i>체크 조건 앞의 컬럼들의 변별력이 좋을 경우 BETWEEN 조건이 유리할 수 있습니다.</i>

<img src="/images/sqlp-certifications/sqlp-vertification-21.jpeg" width="70%;" alt="Between과 IN-List" />

<img src="/images/sqlp-certifications/sqlp-vertification-22.jpeg" width="70%;" alt="Between과 IN-List" />

### 3.3 Index Skip Scan을 이용한 비효율 해소
    
인덱스 선두 컬럼의 Distinct가 낮고 후행 컬럼의 Cardinality가 높을 때 유리할 수 있습니다.
    
### 3.4 범위 조건 남용의 문제점
    
대량의 테이블을 넓은 범위로 검색할 때는 인덱스 Sequential Scan 비효율로 인해 성능이 저하될 수 있습니다. 데이터 분포도에 따라 인덱스 컬럼에 사용할 비교 연산자를 신중하게 고를 필요성이 있습니다.

```sql
-- 주문일자 조건이 있는 경우
SELECT PROD_CD
      , ORDER_DATE
      , ORDER_TYPE
FROM   ORDER
WHERE  PROD_CD    = :PROD_CD
  AND  ORDER_DATE = :ORDER_DATE
  AND  ORDER_TYPE = :ORDER_TYPE;

-- 주문일자 조건이 없는 경우
SELECT PROD_CD
      , ORDER_DATE
      , ORDER_TYPE
FROM   ORDER
WHERE  PROD_CD    = :PROD_CD
  AND  ORDER_TYPE = :ORDER_TYPE;

-- 개발자의 편의에 의해 ORDER_DT 조건을 LIKE로 처리
SELECT PROD_CD
      , ORDER_DATE
      , ORDER_TYPE
FROM   ORDER
WHERE  PROD_CD    = :PROD_CD
  AND  ORDER_DATE LIKE :ORDER_DATE || '%'
  AND  ORDER_TYPE = :ORDER_TYPE;
```

```sql
-- 튜닝
SELECT PROD_CD
      , ORDER_DATE
      , ORDER_TYPE
FROM ORDER
WHERE ORDER_DATE IS NOT NULL
  AND PROD_CD    = :PROD_CD
  AND ORDER_DT   = :ORDER_DATE
  AND ORDER_TYPE = :ORDER_TYPE
UNION ALL
SELECT PROD_CD
      , ORDER_DATE
      , ORDER_TYPE
FROM ORDER
WHERE ORDER_DATE IS NULL
  AND PROD_CD    = :PROD_CD
  AND ORDER_TYPE = :ORDER_TYPE;

-- 튜닝: 주문일자 컬럼이 NOT NULL 일 경우
SELECT PROD_CD
      , ORDER_DATE
      , ORDER_TYPE
FROM ORDER
WHERE PROD_CD    = :PROD_CD
  AND ORDER_DT   = NVL(:ORDER_DATE, ORDER_DATE)
  AND ORDER_TYPE = :ORDER_TYPE;
```
### 3.5 동일 컬럼에 두 개의 범위 조건 사용 시 유의사항

```sql
SELECT *
FROM ORDER
WHERE TRIM(ORDER_NO) <= 10000
  AND ORDER_NO       <= 10;   -- Driving 조건
```

### 3.6 BETWEEN과 LIKE 비교

`BETWEEN(’202401’ AND ‘202412’)`은 정확한 시작과 끝을 알 수 있습니다. 반면 `LIKE(’2024%’ → ‘2024121’)`는 혹시 모를 값을 위해 추가적으로 스캔할 수 있습니다.

<img src="/images/sqlp-certifications/sqlp-vertification-23.jpeg" width="70%;" alt="Between과 Like 비교" />

### 3.7 선분 이력의 인덱스 스캔 효율

**최근 데이터 조회:** <i>종료일자</i> + 시작일자   
**과거 데이터 조회:** <i>시작일자</i> + 종료일자   
**인덱스 수정 불가:** <i>INDEX_DESC</i> 힌트 사용   
**중간 지점을 조회:** <i>ROWNUM <= 1 조건</i>을 활용

<img src="/images/sqlp-certifications/sqlp-vertification-24.jpeg" width="70%;" alt="선분 이력 조회" />

<img src="/images/sqlp-certifications/sqlp-vertification-25.jpeg" width="70%;" alt="선분 이력 조회" />

<img src="/images/sqlp-certifications/sqlp-vertification-26.jpeg" width="70%;" alt="선분 이력 조회" />

## 4. 인덱스의 종류

### 4.1 B*Tree 인덱스

B*Tree의 각 노드는 정렬 상태를 유지합니다. 자료는 중복되지 않으며, Leaf Node는 동일 레벨에 위치합니다. B*Tree의 B는 Balanced로 쏠림 현상을 제거하여 균형이 유지되는 ‘균형이진트리’를 의미합니다.

> Index Skew: 시계열적으로 증가하는 인덱스에서 과거 데이터를 대량으로 삭제하면 왼쪽 Leaf 블록들은 텅 비어버리는 반면, 오른쪽 블록들은 꽉 찬 상태가 됩니다.
텅 빈 블록들은 재사용할 수 있지만, 다시 채워질 때까지 인덱스 스캔 효율이 저하됩니다.

Index Sparse: 대량의 삭제 작업으로 인덱스 밀도가 낮은 상태입니다. Index Skew처럼 블록이 텅 비면 곧바로 반환되어 재사용되지만, Sparse 현상은 지워진 자리에 인덱스 정렬 순서에 따라 새로운 값이 입력되지 않으면 영영 재사용되지 않을 수도 있습니다.
> 

**인덱스 재생성 요건**

- 인덱스 분할에 의한 경합 증가
- 자주 사용되는 인덱스 스캔 효율 개선 (특히 NL Join에서 반복 엑세스되는 인덱스의 높이 증가)
- 대량의 delete 작업을 수행한 이후 다시 레코드가 입력되기까지 오랜 기간이 소요될 때
- 총 레코드 수는 일정한데도 인덱스가 계속 커질 때

### 4.2 비트맵 인덱스

Distinct 낮고 인덱스가 여러 개 필요한 대용량 테이블에 유용합니다.   
다양한 분석관점을 가진 팩트성 테이블에 주로 사용합니다.   
대용량 데이터 검색 시 여러 비트맵 인덱스를 동시에 활용하여 성능 향상을 기대할 수 있습니다.   
정형화되지 않은 임의 질의(ad-hoc query) 환경(DW)에 많이 사용합니다.

### 4.3 함수기반 인덱스

```sql
CREATE INDEX IX_EMP_01 ON ORDER(UPPER(ename));
```

데이터 입력, 수정 시 함수를 적용하므로 다소 부하가 발생합니다.   
사용된 함수가 **User-Defined 함수일 경우 부하가 극심하므로 사용해서는 안됩니다.**

### 4.4 리버스 인덱스

일련번호, 주문일시 같은 컬럼에 인덱스를 만들게 되면 입력되는 값이 순차적으로 증가하며 가장 오른쪽 리프 블록에만 데이터가 증가합니다. 이런 현상을 Right Growing이라고 부르며 리버스 인덱스를 활용하여 리프 블록 전체에 고르게 분산시킬 수 있습니다.   
입력된 값이 꺼꾸로 변환되어 있어 **Equal(=) 검색만 가능**합니다.

## 4.2 인덱스 설계

**결합 인덱스 구성을 위한 공식**

- **조건절에 항상 사용**되는가?
- **Equal(=) 조건으로 사용**되는가?
- **카디널리티**가 좋은가?
- **Sort Operation 생략**이 가능한가?

**추가적인 고려 사항**

- **쿼리 수행 빈도**
- **업무상 중요도**
- **클러스터링 팩터**
- **데이터량**
- **DML 부하**
- **저장 공간**
- **인덱스 관리 비용**