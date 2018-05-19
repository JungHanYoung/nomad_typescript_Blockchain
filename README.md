# Typechain

Learning Typescript by making a Blockchain with it


# Typescript 개발환경

## 1. typescript 설치
~~~
npm install -g typescript
또는
yarn global add typescript
~~~

## 2. tsconfig.json 생성

~~~
// tsconfig.json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES2015",
        "sourceMap": true
    },
    "include": [
        "index.ts"
    ],
    "exclude": [
        "node_modules"
    ]
}
~~~

> compilerOptions
>> module - 모듈 설정
>>
>> target - 컴파일 결과물 ECMAScript 버전 설정
>>
>> sourceMap - 소스맵(*.map) 생성 여부
>
> include - 컴파일할 typescript 파일 지정
>
> exclude - 컴파일에 제외할 파일 및 디렉토리

## 3. typescript 명령어 실행
~~~
// 컴파일 전
Project
- package.json
- tsconfig.json
- index.ts
~~~
~~~
// 컴파일 실행.
tsc
~~~
~~~
// 컴파일 후
Project
- package.json
- tsconfig.json
- index.ts
- index.js
- index.js.map
~~~
