import * as crypto from 'crypto-js';
/**
	Block
	- index > 해당 블록의 인덱스
	- hash > 해당 블록을 해쉬형태로 바꾼 값
	- previousHash > 이전 블록의 해쉬
	- data > 데이터
	- timestamp > 블록이 만들어진 시간의 timestamp
 */
class Block {
	public index: number;
	public hash: string;
	public previousHash: string;
	public data: string;
	public timestamp: number;

	static calculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string =>
		crypto.SHA256(index + previousHash + timestamp + data).toString();

	static validateStructure = (aBlock: Block) =>
		typeof aBlock.index === 'number' &&
		typeof aBlock.hash === 'string' &&
		typeof aBlock.previousHash === 'string' &&
		typeof aBlock.data === 'string' &&
		typeof aBlock.timestamp === 'number';

	constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
		this.index = index;
		this.hash = hash;
		this.previousHash = previousHash;
		this.data = data;
		this.timestamp = timestamp;
	}
}

const genesisBlock: Block = new Block(0, '20202023242', '', 'Hello', 123456);

let blockchain: Block[] = [ genesisBlock ];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
	const previousBlock = getLatestBlock();
	const newIndex: number = previousBlock.index + 1;
	const newTimestamp: number = getNewTimeStamp();
	const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
	const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
	addBlock(newBlock);
	return newBlock;
};

const getHashforBlock = (aBlock: Block) =>
	Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean =>
	// 블록 구조
	Block.validateStructure(candidateBlock) &&
	// 인덱스
	previousBlock.index + 1 === candidateBlock.index &&
	// 블록 이전 해쉬
	previousBlock.hash === candidateBlock.previousHash &&
	// 블록 해쉬
	getHashforBlock(candidateBlock) === candidateBlock.hash;

const addBlock = (candidateBlock: Block): void => {
	if (isBlockValid(candidateBlock, getLatestBlock())) {
		blockchain.push(candidateBlock);
	}
};

createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');
createNewBlock('fifth block');

console.log(getBlockchain());

export {};
