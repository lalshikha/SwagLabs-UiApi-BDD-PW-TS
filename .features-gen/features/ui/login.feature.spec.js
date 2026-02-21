// Generated from: features\ui\login.feature
import { test } from "../../../fixtures/Fixtures.ts";

test.describe('UI Login Functionality', () => {

  test.describe('Valid user login through UI flow', () => {

    test('Example #1', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-001'] }, async ({ Given, When, Then, And, commonPage, loginPage, page }) => { 
      await Given('user opens saucedemo application', null, { page }); 
      await Then('visual validation passes for username element', null, { commonPage }); 
      await And('visual validation passes for password element', null, { commonPage }); 
      await And('visual validation passes for loginbutton element', null, { commonPage }); 
      await And('visual validation passes for login page', null, { commonPage }); 
      await When('user performs UI login with standard_user credentials', null, { loginPage }); 
      await Then('UI login should be successful', null, { loginPage }); 
    });

    test('Example #2', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-001'] }, async ({ Given, When, Then, And, commonPage, loginPage, page }) => { 
      await Given('user opens saucedemo application', null, { page }); 
      await Then('visual validation passes for username element', null, { commonPage }); 
      await And('visual validation passes for password element', null, { commonPage }); 
      await And('visual validation passes for loginbutton element', null, { commonPage }); 
      await And('visual validation passes for login page', null, { commonPage }); 
      await When('user performs UI login with visual_user credentials', null, { loginPage }); 
      await Then('UI login should be successful', null, { loginPage }); 
    });

  });

  test('Login should fail when username is blank', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-002'] }, async ({ Given, When, Then, loginPage, page }) => { 
    await Given('user opens saucedemo application', null, { page }); 
    await When('user attempts UI login with username "" and password "secret_sauce"', null, { page }); 
    await Then('UI login should fail with error "Epic sadface: Username is required"', null, { loginPage }); 
  });

  test('Login should fail when password is blank', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-003'] }, async ({ Given, When, Then, loginPage, page }) => { 
    await Given('user opens saucedemo application', null, { page }); 
    await When('user attempts UI login with username "standard_user" and password ""', null, { page }); 
    await Then('UI login should fail with error "Epic sadface: Password is required"', null, { loginPage }); 
  });

  test('Login should fail when both username and password are blank', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-004'] }, async ({ Given, When, Then, loginPage, page }) => { 
    await Given('user opens saucedemo application', null, { page }); 
    await When('user attempts UI login with username "" and password ""', null, { page }); 
    await Then('UI login should fail with error "Epic sadface: Username is required"', null, { loginPage }); 
  });

  test('Login should fail for invalid username', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-005'] }, async ({ Given, When, Then, loginPage, page }) => { 
    await Given('user opens saucedemo application', null, { page }); 
    await When('user attempts UI login with username "wrong_user" and password "secret_sauce"', null, { page }); 
    await Then('UI login should fail with error "Epic sadface: Username and password do not match any user in this service"', null, { loginPage }); 
  });

  test('Login should fail for invalid password', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-006'] }, async ({ Given, When, Then, loginPage, page }) => { 
    await Given('user opens saucedemo application', null, { page }); 
    await When('user attempts UI login with username "standard_user" and password "wrong_password"', null, { page }); 
    await Then('UI login should fail with error "Epic sadface: Username and password do not match any user in this service"', null, { loginPage }); 
  });

  test('Login should fail for locked out user', { tag: ['@smoke', '@regression', '@ui', '@login', '@TCId-007'] }, async ({ Given, When, Then, loginPage, page }) => { 
    await Given('user opens saucedemo application', null, { page }); 
    await When('user performs UI login with locked_out_user credentials', null, { loginPage }); 
    await Then('UI login should fail with error "Epic sadface: Sorry, this user has been locked out."', null, { loginPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\ui\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":16,"tags":["@smoke","@regression","@ui","@login","@TCId-001"],"steps":[{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then visual validation passes for username element","stepMatchArguments":[{"group":{"start":29,"value":"username","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for password element","stepMatchArguments":[{"group":{"start":29,"value":"password","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for loginbutton element","stepMatchArguments":[{"group":{"start":29,"value":"loginbutton","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for login page","stepMatchArguments":[{"group":{"start":29,"value":"login","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When user performs UI login with standard_user credentials","stepMatchArguments":[{"group":{"start":28,"value":"standard_user","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then UI login should be successful","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":17,"tags":["@smoke","@regression","@ui","@login","@TCId-001"],"steps":[{"pwStepLine":19,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":7,"keywordType":"Outcome","textWithKeyword":"Then visual validation passes for username element","stepMatchArguments":[{"group":{"start":29,"value":"username","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":21,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for password element","stepMatchArguments":[{"group":{"start":29,"value":"password","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":22,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for loginbutton element","stepMatchArguments":[{"group":{"start":29,"value":"loginbutton","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":23,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"And visual validation passes for login page","stepMatchArguments":[{"group":{"start":29,"value":"login","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":24,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When user performs UI login with visual_user credentials","stepMatchArguments":[{"group":{"start":28,"value":"visual_user","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":25,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then UI login should be successful","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":20,"tags":["@smoke","@regression","@ui","@login","@TCId-002"],"steps":[{"pwStepLine":31,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":37,"value":"\"\"","children":[{"start":38,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":53,"value":"\"secret_sauce\"","children":[{"start":54,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Username is required\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Username is required\"","children":[{"start":33,"value":"Epic sadface: Username is required","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":36,"pickleLine":26,"tags":["@smoke","@regression","@ui","@login","@TCId-003"],"steps":[{"pwStepLine":37,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"standard_user\" and password \"\"","stepMatchArguments":[{"group":{"start":37,"value":"\"standard_user\"","children":[{"start":38,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":66,"value":"\"\"","children":[{"start":67,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Password is required\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Password is required\"","children":[{"start":33,"value":"Epic sadface: Password is required","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":32,"tags":["@smoke","@regression","@ui","@login","@TCId-004"],"steps":[{"pwStepLine":43,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"\" and password \"\"","stepMatchArguments":[{"group":{"start":37,"value":"\"\"","children":[{"start":38,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":53,"value":"\"\"","children":[{"start":54,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Username is required\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Username is required\"","children":[{"start":33,"value":"Epic sadface: Username is required","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":48,"pickleLine":38,"tags":["@smoke","@regression","@ui","@login","@TCId-005"],"steps":[{"pwStepLine":49,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"wrong_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":37,"value":"\"wrong_user\"","children":[{"start":38,"value":"wrong_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":63,"value":"\"secret_sauce\"","children":[{"start":64,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":51,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Username and password do not match any user in this service\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Username and password do not match any user in this service\"","children":[{"start":33,"value":"Epic sadface: Username and password do not match any user in this service","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":54,"pickleLine":44,"tags":["@smoke","@regression","@ui","@login","@TCId-006"],"steps":[{"pwStepLine":55,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When user attempts UI login with username \"standard_user\" and password \"wrong_password\"","stepMatchArguments":[{"group":{"start":37,"value":"\"standard_user\"","children":[{"start":38,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":66,"value":"\"wrong_password\"","children":[{"start":67,"value":"wrong_password","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Username and password do not match any user in this service\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Username and password do not match any user in this service\"","children":[{"start":33,"value":"Epic sadface: Username and password do not match any user in this service","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":60,"pickleLine":51,"tags":["@smoke","@regression","@ui","@login","@TCId-007"],"steps":[{"pwStepLine":61,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given user opens saucedemo application","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When user performs UI login with locked_out_user credentials","stepMatchArguments":[{"group":{"start":28,"value":"locked_out_user","children":[]},"parameterTypeName":"word"}]},{"pwStepLine":63,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then UI login should fail with error \"Epic sadface: Sorry, this user has been locked out.\"","stepMatchArguments":[{"group":{"start":32,"value":"\"Epic sadface: Sorry, this user has been locked out.\"","children":[{"start":33,"value":"Epic sadface: Sorry, this user has been locked out.","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end