---
title: 🤑 Lotto 구매 자동화
key: 20230815
tags: 미니프로젝트
excerpt: Python을 사용하여 로또 구매를 자동화하는 튜토리얼로, Anaconda 설정, 스크립트 작성, crontab을 통한 스케줄링 등을 포함하고 있습니다.
keywords: "자동화, 로또, Python, Anaconda, crontab, 스크립트, 스케줄링, Selenium"
---

## 0. 들어가기 전
🛠️ **작업의 순서**   
1. Python 프로그램 작성합니다.
2. crontab에 작업 등록합니다.

✅ **Github Actions vs crontab(Windows: 작업 스케줄러)**   
계정 정보를 특정 서버에 올리는 것이 불안해서 crontab을 사용하기로 결정했습니다.

## 1. Python 프로그램 작성
### 1.1 Anaconda 설치 및 환경구성
1. 아래 링크를 클릭하여 Anaconda 설치 페이지로 이동합니다.   
[🔗Anaconda](https://www.anaconda.com/)   
macOS 설치 시 오류가 발생할 경우 Install for me only 옵션으로 설치를 진행합니다.   
[🔗Installing-on-macOS](https://docs.anaconda.com/free/anaconda/install/mac-os/)

2. 가상환경을 생성합니다.

    ```
    (base) edward@Edwards-MacBook-Pro conda create -n ENVNAME python=VERSION
    (base) edward@Edwards-MacBook-Pro conda activate ENVNAME
    (ENVNAME) edward@Edwards-MacBook-Pro pip install jupyter
    (ENVNAME) edward@Edwards-MacBook-Pro pip install nbconvert
    (ENVNAME) edward@Edwards-MacBook-Pro pip install selenium
    ```

3. Jupyter notebook을 실행하여 코드를 작성합니다.   
번호별 통계 정보를 크롤링([🔗번호별 통계](https://dhlottery.co.kr/gameResult.do?method=statByNumber))하여 번호별로 가중치를 부여했고, 가중치를 기반으로 번호를 선택합니다.   
❗️ Account Info 주석 하단에 계정 정보를 입력하세요.

    ```
    (ENVNAME) edward@Edwards-MacBook-Pro jupyter notebook
    ```

    ```python
    import random
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.support.wait import WebDriverWait
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support import expected_conditions as ec
    from selenium.webdriver.common.keys import Keys

    ###############################
    # Classes
    ###############################
    class Ball:
        def __init__(self, n, w):
            self.number = n
            self.weight = w

    ###############################
    # Functions
    ###############################
    # Common
    def wait_and_click(driver, xpath):
        element = WebDriverWait(driver, 10).until(
            ec.element_to_be_clickable((By.XPATH, xpath))
        ).click()

    def close_pop_ups(main_window):
        new_popup = WebDriverWait(driver, 3).until(ec.new_window_is_opened(main_window))
        windows = driver.window_handles
        for w in windows:
            if w != main_window[0]:
                driver.switch_to.window(w)
                driver.close()
                driver.switch_to.window(main_window[0])

    # Lotto
    def get_num_arr(balls, total_weight):
        result = []
        while result.__len__() != 6:
            r = random.random()
            for b in balls:
                r -= b.weight
                if r < 0 and b not in result:
                    result.append(b)
                    break
        return result

    ###############################
    # Driver Options Settings
    ###############################
    options = Options()
    options.add_argument("headless")
    options.add_argument("--disable-loging")
    options.add_argument("--blink-settings=imagesEnabled=false") # Unloading Images

    ##############################
    # Account Info
    ##############################
    USER_ID = "user_id"
    USER_PW = "user_pw"

    ##############################
    # Create Session
    ##############################
    driver = webdriver.Chrome(options)
    driver.get("https://dhlottery.co.kr/user.do?method=login&returnUrl=")
    main_window = driver.window_handles
    logging.debug("[Main window name is %s..;]" %main_window)
    print("[Main window name is %s..;]" %main_window)
    print("[Create Session Completed..;]")

    ##############################
    # Login Process
    ##############################
    user_id = "/html/body/div[3]/section/div/div[2]/div/form/div/div[1]/fieldset/div[1]/input[1]"
    user_pw = "/html/body/div[3]/section/div/div[2]/div/form/div/div[1]/fieldset/div[1]/input[2]"
    wait_and_click(driver, user_id)
    driver.find_element(By.XPATH, user_id).send_keys(USER_ID)
    driver.find_element(By.XPATH, user_pw).send_keys(USER_PW, Keys.ENTER)
    print("[Login Completed..;]")
    # Close Pop-ups
    close_pop_ups(main_window)

    ##############################
    # Select Numbers
    ##############################
    driver.get("https://dhlottery.co.kr/gameResult.do?method=statByNumber")
    weights = driver.find_elements(By.XPATH, "//*[@id='printTarget']/tbody/tr/td[3]")
    balls = []
    total_weight = 0
    for i in range(0, 45):
        w = int(weights[i].text)
        balls.append(Ball(i + 1, w))
        total_weight += w

    for b in balls:
        b.weight = b.weight / total_weight

    ##############################
    # Buy 6/45 Lotto
    ##############################
    wait_and_click(driver, "//*[@id=\"gnb\"]/ul/li[1]/a")
    driver.find_element(By.XPATH, "//*[@id=\"gnb\"]/ul/li[1]/div/ul/li[1]/a").click()
    # Switch Window
    windows = driver.window_handles
    for w in windows:
        if w != main_window[0]: driver.switch_to.window(w)
    driver.switch_to.frame("ifrm_tab")
    # Execute Script
    script = ""
    for i in range(0, 5):
        selected_balls = get_num_arr(balls, total_weight)
        for ball in selected_balls:
            script += " $('#check645num%s').click();\n " %ball.number
        script += " $('#btnSelectNum').click();\n "
    script += " $('#btnBuy').click();\n "
    driver.execute_script(script)
    wait_and_click(driver, "/html/body/div[4]/div/div[2]/input[1]")
    print("[Complete All tasks]")
    driver.quit()
    ```

4. 스크립트를 실행하기 위해서 .ipynb을 .py로 변환합니다.
    ```
    (ENVNAME) edward@Edwards-MacBook-Pro jupyter nbconvert --to script FILENAME.ipynb
    ```

## 2. crontab 편집

다음 명령어를 실행하여 Python 실행 경로를 얻습니다.   
`(ENVNAME) edward@Edwards-MacBook-Pro which python`   
그리고 아래 명령어를 통해서 crontab을 편집합니다.   
`(ENVNAME) edward@Edwards-MacBook-Pro sudo crontab -e`   
`i`를 입력하면 편집 모드로 변경됩니다.   
Cron Schedule 표현식 작성 후 Python 실행 경로를 붙여넣습니다. 그리고 실행할 파일 경로를 입력합니다.   
`esc` 누르면 편집 모드에서 나오게 되며 `:`를 입력한 뒤 `wq`(저장 및 종료)를 입력하여 편집을 마무리합니다.

```
#  _______________ minute (0 - 59)
# |  _______________ hour (0 - 23)
# | |  _______________ day of the month (1 - 31)
# | | |  _______________ month (1 - 12)
# | | | |  _______________ day of the week (0 - 7)
# | | | | |
# * * * * * command to execute

# 금요일 오후 9시에 실행
0 9 * * 5 anaconda3/envs/ENVNAME/bin/python /Users/edward/auto/lotto.py
```