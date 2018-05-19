# Typechain

Learning Typescript by making a Blockchain with it


# Typed Language
~~~
const name = "Nicolas",
    age = 24,
    gender = "male";

const sayHi = (name, age, gender) => {
    console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
}

sayHi(name, age, gender);

export {};
~~~
~~~
// yarn start

Hello Nicolas, you are 24, you are a male
~~~
만약 sayHi(name, age)로 호출한다면

컴파일 에러가 발생.
~~~
... elip
sayHi(name, age);
~~~
~~~
// yarn start
index.ts(9,1): error TS2554: Expected 3 arguments, but got 2.
error An unexpected error occurred: "Command failed.
~~~

이는 Typescript가 해당 함수의 arg가 3개여야 한다는 것을 체크하기 때문.

해결을 위해선?

~~~
... elip
const sayHi = (name, age, gender?) => {
    ...
}
~~~
~~~
// yarn start
Hello Nicolas, you are 24, you are a undefined
~~~
gender에 ?를 붙이면 선택적인 arg가 되어 코드가 실행된다.
