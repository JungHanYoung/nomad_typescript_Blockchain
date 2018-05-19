interface Human {
	name: string;
	age: number;
	gender: string;
}

const person = {
	name: 'Nicolas',
	age: 44,
	gender: 'male'
};

const sayHi = (person: Human): string => {
	return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!!`;
};

const msg = sayHi(person);

console.log(msg);

export {};
