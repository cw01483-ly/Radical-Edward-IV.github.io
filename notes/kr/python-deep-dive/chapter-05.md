---
layout: article
title: 5. 웹 크롤링
permalink: /notes/kr/python-deep-dive/chapter-05
key: notes
sidebar:
  nav: notes-kr
aside:
  toc: true
excerpt: Python 초급 과정 강의 노트, 웹 크롤링 기초와 심화 기법을 다룹니다.
keywords: "Python, 웹 크롤링, 크롤링, 스크래핑, 웹 페이지 파싱, 웹 페이지 크롤링, 웹 페이지 스크래핑"
---

<style>
    /* 색상 규칙
      빨강: 주의, 경고, 위험 (에러, 치명적 상황)
      파랑: 핵심 개념, 주요 키워드 (클래스, 문법 요소)
      초록: 안전, 좋은 습관, 정답 보기
      노랑: 코드 요소 (함수명, 변수명 등)
    */
    .red-text { color: #D53C41; font-weight: bold; }
    .blue-text { color: #203BB0; font-weight: bold; }
    .green-text { color: #448F52; font-weight: bold; }
    .yellow-code { color: #BD8739; font-weight: bold; }
</style>

![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Python%20DeepDive&reversal=false&textBg=false)

## 1. 웹 크롤링이란?

<figure>
    <img src="/notes/assets/python-deep-dive/chapter-05-02.png" width="100%" alt="웹 크롤링"/>
    <figcaption>웹 크롤링</figcaption>
</figure>

<span class="blue-text">**웹 크롤링**</span>은 웹사이트에서 자동으로 데이터를 수집하는 기술입니다.

- <span class="blue-text">**크롤링(Crawling)**</span>: 웹페이지를 방문하여 데이터를 가져오는 과정
- <span class="blue-text">**스크래핑(Scraping)**</span>: 가져온 데이터에서 필요한 정보만 추출하는 과정

파이썬은 HTTP 요청, 응답 파싱, 데이터 저장을 통해 안정적인 웹 크롤링을 구현할 수 있습니다.

### 웹 크롤링의 기본 흐름

<figure>
    <img src="/notes/assets/python-deep-dive/chapter-05-01.png" width="100%" alt="웹 크롤링의 기본 흐름"/>
    <figcaption>웹 크롤링의 기본 흐름</figcaption>
</figure>

## 2. 웹 크롤링의 법적 제약

웹 크롤링에는 법적 제약이 존재합니다.

> **정보통신망법 제48조 정보통신망 침해 행위 금지**  
> "누구든지 정당한 접근 권한 없이 또는 허용된 접근 권한을 넘어 정보통신망에 침입해서는 안 된다."

### 준수 사항

- <span class="green-text">**목적 제한**</span>: 개인 학습·연구 목적으로 제한, 상업적 이용 시 저작권 주의
- <span class="green-text">**사용 범위**</span>: 허용된 범위 내에서만 사용, 악용 금지
- <span class="green-text">**서버 보호**</span>: 과도한 부하 방지를 위한 적절한 요청 간격 유지

## 2. HTML 기초

웹 크롤링을 위해서는 [HTML 구조](https://www.figma.com/ko-kr/community/file/1053304969390475630/basic-structure-of-a-html-page)를 이해하는 것이 필수입니다.

### HTML이란?

<span class="blue-text">**HTML(HyperText Markup Language)**</span>은 웹페이지의 구조와 내용을 정의하는 마크업 언어입니다.

- 웹페이지의 <span class="blue-text">**골격**</span>을 만드는 언어
- <span class="yellow-code">태그(tag)</span>를 사용하여 요소를 정의
- 브라우저가 해석하여 화면에 표시

### HTML 기본 구조

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <style>
      /* 스타일 정의 */
    </style>
    <title>페이지 제목</title>
  </head>
  <body>
    <!-- 실제 내용이 들어가는 부분 -->
  </body>
</html>
```

### 기본 태그

| 태그           | 설명            | 예시                                  |
| -------------- | --------------- | ------------------------------------- |
| `<h1>~<h6>`    | 제목            | `<h1>메인 제목</h1>`                  |
| `<p>`          | 문단            | `<p>문단 내용</p>`                    |
| `<div>`        | 블록 컨테이너   | `<div>구역</div>`                     |
| `<span>`       | 인라인 컨테이너 | `<span>텍스트</span>`                 |
| `<ul>`, `<li>` | 순서 없는 목록  | `<ul><li>항목1</li></ul>`             |
| `<ol>`, `<li>` | 순서 있는 목록  | `<ol><li>항목1</li></ol>`             |
| `<a>`          | 링크            | `<a href="url">링크</a>`              |
| `<img>`        | 이미지          | `<img src="경로" alt="설명">`         |
| `<input>`      | 입력 필드       | `<input type="text" name="username">` |

### 실습: 웹페이지 구조 만들기

다음 HTML 구조를 만들어보세요:

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <title>My Home Page</title>
    <style>
      #logo { font-weight: bold; font-size: 20px; }
      .wrap { display: flex; height: calc(100vh - 60px); }
      .aside { width: 200px; border-right: 1px solid #ddd; padding: 10px; }
      a { display: block; margin: 8px 0; text-decoration: none; color: #333; }
      a:hover { color: blue; }
      .main { flex: 1; padding: 20px; }
    </style>
  </head>
  <body>
    <div>
      <h1 id="logo">My Home Page</h1>
    </div>
    <hr/>
    <div class="wrap">
      <ul class="aside">
        <li class="Home"><a href="#">Home</a></li>
        <li><a href="#">Library</a><ul>
        <li><a href="#">Gallery</a></li>
        <li><a href="#">Notes</a></li>
        <li><a href="#">About</a></li>
      </ul>
      <div class="main">
        <h2>콘텐츠 영역</h2>
        <p>여기에 내용을 넣습니다.</p>
      </div>
    </div>
  </body>
</html>
```

### JavaScript를 이용한 요소 선택

웹 크롤링에서 중요한 요소 선택 방법들:

```javascript
// ID로 선택
document.getElementById("logo");

// 클래스로 선택
document.getElementsByClassName("aside");

// 태그명으로 선택
document.getElementsByTagName("a");

// CSS 선택자로 선택
document.querySelector("#logo"); // ID 선택
document.querySelector(".aside"); // 클래스 선택
document.querySelectorAll('a[class="Home"]'); // 속성 선택

// 복합 선택자
document.querySelector("ul.aside li a"); // 중첩된 요소 선택
```

### 연습 문제

위의 HTML 구조에서 다음 요소들을 선택해보세요:

1. **사이드바의 모든 링크**
2. **로고 제목**
3. **사이드바의 모든 리스트 항목**
4. **메인 콘텐츠 영역**
5. **전체 페이지의 모든 링크**

<details>
    <summary>정답 보기</summary>
    <pre><code class="language-javascript">
        // 1. 사이드바의 모든 링크
        document.querySelectorAll('ul.aside li a')

        // 2. 로고 제목
        document.getElementById('logo')
        // 또는
        document.querySelector('#logo')

        // 3. 사이드바의 모든 리스트 항목
        document.querySelectorAll('ul.aside li')

        // 4. 메인 콘텐츠 영역
        document.querySelector('div.main')

        // 5. 전체 페이지의 모든 링크
        document.querySelectorAll('a')
    </code></pre>
</details>

## 3. requests 라이브러리

<span class="blue-text">**requests**</span>는 Python에서 HTTP 요청을 쉽게 보낼 수 있게 해주는 라이브러리입니다.

### requests 설치

```bash
pip install requests
```

### 기본 사용법

```python
import requests

# GET 요청
response = requests.get('https://example.com')
print(response.status_code)  # 200
print(response.text)         # HTML 내용
```

### 응답 객체 속성

```python
response = requests.get('https://example.com')

print(response.status_code)    # HTTP 상태 코드 (200, 404, 500 등)
print(response.headers)        # 응답 헤더
print(response.text)          # 응답 내용 (문자열)
print(response.content)       # 응답 내용 (바이트)
print(response.json())        # JSON 응답을 딕셔너리로 변환
```

### 헤더 설정

```python
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}
response = requests.get('https://example.com', headers=headers)
```

## 4. BeautifulSoup (bs4) 라이브러리

<span class="blue-text">**BeautifulSoup**</span>은 HTML과 XML 문서를 파싱하고 탐색하기 위한 Python 라이브러리입니다.

### BeautifulSoup 설치

```bash
pip install beautifulsoup4
```

### 기본 사용법

```python
from bs4 import BeautifulSoup
import requests

# 웹페이지 가져오기
response = requests.get('https://example.com')
html = response.text

# BeautifulSoup 객체 생성
soup = BeautifulSoup(html, 'html.parser')

# 요소 찾기
title = soup.find('title')
print(title.text)  # 페이지 제목
```

### 주요 메서드

#### 요소 찾기

```python
# 첫 번째 요소 찾기
soup.find('div')                    # 첫 번째 div 태그
soup.find('div', class_='content')  # class가 'content'인 첫 번째 div
soup.find('div', id='main')         # id가 'main'인 첫 번째 div

# 모든 요소 찾기
soup.find_all('a')                  # 모든 a 태그
soup.find_all('div', class_='item') # class가 'item'인 모든 div
```

#### CSS 선택자 사용

```python
# CSS 선택자로 요소 찾기
soup.select('div.content')          # class가 'content'인 div
soup.select('#main')                # id가 'main'인 요소
soup.select('ul li a')              # ul 안의 li 안의 a 태그
soup.select('div > p')              # div의 직접 자식 p 태그
```

#### 텍스트와 속성 추출

```python
# 텍스트 추출
element = soup.find('h1')
print(element.text)        # 태그 안의 텍스트
print(element.get_text())  # 같은 결과

# 속성 추출
link = soup.find('a')
print(link['href'])        # href 속성 값
print(link.get('href'))    # 같은 결과 (속성이 없으면 None 반환)
```

### 실습 예제

```python
import requests
from bs4 import BeautifulSoup

# 웹페이지 가져오기
url = 'https://www.melon.com/chart/'
header = {'User-Agent': 'Chrome'}
response = requests.get(url=url, headers=header)

if (response.status_code == 200):
    soup = BeautifulSoup(response.text, 'html.parser')
    print(soup.select('.title')[1].text)
```

## 5. Selenium 라이브러리

<span class="blue-text">**Selenium**</span>은 웹 브라우저를 자동화하는 도구로, JavaScript가 동적으로 생성하는 콘텐츠도 크롤링할 수 있습니다.

### Selenium 설치

```bash
pip install selenium
```

### 기본 사용법

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Chrome 브라우저 실행
driver = webdriver.Chrome(ChromeDriverManager().install())

# 웹페이지 접속
driver.get('https://example.com')

# 요소 찾기
element = driver.find_element(By.ID, 'username')
element.send_keys('test@example.com')

# 브라우저 종료
driver.quit()
```

### 주요 메서드

#### 요소 찾기

```python
# ID로 찾기
driver.find_element(By.ID, 'username')

# 클래스로 찾기
driver.find_element(By.CLASS_NAME, 'content')

# CSS 선택자로 찾기
driver.find_element(By.CSS_SELECTOR, 'div.content')

# XPath로 찾기
driver.find_element(By.XPATH, '//div[@class="content"]')

# 모든 요소 찾기
driver.find_elements(By.TAG_NAME, 'a')
```

#### 요소 조작

```python
# 텍스트 입력
element.send_keys('Hello World')

# 클릭
element.click()

# 텍스트 가져오기
text = element.text

# 속성 가져오기
href = element.get_attribute('href')

# 체크박스/라디오 버튼 선택
element.click()  # 선택/해제
```

### 대기 처리

```python
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 명시적 대기 (최대 10초)
wait = WebDriverWait(driver, 10)
element = wait.until(EC.presence_of_element_located((By.ID, 'dynamic-content')))

# 조건별 대기
wait.until(EC.element_to_be_clickable((By.ID, 'button')))
wait.until(EC.text_to_be_present_in_element((By.ID, 'status'), '완료'))
```

### 실습 예제

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# 브라우저 실행
driver = webdriver.Chrome(ChromeDriverManager().install())

try:
    # 네이버 접속
    driver.get('https://www.naver.com')
    
    # 검색창에 텍스트 입력
    search_box = driver.find_element(By.ID, 'query')
    search_box.send_keys('파이썬 크롤링')
    
    # 검색 버튼 클릭
    search_button = driver.find_element(By.ID, 'search_btn')
    search_button.click()
    
    # 검색 결과 대기
    wait = WebDriverWait(driver, 10)
    results = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.result')))
    
    # 검색 결과 출력
    for result in results[:5]:  # 상위 5개만
        title = result.find_element(By.CSS_SELECTOR, '.title').text
        print(title)

finally:
    driver.quit()
```

### requests + BeautifulSoup vs Selenium

| 특징 | requests + BeautifulSoup | Selenium |
|------|-------------------------|----------|
| **속도** | 빠름 | 느림 |
| **JavaScript** | 처리 불가 | 처리 가능 |
| **리소스 사용** | 적음 | 많음 |
| **사용 용도** | 정적 콘텐츠 | 동적 콘텐츠 |
| **설치 복잡도** | 간단 | 복잡 (WebDriver 필요) |

### 언제 Selenium을 사용할까?

- <span class="green-text">**JavaScript로 동적 생성되는 콘텐츠**</span> 크롤링
- <span class="green-text">**로그인이 필요한 사이트**</span> 크롤링
- <span class="green-text">**사용자 상호작용이 필요한**</span> 웹사이트
- <span class="green-text">**SPA(Single Page Application)**</span> 크롤링