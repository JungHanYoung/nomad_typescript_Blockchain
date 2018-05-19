const sayHi = (name, age, gender?): string => {
	return `Hello ${name}, you are ${age}, you are a ${gender}!!`;
};

const msg = sayHi('Nicolas', 44, 'male');

console.log(msg);

export {};
