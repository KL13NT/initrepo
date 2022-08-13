#!/usr/bin/env node

const inquirer = require("inquirer");
const { configureGpg } = require("./lib/gpg");
const { getQuestionList } = require("./lib/inquirer");
const { initRepo, createDirectory } = require("./lib/git");

(async () => {
	try {
		const questions = await getQuestionList();
		const answers = await inquirer.prompt(questions);

		if (!answers.confirm) {
			console.log(
				"🛑 Terminating. You may run the utility again to restart initialization."
			);
			return;
		}

		await createDirectory(answers.name);
		await initRepo(answers.user.email, answers.remote);

		if (answers.user.signingKey) {
			await configureGpg(answers.user.signingKey);
		} else {
			console.log("❌ Ignoring gpg setting.");
		}

		console.log(
			"✅ All done. You may add more remotes by running `git remote add [name]`. Remote `origin` is setup by default if you added a link for it. Make sure to pull a branch! Enjoy! 🎉"
		);
	} catch (error) {
		if (error.isTtyError) {
			console.log("🛑 Prompt couldn't be rendered in the current environment");
		} else {
			console.log(error.message);
		}
	}
})();
