// Generated from: features\ui\login.feature
import { test } from "../../../fixtures/Fixtures";

test.describe('UI Login Functionality', () => {

  test.describe('Valid user login through UI flow', () => {

    test('Example #1', { tag: ['@smoke', '@regression', '@ui', '@TCId-001', '@login'] }, async ({ Given, When, Then, And, commonPage, loginPage, page }) => { 
      await Given('user opens saucedemo application', null, { page }); 
      await Then('visual validation passes for username element', null, { commonPage }); 
      await And('visual validation passes for password element', null, { commonPage }); 
      await And('visual validation passes for loginbutton element', null, { commonPage }); 
      await And('visual validation passes for login page', null, { commonPage }); 
      await When('user performs UI login with standard_user credentials', null, { loginPage }); 
      await Then('UI login should be successful', null, { loginPage }); 
    });

    test('Example #2', { tag: ['@smoke', '@regression', '@ui', '@TCId-001', '@login'] }, async ({ Given, When, Then, And, commonPage, loginPage, page }) => { 
      await Given('user opens saucedemo application', null, { page }); 
      await Then('visual validation passes for username element', null, { commonPage }); 
      await And('visual validation passes for password element', null, { commonPage }); 
      await And('visual validation passes for loginbutton element', null, { commonPage }); 
      await And('visual validation passes for login page', null, { commonPage }); 
      await When('user performs UI login with visual_user credentials', null, { loginPage }); 
      await Then('UI login should be successful', null, { loginPage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\ui\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":15,"tags":["@smoke","@regression","@ui","@TCId-001","@login"],"steps":[{"pwStepLine":9,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then visual validation passes for username element","stepMatchArguments":[{"group":{"start":29,"value":"username","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for password element","stepMatchArguments":[{"group":{"start":29,"value":"password","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for loginbutton element","stepMatchArguments":[{"group":{"start":29,"value":"loginbutton","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for login page","stepMatchArguments":[{"group":{"start":29,"value":"login","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When user performs UI login with standard_user credentials","stepMatchArguments":[{"group":{"start":28,"value":"standard_user","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then UI login should be successful","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":16,"tags":["@smoke","@regression","@ui","@TCId-001","@login"],"steps":[{"pwStepLine":19,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then visual validation passes for username element","stepMatchArguments":[{"group":{"start":29,"value":"username","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":21,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for password element","stepMatchArguments":[{"group":{"start":29,"value":"password","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":22,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for loginbutton element","stepMatchArguments":[{"group":{"start":29,"value":"loginbutton","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":23,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for login page","stepMatchArguments":[{"group":{"start":29,"value":"login","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":24,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When user performs UI login with visual_user credentials","stepMatchArguments":[{"group":{"start":28,"value":"visual_user","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":25,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then UI login should be successful","stepMatchArguments":[]}]},
]; // bdd-data-end