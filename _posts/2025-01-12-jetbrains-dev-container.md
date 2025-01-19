---
title: 👨‍💻 Jetbrains Dev Container&#58; 환경 일관성으로 'It works on my machine'을 해결하자
key: 20250112
tags: IDE
excerpt: JetBrains IntelliJ IDEA에서 Dev Container를 구성하여 개발 환경의 일관성을 유지하고, 프로젝트 팀 간 'It works on my machine' 문제를 해결하는 방법을 알아봅니다.
keywords: "JetBrains, Dev Container, IntelliJ IDEA, Docker, Remote Development, JetBrains IDE, 개발 환경 구성, 환경 일관성, It works on my machine, IntelliJ Dev Container"
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

## Dev Container overview

<span class="red-bold">Dev Container란</span> 도커 컨테이너를 활용하여 <span class="red-bold">개발 환경을 효율적으로 구성</span>할 수 있는 기술입니다.

제가 즐겨 사용하는 Jetbrains의 IDE인 IntelliJ IDEA, Pycharm, RubyMind에서는 Dev Container 기술을 활용하여 프로젝트를 생성, 수정 및 빌드하고 실행합니다.

<span class="blue-bold">Docker Compose</span>를 이용하여 <span class="blue-bold">여러 개의 도커 컨테이너로 구성된 개발 환경</span>을 쉽게 구성하고 관리할 수 있습니다.

## Advantages

Dev Container를 이용하면 다음과 같은 이점을 얻을 수 있습니다:

* <span class="red-bold">환경 일관성(Environment consistency)</span>
  - 새로운 프로젝트를 시작하거나 기존 프로젝트를 마이그레이션할 때, Dev Container는 프로젝트 참여자에게 동일한 설정을 통해서 동일한 환경을 제공합니다. 이로써 애플리케이션이 개인 장비에서 각각 다르게 동작(It works on my machine)하는 문제를 방지할 수 있습니다.
* <span class="red-bold">빠른 환경 구성</span>
  - 개발 환경을 구성하는 작업은 종종 많은 시간이 소요됩니다. Dev Container는 몇 가지 설정 파일과 명령어만을 이용하여 빠르게 개발 환경을 구성할 수 있습니다.
* <span class="red-bold">보안 및 독립성</span>
  - Dev Container는 로컬 운영체제와 완전히 독립되어 실행됩니다. 사용하고 있는 개발 도구와의 호환성 문제 없이 새로운 기술을 시도해 볼 수 있습니다.
* <span class="red-bold">쉬운 유지보수와 업데이트</span>
  - 기존 방식보다 개발 도구와 의존성을 업데이트하는 과정이 단순하고 편리합니다.
* <span class="red-bold">원격 개발</span>
  - 도커 컨테이너는 로컬 머신과 떨어진 원격 머신에서도 실행될 수 있습니다. Dev Container를 사용하여 원격 머신에서 실행되는 도커 컨테이너를 개발 환경으로 연결하여 사용할 수 있습니다.

## Prerequisites

### 1. Jetbrains IDE 설치

아래 주소에 방문하여 필요한 IDE를 설치합니다.

<i>Community Edition에서는 Dev Containers 기능을 제공하지 않습니다.</i>

[www.jetbrains.com](https://www.jetbrains.com/)

### 2. Docker 설치

저는 MacOS를 사용하고 있으며, Docker Desktop을 설치하였습니다.

Colima는 지원되지 않는 것으로 알고 있습니다.

아래 주소에 방문하여 Docker Desktop을 설치합니다.

[www.docker.com](https://www.docker.com/products/docker-desktop/)

## Start Dev Container from IDE welcome screen

여기서는 IntelliJ Ultimate 2024.3 버전을 기준으로 설명합니다.

IntelliJ를 최초로 실행했을 때 나타나는 Welcome to IntelliJ IDEA에서 초기 구성을 시작하겠습니다.

그 외의 방법에 대해서는 공식 문서를 참고하시기 바랍니다.

### 1. Dev Container 설정 파일 작성 및 실행

1. 프로젝트를 생성할 디렉토리 내부에 `.devcontainer` 폴더를 생성합니다. 그리고 폴더 내부에 [`devcontainer.json`](https://containers.dev/implementors/json_reference/) 파일을 생성합니다. 해당 파일을 통해서 실제 Dev Container를 설정합니다.    
``` json
{
      "name"   : "Test Dev Container"
    , "service": "spring-project"
    , "build": { "dockerfile": "Dockerfile" }
    , "remoteUser": "root"
    , "postCreateCommand": "java --version"
    , "customizations"   : { "jetbrains": {"backend": "IntelliJ"} }
} 
```

2. Welcome Screen에서 <span class="red-bold">Remote Development</span> 노드를 클릭합니다.    

3. 선택 가능한 옵션 중에서 Dev Containers를 클릭합니다.
<img src="/images/jetbrains-dev-container-01.png" width="70%;" alt="IntelliJ IDEA Welcome Screen" />

4. 새롭게 열린 페이지가 열립니다. 로컬에서 실행되고 있는 도커 엔진과 자동으로 커넥션을 맺습니다.    
<sub><i>만약 커넥션이 맺어지지 않았다면, 도커 엔진이 제대로 실행되고 있는지 확인하세요.</i></sub>

5. Dev Container에서 사용할 백엔드 IDE를 선택하세요.    
<sub><i>여기에서는 IntelliJ IDEA를 사용합니다.</i></sub>    

6. 상단에 VSC나 로컬에서 사용할 프로젝트를 선택하는 탭이 존재합니다. 이 문서에서는 로컬 프로젝트를 기준으로 설명합니다.

7. `Path to devcontainer.json` 필드에 1번에서 작성한 파일 경로를 입력하고 `Build Container and Continue` 버튼을 클릭하여 실행합니다.    
<img src="/images/jetbrains-dev-container-02.png" width="70%;" alt="IntelliJ IDEA Welcome Screen" />

<br>
<br>
<span style="color: grey; font-weight: 700;">References</span>   
[jetbrains.com](https://www.jetbrains.com/help/idea/connect-to-devcontainer.html)   
[containers.dev](https://containers.dev/implementors/json_reference/#compose-specific)   