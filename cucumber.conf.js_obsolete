module.exports = {
  default: {
    requireModule: ['ts-node/register'],

    require: [
      'fixtures/**/*.ts',
      'hooks/*.ts',
      'step-definitions/**/*.ts'
    ],

    format: [
      'progress',
      'json:reports/cucumber-report.json'
    ],

    paths: [
      'features/**/*.feature'
    ],

    parallel: 3,
    timeout: 60000
  }
};
