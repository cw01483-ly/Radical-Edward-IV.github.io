---
title: 📸 변경 데이터 캡처(CDC, Change Data Capture)
key: 20230804
tags: 기술
excerpt: 변경 데이터 캡처(CDC)에 대한 내용을 설명한 자료입니다.
keywords: "변경 데이터 캡처, CDC, DW, ETL"
---

### CDC란 무엇인가?

변경 데이터 캡처란 데이터가 변경되는 시점 및 변경 항목에 대한 추적을 의미합니다. 추적의 목적은 변경에 대응하기 위함입니다. 시스템(서비스) A가 변경될 때 시스템(서비스) B에 영향도가 있다면 B 시스템(서비스)에 알림을 전송하여 변경에 대응할 수 있도록 합니다.

변경 데이터 캡처를 통해서 데이터를 사용하는 모든 시스템에서 일관성 및 기능을 유지할 수 있습니다. 메타 시스템에서는 변경 대응 시스템 존재 여부에 따라 플래그를 표시하고, 영향도가 있는 대상의 변경 요청서가 등록되었을 때 원본 시스템의 테이블 변경 요청서를 결재할 수 있도록 방어 로직을 구성했습니다.



### 변경 데이터 캡처를 활용하여 데이터 웨어하우스(DW) 애플리케이션의 ETL 단순화

문제: 매일 밤 조직 내의 여러 시스템의 데이터가 추출되어 DW로 이동합니다. 해당 과정을 통해서 DW의 모든 데이터가 원본 시스템의 데이터로 Update 됩니다. 이는 많은 리소스를 잡아먹는 작업이며 많은 시간을 필요로 합니다. 마지막 추출 이후로 변경된 데이터만 선택적으로 추출할 수도 있으나, 쉽게 구현할 수 있는 부분이 아닙니다. 그리고 원본 시스템이 다수의 대상 시스템에 데이터를 공급할 때에도 비슷한 문제가 있습니다.

CDC 적용: 변경 데이터 이관 작업 시 식별 프로세스를 통해서 데이터 추출 시간을 줄일 수 있습니다. 데이터 통합과 관련한 프로젝트를 담당하는 개발자 또는 DBA라면 CDC 활용을 통해 ETL 작업 시간을 단축할 수 있습니다.

<img src="/images/change-data-capture.png" width="700px;" alt="Change Data Capture">​



### CDC 기본 구조

CDC 구조는 등록/가입자 모델을 기반으로 합니다. 등록자는 변경 데이터 캡처의 책임이 있으며, 가입자는 변경 데이터를 활용합니다.

1. 등록자가 원본 테이블을 식별한다.

2. 변경 데이터를 캡처하여 변경 테이블에 저장한다.

3. 가입자가 변경 테이블에 엑세스할 수 있도록 한다.

4. 가입자가 관련이 있는 데이터만 조회할 수 있도록 가입자 View를 만들어 변경 데이터에 엑세스할 수 있도록 합니다.

<br>
<br>
<span style="color: grey; font-weight: 700;">References</span>   
[https://www.redhat.com/ko/topics/integration/what-is-change-data-capture](https://www.redhat.com/ko/topics/integration/what-is-change-data-capture)
[https://dataonair.or.kr/db-tech-reference/d-lounge/technical-data/?mod=document&uid=235694](https://dataonair.or.kr/db-tech-reference/d-lounge/technical-data/?mod=document&uid=235694)