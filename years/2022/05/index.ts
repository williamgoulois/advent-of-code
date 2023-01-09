import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 5;

// solution path: /Users/williamgoulois/aoc/years/2022/05/index.ts
// data path    : /Users/williamgoulois/aoc/years/2022/05/data.txt
// problem url  : https://adventofcode.com/2022/day/5

const create2dArray = (rows: number, columns: number) => [...Array(rows).keys()].map(i => Array(columns));

async function p2022day5_part1(input: string, ...params: any[]) {
	const stacksAndOperations = input.split("\n\n");
	const allStacks = stacksAndOperations[0].split("\n");
	const numberOfStacks = (allStacks[0].length + 1) / 4;
	const stacks = create2dArray(numberOfStacks, 0);
	for (let stackLine = 0; stackLine < allStacks.length - 1; stackLine++) {
		for (let lineIndex = 0, stackIndex = 0; lineIndex < allStacks[stackLine].length; lineIndex += 4, stackIndex++) {
			const letter = allStacks[stackLine][lineIndex + 1];
			if (letter !== " ") {
				stacks[stackIndex].push(letter);
			}
		}
	}

	//perform operations
	const operations = stacksAndOperations[1].split("\n");

	for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
		const operation = operations[operationIndex];

		const parts = operation.split(" ");
		const [_move, piecesToMove, _from, origin, _to, destination] = parts.map(str => parseInt(str));
		for (let pieceIndex = 0; pieceIndex < piecesToMove; pieceIndex++) {
			const piece = stacks[origin - 1].shift();
			stacks[destination - 1].unshift(piece);
		}
	}

	return stacks.reduce((acc, curr) => {
		return `${acc}${curr[0]}`;
	}, "");
}

async function p2022day5_part2(input: string, ...params: any[]) {
	const stacksAndOperations = input.split("\n\n");
	const allStacks = stacksAndOperations[0].split("\n");
	const numberOfStacks = (allStacks[0].length + 1) / 4;
	const stacks = create2dArray(numberOfStacks, 0);
	for (let stackLine = 0; stackLine < allStacks.length - 1; stackLine++) {
		for (let lineIndex = 0, stackIndex = 0; lineIndex < allStacks[stackLine].length; lineIndex += 4, stackIndex++) {
			const letter = allStacks[stackLine][lineIndex + 1];
			if (letter !== " ") {
				stacks[stackIndex].push(letter);
			}
		}
	}

	//perform operations
	const operations = stacksAndOperations[1].split("\n");

	for (let operationIndex = 0; operationIndex < operations.length; operationIndex++) {
		const operation = operations[operationIndex];

		const parts = operation.split(" ");
		const [_move, numberOfPiecesToMove, _from, origin, _to, destination] = parts.map(str => parseInt(str));

		const piecesToMove = stacks[origin - 1].splice(0, numberOfPiecesToMove);
		stacks[destination - 1].splice(0, 0, ...piecesToMove);
	}

	return stacks.reduce((acc, curr) => {
		return `${acc}${curr[0]}`;
	}, "");
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
			expected: `CMZ`,
		},
	];
	const part2tests: TestCase[] = [
		{
			input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
			expected: `MCD`,
		},
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day5_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day5_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day5_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now();
	const part2Solution = String(await p2022day5_part2(input));
	const part2After = performance.now();

	logSolution(5, 2022, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
	log();
}

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});
