---
title: 👨‍💻 Oracle DBMS
key: 20240427
tags: DBMS
excerpt: Oracle 데이터베이스 아키텍처를 설명하며, SQLP 자격증 시험 대비를 위한 주요 개념과 원리를 다룹니다. 데이터 파일, 컨트롤 파일, 리두 로그 파일 등의 구조와 역할을 소개합니다. 
keywords: "SQLP, Oracle, 데이터베이스 아키텍처, 데이터 파일, 컨트롤 파일, 리두 로그, 자격증 시험, 데이터베이스 관리"
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

## 1. Oracle DBMS

### 1.1 Oracle DBMS 구조

<table>
    <colgroup>
        <col width="10%"/>
        <col width="10%"/>
        <col width="10%"/>
        <col width="70%"/>
    </colgroup>
    <tr style="background-color: rgba(0, 0, 0, 0.05);">
        <th colspan="3">구분</th>
        <th>설명</th>
    </tr>
    <tr>
        <td rowspan="3">Database</td>
        <td colspan="2">Data files</td>
        <td>데이터 파일에는 <span class="blue-bold">실제 사용자 데이터, 애플리케이션 데이터, 메타 데이터가 저장</span>됩니다.</td>
    </tr>
    <tr>
        <td colspan="2">Control files</td>
        <td><span class="blue-bold">데이터베이스를 시작할 때 필요한 파일</span>의 이름, 위치 및 상태와 같은 정보와 Online Redo Log 파일에 대한 메타 데이터를 저장합니다.</td>
    </tr>
    <tr>
        <td colspan="2">Control files</td>
        <td>Redo log file은 <span class="blue-bold">데이터베이스에 변경 사항</span>이 발생하면 이를 저장하고 <span class="blue-bold">데이터 복구에 사용</span>합니다.</td>
    </tr>
    <tr>
        <td rowspan="7">Instance</td>
        <td rowspan="2">SGA</td>
        <td>Data buffer cache</td>
        <td>데이터베이스 인스턴스의 SGA 내에 존재하는 <span class="blue-bold">메모리 영역</span>입니다. 데이터 파일에서 읽은 <span class="blue-bold">데이터 블록의 복사본을 저장</span>합니다.</td>
    </tr>
    <tr>
        <td>Redo log buffer</td>
        <td>데이터베이스에 변경 사항이 발생하면 먼저 Redo log buffer에 <span class="blue-bold">변경 사항에 대한 정보를 저장</span>합니다. Redo는 <span class="blue-bold">시스템에 장애가 발생할 경우 데이터베이스 복구</span>를 위해 사용합니다.</td>
    </tr>
    <tr>
        <td rowspan="5">Background Process</td>
        <td>SMON</td>
        <td><span class="blue-bold">오라클 인스턴스를 관리하는 프로세스</span> 입니다. 인스턴스 복구, 데이터 파일의 빈 공간을 연결, 사용하지 않는 임시 세그먼트들을 재사용할 수 있도록 합니다.</td>
    </tr>
    <tr>
        <td>PMON</td>
        <td>오라클 서버에서 사용되는 <span class="blue-bold">프로세스들을 감시하는 프로세스</span>입니다. 좀비 프로세스 킬, SGA 리소스 정리, 커밋되지 않은 트랜잭션을 롤백합니다.</td>
    </tr>
    <tr>
        <td>DBWR</td>
        <td>Buffer Cache에 <span class="blue-bold">수정된(Dirty) 버퍼의 내용을 데이터 파일에 기록</span>합니다.</td>
    </tr>
    <tr>
        <td>LGWR</td>
        <td><span class="blue-bold">Redo log buffer의 내용을 Online redo log file에 기록</span>합니다.</td>
    </tr>
    <tr>
        <td>CKPT</td>
        <td>SGA 상에 변경된 버퍼 캐시와 리두 로그 버퍼를 디스크 상의 데이터 파일에 저장하도록 <span class="blue-bold">DBWR와 LGWR를 호출</span>합니다. 그리고 각 <span class="blue-bold">파일의 헤더 부분에 체크 포인트 이벤트 시점</span>을, <span class="blue-bold">컨트롤 파일에는 발생된 체크 포인트 이벤트의 정보</span>를 기록합니다. 이 기록을 통해 </span>3가지 파일(Data file, Control file, Redo log file)의 동기화를 보장</span>하게 됩니다. 만약 정보가 일치하지 않으면 복구가 시작됩니다.</td>
    </tr>
    <tr>
        <td rowspan="2">PGA</td>
        <td colspan="2">Sort Area</td>
        <td>정렬 작업을 위한 공간입니다. 메모리 내에서 정렬되어 빠른 속도를 보장합니다. 만약 pga 크기를 초과할 경우 디스크에서 정렬이 일어나므로 수행 속도가 저하됩니다.</td>
    </tr>
    <tr>
        <td colspan="2">Cursor State</td>
        <td>SQL의 파싱 정보가 기록되어 있는 주소를 저장합니다.</td>
    </tr>
