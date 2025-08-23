---
layout: article
title: 1. 파일 입출력
permalink: /notes/kr/python-deep-dive/chapter-01
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 심화 과정 강의 노트, 파일 입출력 개념과 활용 방법을 다룹니다.
keywords: "Python, 파일 입출력, 심화 과정, 데이터 처리, 프로그래밍"
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

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Python%20DeepDive&reversal=false&textBg=false)

> 파이썬은 데이터를 다루는 데 아주 강력한 도구예요. 데이터를 다루려면 '파일'에서 정보를 가져오거나(<span class="blue-text">입력</span>), 파일에 새로운 정보를 저장하는(<span class="blue-text">출력</span>) 방법을 알아야 합니다.
>
> * **입력(Input)**: 파일에서 데이터를 프로그램으로 읽어오기
> * **출력(Output)**: 프로그램의 데이터를 파일에 저장하기
>
> <span class="blue-text">프로그램이 노트를 펴서 내용을 읽거나, 새로운 내용을 쓰는 과정</span>이라고 생각하면 쉬워요! 😉

---

## 1. 파일 열고 닫기: `open()` 과 `with`

파일을 읽거나 쓰려면, 가장 먼저 <span class="blue-text">파일을 열어야</span> 합니다. 파이썬에서는 <code class="yellow-code">open()</code> 함수를 사용해요.

<code class="yellow-code">open("파일이름", "모드")</code>

'모드'는 파일을 어떤 목적으로 열지 알려주는 신호와 같아요.

| 모드 | 기능 | 설명 |
| :--: | :--- | :--- |
| <span class="blue-text">r</span> | 읽기 (read) | 파일의 내용을 읽기만 할 때 사용해요. |
| <span class="blue-text">w</span> | 쓰기 (write) | 파일에 내용을 쓸 때 사용해요. <span class="red-text">주의! 기존 내용은 모두 사라지고 새로 써져요.</span> |
| <span class="blue-text">a</span> | 추가 (append) | 파일의 맨 끝에 새로운 내용을 추가해요. <span class="green-text">기존 내용이 안전하게 유지돼요.</span> |

<br>

#### 💡 가장 안전하고 편한 방법: `with`

파일 작업이 끝나면 반드시 `close()`로 닫아줘야 해요. 하지만 깜빡하기 쉽죠.  
<span class="blue-text">`with` 구문을 사용하면 작업이 끝났을 때 파이썬이 알아서 파일을 닫아줘서 아주 편리하고 안전</span>하답니다.   
앞으로는 항상 `with`를 사용하세요!

```python
# 'with' 블록이 끝나면 memo.txt 파일은 자동으로 닫힙니다.
with open("memo.txt", "w") as file:
    file.write("with 구문을 사용하면 정말 편해요!")
```
<details>
  <summary>파일을 열 때 흔히 만나는 오류들</summary>
  <ul>
    <li><span class="red-text">FileNotFoundError</span>: 파일이 존재하지 않을 때 발생해요.</li>
    <li><span class="red-text">PermissionError</span>: 파일에 접근할 권한이 없을 때 발생해요.</li>
    <li><span class="red-text">IsADirectoryError</span>: 파일이 아니라 폴더(디렉토리)를 열려고 할 때 발생해요.</li>
  </ul>
</details>

## 2. 파일 내용 읽기
파일을 <span class="blue-text">'r' 모드</span>로 열면 내용을 읽을 수 있어요.

* <code class="yellow-code">read()</code>: 파일 전체 내용을 하나의 문자열로 통째로 읽어와요.
* <code class="yellow-code">readlines()</code>: 파일의 모든 줄을 각각의 문자열로 만들어 리스트에 담아줘요.
* <code class="yellow-code">readline()</code>: 파일에서 딱 한 줄만 읽어와요. (자주 쓰이진 않아요.)

```python
# memo.txt 파일에 아래 내용이 저장되어 있다고 상상해보세요!
# 첫 번째 줄입니다.
# 두 번째 줄입니다.

with open('memo.txt', 'r') as f:
    # 1. read()로 전체 읽기
    content = f.read()
    print("--- read() 결과 ---")
    print(content)

with open('memo.txt', 'r') as f:
    # 2. readlines()로 한 줄씩 리스트에 담아 읽기
    lines = f.readlines()
    print("--- readlines() 결과 ---")
    print(lines) 
    # 결과: ['첫 번째 줄입니다.\n', '두 번째 줄입니다.']
```

## 3. 파일에 내용 쓰기
파일에 글자를 쓰려면 <span class="blue-text">'w' 모드</span>나 <span class="blue-text">'a' 모드</span>로 열어야 해요.

* <code class="yellow-code">w</code> 모드 (덮어쓰기): <span class="red-text">파일의 모든 내용을 지우고</span> 처음부터 새로 써요.
* <code class="yellow-code">a</code> 모드 (이어쓰기): <span class="green-text">기존 내용 맨 끝에</span> 새로운 내용을 추가해요.

