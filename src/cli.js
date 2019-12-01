import arg from 'arg';
import inquirer from 'inquirer';

function parseArgumentsIntoOptions(rawArgs) {
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

async function prompForMissingOptions(options) {
  const questions = [];
  if (!options.action) {
    questions.push({
      type: 'list',
      name: 'action',
      message: 'Please choose an action to perform.',
      choices: ['signup', 'spend', 'redeem']
    })
  }

  if (!options.domain) {
    questions.push({
      type: 'list',
      name: 'domain',
      message: 'Please choose which domain you want to perform an action.',
      choices: [
        'www.shopback.sg',
        'www.shopback.my',
        'www.shopback.co.id',
        'www.shopback.com.tw',
        'www.myshopback.co.th',
        'www.shopback.com',
        'www.shopback.com.au'
      ]
    })
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    action: options.action || answers.action,
    domain: options.domain || answers.domain
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await prompForMissingOptions(options);
  console.log('options', options);
}