</table>

⁉️ **PGA:** 프로세스에 대한 데이터와 제어정보가 포함된 <span class="blue-bold">비 공유 메모리 영역</span>입니다.

<br/>

<img src="/images/sqlp-certifications/sqlp-certification-14.jpeg" alt="오라클 아키텍처" />

<br/>

> 오라클 데이터베이스는 많은 프로세스가 동시에 데이터에 엑세스하므로 <i>데이터를 보호하는 Lock</i>은 물론 공유 메모리 영역인 SGA상에 위치한 <i>데이터 구조에 대한 Lock 매커니즘(Latch)</i>도 필요합니다.
>
> Random Access 부하의 원인
> ROWID 획득 → Hash Function(DBA) → Cache Buffer Chain Latch 획득(Wait)
> → Buffer Lock이 걸린 경우 대기 이벤트 발생(Wait)
> → LRU 알고리즘에 의해 특정 블록이 Age Out된다면 LRU Latch 획득 필요(Wait)

### 1.2 Buffer Pinning

인덱스 Leaf 노드를 스캔하며 RowID를 읽을 때 바로 다음 RowID를 함께 읽습니다.   
만약 동일한 DBA(DB Block Address)라면 Age Out을 방지하기 위해 Pin을 걸어둡니다.   
Pin을 걸어두는 것과 동시에 RowID를 PGA에 저장하여 바로 찾아갈 수 있도록 합니다.   
<span class="red-bold">Buffer Pinning은 Logical Read(Buffer에서 읽는 것)로 잡히지 않아 쿼리 성능을 높이게 됩니다.</span>

<img src="/images/sqlp-certifications/sqlp-certification-15.jpeg" alt="버퍼 피닝" />

### 1.3 Clustering Factor

인덱스를 순차적으로 읽었을 때 이전 RowID와 다음 RowID의 DBA가 동일한 정도를 나타내는 지표입니다.   
<i>이전 RowID와 다음 RowID의 DBA가 상이할 경우 +1 증가</i>합니다.   
<span class="red-bold">Clustering Factor가 좋으면 Buffer Pinning 기법으로 얻는 이점이 극대화</span>됩니다.   
통상적으로<span class="blue-bold">인덱스의 손익분기점은</span> 10 ~ 15%라고 하지만, 정확히는<span class="blue-bold">클러스터링 팩터에 의해서 좌우됩니다.</span>

| C.F 수치가 낮음 (클러스터링 팩터가 좋음)                                | C.F 수치가 높음 (클러스터링 팩터가 나쁨)          |
| :---------------------------------------------------------------------- | :------------------------------------------------ |
| • C.F 수치가 블록 수에 근접<br/>• R.A 효율이 좋음 (Buffer Pinning 효과) | • C.F 수치가 로우 수에 근접<br/>• R.A 효율이 나쁨 |

<img src="/images/sqlp-certifications/sqlp-certification-16.jpeg" alt="클러스터링 팩터" />

<i>인덱스에 컬럼이 추가될 경우 클러스터링 팩터에 영향</i>을 주게 됩니다.

| 구분            | 변경 전        | 변경  후              |
| :-------------- | :------------- | :-------------------- |
| 인덱스          | 사원명         | 사원명 + 급여         |
| 정렬 순서       | 사원명 + RowID | 사원명 + 급여 + RowID |
| 클러스터링 팩터 | 좋음(낮음)     | 나쁨(높음)            |