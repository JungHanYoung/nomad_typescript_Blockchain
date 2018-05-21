# Creating a Block
## 블록 객체 정의
~~~
Block
- index 		> 해당 블록의 인덱스
- hash 			> 해당 블록을 해쉬형태로 바꾼 값
- previousHash 		> 이전 블록의 해쉬
- data 			> 데이터
- timestamp 
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
* crypto-js: 해쉬 암호화
~~~
class Block {
    ...
    static calculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
    crypto.SHA256(index + previousHash + timestamp + data).toString();
}
~~~
## 블록과 관련된 간단한 function 구현
~~~
// 전체 블록체인을 가져오기
const getBlockchain = (): Block[] => blockchain;

// 제일 최근에 만들어진 블록체인을 가져오기
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

// 타임스탬프 가져오기
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
~~~
## 새로운 블록을 리턴하는 function
~~~
// 새로운 블록
const createNewBlock = (data: string) => {
	const previousBlock = getLatestBlock();
	const newIndex: number = previousBlock.index;
	const newTimestamp = getNewTimeStamp();
	const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
	const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
	return newBlock;
}
~~~
### 블록을 만들기 위해선

**Index**, **계산된 Hash**, **가장 최근의 Hash**, **Data**, **Timestamp** 필요

이에 맞게 준비하여 **new Block()**

---
## 블록 유효성 검사
* 검사 목록
	* 블록 구조
	* 인덱스
	* 블록 이전 해쉬
	* 블록 해쉬
~~~
class Block {
	...
	// 블록 구조 검사
	static validateStructure = (aBlock: Block): boolean =>
		typeof aBlock.index === "number" &&
		typeof aBlock.hash === "string" &&
		typeof aBlock.previousHash === "string" &&
		typeof aBlock.data === "string" &&
		typeof aBlock.timestamp === "number"
}

// 블록의 해쉬 구하기
const getHashforBlock = (aBlock: Block) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data)

// 블록 유효성 검사
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => 
	// 블록 구조
	Block.validateStructure(candidateBlock) &&
	// 인덱스
	previousBlock.index + 1 === candidateBlock.index &&
	// 블록 이전 해쉬
	previousBlock.hash === candidateBlock.previousHash &&
	// 블록 해쉬
	getHashforBlock(candidateBlock) === candidateBlock.hash
~~~
## 블록 체인에 블록 추가하기
1. 블록을 만들고
2. 만든 블록을 유효성 검사
3. 블록체인에 푸쉬
~~~
// 블록 푸쉬 function
const addBlock = (candidateBlock: Block): void => {
	// 블록 검사
	if(isBlockValid(candidateBlock, getLatestBlock())) {
		// 블록체인에 푸쉬
		blockchain.push(candidateBlock);
	}
}
// createNewBlock에 addBlock추가
const createNewBlock = (data: string): Block => {
	const previousBlock = getLatestBlock();
	const newIndex: number = previousBlock.index + 1;
	const newTimestamp: number = getNewTimeStamp();
	const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
	const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
	addBlock(newBlock);
	return newBlock;
};
~~~
## 결론
~~~
...
createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');
createNewBlock('fifth block');

console.log(getBlockchain());
~~~
~~~
> yarn start

[ Block {
    index: 0,
    hash: '20202023242',
    previousHash: '',
    data: 'Hello',
    timestamp: 123456 },
  Block {
    index: 1,
    hash: '5d9ae21d78f114364920b2280ef38208d890f0a87f00a04330c4e4318acc32fb',
    previousHash: '20202023242',
    data: 'second block',
    timestamp: 1526865259 },
  Block {
    index: 2,
    hash: 'b5b9e07abb69682743c79b15bf2032f4c8ed8b57e9498f96da4a6881f00e3206',
    previousHash: '5d9ae21d78f114364920b2280ef38208d890f0a87f00a04330c4e4318acc32fb',
    data: 'third block',
    timestamp: 1526865259 },
  Block {
    index: 3,
    hash: 'f951c89e9919070639d4e7591091c988ebb25337bf3998504025b294ed49beaa',
    previousHash: 'b5b9e07abb69682743c79b15bf2032f4c8ed8b57e9498f96da4a6881f00e3206',
    data: 'fourth block',
    timestamp: 1526865259 },
  Block {
    index: 4,
    hash: 'a9a7943916a255eb181c717ee44a11ed3ed8237d54f72f366753576ea1b28fcd',
    previousHash: 'f951c89e9919070639d4e7591091c988ebb25337bf3998504025b294ed49beaa',
    data: 'fifth block',
    timestamp: 1526865259 } ]
~~~

