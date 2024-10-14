const core = require("@actions/core");
const github = require("@actions/github");

const jiraPrefix = core.getInput("jira-prefix");

async function run() {
  try {
    const prTitle = github.context.payload.pull_request.title;
    const prBody = github.context.payload.pull_request.body;

    let regex = new RegExp(`(^(\\[(${jiraPrefix})-[0-9]+\\]|\\[NO-ISSUE\\]|DEPLOY|Revert)|\\(deps\\): bump)`);

    console.log('TITLE: ' + prTitle)
    console.log('BODY: ' + prTitle)
    
    if (!regex.test(prTitle)) {
      console.log('Jira Issue Key missing in PR title')
    }
    if (!regex.test(prBody)) {
      console.log('Jira Issue Key missing in PR title or description')
    }
    if (!regex.test(prTitle) && !regex.test(prBody)) {
      core.setFailed("Jira Issue Key missing in PR title or description.");
      return;
    } 
  } catch (error) {
    core.info(error);
  }
}

run();
