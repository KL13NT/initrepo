const { getGpgChoices } = require("./gpg");

const validateName = (input) => {
	if (input.trim().length === 0 && /^[ ]+$/.test(input)) {
		return "Please enter a valid name";
	}

	return true;
};

const getQuestionList = async () => {
	const gpgKeys = await getGpgChoices();

	return [
		{
			type: "input",
			name: "name",
			message:
				"What is the repo name? (in lowercase, keep this empty to init in cwd)",
			default: "",
			validate: validateName,
		},
		{
			type: "list",
			name: "user.signingKey",
			message: "Which gpg key do you want to use with this repo?",
			choices: gpgKeys,
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
	];
};

module.exports = { getQuestionList };
