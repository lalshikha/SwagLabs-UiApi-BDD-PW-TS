// Generated from: features\functional\login.feature
import { test } from "../../../fixtures/Fixtures.ts";

test.describe('Functional API Login Validation', () => {

  test.describe('API backend validates login credentials', () => {

    test('Example #1', { tag: ['@regression', '@functional', '@api', '@login', '@TCId-008'] }, async ({ Given, apiService }) => { 
      await Given('API service validates standard_user login', null, { apiService }); 
    });

    test('Example #2', { tag: ['@regression', '@functional', '@api', '@login', '@TCId-008'] }, async ({ Given, apiService }) => { 
      await Given('API service validates visual_user login', null, { apiService }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\functional\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":10,"tags":["@regression","@functional","@api","@login","@TCId-008"],"steps":[{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given API service validates standard_user login","stepMatchArguments":[{"group":{"start":22,"value":"standard_user","children":[]},"parameterTypeName":"word"}]}]},
  {"pwTestLine":12,"pickleLine":11,"tags":["@regression","@functional","@api","@login","@TCId-008"],"steps":[{"pwStepLine":13,"gherkinStepLine":6,"keywordType":"Context","textWithKeyword":"Given API service validates visual_user login","stepMatchArguments":[{"group":{"start":22,"value":"visual_user","children":[]},"parameterTypeName":"word"}]}]},
]; // bdd-data-end