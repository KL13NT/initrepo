#!/usr/bin/env node

const inquirer = require("inquirer");
const path = require("path");
const { execSync } = require("child_process");
const { mkdirSync } = require("fs");

const gpgKeyRegex =
	/sec\s+rsa(2048|4096)\/(?<key>[A-Za-z0-9]+) .+\n .+\n.+(?<email><.+>)/g;
const commands = {
	gpgListKeys: "gpg --list-secret-keys --keyid-format=long",
	init: "git init",
	setGpgSigningOn: `git config commit.gpgSign true`,
	setRemote: (remote) => `git remote add origin ${remote}`,
	setUserEmail: (email) => `git config user.email ${email}`,
	setGpgKey: (key) => `git config user.signingkey ${key}`,
};

const gpgKeysOutput = execSync(commands.gpgListKeys).toString();
const matches = gpgKeysOutput.matchAll(gpgKeyRegex);
const gpgKeys = [];

for (const match of matches) {
	gpgKeys.push({
		key: match.groups["key"],
		email: match.groups["email"],
	});
}

inquirer
	.prompt([
		{
			type: "input",
			name: "name",
			message:
				"What is the repo name? (in lowercase, keep this empty to init in cwd)",
			default: "",
			validate: (input) =>
				input.trim().length === 0 && /^[ ]+$/.test(input)
					? "Please enter a valid name"
					: true,
		},
		{
			type: "list",
			name: "user.signingKey",
			message: "Which gpg key do you want to use with this repo?",
			choices: gpgKeys.map((key) => ({
				name: `${key.key} - ${key.email}`,
				value: key.key,
			})),
		},
		{
			type: "input",
			name: "user.email",
			message: "What is the author email for this repo?",
			default: "example@example.com",
		},
		{
			type: "input",
			name: "remote",
			message: "What's the repo's remote? (Ignore if none exist)",
			default: "",
		},
		{
			type: "confirm",
			name: "confirm",
			message: (answers) => {
				const location = !answers.name ? "cwd" : answers.name;

				return `You're initializing in ${location} with the data highlighted above, are you sure?`;
			},
			default: "",
		},
	])
	.then((answers) => {
		if (!answers.confirm) {
			console.log(
				"🛑 Terminating. You may run the utility again to restart initialization."
			);
			return;
		}

		const directory = answers.name
			? path.resolve(process.cwd(), answers.name)
			: process.cwd();

		if (answers.name) {
			mkdirSync(answers.name);
			process.chdir(directory);
		}

		console.log("🚌 Initializing your repo, just a sec!");

		execSync(commands.init);
		execSync(commands.setGpgSigningOn);
		execSync(commands.setUserEmail(answers.user.email));
		execSync(commands.setGpgKey(answers.user.signingKey));

		if (answers.remote) execSync(commands.setRemote(answers.remote));

		console.log(
			"✅ All done. You may run `git fetch origin` whenever you wish to pull the repo. Enjoy! 🎉"
		);
	})
	.catch((error) => {
		if (error.isTtyError) {
			console.log("🛑 Prompt couldn't be rendered in the current environment");
		} else {
			console.log(error);
		}
	});