```python
# "w" 모드: 기존 내용을 모두 지우고 새로 쓰기
with open("memo.txt", "w") as f:
    f.write("이 내용만 남을 거예요.\n")

# "a" 모드: 기존 내용에 이어서 추가하기
with open("memo.txt", "a") as f:
    f.write("이 내용은 뒤에 추가돼요.\n")
```

## 4. 사용자에게 직접 입력받기: `input()`
파일뿐만 아니라 사용자에게 직접 키보드로 입력을 받을 수도 있어요. 이때는 <code class="yellow-code">input()</code> 함수를 사용해요.

**중요‼️** <code class="yellow-code">input()</code>으로 받은 값은 <span class="red-text">항상 문자열(string) 타입</span>이에요.

만약 숫자로 사용하고 싶다면 <code class="yellow-code">int()</code>를 이용해 숫자로 변환해줘야 합니다.

```python
name = input("이름을 입력하세요: ")
print(f"안녕하세요, {name}님!")

# input()은 문자열을 반환하므로, 숫자로 바꿔줘야(형 변환) 계산이 가능해요.
age_str = input("나이를 입력하세요: ")
age_int = int(age_str) 
print(f"내년에는 {age_int + 1}살이 되시는군요!")
```

## 5. 종합 연습문제
<a href="/notes/assets/python-deep-dive/chapter01.zip" download>예제 파일 다운로드</a>

### 문제 1
> memo1.txt 파일을 한 줄씩 읽어서 화면에 출력하세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <p>파일 객체는 for문과 함께 사용하면 한 줄씩 자동으로 읽어올 수 있어 매우 편리합니다.</p>
  <pre><code class="language-python">
    with open('memo1.txt', 'r') as f:
      for line in f:
        print(line.strip()) # .strip()은 줄 끝의 불필요한 공백이나 줄바꿈 문자를 제거합니다.
  </code></pre>
</details>

### 문제 2
> hello.txt 파일에서 "Python"이라는 단어가 포함된 줄만 찾아서 출력하세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    with open("hello.txt", "r") as f:
      for line in f:
        if "Python" in line:
          print(line.strip())
  </code></pre>
</details>

### 문제 3
scores.txt 파일에는 이름,점수 형식으로 데이터가 저장되어 있습니다. 각 학생의 점수를 출력하고, 총점과 평균 점수를 계산하여 마지막에 출력하세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    total_score = 0
    student_count = 0

    with open("scores.txt", "r") as f:
      for line in f:
        name, score_str = line.strip().split(",")
        score = int(score_str) # 쉼표로 분리한 점수(문자열)를 숫자로 변환

    print(f"{name} 학생 점수: {score}")

    total_score += score
    student_count += 1
    average = total_score / student_count
    print(f"\n총점: {total_score}")
    print(f"평균: {average}")
  </code></pre>
</details>

### 문제 4
사용자에게 '과목 점수' 형식으로 입력을 받아 딕셔너리에 저장하고, 사용자가 "exit"를 입력하면 파일(my_scores.txt)에 그 내용을 저장하는 프로그램을 만드세요.

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    scores = {}

    while True:
      data = input("과목과 점수를 입력하세요 (예: 국어 90, 종료: exit): ")

    if data == "exit":
      break

    subject, score = data.split()
    scores[subject] = int(score)

    print("\n입력된 점수:", scores)

    파일에 딕셔너리 내용 저장하기
    with open("my_scores.txt", "w") as f:
      for subject, score in scores.items():
        f.write(f"{subject},{score}\n")

    print("my_scores.txt 파일이 생성되었습니다.")
  </code></pre>
</details>

## 6. CSV 및 Json 다루기: 공공 데이터 활용하기

파일 입출력의 연장선으로, 현대 애플리케이션에서는 다른 서버와 데이터를 주고받는 일이 매우 흔합니다. 이때 가장 널리 사용되는 데이터 형식이 바로 **CSV**와 **JSON**입니다.

*   <span class="blue-text">**CSV (Comma-Separated Values)**</span>: 쉼표(,)로 데이터를 구분하는 가장 단순한 텍스트 파일 형식입니다. 엑셀과 같은 스프레드시트 프로그램에서 쉽게 열 수 있어 데이터 분석에 많이 사용됩니다.
*   <span class="blue-text">**JSON (JavaScript Object Notation)**</span>: `키:값` 쌍으로 이루어진 데이터 객체를 전달하기 위한 개방형 표준 형식입니다. 사람이 읽고 쓰기 쉬우며, 기계가 파싱하고 생성하기도 쉽습니다. 파이썬의 딕셔너리와 리스트 구조와 거의 동일하여 다루기 매우 편리합니다.

이번에는 앞에서 배운 파일 처리 개념과 네트워크 통신을 결합하여, 공공데이터포털의 '대기오염정보' API를 호출하고 그 결과를 파싱하는 예제를 만들어 보겠습니다.

