import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 6;

// solution path: /Users/williamgoulois/aoc/years/2022/06/index.ts
// data path    : /Users/williamgoulois/aoc/years/2022/06/data.txt
// problem url  : https://adventofcode.com/2022/day/6

async function p2022day6_part1(input: string, ...params: any[]) {
	for (let i = 0; i < input.length; ) {
		const end = i + 4 < input.length ? i + 4 : input.length - 1;
		const group4Letters = input.slice(i, end);
		const presentLetters = new Set();
		for (let j = 0; j < group4Letters.length; j++) {
			const letter = group4Letters[j];
			presentLetters.add(letter);
		}
		if (presentLetters.size === 4) {
			return end;
		} else {
			i++;
		}
	}
}

async function p2022day6_part2(input: string, ...params: any[]) {
	for (let i = 0; i < input.length; ) {
		const end = i + 14 < input.length ? i + 14 : input.length - 1;
		const group4Letters = input.slice(i, end);
		const presentLetters = new Set();
		for (let j = 0; j < group4Letters.length; j++) {
			const letter = group4Letters[j];
			presentLetters.add(letter);
		}
		if (presentLetters.size === 14) {
			return end;
		} else {
			i++;
		}
	}
}

async function run() {
	const part1tests: TestCase[] = [
		{ input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`, expected: `7` },
		{ input: `bvwbjplbgvbhsrlpgdmjqwftvncz`, expected: `5` },
		{ input: `nppdvjthqldpwncqszvftbrmjlhg`, expected: `6` },
		{ input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, expected: `10` },
		{ input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, expected: `11` },
	];
	const part2tests: TestCase[] = [
		{ input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`, expected: `19` },
		{ input: `bvwbjplbgvbhsrlpgdmjqwftvncz`, expected: `23` },
		{ input: `nppdvjthqldpwncqszvftbrmjlhg`, expected: `23` },
		{ input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`, expected: `29` },
		{ input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`, expected: `26` },
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day6_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day6_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day6_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now();
	const part2Solution = String(await p2022day6_part2(input));
	const part2After = performance.now();

	logSolution(6, 2022, part1Solution, part2Solution);

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
