# Creating a Block
## 블록 객체 정의
~~~
Block
- index > 해당 블록의 인덱스
- hash > 해당 블록을 해쉬형태로 바꾼 값
- previousHash > 이전 블록의 해쉬
- data > 데이터
- timestamp > 블록이 만들어진 시간의 timestamp
~~~
## 정의에 따른 블록 구현
~~~
class Block {
	public index: number;
	public hash: string;
	public previousHash: string;
	public data: string;
	public timestamp: number;
	constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
		this.index = index;
		this.hash = hash;
		this.previousHash = previousHash;
		this.data = data;
		this.timestamp = timestamp;
	}
}
~~~
## 기본 블록체인 생성 후 출력해보기
~~~
...
const genesisBlock: Block = new Block(0, '20202023242', '', 'Hello', 123456);

let blockchain: [Block] = [ genesisBlock ];

console.log(blockchain);
~~~
## 블록의 해쉬를 구하는 function in Block Class
~~~
class Block {
    ...
    static calculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
    crypto.SHA256(index + previousHash + timestamp + data).toString();
}
~~~

## 블록과 관련된 간단한 function 구현
~~~
const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
~~~