### 예제: 실시간 미세먼지 농도 확인 프로그램

이 프로그램은 `requests` 라이브러리를 사용하여 특정 지역의 미세먼지 농도를 가져와 출력합니다.

> 💡 **시작하기 전에!**  
> 이 코드를 실행하려면 `requests` 라이브러리가 필요합니다. 터미널에서 아래 명령어로 설치해주세요.
> ```bash
> pip install requests
> ```

> ⚠️ **API 키 발급받기**  
> 공공데이터포털 API를 사용하려면 먼저 회원가입 후 [대기오염정보 조회 서비스](https://www.data.go.kr/data/15073861/openapi.do) 페이지에서 '활용신청'을 통해 개인 인증키(Service Key)를 발급받아야 합니다. 발급받은 키를 아래 코드의 `YOUR_API_KEY` 부분에 붙여넣으세요.

```python
import requests
import json

# 공공데이터포털에서 발급받은 본인의 API 키를 입력하세요.
# 주의: Decoding 된 키를 사용해야 합니다. 포털에서 '일반 인증키(Decoding)'을 복사하세요.
API_KEY = "YOUR_API_KEY" 

# 데이터를 조회할 측정소 이름
STATION_NAME = "종로구"

# API 요청을 보낼 URL
# dataType을 'json'으로 설정하여 JSON 형식으로 데이터를 받습니다.
URL = (
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty"
    f"?serviceKey={API_KEY}"
    f"&returnType=json"
    f"&numOfRows=1"
    f"&pageNo=1"
    f"&stationName={STATION_NAME}"
    f"&dataTerm=DAILY"
    f"&ver=1.0"
)

# requests 라이브러리를 사용해 URL에 GET 요청을 보냅니다.
response = requests.get(URL)

# 응답이 성공적인지 확인 (HTTP 상태 코드 200)
if response.status_code == 200:
    # 응답받은 JSON 문자열을 파이썬 딕셔너리로 변환합니다.
    data = json.loads(response.text)
    
    # 데이터가 정상적으로 수신되었는지 확인합니다.
    # API 응답 구조에 따라 키를 확인해야 합니다.
    if data['response']['header']['resultCode'] == '00':
        # 필요한 정보 추출
        item = data['response']['body']['items'][0]
        
        station_name = item['stationName']
        measure_time = item['dataTime']
        pm10_value = item['pm10Value']
        pm25_value = item['pm25Value']
        
        print(f"--- {station_name} 대기오염정보 ---")
        print(f"측정 시간: {measure_time}")
        print(f"미세먼지(PM10) 농도: {pm10_value}µg/m³")
        print(f"초미세먼지(PM2.5) 농도: {pm25_value}µg/m³")
    else:
        # API 자체에서 보낸 에러 메시지 출력
        error_msg = data['response']['header']['resultMsg']
        print(f"API 오류가 발생했습니다: {error_msg}")
else:
    # HTTP 요청 실패 시
    print(f"데이터를 가져오는 데 실패했습니다. 상태 코드: {response.status_code}")

```

#### 코드 설명
1.  <code class="yellow-code">import requests, json</code>: HTTP 요청을 보내기 위한 `requests`와 JSON 데이터를 다루기 위한 `json` 라이브러리를 가져옵니다.
2.  <code class="yellow-code">API_KEY, STATION_NAME, URL</code>: API 요청에 필요한 기본 정보들을 변수에 저장합니다. 특히 `URL`에는 f-string을 사용하여 변수들을 동적으로 포함시켰습니다. `returnType=json` 파라미터를 통해 JSON 형식의 응답을 요청하는 것이 핵심입니다.
3.  <code class="yellow-code">requests.get(URL)</code>: `requests` 라이브러리의 `get` 함수를 이용해 해당 URL로 HTTP GET 요청을 보냅니다. 서버로부터의 모든 응답이 `response` 객체에 담깁니다.
4.  <code class="yellow-code">response.status_code == 200</code>: HTTP 상태 코드를 확인하여 요청이 성공했는지 검사합니다. `200`은 '성공'을 의미합니다.
5.  <code class="yellow-code">json.loads(response.text)</code>: `response.text`에는 서버가 보낸 순수한 JSON 문자열이 담겨 있습니다. `json.loads()` 함수는 이 문자열을 파이썬 딕셔너리와 리스트로 변환해줍니다. 이제 파이썬에서 다루기 쉬운 형태로 데이터가 가공되었습니다.
6.  <code class="yellow-code">data['response']['body']['items'][0]</code>: 변환된 딕셔너리에서 우리가 원하는 실제 데이터가 있는 곳까지 키를 이용해 한 단계씩 접근합니다. API 문서를 보며 데이터 구조를 파악하는 것이 중요합니다.
7.  **정보 출력**: 필요한 데이터(측정소 이름, 시간, 미세먼지 농도 등)를 추출하여 `print` 함수로 보기 좋게 출력합니다.