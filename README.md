# Classes on Typescript
## 객체지향 타입스크립트
인터페이스에서 확장된 형태.

메소드 및 생성자를 사용할 수 있다.
~~~
class Human {
	public name: string;
	public age: number;
	public gender: string;
	constructor(name: string, age: number, gender: string) {
		this.name = name;
		this.age = age;
		this.gender = gender;
	}
}

const person = new Human('lynn', 18, 'female');

const sayHi = (person: Human): string => {
	return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!!`;
};

const msg = sayHi(person);

console.log(msg);

export {};

~~~