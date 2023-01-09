import _, { parseInt } from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 4;

// solution path: /Users/williamgoulois/aoc/years/2022/04/index.ts
// data path    : /Users/williamgoulois/aoc/years/2022/04/data.txt
// problem url  : https://adventofcode.com/2022/day/4

function isContained(inputA: number, inputB: number, a: number, b: number) {
	return inputA >= a && inputB <= b;
}

function isContained2(input: number, a: number, b: number) {
	return input >= a && input <= b;
}

async function p2022day4_part1(input: string, ...params: any[]) {
	const lines = input.split("\n");
	let total = 0;
	for (const line of lines) {
		const parts = line.split(",");
		const leftElf = parts[0].split("-");
		const rightElf = parts[1].split("-");
		const leftElfStart = parseInt(leftElf[0], 10);
		const leftElfEnd = parseInt(leftElf[1], 10);
		const rightElfStart = parseInt(rightElf[0], 10);
		const rightElfEnd = parseInt(rightElf[1], 10);
		if (isContained(leftElfStart, leftElfEnd, rightElfStart, rightElfEnd)) {
			total += 1;
		} else if (isContained(rightElfStart, rightElfEnd, leftElfStart, leftElfEnd)) {
			total += 1;
		}
	}
	return total;
}

async function p2022day4_part2(input: string, ...params: any[]) {
	const lines = input.split("\n");
	let total = 0;
	for (const line of lines) {
		const parts = line.split(",");
		const leftElf = parts[0].split("-");
		const rightElf = parts[1].split("-");
		const leftElfStart = parseInt(leftElf[0], 10);
		const leftElfEnd = parseInt(leftElf[1], 10);
		const rightElfStart = parseInt(rightElf[0], 10);
		const rightElfEnd = parseInt(rightElf[1], 10);
		if (isContained2(leftElfStart, rightElfStart, rightElfEnd)) {
			total += 1;
		} else if (isContained2(leftElfEnd, rightElfStart, rightElfEnd)) {
			total += 1;
		} else if (isContained2(rightElfStart, leftElfStart, leftElfEnd)) {
			total += 1;
		} else if (isContained2(rightElfEnd, leftElfStart, leftElfEnd)) {
			total += 1;
		}
	}
	return total;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
			expected: `2`,
		},
	];
	const part2tests: TestCase[] = [
		{
			input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
			expected: `4`,
		},
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day4_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day4_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day4_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now();
	const part2Solution = String(await p2022day4_part2(input));
	const part2After = performance.now();

	logSolution(4, 2022, part1Solution, part2Solution);

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
