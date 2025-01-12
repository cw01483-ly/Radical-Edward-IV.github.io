# Python 공식 이미지 사용
FROM ruby:3.2-bullseye

# 기본 설정
WORKDIR /workspace

RUN apt-get update

RUN apt-get install -y git

RUN apt-get clean

# 추가 패키지 설치
RUN gem install jekyll bundler