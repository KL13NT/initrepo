const cp = require("child_process");
const { promisify } = require("util");

const exec = promisify(cp.exec);

const gpgKeyRegex =
	/sec\s+rsa(2048|4096)\/(?<key>[A-Za-z0-9]+) .+\n .+\n.+(?<email><.+>)/g;

const gpgNullList = [
	{
		name: "Don't set a gpg key",
		value: null,
	},
];

const configureGpg = async (key) => {
	try {
		await exec("git config commit.gpgSign true");
		await exec(`git config user.signingkey ${key}`);
	} catch (error) {
		console.log(
			"❌ An error occured when executing gpg. If you don't have GnuGPG installed make sure to use Git Bash when running the utility."
		);
	}
};

const getGpgKeys = async () => {
	try {
		const gpgKeysBuffer = await exec(
			"gpg --list-secret-keys --keyid-format=long"
		);

		const gpgKeysString = gpgKeysBuffer.stdout.toString();
		const matches = gpgKeysString.matchAll(gpgKeyRegex);

		return Array.from(matches).map((match) => ({
			key: match.groups.key,
			email: match.groups.email,
		}));
	} catch (error) {
		console.log(
			"❌ An error occured when executing gpg. If you don't have GnuGPG installed make sure to use Git Bash when running the utility."
		);

		return [];
	}
};

const getGpgChoices = async () => {
	const keys = await getGpgKeys();

	const choices = keys.map((key) => ({
		name: `${key.key} - ${key.email}`,
		value: key.key,
	}));

	if (choices.length === 0) {
		console.log(
			"❌ You don't have any gpg keys. Read about it in initrepo's documentation."
		);

		return gpgNullList;
	}

	return choices;
};

module.exports = {
	configureGpg,
	getGpgChoices,
};
