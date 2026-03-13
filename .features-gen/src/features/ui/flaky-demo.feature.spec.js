// Generated from: src\features\ui\flaky-demo.feature
import { test } from "../../../../src/fixtures/Fixtures.ts";

test.describe('Flaky selector self-heal demo', () => {

  test('Login button selector drift is self-healed', { tag: ['@ui', '@smoke', '@selfheal', '@demo'] }, async ({ Given, When, Then, And, commonPage, page, td }) => { 
    await Given('user opens "saucedemoUrl"', null, { page }); 
    await And('"login_username" should be visible', null, { commonPage }); 
    await When('user enters "standard_user" in "login_username"', null, { commonPage, td }); 
    await And('user enters "secret_sauce" in "login_password"', null, { commonPage, td }); 
    await And('user clicks "login_loginButton"', null, { commonPage }); 
    await Then('"inventory_page" should be visible', null, { commonPage }); 
  });

});

// == technical section ==

test.beforeAll('BeforeAll Hooks', ({ $runBeforeAllHooks, $workerInfo }) => $runBeforeAllHooks(test, { $workerInfo }, bddFileData));
test.afterAll('AfterAll Hooks', ({ $registerAfterAllHooks, $workerInfo }) => $registerAfterAllHooks(test, { $workerInfo }, bddFileData));
test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('after', { page }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\ui\\flaky-demo.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@ui","@smoke","@selfheal","@demo"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens \"saucedemoUrl\"","stepMatchArguments":[{"group":{"start":11,"value":"\"saucedemoUrl\"","children":[{"start":12,"value":"saucedemoUrl","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"And \"login_username\" should be visible","stepMatchArguments":[{"group":{"start":0,"value":"\"login_username\"","children":[{"start":1,"value":"login_username","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When user enters \"standard_user\" in \"login_username\"","stepMatchArguments":[{"group":{"start":12,"value":"\"standard_user\"","children":[{"start":13,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":31,"value":"\"login_username\"","children":[{"start":32,"value":"login_username","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And user enters \"secret_sauce\" in \"login_password\"","stepMatchArguments":[{"group":{"start":12,"value":"\"secret_sauce\"","children":[{"start":13,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":30,"value":"\"login_password\"","children":[{"start":31,"value":"login_password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And user clicks \"login_loginButton\"","stepMatchArguments":[{"group":{"start":12,"value":"\"login_loginButton\"","children":[{"start":13,"value":"login_loginButton","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then \"inventory_page\" should be visible","stepMatchArguments":[{"group":{"start":0,"value":"\"inventory_page\"","children":[{"start":1,"value":"inventory_page","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end