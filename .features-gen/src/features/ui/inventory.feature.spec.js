// Generated from: src\features\ui\inventory.feature
import { test } from "../../../../src/fixtures/Fixtures.ts";

test.describe('UI Inventory Functionality', () => {

  test('Verify user can login and access inventory page', { tag: ['@smoke', '@ui', '@regression', '@inventory', '@TCId-Inv001'] }, async ({ Given, When, Then, And, commonPage, loginPage, page, td }) => { 
    await Given('user opens "saucedemoUrl"', null, { page }); 
    await When('user performs UI login with "testdata.username" and "testdata.password"', null, { loginPage, td }); 
    await Then('visual validation passes for "inventory" page', null, { commonPage }); 
    await And('page title should be "Products"', null, { commonPage }); 
    await And('"inventory_hamburgerMenu" should be visible', null, { commonPage }); 
    await And('"inventory_addToCartButton" should be visible', null, { commonPage }); 
  });

});

// == technical section ==

test.beforeAll('BeforeAll Hooks', ({ $runBeforeAllHooks, $workerInfo }) => $runBeforeAllHooks(test, { $workerInfo }, bddFileData));
test.afterAll('AfterAll Hooks', ({ $registerAfterAllHooks, $workerInfo }) => $registerAfterAllHooks(test, { $workerInfo }, bddFileData));
test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('after', { page }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('src\\features\\ui\\inventory.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":5,"tags":["@smoke","@ui","@regression","@inventory","@TCId-Inv001"],"steps":[{"pwStepLine":7,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given user opens \"saucedemoUrl\"","stepMatchArguments":[{"group":{"start":11,"value":"\"saucedemoUrl\"","children":[{"start":12,"value":"saucedemoUrl","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When user performs UI login with \"testdata.username\" and \"testdata.password\"","stepMatchArguments":[{"group":{"start":28,"value":"\"testdata.username\"","children":[{"start":29,"value":"testdata.username","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":52,"value":"\"testdata.password\"","children":[{"start":53,"value":"testdata.password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then visual validation passes for \"inventory\" page","stepMatchArguments":[{"group":{"start":29,"value":"\"inventory\"","children":[{"start":30,"value":"inventory","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And page title should be \"Products\"","stepMatchArguments":[{"group":{"start":21,"value":"\"Products\"","children":[{"start":22,"value":"Products","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And \"inventory_hamburgerMenu\" should be visible","stepMatchArguments":[{"group":{"start":0,"value":"\"inventory_hamburgerMenu\"","children":[{"start":1,"value":"inventory_hamburgerMenu","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And \"inventory_addToCartButton\" should be visible","stepMatchArguments":[{"group":{"start":0,"value":"\"inventory_addToCartButton\"","children":[{"start":1,"value":"inventory_addToCartButton","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end