const childProcess = require("child_process");
const { mkdir } = require("fs/promises");
const path = require("path");
const { promisify } = require("util");

const exec = promisify(childProcess.exec);

const createDirectory = async (name) => {
	const directory = name ? path.resolve(process.cwd(), name) : process.cwd();

	if (name) {
		await mkdir(name);
		process.chdir(directory);
	}
};

const initRepo = async (email, remote) => {
	console.log("🚌 Initializing your repo, just a sec!");

	await exec("git init");
	await exec(`git config user.email ${email}`);

	if (remote) {
		await exec(`git remote add origin ${remote}`);
	}
};

module.exports = {
	createDirectory,
	initRepo,
};
