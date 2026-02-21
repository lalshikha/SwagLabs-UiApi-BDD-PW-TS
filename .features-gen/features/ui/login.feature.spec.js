// Generated from: features\ui\login.feature
import { test } from "../../../fixtures/Fixtures.ts";

test.describe('UI Login Functionality', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('user opens saucedemo application', null, { page }); 
  });
  
  test.describe('Valid user login through UI flow', () => {

    test('Example #1', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-001'] }, async ({ When, Then, And, commonPage, loginPage, resolveTestData }) => { 
      await Then('visual validation passes for username element', null, { commonPage }); 
      await And('visual validation passes for password element', null, { commonPage }); 
      await And('visual validation passes for loginbutton element', null, { commonPage }); 
      await And('visual validation passes for login page', null, { commonPage }); 
      await When('user performs UI login for "testdata.user1"', null, { loginPage, resolveTestData }); 
      await Then('UI login should be successful', null, { loginPage }); 
    });

    test('Example #2', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-001'] }, async ({ When, Then, And, commonPage, loginPage, resolveTestData }) => { 
      await Then('visual validation passes for username element', null, { commonPage }); 
      await And('visual validation passes for password element', null, { commonPage }); 
      await And('visual validation passes for loginbutton element', null, { commonPage }); 
      await And('visual validation passes for login page', null, { commonPage }); 
      await When('user performs UI login for "testdata.user2"', null, { loginPage, resolveTestData }); 
      await Then('UI login should be successful', null, { loginPage }); 
    });

  });

  test('Login should fail when username is blank', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-002'] }, async ({ When, Then, loginPage, page, resolveTestData }) => { 
    await When('user attempts UI login with username "" and password "secret_sauce"', null, { page, resolveTestData }); 
    await Then('UI login should fail with error "Epic sadface: Username is required"', null, { loginPage, resolveTestData }); 
  });

  test('Login should fail when password is blank', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-003'] }, async ({ When, Then, loginPage, page, resolveTestData }) => { 
    await When('user attempts UI login with username "standard_user" and password ""', null, { page, resolveTestData }); 
    await Then('UI login should fail with error "Epic sadface: Password is required"', null, { loginPage, resolveTestData }); 
  });

  test('Login should fail when both username and password are blank', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-004'] }, async ({ When, Then, loginPage, page, resolveTestData }) => { 
    await When('user attempts UI login with username "" and password ""', null, { page, resolveTestData }); 
    await Then('UI login should fail with error "Epic sadface: Username is required"', null, { loginPage, resolveTestData }); 
  });

  test('Login should fail for invalid username', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-005'] }, async ({ When, Then, loginPage, page, resolveTestData }) => { 
    await When('user attempts UI login with username "wrong_user" and password "secret_sauce"', null, { page, resolveTestData }); 
    await Then('UI login should fail with error "Epic sadface: Username and password do not match any user in this service"', null, { loginPage, resolveTestData }); 
  });

  test('Login should fail for invalid password', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-006'] }, async ({ When, Then, loginPage, page, resolveTestData }) => { 
    await When('user attempts UI login with username "standard_user" and password "wrong_password"', null, { page, resolveTestData }); 
    await Then('UI login should fail with error "Epic sadface: Username and password do not match any user in this service"', null, { loginPage, resolveTestData }); 
  });

  test('Login should fail for locked out user', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-007'] }, async ({ When, Then, loginPage, resolveTestData }) => { 
    await When('user performs UI login with locked_out_user credentials', null, { loginPage }); 
    await Then('UI login should fail with error "Epic sadface: Sorry, this user has been locked out."', null, { loginPage, resolveTestData }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\ui\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":18,"tags":["@smoke","@regression","@ui","@login","@TCId-001"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then visual validation passes for username element","stepMatchArguments":[{"group":{"start":29,"value":"username","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for password element","stepMatchArguments":[{"group":{"start":29,"value":"password","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for loginbutton element","stepMatchArguments":[{"group":{"start":29,"value":"loginbutton","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":16,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for login page","stepMatchArguments":[{"group":{"start":29,"value":"login","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":17,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When user performs UI login for \"testdata.user1\"","stepMatchArguments":[{"group":{"start":27,"value":"\"testdata.user1\"","children":[{"start":28,"value":"testdata.user1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then UI login should be successful","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":19,"tags":["@smoke","@regression","@ui","@login","@TCId-001"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then visual validation passes for username element","stepMatchArguments":[{"group":{"start":29,"value":"username","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":23,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for password element","stepMatchArguments":[{"group":{"start":29,"value":"password","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":24,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for loginbutton element","stepMatchArguments":[{"group":{"start":29,"value":"loginbutton","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":25,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for login page","stepMatchArguments":[{"group":{"start":29,"value":"login","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":26,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When user performs UI login for \"testdata.user2\"","stepMatchArguments":[{"group":{"start":27,"value":"\"testdata.user2\"","children":[{"start":28,"value":"testdata.user2","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then UI login should be successful","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":22,"tags":["@smoke","@regression","@ui","@login","@TCId-002"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":37,"value":"\"\"","children":[{"start":38,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":53,"value":"\"secret_sauce\"","children":[{"start":54,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Username is required\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Username is required\"","children":[{"start":33,"value":"Epic sadface: Username is required","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":37,"pickleLine":27,"tags":["@smoke","@regression","@ui","@login","@TCId-003"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"standard_user\" and password \"\"","stepMatchArguments":[{"group":{"start":37,"value":"\"standard_user\"","children":[{"start":38,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":66,"value":"\"\"","children":[{"start":67,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Password is required\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Password is required\"","children":[{"start":33,"value":"Epic sadface: Password is required","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":32,"tags":["@smoke","@regression","@ui","@login","@TCId-004"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"\" and password \"\"","stepMatchArguments":[{"group":{"start":37,"value":"\"\"","children":[{"start":38,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":53,"value":"\"\"","children":[{"start":54,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Username is required\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Username is required\"","children":[{"start":33,"value":"Epic sadface: Username is required","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":47,"pickleLine":37,"tags":["@smoke","@regression","@ui","@login","@TCId-005"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"wrong_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":37,"value":"\"wrong_user\"","children":[{"start":38,"value":"wrong_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":63,"value":"\"secret_sauce\"","children":[{"start":64,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":49,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Username and password do not match any user in this service\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Username and password do not match any user in this service\"","children":[{"start":33,"value":"Epic sadface: Username and password do not match any user in this service","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":52,"pickleLine":42,"tags":["@smoke","@regression","@ui","@login","@TCId-006"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"standard_user\" and password \"wrong_password\"","stepMatchArguments":[{"group":{"start":37,"value":"\"standard_user\"","children":[{"start":38,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":66,"value":"\"wrong_password\"","children":[{"start":67,"value":"wrong_password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Username and password do not match any user in this service\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Username and password do not match any user in this service\"","children":[{"start":33,"value":"Epic sadface: Username and password do not match any user in this service","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":57,"pickleLine":47,"tags":["@smoke","@regression","@ui","@login","@TCId-007"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","isBg":true,"stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When user performs UI login with locked_out_user credentials","stepMatchArguments":[{"group":{"start":28,"value":"locked_out_user","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":59,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Sorry, this user has been locked out.\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Sorry, this user has been locked out.\"","children":[{"start":33,"value":"Epic sadface: Sorry, this user has been locked out.","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end