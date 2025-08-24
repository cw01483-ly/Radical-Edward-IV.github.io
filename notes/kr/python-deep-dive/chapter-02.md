---
layout: article
title: 2. 데이터 구조 다루기 (JSON, CSV)
permalink: /notes/kr/python-deep-dive/chapter-02
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 심화 과정 강의 노트, JSON 및 CSV 데이터 처리와 공공 API 활용법을 다룹니다.
keywords: "Python, CSV, JSON, API, requests, 데이터 처리, 공공 데이터"
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

프로그램은 데이터를 다루는 것이 핵심입니다. 특히 현대 애플리케이션에서는 다른 시스템과 데이터를 주고받기 위해 표준화된 형식을 사용하는데, 그중 가장 대표적인 것이 **JSON**과 **CSV**입니다.

*   <span class="blue-text">**JSON (JavaScript Object Notation)**</span>: `키:값` 쌍으로 이루어져 사람이 읽고 쓰기 쉬운 형식입니다. 파이썬의 딕셔너리 및 리스트와 구조가 거의 동일해 매우 널리 사용됩니다.
*   <span class="blue-text">**CSV (Comma-Separated Values)**</span>: 쉼표(,)로 데이터를 구분하는 간단한 텍스트 형식으로, 표 형태의 데이터를 저장하고 교환하는 데 주로 사용됩니다.

이번 장에서는 파이썬의 내장 모듈을 사용하여 이 두 형식의 데이터를 다루는 방법부터 연습한 후, 이를 응용하여 외부 API와 통신하는 방법을 알아보겠습니다.

## 1. 파이썬 내장 모듈로 JSON 다루기

파이썬의 내장 `json` 모듈을 사용하면 JSON 데이터를 쉽게 다룰 수 있습니다.

- <code class="yellow-code">json.loads(json_string)</code>: JSON 형식의 **문자열**을 파이썬 딕셔너리나 리스트로 변환합니다. (load**s** ← load from **s**tring)
- <code class="yellow-code">json.dumps(python_object)</code>: 파이썬 딕셔너리나 리스트를 JSON 형식의 **문자열**로 변환합니다. (dump**s** ← dump to **s**tring)

```python
import json

# 1. JSON 문자열을 파이썬 딕셔너리로 변환 (Parsing)
json_string = '{"name": "Alice", "age": 25, "city": "Seoul"}'
python_dict = json.loads(json_string)

print("--- json.loads() 결과 ---")
print(f"타입: {type(python_dict)}")
print(python_dict)
print(f"이름: {python_dict['name']}")

# 2. 파이썬 딕셔너리를 JSON 문자열로 변환 (Serialization)
python_dict_to_serialize = {
    'id': 101, 
    'item': '노트북', 
    'is_available': True
}
# indent=2는 예쁘게 출력하기 위한 옵션입니다.
# ensure_ascii=False는 한글이 깨지지 않도록 보장하는 중요한 옵션입니다.
json_string_from_dict = json.dumps(python_dict_to_serialize, indent=2, ensure_ascii=False)

print("\n--- json.dumps() 결과 ---")
print(f"타입: {type(json_string_from_dict)}")
print(json_string_from_dict)
```

### JSON 연습문제

#### 문제 1 (기초): 키(Key)로 값(Value) 찾기
> 아래 JSON 문자열에서 'name' 값을 추출하여 "Welcome, [name]!" 형식으로 출력하세요.
> ```json
> {"id": "user1", "name": "Alice", "role": "admin"}
> ```

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    import json
    json_data = '{"id": "user1", "name": "Alice", "role": "admin"}'
    data = json.loads(json_data)
    print(f"Welcome, {data['name']}!")
  </code></pre>
</details>

#### 문제 2 (중급): 리스트 순회 및 조건부 접근
> 아래 JSON 데이터는 여러 과일의 정보를 담고 있습니다. `for`문을 사용하여 'color'가 'Red'인 모든 과일의 'name'을 출력하세요.
> ```json
> {
>   "fruits": [
>     {"name": "Apple", "color": "Red", "price": 1500},
>     {"name": "Banana", "color": "Yellow", "price": 1000},
>     {"name": "Cherry", "color": "Red", "price": 3000}
>   ]
> }
> ```

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    import json
    json_data = '''
    {
      "fruits": [
        {"name": "Apple", "color": "Red", "price": 1500},
        {"name": "Banana", "color": "Yellow", "price": 1000},
        {"name": "Cherry", "color": "Red", "price": 3000}
      ]
    }
    '''
    data = json.loads(json_data)
    for fruit in data['fruits']:
        if fruit['color'] == 'Red':
            print(fruit['name'])
  </code></pre>
</details>

#### 문제 3 (응용): 복잡한 데이터 탐색 및 파싱
> 아래는 프로야구 경기 결과 데이터입니다. `for`문과 `if`문을 사용하여 'teams' 리스트에 'LG 트윈스'가 포함된 모든 경기를 찾으세요. 그 다음, 해당 경기의 'scores' 딕셔너리에서 'LG' 팀의 점수를 찾아 "경기 ID [match_id]: LG 점수 [score]" 형식으로 출력하세요.
> ```json
> {
>   "game_results": [
>     {
>       "match_id": "K01",
>       "teams": ["SSG 랜더스", "KT 위즈"],
>       "scores": {"SSG": 3, "KT": 2}
>     },
>     {
>       "match_id": "K02",
>       "teams": ["LG 트윈스", "키움 히어로즈"],
>       "scores": {"LG": 5, "키움": 1}
>     },
>     {
>       "match_id": "K03",
>       "teams": ["두산 베어스", "LG 트윈스"],
>       "scores": {"두산": 4, "LG": 6}
>     }
>   ]
> }
> ```

