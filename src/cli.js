import arg from 'arg';
import inquirer from 'inquirer';
import ExchangeRate from './services/exchange_rate_service';
import domain from './confs/domains';
import Actions from './actions/index';

const parseArgumentsIntoOptions = (rawArgs) => {
  const args = arg({
    '--action': String,
    '--domain': String,
    '-a': '--action',
    '-d': '--domain'
  }, {
    argv: rawArgs.slice(2)
  });
  return {
    action: args['--action'],
    domain: args['--domain'],
    params: args._
  }
}

const prompForMissingOptions = async (options) => {
  let action;
  let answers;
  const questions = [];
  if (!options.action) {
    questions.push({
      type: 'list',
      name: 'action',
      message: 'Please choose an action to perform.',
      choices: Object.keys(Actions)
    })
  }

  if (!options.domain) {
    questions.push({
      type: 'list',
      name: 'domain',
      message: 'Please choose which domain you want to perform an action.',
      choices: domain.map(x => x.url)
    })
  }

  if (!options.params.length) {
    questions.push({
      type: 'input',
      name: 'params',
      message: 'Please input parameters for this action, leave blank if not necessary: <params> [<params>...]',
      default: '0',
      when: (answers) => {
        action = Actions[options.action || answers.action];
        return action.requireArgs;
      }
    });
  }

  answers = await inquirer.prompt(questions);
  let params = options.params ? options.params : [];
  if (answers.params && answers.params.length) { params = answers.params.split(/\s/) }
  return {
    ...options,
    action: options.action || answers.action,
    domain: options.domain || answers.domain,
    params: params
  }
}

export const cli = async (args) => {
  let options = parseArgumentsIntoOptions(args);
  options = await prompForMissingOptions(options);
  const action = new Actions[options.action](options);
  await console.log(action.process());
}
