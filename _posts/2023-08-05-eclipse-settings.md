---
title: 🌐 개발 환경 준비 (Eclipse)
key: 20230805
tags: 도구
---

## **1. JAVA**
### **1.1 Java 설치**

1. **Windows**

- C드라이브에 jdk 폴더 생성 후 jdk.bin 파일을 압축 해제한다.

- 환경 변수를 추가한다.

2. **Mac**

- Homebrew 설치: https://brew.sh/index_ko

- 설치 가능한 버전 검색: `brew install jdk`

- 설치: `brew install openjbk@17` (17버전으로 설치)

## **2. Eclipse**
### **2.1 Eclipse 설치**

- 하단의 페이지에 방문하여 Eclipse를 설치한다.   
✅ *설치 버전에 따라서 다양한 Error가 존재하기 때문에 긴 시간 애를 먹을 수 있다. (삭제 후 다른 버전으로 재설치 권장)*    
[**Eclipse Downloads**](https://www.eclipse.org/downloads/) 👈 클릭!

### **2.2 Eclipse 세팅**

- Eclipse 실행 후 상단 메뉴에서 **Window → Preperences**를 통해 환경설정 창을 연다.

- **General > Workspace : Text file encoding**을 **UTF-8**로 변경한다.

- **General > Content Types : Default encoding** 텍스트 필드에 **UTF-8** 입력 후 **Update**한다.

- **Java > Installed JREs : Add → Standard VM** 버튼을 클릭하여 **JDK 설정 경로**를 잡아준다.

- **Java > Installed JREs > Execution Environments : {설치된 Java 버전}**을 클릭 후 우측에 표시되는 리스트에서 **[perfect match]**하는 **JRE**를 선택한다.

- **Java > Code Style > Code Templates : Comments → Files → Edit**을 클릭하여 하단의 내용을 입력한다.

``` jsx
/************************************************************
 * System Name :
 * Business Name :
 * Program Name :
 * Program Desc :
 *
 * Date Created : ${date}
 * Author :
 * Modifier Date Details
 * ---------- ---------- ---------------------------------
 * ${date}
 * ************************************************************/
```

- **Java > Debug > Step Filtering : Use Step Filters → Select All**을 클릭한다.

- 이클립스 설치 경로로 이동하여 **eclipse.ini 파일을 편집**한다.   
✅ *STS의 경우에는 STS.ini 파일을 편집한다*

``` jsx
...
(수정)
-vm
C:\jdk\jdk-11.0.16.1\bin\javaw.exe
...
(하단 - 추가)
-Duser.name="BLSC"
```