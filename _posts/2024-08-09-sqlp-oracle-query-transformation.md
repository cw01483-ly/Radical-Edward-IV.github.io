---
title: 👨‍💻 쿼리변환
key: 20240809
tags: DBMS
excerpt: 
keywords: 
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

# 1. 쿼리변환이란?
<span class="blue-bold">쿼리 변환</span>은 DBMS의 옵티마이저가 <span class="blue-bold">사용자가 작성한 SQL 문장을 의미는 그대로 유지하면서 성능이 더 유리한 형태로 재작성</span>하는 과정입니다.   
이는 실행계획을 만들기 전, SQL의 구조를 <span class="blue-bold">최적화에 유리한 구조로 전처리</span>하는 과정이며, 대부분의 현대적 RDBMS에 공통적으로 존재합니다.

💠 **쿼리변환의 필요성**
- 사용자가 작성한 SQL은 <span class="blue-bold">가독성이나 비즈니스 로직 중심</span>으로 작성됨
- DBMS는 성능을 고려해 <span class="blue-bold">보다 실행 효율적인 구조로 바꿀 필요</span>가 있음
- 동일한 결과를 반환하는 여러 쿼리 중 <span class="blue-bold">비용이 가장 낮은 쿼리 구조</span>를 선택해야 함

💠 **담당 컴포넌트 (Oracle 기준)**

Oracle 옵티마이저는 크게 세 단계로 구성되며, 그 중 <span class="red-bold">Query Transformer</span>가 쿼리 변환을 수행합니다.

- **Query Transfomer** → 쿼리 변환 수행
- **Estimator** → 비용 계산
- **Plan Generator** → 최종 실행 계획 생성

💠 **작동 방식 (Oracle 기준)**

Oracle 옵티마이저는 다음 <span class="blue-bold">두 가지 방식의 쿼리 변환</span>을 사용합니다.

- **휴리스틱(Heuristic) 쿼리 변환**: 비용 계산 없이, 무조건 변환을 수행
- **비용기반(Cost-based) 쿼리 변환**: 변환된 쿼리와 원본 쿼리의 비용을 비교 후 더 효율적인 쪽을 선택