# Type Of Variable
### Typescript는 변수마다 타입을 지정해 줄 수 있는데..
~~~
const sayHi = (name: string, age: number, gender?: string) => {
	console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
};

sayHi('Nicolas', 44, 'male');

export {};
~~~
### sayHi란 함수의 매개변수마다 유형을 지정해 줄 수 있다.
~~~
// error
sayHi('Nicolas', '44', 'male');
~~~
### 이어서 sayHi 함수가 어떤 유형의 값을 돌려줄지 지정할 수 있다.
~~~
// return nothing
const sayHi = (name: string, age: number, gender?: string): void => {
    ...
}
// return string
const sayHi = (name: string, age: number, gender?: string): string => {
    return `Hello ${name}, you are ${age}, you are a ${gender}`;
}
~~~
---
---
## Additional
### 새로고침 시 자동 실행
#### 구조 변경
~~~
Project
- dist
-- index.js > compiled
- src
-- index.ts > Before compile
...
~~~
~~~
// tsconfig.json
{
    "compilerOptions": {
        ...
        "outDir": "dist"
    },
    "include": ["src/index.ts"],
    ...
}
~~~
### tsc-watch 모듈
> yarn add -D tsc-watch
~~~
// package.json
{
    ...
    "scripts": {
        "start": "tsc-watch --onSuccess \" node dist/index.js \" "
    }
}
~~~