<details>
  <summary><span class="green-text">정답 보기</span></summary>
  <pre><code class="language-python">
    import json
    json_data = '''
    {
      "game_results": [
        {
          "match_id": "K01",
          "teams": ["SSG 랜더스", "KT 위즈"],
          "scores": {"SSG": 3, "KT": 2}
        },
        {
          "match_id": "K02",
          "teams": ["LG 트윈스", "키움 히어로즈"],
          "scores": {"LG": 5, "키움": 1}
        },
        {
          "match_id": "K03",
          "teams": ["두산 베어스", "LG 트윈스"],
          "scores": {"두산": 4, "LG": 6}
        }
      ]
    }
    '''
    data = json.loads(json_data)
    for game in data['game_results']:
      if 'LG 트윈스' in game['teams']:
        match_id = game['match_id']
        lg_score = game['scores']['LG']
        print(f"경기 ID {match_id}: LG 점수 {lg_score}")
  </code></pre>
</details>

## 2. 파이썬 내장 모듈로 CSV 다루기

파이썬은 CSV 파일을 쉽게 다룰 수 있는 강력한 내장 모듈인 `csv`를 제공합니다.

### CSV 파일 읽기 (`csv.reader`)

`csv.reader`를 사용하면 CSV 파일을 한 줄씩 읽어 각 줄을 리스트로 만들 수 있습니다.

> **예제 CSV 파일 (`weather.csv`)**
> ```csv
> city,date,temperature,humidity
> Seoul,2023-10-27,15,60
> Busan,2023-10-27,18,65
> Incheon,2023-10-27,14,58
> ```

```python
import csv

# 'weather.csv' 파일이 있다고 가정합니다.
# newline='' 옵션은 CSV 파일 처리 시 권장되는 설정입니다.
try:
    with open('weather.csv', 'r', newline='', encoding='utf-8') as file:
        reader = csv.reader(file)
        
        # 헤더(첫 줄) 건너뛰기
        header = next(reader)
        print(f"헤더: {header}")
        
        # 데이터 출력
        for row in reader:
            # row는 문자열 리스트입니다. 예: ['Seoul', '2023-10-27', '15', '60']
            city = row[0]
            temp = int(row[2]) # 숫자로 사용하려면 형 변환 필요
            print(f"{city}의 온도는 {temp}도 입니다.")

except FileNotFoundError:
    print("weather.csv 파일을 찾을 수 없습니다.")
```

### CSV 파일 쓰기 (`csv.writer`)

`csv.writer`를 사용하면 리스트 형태의 데이터를 CSV 파일로 쉽게 저장할 수 있습니다.

```python
import csv

# 저장할 데이터 (리스트의 리스트)
data_to_write = [
    ['name', 'department', 'employee_id'],
    ['Alice', 'Engineering', 101],
    ['Bob', 'Marketing', 102],
    ['Charlie', 'Sales', 103]
]

# 'employees.csv' 파일로 저장
with open('employees.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerows(data_to_write) # 여러 줄을 한 번에 쓰기

print("employees.csv 파일이 생성되었습니다.")
```

### 딕셔너리로 CSV 다루기 (`DictReader`와 `DictWriter`)

데이터를 리스트가 아닌 딕셔너리 형태로 다루면 열 인덱스 대신 헤더 이름을 키로 사용할 수 있어 코드가 더 명확해집니다.

```python
import csv

# DictReader로 읽기
try:
    with open('weather.csv', 'r', newline='', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        print("\n--- DictReader로 읽기 ---")
        for row in reader:
            # row는 딕셔너리입니다. 예: {'city': 'Seoul', 'date': '2023-10-27', ...}
            print(f"{row['city']}의 습도는 {row['humidity']}% 입니다.")
except FileNotFoundError:
    print("weather.csv 파일을 찾을 수 없습니다.")

# DictWriter로 쓰기
data_to_write_dict = [
    {'name': 'Dave', 'department': 'HR', 'employee_id': 104},
    {'name': 'Eve', 'department': 'Engineering', 'employee_id': 105}
]

# 'employees_dict.csv' 파일로 저장
with open('employees_dict.csv', 'w', newline='', encoding='utf-8') as file:
    # 필드 이름(헤더)을 지정해야 합니다.
    fieldnames = ['name', 'department', 'employee_id']
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader() # 헤더 쓰기
    writer.writerows(data_to_write_dict) # 데이터 쓰기

print("employees_dict.csv 파일이 생성되었습니다.")
```

## 3. API로 JSON 데이터 활용하기

로컬 파일을 다루는 방법을 익혔으니, 이제 네트워크를 통해 외부 서버로부터 실시간 데이터를 받아오는 방법을 알아보겠습니다. `requests` 라이브러리를 사용하면 이 과정을 간단하게 처리할 수 있습니다.

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
        
        measure_time = item['dataTime']
        pm10_value = item['pm10Value']
        pm25_value = item['pm25Value']
        
        print(f"--- {STATION_NAME} 대기오염정보 ---")
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