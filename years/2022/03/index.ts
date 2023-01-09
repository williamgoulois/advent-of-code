import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";

const YEAR = 2022;
const DAY = 3;

// solution path: /Users/williamgoulois/aoc/years/2022/03/index.ts
// data path    : /Users/williamgoulois/aoc/years/2022/03/data.txt
// problem url  : https://adventofcode.com/2022/day/3

function getCommonSubstrings(a: string, b: string) {
	for (let i = 0; i < a.length; i++) {
		if (b.indexOf(a[i]) != -1) {
			return a[i];
		}
	}
	return undefined;
}

function getCommonSubstrings3(a: string, b: string, c: string) {
	for (let i = 0; i < a.length; i++) {
		if (b.indexOf(a[i]) != -1) {
			if (c.indexOf(a[i]) != -1) {
				return a[i];
			}
		}
	}
	return undefined;
}

async function p2022day3_part1(input: string, ...params: any[]) {
	const alpha = Array.from(Array(26))
		.map((_, i) => i + 97)
		.concat(Array.from(Array(26)).map((_, i) => i + 65));
	const alphabet = alpha.map(x => String.fromCharCode(x));
	const alphabetWeightMap = new Map(
		alphabet.map((letter, index) => {
			return [letter, index + 1];
		})
	);

	const lines = input.split("\n");
	let score = 0;
	for (const line of lines) {
		const partOne = line.slice(0, line.length / 2);
		const partTwo = line.slice(line.length / 2, line.length);
		const letter = getCommonSubstrings(partOne, partTwo);
		if (letter !== undefined) {
			score += alphabetWeightMap.get(letter) ?? 0;
		}
	}
	return score;
}

async function p2022day3_part2(input: string, ...params: any[]) {
	const alpha = Array.from(Array(26))
		.map((_, i) => i + 97)
		.concat(Array.from(Array(26)).map((_, i) => i + 65));
	const alphabet = alpha.map(x => String.fromCharCode(x));
	const alphabetWeightMap = new Map(
		alphabet.map((letter, index) => {
			return [letter, index + 1];
		})
	);

	const lines = input.split("\n");
	let score = 0;
	for (let i = 0; i < lines.length; i += 3) {
		const firstLine = lines[i];
		const secondLine = lines[i + 1];
		const thirdLine = lines[i + 2];
		const letter = getCommonSubstrings3(firstLine, secondLine, thirdLine);
		if (letter !== undefined) {
			score += alphabetWeightMap.get(letter) ?? 0;
		}
	}
	return score;
}

async function run() {
	const part1tests: TestCase[] = [
		{
			input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
			extraArgs: [],
			expected: `157`,
		},
	];
	const part2tests: TestCase[] = [
		{
			input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
			extraArgs: [],
			expected: `70`,
		},
	];

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of part1tests) {
			test.logTestResult(testCase, String(await p2022day3_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of part2tests) {
			test.logTestResult(testCase, String(await p2022day3_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2022day3_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now();
	const part2Solution = String(await p2022day3_part2(input));
	const part2After = performance.now();

	logSolution(3, 2022, part1Solution, part2Solution);

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
